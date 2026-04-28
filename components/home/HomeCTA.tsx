'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconCompass, IconBoot, IconWA } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return

    const children = contentRef.current.querySelectorAll('.cta-reveal')
    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-forest py-24 px-16 relative overflow-hidden">
      {/* Background image tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/camping-eg1.webp"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(135deg, rgba(27,67,50,0.92) 0%, rgba(20,46,35,0.96) 100%)' }}
      />

      {/* Decorative */}
      <div className="absolute z-[1] top-[10%] right-[5%] opacity-[0.07]">
        <IconCompass size={280} color="#F8F5F0" />
      </div>
      <div className="absolute z-[1] bottom-[5%] left-[3%] opacity-[0.05]">
        <IconBoot size={200} color="#F8F5F0" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-[2] text-center max-w-xl mx-auto">
        <div className="cta-reveal">
          <Eyebrow label="Your Next Adventure" light className="justify-center" />
        </div>
        <h2
          className="cta-reveal font-black uppercase text-canvas"
          style={{
            fontSize: 'clamp(32px,4.5vw,60px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            marginBottom: 24,
          }}
        >
          GEAR UP FOR YOUR<br />
          <span className="font-light text-sage-light">Next Adventure</span>
        </h2>
        <p className="cta-reveal text-base leading-relaxed mb-10" style={{ color: 'rgba(248,245,240,0.65)' }}>
          The trail is waiting. Message us on WhatsApp and we&rsquo;ll have your gear ready in no time.
        </p>
        <div className="cta-reveal flex gap-4 justify-center flex-wrap">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-whatsapp text-white rounded-btn px-8 py-3.5 text-[15px] font-semibold no-underline"
          >
            <IconWA /> Chat on WhatsApp
          </a>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2.5 text-canvas rounded-btn px-7 py-[13px] text-[15px] font-medium no-underline"
            style={{ border: '1.5px solid rgba(248,245,240,0.4)' }}
          >
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  )
}
