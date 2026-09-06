export default function MatchVisualization() {
    return (
        <div className="relative mx-auto h-[460px] w-full max-w-[540px]">
            <style>{`
                @keyframes orbit-cw {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes orbit-ccw {
                    from { transform: translate(-50%, -50%) rotate(360deg); }
                    to { transform: translate(-50%, -50%) rotate(0deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 70px rgba(34,211,238,.12); }
                    50% { box-shadow: 0 0 90px rgba(34,211,238,.25); }
                }
                @keyframes float-y {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes dot-orbit {
                    from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
                }
                @keyframes dot-orbit-2 {
                    from { transform: rotate(0deg) translateX(115px) rotate(0deg); }
                    to { transform: rotate(-360deg) translateX(115px) rotate(360deg); }
                }
                @keyframes bar-fill-cyan {
                    from { width: 0%; }
                    to { width: 92%; }
                }
                @keyframes bar-fill-violet {
                    from { width: 0%; }
                    to { width: 81%; }
                }
                @keyframes bar-fill-blue {
                    from { width: 0%; }
                    to { width: 88%; }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>

            {/* ORBIT RINGS */}
            <div
                className="absolute left-1/2 top-1/2 h-[330px] w-[330px] rounded-full border border-cyan-400/10"
                style={{ animation: "orbit-cw 20s linear infinite" }}
            />
            <div
                className="absolute left-1/2 top-1/2 h-[250px] w-[250px] rounded-full border border-violet-400/10"
                style={{ animation: "orbit-ccw 14s linear infinite" }}
            />

            {/* ORBITING DOTS ON THE RINGS */}
            <div
                className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,.8)]"
                style={{ animation: "dot-orbit 20s linear infinite", marginLeft: "-4px", marginTop: "-4px" }}
            />
            <div
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,.8)]"
                style={{ animation: "dot-orbit-2 14s linear infinite", marginLeft: "-3px", marginTop: "-3px" }}
            />

            {/* CENTER */}
            <div
                className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-300/30 bg-[#111722]"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            >
                <div className="text-4xl font-black text-white">87</div>
                <div className="mt-1 text-[10px] tracking-[0.2em] text-cyan-300">
                    MATCH SCORE
                </div>
            </div>

            {/* NODE 1 */}
            <div
                className="absolute left-2 top-16 rounded-xl border border-white/10 bg-[#11151f]/95 p-4 shadow-xl backdrop-blur-xl"
                style={{ animation: "float-y 4s ease-in-out infinite" }}
            >
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Skills</div>
                <div className="mt-1 text-2xl font-bold text-white">92%</div>
                <div className="mt-2 h-1.5 w-28 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-cyan-300"
                        style={{ animation: "bar-fill-cyan 1.6s ease-out forwards" }}
                    />
                </div>
            </div>

            {/* NODE 2 */}
            <div
                className="absolute right-0 top-32 rounded-xl border border-white/10 bg-[#11151f]/95 p-4 shadow-xl backdrop-blur-xl"
                style={{ animation: "float-y 4.5s ease-in-out infinite", animationDelay: "0.5s" }}
            >
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Experience</div>
                <div className="mt-1 text-2xl font-bold text-white">81%</div>
                <div className="mt-2 h-1.5 w-28 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-violet-400"
                        style={{ animation: "bar-fill-violet 1.6s ease-out forwards", animationDelay: "0.2s" }}
                    />
                </div>
            </div>

            {/* NODE 3 */}
            <div
                className="absolute bottom-14 left-10 rounded-xl border border-white/10 bg-[#11151f]/95 p-4 shadow-xl backdrop-blur-xl"
                style={{ animation: "float-y 5s ease-in-out infinite", animationDelay: "1s" }}
            >
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Semantic</div>
                <div className="mt-1 text-2xl font-bold text-white">88%</div>
                <div className="mt-2 h-1.5 w-28 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-blue-400"
                        style={{ animation: "bar-fill-blue 1.6s ease-out forwards", animationDelay: "0.4s" }}
                    />
                </div>
            </div>

            {/* NODE 4 */}
            <div
                className="absolute bottom-4 right-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4"
                style={{ animation: "float-y 4.2s ease-in-out infinite", animationDelay: "1.5s" }}
            >
                <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <span
                        className="h-2 w-2 rounded-full bg-emerald-300"
                        style={{ animation: "blink 1.5s ease-in-out infinite" }}
                    />
                    Strong candidate
                </div>
                <div className="mt-2 text-sm text-zinc-400">14 skills matched</div>
            </div>
        </div>
    );
}