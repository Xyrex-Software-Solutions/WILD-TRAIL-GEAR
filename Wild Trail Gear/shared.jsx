// ============================================================
// WILD TRAIL GEAR — Shared Tokens, Icons, Nav, Footer, WA Button
// ============================================================

const C = {
  forest: '#1B4332', forestDark: '#142E23', sage: '#52796F', sageLight: '#84A98C',
  olive: '#2D4A35', canvas: '#F8F5F0', white: '#FFFFFF', ink: '#1A1A18',
  slate: '#6B7B6F', amber: '#C8651A', footer: '#1B2E20', whatsapp: '#25D366',
  bone: '#EDE8E0', lifted: '#FDFCFA'
};

const WA_NUMBER = '94754768386';
const waLink = (msg = 'Hi! I\'d like to rent some gear from Wild Trail Gear.') =>
`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// ---- Icons ----
const IconCompass = ({ size = 22, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="1.2" fill={color} />
    <polygon points="12,3 13.5,9 12,12 10.5,9" fill={color} />
    <polygon points="12,21 13.5,15 12,12 10.5,15" fill={C.sageLight} stroke="none" />
    <polygon points="3,12 9,10.5 12,12 9,13.5" fill={C.sageLight} stroke="none" />
    <polygon points="21,12 15,10.5 12,12 15,13.5" fill={color} stroke="none" />
  </svg>;

const IconBoot = ({ size = 22, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 18h16v2H4z" />
    <path d="M4 18V8l4-4h4l2 3v3h3l3 4v4" />
  </svg>;

const IconTent = ({ size = 22, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20L12 4l9 16H3z" />
    <path d="M9 20v-4a3 3 0 016 0v4" />
  </svg>;

const IconBackpack = ({ size = 22, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l1-3h16l1 3" />
    <path d="M3 9v9a2 2 0 002 2h14a2 2 0 002-2V9" />
    <path d="M9 9v3a3 3 0 006 0V9" />
  </svg>;

const IconArrow = ({ color = C.canvas, size = 16 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>;

const IconWA = ({ size = 18, color = '#fff' }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>;

const IconSearch = ({ size = 16, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>;

const IconMenu = ({ color = C.forest }) =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>;

const IconX = ({ color = C.forest }) =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>;

const IconPin = ({ size = 16, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>;

const IconStar = ({ filled = true, size = 13 }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? C.amber : 'none'} stroke={C.amber} strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>;

const IconCheck = ({ size = 16, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>;

const IconShield = ({ size = 22, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>;

const IconPhone = ({ size = 16, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.13h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>;

const IconMail = ({ size = 16, color = C.forest }) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>;


// ---- Stars row ----
const StarRow = ({ n }) =>
<div style={{ display: 'flex', gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => <IconStar key={i} filled={i <= n} size={12} />)}
  </div>;


// ---- Eyebrow ----
const Eyebrow = ({ label, light = false }) =>
<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.amber, display: 'inline-block' }} />
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: light ? C.sageLight : C.sage }}>
      {label}
    </span>
  </div>;


// ---- NAV ----
const NAV_LINKS = [
{ label: 'Home', key: 'home' },
{ label: 'Catalog', key: 'catalog' },
{ label: 'About Us', key: 'about' },
{ label: 'Contact', key: 'contact' }];


function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', justifyContent: 'center', padding: '16px 24px', pointerEvents: 'none' }}>
      <div style={{
        background: C.white, borderRadius: 999, padding: '12px 32px',
        display: 'flex', alignItems: 'center', gap: 32, pointerEvents: 'all',
        maxWidth: 1000, width: '100%',
        boxShadow: scrolled ? 'rgba(0,0,0,0.12) 0px 8px 32px' : 'rgba(0,0,0,0.06) 0px 4px 24px',
        transition: 'box-shadow .3s ease'
      }}>
        {/* Logo */}
        <div onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
          <IconCompass size={24} />
          <div style={{ lineHeight: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-.02em', color: C.forest, textTransform: 'uppercase' }}>WILD TRAIL </span>
            <span style={{ fontSize: 13, fontWeight: 300, letterSpacing: '.04em', color: C.sage, textTransform: 'uppercase' }}>GEAR</span>
          </div>
        </div>
        {/* Links */}
        <div style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
          {NAV_LINKS.map(({ label, key }) =>
          <button key={key} onClick={() => setPage(key)} style={{
            fontSize: 14, fontWeight: page === key ? 700 : 500,
            color: page === key ? C.forest : C.ink,
            background: page === key ? C.bone : 'transparent',
            border: 'none', borderRadius: 999, padding: '7px 18px',
            cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-.01em',
            transition: 'all .15s'
          }}>{label}</button>
          )}
        </div>
        {/* CTA */}
        <a href={waLink()} target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.whatsapp, color: '#fff', borderRadius: 20, padding: '8px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <IconWA size={15} />
          Rent Now
        </a>
      </div>
    </div>);

}

// ---- FOOTER ----
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.footer, padding: '80px 64px 40px', color: C.canvas }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top CTA band */}
        <div style={{ borderBottom: '1px solid rgba(248,245,240,.1)', paddingBottom: 64, marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <div style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', lineHeight: 1.1, color: C.canvas }}>
              We're here when<br /><span style={{ fontWeight: 300, color: C.sageLight }}>the trail calls.</span>
            </div>
          </div>
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.whatsapp, color: '#fff', borderRadius: 24, padding: '14px 28px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            <IconWA size={18} /> Chat on WhatsApp
          </a>
        </div>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <IconCompass size={20} color={C.sageLight} />
              <div>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.canvas }}>WILD TRAIL </span>
                <span style={{ fontSize: 13, fontWeight: 300, color: C.sageLight }}>GEAR</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(248,245,240,.55)', lineHeight: 1.7, marginBottom: 16 }}>
              Handpicked outdoor gear for Sri Lanka's trails. Based in Panadura.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(248,245,240,.5)', fontSize: 13 }}>
              <IconPin size={13} color={C.sageLight} /> Panadura, Sri Lanka
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: C.sageLight, marginBottom: 16 }}>Catalog</div>
            {['Tents & Shelters', 'Backpacks', 'Sleeping Gear', 'Footwear', 'Trekking Poles', 'Lighting'].map((l) =>
            <span key={l} onClick={() => setPage('catalog')} style={{ fontSize: 13, color: 'rgba(248,245,240,.6)', display: 'block', marginBottom: 10, cursor: 'pointer' }}>{l}</span>
            )}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: C.sageLight, marginBottom: 16 }}>Company</div>
            {[['About Us', 'about'], ['Contact', 'contact'], ['Home', 'home']].map(([l, k]) =>
            <span key={l} onClick={() => setPage(k)} style={{ fontSize: 13, color: 'rgba(248,245,240,.6)', display: 'block', marginBottom: 10, cursor: 'pointer' }}>{l}</span>
            )}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: C.sageLight, marginBottom: 16 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(248,245,240,.6)', textDecoration: 'none' }}>
                <IconWA size={13} /> +94 754 768 386
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(248,245,240,.6)' }}>
                <IconMail size={13} color={C.sageLight} /> hello@wildtrailgear.lk
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(248,245,240,.6)' }}>
                <IconPin size={13} color={C.sageLight} /> Panadura, Sri Lanka
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 24, borderTop: '1px solid rgba(248,245,240,.08)' }}>
          <span style={{ fontSize: 11, color: 'rgba(248,245,240,.3)' }}>© 2026 Wild Trail Gear. All rights reserved.</span>
          <span style={{ fontSize: 11, color: 'rgba(248,245,240,.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconPin size={10} color="rgba(248,245,240,.3)" /> Sri Lanka · LKR
          </span>
        </div>
      </div>
    </footer>);

}

// ---- Floating WhatsApp Button ----
function FloatingWA() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 300,
      display: 'flex', alignItems: 'center', gap: hovered ? 10 : 0,
      background: C.whatsapp, color: '#fff', borderRadius: 999,
      padding: hovered ? '14px 22px' : '14px',
      boxShadow: 'rgba(37,211,102,0.4) 0px 8px 32px',
      textDecoration: 'none', fontFamily: 'inherit',
      fontSize: 14, fontWeight: 600,
      transition: 'all .25s ease',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }}>
      <IconWA size={22} />
      <span style={{ width: hovered ? 'auto' : 0, overflow: 'hidden', display: 'inline-block', transition: 'width .25s ease' }}>
        Chat on WhatsApp
      </span>
    </a>);

}

Object.assign(window, {
  C, WA_NUMBER, waLink,
  IconCompass, IconBoot, IconTent, IconBackpack, IconArrow, IconWA,
  IconSearch, IconMenu, IconX, IconPin, IconStar, IconCheck, IconShield,
  IconPhone, IconMail, StarRow, Eyebrow, Nav, Footer, FloatingWA
});