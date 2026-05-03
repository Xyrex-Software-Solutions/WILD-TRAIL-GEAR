'use client'

import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { db, auth, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const STORAGE_KEYS = {
  items: "rental_items",
  customers: "rental_customers",
  rentals: "rental_records",
};

// Secret entry key
const ADMIN_SECRET_KEY = "trail2026";

// Seed data
const INITIAL_ITEMS = [
  {
    name: 'Manual Tent',
    category: 'Tents',
    image: '/images/products/tent.jpeg',
    availability: 'available',
    variants: [
      { label: '3-Person', price: 500 },
      { label: '4-Person', price: 600 },
      { label: '6-Person', price: 750 },
      { label: '8-Person', price: 900 },
    ],
    priceFrom: 500,
    priceLabel: 'from LKR 500',
    tag: 'Popular',
    waMessage: "Hi! I'd like to rent a Manual Tent. Could you share availability for my dates?",
    quantity: 12,
    pricePerDay: 500
  },
  {
    name: 'Windproof Gas Stove',
    category: 'Cooking',
    image: '/images/products/gas-stove.jpeg',
    availability: 'available',
    price: 250,
    waMessage: "Hi! I'd like to rent a Windproof Gas Stove (LKR 250/day). Is it available?",
    quantity: 8,
    pricePerDay: 250
  },
  {
    name: 'Cooking Set',
    category: 'Cooking',
    image: '/images/products/cooking-set.jpeg',
    availability: 'available',
    price: 300,
    waMessage: "Hi! I'd like to rent a Cooking Set (LKR 300/day). Is it available?",
    quantity: 10,
    pricePerDay: 300
  },
  {
    name: 'Hammock',
    category: 'Accessories',
    image: '/images/products/hammock.jpeg',
    availability: 'available',
    price: 200,
    waMessage: "Hi! I'd like to rent a Hammock (LKR 200/day). Is it available?",
    quantity: 15,
    pricePerDay: 200
  },
  {
    name: 'Anti Leech Socks',
    category: 'Accessories',
    image: '/images/products/anti-leech-socks.jpeg',
    availability: 'available',
    price: 250,
    waMessage: "Hi! I'd like to rent Anti Leech Socks (LKR 250/day). Is it available?",
    quantity: 30,
    pricePerDay: 250
  },
  {
    name: 'Water Bag 3L',
    category: 'Accessories',
    image: '/images/products/water-bag.jpeg',
    availability: 'available',
    price: 300,
    waMessage: "Hi! I'd like to rent a Water Bag 3L (LKR 300/day). Is it available?",
    quantity: 20,
    pricePerDay: 300
  },
];

const CATEGORIES = ["Tents", "Cooking", "Accessories", "Other"];

// --- UI Components ---
const Avatar = ({ name, size = 36, bgClass = "bg-sage", textClass = "text-canvas" }: any) => {
  const initials = name?.split(" ").map((w: any) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div style={{ width: size, height: size, fontSize: size * 0.38 }} className={`rounded-full flex items-center justify-center font-semibold shrink-0 ${bgClass} ${textClass}`}>
      {initials}
    </div>
  );
};

const Badge = ({ label, colorClass = "text-sage bg-sage/20" }: any) => (
  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider ${colorClass}`}>{label}</span>
);

const Input = ({ label, ...props }: any) => (
  <div className="mb-3.5">
    {label && <label className="block text-[11px] font-bold text-slate mb-1.5 uppercase tracking-wider">{label}</label>}
    <input className="w-full px-3.5 py-2.5 rounded-xl border border-bone text-sm bg-white text-ink box-border outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors" {...props} />
  </div>
);

const Select = ({ label, children, ...props }: any) => (
  <div className="mb-3.5">
    {label && <label className="block text-[11px] font-bold text-slate mb-1.5 uppercase tracking-wider">{label}</label>}
    <select className="w-full px-3.5 py-2.5 rounded-xl border border-bone text-sm bg-white text-ink box-border outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors appearance-none" {...props}>{children}</select>
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div className="mb-3.5">
    {label && <label className="block text-[11px] font-bold text-slate mb-1.5 uppercase tracking-wider">{label}</label>}
    <textarea className="w-full px-3.5 py-2.5 rounded-xl border border-bone text-sm bg-white text-ink box-border min-h-[80px] resize-y outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors" {...props} />
  </div>
);

const Btn = ({ children, variant = "primary", onClick, className = "", disabled, type = "button" }: any) => {
  const styles: any = {
    primary: "bg-forest text-canvas hover:bg-forest-dark border-transparent",
    secondary: "bg-canvas text-forest border border-bone hover:bg-bone",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    success: "bg-whatsapp text-white hover:bg-[#20b858] border-transparent",
    ghost: "bg-transparent text-slate border border-bone hover:bg-bone/50 hover:text-forest",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`px-5 py-2.5 rounded-btn text-[13px] font-bold inline-flex items-center justify-center gap-1.5 transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Modal = ({ title, onClose, children, width = 560 }: any) => (
  <div className="fixed inset-0 bg-[#0E1410]/75 flex items-center justify-center z-50 p-5 backdrop-blur-sm">
    <div style={{ maxWidth: width }} className="bg-canvas rounded-card w-full max-h-[90vh] overflow-y-auto shadow-hero border border-forest/10">
      <div className="flex justify-between items-center px-8 py-6 border-b border-bone">
        <h3 className="m-0 text-lg font-black text-forest uppercase tracking-tight">{title}</h3>
        <button onClick={onClose} className="bg-bone border-none w-8 h-8 rounded-lg cursor-pointer text-base text-forest flex items-center justify-center hover:bg-bone/80 transition-colors">✕</button>
      </div>
      <div className="p-8">{children}</div>
  <div style={{ position: "fixed", inset: 0, background: "rgba(14,20,16,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, backdropFilter: 'blur(4px)' }}>
    <div style={{ background: "#F8F5F0", borderRadius: 24, width: "100%", maxWidth: width, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", border: '1px solid rgba(27,67,50,0.1)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid #EDE8E0", position: 'sticky', top: 0, background: '#F8F5F0', zIndex: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#1B4332", textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{title}</h3>
        <button onClick={onClose} style={{ background: "#EDE8E0", border: "none", width: 32, height: 32, borderRadius: 10, cursor: "pointer", fontSize: 16, color: "#1B4332", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  </div>
);

const emptyItem = { name: "", category: "Tents", quantity: 0, pricePerDay: 0, image: null, description: "" };
const emptyCustomer = { name: "", phone: "", email: "", address: "", nic: "" };

function AdminPanelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const [items, setItems] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [rentals, setRentals] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [tab, setTab] = useState("dashboard");
  const [modal, setModal] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [customerSearch, setCustomerSearch] = useState("");
  const [rentalCustSearch, setRentalCustSearch] = useState("");
  const [showCustDropdown, setShowCustDropdown] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hasSecretKey = searchParams.get("key") === ADMIN_SECRET_KEY;

  // Form states
  const [itemForm, setItemForm] = useState<any>(emptyItem);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `equipment/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setItemForm((f: any) => ({ ...f, image: url }));
    } catch (err) {
      alert("Error uploading image");
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };
  
  const [custForm, setCustForm] = useState<any>(emptyCustomer);
  const [editCustId, setEditCustId] = useState<string | null>(null);

  const [rentalForm, setRentalForm] = useState<any>({ customerId: "", rentDate: "", returnDate: "", notes: "", items: [], advancePaid: 0 });
  const [rentalItemSel, setRentalItemSel] = useState<any>({ itemId: "", qty: 1 });

  const [viewRental, setViewRental] = useState<any>(null);
  const [qtyModal, setQtyModal] = useState<any>(null);
  const [qtyDelta, setQtyDelta] = useState(0);

  // --- Auth & Data Sync ---
  useEffect(() => {
    // If Firebase isn't configured, bypass auth and use mock data
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      setUser({ email: "demo@wildtrail.com", uid: "123" } as User);
      setAuthLoading(false);
      
      // Load mock data
      setItems(INITIAL_ITEMS.map((item, idx) => ({ id: `mock-item-${idx}`, ...item })));
      setCustomers([
        { id: "cust-1", name: "John Doe", phone: "0771234567", email: "john@example.com" },
        { id: "cust-2", name: "Jane Smith", phone: "0719876543", email: "jane@example.com" }
      ]);
      setRentals([
        { 
          id: 1714567890123, 
          customerName: "John Doe", 
          items: [{ itemName: "Manual Tent", qty: 1, pricePerDay: 500 }], 
          rentDate: "2026-05-01", 
          returnDate: "2026-05-03", 
          days: 2, 
          totalAmount: 1000, 
          status: "active" 
        }
      ]);
      setDataLoaded(true);
      return;
    }

    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return;

    const unsubItems = onSnapshot(collection(db, STORAGE_KEYS.items), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      if (data.length === 0) {
        INITIAL_ITEMS.forEach(item => addDoc(collection(db, STORAGE_KEYS.items), item));
      }
    });

    const unsubCustomers = onSnapshot(collection(db, STORAGE_KEYS.customers), (snap) => {
      setCustomers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubRentals = onSnapshot(query(collection(db, STORAGE_KEYS.rentals), orderBy("id", "desc")), (snap) => {
      setRentals(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    setDataLoaded(true);
    return () => { unsubItems(); unsubCustomers(); unsubRentals(); };
  }, [user]);

  // --- Handlers ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPass);
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setLoginError("Wrong credentials. Please check your email and password.");
      } else {
        setLoginError("Login failed. Please try again later.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const openQtyModal = (item: any) => {
    setQtyModal(item);
    setQtyDelta(0);
  };

  const saveItem = async () => {
    if (!itemForm.name) return alert("Item name is required");
    try {
      if (editItemId) {
        await updateDoc(doc(db, STORAGE_KEYS.items, editItemId), itemForm);
      } else {
        await addDoc(collection(db, STORAGE_KEYS.items), itemForm);
      }
      setModal(null);
    } catch (e) { alert("Error saving item"); }
  };

  const deleteItem = async (id: string) => {
    if (confirm("Delete this item?")) await deleteDoc(doc(db, STORAGE_KEYS.items, id));
  };

  const applyQty = async () => {
    const newQty = Math.max(0, qtyModal.quantity + qtyDelta);
    try {
      await updateDoc(doc(db, STORAGE_KEYS.items, qtyModal.id), { 
        quantity: newQty
      });
      setQtyModal(null);
    } catch (e) { alert("Error updating stock"); }
  };

  const saveCust = async () => {
    if (!custForm.name || !custForm.phone) return alert("Name and phone are required");
    try {
      if (editCustId) {
        await updateDoc(doc(db, STORAGE_KEYS.customers, editCustId), custForm);
      } else {
        await addDoc(collection(db, STORAGE_KEYS.customers), custForm);
      }
      setModal(null);
    } catch (e) { alert("Error saving customer"); }
  };

  const deleteCust = async (id: string) => {
    if (confirm("Delete this customer?")) await deleteDoc(doc(db, STORAGE_KEYS.customers, id));
  };

  const saveRental = async () => {
    if (!rentalForm.customerId || !rentalForm.rentDate || !rentalForm.returnDate || !rentalForm.items.length) return alert("Fill all required fields");
    const cust = customers.find(c => c.id === rentalForm.customerId);
    const days = Math.max(1, Math.ceil((new Date(rentalForm.returnDate).getTime() - new Date(rentalForm.rentDate).getTime()) / 86400000));
    const total = rentalForm.items.reduce((s: number, x: any) => s + x.qty * x.pricePerDay * days, 0);
    
    const record = { 
      id: Date.now(), 
      customerId: rentalForm.customerId, 
      customerName: cust.name, 
      customerPhone: cust.phone, 
      items: rentalForm.items, 
      rentDate: rentalForm.rentDate, 
      returnDate: rentalForm.returnDate, 
      days, 
      totalAmount: total, 
      status: "active", 
      notes: rentalForm.notes,
      advancePaid: Number(rentalForm.advancePaid || 0)
    };
    
    try {
      await addDoc(collection(db, STORAGE_KEYS.rentals), record);
      setModal(null);
      setRentalForm({ customerId: "", rentDate: "", returnDate: "", notes: "", items: [] });
    } catch (e) { alert("Error saving rental"); }
  };

  const markReturned = async (id: string) => {
    await updateDoc(doc(db, STORAGE_KEYS.rentals, id), { status: "returned" });
  };

  const deleteRental = async (id: string) => {
    if (confirm("Delete this rental record?")) await deleteDoc(doc(db, STORAGE_KEYS.rentals, id));
  };

  // --- Render Auth States ---
  if (authLoading) {
    return <div className="flex items-center justify-center h-screen text-forest font-semibold bg-canvas">Authenticating...</div>;
  }

  // SECURITY: If not logged in and secret key is wrong, show nothing/404
  if (!user && !hasSecretKey) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-canvas text-forest text-center p-5">
        <h1 className="text-7xl m-0 opacity-10">404</h1>
        <p className="font-semibold -mt-2">The requested page was not found.</p>
        <Btn variant="ghost" onClick={() => router.push("/")} className="mt-5">Return Home</Btn>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-canvas p-5">
        <div className="bg-white p-10 rounded-[24px] w-full max-w-[400px] shadow-card border border-bone">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-forest rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-4 shadow-nav">⛺</div>
            <h1 className="m-0 text-2xl font-black text-forest uppercase tracking-tight">Admin Login</h1>
            <p className="text-sage-light text-[13px] font-semibold mt-1">Wild Trail Gear Management Console</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#F8F5F0", padding: 20 }}>
        <div style={{ background: "#fff", padding: 40, borderRadius: 24, width: "100%", maxWidth: 400, boxShadow: "0 20px 40px rgba(0,0,0,0.05)", border: "1px solid #EDE8E0" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 100, height: 100, margin: "0 auto 16px", borderRadius: 24, overflow: 'hidden', border: '1px solid #EDE8E0', background: '#fff' }}>
              <img src="/images/updated logo.jpg" alt="Wild Trail Gear Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#1B4332", textTransform: 'uppercase', letterSpacing: '-0.03em' }}>Admin Login</h1>
            <p style={{ color: "#84A98C", fontSize: 13, fontWeight: 600, marginTop: 4 }}>Wild Trail Gear Management Console</p>
          </div>
          <form onSubmit={handleLogin}>
            <Input label="Email Address" type="email" required value={loginEmail} onChange={(e: any) => setLoginEmail(e.target.value)} placeholder="kesharapravodya@gmail.com" />
            <Input label="Password" type="password" required value={loginPass} onChange={(e: any) => setLoginPass(e.target.value)} placeholder="••••••••" />
            {loginError && <div className="bg-red-50 text-red-600 px-3.5 py-2.5 rounded-xl text-xs font-semibold mb-4 border border-red-200">{loginError}</div>}
            <Btn type="submit" className="w-full h-12 text-[15px]">Enter Management Console</Btn>
          </form>
        </div>
      </div>
    );
  }

  if (!dataLoaded) {
    return <div className="flex items-center justify-center h-screen text-forest font-semibold bg-canvas">Syncing Trail Cloud...</div>;
  }

  // --- Dashboard Data ---
  // --- Dashboard Data ---
  const activeRentals = rentals.filter(r => r.status === "active").length;
  const totalRevenue = rentals.reduce((s, r) => s + r.totalAmount, 0);

  return (
    <div className="flex min-h-screen font-sans bg-canvas text-ink selection:bg-forest selection:text-white">
      {/* Sidebar */}
      <aside className="w-[240px] bg-dark-footer shrink-0 flex flex-col min-h-screen sticky top-0 h-screen">
        <div className="pt-8 px-6 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9.5 h-9.5 bg-sage-light rounded-xl flex items-center justify-center text-xl p-2 shrink-0">⛺</div>
  const lowStock = items.filter(i => i.quantity < 5).length;
  const sidebarW = 260;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#F8F5F0" }}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: sidebarW, 
        background: "#1B2E20", 
        flexShrink: 0, 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh", 
        position: isMobile ? "fixed" : "sticky", 
        top: 0, 
        height: "100vh",
        left: isMobile && !isSidebarOpen ? -sidebarW : 0,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 101,
        boxShadow: isMobile ? '10px 0 30px rgba(0,0,0,0.2)' : 'none'
      }}>
        <div style={{ padding: "32px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 42, height: 42, background: "#fff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", overflow: 'hidden' }}>
              <img src="/images/updated logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <div className="text-[15px] font-black text-canvas leading-tight uppercase tracking-tight">WILD TRAIL</div>
              <div className="text-[11px] text-sage-light font-bold uppercase tracking-eyebrow">Management</div>
            </div>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(false)}
                style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: 8, borderRadius: 8, cursor: 'pointer' }}
              >✕</button>
            )}
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "dashboard", icon: "◈", label: "Dashboard" },
            { id: "items", icon: "⊞", label: "Inventory" },
            { id: "rentals", icon: "⊟", label: "Rentals" },
            { id: "customers", icon: "⊡", label: "Customers" },
            { id: "billing", icon: "⊠", label: "Financials" },
          ].map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-none cursor-pointer text-sm transition-all duration-200 ${tab === n.id ? 'bg-forest text-sage-light font-bold' : 'bg-transparent text-dust font-medium hover:bg-forest/50'}`}>
              <span className={`text-lg leading-none ${tab === n.id ? 'opacity-100' : 'opacity-60'}`}>{n.icon}</span>
            <button key={n.id} onClick={() => { setTab(n.id); if (isMobile) setIsSidebarOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: "none", cursor: "pointer", marginBottom: 4, background: tab === n.id ? "#1B4332" : "transparent", color: tab === n.id ? "#84A98C" : "#A8B5AB", fontSize: 14, fontWeight: tab === n.id ? 700 : 500, textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ fontSize: 18, lineHeight: 1, opacity: tab === n.id ? 1 : 0.6 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-5 px-6 border-t border-white/5">
          <div className="mb-3 flex items-center gap-2.5">
             <Avatar name={user.email || "Admin"} size={28} bgClass="bg-forest" />
             <div className="text-xs text-canvas font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</div>
          </div>
          <button onClick={handleLogout} className="w-full p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-[11px] font-bold cursor-pointer hover:bg-red-500/20 transition-colors">LOGOUT</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-bone px-8 h-18 shrink-0 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="m-0 text-xl font-black text-forest uppercase tracking-tight">{tab.toUpperCase()}</h1>
          <div className="flex gap-2.5">
            {tab === "items" && <Btn onClick={() => { setItemForm(emptyItem); setEditItemId(null); setModal("item"); }}>+ New Item</Btn>}
            {tab === "customers" && <Btn onClick={() => { setCustForm(emptyCustomer); setEditCustId(null); setModal("customer"); }}>+ New Customer</Btn>}
            {tab === "rentals" && <Btn onClick={() => { setRentalForm({ customerId: "", rentDate: "", returnDate: "", notes: "", items: [] }); setModal("rental"); }}>+ New Rental</Btn>}
          </div>
        </header>

        <div className="p-8 flex-1">
          {/* Dashboard */}
          {tab === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { label: "Inventory Items", value: items.length, colorClass: "text-forest" },
                  { label: "Active Rentals", value: activeRentals, colorClass: "text-sage" },
                  { label: "Registered", value: customers.length, colorClass: "text-olive" },
                  { label: "Total Revenue", value: `LKR ${totalRevenue.toLocaleString()}`, colorClass: "text-amber" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-card p-6 border border-bone shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[11px] font-bold text-sage-light uppercase tracking-eyebrow mb-2.5">{s.label}</div>
                    <div className={`text-3xl font-black tracking-tight ${s.colorClass}`}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-card border border-bone overflow-hidden shadow-sm">
                  <div className="px-6 py-5 border-b border-bone font-black text-[15px] text-forest">RECENT RENTALS</div>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ 
          background: "#fff", 
          borderBottom: "1px solid #EDE8E0", 
          padding: isMobile ? "0 16px" : "0 32px", 
          height: isMobile ? 64 : 72, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          position: "sticky", 
          top: 0, 
          zIndex: 10 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', padding: 0, color: '#1B4332' }}
              >☰</button>
            )}
            <h1 style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 900, color: "#1B4332", textTransform: 'uppercase', letterSpacing: '-0.03em' }}>{tab.toUpperCase()}</h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {tab === "items" && <Btn onClick={() => { setItemForm(emptyItem); setEditItemId(null); setModal("item"); }} style={{ padding: isMobile ? "8px 12px" : "10px 20px" }}>{isMobile ? "+ Add" : "+ New Item"}</Btn>}
            {tab === "customers" && <Btn onClick={() => { setCustForm(emptyCustomer); setEditCustId(null); setModal("customer"); }} style={{ padding: isMobile ? "8px 12px" : "10px 20px" }}>{isMobile ? "+ Add" : "+ New Customer"}</Btn>}
            {tab === "rentals" && <Btn onClick={() => { setRentalForm({ customerId: "", rentDate: "", returnDate: "", notes: "", items: [] }); setRentalCustSearch(""); setShowCustDropdown(false); setModal("rental"); }} style={{ padding: isMobile ? "8px 12px" : "10px 20px" }}>{isMobile ? "+ Add" : "+ New Rental"}</Btn>}
          </div>
        </header>

        <div style={{ padding: isMobile ? 16 : 32, flex: 1 }}>
          {/* Dashboard */}
          {tab === "dashboard" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap: isMobile ? 12 : 20, marginBottom: 32 }}>
                {[
                  { label: "Inventory", value: items.length, color: "#1B4332" },
                  { label: "Active", value: activeRentals, color: "#52796F" },
                  { label: "Customers", value: customers.length, color: "#2D4A35" },
                  { label: "Revenue", value: `LKR ${totalRevenue.toLocaleString()}`, color: "#C8651A" },
                ].map(s => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 20, padding: isMobile ? "16px" : "24px", border: "1px solid #EDE8E0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#84A98C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: isMobile ? 18 : 28, fontWeight: 900, color: s.color, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>
                <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #EDE8E0", overflow: "hidden" }}>
                  <div style={{ padding: "20px 24px", borderBottom: "1px solid #EDE8E0", fontWeight: 900, fontSize: 15, color: "#1B4332" }}>RECENT RENTALS</div>
                  {rentals.slice(0, 5).map(r => (
                    <div key={r.id} className="px-6 py-4 border-b border-canvas last:border-none flex justify-between items-center hover:bg-canvas/50 transition-colors">
                      <div><div className="font-bold text-forest">{r.customerName}</div><div className="text-[11px] text-sage-light font-medium">{r.rentDate}</div></div>
                      <Badge label={r.status} colorClass={r.status === "active" ? "text-forest bg-forest/10" : "text-whatsapp bg-whatsapp/10"} />
                    </div>
                  ))}
                  {rentals.length === 0 && <div className="p-8 text-center text-sage-light">No rentals found.</div>}
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          {tab === "items" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-card border border-bone overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                  <div className="h-40 bg-bone relative bg-center bg-cover" style={{ backgroundImage: item.image ? `url(${item.image})` : undefined }}>
                    <div className="absolute top-3 right-3"><Badge label={item.category} colorClass="bg-forest text-canvas" /></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="font-black text-base text-forest mb-1.5">{item.name}</div>
                    <div className="flex justify-between bg-canvas p-3 rounded-2xl mb-4">
                      <div><div className="text-[10px] font-extrabold text-slate">STOCK</div><div className="text-lg font-black text-forest">{item.quantity}</div></div>
                      <div className="text-right"><div className="text-[10px] font-extrabold text-slate">PRICE</div><div className="text-sm font-black text-forest pt-1">LKR {item.pricePerDay}</div></div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Btn variant="ghost" onClick={() => openQtyModal(item)} className="flex-1 text-[11px] py-2">STOCK</Btn>
                      <Btn variant="secondary" onClick={() => { setItemForm(item); setEditItemId(item.id); setModal("item"); }} className="flex-1 text-[11px] py-2">EDIT</Btn>
                      <Btn variant="danger" onClick={() => deleteItem(item.id)} className="px-3 py-2">✕</Btn>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: isMobile ? 12 : 20 }}>
              {items.map(item => (
                <div key={item.id} style={{ background: "#fff", borderRadius: 24, border: "1px solid #EDE8E0", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: isMobile ? 120 : 160, background: item.image ? `url(${item.image}) center/cover` : "#EDE8E0", position: 'relative' }}>
                    <div style={{ position: "absolute", top: 8, right: 8 }}><Badge label={item.category} color="#1B4332" /></div>
                  </div>
                  <div style={{ padding: isMobile ? 12 : 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: 900, fontSize: isMobile ? 14 : 16, color: "#1B4332", marginBottom: 6, lineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden' }}>{item.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", background: '#F8F5F0', padding: isMobile ? 8 : 12, borderRadius: 12, marginBottom: 12 }}>
                      <div><div style={{ fontSize: 8, fontWeight: 800 }}>STOCK</div><div style={{ fontSize: isMobile ? 14 : 18, fontWeight: 900 }}>{item.quantity}</div></div>
                      <div style={{ textAlign: 'right' }}><div style={{ fontSize: 8, fontWeight: 800 }}>PRICE</div><div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 900 }}>LKR {item.pricePerDay}</div></div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 'auto' }}>
                      <Btn variant="ghost" onClick={() => openQtyModal(item)} style={{ flex: 1, fontSize: 10, padding: '6px 4px', justifyContent: 'center' }}>STOCK</Btn>
                      <Btn variant="secondary" onClick={() => { setItemForm(item); setEditItemId(item.id); setModal("item"); }} style={{ flex: 1, fontSize: 10, padding: '6px 4px', justifyContent: 'center' }}>EDIT</Btn>
                      {!isMobile && <Btn variant="danger" onClick={() => deleteItem(item.id)}>✕</Btn>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rentals */}
          {tab === "rentals" && (
            <div className="bg-white rounded-card border border-bone overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead><tr className="bg-canvas border-b border-bone">{["CUSTOMER", "GEAR", "RENT", "DAYS", "TOTAL", "STATUS", "ACTIONS"].map(h => <th key={h} className="p-4 text-left text-[10px] font-extrabold text-sage-light uppercase tracking-wider">{h}</th>)}</tr></thead>
                  <tbody>
                    {rentals.map(r => (
                      <tr key={r.id} className="border-b border-canvas last:border-none hover:bg-canvas/50 transition-colors">
                        <td className="p-4"><div className="font-bold text-forest">{r.customerName}</div></td>
                        <td className="p-4 text-xs text-slate">{r.items.map((x: any) => x.itemName).join(", ")}</td>
                        <td className="p-4 text-[13px] text-ink">{r.rentDate}</td>
                        <td className="p-4 font-bold text-forest">{r.days}</td>
                        <td className="p-4 font-black text-forest whitespace-nowrap">LKR {r.totalAmount.toLocaleString()}</td>
                        <td className="p-4"><Badge label={r.status} colorClass={r.status === "active" ? "text-forest bg-forest/10" : "text-whatsapp bg-whatsapp/10"} /></td>
                        <td className="p-4">
                          <div className="flex gap-1.5">
                            <Btn variant="ghost" onClick={() => setViewRental(r)} className="text-[11px] py-1.5 px-3">BILL</Btn>
                            {r.status === "active" && <Btn variant="success" onClick={() => markReturned(r.id)} className="text-[11px] py-1.5 px-3">RETURN</Btn>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #EDE8E0", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 600 : 'auto' }}>
                <thead><tr style={{ background: "#F8F5F0" }}>{["CUSTOMER", "GEAR", "RENT", "DAYS", "TOTAL", "STATUS", "ACTIONS"].map(h => <th key={h} style={{ padding: 16, textAlign: 'left', fontSize: 10, fontWeight: 800, color: "#84A98C" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {rentals.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #F8F5F0" }}>
                      <td style={{ padding: 16 }}><div style={{ fontWeight: 700 }}>{r.customerName}</div></td>
                      <td style={{ padding: 16, fontSize: 12 }}>{r.items.map((x: any) => x.itemName).join(", ")}</td>
                      <td style={{ padding: 16, fontSize: 13 }}>{r.rentDate}</td>
                      <td style={{ padding: 16, fontWeight: 700 }}>{r.days}</td>
                      <td style={{ padding: 16, fontWeight: 900 }}>LKR {r.totalAmount.toLocaleString()}</td>
                      <td style={{ padding: 16 }}><Badge label={r.status} color={r.status === "active" ? "#1B4332" : "#25D366"} /></td>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <Btn variant="ghost" onClick={() => setViewRental(r)} style={{ fontSize: 11 }}>BILL</Btn>
                          {r.status === "active" && <Btn variant="success" onClick={() => markReturned(r.id)} style={{ fontSize: 11 }}>RETURN</Btn>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Customers */}
          {tab === "customers" && (
            <div className="bg-white rounded-card border border-bone overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead><tr className="bg-canvas border-b border-bone">{["NAME", "PHONE", "EMAIL", "ACTIONS"].map(h => <th key={h} className="p-4 text-left text-[10px] font-extrabold text-sage-light uppercase tracking-wider">{h}</th>)}</tr></thead>
                  <tbody>
                    {customers.map(c => (
                      <tr key={c.id} className="border-b border-canvas last:border-none hover:bg-canvas/50 transition-colors">
                        <td className="p-4"><div className="flex items-center gap-2.5"><Avatar name={c.name} size={32} /> <b className="text-forest">{c.name}</b></div></td>
                        <td className="p-4 text-sm text-ink">{c.phone}</td>
                        <td className="p-4 text-sm text-ink">{c.email || "-"}</td>
                        <td className="p-4"><Btn variant="secondary" onClick={() => { setCustForm(c); setEditCustId(c.id); setModal("customer"); }} className="py-1.5 px-4 text-xs">Edit</Btn></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: "#fff", borderRadius: 16, padding: "12px 16px", border: "1px solid #EDE8E0", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8B5AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search customers by name, phone, or email..." 
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: '#1B4332', background: 'transparent' }}
                />
              </div>
              <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #EDE8E0", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 500 : 'auto' }}>
                  <thead><tr style={{ background: "#F8F5F0" }}>{["NAME", "PHONE", "EMAIL", "ACTIONS"].map(h => <th key={h} style={{ padding: 16, textAlign: 'left', fontSize: 10, fontWeight: 800, color: "#84A98C" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {customers
                      .filter(c => 
                        c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
                        c.phone.includes(customerSearch) || 
                        (c.email && c.email.toLowerCase().includes(customerSearch.toLowerCase()))
                      )
                      .map(c => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #F8F5F0" }}>
                      <td style={{ padding: 16 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Avatar name={c.name} size={32} /><b>{c.name}</b></div></td>
                      <td style={{ padding: 16 }}>{c.phone}</td>
                      <td style={{ padding: 16 }}>{c.email || "-"}</td>
                      <td style={{ padding: 16 }}><Btn variant="secondary" onClick={() => { setCustForm(c); setEditCustId(c.id); setModal("customer"); }}>Edit</Btn></td>
                    </tr>
                  ))}
                  {customers.filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone.includes(customerSearch) || (c.email && c.email.toLowerCase().includes(customerSearch.toLowerCase()))).length === 0 && (
                    <tr><td colSpan={4} style={{ padding: 32, textAlign: 'center', color: '#84A98C' }}>No customers found matching "{customerSearch}"</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* Financials */}
          {tab === "billing" && (
             <div className="bg-white rounded-card border border-bone overflow-hidden shadow-sm">
              <div className="p-6 border-b border-canvas font-black text-forest">TRANSACTION HISTORY</div>
               <div className="overflow-x-auto">
                 <table className="w-full border-collapse">
                  <thead><tr className="bg-canvas border-b border-bone">{["INVOICE #", "CUSTOMER", "AMOUNT", "STATUS"].map(h => <th key={h} className="p-4 text-left text-[10px] font-extrabold text-sage-light uppercase tracking-wider">{h}</th>)}</tr></thead>
                  <tbody>
                    {rentals.map(r => (
                      <tr key={r.id} className="border-b border-canvas last:border-none hover:bg-canvas/50 transition-colors">
                        <td className="p-4 font-mono text-xs text-slate">#{r.id.toString().slice(-8)}</td>
                        <td className="p-4 font-medium text-forest">{r.customerName}</td>
                        <td className="p-4 font-black text-forest">LKR {r.totalAmount.toLocaleString()}</td>
                        <td className="p-4"><Badge label={r.status} colorClass={r.status === "active" ? "text-forest bg-forest/10" : "text-whatsapp bg-whatsapp/10"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
             <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #EDE8E0", overflowX: "auto" }}>
              <div style={{ padding: 24, borderBottom: '1px solid #F8F5F0', fontWeight: 900 }}>TRANSACTION HISTORY</div>
               <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 500 : 'auto' }}>
                <thead><tr style={{ background: "#F8F5F0" }}>{["INVOICE #", "CUSTOMER", "AMOUNT", "STATUS"].map(h => <th key={h} style={{ padding: 16, textAlign: 'left', fontSize: 10, fontWeight: 800, color: "#84A98C" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {rentals.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #F8F5F0" }}>
                      <td style={{ padding: 16, fontFamily: 'monospace' }}>#{r.id.toString().slice(-8)}</td>
                      <td style={{ padding: 16 }}>{r.customerName}</td>
                      <td style={{ padding: 16, fontWeight: 900 }}>LKR {r.totalAmount.toLocaleString()}</td>
                      <td style={{ padding: 16 }}><Badge label={r.status} color={r.status === "active" ? "#1B4332" : "#25D366"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {modal === "item" && (
        <Modal title={editItemId ? "Edit Item" : "Add New Item"} onClose={() => setModal(null)}>
          <Input label="Name" value={itemForm.name} onChange={(e: any) => setItemForm((f: any) => ({ ...f, name: e.target.value }))} />
          
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Item Photo</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {itemForm.image && (
                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', border: '1px solid #EDE8E0', flexShrink: 0, background: '#f8f9fa' }}>
                  <img src={itemForm.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ width: '100%', fontSize: 13, padding: '8px 0', outline: 'none' }}
                  disabled={uploadingImage}
                />
                {uploadingImage && <div style={{ fontSize: 11, color: '#84A98C', marginTop: 4, fontWeight: 600 }}>Uploading to Trail Cloud...</div>}
              </div>
            </div>
          </div>

          <Select label="Category" value={itemForm.category} onChange={(e: any) => setItemForm((f: any) => ({ ...f, category: e.target.value }))}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Qty" type="number" value={itemForm.quantity} onChange={(e: any) => setItemForm((f: any) => ({ ...f, quantity: +e.target.value }))} />
            <Input label="LKR / Day" type="number" value={itemForm.pricePerDay} onChange={(e: any) => setItemForm((f: any) => ({ ...f, pricePerDay: +e.target.value }))} />
          </div>
          <Textarea label="Description" value={itemForm.description} onChange={(e: any) => setItemForm((f: any) => ({ ...f, description: e.target.value }))} />
          <Btn onClick={saveItem} className="w-full mt-2">Save Equipment</Btn>
        </Modal>
      )}

      {qtyModal && (
        <Modal title="Update Stock" onClose={() => setQtyModal(null)} width={350}>
          <div className="text-center mb-5"><div className="text-5xl font-black text-forest">{qtyModal.quantity}</div></div>
          <Input label="Adjustment (+/-)" type="number" value={qtyDelta} onChange={(e: any) => setQtyDelta(+e.target.value)} />
          <Btn onClick={applyQty} className="w-full mt-2">Apply Stock Change</Btn>
        </Modal>
      )}

      {modal === "customer" && (
        <Modal title="Customer Profile" onClose={() => setModal(null)}>
          <Input label="Name" value={custForm.name} onChange={(e: any) => setCustForm((f: any) => ({ ...f, name: e.target.value }))} />
          <Input label="Phone" value={custForm.phone} onChange={(e: any) => setCustForm((f: any) => ({ ...f, phone: e.target.value }))} />
          <Input label="Email" value={custForm.email} onChange={(e: any) => setCustForm((f: any) => ({ ...f, email: e.target.value }))} />
          <Btn onClick={saveCust} className="w-full mt-2">Save Profile</Btn>
        </Modal>
      )}

      {modal === "rental" && (
        <Modal title="New Rental" onClose={() => setModal(null)}>
          <Select label="Customer" value={rentalForm.customerId} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, customerId: e.target.value }))}>
            <option value="">Select Renter</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <div className="flex gap-3">
            <div className="flex-1"><Input label="Start" type="date" value={rentalForm.rentDate} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, rentDate: e.target.value }))} /></div>
            <div className="flex-1"><Input label="End" type="date" value={rentalForm.returnDate} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, returnDate: e.target.value }))} /></div>
          </div>
          <div className="bg-canvas p-4 rounded-card mb-4 border border-bone">
            <Select value={rentalItemSel.itemId} onChange={(e: any) => setRentalItemSel((s: any) => ({ ...s, itemId: e.target.value }))}>
              <option value="">Select Gear</option>
              {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </Select>
            <Btn onClick={() => {
              const itm = items.find(i => i.id === rentalItemSel.itemId);
              if (itm) setRentalForm((f: any) => ({ ...f, items: [...f.items, { itemId: itm.id, itemName: itm.name, qty: 1, pricePerDay: itm.pricePerDay }] }));
            }} className="w-full mb-3" variant="secondary">Add Gear</Btn>
            <div className="space-y-1.5">
              {rentalForm.items.map((x: any, idx: number) => <div key={idx} className="text-[13px] font-bold text-forest flex justify-between bg-white px-3 py-2 rounded-lg border border-bone">{x.itemName} <span className="text-sage-light">×1</span></div>)}
            </div>
          </div>
          <Input label="Advance Paid (LKR)" type="number" value={rentalForm.advancePaid} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, advancePaid: e.target.value }))} />
          <Btn onClick={saveRental} className="w-full mt-2">Initialize Rental</Btn>
        <Modal title="New Rental" onClose={() => { setModal(null); setRentalCustSearch(""); setShowCustDropdown(false); }}>
          <div style={{ marginBottom: 14, position: 'relative' }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Customer</label>
            <input 
              type="text"
              placeholder="Search and select customer..."
              value={rentalCustSearch}
              onChange={(e) => {
                setRentalCustSearch(e.target.value);
                setShowCustDropdown(true);
                if (rentalForm.customerId) setRentalForm((f: any) => ({ ...f, customerId: "" }));
              }}
              onFocus={() => setShowCustDropdown(true)}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #EDE8E0", fontSize: 14, background: "#fff", color: "#1A1A18", boxSizing: "border-box", outline: "none" }}
            />
            {showCustDropdown && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #EDE8E0', borderRadius: 10, marginTop: 4, maxHeight: 200, overflowY: 'auto', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                {customers
                  .filter(c => c.name.toLowerCase().includes(rentalCustSearch.toLowerCase()))
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(c => (
                    <div 
                      key={c.id} 
                      onClick={() => {
                        setRentalForm((f: any) => ({ ...f, customerId: c.id }));
                        setRentalCustSearch(c.name);
                        setShowCustDropdown(false);
                      }}
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #F8F5F0', fontSize: 14, background: rentalForm.customerId === c.id ? '#EDE8E0' : 'transparent' }}
                      onMouseEnter={(e: any) => { if (rentalForm.customerId !== c.id) e.target.style.background = '#F8F5F0'; }}
                      onMouseLeave={(e: any) => { if (rentalForm.customerId !== c.id) e.target.style.background = 'transparent'; }}
                    >
                      {c.name} <span style={{ fontSize: 12, color: '#84A98C', marginLeft: 8 }}>{c.phone}</span>
                    </div>
                  ))}
                  {customers.filter(c => c.name.toLowerCase().includes(rentalCustSearch.toLowerCase())).length === 0 && (
                    <div style={{ padding: '10px 14px', fontSize: 13, color: '#6b7280' }}>No customers found</div>
                  )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: isMobile ? 'column' : 'row' }}>
            <Input label="Start" type="date" value={rentalForm.rentDate} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, rentDate: e.target.value }))} />
            <Input label="End" type="date" value={rentalForm.returnDate} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, returnDate: e.target.value }))} />
          </div>
          <div style={{ background: '#f8fafc', padding: isMobile ? 12 : 15, borderRadius: 15, marginBottom: 15 }}>
            <div style={{ display: 'flex', gap: 8, flexDirection: isMobile ? 'column' : 'row' }}>
              <div style={{ flex: 1 }}>
                <Select value={rentalItemSel.itemId} onChange={(e: any) => setRentalItemSel((s: any) => ({ ...s, itemId: e.target.value }))}>
                  <option value="">Select Gear</option>
                  {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </Select>
              </div>
              <Btn onClick={() => {
                const itm = items.find(i => i.id === rentalItemSel.itemId);
                if (itm) setRentalForm((f: any) => ({ ...f, items: [...f.items, { itemId: itm.id, itemName: itm.name, qty: 1, pricePerDay: itm.pricePerDay }] }));
              }} style={{ height: isMobile ? 42 : 44 }}>Add Gear</Btn>
            </div>
            <div style={{ marginTop: 10 }}>
              {rentalForm.items.map((x: any, idx: number) => (
                <div key={idx} style={{ marginTop: 5, fontSize: 13, fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{x.itemName} <span style={{ color: '#84A98C' }}>×1</span></span>
                  <button onClick={() => setRentalForm((f: any) => ({ ...f, items: f.items.filter((_: any, i: number) => i !== idx) }))} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: 12 }}>Remove</button>
                </div>
              ))}
            </div>
          </div>
          <Input label="Advance Paid (LKR)" type="number" value={rentalForm.advancePaid} onChange={(e: any) => setRentalForm((f: any) => ({ ...f, advancePaid: e.target.value }))} />
          <Btn onClick={saveRental} style={{ width: '100%', height: 48 }}>Initialize Rental</Btn>
        </Modal>
      )}

      {viewRental && (
        <Modal title="Invoice Summary" onClose={() => setViewRental(null)} width={600}>
          <div id="printable-bill" className="bg-white p-10 rounded-card text-ink border border-bone">
            <div className="flex justify-between items-start mb-10 border-b-2 border-forest pb-5">
              <div>
                <h2 className="m-0 text-forest text-2xl font-black uppercase tracking-tight">WILD TRAIL GEAR</h2>
                <p className="my-1 text-xs text-sage-light font-bold uppercase tracking-wider">Adventure Gear Rentals • Panadura</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-forest uppercase">INVOICE</div>
                <div className="text-xs text-slate font-mono">#{viewRental.id.toString().slice(-8)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-10">
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, marginBottom: 40 }}>
              <div>
                <div className="text-[10px] font-extrabold text-sage-light mb-2 uppercase tracking-wider">CUSTOMER</div>
                <div className="font-bold text-base text-forest">{viewRental.customerName}</div>
                <div className="text-[13px] text-slate">{viewRental.customerPhone}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-extrabold text-sage-light mb-2 uppercase tracking-wider">RENTAL PERIOD</div>
                <div className="font-bold text-sm text-forest">{viewRental.rentDate} to {viewRental.returnDate}</div>
                <div className="text-[13px] text-forest font-extrabold">{viewRental.days} Total Days</div>
              </div>
            </div>

            <table className="w-full border-collapse mb-10">
              <thead>
                <tr className="border-b border-bone">
                  <th className="text-left py-3 text-[11px] text-sage-light font-bold tracking-wider">ITEM</th>
                  <th className="text-center py-3 text-[11px] text-sage-light font-bold tracking-wider">QTY</th>
                  <th className="text-right py-3 text-[11px] text-sage-light font-bold tracking-wider">PER DAY</th>
                  <th className="text-right py-3 text-[11px] text-sage-light font-bold tracking-wider">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {viewRental.items.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-canvas last:border-none">
                    <td className="py-3 font-semibold text-forest">{item.itemName}</td>
                    <td className="py-3 text-center text-slate">{item.qty}</td>
                    <td className="py-3 text-right text-slate font-mono text-sm">LKR {item.pricePerDay}</td>
                    <td className="py-3 text-right font-bold text-forest font-mono">LKR {(item.qty * item.pricePerDay * viewRental.days).toLocaleString()}</td>
              <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#84A98C', marginBottom: 8, textTransform: 'uppercase' }}>RENTAL PERIOD</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{viewRental.rentDate} to {viewRental.returnDate}</div>
                <div style={{ fontSize: 13, color: '#1B4332', fontWeight: 800 }}>{viewRental.days} Total Days</div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40, minWidth: isMobile ? 400 : 'auto' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #EDE8E0' }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 11, color: '#84A98C' }}>ITEM</th>
                    <th style={{ textAlign: 'center', padding: '12px 0', fontSize: 11, color: '#84A98C' }}>QTY</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 11, color: '#84A98C' }}>PER DAY</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 11, color: '#84A98C' }}>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {viewRental.items.map((item: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F8F5F0' }}>
                      <td style={{ padding: '12px 0', fontWeight: 600 }}>{item.itemName}</td>
                      <td style={{ padding: '12px 0', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ padding: '12px 0', textAlign: 'right' }}>LKR {item.pricePerDay}</td>
                      <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 700 }}>LKR {(item.qty * item.pricePerDay * viewRental.days).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <div className="w-[240px]">
                <div className="flex justify-between py-2 border-b border-canvas">
                  <span className="text-[13px] text-slate font-medium">Total Amount</span>
                  <span className="font-bold text-forest font-mono">LKR {viewRental.totalAmount.toLocaleString()}</span>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: isMobile ? '100%' : '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F8F5F0' }}>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>Total Amount</span>
                  <span style={{ fontWeight: 700 }}>LKR {viewRental.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 text-whatsapp font-medium">
                  <span className="text-[13px]">Advance Paid</span>
                  <span className="font-bold font-mono">- LKR {(viewRental.advancePaid || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-forest mt-2">
                  <span className="font-black text-forest">BALANCE DUE</span>
                  <span className="font-black text-forest text-lg font-mono">LKR {(viewRental.totalAmount - (viewRental.advancePaid || 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center border-t border-dashed border-bone pt-5">
              <p className="text-[11px] text-sage-light m-0 font-medium tracking-wider">Thank you for choosing Wild Trail Gear! Please handle equipment with care.</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, marginTop: 24 }}>
            <Btn onClick={async () => {
              const element = document.getElementById('printable-bill');
              if (element) {
                const canvas = await html2canvas(element, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`WTG-Invoice-${viewRental.id.toString().slice(-8)}.pdf`);
              }
            }} variant="primary" className="flex-1">Download PDF</Btn>
            <Btn onClick={() => {
              const printContent = document.getElementById('printable-bill');
              if (printContent) {
                const originalContent = document.body.innerHTML;
                document.body.innerHTML = printContent.innerHTML;
                window.print();
                window.location.reload();
              }
            }} variant="secondary" className="flex-1">Print Bill</Btn>
            <Btn onClick={() => setViewRental(null)} variant="ghost" className="flex-1">Close</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function AdminPanel() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-forest font-semibold bg-canvas">Loading Admin...</div>}>
      <AdminPanelContent />
    </Suspense>
  );
}
