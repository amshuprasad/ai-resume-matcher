from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from app.skill_normalizer import normalize_skill
from app.config import EMBEDDING_MODEL
from app.logger import logger


logger.info("Loading embedding model...")
embedding_model = SentenceTransformer(EMBEDDING_MODEL)
logger.info("Embedding model loaded.")

# ============================================================
# SEMANTIC SIMILARITY
# ============================================================

def semantic_score(jd: str, cv: str):

    vectors = embedding_model.encode(
        [jd, cv],
        normalize_embeddings=True
    )

    score = cosine_similarity(
        [vectors[0]],
        [vectors[1]]
    )[0][0]

    return float(score)


# ============================================================
# SKILL MATCHING
# ============================================================

def calculate_skill_match(jd_skills, cv_skills):

    # Normalize skills using external skill_aliases.json
    jd_normalized = {
        normalize_skill(skill)
        for skill in jd_skills
        if skill
    }

    cv_normalized = {
        normalize_skill(skill)
        for skill in cv_skills
        if skill
    }

    if not jd_normalized:
        return {
            "score": 0,
            "matched": [],
            "missing": []
        }

    # Find matches
    matched_normalized = jd_normalized & cv_normalized

    # Find missing skills
    missing_normalized = jd_normalized - cv_normalized

    # Calculate score
    score = len(matched_normalized) / len(jd_normalized)

    # Keep original JD skill names for display
    matched = [
        skill
        for skill in jd_skills
        if normalize_skill(skill) in matched_normalized
    ]

    missing = [
        skill
        for skill in jd_skills
        if normalize_skill(skill) in missing_normalized
    ]

    return {
        "score": score,
        "matched": sorted(set(matched), key=str.lower),
        "missing": sorted(set(missing), key=str.lower)
    }


# ============================================================
# EXPERIENCE MATCHING
# ============================================================

def calculate_experience_score(jd_years, cv_years):

    # JD does not specify experience
    if jd_years <= 0:
        return 1.0

    # CV meets requirement
    if cv_years >= jd_years:
        return 1.0

    # Partial match
    return max(0.0, cv_years / jd_years)
