import { ImageResponse } from "next/og";

// Branded social-share image, applied to every route that doesn't override it
// (Open Graph + Twitter both re-use this via twitter-image.tsx).
export const alt =
  "SOME VIDEO POST — AI-præsentationsvideoer & automatiske opslag til udlejere";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #040a1c 0%, #071233 55%, #0a1f4d 100%)",
          color: "#f5f7ff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #FFB36B 0%, #FF6B4A 100%)",
              fontSize: "40px",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            s
          </div>
          <div style={{ display: "flex", fontSize: "40px", fontWeight: 800 }}>
            <span style={{ color: "#ffffff" }}>some</span>
            <span style={{ color: "#4d8dff" }}>video</span>
            <span style={{ color: "#FF9A4D" }}>post</span>
            <span style={{ color: "#6b7599" }}>.com</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            AI-præsentationsvideoer & automatiske opslag til udlejere
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#aab4d4",
              maxWidth: "860px",
            }}
          >
            Fra boliglink til færdig video og opslag på minutter — del på
            Facebook, Instagram, TikTok & LinkedIn.
          </div>
        </div>

        {/* Footer pills */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["AI-video", "Auto-opslag", "Booking-kalender"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                borderRadius: "100px",
                border: "1px solid rgba(77,141,255,0.4)",
                background: "rgba(77,141,255,0.12)",
                fontSize: "26px",
                color: "#dbe6ff",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
