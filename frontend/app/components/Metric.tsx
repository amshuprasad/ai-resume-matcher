type MetricProps = {
    label: string;
    value: string | number;
    highlight?: boolean;
};

export default function Metric({
    label,
    value,
    highlight = false,
}: MetricProps) {
    return (
        <div
            className={`rounded-2xl border p-6 transition-all duration-300 ${highlight
                    ? "border-cyan-400/30 bg-cyan-400/[0.07] shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]"
                }`}
        >
            {/* Label */}
            <p className="text-sm font-medium text-zinc-500">
                {label}
            </p>

            {/* Value */}
            <div className="mt-3 flex items-end gap-1">
                <span
                    className={`text-3xl font-bold tracking-tight ${highlight ? "text-cyan-300" : "text-white"
                        }`}
                >
                    {value}
                </span>
            </div>

            {/* Accent line */}
            {highlight && (
                <div className="mt-4 h-1 w-12 rounded-full bg-cyan-400" />
            )}
        </div>
    );
}