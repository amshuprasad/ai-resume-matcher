"use client";

type UploadCardProps = {
    title: string;
    description: string;
    file: File | null;
    setFile: (file: File) => void;
    icon: string;
};

export default function UploadCard({
    title,
    description,
    file,
    setFile,
    icon,
}: UploadCardProps) {
    return (
        <label
            className="
        group
        cursor-pointer
        rounded-2xl
        border
        border-dashed
        border-[#3a3d4d]
        bg-[#151824]
        p-8
        transition
        hover:border-[#ff7b18]
        hover:bg-[#181b27]
      "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            bg-[#232638]
            font-bold
            text-[#ff8a26]
          "
                >
                    {icon}
                </div>

                <div>
                    <h3 className="text-lg font-bold">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-[#777d91]">
                        {description}
                    </p>
                </div>

            </div>

            <div
                className="
          mt-7
          rounded-xl
          border
          border-[#292d3b]
          bg-[#0e1019]
          p-5
          text-sm
        "
            >
                {file ? (
                    <span className="text-[#3cc894]">
                        ✓ {file.name}
                    </span>
                ) : (
                    <span className="text-[#777d91]">
                        Click to choose PDF, DOCX, TXT or MD
                    </span>
                )}
            </div>

            <input
                type="file"
                accept=".pdf,.docx,.txt,.md"
                className="hidden"
                onChange={(e) => {
                    const selected = e.target.files?.[0];

                    if (selected) {
                        setFile(selected);
                    }
                }}
            />

        </label>
    );
}