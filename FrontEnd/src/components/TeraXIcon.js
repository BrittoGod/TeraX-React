import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function TeraXIcon() {
  return (
    <SvgIcon sx={{ height: 50, width: 150 }}>
      <svg
        width="150"
        height="30"
        viewBox="0 0 150 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink" // Required for <image> element
      >
    
        {/* Define the gradient */}
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#4876EE', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00D3AB', stopOpacity: 1 }} />
        </linearGradient>

        {/* Add local image (button.png) before the text */}
        {/*<image
          x="0" // Position the image at the start (before the text)
          y="5" // Adjust y position to align the image vertically
          width="20" // Set image width
          height="20" // Set image height
          xlinkHref="./online_status.png" // Path to the local image
        />*/}

        {/* TeraX text */}
        <text
          x="10" // Adjust x position to make space for the image
          y="25"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="url(#gradient)" // Use the gradient fill" 
        >
          TeraX
        </text>
      </svg>
    </SvgIcon>
  );
}