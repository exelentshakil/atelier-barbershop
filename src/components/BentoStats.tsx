"use client";

import React from "react";
import { Star, Clock, Scissors, Smartphone, Award, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoStats() {
  return (
    <section className="w-full py-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Google Reviews */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                Reputation
              </span>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                4.9 / 5.0
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-medium">
                482 Verified Google Reviews
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center gap-1.5 text-xs text-[var(--color-brand)] font-semibold">
              <Award className="h-3.5 w-3.5" />
              <span>#1 Rated Local Studio</span>
            </div>
          </div>

          {/* Card 2: On-Time Chair Rate */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                Punctuality SLA
              </span>
              <Clock className="h-4 w-4 text-[var(--color-brand)]" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-status-green)]">
                98.4%
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-medium">
                On-Time Chair Start Guarantee
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)]" />
              <span>Zero Waiting Room Lag</span>
            </div>
          </div>

          {/* Card 3: Master Artisans */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                Craft Guild
              </span>
              <Scissors className="h-4 w-4 text-[var(--color-brand)]" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                3 Master
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-medium">
                Full-Time Resident Barbers
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--color-brand)]" />
              <span>35+ Years Combined Experience</span>
            </div>
          </div>

          {/* Card 4: Mobile Performance */}
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold tracking-wider text-[var(--color-text-muted)]">
                Mobile UX Speed
              </span>
              <Smartphone className="h-4 w-4 text-[var(--color-brand)]" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                0.78s
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-medium">
                Largest Contentful Paint (LCP)
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center gap-1.5 text-xs text-[var(--color-status-green)] font-semibold">
              <span>100% Touch Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
