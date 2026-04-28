'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconCompass, IconBoot, IconWA, IconSearch } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'
import { CATALOG, CATEGORIES, type CatalogItem } from '@/lib/catalog-data'

gsap.registerPlugin(ScrollTrigger)

const AVAIL_COLORS = {
  available: '#4ADE80',
  limited: '#FDBA74',
  unavailable: '#FF6B6B',
}
const AVAIL_LABELS = {
  available: 'Available',
  limited: 'Limited',
  unavailable: 'Unavailable',
}

export default function CatalogPage() {
  const [activeCat, setActiveCat] = useState('All')
  const [search, setSearch] = useState('')
  const [onlyAvail, setOnlyAvail] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (headerRef.current) {
      const children = headerRef.current.querySelectorAll('.header-reveal')
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', stagger: 0.15, delay: 0.1 }
      )
    }
  }, { scope: headerRef })

  useGSAP(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.catalog-card')
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08, delay: 0.15,
      }
    )
  }, { scope: gridRef, dependencies: [activeCat, search, onlyAvail] })

  const filtered = CATALOG.filter(g => {
    const matchCat = activeCat === 'All' || g.category === activeCat
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase())
    const matchAvail = !onlyAvail || g.availability !== 'unavailable'
    return matchCat && matchSearch && matchAvail
  })

  return (
    <div className="bg-canvas min-h-screen pt-24">
      {/* Page header */}
      <div ref={headerRef} className="bg-forest px-16 py-16 pb-20 relative overflow-hidden">
        <div className="absolute right-[4%] top-[10%] opacity-[0.1]">
          <IconCompass size={200} color="#F8F5F0" />
        </div>
        <div className="absolute left-[3%] bottom-[5%] opacity-[0.08]">
          <IconBoot size={150} color="#F8F5F0" />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="header-reveal">
            <Eyebrow label="Rental Catalog" light />
          </div>
          <h1
            className="header-reveal font-black uppercase text-canvas"
            style={{
              fontSize: 'clamp(32px,5vw,64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              marginBottom: 12,
            }}
          >
            ALL GEAR<br />
            <span className="font-light text-sage-light">Available to Rent</span>
          </h1>
          <p className="header-reveal text-base max-w-md" style={{ color: 'rgba(248,245,240,0.6)' }}>
            Browse our full catalog. Message us on WhatsApp to confirm availability and book your rental.
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div
        className="bg-white px-16 py-5 sticky top-20 z-50"
        style={{ borderBottom: '1px solid #EDE8E0' }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center gap-6 flex-wrap">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="rounded-full px-[18px] py-[7px] text-[13px] font-semibold transition-all duration-150 cursor-pointer"
                style={{
                  background: activeCat === cat ? '#1B4332' : 'transparent',
                  color: activeCat === cat ? '#F8F5F0' : '#1A1A18',
                  border: `1.5px solid ${activeCat === cat ? '#1B4332' : '#EDE8E0'}`,
                  fontFamily: 'inherit',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Available only toggle */}
          <label className="flex items-center gap-2 text-[13px] font-semibold text-slate cursor-pointer whitespace-nowrap select-none">
            <div
              onClick={() => setOnlyAvail(v => !v)}
              className="relative cursor-pointer transition-colors duration-200"
              style={{
                width: 36, height: 20, borderRadius: 999,
                background: onlyAvail ? '#1B4332' : '#EDE8E0',
              }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                style={{ left: onlyAvail ? 18 : 2 }}
              />
            </div>
            Available only
          </label>

          {/* Search */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <IconSearch size={14} />
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search gear…"
              className="pl-8 pr-4 py-2 rounded-full text-[13px] bg-canvas text-ink outline-none"
              style={{
                border: '1.5px solid #EDE8E0',
                fontFamily: 'inherit',
                width: 180,
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-16 pt-14 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate">
            <div className="text-6xl mb-4 opacity-20">⛺</div>
            <p className="text-base">No gear found. Try a different filter or search.</p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
          >
            {filtered.map(item => (
              <CatalogCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 text-[13px] text-slate">
          Showing {filtered.length} of {CATALOG.length} items
        </div>
      </div>
    </div>
  )
}

function CatalogCard({ item }: { item: CatalogItem }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, { y: -5, scale: 1.02, duration: 0.45, ease: 'power2.out' })
    gsap.to(badgeRef.current, { scale: 1.07, duration: 0.35, ease: 'sine.inOut', yoyo: true, repeat: 1 })
    if (cardRef.current) cardRef.current.style.boxShadow = '0px 16px 40px rgba(0,0,0,0.09)'
  }
  const handleLeave = () => {
    gsap.to(cardRef.current, { y: 0, scale: 1.0, duration: 0.55, ease: 'power2.out' })
    if (cardRef.current) cardRef.current.style.boxShadow = 'none'
  }

  return (
    <div
      ref={cardRef}
      className="catalog-card bg-white rounded-card overflow-hidden"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image */}
      <div className="relative h-48">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.30) 100%)' }} />

        {/* Tag */}
        {item.tag && (
          <div className="absolute top-3.5 left-3.5 bg-forest text-canvas rounded-full text-[11px] font-bold px-3 py-1">
            {item.tag}
          </div>
        )}

        {/* Availability badge */}
        <div
          className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.55)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: AVAIL_COLORS[item.availability] }}
          />
          {AVAIL_LABELS[item.availability]}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 pb-6">
        <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage mb-1.5">• {item.category}</div>
        <div className="text-base font-semibold text-ink mb-3" style={{ letterSpacing: '-0.01em', lineHeight: 1.3 }}>
          {item.name}
        </div>

        {/* Tent size variants */}
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

        <div className="flex justify-between items-center mt-4">
          <div
            ref={badgeRef}
            className="bg-olive text-canvas rounded-[10px] px-3.5 py-1.5 text-sm font-bold inline-block"
          >
            {item.variants
              ? `from LKR ${item.variants[0].price.toLocaleString()}`
              : `LKR ${item.price?.toLocaleString()}`}
            {!item.variants && <span className="text-[11px] font-normal opacity-70">/day</span>}
          </div>
          <a
            href={waLink(item.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[20px] px-4 py-2 text-xs font-semibold text-white no-underline"
            style={{
              background: item.availability === 'unavailable' ? '#b0b0b0' : '#25D366',
              pointerEvents: item.availability === 'unavailable' ? 'none' : 'auto',
            }}
          >
            <IconWA size={13} />
            {item.availability === 'unavailable' ? 'Unavailable' : 'Rent Now'}
          </a>
        </div>
      </div>
    </div>
  )
}
