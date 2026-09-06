# AI Resume Matcher — Free / Self-Hosted

A full-stack JD/CV matching application using:
- Next.js + React + Tailwind CSS
- Python + FastAPI
- PyMuPDF + python-docx
- Sentence Transformers
- Ollama + Gemma 3 (optional AI explanation)
- No paid AI API

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

## 5. Public URL

For a truly unlimited AI workload without paying a model API, keep Ollama/FastAPI running on hardware you control and expose the backend securely through a tunnel/reverse proxy. Do NOT expose Ollama port 11434 directly to the public internet.

The Next.js frontend can be deployed to a free Next.js host such as Vercel. Set:

NEXT_PUBLIC_API_URL=https://YOUR_PUBLIC_BACKEND_URL

Then redeploy.

## 6. Important

"Unlimited and free" means no per-request AI API bill when using your own machine. Public cloud compute is not guaranteed to be unlimited/free.

For production, add authentication, rate limiting, file-size limits, virus scanning, HTTPS, and privacy/retention controls before accepting real resumes.


npm install jspdf