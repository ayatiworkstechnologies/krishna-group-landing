"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, MessageCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      {/* Header / Nav */}
      <header className="border-b border-border/40 py-6 bg-paper/50 backdrop-blur-md">
        <div className="container-editorial flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-ink hover:text-gold transition-colors font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="font-display text-xl text-ink">
            Krishna Unnatti
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream border border-gold/30 text-gold mb-2">
            <span className="font-display text-3xl font-light">✓</span>
          </div>

          <div className="space-y-4">
            <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
              <span className="rule" />
              Request Received
            </p>
            <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-tight text-ink">
              Thank you for your interest.
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-sans font-light max-w-md mx-auto">
              Our team has received your details. A representative from Krishna Group will connect with you shortly to assist with your inquiry and schedule your private viewing.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="pt-6 border-t border-border/40 max-w-sm mx-auto space-y-3">
            <a
              href="https://krishnagroup.com/wp-content/uploads/2026/01/unnatii-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-ink text-paper w-full py-4 text-xs uppercase tracking-[0.24em] hover:bg-gold transition-colors font-semibold cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </a>
            
            <a
              href="https://wa.me/917824001904"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border text-ink w-full py-4 text-xs uppercase tracking-[0.24em] hover:bg-cream transition-colors font-semibold cursor-pointer"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600" />
              WhatsApp Support
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-paper/10 text-center text-xs text-muted-foreground font-sans">
        <div>
          © {new Date().getFullYear()} Krishna Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
