import Link from 'next/link'
import { IconCompass, IconPin, IconWA, IconMail } from './Icons'
import { waLink } from '@/lib/constants'

export default function Footer() {
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

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <IconCompass size={20} color="#84A98C" />
              <div>
                <span className="text-[13px] font-black text-canvas">WILD TRAIL </span>
                <span className="text-[13px] font-light text-sage-light">GEAR</span>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(248,245,240,0.55)' }}>
              Handpicked outdoor gear for Sri Lanka's trails. Based in Panadura.
            </p>
            <div className="flex items-center gap-1.5 text-[13px]" style={{ color: 'rgba(248,245,240,0.5)' }}>
              <IconPin size={13} color="#84A98C" /> Panadura, Sri Lanka
            </div>
          </div>

          {/* Catalog */}
          <div>
            <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage-light mb-4">Catalog</div>
            {['Tents', 'Cooking Gear', 'Hammocks', 'Accessories', 'Socks & Bags'].map(l => (
              <Link
                key={l}
                href="/catalog"
                className="text-[13px] block mb-2.5 no-underline transition-colors"
                style={{ color: 'rgba(248,245,240,0.6)' }}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage-light mb-4">Company</div>
            {[['About Us', '/about'], ['Contact', '/contact'], ['Home', '/']].map(([l, href]) => (
              <Link
                key={l}
                href={href}
                className="text-[13px] block mb-2.5 no-underline"
                style={{ color: 'rgba(248,245,240,0.6)' }}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage-light mb-4">Contact</div>
            <div className="flex flex-col gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] no-underline"
                style={{ color: 'rgba(248,245,240,0.6)' }}
              >
                <IconWA size={13} /> +94 754 768 386
              </a>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: 'rgba(248,245,240,0.6)' }}>
                <IconMail size={13} color="#84A98C" /> hello@wildtrailgear.lk
              </div>
              <div className="flex items-center gap-2 text-[13px]" style={{ color: 'rgba(248,245,240,0.6)' }}>
                <IconPin size={13} color="#84A98C" /> Panadura, Sri Lanka
              </div>
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
          <span className="text-[11px] flex items-center gap-1.5" style={{ color: 'rgba(248,245,240,0.3)' }}>
            <IconPin size={10} color="rgba(248,245,240,0.3)" /> Sri Lanka · LKR
          </span>
        </div>
      </div>
    </footer>
  )
}
