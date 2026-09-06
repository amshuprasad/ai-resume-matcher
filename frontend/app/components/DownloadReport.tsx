"use client";

import jsPDF from "jspdf";
import type { Result } from "./types";

type DownloadReportProps = {
    result: Result;
};

export default function DownloadReport({
    result,
}: DownloadReportProps) {
    const generateReport = () => {
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        let y = 20;

        // --------------------------------
        // HEADER
        // --------------------------------

        pdf.setFillColor(9, 11, 17);
        pdf.rect(0, 0, pageWidth, 38, "F");

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(22);
        pdf.setTextColor(255, 255, 255);

        pdf.text("RoleFit", 20, 17);

        pdf.setTextColor(34, 211, 238);
        pdf.text(" AI", 48, 17);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 160);

        pdf.text(
            "RESUME INTELLIGENCE",
            20,
            25
        );

        pdf.text(
            "AI-Powered Resume Match Report",
            20,
            32
        );

        // --------------------------------
        // TITLE
        // --------------------------------

        y = 52;

        pdf.setTextColor(30, 30, 35);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);

        pdf.text(
            "Resume Match Report",
            20,
            y
        );

        y += 8;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(120, 120, 130);

        pdf.text(
            `Generated: ${new Date().toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }
            )}`,
            20,
            y
        );

        // --------------------------------
        // OVERALL SCORE
        // --------------------------------

        y += 18;

        pdf.setFillColor(240, 250, 252);

        pdf.roundedRect(
            20,
            y,
            pageWidth - 40,
            42,
            5,
            5,
            "F"
        );

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(90, 90, 100);

        pdf.text(
            "OVERALL MATCH",
            30,
            y + 12
        );

        pdf.setFontSize(28);
        pdf.setTextColor(20, 180, 205);

        pdf.text(
            `${Math.round(result.overall_score)}%`,
            30,
            y + 32
        );

        const overall = Math.round(
            result.overall_score
        );

        let verdict = "Low Match";

        if (overall >= 85) {
            verdict = "Strong Match";
        } else if (overall >= 70) {
            verdict = "Good Match";
        } else if (overall >= 50) {
            verdict = "Partial Match";
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(40, 40, 45);

        pdf.text(
            verdict,
            90,
            y + 18
        );

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(110, 110, 120);

        pdf.text(
            "Overall resume alignment",
            90,
            y + 27
        );

        // --------------------------------
        // SCORE BREAKDOWN
        // --------------------------------

        y += 55;

        addSectionTitle(
            pdf,
            "Score Breakdown",
            y
        );

        y += 10;

        const metrics = [
            {
                label: "Skills",
                value: result.skill_score,
            },
            {
                label: "Experience",
                value: result.experience_score,
            },
            {
                label: "Semantic",
                value: result.semantic_score,
            },
        ];

        metrics.forEach((metric, index) => {
            const x = 20 + index * 57;

            pdf.setFillColor(
                248,
                248,
                250
            );

            pdf.roundedRect(
                x,
                y,
                52,
                25,
                3,
                3,
                "F"
            );

            pdf.setFont(
                "helvetica",
                "normal"
            );

            pdf.setFontSize(9);
            pdf.setTextColor(
                100,
                100,
                110
            );

            pdf.text(
                metric.label,
                x + 5,
                y + 9
            );

            pdf.setFont(
                "helvetica",
                "bold"
            );

            pdf.setFontSize(15);
            pdf.setTextColor(
                30,
                170,
                195
            );

            pdf.text(
                `${Math.round(metric.value)}%`,
                x + 5,
                y + 19
            );
        });

        // --------------------------------
        // EXPERIENCE
        // --------------------------------

        y += 38;

        addSectionTitle(
            pdf,
            "Experience Analysis",
            y
        );

        y += 10;

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(10);
        pdf.setTextColor(70, 70, 80);

        pdf.text(
            `Required experience: ${result.jd_experience_years} years`,
            20,
            y
        );

        y += 7;

        pdf.text(
            `Resume experience: ${result.cv_experience_years} years`,
            20,
            y
        );

        // --------------------------------
        // MATCHED SKILLS
        // --------------------------------

        y += 18;

        addSectionTitle(
            pdf,
            "Matched Skills",
            y
        );

        y += 10;

        y = addBulletList(
            pdf,
            result.matched_skills,
            y
        );

        // --------------------------------
        // MISSING SKILLS
        // --------------------------------

        y += 8;

        if (y > 250) {
            pdf.addPage();
            y = 20;
        }

        addSectionTitle(
            pdf,
            "Missing Skills",
            y
        );

        y += 10;

        y = addBulletList(
            pdf,
            result.missing_skills,
            y
        );

        // --------------------------------
        // AI SUMMARY
        // --------------------------------

        y += 8;

        if (y > 240) {
            pdf.addPage();
            y = 20;
        }

        addSectionTitle(
            pdf,
            "AI Summary",
            y
        );

        y += 10;

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(10);
        pdf.setTextColor(70, 70, 80);

        const summaryLines =
            pdf.splitTextToSize(
                result.ai.summary,
                pageWidth - 40
            );

        pdf.text(
            summaryLines,
            20,
            y
        );

        y += summaryLines.length * 5 + 8;

        // --------------------------------
        // STRENGTHS
        // --------------------------------

        if (y > 240) {
            pdf.addPage();
            y = 20;
        }

        addSectionTitle(
            pdf,
            "Strengths",
            y
        );

        y += 10;

        y = addBulletList(
            pdf,
            result.ai.strengths,
            y
        );

        // --------------------------------
        // RECOMMENDATIONS
        // --------------------------------

        y += 8;

        if (y > 240) {
            pdf.addPage();
            y = 20;
        }

        addSectionTitle(
            pdf,
            "Recommendations",
            y
        );

        y += 10;

        y = addBulletList(
            pdf,
            result.ai.recommendations,
            y
        );

        // --------------------------------
        // INTERVIEW QUESTIONS
        // --------------------------------

        y += 8;

        if (y > 240) {
            pdf.addPage();
            y = 20;
        }

        addSectionTitle(
            pdf,
            "Interview Questions",
            y
        );

        y += 10;

        addBulletList(
            pdf,
            result.ai.interview_questions,
            y
        );

        // --------------------------------
        // FOOTER
        // --------------------------------

        const totalPages =
            pdf.getNumberOfPages();

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {
            pdf.setPage(page);

            pdf.setFont(
                "helvetica",
                "normal"
            );

            pdf.setFontSize(8);
            pdf.setTextColor(
                150,
                150,
                155
            );

            pdf.text(
                "RoleFit AI • Resume Intelligence",
                20,
                pageHeight - 10
            );

            pdf.text(
                `Page ${page} of ${totalPages}`,
                pageWidth - 45,
                pageHeight - 10
            );
        }

        // --------------------------------
        // DOWNLOAD
        // --------------------------------

        pdf.save(
            `RoleFit-AI-Resume-Report-${overall}.pdf`
        );
    };

    return (
        <button
            type="button"
            onClick={generateReport}
            className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-5
                py-3
                text-sm
                font-semibold
                text-cyan-300
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-cyan-300/40
                hover:bg-cyan-400/20
                hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]
            "
        >
            <span className="text-base">
                ↓
            </span>

            Download Report
        </button>
    );
}

/* -----------------------------
   Helpers
----------------------------- */

function addSectionTitle(
    pdf: jsPDF,
    title: string,
    y: number
) {
    pdf.setFont(
        "helvetica",
        "bold"
    );

    pdf.setFontSize(13);
    pdf.setTextColor(
        35,
        35,
        40
    );

    pdf.text(
        title,
        20,
        y
    );

    pdf.setDrawColor(
        220,
        220,
        225
    );

    pdf.line(
        20,
        y + 3,
        190,
        y + 3
    );
}

function addBulletList(
    pdf: jsPDF,
    items: string[],
    y: number
) {
    if (!items || items.length === 0) {
        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(9);
        pdf.setTextColor(
            140,
            140,
            150
        );

        pdf.text(
            "None identified.",
            24,
            y
        );

        return y + 7;
    }

    pdf.setFont(
        "helvetica",
        "normal"
    );

    pdf.setFontSize(9);
    pdf.setTextColor(
        70,
        70,
        80
    );

    items.forEach((item) => {
        const lines =
            pdf.splitTextToSize(
                String(item),
                160
            );

        pdf.text(
            "•",
            20,
            y
        );

        pdf.text(
            lines,
            27,
            y
        );

        y +=
            lines.length * 5 + 3;

        if (y > 275) {
            pdf.addPage();
            y = 20;
        }
    });

    return y;
}