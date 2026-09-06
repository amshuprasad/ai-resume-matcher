"use client";

import { useEffect, useState } from "react";
import UploadCard from "./UploadCard";
import Results from "./Results";

type Result = {
    overall_score: number;
    skill_score: number;
    experience_score: number;
    semantic_score: number;
    jd_experience_years: number;
    cv_experience_years: number;
    matched_skills: string[];
    missing_skills: string[];
    ai: {
        summary: string;
        strengths: string[];
        missing_skills: string[];
        recommendations: string[];
        interview_questions: string[];
    };
};

const API =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const ANALYSIS_STEPS = [
    "Extracting text from documents...",
    "Identifying skills in the job description...",
    "Identifying skills in your resume...",
    "Estimating experience requirements...",
    "Comparing semantic relevance...",
    "Generating your fitment report...",
];

export default function Matcher() {
    const [jd, setJd] = useState<File | null>(null);
    const [cv, setCv] = useState<File | null>(null);

    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        if (!loading) {
            setStepIndex(0);
            return;
        }
        const interval = setInterval(() => {
            setStepIndex((prev) =>
                prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev
            );
        }, 2200);
        return () => clearInterval(interval);
    }, [loading]);

    async function analyze() {
        if (!jd || !cv) {
            setError(
                "Please select both a Job Description and Resume."
            );
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        const form = new FormData();

        form.append("jd_file", jd);
        form.append("cv_file", cv);

        try {
            const res = await fetch(`${API}/api/match`, {
                method: "POST",
                body: form,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.detail || "Matching failed"
                );
            }

            setResult(data);

            setTimeout(() => {
                document
                    .getElementById("results")
                    ?.scrollIntoView({
                        behavior: "smooth",
                    });
            }, 100);

        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <style>{`
                @keyframes pulse-ring {
                    0% { box-shadow: 0 0 0 0 rgba(255,138,38,0.35); }
                    70% { box-shadow: 0 0 0 12px rgba(255,138,38,0); }
                    100% { box-shadow: 0 0 0 0 rgba(255,138,38,0); }
                }
                @keyframes bar-sweep {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
                @keyframes fade-slide-up {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes step-fade {
                    0% { opacity: 0; transform: translateY(4px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-4px); }
                }
            `}</style>

            <section
                id="upload"
                className="mx-auto max-w-5xl px-6 py-20"
            >
                <div
                    className="mb-12 text-center"
                    style={{ animation: "fade-slide-up 0.6s ease-out" }}
                >
                    <h2 className="font-serif text-5xl">
                        Find your real fit.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-[#969bad]">
                        Upload your job description and resume.
                        We'll compare skills, experience and semantic
                        relevance to give you an honest match score.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <UploadCard
                        title="Job Description"
                        description="Upload the job description"
                        file={jd}
                        setFile={setJd}
                        icon="JD"
                    />
                    <UploadCard
                        title="Resume / CV"
                        description="Upload your resume"
                        file={cv}
                        setFile={setCv}
                        icon="CV"
                    />
                </div>

                {error && (
                    <div
                        className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300"
                        style={{ animation: "fade-slide-up 0.3s ease-out" }}
                    >
                        {error}
                    </div>
                )}

                <button
                    onClick={analyze}
                    disabled={loading}
                    style={!loading ? { animation: "pulse-ring 2.4s ease-out infinite" } : undefined}
                    className="
        mt-6
        mx-auto
        block
        rounded-lg
        bg-gradient-to-r
        from-[#ff972f]
        to-[#f45d00]
        px-6
        py-3
        text-base
        font-bold
        text-white
        transition
        hover:scale-[1.01]
        disabled:cursor-not-allowed
        disabled:opacity-90
    "
                >
                    {loading ? "Analyzing your fit..." : "Analyze My Match →"}
                </button>

                {loading && (
                    <div className="mt-5">
                        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                            <div
                                className="absolute inset-y-0 w-1/4 rounded-full bg-gradient-to-r from-[#ff972f] to-[#f45d00]"
                                style={{ animation: "bar-sweep 1.4s ease-in-out infinite" }}
                            />
                        </div>
                        <p
                            key={stepIndex}
                            className="mt-3 text-center text-sm text-[#969bad]"
                            style={{ animation: "step-fade 2.2s ease-in-out" }}
                        >
                            {ANALYSIS_STEPS[stepIndex]}
                        </p>
                    </div>
                )}

            </section>

            {result && (
                <Results result={result} />
            )}
        </>
    );
}