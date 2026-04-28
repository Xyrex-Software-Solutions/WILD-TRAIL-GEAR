// ============================================================
// WILD TRAIL GEAR — About Us Page
// ============================================================

function AboutPage() {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const values = [
    { icon: <IconCompass size={28}/>, title: 'Trail-Tested', body: 'We\'ve hiked every major trail in Sri Lanka. Every gear item we stock has been tested by us first.' },
    { icon: <IconShield size={28}/>, title: 'Honest Rental', body: 'No hidden charges, no complicated forms. You know exactly what you pay before you confirm.' },
    { icon: <IconTent size={28}/>, title: 'Local Roots', body: 'Based in Panadura, we know the island\'s trails intimately — from Sinharaja to Adam\'s Peak.' },
    { icon: <IconBackpack size={28}/>, title: 'Gear That Works', body: 'We retire gear before it becomes unreliable. You always get equipment that performs.' },
  ];

  const team = [
    { name: 'Kasun Perera', role: 'Founder & Trail Guide', initials: 'KP', color: `linear-gradient(135deg, ${C.forest}, ${C.sage})` },
    { name: 'Nimal Silva', role: 'Gear Curator', initials: 'NS', color: `linear-gradient(135deg, ${C.sage}, ${C.sageLight})` },
    { name: 'Amali Wickrama', role: 'Customer Experience', initials: 'AW', color: `linear-gradient(135deg, ${C.sageLight}, ${C.olive})` },
  ];

  return (
    <div data-screen-label="About" style={{ background: C.canvas, minHeight: '100vh', paddingTop: 96 }}>

      {/* Hero section */}
      <div style={{ background: C.forest, padding: '80px 64px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/hero-bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center 20%', opacity: .2 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(27,67,50,0.95) 40%, rgba(27,67,50,0.7) 100%)' }}/>
        <div style={{ position: 'absolute', right: '5%', top: '15%', opacity: .1 }}><IconCompass size={240} color="#F8F5F0"/></div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 640 }}>
            <Eyebrow label="Our Story" light/>
            <h1 style={{ fontSize: 'clamp(36px,5vw,68px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.canvas, lineHeight: 1.0, marginBottom: 24 }}>
              GEAR FROM<br/><span style={{ fontWeight: 300, color: C.sageLight }}>Trail Lovers</span>
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(248,245,240,.72)', lineHeight: 1.75, marginBottom: 40 }}>
              Wild Trail Gear started with a simple frustration: great trails, but no easy way to access good gear. We built the rental shop we wished existed — local, honest, and run by people who actually use the gear.
            </p>
            <div style={{ display: 'flex', gap: 40, paddingTop: 32, borderTop: '1px solid rgba(248,245,240,.12)', flexWrap: 'wrap' }}>
              {[['2019', 'Founded'], ['500+', 'Gear Items'], ['1,200+', 'Happy Renters']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: C.canvas, letterSpacing: '-.03em', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(248,245,240,.45)', letterSpacing: '.05em', textTransform: 'uppercase', marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our values */}
      <div style={{ background: C.lifted, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow label="What We Stand For"/>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink }}>
              OUR <span style={{ fontWeight: 300, color: C.sage }}>Values</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 24, padding: '32px 24px', border: `1px solid ${C.bone}` }}>
                <div style={{ color: C.forest, marginBottom: 20, padding: '12px', background: C.canvas, borderRadius: 16, display: 'inline-block' }}>{v.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 10, letterSpacing: '-.01em' }}>{v.title}</div>
                <div style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story section */}
      <div style={{ background: C.canvas, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'center' }}>
            {/* Image block */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: 40, overflow: 'hidden', aspectRatio: '4/5', backgroundImage: 'url(assets/hero-bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}/>
              {/* Floating card */}
              <div style={{ position: 'absolute', bottom: -24, right: -24, background: C.forest, borderRadius: 24, padding: '20px 24px', color: C.canvas, maxWidth: 200 }}>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-.03em' }}>100%</div>
                <div style={{ fontSize: 13, color: C.sageLight, marginTop: 4, lineHeight: 1.4 }}>Gear inspected before every rental</div>
              </div>
              {/* Compass decor */}
              <div style={{ position: 'absolute', top: -20, left: -20, background: C.bone, borderRadius: '50%', padding: 16 }}>
                <IconCompass size={32}/>
              </div>
            </div>
            {/* Text */}
            <div>
              <Eyebrow label="The Wild Trail Story"/>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink, marginBottom: 24, lineHeight: 1.05 }}>
                BUILT FOR<br/><span style={{ fontWeight: 300, color: C.sage }}>Sri Lanka's Trails</span>
              </h2>
              <p style={{ fontSize: 16, color: C.slate, lineHeight: 1.8, marginBottom: 20 }}>
                It started on a rainy weekend on the Knuckles Range. Our founder Kasun arrived to find half his group without proper rain gear — borrowed mismatched jackets and worn-out boots. The trail was beautiful. The gear situation was not.
              </p>
              <p style={{ fontSize: 16, color: C.slate, lineHeight: 1.8, marginBottom: 40 }}>
                That trip sparked Wild Trail Gear. A local rental shop where every piece of gear is handpicked, properly maintained, and available at fair prices — so more Sri Lankans can enjoy the outdoors without the gear barrier.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Gear inspected and cleaned after every rental', 'Friendly WhatsApp support 7 days a week', 'Fair pricing in LKR — no hidden costs', 'Free trail advice with every rental'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: C.ink }}>
                    <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: C.forest, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconCheck size={12} color="#fff"/>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div style={{ background: C.forest, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Eyebrow label="The Team" light/>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.canvas }}>
              MEET THE <span style={{ fontWeight: 300, color: C.sageLight }}>Crew</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {team.map((member, i) => (
              <div key={i} style={{ background: 'rgba(248,245,240,0.07)', borderRadius: 32, padding: '40px 32px', textAlign: 'center', border: '1px solid rgba(248,245,240,0.1)' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 auto 20px' }}>
                  {member.initials}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.canvas, marginBottom: 6 }}>{member.name}</div>
                <div style={{ fontSize: 13, color: C.sageLight, letterSpacing: '.03em' }}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location section */}
      <div style={{ background: C.canvas, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Eyebrow label="Find Us"/>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink, marginBottom: 24, lineHeight: 1.05 }}>
              VISIT US IN<br/><span style={{ fontWeight: 300, color: C.sage }}>Panadura</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: <IconPin size={18}/>, label: 'Address', val: 'Panadura, Western Province, Sri Lanka' },
                { icon: <IconWA size={18}/>, label: 'WhatsApp', val: '+94 754 768 386' },
                { icon: <IconMail size={18}/>, label: 'Email', val: 'hello@wildtrailgear.lk' },
              ].map(({ icon, label, val }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: C.canvas, border: `1.5px solid ${C.bone}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.sage, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 15, color: C.ink, fontWeight: 500 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Map placeholder */}
          <div style={{ borderRadius: 40, overflow: 'hidden', background: C.bone, aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, border: `1px solid ${C.bone}` }}>
            <IconPin size={48} color={C.sage}/>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.slate }}>Panadura, Sri Lanka</div>
            <a href="https://maps.google.com/?q=Panadura,Sri+Lanka" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.forest, color: C.canvas, borderRadius: 20, padding: '10px 22px', fontSize: 13, fontWeight: 600, textDecoration: 'none', marginTop: 8 }}>
              Open in Maps <IconArrow size={13}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AboutPage });
