// components/icons/tera-x-icon.tsx
import * as React from "react"

export default function TeraXIcon() {
  return (
    <svg
      width="150"
      height="30"
      viewBox="0 0 150 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[50px] w-[150px]"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4876EE" stopOpacity="1" />
          <stop offset="100%" stopColor="#00D3AB" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Optional image (commented out) */}
      {/* <image
        x="0"
        y="5"
        width="20"
        height="20"
        xlinkHref="/online_status.png"
      /> */}

      <text
        x="10"
        y="25"
        fontFamily="Arial, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="url(#gradient)"
      >
        TeraX
      </text>
    </svg>
  )
}
