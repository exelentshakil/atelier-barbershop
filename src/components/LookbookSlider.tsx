"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Scissors,
  Sparkles,
  Calendar,
  MoveHorizontal,
  ChevronRight,
  Info,
  CheckCircle2,
  Tag,
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
  const [sliderPos, setSliderPos] = useState<number>(52); // percentage 0-100
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
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Transformations & Lookbook
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 font-semibold">
              Interactive Slider
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Before & After Haircut Transformation
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            Drag the interactive center divider left or right to inspect the precision transition from overgrown silhouette to razor-sharp editorial shape.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => onSelectCutForBooking(activeItem.serviceId, activeItem.barberId)}
            className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book This Transformation</span>
          </Button>
        </div>
      </div>

      {/* Main Interactive Split Slider Container */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left / Top: The Interactive Drag Canvas (8 cols) */}
          <div className="lg:col-span-8 p-3 sm:p-5 bg-[var(--color-panel-subtle)] flex flex-col justify-center">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden select-none cursor-ew-resize border border-[var(--color-border)] shadow-inner"
            >
              {/* After Image (Full Background) */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeItem.afterImg})` }}
              >
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/20">
                  After • Atelier Precision
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
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/20">
                  Before • Grown Out
                </div>
              </div>

              {/* Draggable Vertical Handle Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] cursor-ew-resize z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-[var(--color-brand)] border-2 border-white text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95">
                  <MoveHorizontal className="h-5 w-5" />
                </div>
              </div>

              {/* Interactive Helper Banner */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-mono pointer-events-none flex items-center gap-1.5 border border-white/10">
                <MoveHorizontal className="h-3 w-3 text-[var(--color-brand)]" />
                <span>Drag slider left or right to inspect</span>
              </div>
            </div>

            {/* Quick selector thumbnails under the slider */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {LOOKBOOK_ITEMS.map((item) => {
                const isSelected = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`relative rounded-lg overflow-hidden border p-1 text-left transition-all ${
                      isSelected
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-subtle)] ring-2 ring-[var(--color-brand)]/20"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/50"
                    }`}
                  >
                    <div
                      className="w-full aspect-[4/3] rounded bg-cover bg-center mb-1.5"
                      style={{ backgroundImage: `url(${item.afterImg})` }}
                    />
                    <div className="truncate text-xs font-bold text-[var(--color-text-primary)]">
                      {item.title}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)] truncate">
                      {item.barberName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Architectural Styling Specs (4 cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="space-y-4">
              <div>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-brand)] border-[var(--color-brand)]/30 font-semibold mb-2"
                >
                  {activeItem.category}
                </Badge>
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[var(--color-text-primary)]">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                  {activeItem.stylingNotes}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[var(--color-border-subtle)]">
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-[var(--color-text-muted)] block">
                    Master Artisan
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                    {activeItem.barberName} • Chair Resident
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
                    Finishing Product
                  </span>
                  <span className="text-xs font-medium text-[var(--color-brand)] font-mono">
                    {activeItem.pomadeRecommended}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[var(--color-border-subtle)] space-y-2">
              <Button
                onClick={() => onSelectCutForBooking(activeItem.serviceId, activeItem.barberId)}
                className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold py-2.5 shadow-sm flex items-center justify-center gap-2"
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

      {/* Lookbook Gallery Grid with Category Filter Chips */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-serif-luxury text-xl font-bold text-[var(--color-text-primary)]">
            Curated Barber Lookbook Archive
          </h3>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  selectedFilter === cat
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Card Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-brand)] hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-full aspect-[4/3] bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${item.afterImg})` }}
                >
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white font-mono text-[10px] uppercase font-bold">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-brand)] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {item.stylingNotes}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
                    <span>{item.barberName}</span>
                    <span className="text-[var(--color-brand)] font-semibold">Atelier Cut</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectCutForBooking(item.serviceId, item.barberId)}
                  className="w-full text-xs font-semibold border-[var(--color-border)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-subtle)] hover:text-[var(--color-brand)] transition-colors"
                >
                  Book This Look
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
