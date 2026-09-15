"use client";

import React, { useState } from "react";
import { Scissors, Sparkles, Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AtelierCraftGalleryProps {
  onSelectBooking: (serviceId: string) => void;
}

const GALLERY_PIECES = [
  {
    id: "gallery-1",
    title: "Precision Scissor Geometry",
    category: "Master Scissorcraft",
    image: "https://images.pexels.com/photos/34702982/pexels-photo-34702982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    serviceId: "sig-cut",
    description: "Every cut begins with bone-structure assessment. Hand-honed Japanese steel shears creating weightless graduation and natural flow.",
    tag: "Japanese 440C Shears",
  },
  {
    id: "gallery-2",
    title: "Sub-Millimeter Skin Taper",
    category: "Fade Architecture",
    image: "https://images.pexels.com/photos/12074386/pexels-photo-12074386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    serviceId: "skin-fade",
    description: "Flawless transition from bare skin to bulk. Clean occipital blend with hand-shaped crisp temporal edges.",
    tag: "Foil & Zero Gap",
  },
  {
    id: "gallery-3",
    title: "The Royal Hot Towel Shave",
    category: "Heritage Ritual",
    image: "https://images.pexels.com/photos/9315046/pexels-photo-9315046.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    serviceId: "royal-shave",
    description: "Triple essential-oil steam towels, whipped badger lather, dual-pass straight razor glide, and chilled eucalyptus finish.",
    tag: "Straight Razor",
  },
  {
    id: "gallery-4",
    title: "Heritage Auburn Studio Suite",
    category: "Studio Atmosphere",
    image: "https://images.pexels.com/photos/12339159/pexels-photo-12339159.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    serviceId: "executive-ritual",
    description: "Custom vintage full-grain leather chairs, brass fixtures, complimentary bourbon or espresso, and curated jazz vinyl.",
    tag: "Private Studio",
  },
];

export function AtelierCraftGallery({ onSelectBooking }: AtelierCraftGalleryProps) {
  const [selectedPiece, setSelectedPiece] = useState<string>(GALLERY_PIECES[0].id);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Craft & Atmosphere
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 font-semibold">
              Authentic Editorial Photography
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            The Atelier Craft Standards
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            We reject rushed 15-minute franchise cuts. Every service at Atelier is an unhurried, tailored ritual conducted with precision instruments and master artisans.
          </p>
        </div>

        <div className="text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[var(--color-status-green)]" />
          <span>Sanitized Hospital-Grade Barbershop Tools</span>
        </div>
      </div>

      {/* 4-Card Luxury Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {GALLERY_PIECES.map((piece) => (
          <div
            key={piece.id}
            className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm hover:border-[var(--color-brand)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image with zoom effect and badge */}
              <div className="relative h-56 w-full overflow-hidden bg-[var(--color-panel-subtle)]">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {piece.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 font-semibold block">
                    {piece.category}
                  </span>
                  <h3 className="font-serif-luxury text-base font-bold text-white leading-snug">
                    {piece.title}
                  </h3>
                </div>
              </div>

              {/* Text info */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed min-h-[54px]">
                  {piece.description}
                </p>
              </div>
            </div>

            {/* Quick Action */}
            <div className="p-4 pt-0">
              <Button
                onClick={() => onSelectBooking(piece.serviceId)}
                variant="outline"
                size="sm"
                className="w-full text-xs font-mono font-bold border-[var(--color-border)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-subtle)] hover:text-[var(--color-brand)] justify-between"
              >
                <span>Reserve Experience</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
