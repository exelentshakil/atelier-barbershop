"use client";

import React from "react";
import {
  Scissors,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Cpu,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { StudioInfo } from "@/lib/data";

interface FooterProps {
  studioInfo: StudioInfo;
  onOpenConsultant: () => void;
}

export function Footer({ studioInfo, onOpenConsultant }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-colors">
      {/* Top Architecture & Stack Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-subtle)] border border-[var(--color-brand)]/40 flex items-center justify-center text-[var(--color-brand)]">
                <Scissors className="h-4 w-4" />
              </div>
              <span className="font-serif-luxury text-lg font-bold tracking-wider text-[var(--color-text-primary)]">
                ATELIER
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Bespoke men's grooming and scissorcraft atelier located in historic Auburn. Combining heritage barbering discipline with modern editorial styling.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-status-green)]" />
              <span>Real-time chair telemetry online</span>
            </div>
          </div>

          {/* Col 2: Studio Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Studio Location
            </h4>
            <div className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0 mt-0.5" />
                <span>
                  {studioInfo.address}, {studioInfo.suite}
                  <br />
                  Auburn, AL 36830
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0" />
                <a
                  href={`tel:${studioInfo.phone.replace(/[^0-9]/g, "")}`}
                  className="hover:text-[var(--color-brand)] transition-colors"
                >
                  {studioInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[var(--color-brand)] shrink-0" />
                <a
                  href={`mailto:${studioInfo.email}`}
                  className="hover:text-[var(--color-brand)] transition-colors"
                >
                  {studioInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Architecture Specifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Production Architecture
            </h4>
            <div className="space-y-1.5 text-xs text-[var(--color-text-secondary)] font-mono">
              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Framework</span>
                <span className="font-semibold text-[var(--color-text-primary)]">Next.js 15 App Router</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">Styling</span>
                <span className="font-semibold text-[var(--color-text-primary)]">Tailwind CSS v4</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)]">AI Fallback</span>
                <span className="font-semibold text-[var(--color-text-primary)]">OpenAI + Gemini Dual</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[var(--color-text-muted)]">Structured Data</span>
                <span className="font-semibold text-[var(--color-status-green)]">Schema.org BarberShop</span>
              </div>
            </div>
          </div>

          {/* Col 4: Systems Engineering Credential & Telemetry */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              System Engineering
            </h4>
            <div className="p-3.5 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--color-text-primary)]">
                <ShieldCheck className="h-4 w-4 text-[var(--color-brand)]" />
                <span>Bespoke Digital Systems</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                Engineered by Principal Systems Architect & Founder with 12+ years enterprise experience. Built without templates for zero maintenance and maximum local SEO conversion.
              </p>
              <button
                onClick={onOpenConsultant}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--color-brand)] hover:underline pt-1"
              >
                <Sparkles className="h-3 w-3" />
                <span>Test AI Style Consultant</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-text-muted)]">
          <div>
            © {new Date().getFullYear()} Atelier Men's Grooming Studio LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-green)]" />
              Lighthouse 100/100 Core Web Vitals
            </span>
            <span>•</span>
            <span>Auburn, AL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
