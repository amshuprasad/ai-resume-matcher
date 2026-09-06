import json
import re
from app.llm_client import call_ollama_json
from app.extraction import normalize


# ============================================================
# DYNAMIC SKILL EXTRACTION
# ============================================================

def extract_skills_with_ai(text: str):
    text = normalize(text)
    prompt = f"""You are an expert technical recruiter.

Extract ALL technical and professional skills explicitly
mentioned in the following document.

Do NOT use a predefined skill list. Detect skills dynamically.

Return ONLY valid JSON:

{{
    "skills": ["skill 1", "skill 2"]
}}

Rules:
1. Only include skills actually present in the document.
2. Do not invent skills.
3. Use commonly recognized names (React.js and React are the same skill).
4. Skip generic words like "communication" or "teamwork".
5. Return an empty array if no skills are found.

DOCUMENT:

{text[:20000]}
"""
    result = call_ollama_json(prompt)
    skills = result.get("skills", [])
    if not isinstance(skills, list):
        return []

    cleaned_skills = []
    for skill in skills:
        if not isinstance(skill, str):
            continue
        skill = skill.strip()
        if skill and skill.lower() not in {s.lower() for s in cleaned_skills}:
            cleaned_skills.append(skill)

    return sorted(cleaned_skills, key=str.lower)


# ============================================================
# EXPERIENCE EXTRACTION
# ============================================================
def extract_years_from_text(text: str):
    """Look for an explicit years-of-experience statement before trusting the LLM to do date math."""
    patterns = [
        r'(\d+(?:\.\d+)?)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:relevant\s*)?experience',
        r'experience\s*(?:of)?\s*(\d+(?:\.\d+)?)\+?\s*(?:years?|yrs?)',
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return float(match.group(1))
    return None

def extract_experience_with_ai(text: str):
    explicit_years = extract_years_from_text(text)
    if explicit_years is not None:
        return explicit_years
        
    prompt = f"""You are an expert technical recruiter.

Extract the total professional experience from this resume
or job description.

Return ONLY valid JSON:

{{
    "years_of_experience": 0
}}

Rules:
1. Return a number.
2. If the document says "3+ years", return 3.
3. If it says "2.5 years", return 2.5.
4. Do not guess. If experience is not mentioned, return 0.

DOCUMENT:

{text[:15000]}
"""
    result = call_ollama_json(prompt)
    try:
        years = float(result.get("years_of_experience", 0) or 0)
        return max(years, 0)
    except (ValueError, TypeError):
        return 0.0


# ============================================================
# AI ANALYSIS (narrative only — no scores/matches recomputed here)
# ============================================================

def generate_ai_analysis(jd, cv, result):
    """
    `result` already contains skill_score, experience_score, semantic_score,
    matched_skills and missing_skills — all computed in code (matching.py).
    The LLM is only asked for qualitative narrative fields that genuinely
    require language generation, not for anything code already calculated.
    """
    prompt = f"""You are an expert technical recruiter.

Using the calculated matching data below (already computed — treat as ground
truth, do not recompute or contradict it), write a short qualitative analysis.

Return ONLY valid JSON in exactly this format:

{{
    "summary": "short explanation",
    "strengths": ["strength 1", "strength 2"],
    "recommendations": ["recommendation 1", "recommendation 2"],
    "interview_questions": ["question 1", "question 2"]
}}

Rules:
1. Do NOT invent or restate a missing_skills list — that's already computed.
2. Ground strengths/recommendations in the matched_skills and scores given.
3. interview_questions should probe the missing_skills listed below.

Calculated matching data:
{json.dumps(result, indent=2)}

JOB DESCRIPTION:
{jd[:8000]}

RESUME:
{cv[:8000]}
"""
    analysis = call_ollama_json(prompt, num_predict=800)
    # Defensive: strip anything the model returns that duplicates a code-owned field
    analysis.pop("missing_skills", None)
    return analysis


# ============================================================
# COVER LETTER GENERATION
# ============================================================

def generate_cover_letter(jd: str, cv: str, result: dict, tone: str = "professional"):
    matched_skills = result.get("matched_skills", [])
    candidate_years = result.get("cv_experience_years", 0)

    prompt = f"""You are an expert career coach writing a cover letter
on behalf of the candidate.

Write a tailored cover letter for the job description below, using
the candidate's actual resume content. Do NOT invent experience,
companies, or skills not present in the resume.

Tone: {tone}

Use these matched skills naturally where relevant (don't just list them):
{", ".join(matched_skills) if matched_skills else "none identified"}

Candidate's approximate years of experience: {candidate_years}

Return ONLY valid JSON in exactly this format:

{{
    "greeting": "Dear Hiring Manager,",
    "opening_paragraph": "...",
    "body_paragraphs": ["...", "..."],
    "closing_paragraph": "...",
    "signoff": "Sincerely,"
}}

Rules:
1. opening_paragraph: state the role and a 1-sentence hook tied to a real matched skill.
2. body_paragraphs: 2 paragraphs max, each grounded in specific resume content, connecting it to a JD requirement.
3. closing_paragraph: brief, confident call to action.
4. Do not fabricate metrics, company names, or achievements not implied by the resume.
5. Keep total length under 300 words across all paragraphs combined.
6. No placeholders like [Company Name] unless the company name genuinely doesn't appear in the JD.

JOB DESCRIPTION:
{jd[:6000]}

RESUME:
{cv[:6000]}
"""
    return call_ollama_json(prompt, num_predict=800)



