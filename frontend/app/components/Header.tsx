import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#090b11]/90 backdrop-blur-xl">
      <div className="flex h-[78px] w-full items-center justify-between px-6"
      >
        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Go to RoleFit AI home"
        >
          <div className="relative flex h-10 w-10 items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            >
              <style>{`
                @keyframes rf-spin {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }

                @keyframes rf-spin-rev {
                  from {
                    transform: rotate(360deg);
                  }
                  to {
                    transform: rotate(0deg);
                  }
                }

                @keyframes rf-pulse {
                  0%, 100% {
                    opacity: 1;
                    r: 3.5;
                  }

                  50% {
                    opacity: 0.45;
                    r: 4.5;
                  }
                }

                @keyframes rf-glow {
                  0%, 100% {
                    opacity: 0.15;
                  }

                  50% {
                    opacity: 0.45;
                  }
                }

                .rf-outer {
                  transform-origin: 20px 20px;
                  animation: rf-spin 6s linear infinite;
                }

                .rf-inner {
                  transform-origin: 20px 20px;
                  animation: rf-spin-rev 4s linear infinite;
                }

                .rf-core {
                  animation: rf-pulse 2s ease-in-out infinite;
                  transform-origin: 20px 20px;
                }

                .rf-glow {
                  animation: rf-glow 2s ease-in-out infinite;
                }
              `}</style>

              <circle
                cx="20"
                cy="20"
                r="15"
                fill="#22d3ee"
                className="rf-glow"
              />

              <circle
                className="rf-outer"
                cx="20"
                cy="20"
                r="17"
                fill="none"
                stroke="#22d3ee"
                strokeOpacity="0.35"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              <circle
                className="rf-inner"
                cx="20"
                cy="20"
                r="12"
                fill="none"
                stroke="#a78bfa"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="3 5"
              />

              <line
                x1="20"
                y1="20"
                x2="20"
                y2="3"
                stroke="#22d3ee"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="rf-outer"
              />

              <circle
                className="rf-core"
                cx="20"
                cy="20"
                r="3.5"
                fill="#22d3ee"
              />

              <circle
                cx="20"
                cy="20"
                r="1.3"
                fill="white"
              />
            </svg>
          </div>

          {/* BRAND */}
          <div className="text-left">
            <div
              className="
                text-sm
                font-bold
                tracking-[0.18em]
                text-white
              "
            >
              RoleFit{" "}
              <span className="text-cyan-300">
                AI
              </span>
            </div>

            <div
              className="
                text-[9px]
                tracking-[0.25em]
                text-zinc-500
              "
            >
              RESUME INTELLIGENCE
            </div>
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <nav className="flex items-center gap-3">

          <Link
            href="/cover-letter"
            className="
      rounded-xl
      border border-violet-400/30
      bg-violet-400/10
      px-4 py-2.5
      text-sm font-semibold
      text-violet-300

      transition-all
      duration-300

      hover:-translate-y-0.5
      hover:border-violet-300
      hover:bg-violet-400/20
      hover:shadow-[0_0_25px_rgba(167,139,250,0.15)]
    "
          >
            <span className="hidden sm:inline">
              Cover Letter
            </span>

            <span className="sm:hidden">
              Letter
            </span>
          </Link>

          <Link
            href="/scan"
            className="
      rounded-xl
      border border-cyan-400/30
      bg-cyan-400/10
      px-4 py-2.5
      text-sm font-semibold
      text-cyan-300

      transition-all
      duration-300

      hover:-translate-y-0.5
      hover:border-cyan-300
      hover:bg-cyan-400/20
      hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
    "
          >
            <span className="hidden sm:inline">
              Scan Resume
            </span>

            <span className="sm:hidden">
              Scan
            </span>
          </Link>

        </nav>
      </div>
    </header>
  );
}