from fastapi import FastAPI, Form, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.ai_extraction import generate_ai_analysis, generate_cover_letter
from app.config import (FRONTEND_ORIGINS,EMBEDDING_MODEL,OLLAMA_MODEL,MAX_FILE_SIZE,MIN_TEXT_LENGTH,SKILL_WEIGHT,EXPERIENCE_WEIGHT,SEMANTIC_WEIGHT)
from app.extraction import extract_text
from app.ai_extraction import (extract_skills_with_ai,extract_experience_with_ai,generate_ai_analysis)
from app.matching import (semantic_score,calculate_skill_match,calculate_experience_score)
from pydantic import BaseModel
from app.logger import logger
import asyncio

app = FastAPI(
    title="AI Resume Matcher",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "ok",
        "embedding_model": EMBEDDING_MODEL,
        "ollama_model": OLLAMA_MODEL
    }


@app.post("/api/match")
async def match(
    jd_file: UploadFile = File(...),
    cv_file: UploadFile = File(...)
):

    # --- Read files ---
    jd_bytes = await jd_file.read()
    cv_bytes = await cv_file.read()

    # --- File size validation ---
    if len(jd_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="JD file must be 8 MB or smaller.")

    if len(cv_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="CV file must be 8 MB or smaller.")

    # --- Extract text ---
    jd = extract_text(jd_file.filename or "", jd_bytes)
    cv = extract_text(cv_file.filename or "", cv_bytes)

    # --- Validate extracted text ---
    if len(jd.strip()) < MIN_TEXT_LENGTH:
        raise HTTPException(status_code=400, detail="Could not extract enough text from JD.")

    if len(cv.strip()) < MIN_TEXT_LENGTH:
        raise HTTPException(status_code=400, detail="Could not extract enough text from CV.")

    # --- Dynamic skill extraction ---
    logger.info("Extracting JD skills...")
    jd_skills = extract_skills_with_ai(jd)
    logger.info("JD skills: %s", jd_skills)

    logger.info("Extracting CV skills...")
    cv_skills = extract_skills_with_ai(cv)
    logger.info("CV skills: %s", cv_skills)

    # --- Experience extraction ---
    logger.info("Extracting JD experience...")
    jd_years = extract_experience_with_ai(jd)

    logger.info("Extracting CV experience...")
    cv_years = extract_experience_with_ai(cv)

    # --- Skill match ---
    skill_result = calculate_skill_match(jd_skills, cv_skills)
    skill_score = skill_result["score"]

    # --- Experience match ---
    experience_score = calculate_experience_score(jd_years, cv_years)

    # --- Semantic match ---
    semantic = semantic_score(jd, cv)
    semantic = max(0.0, min(1.0, semantic))

    # --- Final score ---
    overall = (
        skill_score * SKILL_WEIGHT +
        experience_score * EXPERIENCE_WEIGHT +
        semantic * SEMANTIC_WEIGHT
    ) * 100

    overall = round(overall, 1)

    result = {
        "overall_score": overall,
        "skill_score": round(skill_score * 100, 1),
        "experience_score": round(experience_score * 100, 1),
        "semantic_score": round(semantic * 100, 1),
        "jd_experience_years": jd_years,
        "cv_experience_years": cv_years,
        "matched_skills": skill_result["matched"],
        "missing_skills": skill_result["missing"],
        "jd_skills": jd_skills,
        "cv_skills": cv_skills
    }

    # --- AI analysis ---
    print("Generating AI analysis...")
    ai_analysis = generate_ai_analysis(jd, cv, result)
    result["ai"] = ai_analysis

    return result


class CoverLetterRequest(BaseModel):
    jd: str
    cv: str
    match_result: dict
    tone: str = "professional"   # professional | enthusiastic | concise


@app.post("/api/cover-letter")
async def cover_letter(
    jd_file: UploadFile = File(...),
    cv_file: UploadFile = File(...),
    tone: str = Form("professional")
):
    jd_bytes = await jd_file.read()
    cv_bytes = await cv_file.read()

    if len(jd_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413, detail="JD file must be 8 MB or smaller.")
    if len(cv_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413, detail="CV file must be 8 MB or smaller.")

    jd = extract_text(jd_file.filename or "", jd_bytes)
    cv = extract_text(cv_file.filename or "", cv_bytes)

    if len(jd.strip()) < MIN_TEXT_LENGTH:
        raise HTTPException(
            status_code=400, detail="Could not extract enough text from JD.")
    if len(cv.strip()) < MIN_TEXT_LENGTH:
        raise HTTPException(
            status_code=400, detail="Could not extract enough text from CV.")

    allowed_tones = {"professional", "enthusiastic", "concise"}
    tone = tone if tone in allowed_tones else "professional"

    # No match_result needed — skills/experience aren't required inputs,
    # the LLM grounds the letter directly from jd + cv text.
    letter = await asyncio.to_thread(generate_cover_letter, jd, cv, {}, tone)

    return {"cover_letter": letter}