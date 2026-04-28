'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  IconCompass, IconBoot, IconTent, IconBackpack,
  IconShield, IconCheck, IconPin, IconWA, IconMail, IconArrow
} from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    icon: <IconCompass size={28} color="#1B4332" />,
    title: 'Trail-Tested',
    body: "We've hiked every major trail in Sri Lanka. Every gear item we stock has been tested by us first.",
  },
  {
    icon: <IconShield size={28} color="#1B4332" />,
    title: 'Honest Rental',
    body: 'No hidden charges, no complicated forms. You know exactly what you pay before you confirm.',
  },
  {
    icon: <IconTent size={28} color="#1B4332" />,
    title: 'Local Roots',
    body: "Based in Panadura, we know the island's trails intimately — from Sinharaja to Adam's Peak.",
  },
  {
    icon: <IconBackpack size={28} color="#1B4332" />,
    title: 'Gear That Works',
    body: 'We retire gear before it becomes unreliable. You always get equipment that performs.',
  },
]

const TEAM = [
  { name: 'Kasun Perera', role: 'Founder & Trail Guide', initials: 'KP', gradient: 'linear-gradient(135deg, #1B4332, #52796F)' },
  { name: 'Nimal Silva', role: 'Gear Curator', initials: 'NS', gradient: 'linear-gradient(135deg, #52796F, #84A98C)' },
  { name: 'Amali Wickrama', role: 'Customer Experience', initials: 'AW', gradient: 'linear-gradient(135deg, #84A98C, #2D4A35)' },
]

const STATS = [
  { val: 2019, suffix: '', label: 'Founded' },
  { val: 500, suffix: '+', label: 'Gear Items' },
  { val: 1200, suffix: '+', label: 'Happy Renters' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const storyLeftRef = useRef<HTMLDivElement>(null)
  const storyRightRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    // Hero reveal
    if (heroRef.current) {
      const items = heroRef.current.querySelectorAll('.hero-reveal')
      gsap.fromTo(items, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power2.out', stagger: 0.18, delay: 0.15,
      })
    }

    // Values cards
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll('.value-card')
      gsap.fromTo(cards, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: valuesRef.current, start: 'top 78%' },
      })
    }

    // Story — horizontal reveal (dark section)
    if (storyLeftRef.current) {
      gsap.fromTo(storyLeftRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.3, ease: 'power2.out',
        scrollTrigger: { trigger: storyLeftRef.current, start: 'top 78%' },
      })
    }
    if (storyRightRef.current) {
      gsap.fromTo(storyRightRef.current, { x: 60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.3, ease: 'power2.out',
        scrollTrigger: { trigger: storyRightRef.current, start: 'top 78%' },
      })
    }

    // Team cards
    if (teamRef.current) {
      const cards = teamRef.current.querySelectorAll('.team-card')
      gsap.fromTo(cards, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: teamRef.current, start: 'top 78%' },
      })
    }

    // Stats count-up
    statsRefs.current.forEach((el, i) => {
      if (!el) return
      const stat = STATS[i]
      const obj = { value: 0 }
      gsap.to(obj, {
        value: stat.val,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate() {
          if (el) el.textContent = Math.round(obj.value).toLocaleString() + stat.suffix
        },
      })
    })
  })

  return (
    <div className="bg-canvas min-h-screen pt-24">

      {/* Hero */}
      <div ref={heroRef} className="bg-forest px-16 py-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpeg" alt="" fill className="object-cover opacity-20" sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to right, rgba(27,67,50,0.96) 40%, rgba(27,67,50,0.72) 100%)' }} />
        <div className="absolute right-[5%] top-[15%] z-[1] opacity-[0.1]">
          <IconCompass size={240} color="#F8F5F0" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-[2]">
          <div style={{ maxWidth: 640 }}>
            <div className="hero-reveal"><Eyebrow label="Our Story" light /></div>
            <h1
              className="hero-reveal font-black uppercase text-canvas"
              style={{ fontSize: 'clamp(36px,5vw,68px)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 24 }}
            >
              GEAR FROM<br />
              <span className="font-light text-sage-light">Trail Lovers</span>
            </h1>
            <p className="hero-reveal text-[17px] leading-relaxed mb-10" style={{ color: 'rgba(248,245,240,0.72)' }}>
              Wild Trail Gear started with a simple frustration: great trails, but no easy way to access good gear. We built the rental shop we wished existed — local, honest, and run by people who actually use the gear.
            </p>
            <div className="hero-reveal flex gap-10 pt-8 flex-wrap" style={{ borderTop: '1px solid rgba(248,245,240,0.12)' }}>
              {STATS.map((s, i) => (
                <div key={s.label}>
                  <div
                    ref={el => { statsRefs.current[i] = el }}
                    className="font-black text-canvas"
                    style={{ fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    0
                  </div>
                  <div className="text-[12px] font-semibold uppercase mt-1" style={{ color: 'rgba(248,245,240,0.45)', letterSpacing: '0.05em' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div ref={valuesRef} className="bg-lifted py-24 px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <Eyebrow label="What We Stand For" className="justify-center" />
            <h2
              className="font-black uppercase text-ink"
              style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-0.03em' }}
            >
              OUR <span className="font-light text-sage">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card bg-white rounded-card p-8" style={{ border: '1px solid #EDE8E0' }}>
                <div className="bg-canvas rounded-2xl p-3 inline-block mb-5 text-forest">{v.icon}</div>
                <div className="text-[17px] font-bold text-ink mb-2.5" style={{ letterSpacing: '-0.01em' }}>{v.title}</div>
                <div className="text-sm text-slate leading-relaxed">{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story — horizontal reveal (image + text) */}
      <div className="bg-canvas py-24 px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            {/* Image */}
            <div ref={storyLeftRef} className="relative">
              <div className="rounded-[40px] overflow-hidden relative" style={{ aspectRatio: '4/5' }}>
                <Image
                  src="/images/hero-bg.jpeg"
                  alt="Sri Lankan mountain trail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-forest rounded-3xl p-5 text-canvas" style={{ maxWidth: 200 }}>
                <div className="font-black text-2xl" style={{ letterSpacing: '-0.03em' }}>100%</div>
                <div className="text-[13px] text-sage-light mt-1 leading-snug">Gear inspected before every rental</div>
              </div>
              {/* Compass decor */}
              <div className="absolute -top-5 -left-5 bg-bone rounded-full p-4">
                <IconCompass size={32} />
              </div>
            </div>

            {/* Text */}
            <div ref={storyRightRef}>
              <Eyebrow label="The Wild Trail Story" />
              <h2
                className="font-black uppercase text-ink"
                style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}
              >
                BUILT FOR<br />
                <span className="font-light text-sage">Sri Lanka&rsquo;s Trails</span>
              </h2>
              <p className="text-base text-slate leading-loose mb-5">
                It started on a rainy weekend on the Knuckles Range. Our founder Kasun arrived to find half his group without proper gear — borrowed mismatched jackets and worn-out boots. The trail was beautiful. The gear situation was not.
              </p>
              <p className="text-base text-slate leading-loose mb-10">
                That trip sparked Wild Trail Gear. A local rental shop where every piece of gear is handpicked, properly maintained, and available at fair prices — so more Sri Lankans can enjoy the outdoors without the gear barrier.
              </p>
              <div className="flex flex-col gap-3.5">
                {[
                  'Gear inspected and cleaned after every rental',
                  'Friendly WhatsApp support 7 days a week',
                  'Fair pricing in LKR — no hidden costs',
                  'Free trail advice with every rental',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-[15px] text-ink">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-forest flex items-center justify-center">
                      <IconCheck size={11} color="#fff" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-forest py-24 px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <Eyebrow label="The Team" light className="justify-center" />
            <h2
              className="font-black uppercase text-canvas"
              style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-0.03em' }}
            >
              MEET THE <span className="font-light text-sage-light">Crew</span>
            </h2>
          </div>
          <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="team-card rounded-[32px] p-10 text-center"
                style={{
                  background: 'rgba(248,245,240,0.07)',
                  border: '1px solid rgba(248,245,240,0.1)',
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white mx-auto mb-5"
                  style={{ background: member.gradient }}
                >
                  {member.initials}
                </div>
                <div className="text-lg font-bold text-canvas mb-1.5">{member.name}</div>
                <div className="text-[13px] text-sage-light tracking-wide">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-canvas py-24 px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <Eyebrow label="Find Us" />
            <h2
              className="font-black uppercase text-ink"
              style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}
            >
              VISIT US IN<br />
              <span className="font-light text-sage">Panadura</span>
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { icon: <IconPin size={18} />, label: 'Address', val: 'Panadura, Western Province, Sri Lanka' },
                { icon: <IconWA size={18} />, label: 'WhatsApp', val: '+94 754 768 386', href: waLink() },
                { icon: <IconMail size={18} />, label: 'Email', val: 'hello@wildtrailgear.lk', href: 'mailto:hello@wildtrailgear.lk' },
              ].map(({ icon, label, val, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-[14px] bg-canvas flex items-center justify-center flex-shrink-0 text-forest"
                    style={{ border: '1.5px solid #EDE8E0' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-ink font-medium no-underline hover:text-forest">{val}</a>
                    ) : (
                      <div className="text-[15px] text-ink font-medium">{val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div
            className="rounded-[40px] overflow-hidden bg-bone flex flex-col items-center justify-center gap-4 py-16"
            style={{ aspectRatio: '4/3', border: '1px solid #EDE8E0' }}
          >
            <IconPin size={48} color="#52796F" />
            <div className="text-base font-semibold text-slate">Panadura, Sri Lanka</div>
            <a
              href="https://maps.google.com/?q=Panadura,Sri+Lanka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest text-canvas rounded-btn px-5 py-2.5 text-[13px] font-semibold no-underline mt-2"
            >
              Open in Maps <IconArrow size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
