"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";

// Image Asset Definitions
const HERO_IMAGE = "/assets/elevation.webp";
const ENQUIRE_BG_IMAGE = "/assets/terrace-garden.webp";
const BRAND_LOGO = "/assets/krishna-group-logo.svg";

const GALLERY_IMAGES = [
  { src: "/assets/living-area.jpg", label: "Living Area" },
  { src: "/assets/bedroom.webp", label: "Bed Room" },
  { src: "/assets/kitchen.webp", label: "Kitchen" },
  { src: "/assets/lobby-1.webp", label: "Lobby" },
  { src: "/assets/bathroom.webp", label: "Bath Room" },
  { src: "/assets/balcony.webp", label: "Balcony" },
  { src: "/assets/terrace-garden.webp", label: "Terrace Garden" },
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
  },
  {
    title: "Structure",
    body: "R.C.C Framed Structure.",
  },
  {
    title: "Ceiling Height",
    body: "False Ceiling with light fixtures. 10′ 6″ Floor to ceiling Clear height (without false ceiling).",
  },
  {
    title: "Walls",
    body: "External Walls in Cement Blocks. Partition Walls in Cement Blocks.",
  },
  {
    title: "Flooring",
    body: "Marble Flooring in Living & Dining. 4 X 4 Vitrified Tiles for Flooring in all Bedrooms & Kitchen. Anti-Skid tiles in Restrooms & Balcony.",
  },
  {
    title: "Plastering",
    body: "Internal walls are plastered in gypsum. External walls are plastered in cement mortar.",
  },
  {
    title: "Painting",
    body: "Interiors: Emulsion premium paint with two coat asian / berger / dulux putty. Exteriors: Texture with asian / berger / dulux putty paint.",
  },
  {
    title: "Doors",
    body: "Engineered wooden door frame and shutter with teak wood veneer finish for main door. Engineered wood veneer / ABS frame & shutter for bedrooms and restrooms.",
  },
  {
    title: "Windows",
    body: "UPVC with Sliding / openable glass shutters and MS grill as per the architect’s design.",
  },
  {
    title: "Balcony",
    body: "Glass fitted UPVC french doors.",
  },
  {
    title: "Kitchen & Utility Area",
    body: "2′ Wall dado vitrified tiles above the kitchen platform. Provision for water purifying system in kitchen. Provision for washing machine, sink and tap in utility.",
  },
  {
    title: "Restrooms",
    body: "Vitrified wall tiles up to false ceiling height. Kohler / Toto / Roca or equivalent wall mounted closets, wash basins, diverters & CP fittings. Shower partition in master restroom.",
  },
  {
    title: "Electrical",
    body: "100% Power Backup. VRV A/C in Living, Dining and all Bedrooms. Three Phase Power Supply with fully concealed wiring & modular switches. Provision for geyser, exhaust fan & chimney.",
  },
];

const COMMUNITY_PERKS = [
  "Common Area Flooring - Granite / Designer Tiles / Kota Stone",
  "100% Power Back up",
  "Paver Blocks for driveways",
  "Anti-Termite Treatment",
  "Common Toilet for Drivers / Maids",
  "Video Door Phone, Security System with Access Cards",
  "Provision for DTH",
  "CCTV Camera to Monitor",
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
  const [activeFloorPlanIndex, setActiveFloorPlanIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedLocationCategory, setExpandedLocationCategory] = useState<string | null>("Education");

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
      }
    );

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleEnquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you — we'll be in touch shortly.");
  };

  return (
    <div className="bg-background text-foreground">
      {/* Header Section */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="container-editorial flex items-center justify-between py-6">
          <a href="#" className="flex items-center gap-3 leading-none z-50">
            <img src={BRAND_LOGO} alt="Krishna Group logo" className="h-9 w-auto brightness-0 invert" />
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-wide text-paper font-semibold">
                UNNATTI
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-paper/70 mt-1 font-sans">
                Krishna Group · Est. 1983
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-paper/90 font-medium">
            <a href="#overview" className="nav-link-minimal hover:text-paper transition-colors">
              Overview
            </a>
            <a href="#gallery" className="nav-link-minimal hover:text-paper transition-colors">
              Gallery
            </a>
            <a href="#plans" className="nav-link-minimal hover:text-paper transition-colors">
              Floor Plans
            </a>
            <a href="#specs" className="nav-link-minimal hover:text-paper transition-colors">
              Specifications
            </a>
            <a href="#location" className="nav-link-minimal hover:text-paper transition-colors">
              Location
            </a>
          </nav>
          
          <a
            href="#enquire"
            className="hidden md:inline-flex items-center gap-2 border border-paper/40 text-paper text-xs uppercase tracking-[0.24em] px-5 py-2.5 hover:bg-paper hover:text-ink transition-colors font-semibold"
          >
            Enquire
          </a>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-paper transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-paper transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-paper transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 bg-ink/95 backdrop-blur-lg z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto translate-x-0"
              : "opacity-0 pointer-events-none translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center gap-8 text-xl text-paper/90 font-medium">
            <a
              href="#overview"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Overview
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Gallery
            </a>
            <a
              href="#plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Floor Plans
            </a>
            <a
              href="#specs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Specifications
            </a>
            <a
              href="#location"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link-minimal hover:text-gold transition-colors tracking-wide font-display text-2xl"
            >
              Location
            </a>
            <a
              href="#enquire"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 border border-paper/40 text-paper text-xs uppercase tracking-[0.24em] px-8 py-3.5 hover:bg-paper hover:text-ink transition-colors font-semibold"
            >
              Enquire Now
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Krishna Unnatti building exterior elevation"
          className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative z-10 container-editorial h-full flex flex-col justify-end pb-24 md:pb-32">
          <div className="animate-fade-up max-w-3xl text-paper">
            <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
              <span className="rule" />
              Now Unveiling · Alwarpet, Chennai
            </p>
            <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95] tracking-tight">
              A rare urban
              <br />
              <em className="text-gold not-italic font-light italic">retreat</em>{" "}
              for the
              <br />
              discerning few.
            </h1>
            <p className="mt-8 max-w-xl text-paper/80 text-base md:text-lg leading-relaxed font-sans font-light">
              Krishna Unnatti is a boutique residence of just five premium 3 BHK
              homes — each 2,082 sq.ft — designed for those who value privacy,
              comfort and a prime Chennai address.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 bg-paper text-ink px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-gold transition-colors font-semibold"
              >
                Enquire Now
              </a>
              <a
                href="https://krishnagroup.com/wp-content/uploads/2026/01/unnatii-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-paper/50 text-paper px-8 py-4 text-xs uppercase tracking-[0.28em] hover:bg-paper hover:text-ink transition-colors font-semibold"
              >
                Download Brochure
              </a>
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
              <div key={desc} className="py-5 px-4 text-center">
                <div className="font-display text-3xl md:text-4xl text-gold">
                  {val}
                </div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-paper/70 mt-1 font-semibold">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address Overview Section */}
      <section id="overview" className="py-24 md:py-36 reveal-on-scroll">
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
              Tucked into one of Chennai's most storied neighbourhoods, Unnatti
              is a quiet answer to the city's noise — homes shaped by
              daylight, marble and considered detail.
            </p>
            <p>
              Every residence is designed for smart, sustainable living: solar-lit
              common areas, full power back-up, EV charging, rainwater
              harvesting, CCTV, video door phones and intercom access.
            </p>
            <p>
              A serene terrace garden crowns Unnatti, offering a private
              escape with skyline views — the kind of quiet luxury that Alwarpet
              was made for.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border mt-10">
              <StatItem label="Foundation" value="Pile" />
              <StatItem label="Structure" value="R.C.C" />
              <StatItem label="Clear Height" value="10′ 6″" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-cream py-24 md:py-32 reveal-on-scroll">
        <div className="container-editorial">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14 reveal-child">
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

      {/* Floor Plans Section */}
      <section id="plans" className="py-24 md:py-32 reveal-on-scroll">
        <div className="container-editorial">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal-child">
            <p className="eyebrow">
              <span className="rule" />
              Curated Floor Plans
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl">
              Every square foot, considered.
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-12 reveal-child reveal-delay-100">
            {FLOOR_PLAN_LABELS.map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveFloorPlanIndex(idx)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.24em] border transition-colors font-semibold ${
                  activeFloorPlanIndex === idx
                    ? "bg-ink text-paper border-ink"
                    : "border-border text-muted-foreground hover:border-ink hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="aspect-[16/9] bg-cream border border-border flex items-center justify-center relative overflow-hidden p-6 reveal-child reveal-delay-200">
            <div key={activeFloorPlanIndex} className="animate-fade-in w-full h-full flex items-center justify-center">
              <FloorPlanImage variant={activeFloorPlanIndex} />
            </div>
            <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.24em] text-muted-foreground bg-paper/80 backdrop-blur px-3 py-1.5 font-semibold">
              {FLOOR_PLAN_LABELS[activeFloorPlanIndex]} · 2082 sq.ft
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section id="specs" className="bg-ink text-paper py-24 md:py-32 reveal-on-scroll">
        <div className="container-editorial">
          <div className="grid md:grid-cols-12 gap-10 mb-16">
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
              teak, UPVC glazing and VRV climate control — specified once and
              specified well.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/10 reveal-child reveal-delay-200">
            {KEY_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="bg-ink p-8 hover:bg-ink/70 transition-all duration-300 group hover:shadow-[inset_0_0_0_1px_var(--gold)]"
              >
                <div className="text-gold font-display text-2xl mb-3">
                  {item.title}
                </div>
                <p className="text-paper/70 text-sm leading-relaxed font-sans font-light">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Perks Section */}
      <section className="py-24 md:py-32 reveal-on-scroll">
        <div className="container-editorial">
          <div className="text-center mb-16 max-w-2xl mx-auto reveal-child">
            <p className="eyebrow">
              <span className="rule" />
              Community Perks
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl">
              The comforts of a quiet building.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border reveal-child reveal-delay-200">
            {COMMUNITY_PERKS.map((perk, idx) => (
              <div
                key={perk}
                className="bg-background p-8 flex items-start gap-4 hover:bg-cream transition-colors"
              >
                <span className="font-display text-gold text-xl leading-none pt-1">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground leading-relaxed font-sans font-medium">
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Highlights Section */}
      <section id="location" className="bg-cream py-24 md:py-32 reveal-on-scroll">
        <div className="container-editorial grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 reveal-child">
            <p className="eyebrow">
              <span className="rule" />
              Location Highlights
            </p>
            <h2 className="mt-6 text-4xl md:text-5xl">Alwarpet, on foot.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed font-sans font-light">
              Schools, hospitals, metro, temples, cinema — the essential city
              sits within a fifteen-minute drive, most of it within a walk.
            </p>
            <div className="mt-10 aspect-square bg-background border border-border relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-3 h-3 rounded-full bg-brick mx-auto animate-pulse" />
                  <div className="mt-2 font-display text-xl">Alwarpet</div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-sans mt-1">
                    Chennai · 600 018
                  </div>
                </div>
              </div>
              <svg
                className="absolute inset-0 w-full h-full text-border"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,60 Q40,55 50,50 T100,45"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  fill="none"
                />
                <path d="M20,0 L20,100" stroke="currentColor" strokeWidth="0.3" />
                <path d="M75,0 L75,100" stroke="currentColor" strokeWidth="0.3" />
                <path d="M0,80 L100,80" stroke="currentColor" strokeWidth="0.3" />
                <path d="M0,30 L100,30" stroke="currentColor" strokeWidth="0.3" />
              </svg>
            </div>
          </div>
          <div className="md:col-span-7 space-y-4 md:pt-4 reveal-child reveal-delay-200">
            {LOCATION_HIGHLIGHTS.map((category) => {
              const isOpen = expandedLocationCategory === category.group;
              return (
                <div
                  key={category.group}
                  className="border border-border bg-background transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setExpandedLocationCategory(isOpen ? null : category.group)
                    }
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                  >
                    <span className="font-display text-2xl text-foreground">
                      {category.group}
                    </span>
                    <span
                      className={`text-gold transition-transform duration-300 text-xs ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[500px] border-t border-border opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="p-6 divide-y divide-border bg-cream/30">
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
      <section id="enquire" className="relative py-24 md:py-32 overflow-hidden reveal-on-scroll">
        <img
          src={ENQUIRE_BG_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
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
              7 homes. A single address. Reach us for the brochure, floor
              plans and pricing — we'll respond within one working day.
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
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" name="first" />
              <InputField label="Last Name" name="last" />
            </div>
            <InputField label="Email" name="email" type="email" />
            <InputField label="Phone" name="phone" type="tel" />
            <div>
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
              Request Brochure
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-ink text-paper/70 py-12">
        <div className="container-editorial flex flex-wrap items-center justify-between gap-4 text-xs font-sans font-semibold">
          <div className="font-display text-paper text-xl font-normal">
            Krishna Unnatti · Alwarpet
          </div>
          <div className="uppercase tracking-[0.28em]">
            Krishna Group · Est. 1983
          </div>
          <div>© {new Date().getFullYear()} All rights reserved.</div>
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
        <a
          href="#enquire"
          className="py-4 text-center border-r border-paper/10 bg-brick hover:bg-brick/90 text-white transition-colors"
        >
          Enquire
        </a>
        <a
          href="https://wa.me/917824001904"
          className="py-4 text-center hover:text-gold transition-colors"
        >
          WhatsApp
        </a>
      </div>
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
    <figure className={`relative overflow-hidden group ${className}`}>
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
    <div className="w-full h-full flex items-center justify-center bg-white p-2 md:p-6 rounded border border-border">
      <img
        src={FLOOR_PLAN_IMAGES[variant]}
        alt={FLOOR_PLAN_LABELS[variant]}
        className="max-w-full max-h-[300px] md:max-h-[450px] object-contain transition-opacity duration-300"
      />
    </div>
  );
}
