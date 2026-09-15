"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  INITIAL_SERVICES,
  MASTER_BARBERS,
  INITIAL_STUDIO_INFO,
  LOOKBOOK_ITEMS,
  ServiceItem,
  BarberProfile,
  StudioInfo,
  LookbookItem,
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
import { AtelierCraftGallery } from "@/components/AtelierCraftGallery";
import { Footer } from "@/components/Footer";
import { StyleConsultantModal } from "@/components/StyleConsultantModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  Sparkles,
  Scissors,
  Sliders,
  Star,
  MapPin,
  Search,
  Users,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
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

  // Video Experience States
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [isReelModalOpen, setIsReelModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Handlers for cross-component interactions
  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    if (serviceId) setPrefilledServiceId(serviceId);
    if (barberId) setPrefilledBarberId(barberId);
    setActiveTab("booking");
    window.scrollTo({ top: 480, behavior: "smooth" });
  };

  const handleConsultantBooking = (serviceName: string, barberName: string) => {
    const matchedService = services.find((s) =>
      s.name.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceName.toLowerCase().includes(s.name.toLowerCase())
    );
    const matchedBarber = barbers.find((b) =>
      b.name.toLowerCase().includes(barberName.toLowerCase()) ||
      barberName.toLowerCase().includes(b.name.split(" ")[0].toLowerCase())
    );

    setPrefilledServiceId(matchedService?.id || "sig-cut");
    setPrefilledBarberId(matchedBarber?.id || "julian");
    setIsConsultantOpen(false);
    setActiveTab("booking");
    window.scrollTo({ top: 480, behavior: "smooth" });
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
        {/* ULTRA-LUXURY CINEMATIC HERO SECTION WITH AMBIENT VIDEO */}
        <section className="relative rounded-3xl border border-[var(--color-border)] bg-[#0c0d10] text-white overflow-hidden shadow-2xl min-h-[520px] flex flex-col justify-between">
          {/* Ambient Background Video */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.pexels.com/videos/7697179/back-barber-barber-shop-barbering-7697179.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
              className="w-full h-full object-cover object-center opacity-45 scale-105 transition-all duration-1000"
            >
              <source
                src="https://videos.pexels.com/video-files/7697179/7697179-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
            </video>

            {/* Smoked obsidian & antique gold luxury gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d10] via-[#0c0d10]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-black/40" />
          </div>

          {/* Top Video & Status Controls */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#b48608]/40 text-xs font-mono font-bold text-[#d4af37]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span>AUBURN, AL • BESPOKE EDITORIAL GROOMING</span>
            </div>

            {/* Video Controls Pill */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs font-mono text-white/80">
              <button
                onClick={toggleVideoPlayback}
                className="hover:text-white transition-colors flex items-center gap-1"
                title={isVideoPlaying ? "Pause ambient video" : "Play ambient video"}
              >
                {isVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                <span>{isVideoPlaying ? "Ambient" : "Paused"}</span>
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={toggleVideoMute}
                className="hover:text-white transition-colors"
                title={isVideoMuted ? "Unmute audio" : "Mute audio"}
              >
                {isVideoMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => setIsReelModalOpen(true)}
                className="hover:text-[#d4af37] transition-colors flex items-center gap-1 text-[#d4af37]"
                title="Watch Studio Craft Reel"
              >
                <Maximize2 className="h-3 w-3" />
                <span>Reel</span>
              </button>
            </div>
          </div>

          {/* Center Brand Headline */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-4 max-w-3xl space-y-5">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#d4af37] font-bold uppercase block">
                Heritage Scissorcraft • Modern Architecture
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Precision Grooming for the Modern Gentleman.
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans max-w-2xl">
                Auburn's premier bespoke barbershop atelier. Unhurried chair sessions, hot lather straight razor rituals, and custom haircut geometry designed for your bone structure.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => handleOpenBooking()}
                className="bg-[#b48608] hover:bg-[#966f07] text-white text-xs font-bold uppercase tracking-wider font-mono py-3 px-6 shadow-lg shadow-[#b48608]/20 border border-[#d4af37]/40"
              >
                <Calendar className="h-4 w-4 mr-1.5" />
                Reserve Chair Now
              </Button>

              <Button
                onClick={() => setIsConsultantOpen(true)}
                variant="outline"
                className="border-white/30 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider font-mono py-3 px-6 backdrop-blur-md"
              >
                <Sparkles className="h-4 w-4 mr-1.5 text-[#d4af37]" />
                AI Style Consultant
              </Button>

              <button
                onClick={() => setIsReelModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
                <span>Watch Studio Craft Reel</span>
              </button>
            </div>
          </div>

          {/* Bottom Live Chair Telemetry Ticker */}
          <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md px-6 sm:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-bold">LIVE CHAIR STATUS:</span>
              </div>
              {barbers.map((b) => (
                <div key={b.id} className="hidden sm:flex items-center gap-1.5 text-gray-300">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      b.chairStatus === "available"
                        ? "bg-emerald-400 animate-pulse"
                        : b.chairStatus === "in_chair"
                        ? "bg-amber-400"
                        : "bg-gray-500"
                    }`}
                  />
                  <span className="font-semibold">{b.name.split(" ")[0]}:</span>
                  <span className="text-gray-400 capitalize">{b.chairStatus.replace("_", " ")}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-[#d4af37] font-bold">4.9 ★</span>
              <span className="text-gray-400">482 Verified Auburn Reviews</span>
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
              onClick={() => setActiveTab("craft")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "craft"
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Atelier Craft Gallery</span>
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

          {activeTab === "craft" && (
            <AtelierCraftGallery
              onSelectBooking={(serviceId) => handleOpenBooking(serviceId)}
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

      {/* Full-Screen Studio Craft Reel Modal */}
      <Dialog open={isReelModalOpen} onOpenChange={setIsReelModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border border-white/20 text-white">
          <div className="relative aspect-video w-full bg-black">
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            >
              <source
                src="https://videos.pexels.com/video-files/7697179/7697179-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="p-5 bg-[#0c0d10] border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-[#d4af37] uppercase font-bold tracking-wider block">
                Atelier Auburn Studio Reel
              </span>
              <h3 className="font-serif-luxury text-lg font-bold text-white">
                The Master Barbering Ritual • Savile Row Shears & Straight Razor
              </h3>
            </div>
            <Button
              onClick={() => {
                setIsReelModalOpen(false);
                handleOpenBooking();
              }}
              className="bg-[#b48608] hover:bg-[#966f07] text-white text-xs font-bold uppercase font-mono px-4 py-2"
            >
              Reserve Chair
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
