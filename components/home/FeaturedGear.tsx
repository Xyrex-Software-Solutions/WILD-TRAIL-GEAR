'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconWA, IconArrow } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'
import { CATALOG } from '@/lib/catalog-data'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedGear() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // Header reveal
    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 82%',
        },
      }
    )

    // Cards stagger float-up
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.gear-card')
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, { scope: sectionRef })

  // Show first 3 items as "featured"
  const featured = CATALOG.slice(0, 3)

  return (
    <section ref={sectionRef} className="bg-lifted py-24 px-16">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="flex justify-between items-end mb-14">
          <div>
            <Eyebrow label="Featured Rentals" />
            <h2
              className="font-black uppercase text-ink"
              style={{
                fontSize: 'clamp(28px,3.5vw,48px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              TRAIL{' '}
              <span className="font-light text-sage">ESSENTIALS</span>
            </h2>
          </div>
          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 bg-forest text-canvas rounded-btn px-6 py-2.5 text-sm font-semibold no-underline"
          >
            View All Gear <IconArrow />
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(item => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-forest text-canvas rounded-btn px-6 py-3 text-sm font-semibold no-underline"
          >
            View All Gear <IconArrow />
          </Link>
        </div>
      </div>
    </section>
  )
}

function GearCard({ item }: { item: typeof CATALOG[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -6, scale: 1.03, duration: 0.45, ease: 'power2.out' })
    gsap.to(badgeRef.current, { scale: 1.08, duration: 0.4, ease: 'sine.inOut', yoyo: true, repeat: 1 })
    if (cardRef.current) {
      cardRef.current.style.boxShadow = '0px 20px 48px rgba(0,0,0,0.12)'
    }
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1.0, duration: 0.55, ease: 'power2.out' })
    if (cardRef.current) {
      cardRef.current.style.boxShadow = 'none'
    }
  }

  const price = item.variants
    ? `from LKR ${item.variants[0].price.toLocaleString()}`
    : `LKR ${item.price?.toLocaleString()}`

  const availColor = item.availability === 'available' ? '#4ADE80' : item.availability === 'limited' ? '#FDBA74' : '#FF6B6B'
  const availLabel = item.availability === 'available' ? 'Available' : item.availability === 'limited' ? 'Limited' : 'Unavailable'

  return (
    <div
      ref={cardRef}
      className="gear-card bg-white rounded-card overflow-hidden cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Product image */}
      <div className="relative h-52">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)' }} />

        {/* Tag */}
        {item.tag && (
          <div className="absolute top-3.5 left-3.5 bg-forest text-canvas rounded-full text-[11px] font-bold px-3 py-1">
            {item.tag}
          </div>
        )}

        {/* Availability */}
        <div
          className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.55)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: availColor }} />
          {availLabel}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 pb-6">
        <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage mb-1.5">• {item.category}</div>
        <div className="text-base font-semibold text-ink mb-3.5" style={{ letterSpacing: '-0.01em' }}>{item.name}</div>

        {/* Variants if tent */}
        {item.variants && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.variants.map(v => (
              <span
                key={v.label}
                className="text-[11px] font-medium rounded-full px-2.5 py-0.5"
                style={{ background: '#EDE8E0', color: '#1A1A18' }}
              >
                {v.label} · LKR {v.price}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div
            ref={badgeRef}
            className="bg-olive text-canvas rounded-[10px] px-3.5 py-1.5 text-sm font-bold inline-block"
          >
            {price}
            <span className="text-[11px] font-normal opacity-70">/day</span>
          </div>
          <a
            href={waLink(item.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-whatsapp text-white rounded-[20px] px-3.5 py-2 text-xs font-semibold no-underline"
            style={{ background: item.availability === 'unavailable' ? '#ccc' : undefined }}
          >
            <IconWA size={13} />
            {item.availability === 'unavailable' ? 'Notify Me' : 'Rent Now'}
          </a>
        </div>
      </div>
    </div>
  )
}
