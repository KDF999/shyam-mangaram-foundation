"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  QrCode,
  Copy,
  Check,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Play,
  X,
  ArrowRight,
  Menu,
} from "lucide-react";

interface SevaTier {
  id: string;
  name: string;
  amount: number;
  impact: string;
  category: "langad" | "gaushala";
  popular?: boolean;
}

const SEVA_TIERS: SevaTier[] = [
  {
    id: "feed-10",
    name: "Anna Daan Seva",
    amount: 501,
    impact: "Feeds 10 needy people a full hot, satvik Sunday meal completely free of cost in Chembur",
    category: "langad",
  },
  {
    id: "bhog-seva",
    name: "Prasad & Bhog Seva",
    amount: 1100,
    impact: "Sponsors fresh halwa, prasad & seasonal fruits for morning aarti and free distribution to all",
    category: "langad",
  },
  {
    id: "feed-50",
    name: "Kanya & Sadhu Bhojan",
    amount: 2500,
    impact: "Provides nutritious meals & holy prasad free of cost for 50 needy devotees",
    category: "langad",
    popular: true,
  },
  {
    id: "deg-sponsor",
    name: "Full Langad Deg",
    amount: 5100,
    impact: "Sponsors one giant cauldron (Deg) of hot Langad served free to 150+ needy devotees",
    category: "langad",
  },
  {
    id: "co-sponsor",
    name: "Sunday Langad Co-Sponsor",
    amount: 11000,
    impact: "Co-sponsors the entire Sunday feast feeding over 500+ needy devotees completely free of cost",
    category: "langad",
  },
  {
    id: "gau-grass",
    name: "Gau Grass & Gud Seva",
    amount: 251,
    impact: "Fresh green fodder, sweet jaggery (gud) and clean drinking water for Gau Mata",
    category: "gaushala",
  },
  {
    id: "gau-nutri",
    name: "Daily Fodder & Nutritious Choker",
    amount: 501,
    impact: "Nutritious grain flour, green grass, and mineral care for cows in our Gaushala",
    category: "gaushala",
    popular: true,
  },
  {
    id: "gau-herd",
    name: "One Day Herd Nutrition",
    amount: 1100,
    impact: "Provides wholesome daily fodder, nutrition & fresh water for a herd of cows",
    category: "gaushala",
  },
  {
    id: "gau-day-patron",
    name: "Full Day Gaushala Patron",
    amount: 2500,
    impact: "Sponsors entire Gaushala green fodder, nutrition, shed cleaning and fresh water for a full day",
    category: "gaushala",
  },
  {
    id: "gau-medical",
    name: "Gau Seva Medical & Shelter Care",
    amount: 5100,
    impact: "Veterinary treatment, medicines, seasonal shelter care and nourishment for sick or aged cows",
    category: "gaushala",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "langad" | "gaushala">("all");
  const [selectedAmount, setSelectedAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedUPI, setCopiedUPI] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upi" | "bank">("upi");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [donorForm, setDonorForm] = useState({ name: "", phone: "", email: "", pan: "" });
  const [donationSubmitted, setDonationSubmitted] = useState<boolean>(false);

  const UPI_ID = "shyammangaramfoundation@sbi";
  const UPI_NAME = "Shyam Mangaram Foundation";
  const effectiveAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    UPI_NAME
  )}&am=${effectiveAmount || ""}&cu=INR&tn=${encodeURIComponent(
    "Donation for Shyam Mangaram Foundation Seva"
  )}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    upiDeepLink
  )}&color=231812&bgcolor=fffdfa&margin=10`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleCopyBankDetail = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(key);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleDonorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorForm.name || !donorForm.phone) return;
    setDonationSubmitted(true);
  };

  const filteredTiers =
    selectedCategory === "all" ? SEVA_TIERS : SEVA_TIERS.filter((t) => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#18120E] text-[#FCF8F2] selection:bg-amber-400 selection:text-black antialiased overflow-x-hidden">

      {/* ── TOP ANNOUNCEMENT STRIP ───────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#7A2305] via-[#A84B08] to-[#7A2305] text-white py-2 px-3 sm:px-4 text-center border-b border-amber-600/20 flex items-center justify-center gap-2 sm:gap-3">
        <span className="sanskrit-text text-sm sm:text-base font-semibold text-amber-200 tracking-wide shrink-0">
          ॥ ॐ श्री हनुमते नमः ॥
        </span>
        <span className="hidden sm:inline text-amber-500/40 text-xs">•</span>
        <span className="text-xs sm:text-sm text-white/80 font-light truncate" style={{ fontFamily: "'Lato', sans-serif" }}>
          Sunday Langad in Chembur &mdash; Free of Cost &nbsp;&amp;&nbsp; Pavitra Gaushala Seva
        </span>
        <a
          href="#donate"
          className="hidden md:inline-flex items-center gap-1 text-xs font-semibold tracking-wider text-amber-300 hover:text-white underline underline-offset-2 ml-2"
        >
          Sponsor Seva <ArrowRight size={11} />
        </a>
      </div>

      {/* ── NAVIGATION ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#1C1510]/95 backdrop-blur-md border-b border-amber-700/20 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-500/50 bg-[#B83E03] p-0.5 shrink-0 shadow group-hover:scale-105 transition-transform">
              <Image
                src="/logo-thumb.webp"
                alt="Shyam Mangaram Foundation"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-full"
                priority
              />
            </div>
            <div>
              <span className="playfair-heading font-bold text-sm sm:text-base text-white block leading-tight group-hover:text-amber-300 transition-colors">
                Shyam Mangaram
              </span>
              <span className="sanskrit-text text-xs sm:text-sm text-amber-300/90 block leading-tight">
                सेवा ही हमारा धर्म है
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest text-white/70" style={{ fontFamily: "'Lato', sans-serif" }}>
            <a href="#langad" className="hover:text-amber-300 transition-colors">Sunday Langad</a>
            <a href="#gaushala" className="hover:text-amber-300 transition-colors text-amber-300">Gaushala Seva</a>
            <a href="#hanumanji" className="hover:text-amber-300 transition-colors">Hanuman Mandir</a>
            <a href="#mandirs" className="hover:text-amber-300 transition-colors">Mandirs</a>
            <a href="#what-we-stand-for" className="hover:text-amber-300 transition-colors">Our Belief</a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#donate"
              className="saffron-btn-gradient text-white font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow active:scale-95"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Donate
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white rounded-lg border border-amber-700/30"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-amber-700/20 mt-3 space-y-1 text-center" style={{ fontFamily: "'Lato', sans-serif" }}>
            {[
              { href: "#langad", label: "Sunday Langad" },
              { href: "#gaushala", label: "Gaushala Seva" },
              { href: "#hanumanji", label: "Hanuman Mandir" },
              { href: "#mandirs", label: "Mandirs" },
              { href: "#what-we-stand-for", label: "Our Belief" },
              { href: "#contact", label: "Volunteer" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-white/80 hover:text-amber-300 uppercase tracking-widest font-semibold"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-center items-center text-center px-4 sm:px-8 overflow-hidden" style={{ minHeight: 'calc(100dvh - 96px)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        {/* Blurred video background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay loop muted playsInline preload="none"
            poster="/black-hanuman-ji.webp"
            className="w-full h-full object-cover scale-110 blur-xl opacity-30 brightness-90"
          >
            <source src="/temple-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#18120E] via-[#1D1510]/65 to-[#18120E]/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15)_0%,transparent_65%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Hero logo */}
          <div className="relative w-full max-w-[200px] sm:max-w-xs md:max-w-sm mb-5 sm:mb-7">
            <div className="absolute inset-0 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
            <picture>
              <source srcSet="/logo-transparent.webp" type="image/webp" />
              <img
                src="/logo-transparent.png"
                alt="Shyam Mangaram Foundation"
                width={384}
                height={384}
                className="relative w-full h-auto object-contain drop-shadow-[0_10px_28px_rgba(245,158,11,0.3)]"
                fetchPriority="high"
              />
            </picture>
          </div>

          {/* Sanskrit mantra */}
          <div className="mb-1">
            <div className="sanskrit-text text-2xl sm:text-4xl text-amber-300 font-bold tracking-wide">
              ॥ सेवा ही हमारा धर्म है ॥
            </div>
            <div className="text-xs sm:text-sm text-amber-200/60 mt-1 font-light italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Service is our highest duty — this is our faith, our practice, and our path.
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#FCF8F2]/80 leading-relaxed max-w-2xl px-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.95rem, 2vw, 1.2rem)" }}>
            We feed thousands every Sunday through our <strong className="text-amber-300 font-semibold">Langad in Chembur</strong> — always free, always with love. We care for holy cows through our <strong className="text-amber-400 font-semibold">Gaushala Seva</strong>, and we tend to our sacred <strong className="text-amber-300 font-semibold">Hanuman Mandir</strong> and sanctuaries in <strong className="text-amber-300 font-semibold">Goa and Mumbai</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-2 sm:px-0">
            <a
              href="#donate"
              className="w-full sm:w-auto saffron-btn-gradient text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Heart size={15} className="fill-white shrink-0" />
              Sponsor Food &amp; Gaushala Seva
            </a>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto bg-[#28201A]/80 hover:bg-[#342820] border border-amber-600/30 text-amber-200 text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full flex items-center justify-center gap-2 backdrop-blur-sm transition-all"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Play size={13} className="fill-amber-300 text-amber-300 shrink-0" />
              Watch Temple Darshan
            </button>
          </div>
        </div>

      </section>

      {/* ── WHAT WE STAND FOR (SANATAN DHARMA) ───────────────────────────── */}
      <section id="what-we-stand-for" className="py-14 sm:py-20 px-4 sm:px-8 border-t border-amber-700/15 bg-[#161008]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="sanskrit-text text-base sm:text-lg text-amber-400 font-semibold block mb-2">
              ॥ धर्मो रक्षति रक्षितः ॥
            </span>
            <p className="text-xs text-amber-200/50 italic mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
              "He who protects Dharma is protected by Dharma." — Manusmriti
            </p>
            <h2 className="playfair-heading text-2xl sm:text-4xl font-bold text-white mb-4">
              What We Stand For
            </h2>
            <p className="text-sm sm:text-base text-[#FCF8F2]/75 font-light leading-loose" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
              The Shyam Mangaram Foundation is rooted in the living tradition of <strong className="text-amber-300 font-medium">Sanatan Dharma</strong> — the eternal, universal way of righteous living. We do not merely believe in scripture; we try, week after week, to <em>live</em> it. For us, faith is not a Sunday ritual — it is the food we cook at 5 AM, the water we carry to the Gaushala, the aarti flame that never goes out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Pillar 1 */}
            <div className="border border-amber-700/25 bg-[#1E1510] rounded-2xl p-6 sm:p-7 hover:border-amber-600/40 transition-colors">
              <div className="sanskrit-text text-lg sm:text-xl text-amber-300 font-bold mb-1">
                अहिंसा परमो धर्मः
              </div>
              <div className="text-xs text-amber-200/50 italic mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
                "Non-violence is the highest duty."
              </div>
              <h3 className="playfair-heading text-base sm:text-lg font-bold text-white mb-2">
                Reverence for All Life
              </h3>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                We see the Divine in every living being — human, cow, bird, and street dog alike. Our Gaushala Seva and Pashu care are not charity; they are an act of worship. To serve a Gau Mata is to offer a prayer.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="border border-amber-700/25 bg-[#1E1510] rounded-2xl p-6 sm:p-7 hover:border-amber-600/40 transition-colors">
              <div className="sanskrit-text text-lg sm:text-xl text-amber-300 font-bold mb-1">
                अन्नं ब्रह्म
              </div>
              <div className="text-xs text-amber-200/50 italic mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
                "Food itself is Brahman — the highest, formless God."
              </div>
              <h3 className="playfair-heading text-base sm:text-lg font-bold text-white mb-2">
                Anna Daan as Divine Act
              </h3>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                Our Sunday Langad is not a soup kitchen. It is a sacred offering. Every grain of rice cooked in that cauldron carries a prayer. Every person who eats — rich or poor, known or stranger — is seen as a guest of God.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="border border-amber-700/25 bg-[#1E1510] rounded-2xl p-6 sm:p-7 hover:border-amber-600/40 transition-colors">
              <div className="sanskrit-text text-lg sm:text-xl text-amber-300 font-bold mb-1">
                सर्वे भवन्तु सुखिनः
              </div>
              <div className="text-xs text-amber-200/50 italic mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
                "May all beings be happy, may all be free from suffering."
              </div>
              <h3 className="playfair-heading text-base sm:text-lg font-bold text-white mb-2">
                Seva Without Distinction
              </h3>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                Our langad has no VIP queue. No caste, no religion, no income — just one line, one plate, one family. That is Sanatan Dharma as we understand it. The highest worship is to serve, without expecting anything in return.
              </p>
            </div>
          </div>

          {/* Pull-quote */}
          <div className="mt-10 sm:mt-14 border-l-4 border-amber-500 pl-5 sm:pl-8 max-w-3xl mx-auto">
            <p className="text-base sm:text-xl text-[#FCF8F2]/80 italic leading-loose" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
              "We began with a small cauldron in Chembur and a conviction that feeding one hungry person is worth more than a thousand hours of debate about God. The rest has simply followed."
            </p>
            <div className="mt-3 text-xs uppercase tracking-widest text-amber-400 font-semibold" style={{ fontFamily: "'Lato', sans-serif" }}>
              — Shyam Mangaram Foundation
            </div>
          </div>
        </div>
      </section>

      {/* ── SUNDAY LANGAD ────────────────────────────────────────────────── */}
      <section id="langad" className="py-14 sm:py-20 px-4 sm:px-8 border-t border-amber-700/15 bg-[#1B1410]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="sanskrit-text text-base sm:text-xl text-amber-300 font-semibold block mb-1">
              ॥ अन्नदानं महादानम् ॥
            </div>
            <div className="text-xs text-amber-200/50 italic mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
              "The gift of food is the greatest gift of all." — ancient Vedic saying
            </div>
            <h2 className="playfair-heading text-2xl sm:text-4xl font-bold text-white mb-3">
              Sunday Langad in Chembur
            </h2>
            <p className="text-sm sm:text-base text-[#FCF8F2]/75 font-light leading-loose" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}>
              Every Sunday morning, the Chembur temple opens its gates wide. By 11:30 AM, the giant degs are bubbling — dal, sabzi, roti, rice, halwa. Over 3,500 people sit together and eat. It costs them nothing. No token, no ID, no form. Just a plate, served with both hands, and a smile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
            {[
              {
                num: "01.",
                title: "Always Free of Cost",
                body: "Every Sunday meal is served completely free to anyone who comes — the elderly, children, labourers, students, sadhus, and families. No questions asked.",
              },
              {
                num: "02.",
                title: "Pure Satvik Food",
                body: "Cooked with pure desi ghee, fresh vegetables, and whole grains. No onion, no garlic. Hot dal, rice, rotis, and holy halwa prasad — prepared with care and devotion.",
              },
              {
                num: "03.",
                title: "Unbroken, Every Week",
                body: "Rain or shine, festival or not — this langad has never missed a single Sunday. That consistency is itself a form of prayer, a commitment we made to God and the community.",
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="border border-amber-700/20 bg-[#221914] rounded-2xl p-6 hover:border-amber-600/35 transition-colors">
                <span className="text-amber-500/80 font-serif text-lg block mb-1">{num}</span>
                <h3 className="playfair-heading text-base sm:text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-xs sm:text-sm text-[#FCF8F2]/65 leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>{body}</p>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="border border-amber-600/30 bg-[#261D17] rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <div className="playfair-heading text-base sm:text-xl font-bold text-white mb-1">
                ₹501 feeds 10 people this Sunday — free of cost.
              </div>
              <p className="text-xs text-[#FCF8F2]/60 font-light max-w-xl" style={{ fontFamily: "'Lato', sans-serif" }}>
                Your contribution goes directly into grains, ghee, fresh vegetables, and the fuel that keeps those degs burning every week.
              </p>
            </div>
            <a
              href="#donate"
              className="saffron-btn-gradient text-white text-xs uppercase font-bold tracking-wider px-6 py-3 rounded-full shrink-0 shadow hover:scale-105 transition-transform"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Sponsor Free Meals
            </a>
          </div>
        </div>
      </section>

      {/* ── GAUSHALA SEVA ────────────────────────────────────────────────── */}
      <section id="gaushala" className="py-14 sm:py-20 px-4 sm:px-8 border-t border-amber-700/15 bg-[#17110D]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="sanskrit-text text-xl sm:text-3xl text-amber-300 font-bold block mb-1">
              ॥ गावः विश्वस्य मातरः ॥
            </div>
            <div className="text-xs text-amber-200/50 italic mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
              "The cow is the mother of the entire world."
            </div>
            <div className="sanskrit-text text-sm sm:text-base text-amber-200/80 italic mb-5">
              "धेनूनाम् अस्मि कामधुक्"
            </div>
            <div className="text-xs text-amber-200/50 italic mb-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
              "Among all cows, I am Kamadhenu, the wish-fulfilling divine cow." — Lord Krishna, Bhagavad Gita 10.28
            </div>
            <h2 className="playfair-heading text-2xl sm:text-4xl font-bold text-white mb-3">
              Pavitra Gaushala Seva
            </h2>
            <p className="text-sm sm:text-base text-[#FCF8F2]/70 font-light leading-loose" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}>
              In our tradition, Gau Mata is not just an animal — she is a living deity, the embodiment of selfless giving. Our Gaushala exists to honour that truth every single day, quietly, without fanfare.
            </p>
          </div>

          {/* Story card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center mb-10 sm:mb-12 border border-amber-700/20 bg-[#211813] rounded-3xl p-5 sm:p-10">
            <div className="space-y-4">
              <h3 className="playfair-heading text-lg sm:text-xl font-bold text-amber-200">
                A Place of Compassion
              </h3>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/70 font-light leading-loose" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>
                Before the city wakes up, our caretakers are already at work. Fresh green grass cut from the fields. Sweet jaggery measured out for each cow. Water troughs cleaned and refilled. It is a routine built on love, not obligation.
              </p>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/70 font-light leading-loose" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>
                Injured cows, abandoned street cows, ageing Gau Mata with nowhere to go — they all find shelter here. A veterinarian visits regularly. Every cow has a name.
              </p>
              <div className="sanskrit-text text-sm sm:text-base text-amber-300 italic pt-1">
                "सर्वतीर्थमयी गौः सर्वदेवमयी गौः"
              </div>
              <div className="text-xs text-amber-200/50 italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
                "The cow contains within her all holy places; she contains all the gods."
              </div>
            </div>

            <div className="border border-amber-600/25 bg-[#1A120E] rounded-2xl p-6 text-center space-y-4">
              <div className="text-4xl" aria-hidden="true">🐄</div>
              <h4 className="playfair-heading text-base font-bold text-white">Daily Gaushala Pledge</h4>
              <p className="text-xs text-[#FCF8F2]/65 leading-relaxed font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                Every dawn without exception — green grass, jaggery, grain flour, mineral care, clean water, and genuine affection. That is our daily promise to Gau Mata.
              </p>
              <a
                href="#donate"
                onClick={() => setSelectedCategory("gaushala")}
                className="saffron-btn-gradient text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full inline-block hover:scale-105 transition-transform"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Sponsor Gaushala Seva
              </a>
            </div>
          </div>

          {/* 4 pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { skt: "गौ ग्रास एवं गुड़", label: "Daily Green Fodder", body: "Fresh cut green grass, sweet jaggery, and clean water — offered every single morning." },
              { skt: "पौष्टिक चोकर आहार", label: "Nutritious Diet", body: "Wheat choker, oilcakes, and mineral supplements to maintain strength and healthy digestion." },
              { skt: "गौशाला आश्रय", label: "Clean Shelter", body: "Airy, shaded sheds cleaned daily, with fresh dry bedding for rest and comfort." },
              { skt: "गौ चिकित्सा सेवा", label: "Medical Care", body: "Regular veterinary visits, wound care, and special attention for older or ailing cows." },
            ].map(({ skt, label, body }) => (
              <div key={label} className="border border-amber-700/20 bg-[#1F1712] rounded-xl p-5 hover:border-amber-600/40 transition-colors">
                <div className="sanskrit-text text-sm font-bold text-amber-300 mb-0.5">{skt}</div>
                <div className="text-[10px] uppercase font-bold text-amber-500/70 tracking-wider mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>{label}</div>
                <p className="text-xs text-[#FCF8F2]/65 font-light leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HANUMAN MANDIR ───────────────────────────────────────────────── */}
      <section id="hanumanji" className="py-14 sm:py-20 px-4 sm:px-8 border-t border-amber-700/15 bg-[#1B1410]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            {/* Photo card */}
            <div className="border border-amber-600/30 bg-[#231A14] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-amber-500/40 mb-5 shadow-xl">
                <Image
                  src="/black-hanuman-closeup.webp"
                  alt="Hanuman Mandir — Sacred Murti"
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] uppercase font-bold tracking-wider text-amber-200 bg-black/60 backdrop-blur-sm py-0.5 px-2 rounded-full border border-amber-400/25">
                  Divine Darshan
                </span>
              </div>
              <div className="sanskrit-text text-sm sm:text-base text-amber-200 italic mb-1 leading-relaxed">
                "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्"
              </div>
              <div className="text-xs text-amber-200/45 italic mt-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem" }}>
                "Swift as the mind, mighty as the wind, master of the senses, greatest among the wise."
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-500" style={{ fontFamily: "'Lato', sans-serif" }}>
                Pavitra Dham
              </span>
              <h2 className="playfair-heading text-2xl sm:text-4xl font-bold text-white">
                The Sacred Hanuman Mandir
              </h2>
              <p className="text-sm sm:text-base text-[#FCF8F2]/75 leading-loose font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>
                Within our Mandir stands a rare and consecrated black stone murti of Lord Hanuman — ancient, still, and radiating a presence that devotees say you feel the moment you enter. The air inside is different. Quiet. Charged.
              </p>
              <p className="text-sm sm:text-base text-[#FCF8F2]/75 leading-loose font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem" }}>
                Thousands come every week — some for strength before an exam, some for peace after heartbreak, some simply out of habit and love. The foundation holds daily Vedic aarti, an uninterrupted Akhand Jyot, and distributes prasad with care.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-amber-300/85 font-medium" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div>
                  <span className="block text-[10px] uppercase text-[#FCF8F2]/40 mb-0.5">Morning Darshan</span>
                  6:00 AM – 12:30 PM
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#FCF8F2]/40 mb-0.5">Evening Aarti</span>
                  5:30 PM – 9:00 PM
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#FCF8F2]/40 mb-0.5">Special Pujas</span>
                  Every Tuesday &amp; Saturday
                </div>
              </div>

              <div className="pt-1">
                <a
                  href="#donate"
                  className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-amber-400 hover:text-white underline underline-offset-2"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Sponsor Sindoor &amp; Chola Seva <ChevronRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR MANDIRS ──────────────────────────────────────────────────── */}
      <section id="mandirs" className="py-14 sm:py-20 px-4 sm:px-8 border-t border-amber-700/15 bg-[#17110D]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <div className="sanskrit-text text-sm sm:text-base text-amber-300 block mb-1">
              ॥ पवित्र धाम ॥
            </div>
            <div className="text-xs text-amber-200/50 italic mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
              "Sacred Abodes" — places where the veil between the human and the Divine grows thin.
            </div>
            <h2 className="playfair-heading text-2xl sm:text-4xl font-bold text-white mb-2">Our 2 Mandirs</h2>
            <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
              Two homes of prayer — one in the heartbeat of Mumbai, one in the quiet of Goa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {/* Mumbai */}
            <div className="border border-amber-700/20 bg-[#1F1712] rounded-2xl overflow-hidden flex flex-col">
              <div className="relative w-full h-48 overflow-hidden">
                <Image src="/shiva-darshan.webp" alt="Chembur Mandir Mumbai" width={400} height={200}
                  className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712] via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-amber-300 tracking-wider" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Mumbai Mandir
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="playfair-heading text-base sm:text-lg font-bold text-white mb-1.5">Chembur Mandir, Mumbai</h3>
                <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                  Home of the Sunday Langad and the heart of our community in Mumbai. Daily morning chants, Hanuman Chalisa recitations, and 3,500+ people fed here every week.
                </p>
                <div className="text-[11px] text-[#FCF8F2]/55 space-y-1 mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                  <div className="flex items-center gap-1.5"><MapPin size={11} className="text-amber-500 shrink-0" /> Chembur East, Mumbai</div>
                  <div className="flex items-center gap-1.5"><Clock size={11} className="text-amber-500 shrink-0" /> Sunday Langad: 11:30 AM onwards</div>
                </div>
                <a href="#donate" className="block text-center text-xs uppercase font-bold tracking-wider text-amber-300 hover:text-white py-2 border border-amber-600/30 rounded-xl hover:border-amber-400 transition-colors" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Sponsor Sunday Feast
                </a>
              </div>
            </div>

            {/* Goa */}
            <div className="border border-amber-600/25 bg-[#221914] rounded-2xl overflow-hidden flex flex-col">
              <div className="relative w-full h-48 overflow-hidden">
                <Image src="/black-hanuman-ji.webp" alt="Goa Mandir" width={400} height={200}
                  className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#221914] via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-amber-300 tracking-wider" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Goa Mandir
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="playfair-heading text-base sm:text-lg font-bold text-white mb-1.5">Goa Mandir Sanctuary</h3>
                <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                  A quiet, serene sanctuary offering daily prayers, holy chants, and darshan for pilgrims and sadhus. A place to slow down and remember what matters.
                </p>
                <div className="text-[11px] text-[#FCF8F2]/55 space-y-1 mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
                  <div className="flex items-center gap-1.5"><MapPin size={11} className="text-amber-500 shrink-0" /> Goa Temple Campus, Goa</div>
                  <div className="flex items-center gap-1.5"><Clock size={11} className="text-amber-500 shrink-0" /> Daily Aarti: 7:00 AM &amp; 7:30 PM</div>
                </div>
                <a href="#donate" className="block text-center text-xs uppercase font-bold tracking-wider text-white py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl transition-all" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Goa Mandir Seva
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DONATION SUITE ───────────────────────────────────────────────── */}
      <section id="donate" className="py-14 sm:py-20 px-4 sm:px-8 border-t border-amber-700/20 bg-[#1B1410]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="sanskrit-text text-sm sm:text-base text-amber-300 block mb-1">
              ॥ पवित्र सहयोग ॥
            </div>
            <div className="text-xs text-amber-200/50 italic mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
              "Sacred partnership" — your contribution becomes part of something much larger than any one of us.
            </div>
            <h2 className="playfair-heading text-2xl sm:text-4xl font-bold text-white mb-2">
              Make Your Sacred Donation
            </h2>
            <p className="text-xs sm:text-sm text-[#FCF8F2]/65 font-light" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
              Scan with Google Pay, PhonePe, Paytm or BHIM — or bank transfer via SBI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left — Seva selection */}
            <div className="lg:col-span-7 border border-amber-600/25 bg-[#211813] rounded-3xl p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-white" style={{ fontFamily: "'Lato', sans-serif" }}>Select Seva</span>
                <div className="flex items-center gap-1 bg-[#17110D] p-1 rounded-xl border border-amber-700/20">
                  {(["all", "langad", "gaushala"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedCategory === cat ? "bg-amber-500 text-white" : "text-white/55 hover:text-white"
                      }`}
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[380px] overflow-y-auto pr-1">
                {filteredTiers.map((tier) => {
                  const isSelected = !isCustom && selectedAmount === tier.amount;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => { setSelectedAmount(tier.amount); setIsCustom(false); }}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/20 border-amber-400 text-white"
                          : "bg-[#1A120E] border-amber-700/20 hover:border-amber-500/40 text-white/75"
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="playfair-heading font-bold text-white text-base">₹{tier.amount.toLocaleString("en-IN")}</span>
                        <span className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold" style={{ fontFamily: "'Lato', sans-serif" }}>{tier.name}</span>
                      </div>
                      <p className="text-[11px] text-[#FCF8F2]/65 leading-snug" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem" }}>{tier.impact}</p>
                    </button>
                  );
                })}
              </div>

              {/* Custom amount */}
              <div className="mb-6">
                <label className="text-[11px] uppercase font-semibold tracking-wider text-amber-300 block mb-1.5" style={{ fontFamily: "'Lato', sans-serif" }}>
                  Or enter a custom amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-400">₹</span>
                  <input
                    type="number" min="1" placeholder="Enter amount..."
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setIsCustom(true); }}
                    onFocus={() => setIsCustom(true)}
                    className="w-full bg-[#18110D] border border-amber-700/30 focus:border-amber-300 rounded-xl py-2.5 pl-8 pr-3 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Donor details */}
              <div className="pt-4 border-t border-amber-700/20">
                {donationSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-emerald-200 text-xs flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>Details saved for <strong>{donorForm.name}</strong>. Thank you for your seva!</span>
                  </div>
                ) : (
                  <form onSubmit={handleDonorSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input type="text" placeholder="Your Full Name" value={donorForm.name}
                        onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                        className="bg-[#18110D] border border-amber-700/25 rounded-xl px-3 py-2 text-xs text-white placeholder-white/35 focus:border-amber-300 focus:outline-none" />
                      <input type="tel" placeholder="WhatsApp (for Receipt)" value={donorForm.phone}
                        onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                        className="bg-[#18110D] border border-amber-700/25 rounded-xl px-3 py-2 text-xs text-white placeholder-white/35 focus:border-amber-300 focus:outline-none" />
                    </div>
                    <button type="submit"
                      className="w-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-200 text-[11px] uppercase font-bold tracking-wider py-2 rounded-xl transition-all cursor-pointer"
                      style={{ fontFamily: "'Lato', sans-serif" }}>
                      Save Receipt Info
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right — QR & Bank */}
            <div className="lg:col-span-5 border border-amber-600/25 bg-[#211813] rounded-3xl p-5 sm:p-8 text-center flex flex-col items-center">
              <div className="flex w-full bg-[#17110D] p-1 rounded-xl border border-amber-700/20 mb-5">
                {(["upi", "bank"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab ? "bg-amber-500 text-white" : "text-white/55 hover:text-white"}`}
                    style={{ fontFamily: "'Lato', sans-serif" }}>
                    {tab === "upi" ? "UPI QR Code" : "Bank Wire"}
                  </button>
                ))}
              </div>

              {activeTab === "upi" ? (
                <div className="w-full flex flex-col items-center">
                  <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Selected Contribution</div>
                  <div className="playfair-heading text-2xl font-bold text-white mb-4">
                    ₹{effectiveAmount ? effectiveAmount.toLocaleString("en-IN") : "Any Amount"}
                  </div>
                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border-2 border-amber-400/35 mb-4">
                    <img src={qrCodeUrl} alt="Donation UPI QR Code" width={224} height={224}
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg" />
                  </div>
                  <p className="text-[11px] text-[#FCF8F2]/60 mb-4 max-w-xs leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
                    Scan with <strong>Google Pay, PhonePe, Paytm, BHIM</strong> or any UPI app.
                  </p>
                  <div className="w-full bg-[#18110D] border border-amber-700/25 rounded-xl p-2.5 flex items-center justify-between gap-2 mb-3">
                    <div className="text-left truncate">
                      <span className="text-[9px] uppercase font-bold text-amber-400 block" style={{ fontFamily: "'Lato', sans-serif" }}>Trust UPI ID</span>
                      <span className="text-xs font-mono text-white truncate block">{UPI_ID}</span>
                    </div>
                    <button onClick={handleCopyUPI}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                      style={{ fontFamily: "'Lato', sans-serif" }}>
                      {copiedUPI ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedUPI ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <a href={upiDeepLink}
                    className="w-full saffron-btn-gradient text-white text-xs uppercase font-bold tracking-wider py-3 rounded-full flex items-center justify-center gap-2 sm:hidden cursor-pointer"
                    style={{ fontFamily: "'Lato', sans-serif" }}>
                    <QrCode size={14} /> Pay ₹{effectiveAmount || ""} via UPI App
                  </a>
                </div>
              ) : (
                <div className="w-full text-left space-y-2 text-xs">
                  {[
                    { label: "Beneficiary", val: "Shyam Mangaram Foundation", key: "" },
                    { label: "Bank & Branch", val: "State Bank of India (SBI), Chembur, Mumbai", key: "" },
                    { label: "Account Number", val: "418902847192", key: "acc" },
                    { label: "IFSC Code", val: "SBIN0000523", key: "ifsc" },
                  ].map(({ label, val, key }) => (
                    <div key={label} className="bg-[#18110D] border border-amber-700/25 rounded-xl p-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-500 block" style={{ fontFamily: "'Lato', sans-serif" }}>{label}</span>
                        <span className={`font-semibold text-white ${key ? "font-mono" : ""}`}>{val}</span>
                      </div>
                      {key && (
                        <button onClick={() => handleCopyBankDetail(val, key)} className="text-amber-400 p-1 cursor-pointer">
                          {copiedBank === key ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="border border-amber-700/20 bg-[#18110D] rounded-xl p-3 flex items-start gap-2.5 mt-5 w-full text-left">
                <ShieldCheck size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-[#FCF8F2]/60 leading-snug" style={{ fontFamily: "'Lato', sans-serif" }}>
                  100% of contributions go directly to free Anna Daan, Gaushala nourishment, and mandir upkeep. No admin fees deducted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER & CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="py-14 sm:py-16 px-4 sm:px-8 border-t border-amber-700/15 bg-[#17110D] text-center">
        <div className="max-w-3xl mx-auto">
          <div className="sanskrit-text text-sm sm:text-base text-amber-300 block mb-1">
            ॥ सेवा में जुड़ें ॥
          </div>
          <div className="text-xs text-amber-200/50 italic mb-4" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.95rem" }}>
            "Join us in seva" — come not as a volunteer, but as a family member.
          </div>
          <h2 className="playfair-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Join the Sunday Seva Family
          </h2>
          <p className="text-sm sm:text-base text-[#FCF8F2]/70 font-light leading-loose max-w-xl mx-auto mb-8" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}>
            Every Sunday from 6 AM onwards, volunteers gather to chop vegetables, stir the degs, serve plates, and clean up. It is chaotic, it is noisy, it smells of ghee and cardamom, and it is one of the most beautiful things you will ever do.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="https://wa.me/919820000000?text=Jai%20Shree%20Ram!%20I%20want%20to%20volunteer%20for%20the%20Sunday%20Langad%20and%20Gaushala%20Seva."
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow cursor-pointer"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Connect on WhatsApp
            </a>
            <a
              href="#donate"
              className="w-full sm:w-auto saffron-btn-gradient text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full flex items-center justify-center gap-2 shadow cursor-pointer"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Heart size={14} className="fill-white" /> Support With Donation
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-amber-700/20 bg-[#100C08] py-10 px-4 sm:px-8 text-xs text-[#FCF8F2]/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-600/40 bg-[#B83E03] p-0.5 shrink-0">
              <Image src="/logo-thumb.webp" alt="Shyam Mangaram Foundation" width={48} height={48}
                className="w-full h-full object-cover rounded-full" loading="lazy" />
            </div>
            <div>
              <div className="playfair-heading font-bold text-white text-sm">Shyam Mangaram Foundation</div>
              <div className="sanskrit-text text-amber-300/80 text-xs">सेवा ही हमारा धर्म है</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-amber-300/70" style={{ fontFamily: "'Lato', sans-serif" }}>
            <a href="#langad" className="hover:text-white transition-colors">Sunday Langad</a>
            <a href="#gaushala" className="hover:text-white transition-colors font-semibold text-amber-300">Gaushala Seva</a>
            <a href="#hanumanji" className="hover:text-white transition-colors">Hanuman Mandir</a>
            <a href="#mandirs" className="hover:text-white transition-colors">Mandirs</a>
            <a href="#donate" className="hover:text-white transition-colors font-semibold text-amber-300">Donate</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FCF8F2]/35 gap-2 text-center">
          <p style={{ fontFamily: "'Lato', sans-serif" }}>© {new Date().getFullYear()} Shyam Mangaram Foundation. All rights reserved.</p>
          <p className="sanskrit-text text-amber-300/70 text-xs sm:text-sm font-semibold">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </p>
        </div>
        <div className="max-w-5xl mx-auto mt-2 text-center text-[10px] text-amber-200/30 italic" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          "May all beings be happy. May all beings be free from illness."
        </div>
      </footer>

      {/* ── VIDEO MODAL ──────────────────────────────────────────────────── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#1F1712] border border-amber-500/35 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-amber-700/25 bg-black/35">
              <span className="sanskrit-text text-sm sm:text-base font-bold text-amber-300">
                ॥ मन्दिर दर्शन एवं लंगर सेवा ॥
              </span>
              <button onClick={() => setIsVideoModalOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video controls autoPlay className="w-full h-full object-cover" poster="/black-hanuman-ji.webp">
                <source src="/mandir-darshan.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4 bg-black/55 text-center">
              <a href="#donate" onClick={() => setIsVideoModalOpen(false)}
                className="saffron-btn-gradient text-white text-xs uppercase font-bold tracking-wider px-6 py-2.5 rounded-full inline-flex items-center gap-2 shadow"
                style={{ fontFamily: "'Lato', sans-serif" }}>
                <Heart size={14} className="fill-white" />
                Sponsor Sunday Langad Seva
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
