import { ImageResponse } from "next/og";

// ইমেজের সাইজ এবং ফরম্যাট কনফিগারেশন
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// ফ্যাভিকন জেনারেটর ফাংশন
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      🛒
    </div>,
    // ImageResponse অপশনস
    {
      ...size,
    },
  );
}
