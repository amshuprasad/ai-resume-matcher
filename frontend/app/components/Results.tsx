"use client";

import type { Result } from "./types";
import Metric from "./Metric";
import ListCard from "./ListCard";
import DownloadReport from "./DownloadReport";
type ResultsProps = {
    result: Result;
};

export default function Results({ result }: ResultsProps) {
    return (
        <section
            id="results"
            className="mx-auto max-w-7xl px-6 py-16"
        >
            {/* Header */}
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                        Analysis complete
                    </p>

                    <h2 className="text-3xl font-bold text-white">
                        Resume Match Results
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        AI-powered analysis of your resume against the job description.
                    </p>
                </div>

                <DownloadReport result={result} />
            </div>

            {/* Score cards */}
            <div className="grid gap-5 md:grid-cols-4">
                <Metric
                    label="Overall Match"
                    value={`${result.overall_score}%`}
                    highlight
                />

                <Metric
                    label="Skills"
                    value={`${result.skill_score}%`}
                />

                <Metric
                    label="Experience"
                    value={`${result.experience_score}%`}
                />

                <Metric
                    label="Semantic"
                    value={`${result.semantic_score}%`}
                />
            </div>

            {/* Skills */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <SkillCard
                    title="Matched Skills"
                    skills={result.matched_skills}
                    type="matched"
                />

                <SkillCard
                    title="Missing Skills"
                    skills={result.missing_skills}
                    type="missing"
                />
            </div>

            {/* AI Analysis */}
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <div className="mb-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                        AI Summary
                    </p>

                    <p className="leading-7 text-zinc-300">
                        {result.ai.summary}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <ListCard
                        title="Strengths"
                        items={result.ai.strengths}
                    />

                    <ListCard
                        title="Recommendations"
                        items={result.ai.recommendations}
                    />

                    <ListCard
                        title="Interview Questions"
                        items={result.ai.interview_questions}
                    />
                </div>
            </div>
        </section>
    );
}

/* ---------------- Skills ---------------- */

type SkillCardProps = {
    title: string;
    skills: string[];
    type: "matched" | "missing";
};

function SkillCard({
    title,
    skills,
    type,
}: SkillCardProps) {
    return (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">
                {title}
            </h3>

            {skills.length === 0 ? (
                <p className="text-sm text-zinc-500">
                    No skills found.
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={`${skill}-${index}`}
                            className={`rounded-full border px-3 py-1.5 text-sm ${type === "matched"
                                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                : "border-red-400/20 bg-red-400/10 text-red-300"
                                }`}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}