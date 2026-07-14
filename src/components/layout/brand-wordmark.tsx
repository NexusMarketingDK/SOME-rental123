/** Tri-color somevideopost.com wordmark used in headers and footers. */
export function BrandWordmark({ className = "text-base" }: { className?: string }) {
  return (
    <span className={`font-bold lowercase tracking-tight ${className}`}>
      <span className="text-white">some</span>
      <span className="text-[#4d8dff]">video</span>
      <span className="text-orange-400">post</span>
      <span className="text-slate-400">.com</span>
    </span>
  );
}
