'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IconPin, IconWA, IconMail } from './Icons'
import { waLink } from '@/lib/constants'

export default function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="bg-dark-footer px-16 pt-20 pb-10 text-canvas">
      <div className="max-w-[1200px] mx-auto">
        {/* Top CTA band */}
        <div
          className="flex items-center justify-between flex-wrap gap-8 pb-16 mb-12"
          style={{ borderBottom: '1px solid rgba(248,245,240,0.1)' }}
        >
          <div>
            <div
              className="font-black uppercase leading-tight text-canvas"
              style={{ fontSize: 'clamp(28px,3.5vw,44px)', letterSpacing: '-0.03em' }}
            >
              We&rsquo;re here when<br />
              <span className="font-light text-sage-light">the trail calls.</span>
            </div>
          </div>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-whatsapp text-white rounded-3xl px-7 py-3.5 text-[15px] font-semibold no-underline"
          >
            <IconWA size={18} /> Chat on WhatsApp
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center">
                <IconPin size={22} color="#F8F5F0" />
              </div>
              <div>
                <div className="font-black text-[15px] uppercase tracking-tighter leading-none">Wild Trail</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-sage-light">Panadura</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,245,240,0.5)' }}>
              Premium gear rentals for the modern explorer. From tents to stoves, we prepare you for the untamed path.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-widest mb-6" style={{ color: 'rgba(248,245,240,0.3)' }}>Quick Links</h4>
            <div className="flex flex-col gap-3 text-sm font-medium">
              <Link href="/" className="hover:text-sage-light transition-colors">Home</Link>
              <Link href="/catalog" className="hover:text-sage-light transition-colors">Catalog</Link>
              <Link href="/about" className="hover:text-sage-light transition-colors">Our Story</Link>
              <Link href="/contact" className="hover:text-sage-light transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-widest mb-6" style={{ color: 'rgba(248,245,240,0.3)' }}>Contact Us</h4>
            <div className="flex flex-col gap-4 text-sm">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group no-underline text-canvas">
                <IconWA size={16} className="text-sage group-hover:text-sage-light" />
                <span>+94 77 123 4567</span>
              </a>
              <a href="mailto:hello@wildtrailgear.lk" className="flex items-center gap-3 group no-underline text-canvas">
                <IconMail size={16} className="text-sage group-hover:text-sage-light" />
                <span>hello@wildtrailgear.lk</span>
              </a>
              <div className="flex items-start gap-3">
                <IconPin size={16} className="text-sage mt-0.5" />
                <span>123 Trail Road, Panadura,<br />Sri Lanka</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-widest mb-6" style={{ color: 'rgba(248,245,240,0.3)' }}>Newsletter</h4>
            <p className="text-sm mb-4" style={{ color: 'rgba(248,245,240,0.5)' }}>Get the latest trail updates and gear drops.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border border-[rgba(248,245,240,0.1)] rounded-full px-4 py-2 text-sm outline-none focus:border-sage transition-colors w-full"
              />
              <button className="bg-sage text-canvas rounded-full px-5 py-2 text-xs font-bold hover:bg-sage-light transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center flex-wrap gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(248,245,240,0.08)' }}
        >
          <span className="text-[11px]" style={{ color: 'rgba(248,245,240,0.3)' }}>
            © 2026 Wild Trail Gear. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[11px] flex items-center gap-1.5" style={{ color: 'rgba(248,245,240,0.3)' }}>
              <IconPin size={10} color="rgba(248,245,240,0.3)" /> Sri Lanka · LKR
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
