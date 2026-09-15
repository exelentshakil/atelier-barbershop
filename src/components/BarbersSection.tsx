"use client";

import React from "react";
import { BarberProfile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Scissors, Award, Calendar, Clock, Star } from "lucide-react";

interface BarbersSectionProps {
  barbers: BarberProfile[];
  onSelectBarberForBooking: (barberId: string) => void;
}

export function BarbersSection({ barbers, onSelectBarberForBooking }: BarbersSectionProps) {
  const getStatusBadge = (status: BarberProfile["chairStatus"]) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] border border-[var(--color-status-green-border)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-green)] animate-pulse" />
            Chair Open • Next Slot Ready
          </span>
        );
      case "in_chair":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-status-amber-bg)] text-[var(--color-status-amber)] border border-[var(--color-status-amber-border)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-amber)]" />
            Currently In Session
          </span>
        );
      case "off_duty":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">
            Off Duty Today
          </span>
        );
    }
  };

  return (
    <section id="barbers" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Master Artisans
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 font-semibold">
              Auburn Guild Roster
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            The Master Barbers
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-xl">
            Each chair is held by a licensed master barber with over a decade of dedication to heritage scissorcraft, precision geometry, and beard architecture.
          </p>
        </div>

        <div className="text-xs font-mono text-[var(--color-text-muted)] flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-[var(--color-brand)]" />
          <span>Real-time chair telemetry synced with Owner CMS</span>
        </div>
      </div>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <div
            key={barber.id}
            className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm hover:border-[var(--color-brand)] transition-all flex flex-col justify-between"
          >
            {/* Barber Portrait Header */}
            <div>
              <div className="relative h-64 w-full bg-[var(--color-panel-subtle)] overflow-hidden">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-90" />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(barber.chairStatus)}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs font-mono text-[var(--color-brand)] font-semibold uppercase tracking-wider block">
                    {barber.title}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-[var(--color-text-primary)]">
                    {barber.name}
                  </h3>
                </div>
              </div>

              {/* Barber Details */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed min-h-[48px]">
                  {barber.bio}
                </p>

                <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--color-text-muted)] flex items-center gap-1.5">
                      <Scissors className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                      Specialties
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)] text-right truncate max-w-[180px]">
                      {barber.specialties[0]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--color-text-muted)] flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                      Experience
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {barber.experienceYears}+ Years
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--color-text-muted)] flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      Rating
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {barber.rating} ★ ({barber.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book This Barber CTA */}
            <div className="p-5 pt-0">
              <Button
                onClick={() => onSelectBarberForBooking(barber.id)}
                disabled={barber.chairStatus === "off_duty"}
                variant="outline"
                className="w-full text-xs font-bold font-mono tracking-wider uppercase border-[var(--color-border)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-subtle)] hover:text-[var(--color-brand)] py-2.5"
              >
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Book With {barber.name.split(" ")[0]}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
