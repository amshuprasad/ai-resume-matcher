type ListCardProps = {
    title: string;
    items: string[];
};

export default function ListCard({
    title,
    items,
}: ListCardProps) {
    return (
        <div className="rounded-xl border border-white/[0.06] bg-black/20 p-5">
            {/* Title */}
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-300">
                {title}
            </h3>

            {/* Empty state */}
            {items.length === 0 ? (
                <p className="text-sm text-zinc-500">
                    Nothing to show.
                </p>
            ) : (
                <ul className="space-y-3">
                    {items.map((item, index) => (
                        <li
                            key={`${item}-${index}`}
                            className="flex gap-3 text-sm leading-6 text-zinc-400"
                        >
                            {/* Bullet */}
                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

                            {/* Content */}
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}