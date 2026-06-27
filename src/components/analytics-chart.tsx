"use client";

type DataPoint = { date: string; sessions: number };

export function AnalyticsChart({ data }: { data: DataPoint[] }) {
  if (!data.length) {
    return <div className="flex h-40 items-center justify-center text-sm text-slate-400">Ingen data</div>;
  }

  const max = Math.max(...data.map((d) => d.sessions), 1);
  const height = 160;
  const width = 600;
  const padX = 40;
  const padY = 16;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const points = data.map((d, i) => ({
    x: padX + (i / (data.length - 1 || 1)) * chartW,
    y: padY + chartH - (d.sessions / max) * chartH,
    ...d,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fillD = `${pathD} L ${points[points.length - 1].x} ${padY + chartH} L ${points[0].x} ${padY + chartH} Z`;

  // Show ~6 date labels
  const labelStep = Math.max(1, Math.floor(data.length / 6));
  const labels = points.filter((_, i) => i % labelStep === 0 || i === points.length - 1);

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height + 24}`} className="w-full" style={{ minWidth: 300 }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = padY + chartH * frac;
          return (
            <g key={frac}>
              <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="#f1f5f9" strokeWidth={1} />
              <text x={padX - 6} y={y + 4} textAnchor="end" fontSize={10} fill="#94a3b8">
                {Math.round(max * (1 - frac))}
              </text>
            </g>
          );
        })}

        {/* Fill */}
        <path d={fillD} fill="url(#ga4grad)" opacity={0.3} />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#4285F4" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#4285F4" />
        ))}

        {/* X labels */}
        {labels.map((p, i) => (
          <text key={i} x={p.x} y={height + 18} textAnchor="middle" fontSize={10} fill="#94a3b8">
            {p.date.slice(5)} {/* MM-DD */}
          </text>
        ))}

        <defs>
          <linearGradient id="ga4grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="100%" stopColor="#4285F4" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
