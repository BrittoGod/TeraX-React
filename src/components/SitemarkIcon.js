import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function TeraXIcon() {
  return (
    <SvgIcon sx={{ height: 30, width: 100 }}>
      <svg
        width="100"
        height="30"
        viewBox="0 0 100 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#4876EE', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00D3AB', stopOpacity: 1 }} />
        </linearGradient>
        <text
          x="0"
          y="20"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="url(#gradient)"
        >
          TeraX
        </text>
      </svg>
    </SvgIcon>
  );
}