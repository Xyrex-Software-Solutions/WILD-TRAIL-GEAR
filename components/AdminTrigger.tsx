'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminTrigger() {
  const pathname = usePathname()
  
  // Don't show the trigger if we are already in the admin section
  if (pathname.startsWith('/admin')) return null

  return (
    <Link 
      href="/admin/?key=trail2026"
      className="fixed bottom-8 left-8 w-14 h-14 rounded-full flex items-center justify-center no-underline transition-all hover:scale-110 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.2)] group z-[9999]"
      style={{ 
        background: '#C8651A', 
        color: '#F8F5F0',
        border: '3px solid rgba(255,255,255,0.4)'
      }}
      title="Admin Access"
    >
      <span className="text-[16px] font-black group-hover:scale-110 transition-transform">A</span>
    </Link>
  )
}
