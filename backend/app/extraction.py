import os
import re
import tempfile
from pathlib import Path

import fitz
from docx import Document
from fastapi import HTTPException


def extract_text(filename: str, content: bytes) -> str:

    suffix = Path(filename).suffix.lower()

    if suffix == ".pdf":
        try:
            doc = fitz.open(stream=content, filetype="pdf")
            text = "\n".join(page.get_text() for page in doc)
            doc.close()
            return text
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Unable to read PDF: {str(e)}"
            )

    if suffix == ".docx":
        with tempfile.NamedTemporaryFile(suffix=".docx", delete=False) as temp_file:
            temp_file.write(content)
            temp_path = temp_file.name

        try:
            document = Document(temp_path)
            paragraphs = [paragraph.text for paragraph in document.paragraphs]
            return "\n".join(paragraphs)
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Unable to read DOCX: {str(e)}"
            )
        finally:
            os.unlink(temp_path)

    # -----------------------------
    # TXT / MD
    # -----------------------------
    if suffix in {".txt", ".md"}:
        return content.decode("utf-8", errors="ignore")

    raise HTTPException(
        status_code=400,
        detail="Supported files: PDF, DOCX, TXT, MD"
    )

def normalize(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()
