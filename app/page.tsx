"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Lenis from "lenis";
import {
  Layers,
  Building,
  ArrowUpDown,
  Grid,
  Grid3X3,
  Brush,
  Palette,
  DoorOpen,
  Maximize,
  Wind,
  Utensils,
  Bath,
  Zap,
  ShieldCheck,
  Video,
  Camera,
  PhoneCall,
  PlugZap,
  Flame,
  Sun,
  Dumbbell,
  Trees,
} from "lucide-react";

// Image Asset Definitions
const HERO_IMAGE = "/assets/unnatii-banner.webp";
const ENQUIRE_BG_IMAGE = "/assets/terrace-garden.webp";
const BRAND_LOGO = "/assets/krishna-group-logo.svg";

const GALLERY_IMAGES = [
  {
    src: "/assets/living-area.jpg",
    label: "Living Area",
  },
  {
    src: "/assets/bedroom.webp",
    label: "Bed Room",
  },
  {
    src: "/assets/kitchen.webp",
    label: "Kitchen",
  },
  {
    src: "/assets/lobby-1.webp",
    label: "Lobby",
  },
  {
    src: "/assets/bathroom.webp",
    label: "Bath Room",
  },
  {
    src: "/assets/balcony.webp",
    label: "Balcony",
  },
  {
    src: "/assets/terrace-garden.webp",
    label: "Terrace Garden",
  },
];

const FLOOR_PLAN_LABELS = [
  "Stilt Plan",
  "Typical Floor Plan",
  "Typical Plan Unit A",
  "Typical Plan Unit B",
  "Terrace Plan",
];

const FLOOR_PLAN_IMAGES = [
  "/assets/stilt-plan.webp",
  "/assets/typical-floor-plan.webp",
  "/assets/unit-a-plan.png",
  "/assets/unit-b-plan.png",
  "/assets/terrace-plan.webp",
];

const KEY_HIGHLIGHTS = [
  {
    title: "Foundation",
    body: "Pile foundation shall be as per structural drawing.",
    icon: Layers,
  },
  {
    title: "Structure",
    body: "R.C.C Framed Structure.",
    icon: Building,
  },
  {
    title: "Ceiling Height",
    body: "False Ceiling with light fixtures. 10′ 6″ Floor to ceiling Clear height (without false ceiling).",
    icon: ArrowUpDown,
  },
  {
    title: "Walls",
    body: "External Walls in Cement Blocks. Partition Walls in Cement Blocks.",
    icon: Grid,
  },
  {
    title: "Flooring",
    body: "Marble Flooring in Living & Dining. 4 X 4 Vitrified Tiles for Flooring in all Bedrooms & Kitchen. Anti-Skid tiles in Restrooms & Balcony.",
    icon: Grid3X3,
  },
  {
    title: "Plastering",
    body: "Internal walls are plastered in gypsum. External walls are plastered in cement mortar.",
    icon: Brush,
  },
  {
    title: "Painting",
    body: "Interiors: Emulsion premium paint with two coat asian / berger / dulux putty. Exteriors: Texture with asian / berger / dulux putty paint.",
    icon: Palette,
  },
  {
    title: "Doors",
    body: "Engineered wooden door frame and shutter with teak wood veneer finish for main door. Engineered wood veneer / ABS frame & shutter for bedrooms and restrooms.",
    icon: DoorOpen,
  },
  {
    title: "Windows",
    body: "UPVC with Sliding / openable glass shutters and MS grill as per the architect’s design.",
    icon: Maximize,
  },
  {
    title: "Balcony",
    body: "Glass fitted UPVC french doors.",
    icon: Wind,
  },
  {
    title: "Kitchen & Utility Area",
    body: "2′ Wall dado vitrified tiles above the kitchen platform. Provision for water purifying system in kitchen. Provision for washing machine, sink and tap in utility.",
    icon: Utensils,
  },
  {
    title: "Restrooms",
    body: "Vitrified wall tiles up to false ceiling height. Kohler / Toto / Roca or equivalent wall mounted closets, wash basins, diverters & CP fittings. Shower partition in master restroom.",
    icon: Bath,
  },
  {
    title: "Electrical",
    body: "100% Power Backup. VRV A/C in Living, Dining and all Bedrooms. Three Phase Power Supply with fully concealed wiring & modular switches. Provision for geyser, exhaust fan & chimney.",
    icon: Zap,
  },
];

const COMMUNITY_PERKS = [
  "Common Area Flooring – Granite / Designer Tiles / Kota Stone",
  "100% Power Back up",
  "Paver Blocks for driveways",
  "Anti-Termite Treatment",
  "Common Toilet for Drivers / Maids",
  "Video Door Phone, Security System with Access Cards",
  "Provision for DTH",
  "CCTV Camera to Monitor",
  "Intercom Connection to the security",
  "1 - Passenger Lift",
  "EV Charging Provisions",
  "Reticulated Gas Supply",
  "Solar lighting for common areas.",
  "Yoga Deck",
  "Landscape Terrace",
];

const COMMUNITY_PERK_ICONS = [
  Grid3X3,
  Zap,
  Grid,
  ShieldCheck,
  Bath,
  Video,
  Maximize,
  Camera,
  PhoneCall,
  ArrowUpDown,
  PlugZap,
  Flame,
  Sun,
  Dumbbell,
  Trees,
];

const LOCATION_HIGHLIGHTS = [
  {
    group: "Education",
    items: [
      ["MCTM Chidambaram International", "650 m"],
      ["Justice Basher Ahmed College", "1.0 km"],
      ["Time Kids School", "1.3 km"],
      ["Stella Maris College", "2.1 km"],
    ],
  },
  {
    group: "Healthcare",
    items: [
      ["Kauvery Hospital", "450 m"],
      ["Apollo Dental", "1.2 km"],
    ],
  },
  {
    group: "Transport",
    items: [
      ["Teynampet Metro", "1.4 km"],
      ["AGDMS Metro", "1.4 km"],
    ],
  },
  {
    group: "Leisure",
    items: [
      ["Sai Baba Temple", "1.9 km"],
      ["Semmozhi Poonga", "2.4 km"],
      ["AGS Cinemas", "3.2 km"],
    ],
  },
];

export default function Home() {
  const router = useRouter();
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedLocationCategory, setExpandedLocationCategory] = useState(
    LOCATION_HIGHLIGHTS[0].group,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // Scroll event listener for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Lenis smooth scrolling with bidirectional anchor navigation
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        const targetId = anchor.getAttribute("href");
        if (targetId) {
          if (targetId === "#") {
            e.preventDefault();
            lenis.scrollTo(0);
          } else {
            const targetEl = document.querySelector(targetId) as HTMLElement;
            if (targetEl) {
              e.preventDefault();
              lenis.scrollTo(targetEl);
              setIsMobileMenuOpen(false);
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Intersection Observer for bidirectional reveal scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          } else {
            entry.target.classList.remove("reveal-active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "-20px 0px -20px 0px",
      },
    );

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleEnquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/thank-you");
  };

  const handleBrochureSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBrochureModalOpen(false);
    window.open(
      "https://krishnagroup.com/wp-content/uploads/2026/01/unnatii-brochure.pdf",
      "_blank",
    );
    router.push("/thank-you");
  };

  return (
    <div className="bg-background text-foreground">
      {/* Header Section */}
      <header
        className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-paper/95 py-4 text-ink shadow-sm backdrop-blur-md border-b border-border"
            : "bg-ink/20 py-7 text-paper backdrop-blur-[2px]"
        }`}
      >
        <div className="container-editorial grid grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            className="z-50 flex items-center gap-4 leading-none md:gap-5"
            aria-label="Krishna Group Unnati home"
          >
            <Image
              src={BRAND_LOGO}
              alt="Krishna Group logo"
              width={132}
              height={48}
              className={`h-14 w-auto transition-all duration-300 md:h-[62px] ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
              priority
            />
            <span
              className={`hidden h-10 w-px md:block ${
                isScrolled ? "bg-ink/25" : "bg-paper/35"
              }`}
            />
            <span className="hidden flex-col md:flex">
              <span className="font-display text-[2rem] font-medium uppercase leading-none tracking-[0.04em]">
                UNNATI
              </span>
              <span className="mt-3 text-[0.7rem] font-semibold uppercase leading-none tracking-[0.42em] opacity-70">
                Krishna Group - Est. 1983
              </span>
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav
            className={`hidden items-center gap-9 text-sm font-semibold transition-colors duration-300 md:flex ${
              isScrolled ? "text-ink/80" : "text-paper/90"
            }`}
          >
            <Link
              href="#overview"
              className="nav-link-minimal hover:text-current transition-colors"
            >
              Overview
            </Link>
            <Link
              href="#gallery"
              className="nav-link-minimal hover:text-current transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="#plans"
              className="nav-link-minimal hover:text-current transition-colors"
            >
              Floor Plans
            </Link>
            <Link
              href="#specs"
              className="nav-link-minimal hover:text-current transition-colors"
            >
              Specifications
            </Link>
            <Link
              href="#location"
              className="nav-link-minimal hover:text-current transition-colors"
            >
              Location
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setIsBrochureModalOpen(true)}
            className={`hidden justify-self-end border px-7 py-3.5 text-xs font-bold uppercase tracking-[0.36em] transition-colors md:inline-flex ${
              isScrolled
                ? "border-ink/40 text-ink hover:bg-ink hover:text-paper"
                : "border-paper/70 text-paper hover:bg-paper hover:text-ink"
            }`}
          >
            ENQUIRE
          </button>
          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${
                isScrolled && !isMobileMenuOpen ? "bg-ink" : "bg-paper"
              } ${isMobileMenuOpen ? "translate-y-2 rotate-45 bg-paper" : ""}`}
            />
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${
                isScrolled && !isMobileMenuOpen ? "bg-ink" : "bg-paper"
              } ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${
                isScrolled && !isMobileMenuOpen ? "bg-ink" : "bg-paper"
              } ${isMobileMenuOpen ? "-translate-y-2 -rotate-45 bg-paper" : ""}`}
            />
          </button>
        </div>
        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-ink/95 backdrop-blur-lg transition-all duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 text-xl text-paper/90 font-medium">
            <Link
              href="#overview"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Overview
            </Link>
            <Link
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Gallery
            </Link>
            <Link
              href="#plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Floor Plans
            </Link>
            <Link
              href="#specs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Specifications
            </Link>
            <Link
              href="#location"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Location
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBrochureModalOpen(true);
              }}
              className="mt-4 border border-paper/40 text-paper text-xs uppercase tracking-[0.24em] px-8 py-3.5 hover:bg-paper hover:text-ink transition-colors font-semibold"
            >
              Enquire Now
            </button>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative min-h-[520px] w-full overflow-hidden bg-ink md:aspect-[128/89] md:min-h-0">
        <Image
          src={HERO_IMAGE}
          alt="Krishna Unnati building exterior elevation"
          fill
          priority
          sizes="70vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative z-10 container-editorial flex min-h-[520px] flex-col justify-end pb-16 md:absolute md:inset-0 md:min-h-0 md:pb-10">
          <div className="animate-fade-up max-w-2xl text-paper">
            <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
              <span className="rule" />
              Now Unveiling · Alwarpet, Chennai
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05] tracking-tight">
              A rare urban
              <br />
              <span className="text-gold font-light italic">retreat</span> for
              the
              <br />
              discerning few.
            </h1>
            <p className="mt-5 max-w-xl text-paper/85 text-sm md:text-base leading-relaxed font-sans font-light">
              Krishna Unnati is a boutique residence of just five premium 3 BHK
              homes -each 2,082 sq.ft -designed for those who value privacy,
              comfort and a prime Chennai address.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsBrochureModalOpen(true)}
                className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-gold transition-colors font-semibold"
              >
                Enquire Now
              </button>
              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="inline-flex items-center gap-2 border border-paper/50 text-paper px-6 py-3.5 text-xs uppercase tracking-[0.24em] hover:bg-paper hover:text-ink transition-colors font-semibold cursor-pointer"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-paper/15 backdrop-blur-sm bg-ink/50">
          <div className="container-editorial grid grid-cols-3 divide-x divide-paper/15 text-paper">
            {[
              ["07", "Total Units"],
              ["2,082", "Sq.ft each"],
              ["3 BHK", "Configuration"],
            ].map(([val, desc]) => (
              <div key={desc} className="py-3 px-2 text-center">
                <div className="font-display text-2xl md:text-3xl text-gold">
                  {val}
                </div>
                <div className="text-[9px] uppercase tracking-[0.24em] text-paper/70 mt-0.5 font-semibold">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Address Overview Section */}
      <section id="overview" className="py-16 md:py-24 reveal-on-scroll">
        <div className="container-editorial grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5 reveal-child">
            <p className="eyebrow">
              <span className="rule" />
              The Address
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl leading-tight">
              An address that carries
              <br />
              the weight of Alwarpet.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-muted-foreground leading-relaxed md:pt-4 font-sans font-light reveal-child reveal-delay-150">
            <p className="text-lg text-foreground font-normal">
              Tucked into one of Chennai&apos;s most storied neighbourhoods,
              Unnati is a quiet answer to the city&apos;s noise -homes shaped by
              daylight, marble and considered detail.
            </p>
            <p>
              Every residence is designed for smart, sustainable living:
              solar-lit common areas, full power back-up, EV charging, rainwater
              harvesting, CCTV, video door phones and intercom access.
            </p>
            <p>
              A serene terrace garden crowns Unnati, offering a private escape
              with skyline views -the kind of quiet luxury that Alwarpet was
              made for.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border mt-8">
              <StatItem label="Foundation" value="Pile" />
              <StatItem label="Structure" value="R.C.C" />
              <StatItem label="Clear Height" value="10′ 6″" />
            </div>
          </div>
        </div>
      </section>
      {/* Gallery Section */}
      <section
        id="gallery"
        className="bg-cream py-16 md:py-20 reveal-on-scroll"
      >
        <div className="container-editorial">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10 reveal-child">
            <div>
              <p className="eyebrow">
                <span className="rule" />
                Lifestyle in Frames
              </p>
              <h2 className="mt-6 text-4xl md:text-5xl">
                Interiors, in the light of Chennai.
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground font-sans font-light">
              Marble underfoot, teak at the threshold, floor-to-ceiling glass
              throughout. Every surface is chosen to age gracefully.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[240px] reveal-child reveal-delay-200">
            <GalleryImage
              src={GALLERY_IMAGES[0].src}
              label={GALLERY_IMAGES[0].label}
              className="col-span-6 md:col-span-4 row-span-2"
            />
            <GalleryImage
              src={GALLERY_IMAGES[1].src}
              label={GALLERY_IMAGES[1].label}
              className="col-span-3 md:col-span-2"
            />
            <GalleryImage
              src={GALLERY_IMAGES[2].src}
              label={GALLERY_IMAGES[2].label}
              className="col-span-3 md:col-span-2"
            />
            <GalleryImage
              src={GALLERY_IMAGES[3].src}
              label={GALLERY_IMAGES[3].label}
              className="col-span-3 md:col-span-2"
            />
            <GalleryImage
              src={GALLERY_IMAGES[4].src}
              label={GALLERY_IMAGES[4].label}
              className="col-span-3 md:col-span-2"
            />
            <GalleryImage
              src={GALLERY_IMAGES[5].src}
              label={GALLERY_IMAGES[5].label}
              className="col-span-3 md:col-span-2"
            />
            <GalleryImage
              src={GALLERY_IMAGES[6].src}
              label={GALLERY_IMAGES[6].label}
              className="col-span-6 row-span-2"
            />
          </div>
        </div>
      </section>
      {/* Community Perks Section */}
      <section className="py-16 md:py-20 reveal-on-scroll">
        <div className="container-editorial">
          <div className="grid md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-4 reveal-child">
              <div className="md:sticky md:top-32">
                <p className="eyebrow">
                  <span className="rule" />
                  Community Perks
                </p>
                <h2 className="mt-6 text-4xl md:text-5xl">
                  The comforts of a quiet building.
                </h2>
                <p className="mt-6 text-muted-foreground text-sm leading-relaxed font-sans font-light">
                  Every detail is carefully planned to offer privacy, security,
                  and modern convenience to the premium residences of Krishna
                  Unnati.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 reveal-child reveal-delay-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
                {COMMUNITY_PERKS.map((perk, idx) => {
                  const PerkIcon = COMMUNITY_PERK_ICONS[idx];
                  return (
                    <div
                      key={perk}
                      className="flex items-start gap-4 group border-b border-border/40 pb-6 hover:border-gold/40 transition-colors duration-300"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/30 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                        <PerkIcon className="h-5 w-5" />
                      </span>
                      <span className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans font-light group-hover:text-ink transition-colors duration-300">
                        {perk}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Floor Plans Section */}
      <section id="plans" className="py-16 md:py-20 reveal-on-scroll">
        <div className="container-editorial">
          <div className="text-center max-w-2xl mx-auto mb-10 reveal-child">
            <p className="eyebrow">
              <span className="rule" />
              Curated Floor Plans
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl">
              Every square foot, considered.
            </h2>
          </div>
          <div className="mx-auto mb-6 grid max-w-5xl grid-cols-1 gap-2 reveal-child reveal-delay-100 sm:grid-cols-2 lg:grid-cols-5 md:mb-8">
            {FLOOR_PLAN_LABELS.map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveFloorPlanIndex(idx)}
                className={`min-h-11 border px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] transition-colors ${
                  activeFloorPlanIndex === idx
                    ? "border-ink bg-ink text-paper"
                    : "border-border text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden border border-border bg-cream p-4 reveal-child reveal-delay-200 md:p-6">
            <div
              key={activeFloorPlanIndex}
              className="animate-fade-in w-full h-full flex items-center justify-center"
            >
              <FloorPlanImage variant={activeFloorPlanIndex} />
            </div>
            <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.24em] text-muted-foreground bg-paper/80 backdrop-blur px-3 py-1.5 font-semibold">
              {FLOOR_PLAN_LABELS[activeFloorPlanIndex]} · 2082 sq.ft
            </div>
          </div>
        </div>
      </section>
      {/* Specifications Section */}
      <section
        id="specs"
        className="bg-ink text-paper py-16 md:py-20 reveal-on-scroll"
      >
        <div className="container-editorial">
          <div className="grid md:grid-cols-12 gap-10 mb-10">
            <div className="md:col-span-5 reveal-child">
              <p className="eyebrow">
                <span className="rule" />
                Key Highlights
              </p>
              <h2 className="mt-6 text-4xl md:text-5xl text-paper">
                Built the way
                <br />
                quiet luxury asks to be built.
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-7 text-paper/70 leading-relaxed md:pt-6 font-sans font-light reveal-child reveal-delay-100">
              Materials from Kohler, Toto and Roca. Italian marble, engineered
              teak, UPVC glazing and VRV climate control -specified once and
              specified well.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 reveal-child reveal-delay-200">
            {KEY_HIGHLIGHTS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-ink p-8 hover:bg-ink/70 transition-all duration-300 group hover:shadow-[inset_0_0_0_1px_var(--gold)] flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gold font-display text-2xl">
                        {item.title}
                      </div>
                      <IconComponent className="h-6 w-6 text-gold/60 group-hover:text-gold transition-colors duration-300" />
                    </div>
                    <p className="text-paper/70 text-sm leading-relaxed font-sans font-light">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Location Highlights Section */}
      <section
        id="location"
        className="bg-cream py-16 md:py-20 reveal-on-scroll"
      >
        <div className="container-editorial grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 reveal-child">
            <p className="eyebrow">
              <span className="rule" />
              Location Highlights
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl">Alwarpet, on foot.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed font-sans font-light">
              Schools, hospitals, metro, temples, cinema -the essential city
              sits within a fifteen-minute drive, most of it within a walk.
            </p>
            <a
              href="https://www.google.com/maps/place/27Q3%2BR7V,+Chennai,+Tamil+Nadu,+India/@13.0396125,80.2531719?hl=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink border-b border-ink/40 pb-1 hover:border-gold hover:text-gold transition-colors mt-6 font-semibold"
            >
              View on Google Maps →
            </a>
            <div className="mt-10 aspect-square bg-background border border-border relative overflow-hidden group hover:border-gold transition-colors duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7725227763665!2d80.2505969758784!3d13.039612487282436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0xc9a9a9e7b1d9dacd!2s27Q3%2BR7V%2C%20Chennai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1716200000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
          <div className="md:col-span-7 space-y-4 md:pt-4 reveal-child reveal-delay-200">
            {LOCATION_HIGHLIGHTS.map((category) => {
              const isOpen = expandedLocationCategory === category.group;
              return (
                <div
                  key={category.group}
                  className={`border transition-all duration-300 ${
                    isOpen
                      ? "border-gold/50 bg-background shadow-sm"
                      : "border-border bg-background/70"
                  }`}
                >
                  <button
                    onClick={() => setExpandedLocationCategory(category.group)}
                    className="flex w-full cursor-pointer items-center justify-between p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-2xl text-foreground">
                      {category.group}
                    </span>
                    <span
                      className={`text-xs text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-180 opacity-100" : "opacity-70"
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-[500px] border-t border-border opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="divide-y divide-border bg-paper p-6">
                      {category.items.map(([place, dist]) => (
                        <div
                          key={place}
                          className="flex items-baseline justify-between py-3 font-sans"
                        >
                          <span className="text-foreground font-medium">
                            {place}
                          </span>
                          <span className="text-muted-foreground text-sm tracking-wide">
                            {dist}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Enquiry Form Section */}
      <section
        id="enquire"
        className="relative py-16 md:py-20 overflow-hidden reveal-on-scroll"
      >
        <Image
          src={ENQUIRE_BG_IMAGE}
          alt=""
          fill
          className="object-cover"
          aria-hidden={true}
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="relative container-editorial grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 text-paper reveal-child">
            <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
              <span className="rule" />
              Enquire
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl text-paper">
              A private viewing,
              <br />
              by appointment.
            </h2>
            <p className="mt-6 text-paper/70 leading-relaxed max-w-md font-sans font-light">
              7 homes. A single address. Reach us for the brochure, floor plans
              and pricing -we&apos;ll respond within one working day.
            </p>
            <div className="mt-10 space-y-3 text-paper/80 text-sm font-sans">
              <div className="font-semibold">Krishna Group · Est. 1983</div>
              <a href="tel:+919884408409" className="block hover:text-gold">
                +91 98844 08409
              </a>
              <a
                href="https://wa.me/917824001904"
                className="block hover:text-gold"
              >
                WhatsApp · +91 78240 01904
              </a>
              <div>28 Alwarpet, Chennai 600 018</div>
            </div>
          </div>
          <form
            onSubmit={handleEnquirySubmit}
            className="md:col-span-6 md:col-start-7 bg-paper text-ink p-8 md:p-12 space-y-5 reveal-child reveal-delay-200"
          >
            <InputField label="Name" name="name" />
            <InputField label="Phone Number" name="phone" type="tel" />
            <InputField label="Email" name="email" type="email" />
            <div className="hidden">
              <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-sans font-semibold">
                Message
              </label>
              <textarea
                name="msg"
                rows={4}
                className="w-full mt-2 border-b border-border bg-transparent py-2 focus:outline-none focus:border-brick resize-none font-sans"
                placeholder="I'd like to schedule a viewing…"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ink text-paper py-4 text-xs uppercase tracking-[0.28em] hover:bg-brick transition-colors font-semibold"
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full border-t border-paper/10 bg-ink py-8 pb-24 text-paper/60 md:pb-8">
        <div className="container-editorial grid items-center gap-6 text-center font-sans text-xs md:grid-cols-3">
          <Link
            href="/"
            className="inline-flex justify-center md:justify-start"
            aria-label="Krishna Group home"
          >
            <Image
              src={BRAND_LOGO}
              alt="Krishna Group logo"
              width={132}
              height={48}
              className="h-12 w-auto brightness-0 invert"
            />
          </Link>
          <div className="hidden">
            <div>
              <div className="font-display text-paper text-2xl tracking-wide font-normal">
                Krishna Unnati
              </div>
              <p className="text-[10px] text-paper/40 mt-1 uppercase tracking-[0.2em] font-sans">
                Premium Residences · Alwarpet, Chennai
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.24em] font-sans font-semibold text-paper/80">
              Krishna Group · Est. 1983
            </div>
          </div>

          <div className="contents">
            <div className="text-center text-paper/55">
              &copy; 2026 Krishna Group. All rights reserved.
            </div>
            <div className="hidden">
              © {new Date().getFullYear()} Krishna Group. All rights reserved.
            </div>

            <div className="flex items-center justify-center gap-2.5 text-[10px] uppercase tracking-[0.15em] md:justify-end">
              <span>Designed & Developed by</span>
              <a
                href="https://ayatiworks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity duration-300 inline-flex items-center"
              >
                <Image
                  src="/assets/ayatiworks-logo.svg"
                  alt="Ayatiworks"
                  width={96}
                  height={21}
                  className="h-4.5 w-auto brightness-0 invert"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Mobile Sticky Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden grid grid-cols-3 bg-ink text-paper text-xs uppercase tracking-[0.2em] font-sans font-semibold">
        <a
          href="tel:+919884408409"
          className="py-4 text-center border-r border-paper/10 hover:text-gold transition-colors"
        >
          Call
        </a>
        <button
          type="button"
          onClick={() => setIsBrochureModalOpen(true)}
          className="py-4 text-center border-r border-paper/10 bg-brick hover:bg-brick/90 text-white transition-colors"
        >
          Enquire
        </button>
        <a
          href="https://wa.me/917824001904"
          className="py-4 text-center hover:text-gold transition-colors"
        >
          WhatsApp
        </a>
      </div>
      {/* Brochure Modal */}
      {isBrochureModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-md animate-fade-in cursor-pointer"
            onClick={() => setIsBrochureModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-paper text-ink max-w-md w-full p-8 md:p-10 shadow-2xl border border-border/40 z-10 animate-fade-up">
            {/* Close Button */}
            <button
              onClick={() => setIsBrochureModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-ink transition-colors p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-8">
              <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
                <span className="rule" />
                Brochure Download
              </p>
              <h3 className="mt-4 font-display text-3xl">
                Unlock Krishna Unnati Details
              </h3>
              <p className="mt-2 text-xs text-muted-foreground font-sans font-light">
                Please provide your contact information to view the digital
                brochure instantly.
              </p>
            </div>

            <form onSubmit={handleBrochureSubmit} className="space-y-4">
              <InputField label="Name" name="name" />
              <InputField label="Phone Number" name="phone" type="tel" />
              <InputField label="Email" name="email" type="email" />

              <button
                type="submit"
                className="w-full bg-ink text-paper py-4 mt-6 text-xs uppercase tracking-[0.28em] hover:bg-brick transition-colors font-semibold cursor-pointer"
              >
                Submit & Download
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components used within the main page

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground mt-1 font-semibold">
        {label}
      </div>
    </div>
  );
}

function GalleryImage({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <figcaption className="absolute bottom-3 left-3 bg-paper/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-ink font-sans font-semibold">
        {label}
      </figcaption>
    </figure>
  );
}

function InputField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground font-sans font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        className="w-full mt-2 border-b border-border bg-transparent py-2 focus:outline-none focus:border-brick font-sans"
      />
    </div>
  );
}

function FloorPlanImage({ variant }: { variant: number }) {
  return (
    <div className="relative flex h-[300px] w-full items-start justify-center rounded border border-border bg-white p-2 md:h-[560px] md:p-4 lg:h-[620px]">
      <Image
        src={FLOOR_PLAN_IMAGES[variant]}
        alt={FLOOR_PLAN_LABELS[variant]}
        fill
        sizes="(max-width: 768px) 100vw, 90vw"
        className="object-contain object-top p-2 transition-opacity duration-300 md:p-4"
      />
    </div>
  );
}
