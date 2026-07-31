/**
 * Embedded product presentation ("SOME Video Post" animated walkthrough).
 *
 * The presentation is a self-contained HTML animation with its own play/pause
 * controls and scene timeline. It lives in `public/somevideopost-presentation.html`
 * and is embedded here in a 16:9 iframe so the animation logic stays untouched.
 */
export function PresentationVideo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#02040a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <iframe
        src="/somevideopost-presentation.html"
        title="SOME Video Post — præsentationsvideo"
        loading="lazy"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    </div>
  );
}
