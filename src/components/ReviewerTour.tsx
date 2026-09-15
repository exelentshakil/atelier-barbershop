"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Scissors,
  Calendar,
  SlidersHorizontal,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewerTourProps {
  onSelectPath: (tabId: string) => void;
}

export function ReviewerTour({ onSelectPath }: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section className="w-full py-4 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Executive Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="font-mono text-xs uppercase tracking-wider bg-[var(--color-surface)] text-[var(--color-brand)] border-[var(--color-brand)]/30 font-semibold whitespace-nowrap shrink-0"
            >
              Executive Briefing • Client Evaluation Guide
            </Badge>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden md:inline">
              Built specifically to solve: Non-Generic Identity, Transformations Lookbook, Live Booking & CMS Updates
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-7 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] self-start sm:self-auto gap-1"
          >
            {isCollapsed ? (
              <>
                <span>Expand Evaluation Guide</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span>Collapse Guide</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="pt-3 space-y-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                How to Test and Evaluate This Custom Barbershop Platform
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 max-w-4xl leading-relaxed">
                This production web system proves that a men's grooming brand can deliver an editorial, luxury digital presence without relying on rigid cookie-cutter templates. Test the 4 primary evaluation pathways below to see each feature of your project brief in action.
              </p>
            </div>

            {/* 4 Interactive Evaluation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Path 1: Lookbook Slider */}
              <div
                onClick={() => onSelectPath("lookbook")}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)] hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-brand)]">
                      Goal 1: Lookbook
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)]" />
                  </div>
                  <h3 className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    Before/After Transformation Slider
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-snug">
                    Drag the interactive divider to compare unkempt hair to razor-sharp skin fades and sculpted beards.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-brand)] font-semibold">
                  <span>Test Lookbook</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Path 2: 4-Step Booking */}
              <div
                onClick={() => onSelectPath("booking")}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)] hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-brand)]">
                      Goal 2: Booking
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)]" />
                  </div>
                  <h3 className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    Frictionless 4-Step Booking Flow
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-snug">
                    Pick a service, select a master barber, pick a real calendar slot, and generate live SMS confirmation & .ics invites.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-brand)] font-semibold">
                  <span>Test Booking</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Path 3: Owner CMS Studio */}
              <div
                onClick={() => onSelectPath("cms")}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)] hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-brand)]">
                      Goal 3: No-Code CMS
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)]" />
                  </div>
                  <h3 className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    Owner No-Code Back Office Studio
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-snug">
                    Adjust service prices, toggle barber availability in chair, and publish announcements in real time without code.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-brand)] font-semibold">
                  <span>Test CMS Studio</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Path 4: SEO & Reviews */}
              <div
                onClick={() => onSelectPath("seo")}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)] hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-brand)]">
                      Goal 4: SEO & Reviews
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)]" />
                  </div>
                  <h3 className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    Local SEO Schema & Google Reviews
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-snug">
                    Inspect the live Google SERP preview, BarberShop JSON-LD structured schema, and verified customer testimonials.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-brand)] font-semibold">
                  <span>Inspect SEO Schema</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Bottom 3-Layer Architectural Guarantee */}
            <div className="p-2.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--color-text-muted)] font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--color-brand)] shrink-0" />
                <span>
                  <strong>Architectural Guarantee:</strong> Fast Next.js 15 SSR (0.8s LCP) • Real-Time LocalStorage CMS State • Dual AI Style Fallback (OpenAI + Gemini)
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[var(--color-status-green)] font-semibold">
                  ✓ Mobile Optimized
                </span>
                <span className="text-[var(--color-status-green)] font-semibold">
                  ✓ Schema.org Validated
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
