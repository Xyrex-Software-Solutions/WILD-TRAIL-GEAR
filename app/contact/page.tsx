'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { IconCompass, IconBoot, IconWA, IconPhone, IconMail, IconPin, IconArrow } from '@/components/Icons'
import Eyebrow from '@/components/Eyebrow'
import { waLink } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  { q: 'How do I rent gear?', a: "Just message us on WhatsApp with the gear you need and your dates. We'll confirm availability and pricing right away." },
  { q: "What's the minimum rental period?", a: 'We have a 2-day minimum for most items. Bundles require at least 3 days.' },
  { q: 'Can I pick up the gear?', a: 'Yes! Collect from our location in Panadura. We can also discuss delivery for large orders.' },
  { q: 'What if gear is damaged?', a: 'Normal wear is expected. We assess damage fairly and keep charges transparent — always discussed before any deduction.' },
  { q: 'Do you offer last-minute rentals?', a: "We do our best! Message us on WhatsApp and we'll check availability immediately." },
  { q: 'Is payment in LKR?', a: 'Yes, all prices are in Sri Lankan Rupees. We accept cash on pickup and selected digital payments.' },
]

type FormState = { name: string; phone: string; gear: string; days: string; message: string }

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', gear: '', days: '', message: '' })
  const [sent, setSent] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (headerRef.current) {
      const items = headerRef.current.querySelectorAll('.header-reveal')
      gsap.fromTo(items, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out', stagger: 0.15, delay: 0.1,
      })
    }

    if (formRef.current) {
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.0, ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 82%' },
      })
    }

    if (faqRef.current) {
      const cards = faqRef.current.querySelectorAll('.faq-card')
      gsap.fromTo(cards, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: faqRef.current, start: 'top 78%' },
      })
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleWhatsApp = () => {
    if (!form.name || !form.gear) return
    const msg = [
      `Hi Wild Trail Gear! 👋`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone || 'N/A'}`,
      `Gear needed: ${form.gear}`,
      `Number of days: ${form.days || 'TBD'}`,
      form.message ? `` : null,
      form.message || null,
    ].filter(l => l !== null).join('\n')
    window.open(waLink(msg), '_blank')
    setSent(true)
  }

  const inputClass = `w-full px-4 py-3 rounded-[14px] text-[15px] text-ink bg-white outline-none transition-colors duration-150`
  const inputStyle = { border: '1.5px solid #EDE8E0', fontFamily: 'inherit' }

  return (
    <div className="bg-canvas min-h-screen pt-24">

      {/* Header */}
      <div ref={headerRef} className="bg-forest px-16 py-20 pb-24 relative overflow-hidden">
        <div className="absolute right-[4%] top-[10%] opacity-[0.1]"><IconBoot size={200} color="#F8F5F0" /></div>
        <div className="absolute left-[3%] bottom-[-5%] opacity-[0.08]"><IconCompass size={220} color="#F8F5F0" /></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="header-reveal"><Eyebrow label="Get In Touch" light /></div>
          <h1
            className="header-reveal font-black uppercase text-canvas"
            style={{ fontSize: 'clamp(36px,5vw,68px)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 16 }}
          >
            LET&rsquo;S PLAN<br />
            <span className="font-light text-sage-light">Your Adventure</span>
          </h1>
          <p className="header-reveal text-[17px] max-w-md leading-relaxed" style={{ color: 'rgba(248,245,240,0.65)' }}>
            Tell us what you need. We&rsquo;ll get back to you on WhatsApp — usually within the hour.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1200px] mx-auto px-16 py-20 pb-24">
        <div ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

          {/* Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-[28px] font-bold text-ink mb-2" style={{ letterSpacing: '-0.02em' }}>Send us a rental enquiry</h2>
              <p className="text-[15px] text-slate leading-relaxed">Fill in the details below and we&rsquo;ll open WhatsApp with everything pre-filled. Quick and easy.</p>
            </div>

            {sent ? (
              <div className="bg-forest rounded-3xl p-10 text-center">
                <div className="flex justify-center mb-4">
                  <IconWA size={48} color="#25D366" />
                </div>
                <div className="text-xl font-bold text-canvas mb-2.5">WhatsApp opened!</div>
                <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'rgba(248,245,240,0.65)' }}>
                  Your message is ready to send. Just hit send in WhatsApp and we&rsquo;ll reply shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="rounded-btn px-6 py-2.5 text-sm font-semibold text-canvas cursor-pointer transition-colors"
                  style={{ background: 'rgba(248,245,240,0.15)', border: 'none', fontFamily: 'inherit' }}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4.5">
                {([
                  { name: 'name', label: 'Your Name *', placeholder: 'e.g. Kasun Perera', type: 'text' },
                  { name: 'phone', label: 'Phone / WhatsApp Number', placeholder: 'e.g. +94 77 000 0000', type: 'tel' },
                  { name: 'gear', label: 'Gear You Need *', placeholder: 'e.g. Manual Tent (4P), Cooking Set', type: 'text' },
                  { name: 'days', label: 'Number of Days', placeholder: 'e.g. 3 days (Feb 10–12)', type: 'text' },
                ] as const).map(field => (
                  <div key={field.name} className="mt-1">
                    <label className="text-[12px] font-bold tracking-eyebrow uppercase text-slate block mb-2">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name as keyof FormState]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={inputClass}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#1B4332')}
                      onBlur={e => (e.target.style.borderColor = '#EDE8E0')}
                    />
                  </div>
                ))}

                <div className="mt-1">
                  <label className="text-[12px] font-bold tracking-eyebrow uppercase text-slate block mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any trail info, special requests, or questions…"
                    rows={4}
                    className={inputClass}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => (e.target.style.borderColor = '#1B4332')}
                    onBlur={e => (e.target.style.borderColor = '#EDE8E0')}
                  />
                </div>

                <button
                  onClick={handleWhatsApp}
                  disabled={!form.name || !form.gear}
                  className="mt-1 flex items-center justify-center gap-2.5 rounded-btn py-3.5 text-[15px] font-semibold w-full transition-all duration-200 cursor-pointer"
                  style={{
                    background: (!form.name || !form.gear) ? '#EDE8E0' : '#25D366',
                    color: (!form.name || !form.gear) ? '#6B7B6F' : '#fff',
                    cursor: (!form.name || !form.gear) ? 'not-allowed' : 'pointer',
                    border: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  <IconWA size={18} color={(!form.name || !form.gear) ? '#6B7B6F' : '#fff'} />
                  Open WhatsApp to Send
                </button>

                <p className="text-[12px] text-dust text-center mt-1">
                  * Required fields. This opens WhatsApp — no data is stored on this website.
                </p>
              </div>
            )}
          </div>

          {/* Right — contact info */}
          <div>
            <div className="flex flex-col gap-4 mb-12">
              <h3 className="text-lg font-bold text-ink mb-2">Or reach us directly</h3>
              {[
                { icon: <IconWA size={20} color="#fff" />, bg: '#25D366', label: 'WhatsApp', val: '+94 754 768 386', sub: 'Usually replies within the hour', href: waLink() },
                { icon: <IconPhone size={20} color="#1B4332" />, bg: '#EDE8E0', label: 'Phone', val: '+94 754 768 386', sub: 'Call us anytime', href: 'tel:+94754768386' },
                { icon: <IconMail size={20} color="#1B4332" />, bg: '#EDE8E0', label: 'Email', val: 'hello@wildtrailgear.lk', sub: 'We reply within 24 hours', href: 'mailto:hello@wildtrailgear.lk' },
                { icon: <IconPin size={20} color="#1B4332" />, bg: '#EDE8E0', label: 'Visit Us', val: 'Panadura, Sri Lanka', sub: 'Come pick up your gear', href: null },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white rounded-[20px] p-5"
                  style={{ border: '1px solid #EDE8E0', cursor: item.href ? 'pointer' : 'default' }}
                  onClick={() => item.href && window.open(item.href, '_blank')}
                >
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold tracking-eyebrow uppercase text-sage mb-0.5">{item.label}</div>
                    <div className="text-[15px] font-semibold text-ink">{item.val}</div>
                    <div className="text-xs text-slate">{item.sub}</div>
                  </div>
                  {item.href && <IconArrow color="#52796F" size={14} />}
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-forest rounded-3xl p-7">
              <div className="text-[13px] font-bold tracking-eyebrow uppercase text-sage-light mb-4">• Pickup Hours</div>
              {[
                ['Monday – Friday', '8:00 AM – 6:00 PM'],
                ['Saturday', '7:00 AM – 5:00 PM'],
                ['Sunday', '8:00 AM – 2:00 PM'],
              ].map(([day, hrs]) => (
                <div
                  key={day}
                  className="flex justify-between py-2.5 text-sm"
                  style={{ borderBottom: '1px solid rgba(248,245,240,0.1)' }}
                >
                  <span style={{ color: 'rgba(248,245,240,0.7)' }}>{day}</span>
                  <span className="font-semibold text-canvas">{hrs}</span>
                </div>
              ))}
              <p className="text-[13px] mt-4" style={{ color: 'rgba(248,245,240,0.4)' }}>
                WhatsApp available beyond these hours for urgent requests.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-24">
          <div className="text-center mb-14">
            <Eyebrow label="FAQ" className="justify-center" />
            <h2
              className="font-black uppercase text-ink"
              style={{ fontSize: 'clamp(28px,3.5vw,44px)', letterSpacing: '-0.03em' }}
            >
              COMMON <span className="font-light text-sage">Questions</span>
            </h2>
          </div>
          <div ref={faqRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="faq-card bg-white rounded-[20px] p-6"
                style={{ border: '1px solid #EDE8E0' }}
              >
                <div className="text-base font-bold text-ink mb-2.5" style={{ letterSpacing: '-0.01em' }}>{faq.q}</div>
                <div className="text-sm text-slate leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
