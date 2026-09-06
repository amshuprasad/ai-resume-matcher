import json
import re

import requests
from fastapi import HTTPException

from app.config import OLLAMA_URL, OLLAMA_MODEL


def call_ollama_json(prompt: str, num_predict: int = 500, retries: int = 2):

    json_instruction = "\n\nRespond with ONLY the JSON object. No explanation, no markdown, no extra text."
    last_raw = ""

    for attempt in range(retries + 1):
        try:
            response = requests.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": OLLAMA_MODEL,
                    "prompt": prompt + json_instruction,
                    "stream": False,
                    "keep_alive": "30m",
                    "options": {
                        "temperature": 0.1,
                        "num_predict": num_predict,
                        "num_ctx": 4096
                    }
                },
                timeout=180
            )

            response.raise_for_status()
            data = response.json()

            raw = data["response"].strip()
            print(f"RAW OLLAMA RESPONSE (attempt {attempt + 1}):", repr(raw))
            last_raw = raw

            raw = re.sub(r"^```json\s*|\s*```$", "", raw.strip())

            # Pull out the first {...} block in case the model added any stray text
            match = re.search(r"\{.*\}", raw, re.DOTALL)
            if not match:
                continue

            parsed = json.loads(match.group(0))
            if parsed:
                return parsed

        except requests.exceptions.ConnectionError:
            raise HTTPException(
                status_code=503,
                detail=(
                    "Ollama is not running. "
                    "Start Ollama and make sure the model "
                    f"'{OLLAMA_MODEL}' is installed."
                )
            )

        except requests.exceptions.Timeout:
            raise HTTPException(
                status_code=504, detail="Ollama request timed out.")

        except json.JSONDecodeError:
            continue

        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Ollama error: {str(e)}")

    raise HTTPException(
        status_code=500,
        detail=f"Ollama returned no usable JSON after {retries + 1} attempts. Last response: {last_raw[:300]}"
    )
