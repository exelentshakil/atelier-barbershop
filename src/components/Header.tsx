"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  Scissors,
  Phone,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  Clock,
  MapPin,
  SlidersHorizontal,
  Star,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeTab: string;
  onNavigate: (sectionId: string) => void;
  onOpenConsultant: () => void;
  onOpenBooking: () => void;
}

export function Header({
  activeTab,
  onNavigate,
  onOpenConsultant,
  onOpenBooking,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: "lookbook", label: "Lookbook", icon: Scissors },
    { id: "booking", label: "Services & Booking", icon: Calendar },
    { id: "barbers", label: "Barber Guild", icon: Clock },
    { id: "reviews", label: "Reviews (5.0★)", icon: Star },
    { id: "cms", label: "Owner CMS Studio", icon: SlidersHorizontal },
    { id: "seo", label: "Local SEO & Schema", icon: Search },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md transition-colors shadow-sm">
      {/* Top micro-announcement bar */}
      <div className="hidden sm:block border-b border-[var(--color-border-subtle)] bg-[var(--color-panel-subtle)] py-1.5 px-4 text-xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
            <span className="inline-flex items-center gap-1.5 font-mono">
              <span className="h-2 w-2 rounded-full bg-[var(--color-status-green)] animate-pulse" />
              Chairs Open Today • 8:30 AM – 8:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[var(--color-text-muted)]">
              <MapPin className="h-3 w-3 text-[var(--color-brand)]" />
              142 Elm St, Suite 104, Auburn AL
            </span>
          </div>
          <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
            <span className="font-mono text-[var(--color-brand)] font-semibold">
              4.9★ Google (482 Reviews)
            </span>
            <a
              href="tel:3345550192"
              className="inline-flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] transition-colors"
            >
              <Phone className="h-3 w-3" />
              (334) 555-0192
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline (Click scrolls to top/hero) */}
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-[var(--color-text-primary)] text-[var(--color-surface)] flex items-center justify-center shadow-sm border border-[var(--color-brand)] group-hover:scale-105 transition-transform">
              <Scissors className="h-5 w-5 text-[var(--color-brand)] rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-wider text-[var(--color-text-primary)]">
                  ATELIER
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/20 font-semibold">
                  MEN'S GROOMING
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] hidden md:block">
                Master Craftsmanship • Editorial Precision
              </p>
            </div>
          </button>

          {/* Center Navigation Tabs (Smooth Scroll / Slide to Section) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--color-brand)] text-white shadow-sm font-bold"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-[var(--color-brand)]"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* AI Style Consultant Trigger with Crisp Contrast */}
            <button
              type="button"
              onClick={onOpenConsultant}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-[var(--color-brand)]/40 bg-[var(--color-brand-subtle)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Style Consult</span>
            </button>

            {/* Quick Booking CTA */}
            <Button
              size="sm"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white shadow-sm cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Chair</span>
            </Button>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] shrink-0 cursor-pointer"
              title="Toggle Light / Dark Mode"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[var(--color-brand)]" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[var(--color-brand)]" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto scrollbar-none pt-2.5 pb-1 border-t border-[var(--color-border-subtle)] mt-2">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[var(--color-brand)] text-white font-bold"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
