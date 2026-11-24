"use client";

import React, { useState } from "react";
import {
  Heart,
  QrCode,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  Play,
  X,
  ArrowRight,
  Dog,
  ExternalLink,
} from "lucide-react";

interface SevaTier {
  id: string;
  name: string;
  amount: number;
  impact: string;
  category: "langad" | "animals";
  popular?: boolean;
}

const SEVA_TIERS: SevaTier[] = [
  // Sunday Langad Tiers
  {
    id: "feed-10",
    name: "Anna Daan Seva",
    amount: 501,
    impact: "Feeds 10 devotees a full hot, satvik Sunday meal in Chembur",
    category: "langad",
  },
  {
    id: "bhog-seva",
    name: "Prasad & Bhog Seva",
    amount: 1100,
    impact: "Sponsors fresh halwa, prasad & seasonal fruits for morning aarti",
    category: "langad",
  },
  {
    id: "feed-50",
    name: "Kanya & Sadhu Bhojan",
    amount: 2500,
    impact: "Provides nutritious meals & holy prasad for 50 people",
    category: "langad",
    popular: true,
  },
  {
    id: "deg-sponsor",
    name: "Full Langad Deg",
    amount: 5100,
    impact: "Sponsors one giant cauldron (Deg) of hot Langad feeding 150+ devotees",
    category: "langad",
  },
  {
    id: "co-sponsor",
    name: "Sunday Langad Co-Sponsor",
    amount: 11000,
    impact: "Co-sponsors the entire Sunday feast feeding over 500+ people",
    category: "langad",
  },
  // Animal Seva Tiers
  {
    id: "gau-seva",
    name: "Gau Mata Grass & Gud",
    amount: 251,
    impact: "Fresh green fodder, jaggery (gud) and clean water for sacred cows",
    category: "animals",
  },
  {
    id: "dog-10",
    name: "Feed 10 Street Dogs",
    amount: 501,
    impact: "Freshly cooked warm khichdi, milk, and rotis for 10 voiceless stray dogs",
    category: "animals",
    popular: true,
  },
  {
    id: "pakshi-seva",
    name: "Pakshi Dana-Paani",
    amount: 751,
    impact: "Installs 3 earthen water bowls + 5kg grain bag for birds",
    category: "animals",
  },
  {
    id: "animal-combo",
    name: "Gau & Shwan Seva Combo",
    amount: 1100,
    impact: "Feeds a herd of cows and an entire pack of 25+ street dogs daily",
    category: "animals",
  },
  {
    id: "animal-day-patron",
    name: "Full Day Animal Seva Patron",
    amount: 2100,
    impact: "Sponsors all street animal feeding & bird water refills across mandir grounds",
    category: "animals",
  },
  {
    id: "animal-medical",
    name: "Animal Medical & Winter Seva",
    amount: 5100,
    impact: "Emergency veterinary care, wound dressing, vaccination & reflective collars",
    category: "animals",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "langad" | "animals">("all");
  const [selectedAmount, setSelectedAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedUPI, setCopiedUPI] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upi" | "bank">("upi");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const [donorForm, setDonorForm] = useState({
    name: "",
    phone: "",
    email: "",
    pan: "",
  });
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

  const filteredTiers = selectedCategory === "all"
    ? SEVA_TIERS
    : SEVA_TIERS.filter((t) => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#18120E] text-[#FCF8F2] selection:bg-amber-400 selection:text-black font-sans antialiased">
      {/* ------------------------------------------------------------------
          1. SACRED TOP BANNER (INCREASED SANSKRIT FONT SIZE)
          ------------------------------------------------------------------ */}
      <div className="bg-gradient-to-r from-[#832607] via-[#B45309] to-[#832607] text-white py-2 px-4 text-center border-b border-amber-400/20 shadow-sm flex items-center justify-center gap-3">
        <span className="sanskrit-text text-base sm:text-lg font-bold text-amber-200 tracking-wide">
          ॥ ॐ श्री हनुमते नमः ॥
        </span>
        <span className="hidden sm:inline text-amber-300/40">•</span>
        <span className="text-xs sm:text-sm text-white/90 font-medium truncate">
          Sunday Langad in Chembur &amp; Daily Pashu-Pakshi Seva
        </span>
        <a
          href="#donate"
          className="hidden md:inline-flex items-center gap-1 text-xs uppercase font-bold tracking-wider text-amber-200 hover:text-white underline ml-1"
        >
          Sponsor Seva <ArrowRight size={12} />
        </a>
      </div>

      {/* ------------------------------------------------------------------
          2. MINIMAL CLEAN NAVIGATION WITH ORIGINAL MAIN LOGO
          ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 bg-[#1F1712]/90 backdrop-blur-md border-b border-amber-500/15 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Main Logo Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-400/50 bg-[#C04403] p-0.5 shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <img
                src="/logo-original.png"
                alt="Shyam Mangaram Foundation Main Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="cinzel-heading font-bold text-sm sm:text-base tracking-wide text-white block leading-tight group-hover:text-amber-300 transition-colors">
                Shyam Mangaram
              </span>
              <span className="sanskrit-text text-xs sm:text-sm text-amber-300/90 block leading-tight">
                सेवा ही हमारा धर्म है
              </span>
            </div>
          </a>

          {/* Minimal Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-white/80">
            <a href="#langad" className="hover:text-amber-300 transition-colors">
              Sunday Langad
            </a>
            <a href="#animals" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-300 font-bold">
              <Dog size={14} className="text-amber-300" />
              <span>Animal Seva</span>
            </a>
            <a href="#hanumanji" className="hover:text-amber-300 transition-colors">
              Black Hanuman Ji
            </a>
            <a href="#mandirs" className="hover:text-amber-300 transition-colors">
              Temples
            </a>
            <a href="#contact" className="hover:text-amber-300 transition-colors">
              Volunteer
            </a>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-3">
            <a
              href="#donate"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95"
            >
              Donate Seva
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------
          3. MINIMAL HERO: TRANSPARENT LOGO + BLURRED TEMPLE BG
          ------------------------------------------------------------------ */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-16 overflow-hidden">
        {/* Blurred Temple Video Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/black-hanuman-ji.webp"
            className="w-full h-full object-cover scale-110 filter blur-lg opacity-35 brightness-95"
          >
            <source src="/temple-bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle Golden Warm Radial Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#18120E] via-[#1E1712]/70 to-[#18120E]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18)_0%,transparent_70%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Centered Transparent Golden Logo */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mb-6">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
            <img
              src="/logo-transparent.png"
              alt="Shyam Mangaram Foundation Sacred Emblem"
              className="relative w-full h-auto object-contain filter drop-shadow-[0_12px_30px_rgba(245,158,11,0.35)]"
            />
          </div>

          {/* Sanskrit Creed - Prominent & Enlarged */}
          <div className="sanskrit-text text-xl sm:text-3xl text-amber-300 font-bold mb-4 tracking-wide">
            ॥ सेवा ही हमारा धर्म है ॥
          </div>

          {/* Minimal Clean Purpose Statement */}
          <p className="text-sm sm:text-base md:text-lg text-[#FCF8F2]/85 font-light leading-relaxed max-w-2xl mb-8">
            Nourishing thousands through unbroken <strong className="text-amber-300 font-medium">Sunday Langad</strong> in Chembur, protecting street animals and cows as <strong className="text-amber-400 font-medium">living manifestations of God</strong>, and anchoring devotees in the divine grace of the <strong className="text-amber-300 font-medium">Black Hanuman Ji</strong> in Sindhudurg and our sanctuaries in <strong className="text-amber-300 font-medium">Goa</strong>.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#donate"
              className="w-full sm:w-auto saffron-btn-gradient text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
            >
              <Heart size={16} className="fill-white" />
              <span>Sponsor Food &amp; Animal Seva</span>
            </a>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto bg-[#261C16]/80 hover:bg-[#32251D] border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3.5 rounded-full flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Play size={14} className="fill-amber-300 text-amber-300" />
              <span>Watch Temple Darshan</span>
            </button>
          </div>
        </div>

        {/* Minimal Stats Row (PC & Mobile Optimized) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-14 pt-8 border-t border-amber-500/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="cinzel-heading text-2xl sm:text-3xl font-bold text-amber-300 mb-0.5">3,500+</div>
            <div className="text-[11px] uppercase tracking-wider text-[#FCF8F2]/60 font-medium">Meals Every Sunday</div>
          </div>
          <div>
            <div className="cinzel-heading text-2xl sm:text-3xl font-bold text-amber-400 mb-0.5">200+ Daily</div>
            <div className="text-[11px] uppercase tracking-wider text-[#FCF8F2]/60 font-medium">Street Dogs &amp; Cows Fed</div>
          </div>
          <div>
            <div className="cinzel-heading text-2xl sm:text-3xl font-bold text-amber-200 mb-0.5">3 Mandirs</div>
            <div className="text-[11px] uppercase tracking-wider text-[#FCF8F2]/60 font-medium">Mumbai, Sindhudurg, Goa</div>
          </div>
          <div>
            <div className="cinzel-heading text-2xl sm:text-3xl font-bold text-orange-400 mb-0.5">100% Satvik</div>
            <div className="text-[11px] uppercase tracking-wider text-[#FCF8F2]/60 font-medium">Pure Ghee Seva</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          4. SUNDAY LANGAD SEVA (MINIMAL & EDITORIAL)
          ------------------------------------------------------------------ */}
      <section id="langad" className="py-18 sm:py-24 px-4 sm:px-8 border-t border-amber-500/15 bg-[#1B1410]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="sanskrit-text text-sm sm:text-base text-amber-300 font-semibold block mb-2">
              ॥ अन्नदानं महादानम् ॥
            </span>
            <h2 className="cinzel-heading text-2xl sm:text-4xl font-bold text-white mb-3">
              Sunday Langad in Chembur
            </h2>
            <p className="text-xs sm:text-sm text-[#FCF8F2]/75 font-light leading-relaxed">
              Every Sunday morning, the Chembur temple opens its doors to feed over 3,500 people. Clean, hot, satvik meals served with dignity to all.
            </p>
          </div>

          {/* Minimal 3-Column Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="border border-amber-500/20 bg-[#221914] rounded-2xl p-6">
              <span className="text-amber-400 font-serif text-lg block mb-1">01.</span>
              <h3 className="text-base font-bold text-white mb-2">Pure Satvik Nutrition</h3>
              <p className="text-xs text-[#FCF8F2]/70 leading-relaxed font-light">
                Prepared with highest cleanliness, pure ghee, and fresh vegetables. Served hot with rice, dal, rotis, and holy halwa prasad.
              </p>
            </div>

            <div className="border border-amber-500/20 bg-[#221914] rounded-2xl p-6">
              <span className="text-amber-400 font-serif text-lg block mb-1">02.</span>
              <h3 className="text-base font-bold text-white mb-2">Dignity for Every Soul</h3>
              <p className="text-xs text-[#FCF8F2]/70 leading-relaxed font-light">
                Devotees, children, senior citizens, and migrant laborers sit side by side as one human family under the benevolence of God.
              </p>
            </div>

            <div className="border border-amber-500/20 bg-[#221914] rounded-2xl p-6">
              <span className="text-amber-400 font-serif text-lg block mb-1">03.</span>
              <h3 className="text-base font-bold text-white mb-2">Unbroken 52 Weeks</h3>
              <p className="text-xs text-[#FCF8F2]/70 leading-relaxed font-light">
                Rain, storms, or summer heat — the cauldrons are lit every Sunday without a single missed week over the years.
              </p>
            </div>
          </div>

          {/* Minimal Callout Banner */}
          <div className="border border-amber-500/30 bg-[#261D17] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <div className="cinzel-heading text-lg sm:text-xl font-bold text-white mb-1">
                Just ₹501 Feeds 10 Devotees This Sunday
              </div>
              <p className="text-xs text-[#FCF8F2]/70 font-light max-w-xl">
                Your contribution directly purchases grains, lentils, fresh produce, and ghee for the Sunday Langad feast.
              </p>
            </div>
            <a
              href="#donate"
              className="saffron-btn-gradient text-white text-xs uppercase font-bold tracking-wider px-6 py-3 rounded-full shrink-0 shadow-md hover:scale-105 transition-transform"
            >
              Sponsor Meals
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          5. ANIMAL SEVA (MINIMAL EDITORIAL & ENLARGED SANSKRIT)
          ------------------------------------------------------------------ */}
      <section id="animals" className="py-18 sm:py-24 px-4 sm:px-8 border-t border-amber-500/15 bg-[#17110D]">
        <div className="max-w-5xl mx-auto">
          {/* Section Header with Enlarged Sanskrit */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="sanskrit-text text-xl sm:text-3xl text-amber-300 font-bold block mb-2">
              ॥ जीव सेवा ही शिव सेवा ॥
            </span>
            <div className="sanskrit-text text-base sm:text-xl text-amber-200/90 italic mb-4">
              “ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति”
            </div>
            <h2 className="cinzel-heading text-2xl sm:text-4xl font-bold text-white mb-3">
              Feeding Animals As God
            </h2>
            <p className="text-xs sm:text-sm text-[#FCF8F2]/75 font-light leading-relaxed">
              A human being can speak, weep, or ask for bread. But a shivering stray dog, an abandoned cow, or a thirsty bird suffers in complete silence. In Sanatan Dharma, serving them is direct worship of the Supreme Divine.
            </p>
          </div>

          {/* Narrative & Story Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12 border border-amber-500/20 bg-[#211813] rounded-3xl p-6 sm:p-10">
            <div className="space-y-4 text-xs sm:text-sm text-[#FCF8F2]/80 font-light leading-relaxed">
              <h3 className="cinzel-heading text-lg sm:text-xl font-bold text-amber-200">
                The Voiceless Deities
              </h3>
              <p>
                Lord Shiva is <strong className="text-amber-300 font-medium">Pashupatinath</strong> — protector of all animals. Lord Bhairava rides with the dog. Lord Krishna plays his flute among gentle cows. And Lord Hanuman&apos;s loyal vanaras embody divine devotion.
              </p>
              <p>
                When Yudhishthira reached Heaven in the Mahabharata, he refused to enter without his street dog companion, declaring that abandoning a creature who trusts you unconditionally is the gravest sin on Earth. The dog was Dharma Himself.
              </p>
              <div className="sanskrit-text text-sm sm:text-base text-amber-300 italic pt-1">
                “सिया राममय सब जग जानी, करहुं प्रनाम जोरि जुग पानी”
              </div>
            </div>

            <div className="border border-amber-500/30 bg-[#1A120E] rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto">
                <Dog size={24} />
              </div>
              <h4 className="cinzel-heading text-base font-bold text-white">Daily Animal Seva Pledge</h4>
              <p className="text-xs text-[#FCF8F2]/70 leading-relaxed font-light">
                Every dawn, volunteers prepare warm satvik khichdi, milk, and rotis for 200+ street dogs, care for cows with fresh green grass and jaggery, and replenish clay water pots for birds across Chembur and coastal mandirs.
              </p>
              <a
                href="#donate"
                onClick={() => setSelectedCategory("animals")}
                className="saffron-btn-gradient text-white text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full inline-block hover:scale-105 transition-transform"
              >
                Sponsor Animal Seva
              </a>
            </div>
          </div>

          {/* Minimal 4-Pillar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="border border-amber-500/20 bg-[#1F1712] rounded-xl p-5">
              <div className="sanskrit-text text-base font-bold text-amber-300 mb-1">गौ माता सेवा</div>
              <div className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider mb-2">Kamadhenu Swaroop</div>
              <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed">
                Daily fresh green fodder, jaggery (gud), clean water, and medical care for aged and injured cows.
              </p>
            </div>

            <div className="border border-amber-500/20 bg-[#1F1712] rounded-xl p-5">
              <div className="sanskrit-text text-base font-bold text-amber-300 mb-1">श्वान सेवा</div>
              <div className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider mb-2">Bhairava Swaroop</div>
              <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed">
                200+ street dogs fed daily with warm khichdi, milk &amp; soft rotis; wound dressing &amp; reflective night collars.
              </p>
            </div>

            <div className="border border-amber-500/20 bg-[#1F1712] rounded-xl p-5">
              <div className="sanskrit-text text-base font-bold text-amber-300 mb-1">पक्षी सेवा</div>
              <div className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider mb-2">Pakshi Narayana</div>
              <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed">
                Clay water bowls installed on trees and terraces to protect birds from heat; daily morning millets &amp; grains.
              </p>
            </div>

            <div className="border border-amber-500/20 bg-[#1F1712] rounded-xl p-5">
              <div className="sanskrit-text text-base font-bold text-amber-300 mb-1">वानर सेवा</div>
              <div className="text-[10px] uppercase font-bold text-amber-400/80 tracking-wider mb-2">Hanuman Sena</div>
              <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed">
                Fresh bananas, seasonal fruits, and clean food provided to resident monkey troops and sanctuary creatures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          6. BLACK HANUMAN JI IN SINDHUDURG (NO KRISHNA SHILA MENTION)
          ------------------------------------------------------------------ */}
      <section id="hanumanji" className="py-18 sm:py-24 px-4 sm:px-8 border-t border-amber-500/15 bg-[#1B1410]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Real Black Hanuman Ji Idol Photo */}
            <div className="relative border border-amber-500/30 bg-[#231A14] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-amber-400/50 mb-5 shadow-xl">
                <img
                  src="/black-hanuman-closeup.webp"
                  alt="Black Hanuman Ji Idol Sindhudurg"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] uppercase font-bold tracking-wider text-amber-200 bg-black/60 backdrop-blur-sm py-0.5 px-2 rounded-full border border-amber-400/30">
                  Sindhudurg Darshan
                </span>
              </div>

              <div className="sanskrit-text text-base sm:text-lg text-amber-200 italic mb-2">
                “मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्”
              </div>
              <div className="text-xs text-[#FCF8F2]/70 font-light">
                Special Tuesday &amp; Saturday Chola &amp; Sindoor Pujas
              </div>
            </div>

            {/* Narrative - Clean & Authentic (Without Krishna Shila Point) */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Sindhudurg Coastal Sanctuary
              </span>
              <h2 className="cinzel-heading text-2xl sm:text-4xl font-bold text-white">
                The Sacred Black Hanuman Ji
              </h2>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/80 leading-relaxed font-light">
                Nestled in the historic coastal district of Sindhudurg, this sacred sanctuary hosts the miraculous murti of Lord Hanuman. Radiating immense peace and protection, the shrine is revered across Maharashtra and Goa.
              </p>
              <p className="text-xs sm:text-sm text-[#FCF8F2]/80 leading-relaxed font-light">
                Devotees visit to seek courage, focus, and blessings for peace and obstacle removal. The foundation maintains daily Vedic aartis, Akhand Jyot, and traditional prasad distributions here.
              </p>

              <div className="pt-2 flex flex-wrap gap-6 text-xs text-amber-300/90 font-medium">
                <div>
                  <span className="block text-[10px] uppercase text-[#FCF8F2]/50">Morning Darshan</span>
                  6:00 AM – 12:30 PM
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-[#FCF8F2]/50">Evening Aarti</span>
                  5:30 PM – 9:00 PM
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#donate"
                  className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-amber-300 hover:text-white underline"
                >
                  <span>Sponsor Sindoor &amp; Chola Seva</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          7. MINIMAL MANDIRS GALLERY
          ------------------------------------------------------------------ */}
      <section id="mandirs" className="py-18 sm:py-24 px-4 sm:px-8 border-t border-amber-500/15 bg-[#17110D]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="sanskrit-text text-sm sm:text-base text-amber-300 block mb-1">
              ॥ पवित्र धाम ॥
            </span>
            <h2 className="cinzel-heading text-2xl sm:text-4xl font-bold text-white mb-2">
              Our Temples
            </h2>
            <p className="text-xs sm:text-sm text-[#FCF8F2]/70 font-light">
              Spiritual sanctuaries in Chembur, Sindhudurg, and Goa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chembur */}
            <div className="border border-amber-500/20 bg-[#1F1712] rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src="/shiva-darshan.webp"
                    alt="Chembur Mandir"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    Chembur, Mumbai
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5">Chembur Mandir</h3>
                  <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed mb-4">
                    Home of Sunday Langad and animal seva kitchen. Devotees gather for morning Hanuman Chalisa and food distribution.
                  </p>
                  <div className="text-[11px] text-[#FCF8F2]/60 space-y-1">
                    <div className="flex items-center gap-1.5"><MapPin size={12} className="text-amber-400" /> Chembur East, Mumbai</div>
                    <div className="flex items-center gap-1.5"><Clock size={12} className="text-amber-400" /> Sunday Langad: 11:30 AM</div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="#donate" className="block text-center text-xs uppercase font-bold tracking-wider text-amber-300 hover:text-white py-2 border border-amber-500/30 rounded-xl">
                  Sponsor Feast
                </a>
              </div>
            </div>

            {/* Sindhudurg */}
            <div className="border border-amber-500/30 bg-[#221914] rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src="/black-hanuman-ji.webp"
                    alt="Sindhudurg Mandir"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221914] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    Sindhudurg Coastal Sanctuary
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5">Sindhudurg Mandir</h3>
                  <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed mb-4">
                    Sanctuary of the miraculous Black Hanuman Ji idol. Known across the Konkan belt for courage, stillness, and blessings.
                  </p>
                  <div className="text-[11px] text-[#FCF8F2]/60 space-y-1">
                    <div className="flex items-center gap-1.5"><MapPin size={12} className="text-amber-400" /> Sindhudurg Coast, Maharashtra</div>
                    <div className="flex items-center gap-1.5"><Clock size={12} className="text-amber-400" /> Special Puja: Tue &amp; Sat</div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="#donate" className="block text-center text-xs uppercase font-bold tracking-wider text-white py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
                  Sindhudurg Seva
                </a>
              </div>
            </div>

            {/* Goa */}
            <div className="border border-amber-500/20 bg-[#1F1712] rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 overflow-hidden">
                  <img
                    src="/shiva-darshan.webp"
                    alt="Goa Mandir"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1712] via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    Goa Retreat
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5">Goa Mandir</h3>
                  <p className="text-xs text-[#FCF8F2]/70 font-light leading-relaxed mb-4">
                    A serene tropical sanctuary offering daily prayers, holy chants, and shelter for visiting sadhus, pilgrims, and animal companions.
                  </p>
                  <div className="text-[11px] text-[#FCF8F2]/60 space-y-1">
                    <div className="flex items-center gap-1.5"><MapPin size={12} className="text-amber-400" /> Goa Temple Campus</div>
                    <div className="flex items-center gap-1.5"><Clock size={12} className="text-amber-400" /> Daily Aarti: 7:00 AM &amp; 7:30 PM</div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <a href="#donate" className="block text-center text-xs uppercase font-bold tracking-wider text-amber-300 hover:text-white py-2 border border-amber-500/30 rounded-xl">
                  Goa Mandir Seva
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          8. DONATION SUITE (MINIMAL, RESPONSIVE & MOBILE-OPTIMIZED)
          ------------------------------------------------------------------ */}
      <section id="donate" className="py-18 sm:py-24 px-4 sm:px-8 border-t border-amber-500/20 bg-[#1B1410]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="sanskrit-text text-sm sm:text-base text-amber-300 block mb-1">
              ॥ पवित्र सहयोग ॥
            </span>
            <h2 className="cinzel-heading text-2xl sm:text-4xl font-bold text-white mb-2">
              Make Your Sacred Donation
            </h2>
            <p className="text-xs sm:text-sm text-[#FCF8F2]/70 font-light">
              Scan with Google Pay, PhonePe, Paytm, BHIM or transfer via SBI Bank.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Seva Selection */}
            <div className="lg:col-span-7 border border-amber-500/25 bg-[#211813] rounded-3xl p-6 sm:p-8">
              {/* Category Segmented Control */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-white">Select Seva</span>
                <div className="flex items-center gap-1 bg-[#17110D] p-1 rounded-xl border border-amber-500/20">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      selectedCategory === "all" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedCategory("langad")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      selectedCategory === "langad" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Langad
                  </button>
                  <button
                    onClick={() => setSelectedCategory("animals")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      selectedCategory === "animals" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Animals
                  </button>
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[380px] overflow-y-auto pr-1">
                {filteredTiers.map((tier) => {
                  const isSelected = !isCustom && selectedAmount === tier.amount;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => {
                        setSelectedAmount(tier.amount);
                        setIsCustom(false);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/20 border-amber-400 text-white"
                          : "bg-[#1A120E] border-amber-500/20 hover:border-amber-400/40 text-white/80"
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-bold text-white text-base">
                          ₹{tier.amount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold">
                          {tier.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#FCF8F2]/70 leading-snug">
                        {tier.impact}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <label className="text-[11px] uppercase font-semibold tracking-wider text-amber-300 block mb-1.5">
                  Or Custom Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-400">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setIsCustom(true);
                    }}
                    onFocus={() => setIsCustom(true)}
                    className="w-full bg-[#18110D] border border-amber-500/30 focus:border-amber-300 rounded-xl py-2.5 pl-8 pr-3 text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Donor Details Accordion/Form */}
              <div className="pt-4 border-t border-amber-500/20">
                {donationSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-400/50 rounded-xl p-3 text-emerald-200 text-xs flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>Receipt details saved for <strong>{donorForm.name}</strong>. Thank you!</span>
                  </div>
                ) : (
                  <form onSubmit={handleDonorSubmit} className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={donorForm.name}
                        onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                        className="bg-[#18110D] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:border-amber-300 focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp (for Receipt)"
                        value={donorForm.phone}
                        onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                        className="bg-[#18110D] border border-amber-500/25 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:border-amber-300 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-[11px] uppercase font-bold tracking-wider py-2 rounded-xl transition-all"
                    >
                      Save Receipt Info
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Cols: Payment QR & Details */}
            <div className="lg:col-span-5 border border-amber-500/25 bg-[#211813] rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center">
              {/* Payment Method Switcher */}
              <div className="flex w-full bg-[#17110D] p-1 rounded-xl border border-amber-500/20 mb-5">
                <button
                  onClick={() => setActiveTab("upi")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === "upi" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  UPI QR Code
                </button>
                <button
                  onClick={() => setActiveTab("bank")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === "bank" ? "bg-amber-500 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  Bank Wire
                </button>
              </div>

              {activeTab === "upi" ? (
                <div className="w-full flex flex-col items-center">
                  <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
                    Selected Contribution
                  </div>
                  <div className="cinzel-heading text-2xl font-bold text-white mb-4">
                    ₹{effectiveAmount ? effectiveAmount.toLocaleString("en-IN") : "Any Amount"}
                  </div>

                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border-2 border-amber-400/40 mb-4">
                    <img
                      src={qrCodeUrl}
                      alt="Donation UPI QR Code"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg"
                    />
                  </div>

                  <p className="text-[11px] text-[#FCF8F2]/70 mb-4 max-w-xs leading-relaxed">
                    Scan with <strong>Google Pay, PhonePe, Paytm, BHIM</strong> or any UPI bank app.
                  </p>

                  <div className="w-full bg-[#18110D] border border-amber-500/25 rounded-xl p-2.5 flex items-center justify-between gap-2 mb-3">
                    <div className="text-left truncate">
                      <span className="text-[9px] uppercase font-bold text-amber-300 block">Trust UPI ID</span>
                      <span className="text-xs font-mono text-white truncate block">{UPI_ID}</span>
                    </div>
                    <button
                      onClick={handleCopyUPI}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                    >
                      {copiedUPI ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                      <span>{copiedUPI ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Direct Mobile Pay CTA */}
                  <a
                    href={upiDeepLink}
                    className="w-full saffron-btn-gradient text-white text-xs uppercase font-bold tracking-wider py-3 rounded-full flex items-center justify-center gap-2 sm:hidden"
                  >
                    <QrCode size={14} /> Pay ₹{effectiveAmount || ""} via UPI App
                  </a>
                </div>
              ) : (
                /* Bank Wire View */
                <div className="w-full text-left space-y-2 text-xs">
                  <div className="bg-[#18110D] border border-amber-500/25 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">Beneficiary</span>
                    <span className="font-semibold text-white">Shyam Mangaram Foundation</span>
                  </div>
                  <div className="bg-[#18110D] border border-amber-500/25 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">Bank &amp; Branch</span>
                    <span className="font-semibold text-white">State Bank of India (SBI), Chembur, Mumbai</span>
                  </div>
                  <div className="bg-[#18110D] border border-amber-500/25 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">Account Number</span>
                      <span className="font-mono font-semibold text-white">418902847192</span>
                    </div>
                    <button onClick={() => handleCopyBankDetail("418902847192", "acc")} className="text-amber-300 p-1">
                      {copiedBank === "acc" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="bg-[#18110D] border border-amber-500/25 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">IFSC Code</span>
                      <span className="font-mono font-semibold text-white">SBIN0000523</span>
                    </div>
                    <button onClick={() => handleCopyBankDetail("SBIN0000523", "ifsc")} className="text-amber-300 p-1">
                      {copiedBank === "ifsc" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              )}

              {/* 100% Trust Guarantee */}
              <div className="border border-amber-500/20 bg-[#18110D] rounded-xl p-3 flex items-center gap-2.5 mt-5 w-full text-left">
                <ShieldCheck size={20} className="text-amber-400 shrink-0" />
                <p className="text-[10px] text-[#FCF8F2]/70 leading-snug">
                  100% of contributions are strictly utilized for Anna Daan, street animal nourishment, and mandir maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          9. VOLUNTEER & CONTACT
          ------------------------------------------------------------------ */}
      <section id="contact" className="py-16 px-4 sm:px-8 border-t border-amber-500/15 bg-[#17110D] text-center">
        <div className="max-w-3xl mx-auto">
          <span className="sanskrit-text text-sm sm:text-base text-amber-300 block mb-1">
            ॥ सेवा में जुड़ें ॥
          </span>
          <h2 className="cinzel-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Join the Sunday Seva Team
          </h2>
          <p className="text-xs sm:text-sm text-[#FCF8F2]/75 font-light leading-relaxed max-w-xl mx-auto mb-8">
            Volunteers assist with vegetable chopping, cooking, serving devotees, and street animal feeding every Sunday morning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="https://wa.me/919820000000?text=Jai%20Shree%20Ram!%20I%20want%20to%20volunteer%20for%20the%20Sunday%20Langad%20and%20Animal%20Seva."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Phone size={14} /> Connect on WhatsApp
            </a>
            <a
              href="#donate"
              className="w-full sm:w-auto saffron-btn-gradient text-white font-bold text-xs uppercase tracking-wider px-7 py-3 rounded-full flex items-center justify-center gap-2 shadow-md"
            >
              <Heart size={14} className="fill-white" /> Support With Donation
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          10. FOOTER WITH MAIN LOGO & SANSKRIT BLESSING
          ------------------------------------------------------------------ */}
      <footer className="border-t border-amber-500/20 bg-[#120D0A] py-10 px-4 sm:px-8 text-xs text-[#FCF8F2]/60">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/50 bg-[#C04403] p-0.5 shrink-0 shadow">
              <img
                src="/logo-original.png"
                alt="Shyam Mangaram Foundation Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="cinzel-heading font-bold text-white text-sm">
                Shyam Mangaram Foundation
              </div>
              <div className="sanskrit-text text-amber-300 text-xs">
                सेवा ही हमारा धर्म है
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-amber-200/80">
            <a href="#langad" className="hover:text-white transition-colors">Sunday Langad</a>
            <a href="#animals" className="hover:text-white transition-colors text-amber-300 font-semibold">Animal Seva</a>
            <a href="#hanumanji" className="hover:text-white transition-colors">Black Hanuman Ji</a>
            <a href="#mandirs" className="hover:text-white transition-colors">Temples</a>
            <a href="#donate" className="hover:text-white transition-colors text-amber-300 font-semibold">Donate</a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FCF8F2]/40 gap-2 text-center">
          <p>© {new Date().getFullYear()} Shyam Mangaram Foundation. All rights reserved.</p>
          <p className="sanskrit-text text-amber-300/80 text-xs sm:text-sm font-semibold">
            ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
          </p>
        </div>
      </footer>

      {/* ------------------------------------------------------------------
          11. VIDEO MODAL
          ------------------------------------------------------------------ */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#1F1712] border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-amber-500/25 bg-black/40">
              <span className="sanskrit-text text-sm sm:text-base font-bold text-amber-300">
                ॥ मन्दिर दर्शन एवं लंगर सेवा ॥
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster="/black-hanuman-ji.webp"
              >
                <source src="/mandir-darshan.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4 bg-black/60 text-center">
              <a
                href="#donate"
                onClick={() => setIsVideoModalOpen(false)}
                className="saffron-btn-gradient text-white text-xs uppercase font-bold tracking-wider px-6 py-2.5 rounded-full inline-flex items-center gap-2 shadow"
              >
                <Heart size={14} className="fill-white" />
                <span>Sponsor Sunday Langad Seva</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
