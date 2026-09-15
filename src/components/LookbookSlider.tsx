"use client";

import React, { useState, useRef } from "react";
import {
  Scissors,
  Sparkles,
  Calendar,
  MoveHorizontal,
  ArrowRight,
  CheckCircle2,
  Tag,
  Clock,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOOKBOOK_ITEMS, LookbookItem } from "@/lib/data";

interface LookbookSliderProps {
  onSelectCutForBooking: (serviceId: string, barberId: string) => void;
}

export function LookbookSlider({ onSelectCutForBooking }: LookbookSliderProps) {
  // Selected transformation for the drag slider
  const [activeItem, setActiveItem] = useState<LookbookItem>(LOOKBOOK_ITEMS[0]);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const categories = ["All", "Fades & Tapers", "Scissor Craft", "Beard & Shave", "Classic Heritage"];

  const filteredItems =
    selectedFilter === "All"
      ? LOOKBOOK_ITEMS
      : LOOKBOOK_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Visual Transformations
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 font-semibold">
              Interactive Split Slider
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Before & After Precision Transformations
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl leading-relaxed">
            Drag the interactive center divider left or right to inspect the sub-millimeter transition from unkempt hair to razor-sharp editorial shape.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => onSelectCutForBooking(activeItem.serviceId, activeItem.barberId)}
            className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book This Transformation</span>
          </Button>
        </div>
      </div>

      {/* Main Interactive Split Slider Container */}
      <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: The Interactive Drag Canvas (8 cols) */}
          <div className="lg:col-span-8 p-4 sm:p-6 bg-[var(--color-panel-subtle)] flex flex-col justify-center">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[var(--color-border)] shadow-2xl bg-black"
            >
              {/* After Image (Full Background) */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeItem.afterImg})` }}
              >
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-[#d4af37] font-mono text-xs font-bold uppercase tracking-wider border border-[#d4af37]/40 shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                  <span>After • Atelier Precision</span>
                </div>
              </div>

              {/* Before Image (Clipped Overlay on Left) */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${activeItem.beforeImg})`,
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                }}
              >
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white/90 font-mono text-xs font-bold uppercase tracking-wider border border-white/20 shadow-lg">
                  Before • Overgrown Silhouette
                </div>
              </div>

              {/* Draggable Vertical Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_16px_rgba(0,0,0,0.8)] cursor-ew-resize z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-[#b48608] border-2 border-white text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-ew-resize">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>

              {/* Interactive Helper Banner */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-mono pointer-events-none flex items-center gap-2 border border-white/15 shadow-xl">
                <MoveHorizontal className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Drag divider left or right to compare</span>
              </div>
            </div>

            {/* Quick selector thumbnails under the slider (6 items perfectly balanced across 6 columns) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mt-4">
              {LOOKBOOK_ITEMS.map((item) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`relative rounded-xl overflow-hidden border p-1.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-subtle)] ring-2 ring-[var(--color-brand)]/30 shadow-sm"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/60"
                    }`}
                  >
                    <div
                      className="w-full aspect-[4/3] rounded-lg bg-cover bg-center mb-1.5"
                      style={{ backgroundImage: `url(${item.afterImg})` }}
                    />
                    <div className="truncate text-[11px] font-bold text-[var(--color-text-primary)]">
                      {item.title.split("&")[0]}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)] truncate">
                      {item.barberName.split(" ")[0]} • Chair
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Architectural Styling Specs (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="space-y-5">
              <div>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-brand)] border-[var(--color-brand)]/30 font-semibold mb-2"
                >
                  {activeItem.category}
                </Badge>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                  {activeItem.stylingNotes}
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-[var(--color-border-subtle)]">
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-text-muted)] block">
                    Master Artisan & Chair
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                    {activeItem.barberName} • Resident Barber
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-text-muted)] block">
                    Hair Architecture Formula
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {activeItem.hairType}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-text-muted)] block">
                    Finishing Product Formula
                  </span>
                  <span className="text-xs font-medium text-[var(--color-brand)] font-mono">
                    {activeItem.pomadeRecommended}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[var(--color-border-subtle)] space-y-2.5">
              <Button
                onClick={() => onSelectCutForBooking(activeItem.serviceId, activeItem.barberId)}
                className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold py-3 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book This Cut ({activeItem.barberName.split(" ")[0]})</span>
              </Button>
              <p className="text-[11px] text-center text-[var(--color-text-muted)] font-mono">
                Instant confirmation • No upfront deposit required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Lookbook Archive Grid (6 Cards, 3 cols x 2 rows, Perfectly Balanced) */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-brand)] block mb-1">
              Curated Portfolio (6 Looks)
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
              Curated Barber Lookbook Archive
            </h3>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-[var(--color-brand)] text-white shadow-sm font-bold"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Editorial Grid: 3 columns x 2 rows = Perfectly Balanced, Zero Void */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-brand)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo with hover zoom */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-black">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${item.afterImg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[#d4af37] font-mono text-[10px] uppercase font-bold border border-[#d4af37]/30">
                    {item.category}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-mono text-[#d4af37] uppercase font-semibold block">
                      {item.barberName} • Chair
                    </span>
                    <h4 className="font-serif-luxury text-base font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                    {item.stylingNotes}
                  </p>

                  <div className="pt-2.5 border-t border-[var(--color-border-subtle)] space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-[var(--color-text-muted)] text-[11px]">
                      <span>Architecture:</span>
                      <span className="text-[var(--color-text-secondary)] font-sans truncate max-w-[170px]">
                        {item.hairType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[var(--color-text-muted)] text-[11px]">
                      <span>Product:</span>
                      <span className="text-[var(--color-brand)] font-semibold truncate max-w-[170px]">
                        {item.pomadeRecommended.split("(")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectCutForBooking(item.serviceId, item.barberId)}
                  className="w-full text-xs font-mono font-bold py-2.5 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-brand)] hover:text-white hover:border-[var(--color-brand)] transition-all flex items-center justify-between shadow-xs cursor-pointer group/btn"
                >
                  <span>Book This Look</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
