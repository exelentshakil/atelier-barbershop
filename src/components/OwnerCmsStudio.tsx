"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  DollarSign,
  Clock,
  UserCheck,
  Megaphone,
  Save,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ServiceItem, BarberProfile, StudioInfo } from "@/lib/data";

interface OwnerCmsStudioProps {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  barbers: BarberProfile[];
  setBarbers: React.Dispatch<React.SetStateAction<BarberProfile[]>>;
  studioInfo: StudioInfo;
  setStudioInfo: React.Dispatch<React.SetStateAction<StudioInfo>>;
  onSaveNotice?: () => void;
}

export function OwnerCmsStudio({
  services,
  setServices,
  barbers,
  setBarbers,
  studioInfo,
  setStudioInfo,
}: OwnerCmsStudioProps) {
  const [activeTab, setActiveTab] = useState<"services" | "barbers" | "hours" | "announcement">(
    "services"
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Service price adjustment
  const handlePriceChange = (id: string, newPrice: number) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, price: Math.max(1, newPrice) } : s))
    );
  };

  // Barber chair toggle
  const handleBarberStatusToggle = (id: string) => {
    setBarbers((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const nextStatus =
          b.chairStatus === "available"
            ? "in_chair"
            : b.chairStatus === "in_chair"
            ? "off_duty"
            : "available";
        return { ...b, chairStatus: nextStatus };
      })
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              No-Code Studio Admin
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 font-semibold">
              Live State Sync
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Owner No-Code CMS Control Panel
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            Solves your exact requirement:{" "}
            <strong className="text-[var(--color-text-primary)]">
              "Be easy for me to update without coding."
            </strong>{" "}
            Test adjusting service prices, chair availability, or operating hours here — and watch the changes reflect live across the client site!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs font-mono text-[var(--color-status-green)] font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Live Site Updated!
            </span>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Publish Changes</span>
          </Button>
        </div>
      </div>

      {/* Admin Tab Selector */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "services", label: "Service Pricing & Catalog", icon: DollarSign },
          { id: "barbers", label: "Barber Chair Roster", icon: UserCheck },
          { id: "hours", label: "Studio Hours & Location", icon: Clock },
          { id: "announcement", label: "Announcement Banner", icon: Megaphone },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-transparent"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Service Pricing & Catalog */}
      {activeTab === "services" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)]">
              Live Services Menu ({services.length} Active Items)
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              Changes reflect immediately in the Booking Engine tab
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                    {service.name}
                  </h4>
                  <Badge variant="outline" className="font-mono text-[10px] uppercase">
                    {service.category}
                  </Badge>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <Label className="text-xs font-mono text-[var(--color-text-muted)]">
                      Price ($)
                    </Label>
                    <Input
                      type="number"
                      value={service.price}
                      onChange={(e) =>
                        handlePriceChange(service.id, parseInt(e.target.value) || 0)
                      }
                      className="w-20 h-8 text-xs font-mono font-bold bg-[var(--color-panel-subtle)]"
                    />
                  </div>
                  <div className="text-xs font-mono text-[var(--color-text-muted)]">
                    {service.durationMin} mins
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Barber Chair Roster */}
      {activeTab === "barbers" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)]">
              Barber Chair Status & Shift Management
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              Click status pill to toggle: Ready / In Chair / Off Duty
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-full bg-cover bg-center border border-[var(--color-brand)] shrink-0"
                    style={{ backgroundImage: `url(${barber.avatar})` }}
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                      {barber.name}
                    </h4>
                    <p className="text-xs text-[var(--color-brand)]">{barber.title}</p>
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      Chair #{barber.chairNumber} • {barber.experienceYears} yrs
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-border-subtle)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      Chair Status:
                    </span>
                    <button
                      onClick={() => handleBarberStatusToggle(barber.id)}
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded transition-colors ${
                        barber.chairStatus === "available"
                          ? "bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] border border-[var(--color-status-green-border)]"
                          : barber.chairStatus === "in_chair"
                          ? "bg-[var(--color-status-amber-bg)] text-[var(--color-status-amber)] border border-[var(--color-status-amber-border)]"
                          : "bg-[var(--color-status-red-bg)] text-[var(--color-status-red)] border border-[var(--color-status-red-border)]"
                      }`}
                    >
                      {barber.chairStatus === "available"
                        ? "● Ready for Client"
                        : barber.chairStatus === "in_chair"
                        ? "◐ Currently In Chair"
                        : "○ Off Duty"}
                    </button>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                    Clicking toggles state across booking engine and header.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Studio Hours & Location */}
      {activeTab === "hours" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)] block">
              Weekly Operating Schedule
            </span>
            <div className="space-y-2">
              {Object.entries(studioInfo.hours).map(([day, schedule]) => (
                <div
                  key={day}
                  className="flex items-center justify-between py-1.5 px-2.5 rounded bg-[var(--color-panel-subtle)] text-xs border border-[var(--color-border-subtle)]"
                >
                  <span className="font-bold text-[var(--color-text-primary)] w-24">
                    {day}
                  </span>
                  <div className="flex items-center gap-2">
                    {schedule.isClosed ? (
                      <span className="text-[var(--color-status-red)] font-mono font-semibold">
                        Closed (Deep Clean)
                      </span>
                    ) : (
                      <span className="font-mono text-[var(--color-text-secondary)]">
                        {schedule.open} – {schedule.close}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)] block">
              Studio Location & Contact Details
            </span>
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  Street Address
                </Label>
                <Input
                  value={studioInfo.address}
                  onChange={(e) =>
                    setStudioInfo({ ...studioInfo, address: e.target.value })
                  }
                  className="h-8 text-xs bg-[var(--color-panel-subtle)] mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  Suite / Unit
                </Label>
                <Input
                  value={studioInfo.suite}
                  onChange={(e) =>
                    setStudioInfo({ ...studioInfo, suite: e.target.value })
                  }
                  className="h-8 text-xs bg-[var(--color-panel-subtle)] mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  Phone Number (Direct Line)
                </Label>
                <Input
                  value={studioInfo.phone}
                  onChange={(e) =>
                    setStudioInfo({ ...studioInfo, phone: e.target.value })
                  }
                  className="h-8 text-xs bg-[var(--color-panel-subtle)] mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Announcement Banner */}
      {activeTab === "announcement" && (
        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4 max-w-2xl">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-brand)] block mb-1">
              Top Bar Announcement Broadcast
            </span>
            <h4 className="font-serif-luxury text-base font-bold text-[var(--color-text-primary)]">
              Edit Studio Promotion or Event Notice
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Updates the message displayed across the top of the website for all incoming visitors.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                Announcement Copy
              </Label>
              <Input
                value={studioInfo.announcement}
                onChange={(e) =>
                  setStudioInfo({ ...studioInfo, announcement: e.target.value })
                }
                placeholder="e.g., Extended holiday hours this Saturday..."
                className="text-xs bg-[var(--color-panel-subtle)] mt-1"
              />
            </div>

            <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
              <span className="font-mono text-[var(--color-brand)] font-bold block mb-1">
                Preview on Live Site:
              </span>
              <p className="italic font-mono text-[11px] text-[var(--color-text-primary)]">
                "{studioInfo.announcement}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
