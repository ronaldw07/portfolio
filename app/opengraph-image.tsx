import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f5f1eb",
          color: "#2d2d2d",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2, textTransform: "uppercase", color: "#97918a" }}>
          {site.role}
        </div>
        <div style={{ marginTop: 24, fontSize: 64, lineHeight: 1.15, maxWidth: 980 }}>
          {site.positioning}
        </div>
        <div style={{ marginTop: 40, fontSize: 30, color: "#6f6a63" }}>{site.name}</div>
      </div>
    ),
    { ...size },
  );
}
