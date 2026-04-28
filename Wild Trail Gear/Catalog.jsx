// ============================================================
// WILD TRAIL GEAR — Catalog Page
// ============================================================

const ALL_GEAR = [
  // Tents
  { id:1,  name:'2-Person Camping Tent', cat:'Tents', price:1200, tag:'Popular', avail:true,  rating:5, color:'linear-gradient(135deg,#C8D5B9,#A8C5A0)', icon:'tent' },
  { id:2,  name:'4-Person Family Tent', cat:'Tents', price:1800, tag:null,      avail:true,  rating:4, color:'linear-gradient(135deg,#B8CCA8,#90B090)', icon:'tent' },
  { id:3,  name:'Ultralight Solo Tent', cat:'Tents', price:1500, tag:'New',     avail:false, rating:5, color:'linear-gradient(135deg,#D4E8C2,#B0D09A)', icon:'tent' },
  { id:4,  name:'6-Person Base Camp Tent', cat:'Tents', price:2400, tag:null,   avail:true,  rating:4, color:'linear-gradient(135deg,#A8C5A0,#7BAF80)', icon:'tent' },
  // Backpacks
  { id:5,  name:'Summit 40L Trail Pack', cat:'Backpacks', price:900, tag:'Best Seller', avail:true, rating:5, color:'linear-gradient(135deg,#A7D8C0,#6EBB9A)', icon:'backpack' },
  { id:6,  name:'Daypack 22L', cat:'Backpacks', price:500, tag:null,            avail:true,  rating:4, color:'linear-gradient(135deg,#86EFAC,#4ADE80)', icon:'backpack' },
  { id:7,  name:'Expedition 65L Pack', cat:'Backpacks', price:1300, tag:null,   avail:true,  rating:5, color:'linear-gradient(135deg,#6EBB9A,#4A9A78)', icon:'backpack' },
  { id:8,  name:'Kids 20L Trailblazer', cat:'Backpacks', price:400, tag:'New',  avail:false, rating:4, color:'linear-gradient(135deg,#A7F3D0,#34D399)', icon:'backpack' },
  // Sleeping
  { id:9,  name:'Sleeping Bag 10°C',    cat:'Sleeping', price:700, tag:null,    avail:true,  rating:5, color:'linear-gradient(135deg,#C5B8D4,#9B8AB8)', icon:'tent' },
  { id:10, name:'Sleeping Bag 0°C',     cat:'Sleeping', price:950, tag:'Popular', avail:true, rating:5, color:'linear-gradient(135deg,#D8C5E0,#B89AC8)', icon:'tent' },
  { id:11, name:'Sleeping Pad Foam',    cat:'Sleeping', price:250, tag:null,    avail:true,  rating:4, color:'linear-gradient(135deg,#E8D8C0,#D4B896)', icon:'tent' },
  // Footwear
  { id:12, name:'Trail Runner Low Boot', cat:'Footwear', price:600, tag:'Best Seller', avail:true, rating:5, color:'linear-gradient(135deg,#D4A373,#B08968)', icon:'boot' },
  { id:13, name:'Waterproof Mid Boot',   cat:'Footwear', price:800, tag:null,   avail:true,  rating:4, color:'linear-gradient(135deg,#C8906A,#A87050)', icon:'boot' },
  { id:14, name:'Camp Sandals',          cat:'Footwear', price:300, tag:null,   avail:false, rating:4, color:'linear-gradient(135deg,#E8C4A0,#D4A878)', icon:'boot' },
  // Accessories
  { id:15, name:'Trekking Pole Set',    cat:'Accessories', price:400, tag:null, avail:true,  rating:5, color:'linear-gradient(135deg,#D4C5A0,#B8A882)', icon:'backpack' },
  { id:16, name:'Headlamp Pro 600lm',   cat:'Accessories', price:350, tag:null, avail:true,  rating:5, color:'linear-gradient(135deg,#FDE68A,#FDBA74)', icon:'backpack' },
  { id:17, name:'Water Filter Straw',   cat:'Accessories', price:200, tag:'New', avail:true, rating:4, color:'linear-gradient(135deg,#BAE6FD,#7DD3FC)', icon:'backpack' },
  { id:18, name:'First Aid Kit',        cat:'Accessories', price:150, tag:null, avail:true,  rating:5, color:'linear-gradient(135deg,#FECACA,#FCA5A5)', icon:'backpack' },
];

const CATS = ['All', 'Tents', 'Backpacks', 'Sleeping', 'Footwear', 'Accessories'];

const GearCardIcon = ({ type, size = 64 }) => {
  const opacity = 'rgba(27,67,50,0.3)';
  if (type === 'tent') return <IconTent size={size} color={opacity}/>;
  if (type === 'backpack') return <IconBackpack size={size} color={opacity}/>;
  if (type === 'boot') return <IconBoot size={size} color={opacity}/>;
  return null;
};

function CatalogPage() {
  const [activeCat, setActiveCat] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [onlyAvail, setOnlyAvail] = React.useState(false);

  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = ALL_GEAR.filter(g => {
    const matchCat = activeCat === 'All' || g.cat === activeCat;
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.cat.toLowerCase().includes(search.toLowerCase());
    const matchAvail = !onlyAvail || g.avail;
    return matchCat && matchSearch && matchAvail;
  });

  return (
    <div data-screen-label="Catalog" style={{ background: C.canvas, minHeight: '100vh', paddingTop: 96 }}>
      {/* Page header */}
      <div style={{ background: C.forest, padding: '64px 64px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '4%', top: '10%', opacity: .1 }}><IconCompass size={200} color="#F8F5F0"/></div>
        <div style={{ position: 'absolute', left: '3%', bottom: '5%', opacity: .08 }}><IconBoot size={150} color="#F8F5F0"/></div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Eyebrow label="Rental Catalog" light/>
          <h1 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 800, letterSpacing: '-.03em', textTransform: 'uppercase', color: C.canvas, lineHeight: 1.0, marginBottom: 12 }}>
            ALL GEAR<br/><span style={{ fontWeight: 300, color: C.sageLight }}>Available to Rent</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(248,245,240,.6)', maxWidth: 480 }}>
            Browse our full catalog. Message us on WhatsApp to confirm availability and book your rental.
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.bone}`, padding: '20px 64px', position: 'sticky', top: 80, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: 1 }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)} style={{
                background: activeCat === cat ? C.forest : 'transparent',
                color: activeCat === cat ? C.canvas : C.ink,
                border: `1.5px solid ${activeCat === cat ? C.forest : C.bone}`,
                borderRadius: 999, padding: '7px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
              }}>{cat}</button>
            ))}
          </div>
          {/* Available only toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: C.slate, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <div onClick={() => setOnlyAvail(v => !v)} style={{
              width: 36, height: 20, borderRadius: 999,
              background: onlyAvail ? C.forest : C.bone,
              position: 'relative', cursor: 'pointer', transition: 'background .2s',
            }}>
              <div style={{ position: 'absolute', top: 2, left: onlyAvail ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left .2s' }}/>
            </div>
            Available only
          </label>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><IconSearch size={14}/></div>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search gear…"
              style={{ padding: '8px 14px 8px 34px', borderRadius: 999, border: `1.5px solid ${C.bone}`, fontSize: 13, fontFamily: 'inherit', background: C.canvas, color: C.ink, outline: 'none', width: 180 }}/>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 64px 100px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: C.slate }}>
            <IconTent size={48} color={C.bone}/>
            <p style={{ marginTop: 16, fontSize: 16 }}>No gear found. Try a different filter or search.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {filtered.map(item => (
              <div key={item.id} style={{ background: C.white, borderRadius: 24, overflow: 'hidden', transition: 'transform .2s, box-shadow .2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'rgba(0,0,0,0.09) 0px 16px 40px'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                {/* Image */}
                <div style={{ height: 190, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {item.tag && (
                    <div style={{ position: 'absolute', top: 14, left: 14, background: C.forest, color: C.canvas, borderRadius: 999, fontSize: 11, fontWeight: 700, padding: '4px 12px' }}>{item.tag}</div>
                  )}
                  <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 5, background: item.avail ? 'rgba(27,67,50,0.85)' : 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 999, padding: '4px 10px', fontSize: 11, fontWeight: 700 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.avail ? '#4ADE80' : '#FF6B6B', display: 'inline-block' }}/>
                    {item.avail ? 'Available' : 'Rented Out'}
                  </div>
                  <GearCardIcon type={item.icon}/>
                </div>
                {/* Body */}
                <div style={{ padding: '18px 20px 22px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.sage, marginBottom: 6 }}>• {item.cat}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.ink, marginBottom: 8, letterSpacing: '-.01em', lineHeight: 1.3 }}>{item.name}</div>
                  <StarRow n={item.rating}/>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                    <div style={{ background: C.olive, color: C.canvas, borderRadius: 10, padding: '6px 14px', fontSize: 14, fontWeight: 700 }}>
                      Rs. {item.price.toLocaleString()}<span style={{ fontSize: 11, fontWeight: 400, opacity: .7 }}>/day</span>
                    </div>
                    <a href={waLink(`Hi! I'd like to rent the ${item.name} (Rs. ${item.price}/day). Is it available?`)} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: item.avail ? C.whatsapp : '#b0b0b0', color: '#fff', borderRadius: 20, padding: '8px 16px', fontSize: 12, fontWeight: 600, textDecoration: 'none', pointerEvents: item.avail ? 'all' : 'none' }}>
                      <IconWA size={13}/> {item.avail ? 'Rent Now' : 'Unavailable'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Count */}
        <div style={{ textAlign: 'center', marginTop: 40, color: C.slate, fontSize: 13 }}>
          Showing {filtered.length} of {ALL_GEAR.length} items
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CatalogPage });
