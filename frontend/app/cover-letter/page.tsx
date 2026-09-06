"use client";

import { useState, useRef } from "react";
import Header from "../components/Header";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type CoverLetter = {
    greeting: string;
    opening_paragraph: string;
    body_paragraphs: string[];
    closing_paragraph: string;
    signoff: string;
};

export default function CoverLetterPage() {
    const [jdFile, setJdFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [tone, setTone] = useState("professional");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [letter, setLetter] = useState<CoverLetter | null>(null);

    const handleGenerate = async () => {
        setError(null);

        if (!jdFile || !cvFile) {
            setError("Please upload both a job description and a resume.");
            return;
        }

        setLoading(true);
        setLetter(null);

        try {
            const formData = new FormData();
            formData.append("jd_file", jdFile);
            formData.append("cv_file", cvFile);
            formData.append("tone", tone);

            const res = await fetch(`${API_BASE}/api/cover-letter`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.detail || "Failed to generate cover letter.");
            }

            const data = await res.json();
            setLetter(data.cover_letter);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const fullText = letter
        ? [
            letter.greeting,
            letter.opening_paragraph,
            ...letter.body_paragraphs,
            letter.closing_paragraph,
            letter.signoff,
        ].join("\n\n")
        : "";

    return (<>
     <Header />
        <main className="mx-auto max-w-4xl px-6 py-12 text-white">
            <h1 className="text-2xl font-bold tracking-tight">
                Cover Letter Generator
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
                Upload a job description and your resume — get a tailored cover
                letter grounded in your real experience.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <FileDropZone
                    label="Job Description"
                    accent="cyan"
                    file={jdFile}
                    onFile={setJdFile}
                />
                <FileDropZone
                    label="Resume / CV"
                    accent="violet"
                    file={cvFile}
                    onFile={setCvFile}
                />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
                <label className="text-sm font-semibold text-zinc-300">Tone</label>
                <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white
               color-scheme-dark focus:border-violet-400/50 focus:outline-none"
                >
                    <option className="bg-zinc-900 text-white" value="professional">
                        Professional
                    </option>

                    <option className="bg-zinc-900 text-white" value="enthusiastic">
                        Enthusiastic
                    </option>

                    <option className="bg-zinc-900 text-white" value="concise">
                        Concise
                    </option>
                </select>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-5 py-2.5 text-sm font-semibold text-violet-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Generating..." : "Generate Cover Letter"}
                </button>
            </div>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            {letter && (
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Generated Cover Letter</h2>
                        <button
                            onClick={() => navigator.clipboard.writeText(fullText)}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-cyan-300 hover:text-cyan-300"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                        {fullText}
                    </div>
                </div>
            )}
        </main>
    </>
    );
}

function FileDropZone({
    label,
    accent,
    file,
    onFile,
}: {
    label: string;
    accent: "cyan" | "violet";
    file: File | null;
    onFile: (f: File) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const border = accent === "cyan" ? "border-cyan-400/40" : "border-violet-400/40";
    const text = accent === "cyan" ? "text-cyan-300" : "text-violet-300";

    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-300">
                {label}
            </label>
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f) onFile(f);
                }}
                className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${border} bg-white/[0.02] p-4 text-center transition hover:bg-white/[0.04]`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx,.txt,.md"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
                />
                {file ? (
                    <p className={`text-sm font-medium ${text}`}>{file.name}</p>
                ) : (
                    <>
                        <p className="text-sm text-zinc-400">Drag & drop or click to upload</p>
                        <p className="mt-1 text-xs text-zinc-600">PDF, DOCX, TXT, MD</p>
                    </>
                )}
            </div>
        </div>
    );
}