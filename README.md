# AI Resume Matcher

A full-stack JD/CV matching application using:
- Next.js + React + Tailwind CSS
- Python + FastAPI
- PyMuPDF + python-docx
- Sentence Transformers
- Ollama + Gemma 3 (optional AI explanation)

## 1. Prerequisites

Install:
- Node.js 20+
- Python 3.11+
- Ollama: https://ollama.com/download

Then download a local model:

```bash
ollama pull gemma3:4b
```

Ollama serves its local API at http://localhost:11434/api.

## 2. Start backend

Windows:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend: http://localhost:8000/docs

## 3. Start frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000

## 4. How it works

1. Upload JD PDF/DOCX.
2. Upload CV PDF/DOCX.
3. FastAPI extracts text.
4. A local Sentence Transformer calculates semantic similarity.
5. A lightweight skill dictionary calculates skills match.
6. Experience is extracted and compared.
7. The weighted score is returned.
8. If Ollama is running, it generates an explanation and recommendations.

The core matching does NOT require an LLM, so the application still works if Ollama is unavailable.
