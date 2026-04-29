import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1B4332"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="1.2" fill="#1B4332" />
        <polygon points="12,3 13.5,9 12,12 10.5,9" fill="#1B4332" />
        <polygon points="12,21 13.5,15 12,12 10.5,15" fill="#84A98C" stroke="none" />
        <polygon points="3,12 9,10.5 12,12 9,13.5" fill="#84A98C" stroke="none" />
        <polygon points="21,12 15,10.5 12,12 15,13.5" fill="#1B4332" stroke="none" />
      </svg>
    ),
    { ...size }
  )
}
