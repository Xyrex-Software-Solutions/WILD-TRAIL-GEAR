// ============================================================
// WILD TRAIL GEAR — Contact Page
// ============================================================

function ContactPage() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [form, setForm] = React.useState({ name: '', phone: '', gear: '', days: '', message: '' });
  const [sent, setSent] = React.useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleWhatsApp = () => {
    if (!form.name || !form.gear) return;
    const msg = `Hi Wild Trail Gear! 👋\n\nName: ${form.name}\nPhone: ${form.phone || 'N/A'}\nGear needed: ${form.gear}\nNumber of days: ${form.days || 'TBD'}\n\n${form.message || ''}`.trim();
    window.open(waLink(msg), '_blank');
    setSent(true);
  };

  const faqs = [
    { q: 'How do I rent gear?', a: 'Just message us on WhatsApp with the gear you need and your dates. We\'ll confirm availability and pricing right away.' },
    { q: 'What\'s the minimum rental period?', a: 'We have a 2-day minimum for most items. Bundles require at least 3 days.' },
    { q: 'Can I pick up the gear?', a: 'Yes! Collect from our location in Panadura. We can also discuss delivery for large orders.' },
    { q: 'What if gear is damaged?', a: 'Normal wear is expected. We assess damage fairly and keep charges transparent — always discussed before any deduction.' },
    { q: 'Do you offer last-minute rentals?', a: 'We do our best! Message us on WhatsApp and we\'ll check availability immediately.' },
    { q: 'Is payment in LKR?', a: 'Yes, all prices are in Sri Lankan Rupees. We accept cash on pickup and selected digital payments.' },
  ];

  return (
    <div data-screen-label="Contact" style={{ background: C.canvas, minHeight: '100vh', paddingTop: 96 }}>

      {/* Header */}
      <div style={{ background: C.forest, padding: '80px 64px 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '4%', top: '10%', opacity: .1 }}><IconBoot size={200} color="#F8F5F0"/></div>
        <div style={{ position: 'absolute', left: '3%', bottom: '-5%', opacity: .08 }}><IconCompass size={220} color="#F8F5F0"/></div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Eyebrow label="Get In Touch" light/>
          <h1 style={{ fontSize: 'clamp(36px,5vw,68px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.canvas, lineHeight: 1.0, marginBottom: 16 }}>
            LET'S PLAN<br/><span style={{ fontWeight: 300, color: C.sageLight }}>Your Adventure</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(248,245,240,.65)', maxWidth: 480, lineHeight: 1.7 }}>
            Tell us what you need. We'll get back to you on WhatsApp — usually within the hour.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 64px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left — form */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: C.ink, letterSpacing: '-.02em', marginBottom: 8 }}>Send us a rental enquiry</h2>
              <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.6 }}>Fill in the details below and we'll open WhatsApp with everything pre-filled. Quick and easy.</p>
            </div>

            {sent ? (
              <div style={{ background: C.forest, borderRadius: 24, padding: '40px 36px', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>
                  <IconWA size={48} color={C.whatsapp}/>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.canvas, marginBottom: 10 }}>WhatsApp opened!</div>
                <p style={{ fontSize: 15, color: 'rgba(248,245,240,.65)', lineHeight: 1.6, marginBottom: 24 }}>Your message is ready to send. Just hit send in WhatsApp and we'll reply shortly.</p>
                <button onClick={() => setSent(false)} style={{ background: 'rgba(248,245,240,.15)', color: C.canvas, border: 'none', borderRadius: 20, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { name: 'name', label: 'Your Name *', placeholder: 'e.g. Kasun Perera', type: 'text' },
                  { name: 'phone', label: 'Phone / WhatsApp Number', placeholder: 'e.g. +94 77 000 0000', type: 'tel' },
                  { name: 'gear', label: 'Gear You Need *', placeholder: 'e.g. 2-person tent, 40L backpack, sleeping bag', type: 'text' },
                  { name: 'days', label: 'Number of Days', placeholder: 'e.g. 3 days (Feb 10–12)', type: 'text' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: C.slate, display: 'block', marginBottom: 8 }}>{field.label}</label>
                    <input
                      name={field.name} type={field.type}
                      value={form[field.name]} onChange={handleChange}
                      placeholder={field.placeholder}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.bone}`, fontSize: 15, fontFamily: 'inherit', background: C.white, color: C.ink, outline: 'none', transition: 'border-color .15s' }}
                      onFocus={e => e.target.style.borderColor = C.forest}
                      onBlur={e => e.target.style.borderColor = C.bone}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: C.slate, display: 'block', marginBottom: 8 }}>Additional Notes</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Any trail info, special requests, or questions…"
                    rows={4}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 14, border: `1.5px solid ${C.bone}`, fontSize: 15, fontFamily: 'inherit', background: C.white, color: C.ink, outline: 'none', resize: 'vertical', transition: 'border-color .15s' }}
                    onFocus={e => e.target.style.borderColor = C.forest}
                    onBlur={e => e.target.style.borderColor = C.bone}
                  />
                </div>
                <button onClick={handleWhatsApp}
                  disabled={!form.name || !form.gear}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: (!form.name || !form.gear) ? C.bone : C.whatsapp, color: (!form.name || !form.gear) ? C.slate : '#fff', borderRadius: 20, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: (!form.name || !form.gear) ? 'not-allowed' : 'pointer', border: 'none', fontFamily: 'inherit', width: '100%', transition: 'all .2s' }}>
                  <IconWA size={18} color={(!form.name || !form.gear) ? C.slate : '#fff'}/>
                  Open WhatsApp to Send
                </button>
                <p style={{ fontSize: 12, color: C.dust, textAlign: 'center' }}>* Required fields. This opens WhatsApp — no data is stored on this website.</p>
              </div>
            )}
          </div>

          {/* Right — info */}
          <div>
            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Or reach us directly</h3>
              {[
                { icon: <IconWA size={20} color="#fff"/>, bg: C.whatsapp, label: 'WhatsApp', val: '+94 754 768 386', sub: 'Usually replies within the hour', href: waLink() },
                { icon: <IconPhone size={20} color={C.forest}/>, bg: C.bone, label: 'Phone', val: '+94 754 768 386', sub: 'Call us anytime', href: 'tel:+94754768386' },
                { icon: <IconMail size={20} color={C.forest}/>, bg: C.bone, label: 'Email', val: 'hello@wildtrailgear.lk', sub: 'We reply within 24 hours', href: 'mailto:hello@wildtrailgear.lk' },
                { icon: <IconPin size={20} color={C.forest}/>, bg: C.bone, label: 'Visit Us', val: 'Panadura, Sri Lanka', sub: 'Come pick up your gear', href: null },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: C.white, borderRadius: 20, padding: '18px 20px', border: `1px solid ${C.bone}`, cursor: item.href ? 'pointer' : 'default' }}
                  onClick={() => item.href && window.open(item.href, '_blank')}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.sage, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{item.val}</div>
                    <div style={{ fontSize: 12, color: C.slate }}>{item.sub}</div>
                  </div>
                  {item.href && <IconArrow color={C.sage} size={14}/>}
                </div>
              ))}
            </div>
            {/* Hours */}
            <div style={{ background: C.forest, borderRadius: 24, padding: '28px 28px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: C.sageLight, marginBottom: 16 }}>• Pickup Hours</div>
              {[['Monday – Friday', '8:00 AM – 6:00 PM'], ['Saturday', '7:00 AM – 5:00 PM'], ['Sunday', '8:00 AM – 2:00 PM']].map(([day, hrs]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(248,245,240,.1)', fontSize: 14 }}>
                  <span style={{ color: 'rgba(248,245,240,.7)' }}>{day}</span>
                  <span style={{ color: C.canvas, fontWeight: 600 }}>{hrs}</span>
                </div>
              ))}
              <p style={{ fontSize: 13, color: 'rgba(248,245,240,.4)', marginTop: 16 }}>WhatsApp available beyond these hours for urgent requests.</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div style={{ marginTop: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Eyebrow label="FAQ"/>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink }}>
              COMMON <span style={{ fontWeight: 300, color: C.sage }}>Questions</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 20, padding: '24px 24px', border: `1px solid ${C.bone}` }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 10, letterSpacing: '-.01em' }}>{faq.q}</div>
                <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ContactPage });
