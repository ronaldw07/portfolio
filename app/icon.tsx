import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2d2d2d",
          color: "#f5f1eb",
          fontSize: 20,
          fontFamily: "serif",
          borderRadius: 7,
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
