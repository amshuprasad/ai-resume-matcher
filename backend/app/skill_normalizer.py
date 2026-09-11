import json
import re
from pathlib import Path
from app.logger import logger


ALIASES_FILE = Path(__file__).parent / "data" / "skill_aliases.json"


def load_skill_aliases():
    try:
        with open(ALIASES_FILE, "r", encoding="utf-8") as file:
            return json.load(file)

    except FileNotFoundError:
        logger.warning(
            "Skill aliases file not found: %s",
            ALIASES_FILE
        )
        return {}

    except json.JSONDecodeError as exc:
        logger.warning(
            "Invalid skill aliases JSON: %s",
            exc
        )
        return {}

SKILL_ALIASES = load_skill_aliases()


def normalize_skill(skill: str) -> str:

    if not skill:
        return ""

    skill = skill.lower().strip()

    # Normalize whitespace
    skill = re.sub(r"\s+", " ", skill)

    # Normalize different hyphen characters
    skill = re.sub(r"[\u2010-\u2015]", "-", skill)

    return SKILL_ALIASES.get(skill, skill)
