'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconCompass, IconBoot, IconWA, IconArrow } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const compassRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const content = contentRef.current

    if (!section || !bg || !content) return

    // Parallax background — slow, atmospheric
    gsap.to(bg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Hero text stagger fade-up — warm morning mist feel
    const children = content.querySelectorAll('.hero-reveal')
    gsap.fromTo(
      children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.18,
        delay: 0.2,
      }
    )

    // Compass slow spin
    if (compassRef.current) {
      gsap.to(compassRef.current, {
        rotation: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
      })
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: '100vh', padding: '0 64px 96px' }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ top: '-20%', bottom: '-20%' }}
      >
        <Image
          src="/images/upscaled%20home%20page%20image.jpg"
          alt="Wild Trail Gear mountain landscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Fog overlay top */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(27,67,50,0.40) 0%, transparent 60%)' }}
      />

      {/* Dark scrim bottom — product content below "emerges from landscape" */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{
          height: '72%',
          background: 'linear-gradient(to top, rgba(14,20,16,0.96) 0%, rgba(14,20,16,0.55) 45%, transparent 100%)',
        }}
      />

      {/* Decorative compass */}
      <div
        ref={compassRef}
        className="absolute z-[1]"
        style={{ top: '12%', right: '8%', opacity: 0.1, transformOrigin: 'center' }}
      >
        <IconCompass size={180} color="#F8F5F0" />
      </div>

      {/* Decorative boot */}
      <div className="absolute z-[1]" style={{ bottom: '28%', right: '14%', opacity: 0.08 }}>
        <IconBoot size={120} color="#F8F5F0" />
      </div>

      {/* Ghost watermark */}
      <div
        className="absolute z-[1] pointer-events-none select-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(80px,14vw,220px)',
          fontWeight: 800,
          color: 'rgba(248,245,240,0.03)',
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        WILD TRAIL
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-[3]" style={{ maxWidth: 760 }}>
        <div className="hero-reveal">
          <Eyebrow label="Panadura, Sri Lanka · Rent Quality Gear" light />
        </div>

        <div className="hero-reveal mb-2">
          <span
            className="block font-black uppercase text-canvas"
            style={{
              fontSize: 'clamp(52px,7vw,96px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.93,
            }}
          >
            WILD TRAIL
          </span>
          <span
            className="block font-light uppercase text-sage-light"
            style={{
              fontSize: 'clamp(52px,7vw,96px)',
              letterSpacing: '0.03em',
              lineHeight: 0.93,
            }}
          >
            GEAR
          </span>
        </div>

        <p
          className="hero-reveal text-canvas/65 leading-relaxed"
          style={{ fontSize: 18, fontWeight: 400, marginTop: 28, marginBottom: 44, maxWidth: 500 }}
        >
          Your adventure starts here. Rent handpicked gear for Sri Lanka&rsquo;s trails — from the Knuckles Range to Horton Plains.
        </p>

        <div className="hero-reveal flex gap-4 items-center flex-wrap">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2.5 bg-forest text-canvas rounded-btn px-8 py-3.5 text-[15px] font-semibold no-underline transition-opacity hover:opacity-85"
          >
            Browse Rental Gear <IconArrow />
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-canvas rounded-btn px-7 py-[13px] text-[15px] font-medium no-underline transition-colors"
            style={{ border: '1.5px solid rgba(248,245,240,0.4)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(248,245,240,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(248,245,240,0.4)')}
          >
            <IconWA size={16} /> WhatsApp Us
          </a>
        </div>

        {/* Stats */}
        <div
          className="hero-reveal flex gap-12 mt-14 pt-8 flex-wrap"
          style={{ borderTop: '1px solid rgba(248,245,240,0.12)' }}
        >
          {[['500+', 'Gear Items'], ['4.9★', 'Avg. Rating'], ['2-Day', 'Min. Rental']].map(([val, lbl]) => (
            <div key={lbl}>
              <div
                className="font-black text-canvas"
                style={{ fontSize: 28, letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {val}
              </div>
              <div
                className="font-semibold uppercase mt-1"
                style={{ fontSize: 12, color: 'rgba(248,245,240,0.45)', letterSpacing: '0.05em' }}
              >
                {lbl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
