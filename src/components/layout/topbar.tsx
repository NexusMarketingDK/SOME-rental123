interface TopbarProps {
  title: string;
  description?: string;
}

export function Topbar({ title, description }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#E7E2D9] bg-[#FAF7F2] px-8 py-6">
      <div>
        <h1
          className="text-2xl text-[#1B1B1F]"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-[#6B6B76]">{description}</p>
        )}
      </div>
      <div
        aria-hidden
        className="h-9 w-9 rounded-full border border-[#E7E2D9] bg-white"
      />
    </header>
  );
}
