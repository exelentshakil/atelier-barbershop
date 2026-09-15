"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Car,
  Calendar,
  Camera,
  Share2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudioInfo } from "@/lib/data";

interface StudioLocationProps {
  studioInfo: StudioInfo;
  onOpenBooking: () => void;
}

export function StudioLocation({ studioInfo, onOpenBooking }: StudioLocationProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Studio Location & Contact
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] border border-[var(--color-status-green-border)] font-semibold">
              Open Now • Walk-Ins & Appointments
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Visit Our Atelier Studio
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            Situated in downtown Auburn's historic courtyard district. Private styling chairs, craft espresso, and dedicated client valet parking.
          </p>
        </div>

        <Button
          onClick={onOpenBooking}
          className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Book Chair Online</span>
        </Button>
      </div>

      {/* 2-Column Studio Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Map & Studio Image (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm flex flex-col">
          {/* Stylized Google Maps Simulation Viewport */}
          <div className="relative w-full aspect-[16/9] bg-[#e5e3df] dark:bg-[#1a1c22] overflow-hidden">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Stylized Streets */}
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/70 dark:bg-white/10 -translate-y-1/2" />
            <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-white/70 dark:bg-white/10" />
            <div className="absolute left-2/3 top-0 bottom-0 w-3 bg-white/50 dark:bg-white/5" />

            {/* Pin Marker */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-full flex flex-col items-center z-10">
              <div className="px-3 py-1 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-surface)] text-xs font-bold font-mono shadow-xl border border-[var(--color-brand)] mb-1 flex items-center gap-1.5 whitespace-nowrap">
                <span className="h-2 w-2 rounded-full bg-[var(--color-brand)] animate-ping" />
                Atelier Men's Grooming
              </div>
              <div className="h-8 w-8 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center shadow-lg border-2 border-white">
                <MapPin className="h-4 w-4" />
              </div>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="text-xs font-bold text-[var(--color-text-primary)] block truncate">
                  {studioInfo.address}, {studioInfo.suite}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  {studioInfo.cityStateZip}
                </span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  studioInfo.name + " " + studioInfo.address + " " + studioInfo.cityStateZip
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] shrink-0 shadow-sm"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Parking & Amenities Grid */}
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--color-border)]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--color-panel-subtle)] text-[var(--color-brand)] border border-[var(--color-border-subtle)] shrink-0">
                <Car className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--color-text-primary)]">
                  Dedicated Client Parking
                </h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                  Complimentary 2-hour parking in the Courtyard Level deck with validation stamp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--color-panel-subtle)] text-[var(--color-brand)] border border-[var(--color-border-subtle)] shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--color-text-primary)]">
                  Punctual Chair Starts
                </h4>
                <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                  Your appointment begins precisely at your reserved slot. No crowded lounge waiting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Operating Hours & Direct Contact (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Operating Hours Card */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-subtle)]">
              <span className="text-xs font-mono uppercase font-bold text-[var(--color-brand)]">
                Studio Hours
              </span>
              <span className="text-xs font-mono text-[var(--color-status-green)] font-semibold flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)]" />
                Open Today until 8:00 PM
              </span>
            </div>

            <div className="space-y-1.5">
              {Object.entries(studioInfo.hours).map(([day, sched]) => (
                <div
                  key={day}
                  className="flex items-center justify-between py-1 text-xs border-b border-[var(--color-border-subtle)] last:border-0"
                >
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {day}
                  </span>
                  {sched.isClosed ? (
                    <span className="font-mono text-[var(--color-status-red)] font-semibold">
                      Closed
                    </span>
                  ) : (
                    <span className="font-mono text-[var(--color-text-secondary)]">
                      {sched.open} – {sched.close}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Communication Channels */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 shadow-sm">
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-brand)] block">
              Direct Contact & Concierge
            </span>

            <div className="space-y-3">
              <a
                href={`tel:${studioInfo.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-[var(--color-brand)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-brand)] border border-[var(--color-border-subtle)]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--color-text-muted)] font-mono block">
                      Direct Studio Phone
                    </span>
                    <span className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                      {studioInfo.phone}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              </a>

              <a
                href={`mailto:${studioInfo.email}`}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-[var(--color-brand)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-brand)] border border-[var(--color-border-subtle)]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[var(--color-text-muted)] font-mono block">
                      Concierge Inquiries
                    </span>
                    <span className="text-xs font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                      {studioInfo.email}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                Instagram / TikTok:
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono font-bold text-[var(--color-brand)] hover:underline flex items-center gap-1"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>@atelierbarbershop</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
