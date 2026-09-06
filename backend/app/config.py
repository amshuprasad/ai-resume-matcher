import os

# ============================================================
# CORS
# ============================================================

FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGIN",
        "http://localhost:3000",
        
    ).split(",")
]

# ============================================================
# MODELS
# ============================================================

EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma3:4b")

# ============================================================
# LIMITS
# ============================================================

MAX_FILE_SIZE = 8 * 1024 * 1024  # 8 MB
MIN_TEXT_LENGTH = 30

# ============================================================
# SCORING WEIGHTS
# ============================================================

SKILL_WEIGHT = 0.45
EXPERIENCE_WEIGHT = 0.25
SEMANTIC_WEIGHT = 0.30
