"use client";

import Link from "next/link";
import MatchVisualization from "./components/MatchVisualization";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090b11] text-white">
      <Header />
      <section className="relative overflow-hidden">
        {/* BACKGROUND GRID */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.15]
            [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />

        {/* GLOW */}
        <div className="pointer-events-none absolute left-[45%] top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pt-10 pb-24 md:grid-cols-[1.05fr_.95fr] md:items-center lg:pt-14 lg:pb-32">

          {/* LEFT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1 text-xs font-medium tracking-wider text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              AI-POWERED RESUME ANALYSIS
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl">
              Don't guess your
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                job fit.
              </span>
              <br />
              Measure it.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
              Match your resume against any job description using
              skills, experience and semantic intelligence.
              Discover exactly where you stand before you apply.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/scan"
                className="
                  group
                  rounded-xl
                  bg-cyan-300
                  px-7
                  py-4
                  font-bold
                  text-[#071015]
                  shadow-[0_0_35px_rgba(103,232,249,.18)]
                  transition
                  hover:scale-[1.02]
                  hover:bg-cyan-200
                "
              >
                Start matching
                <span className="ml-3 transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* VISUAL */}
          <MatchVisualization />

        </div>
      </section>
      
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#090b11] py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/[0.05] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div
              className="
                group relative rounded-3xl
                border border-white/[0.08]
                bg-white/[0.025]
                p-8
                transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-400/30
                hover:bg-white/[0.04]
              "
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-5xl font-bold tracking-tighter text-white/[0.07]">
                  01
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h5" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">
                Paste the JD
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                Drop in the complete job description — responsibilities,
                must-have skills, preferred qualifications, and experience
                requirements.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Must-have skills",
                  "Responsibilities",
                  "Experience requirements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#090b11] text-zinc-500 lg:flex">
                →
              </div>
            </div>
            <div
              className="
                group relative rounded-3xl
                border border-white/[0.08]
                bg-white/[0.025]
                p-8
                transition-all duration-300
                hover:-translate-y-1
                hover:border-violet-400/30
                hover:bg-white/[0.04]
              "
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-5xl font-bold tracking-tighter text-white/[0.07]">
                  02
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 16V4" />
                    <path d="m7 9 5-5 5 5" />
                    <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">
                Upload your resume
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                Upload your Resume. RoleFit AI analyzes your skills and
                experience to understand what
                you actually bring to the role.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Skills & experience",
                  "Projects & achievements",
                  "Resume structure",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {item}
                  </div>
                ))}
              </div>
              {/* connector */}
              <div className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#090b11] text-zinc-500 lg:flex">
                →
              </div>
            </div>

            <div
              className="
                group relative rounded-3xl
                border border-cyan-400/20
                bg-cyan-400/[0.04]
                p-8
                transition-all duration-300
                hover:-translate-y-1
                hover:border-cyan-300/40
                hover:bg-cyan-400/[0.06]
              "
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-5xl font-bold tracking-tighter text-cyan-300/10">
                  03
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="m12 3-1.5 6.5L4 11l6.5 1.5L12 19l1.5-6.5L20 11l-6.5-1.5L12 3Z" />
                    <path d="m19 16-.7 2.3L16 19l2.3.7L19 19l2.3-.7L19 16Z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white">
                Get the honest verdict
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                Get an evidence-backed breakdown of your fit — not just
                another percentage pretending to know your career.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2">
                {[
                  "Match score",
                  "ATS traps",
                  "Real skill gaps",
                  "Resume rewrites",
                  "Learning paths",
                  "Interview questions",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      rounded-lg
                      border border-white/[0.06]
                      bg-white/[0.03]
                      px-3 py-2
                      text-xs text-zinc-400
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
  
}