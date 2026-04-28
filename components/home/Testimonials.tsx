'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconPin } from '@/components/Icons'
import { StarRow } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Priyanka S.',
    loc: 'Colombo',
    rating: 5,
    text: 'Rented a tent and cooking set for Horton Plains. Everything was in perfect condition. The WhatsApp process was so easy — confirmed within an hour.',
  },
  {
    name: 'Raj & Tara',
    loc: 'Kandy',
    rating: 5,
    text: "Used the Weekend Warrior bundle for a Knuckles trek. Great gear, fair prices, and they even gave us trail tips for free. The anti-leech socks were a lifesaver. Will rent again.",
  },
  {
    name: 'Dinesh A.',
    loc: 'Galle',
    rating: 5,
    text: "As someone who doesn't want to invest in gear for occasional trips, Wild Trail Gear is exactly what I needed. The hammock and water bag made the trip perfect.",
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const statRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      leftRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      }
    )

    if (reviewsRef.current) {
      const cards = reviewsRef.current.querySelectorAll('.review-card')
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'power2.out', stagger: 0.14,
          scrollTrigger: { trigger: reviewsRef.current, start: 'top 80%' },
        }
      )
    }

    // Count-up for the rating number
    if (statRef.current) {
      const obj = { value: 0 }
      gsap.to(obj, {
        value: 4.9,
        duration: 2.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          if (statRef.current) {
            statRef.current.textContent = obj.value.toFixed(1)
          }
        },
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-lifted py-24 px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
          {/* Left */}
          <div ref={leftRef}>
            <Eyebrow label="Reviews" />
            <h2
              className="font-black uppercase text-ink"
              style={{
                fontSize: 'clamp(28px,3.5vw,48px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              WHAT OUR{' '}
              <span className="font-light text-sage">Adventurers say</span>
            </h2>
            <p className="text-[15px] text-slate leading-relaxed mt-5">
              Trusted by hikers, trekkers, and weekend explorers across Sri Lanka.
            </p>

            <div className="flex gap-3 mt-8">
              <div className="text-center">
                <div
                  ref={statRef}
                  className="font-black text-forest"
                  style={{ fontSize: 36, letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  0.0
                </div>
                <StarRow n={5} />
                <div className="text-[11px] text-slate mt-1">100+ reviews</div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div ref={reviewsRef} className="md:col-span-2 flex flex-col gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="review-card bg-white rounded-[20px] p-7"
                style={{ border: '1px solid #EDE8E0' }}
              >
                <StarRow n={t.rating} />
                <p
                  className="text-[15px] text-ink leading-relaxed italic my-3.5"
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #84A98C, #1B4332)' }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{t.name}</div>
                    <div className="text-xs text-slate flex items-center gap-1">
                      <IconPin size={11} /> {t.loc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
