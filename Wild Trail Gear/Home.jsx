// ============================================================
// WILD TRAIL GEAR — Home Page
// ============================================================

// ---- Hero ----
function Hero({ setPage }) {
  return (
    <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 96px', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/hero-bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center 30%', zIndex: 0 }}/>
      {/* Fog overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(27,67,50,0.35) 0%, transparent 65%)', zIndex: 1 }}/>
      {/* Dark scrim */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(20,26,21,0.92) 0%, rgba(20,26,21,0.4) 60%, transparent 100%)', zIndex: 2 }}/>
      {/* Decorative compass */}
      <div style={{ position: 'absolute', top: '12%', right: '8%', opacity: .12, zIndex: 1 }}>
        <IconCompass size={180} color="#F8F5F0"/>
      </div>
      {/* Decorative boot */}
      <div style={{ position: 'absolute', bottom: '30%', right: '14%', opacity: .1, zIndex: 1 }}>
        <IconBoot size={120} color="#F8F5F0"/>
      </div>
      {/* Ghost watermark */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(80px,14vw,220px)', fontWeight: 800, color: 'rgba(248,245,240,0.04)', letterSpacing: '-.03em', textTransform: 'uppercase', zIndex: 1, whiteSpace: 'nowrap', pointerEvents: 'none', lineHeight: 1 }}>
        WILD TRAIL
      </div>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 760 }}>
        <Eyebrow label="Panadura, Sri Lanka · Rent Quality Gear" light/>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 'clamp(52px,7vw,96px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: '#F8F5F0', display: 'block', lineHeight: .95 }}>WILD TRAIL</span>
          <span style={{ fontSize: 'clamp(52px,7vw,96px)', fontWeight: 300, letterSpacing: '.03em', textTransform: 'uppercase', color: C.sageLight, display: 'block', lineHeight: .95 }}>GEAR</span>
        </div>
        <p style={{ fontSize: 18, fontWeight: 400, color: 'rgba(248,245,240,.65)', lineHeight: 1.6, marginTop: 28, marginBottom: 44, maxWidth: 500 }}>
          Your adventure starts here. Rent handpicked gear for Sri Lanka's trails — from the Knuckles Range to Horton Plains.
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('catalog')} style={{ background: C.forest, color: C.canvas, border: 'none', borderRadius: 20, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10, transition: 'opacity .2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Browse Rental Gear <IconArrow/>
          </button>
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', color: C.canvas, border: '1.5px solid rgba(248,245,240,.4)', borderRadius: 20, padding: '13px 28px', fontSize: 15, fontWeight: 500, textDecoration: 'none', transition: 'border-color .2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(248,245,240,.8)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(248,245,240,.4)'}>
            <IconWA size={16}/> WhatsApp Us
          </a>
        </div>
        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48, marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(248,245,240,.12)', flexWrap: 'wrap' }}>
          {[['500+', 'Gear Items'], ['4.9★', 'Avg. Rating'], ['3-Day', 'Min. Rental']].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.canvas, letterSpacing: '-.03em', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(248,245,240,.45)', letterSpacing: '.05em', textTransform: 'uppercase', marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Why Rent Section ----
function WhyRent() {
  const reasons = [
    { icon: <IconBackpack size={28}/>, title: 'Quality Tested Gear', body: 'Every item is inspected before each rental. You get gear that actually works on the trail.' },
    { icon: <IconShield size={28}/>, title: 'No Commitment', body: 'Rent for a weekend or a full expedition. No long-term ties. Pay only for what you use.' },
    { icon: <IconCompass size={28}/>, title: 'Local Trail Knowledge', body: 'We know Sri Lanka\'s trails. We\'ll help you pick the right gear for your specific route.' },
    { icon: <IconTent size={28}/>, title: 'WhatsApp Simple', body: 'No booking forms. Just message us on WhatsApp — gear confirmed in minutes.' },
  ];
  return (
    <section style={{ background: C.forest, padding: '100px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Left */}
          <div>
            <Eyebrow label="Why Choose Us" light/>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.canvas, lineHeight: 1.05, marginBottom: 24 }}>
              GEAR MADE<br/><span style={{ fontWeight: 300, color: C.sageLight }}>FOR The Trail</span>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(248,245,240,.65)', lineHeight: 1.7, marginBottom: 40 }}>
              We're not a warehouse. We're fellow hikers who've tested every piece of gear on Sri Lanka's trails. When you rent from us, you rent with confidence.
            </p>
            <a href={waLink('Hi! I\'d like to know more about renting gear from Wild Trail Gear.')} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.canvas, color: C.forest, borderRadius: 20, padding: '12px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Ask Us Anything <IconArrow color={C.forest}/>
            </a>
          </div>
          {/* Right — reasons grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ background: 'rgba(248,245,240,0.07)', borderRadius: 24, padding: '28px 24px', border: '1px solid rgba(248,245,240,0.08)' }}>
                <div style={{ color: C.sageLight, marginBottom: 16 }}>{r.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.canvas, marginBottom: 8, letterSpacing: '-.01em' }}>{r.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(248,245,240,.55)', lineHeight: 1.6 }}>{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Featured Gear ----
const FEATURED = [
  { id:1, name:'2-Person Camping Tent', cat:'Tents', price:'Rs. 1,200', tag:'Popular', color:'linear-gradient(135deg,#C8D5B9 0%,#A8C5A0 100%)', icon:'tent', avail:true },
  { id:2, name:'Summit 40L Trail Pack', cat:'Backpacks', price:'Rs. 900', tag:'New', color:'linear-gradient(135deg,#A7D8C0 0%,#6EBB9A 100%)', icon:'backpack', avail:true },
  { id:3, name:'Trekking Pole Set', cat:'Accessories', price:'Rs. 400', tag:null, color:'linear-gradient(135deg,#D4C5A0 0%,#B8A882 100%)', icon:'boot', avail:true },
  { id:4, name:'Sleeping Bag — 10°C', cat:'Sleeping', price:'Rs. 700', tag:null, color:'linear-gradient(135deg,#C5B8D4 0%,#9B8AB8 100%)', icon:'tent', avail:false },
  { id:5, name:'Trail Runner Low Boot', cat:'Footwear', price:'Rs. 600', tag:'Best Seller', color:'linear-gradient(135deg,#D4A373 0%,#B08968 100%)', icon:'boot', avail:true },
  { id:6, name:'Headlamp Pro 600lm', cat:'Lighting', price:'Rs. 350', tag:null, color:'linear-gradient(135deg,#FDE68A 0%,#FDBA74 100%)', icon:'backpack', avail:true },
];

const GearIcon = ({ type, size = 56 }) => {
  if (type === 'tent') return <IconTent size={size} color="rgba(27,67,50,0.35)"/>;
  if (type === 'backpack') return <IconBackpack size={size} color="rgba(27,67,50,0.35)"/>;
  if (type === 'boot') return <IconBoot size={size} color="rgba(27,67,50,0.35)"/>;
  return null;
};

function FeaturedGear({ setPage }) {
  return (
    <section style={{ background: C.lifted, padding: '100px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <Eyebrow label="Featured Rentals"/>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink, lineHeight: 1.05 }}>
              TRAIL <span style={{ fontWeight: 300, color: C.sage }}>ESSENTIALS</span>
            </h2>
          </div>
          <button onClick={() => setPage('catalog')} style={{ background: C.forest, color: C.canvas, border: 'none', borderRadius: 20, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
            View All Gear <IconArrow/>
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {FEATURED.map(p => (
            <div key={p.id} style={{ background: C.white, borderRadius: 24, overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.10) 0px 20px 40px'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ height: 200, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {p.tag && <div style={{ position: 'absolute', top: 14, left: 14, background: C.forest, color: C.canvas, borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '4px 12px' }}>{p.tag}</div>}
                {!p.avail && <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,.55)', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '4px 12px' }}>Unavailable</div>}
                <GearIcon type={p.icon}/>
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.sage, marginBottom: 6 }}>• {p.cat}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: C.ink, marginBottom: 14, letterSpacing: '-.01em' }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ background: C.olive, color: C.canvas, borderRadius: 10, padding: '5px 14px', fontSize: 14, fontWeight: 700 }}>{p.price}<span style={{ fontSize: 11, fontWeight: 400, opacity: .7 }}>/day</span></div>
                  <a href={waLink(`Hi! I'd like to rent the ${p.name} — Rs. ${p.price}/day. Is it available?`)} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: p.avail ? C.whatsapp : '#ccc', color: '#fff', borderRadius: 20, padding: '7px 14px', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                    <IconWA size={13}/> {p.avail ? 'Rent Now' : 'Notify Me'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Gear Bundles ----
const BUNDLES = [
  { name: 'Weekend Warrior', desc: 'Everything for a 2-day trail. Tent, sleeping bag, backpack, headlamp.', price: 'Rs. 2,800', items: ['2-Person Tent', '40L Backpack', 'Sleeping Bag', 'Headlamp'], img: 'assets/camping-eg.webp' },
  { name: 'Summit Push', desc: 'For serious multi-day trekkers. Full kit for 3–5 day expeditions.', price: 'Rs. 4,500', items: ['4-Person Tent', '60L Backpack', 'Sleeping Bag', 'Poles + Headlamp'], img: null },
  { name: 'Day Hiker', desc: 'Light and fast. Just the essentials for a single-day trail.', price: 'Rs. 850', items: ['22L Daypack', 'Trekking Poles', 'Headlamp'], img: null },
  { name: 'Family Camp', desc: 'Comfortable basecamp setup for the whole family.', price: 'Rs. 5,200', items: ['6-Person Tent', 'Camp Chairs x4', 'Lantern', 'Cookset'], img: null },
];

function Bundles({ setPage }) {
  return (
    <section style={{ background: C.canvas, padding: '100px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow label="Gear Bundles"/>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink }}>
            ADVENTURE <span style={{ fontWeight: 300, color: C.sage }}>Packages</span>
          </h2>
          <p style={{ fontSize: 16, color: C.slate, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>Bundle your rentals and save. Curated kits for every type of adventure.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
          {BUNDLES.map((b, i) => (
            <div key={i} style={{ background: i === 0 ? C.forest : C.white, borderRadius: 32, overflow: 'hidden', position: 'relative', border: i !== 0 ? `1px solid ${C.bone}` : 'none' }}>
              {i === 0 && (
                <div style={{ height: 200, backgroundImage: 'url(assets/camping-eg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(27,67,50,0.3) 0%, rgba(27,67,50,0.7) 100%)' }}/>
                </div>
              )}
              <div style={{ padding: '28px 32px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: i === 0 ? C.sageLight : C.sage, marginBottom: 6 }}>• Bundle</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: i === 0 ? C.canvas : C.ink, letterSpacing: '-.02em' }}>{b.name}</div>
                  </div>
                  <div style={{ background: C.olive, color: C.canvas, borderRadius: 12, padding: '6px 14px', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{b.price}<span style={{ fontSize: 11, fontWeight: 400, opacity: .7 }}>/day</span></div>
                </div>
                <p style={{ fontSize: 14, color: i === 0 ? 'rgba(248,245,240,.65)' : C.slate, lineHeight: 1.6, marginBottom: 18 }}>{b.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {b.items.map(item => (
                    <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, background: i === 0 ? 'rgba(248,245,240,.1)' : C.bone, color: i === 0 ? C.canvas : C.ink, borderRadius: 999, padding: '4px 12px', fontWeight: 500 }}>
                      <IconCheck size={10} color={i === 0 ? C.sageLight : C.forest}/> {item}
                    </span>
                  ))}
                </div>
                <a href={waLink(`Hi! I'm interested in the "${b.name}" rental bundle (${b.price}/day). Can you share availability?`)} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: i === 0 ? C.canvas : C.forest, color: i === 0 ? C.forest : C.canvas, borderRadius: 20, padding: '10px 22px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  <IconWA size={14} color={i === 0 ? C.forest : '#fff'}/> Rent This Bundle
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Testimonials ----
const TESTIMONIALS = [
  { name: 'Priyanka S.', loc: 'Colombo', rating: 5, text: 'Rented a tent and backpack for Horton Plains. Everything was in perfect condition. The WhatsApp process was so easy — confirmed within an hour.' },
  { name: 'Raj & Tara', loc: 'Kandy', rating: 5, text: 'Used the Weekend Warrior bundle for a Knuckles trek. Great gear, fair prices, and they even gave us trail tips for free. Will rent again.' },
  { name: 'Dinesh A.', loc: 'Galle', rating: 5, text: 'As someone who doesn\'t want to invest in gear for occasional trips, Wild Trail Gear is exactly what I needed. Highly recommend the Summit Push bundle.' },
];

function Testimonials() {
  return (
    <section style={{ background: C.lifted, padding: '100px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <div>
            <Eyebrow label="Reviews"/>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.ink, lineHeight: 1.05 }}>
              WHAT OUR <span style={{ fontWeight: 300, color: C.sage }}>Adventurers say</span>
            </h2>
            <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.7, marginTop: 20 }}>
              Trusted by hikers, trekkers, and weekend explorers across Sri Lanka.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: C.forest, letterSpacing: '-.03em' }}>4.9</div>
                <StarRow n={5}/>
                <div style={{ fontSize: 11, color: C.slate, marginTop: 4 }}>100+ reviews</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 20, padding: '28px 28px', border: `1px solid ${C.bone}` }}>
                <StarRow n={t.rating}/>
                <p style={{ fontSize: 15, color: C.ink, lineHeight: 1.7, margin: '14px 0 18px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${C.sageLight}, ${C.forest})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.slate, display: 'flex', alignItems: 'center', gap: 4 }}><IconPin size={11}/>{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Final CTA ----
function HomeCTA({ setPage }) {
  return (
    <section style={{ background: C.forest, padding: '100px 64px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/camping-eg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: .18 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(27,67,50,0.9) 0%, rgba(20,46,35,0.95) 100%)' }}/>
      {/* Decorative */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: .08 }}><IconCompass size={280} color="#F8F5F0"/></div>
      <div style={{ position: 'absolute', bottom: '5%', left: '3%', opacity: .06 }}><IconBoot size={200} color="#F8F5F0"/></div>
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
        <Eyebrow label="Your Next Adventure" light/>
        <h2 style={{ fontSize: 'clamp(32px,4.5vw,60px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.canvas, lineHeight: 1.0, marginBottom: 24 }}>
          GEAR UP FOR YOUR<br/><span style={{ fontWeight: 300, color: C.sageLight }}>Next Adventure</span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(248,245,240,.65)', lineHeight: 1.7, marginBottom: 40 }}>
          The trail is waiting. Message us on WhatsApp and we'll have your gear ready in no time.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.whatsapp, color: '#fff', borderRadius: 20, padding: '14px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            <IconWA/> Chat on WhatsApp
          </a>
          <button onClick={() => setPage('catalog')} style={{ background: 'transparent', color: C.canvas, border: `1.5px solid rgba(248,245,240,.4)`, borderRadius: 20, padding: '13px 28px', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            View Full Catalog
          </button>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div data-screen-label="Home">
      <Hero setPage={setPage}/>
      <FeaturedGear setPage={setPage}/>
      <WhyRent/>
      <Bundles setPage={setPage}/>
      <Testimonials/>
      <HomeCTA setPage={setPage}/>
    </div>
  );
}

Object.assign(window, { HomePage });
