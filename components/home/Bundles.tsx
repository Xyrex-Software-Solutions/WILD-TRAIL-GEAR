'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconWA, IconCheck } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const BUNDLES = [
  {
    name: 'Weekend Warrior',
    desc: 'Everything for a 2-day trail. Tent, cooking set, hammock, anti-leech socks.',
    price: 'LKR 1,250',
    items: ['Manual Tent (3P)', 'Cooking Set', 'Hammock', 'Anti Leech Socks'],
    hasImage: true,
  },
  {
    name: 'Full Expedition',
    desc: 'Complete kit for multi-day treks. Everything you need, nothing you don\'t.',
    price: 'LKR 2,100',
    items: ['Manual Tent (6P)', 'Gas Stove', 'Cooking Set', 'Water Bag 3L', 'Hammock'],
    hasImage: false,
  },
  {
    name: 'Day Hiker',
    desc: 'Light and fast. Essentials for a single-day trail.',
    price: 'LKR 450',
    items: ['Anti Leech Socks', 'Water Bag 3L'],
    hasImage: false,
  },
  {
    name: 'Camp Cook Kit',
    desc: 'Everything for preparing meals at basecamp.',
    price: 'LKR 550',
    items: ['Windproof Gas Stove', 'Cooking Set'],
    hasImage: false,
  },
]

export default function Bundles() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      }
    )

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.bundle-card')
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-canvas py-24 px-16">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <Eyebrow label="Gear Bundles" className="justify-center" />
          <h2
            className="font-black uppercase text-ink"
            style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-0.03em' }}
          >
            ADVENTURE{' '}
            <span className="font-light text-sage">Packages</span>
          </h2>
          <p className="text-base text-slate mt-4 mx-auto" style={{ maxWidth: 480 }}>
            Bundle your rentals and save. Curated kits for every type of adventure.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUNDLES.map((b, i) => (
            <div
              key={i}
              className={`bundle-card rounded-[32px] overflow-hidden relative ${i === 0 ? 'bg-forest' : 'bg-white border border-bone'}`}
            >
              {/* Hero image for first card */}
              {i === 0 && (
                <div className="relative h-48">
                  <Image
                    src="/images/camping-eg.webp"
                    alt="Weekend camping gear"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(27,67,50,0.3) 0%, rgba(27,67,50,0.72) 100%)' }} />
                </div>
              )}

              <div className="p-8 pb-8">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div
                      className="text-[11px] font-bold tracking-eyebrow uppercase mb-1.5"
                      style={{ color: i === 0 ? '#84A98C' : '#52796F' }}
                    >
                      • Bundle
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: i === 0 ? '#F8F5F0' : '#1A1A18', letterSpacing: '-0.02em' }}
                    >
                      {b.name}
                    </div>
                  </div>
                  <div
                    className="bg-olive text-canvas rounded-xl px-3.5 py-1.5 text-[15px] font-bold flex-shrink-0"
                  >
                    {b.price}
                    <span className="text-[11px] font-normal opacity-70">/day</span>
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: i === 0 ? 'rgba(248,245,240,0.65)' : '#6B7B6F' }}
                >
                  {b.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {b.items.map(item => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1"
                      style={{
                        background: i === 0 ? 'rgba(248,245,240,0.1)' : '#EDE8E0',
                        color: i === 0 ? '#F8F5F0' : '#1A1A18',
                      }}
                    >
                      <IconCheck size={10} color={i === 0 ? '#84A98C' : '#1B4332'} />
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={waLink(`Hi! I'm interested in the "${b.name}" rental bundle (${b.price}/day). Can you share availability?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-btn px-5.5 py-2.5 text-sm font-semibold no-underline"
                  style={{
                    background: i === 0 ? '#F8F5F0' : '#1B4332',
                    color: i === 0 ? '#1B4332' : '#F8F5F0',
                    padding: '10px 22px',
                  }}
                >
                  <IconWA size={14} color={i === 0 ? '#1B4332' : '#fff'} />
                  Rent This Bundle
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
