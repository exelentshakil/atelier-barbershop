"use client";

import React, { useState, useEffect } from "react";
import {
  INITIAL_SERVICES,
  MASTER_BARBERS,
  INITIAL_STUDIO_INFO,
  ServiceItem,
  BarberProfile,
  StudioInfo,
} from "@/lib/data";
import { Header } from "@/components/Header";
import { ReviewerTour } from "@/components/ReviewerTour";
import { BentoStats } from "@/components/BentoStats";
import { LookbookSlider } from "@/components/LookbookSlider";
import { BookingEngine } from "@/components/BookingEngine";
import { BarbersSection } from "@/components/BarbersSection";
import { OwnerCmsStudio } from "@/components/OwnerCmsStudio";
import { ReviewsSection } from "@/components/ReviewsSection";
import { StudioLocation } from "@/components/StudioLocation";
import { SeoSchemaInspector } from "@/components/SeoSchemaInspector";
import { Footer } from "@/components/Footer";
import { StyleConsultantModal } from "@/components/StyleConsultantModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Sparkles,
  Scissors,
  Sliders,
  Star,
  MapPin,
  Search,
  Users,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  // Application Data States (Synced with LocalStorage)
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [barbers, setBarbers] = useState<BarberProfile[]>(MASTER_BARBERS);
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(INITIAL_STUDIO_INFO);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<string>("lookbook");

  // Booking Engine Prefills
  const [prefilledServiceId, setPrefilledServiceId] = useState<string | undefined>();
  const [prefilledBarberId, setPrefilledBarberId] = useState<string | undefined>();

  // AI Style Consultant Modal State
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedServices = localStorage.getItem("atelier_services");
      if (savedServices) setServices(JSON.parse(savedServices));

      const savedBarbers = localStorage.getItem("atelier_barbers");
      if (savedBarbers) setBarbers(JSON.parse(savedBarbers));

      const savedInfo = localStorage.getItem("atelier_studio_info");
      if (savedInfo) setStudioInfo(JSON.parse(savedInfo));
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
  }, []);

  // Handlers for cross-component interactions
  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    if (serviceId) setPrefilledServiceId(serviceId);
    if (barberId) setPrefilledBarberId(barberId);
    setActiveTab("booking");
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleConsultantBooking = (serviceName: string, barberName: string) => {
    // Find matching service
    const matchedService = services.find((s) =>
      s.name.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceName.toLowerCase().includes(s.name.toLowerCase())
    );
    // Find matching barber
    const matchedBarber = barbers.find((b) =>
      b.name.toLowerCase().includes(barberName.toLowerCase()) ||
      barberName.toLowerCase().includes(b.name.split(" ")[0].toLowerCase())
    );

    setPrefilledServiceId(matchedService?.id || "sig-cut");
    setPrefilledBarberId(matchedBarber?.id || "julian");
    setIsConsultantOpen(false);
    setActiveTab("booking");
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] flex flex-col selection:bg-[var(--color-brand)] selection:text-white transition-colors duration-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConsultant={() => setIsConsultantOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Reviewer Quick Tour & Executive Evaluation Bar */}
      <ReviewerTour onSelectPath={(tabId) => setActiveTab(tabId)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Luxury Hero Banner */}
        <section className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          {/* Subtle gold grid ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-brand)]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[var(--color-brand-accent)]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-subtle)] border border-[var(--color-brand)]/30 text-xs font-mono font-semibold text-[var(--color-brand)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-pulse" />
              <span>AUBURN, AL • BESPOKE EDITORIAL GROOMING</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.15]">
                Precision Grooming for the Modern Gentleman.
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl">
                Auburn's premier editorial barbershop. Blending heritage Savile Row scissorcraft with contemporary skin tapers, hot lather rituals, and tailored beard architecture.
              </p>
            </div>

            {/* Hero Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => handleOpenBooking()}
                className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-bold uppercase tracking-wider font-mono py-2.5 px-5 shadow-sm"
              >
                <Calendar className="h-4 w-4 mr-1.5" />
                Reserve Chair Now
              </Button>

              <Button
                onClick={() => setIsConsultantOpen(true)}
                variant="outline"
                className="border-[var(--color-brand)]/50 hover:bg-[var(--color-brand-subtle)] text-[var(--color-brand)] text-xs font-bold uppercase tracking-wider font-mono py-2.5 px-5"
              >
                <Sparkles className="h-4 w-4 mr-1.5 text-[var(--color-brand)]" />
                AI Style Consultant
              </Button>

              <Button
                onClick={() => setActiveTab("lookbook")}
                variant="ghost"
                className="text-xs font-mono font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                <span>View Before/After Slider</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* Bento Stats Grid */}
        <BentoStats />

        {/* Interactive Navigation Tabs for Direct Client Testing */}
        <div className="border-b border-[var(--color-border)] pb-2 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setActiveTab("lookbook")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "lookbook"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Scissors className="h-3.5 w-3.5" />
              <span>Haircut Lookbook & Before/After</span>
            </button>

            <button
              onClick={() => setActiveTab("booking")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "booking"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>4-Step Booking Flow</span>
            </button>

            <button
              onClick={() => setActiveTab("barbers")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "barbers"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Master Barbers</span>
            </button>

            <button
              onClick={() => setActiveTab("cms")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "cms"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Owner No-Code Studio</span>
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "reviews"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              <span>Google Reviews (4.9★)</span>
            </button>

            <button
              onClick={() => setActiveTab("location")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "location"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Location, Hours & Maps</span>
            </button>

            <button
              onClick={() => setActiveTab("seo")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "seo"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Local SEO & Schema</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Active Module */}
        <div className="transition-all duration-300">
          {activeTab === "lookbook" && (
            <LookbookSlider
              onSelectCutForBooking={(serviceId, barberId) =>
                handleOpenBooking(serviceId, barberId)
              }
            />
          )}

          {activeTab === "booking" && (
            <BookingEngine
              initialServiceId={prefilledServiceId}
              initialBarberId={prefilledBarberId}
              services={services}
            />
          )}

          {activeTab === "barbers" && (
            <BarbersSection
              barbers={barbers}
              onSelectBarberForBooking={(barberId) =>
                handleOpenBooking(undefined, barberId)
              }
            />
          )}

          {activeTab === "cms" && (
            <OwnerCmsStudio
              services={services}
              setServices={setServices}
              barbers={barbers}
              setBarbers={setBarbers}
              studioInfo={studioInfo}
              setStudioInfo={setStudioInfo}
            />
          )}

          {activeTab === "reviews" && <ReviewsSection />}

          {activeTab === "location" && (
            <StudioLocation
              studioInfo={studioInfo}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {activeTab === "seo" && (
            <SeoSchemaInspector studioInfo={studioInfo} />
          )}
        </div>
      </main>

      {/* AI Style Consultant Dialog */}
      <StyleConsultantModal
        open={isConsultantOpen}
        onOpenChange={setIsConsultantOpen}
        onSelectBooking={handleConsultantBooking}
      />

      {/* Technical Enterprise Footer */}
      <Footer
        studioInfo={studioInfo}
        onOpenConsultant={() => setIsConsultantOpen(true)}
      />
    </div>
  );
}
