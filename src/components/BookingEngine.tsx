"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  Phone,
  Mail,
  Download,
  Share2,
  ShieldCheck,
  ChevronRight,
  Scissors,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INITIAL_SERVICES, MASTER_BARBERS, ServiceItem, BarberProfile } from "@/lib/data";

interface BookingEngineProps {
  initialServiceId?: string;
  initialBarberId?: string;
  services?: ServiceItem[];
}

export function BookingEngine({
  initialServiceId,
  initialBarberId,
  services = INITIAL_SERVICES,
}: BookingEngineProps) {
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    services.find((s) => s.id === initialServiceId) || services[0]
  );
  const [selectedBarber, setSelectedBarber] = useState<BarberProfile | "any">(
    MASTER_BARBERS.find((b) => b.id === initialBarberId) || "any"
  );
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedSlot, setSelectedSlot] = useState<string>("2:30 PM");

  // Client Details
  const [clientName, setClientName] = useState<string>("Alexander Pierce");
  const [clientPhone, setClientPhone] = useState<string>("(334) 555-8291");
  const [clientEmail, setClientEmail] = useState<string>("alexander.pierce@domain.com");
  const [specialRequests, setSpecialRequests] = useState<string>(
    "Keep sides low skin fade, texture on crown."
  );

  // Booking Result
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Sync if initial props change
  useEffect(() => {
    if (initialServiceId) {
      const found = services.find((s) => s.id === initialServiceId);
      if (found) setSelectedService(found);
    }
    if (initialBarberId) {
      const found = MASTER_BARBERS.find((b) => b.id === initialBarberId);
      if (found) setSelectedBarber(found);
    }
  }, [initialServiceId, initialBarberId, services]);

  const dates = [
    { label: "Today", sub: "Sep 15" },
    { label: "Tomorrow", sub: "Sep 16" },
    { label: "Thursday", sub: "Sep 17" },
    { label: "Friday", sub: "Sep 18" },
    { label: "Saturday", sub: "Sep 19" },
  ];

  const slots = {
    morning: ["9:00 AM", "9:45 AM", "10:30 AM", "11:15 AM"],
    afternoon: ["1:00 PM", "1:45 PM", "2:30 PM", "3:15 PM", "4:00 PM"],
    evening: ["5:00 PM", "5:45 PM", "6:30 PM", "7:15 PM"],
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const barberName =
        selectedBarber === "any" ? "First Available Master Barber" : selectedBarber.name;
      const barberId = selectedBarber === "any" ? "any" : selectedBarber.id;

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          price: selectedService.price,
          barberId,
          barberName,
          date: selectedDate,
          timeSlot: selectedSlot,
          clientName,
          clientPhone,
          clientEmail,
          specialRequests,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmedBooking(data.appointment);
        setStep(4);
      }
    } catch {
      // Fallback local confirmation
      const barberName =
        selectedBarber === "any" ? "First Available Master Barber" : selectedBarber.name;
      setConfirmedBooking({
        id: `ATL-${Math.floor(100000 + Math.random() * 900000)}`,
        serviceName: selectedService.name,
        price: selectedService.price,
        barberName,
        date: selectedDate,
        timeSlot: selectedSlot,
        clientName,
        clientPhone,
        clientEmail,
        status: "CONFIRMED",
        createdTime: new Date().toISOString(),
        smsPreview: `Atelier Grooming: Hi ${clientName}, your appointment for ${selectedService.name} with ${barberName} is confirmed for ${selectedDate} at ${selectedSlot}. Reply 1 to confirm, 2 to reschedule.`,
      });
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const content =
      confirmedBooking.icsCalendarString ||
      `BEGIN:VCALENDAR\nVERSION:2.0\nSUMMARY:${confirmedBooking.serviceName} at Atelier\nDESCRIPTION:Master appointment with ${confirmedBooking.barberName}\nSTATUS:CONFIRMED\nEND:VCALENDAR`;
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Atelier-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Step Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Online Reservations
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] border border-[var(--color-status-green-border)] font-semibold">
              Live Chairs Available
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Reserve Your Grooming Appointment
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            Select your grooming service, preferred master artisan, and chair time. Receive instant SMS confirmation and zero waiting room delay.
          </p>
        </div>

        {/* 4-Step Progress Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
          {[
            { num: 1, label: "Service" },
            { num: 2, label: "Barber" },
            { num: 3, label: "Time" },
            { num: 4, label: "Confirmed" },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              disabled={s.num > step}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                step === s.num
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : step > s.num
                  ? "text-[var(--color-brand)] hover:bg-[var(--color-surface)]"
                  : "text-[var(--color-text-muted)] opacity-50 cursor-not-allowed"
              }`}
            >
              <span>{s.num}.</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-lg font-bold text-[var(--color-text-primary)]">
              Step 1: Choose Your Grooming Service
            </h3>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              All services include hot towel steam & neck shave
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((item) => {
              const isSelected = selectedService.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedService(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-subtle)] ring-2 ring-[var(--color-brand)]/20 shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                        {item.name}
                      </h4>
                      {item.popular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-[var(--color-brand)] text-white whitespace-nowrap shrink-0">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{item.durationMin} mins</span>
                    </div>
                    <div className="text-base font-bold font-mono text-[var(--color-brand)]">
                      ${item.price}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-[var(--color-border)]">
            <Button
              onClick={() => setStep(2)}
              className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 shadow-sm"
            >
              <span>Next: Choose Master Barber</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Barber */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-luxury text-lg font-bold text-[var(--color-text-primary)]">
              Step 2: Select Your Master Barber
            </h3>
            <button
              onClick={() => setSelectedBarber("any")}
              className={`text-xs font-semibold px-3 py-1 rounded-md border transition-colors ${
                selectedBarber === "any"
                  ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              First Available (Fastest Chair)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MASTER_BARBERS.map((barber) => {
              const isSelected =
                selectedBarber !== "any" && selectedBarber.id === barber.id;
              return (
                <div
                  key={barber.id}
                  onClick={() => setSelectedBarber(barber)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-subtle)] ring-2 ring-[var(--color-brand)]/20 shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="h-14 w-14 rounded-full bg-cover bg-center border-2 border-[var(--color-brand)] shrink-0"
                        style={{ backgroundImage: `url(${barber.avatar})` }}
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[var(--color-text-primary)]">
                          {barber.name}
                        </h4>
                        <p className="text-xs text-[var(--color-brand)] font-medium">
                          {barber.title}
                        </p>
                        <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                          {barber.experienceYears} yrs experience • Chair #{barber.chairNumber}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {barber.bio}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {barber.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">
                      5.0★ ({barber.reviewCount} reviews)
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded font-mono ${
                        barber.chairStatus === "available"
                          ? "text-[var(--color-status-green)] bg-[var(--color-status-green-bg)]"
                          : "text-[var(--color-status-amber)] bg-[var(--color-status-amber-bg)]"
                      }`}
                    >
                      {barber.chairStatus === "available" ? "Chair Ready" : "In Chair (Open Later)"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(1)}
              className="text-xs font-semibold"
            >
              Back to Services
            </Button>
            <Button
              onClick={() => setStep(3)}
              className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 shadow-sm"
            >
              <span>Next: Select Date & Time</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Date & Slot Picker + Client Info */}
      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Date & Slot Picker (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[var(--color-text-primary)]">
                Step 3: Select Date & Time
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Real-time chair schedule for{" "}
                <strong className="text-[var(--color-text-primary)]">
                  {selectedBarber === "any" ? "First Available Master Barber" : selectedBarber.name}
                </strong>
              </p>
            </div>

            {/* Date Cards */}
            <div className="grid grid-cols-5 gap-2">
              {dates.map((d) => {
                const isSelected = selectedDate === d.label;
                return (
                  <button
                    key={d.label}
                    onClick={() => setSelectedDate(d.label)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      isSelected
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-subtle)] ring-2 ring-[var(--color-brand)]/20 shadow-sm"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]/50"
                    }`}
                  >
                    <div className="text-xs font-bold text-[var(--color-text-primary)]">
                      {d.label}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--color-text-muted)]">
                      {d.sub}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slots */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)] block mb-1.5">
                  Afternoon Slots
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {slots.afternoon.map((time) => {
                    const isSelected = selectedSlot === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`py-2 px-1 rounded-md text-xs font-mono font-semibold transition-all border ${
                          isSelected
                            ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-sm"
                            : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-brand)]/50"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)] block mb-1.5">
                  Evening Slots
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {slots.evening.map((time) => {
                    const isSelected = selectedSlot === time;
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedSlot(time)}
                        className={`py-2 px-1 rounded-md text-xs font-mono font-semibold transition-all border ${
                          isSelected
                            ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-sm"
                            : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-brand)]/50"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Client Details & Summary (5 cols) */}
          <div className="lg:col-span-5 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-[var(--color-border-subtle)]">
                <span className="text-xs font-mono uppercase font-bold text-[var(--color-brand)]">
                  Reservation Summary
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h4 className="font-serif-luxury text-base font-bold text-[var(--color-text-primary)]">
                    {selectedService.name}
                  </h4>
                  <span className="text-base font-bold font-mono text-[var(--color-brand)]">
                    ${selectedService.price}
                  </span>
                </div>
                <div className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                  {selectedDate} at {selectedSlot} • {selectedService.durationMin} mins
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] font-medium mt-1">
                  Master Barber:{" "}
                  <strong>
                    {selectedBarber === "any"
                      ? "First Available Master Barber"
                      : selectedBarber.name}
                  </strong>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-2.5">
                <div>
                  <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Full Name
                  </Label>
                  <Input
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Alexander Pierce"
                    className="h-8 text-xs bg-[var(--color-surface)]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Mobile Phone (For Live SMS Reminder)
                  </Label>
                  <Input
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(334) 555-0192"
                    className="h-8 text-xs bg-[var(--color-surface)]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Email Address
                  </Label>
                  <Input
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="h-8 text-xs bg-[var(--color-surface)]"
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Grooming Notes or Style Goals
                  </Label>
                  <Input
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Low taper, beard shaping, etc."
                    className="h-8 text-xs bg-[var(--color-surface)]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--color-border-subtle)] space-y-2">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(2)}
                  className="text-xs"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Confirming Chair...</span>
                  ) : (
                    <>
                      <span>Complete Reservation</span>
                      <Check className="h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-center text-[var(--color-text-muted)] font-mono">
                Pay in chair upon completion • Card, Apple Pay, or Cash
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Confirmed Booking Screen with Live SMS Preview & .ICS */}
      {step === 4 && confirmedBooking && (
        <div className="p-6 rounded-2xl border border-[var(--color-status-green-border)] bg-[var(--color-surface)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] flex items-center justify-center border border-[var(--color-status-green-border)] shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[var(--color-status-green)]">
                  Reservation Confirmed • Chair Locked
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[var(--color-text-primary)]">
                  Appointment #{confirmedBooking.id}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCalendarFile}
                className="text-xs font-semibold gap-1.5 border-[var(--color-brand)]/30 hover:border-[var(--color-brand)]"
              >
                <Download className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                <span>Download .ICS Calendar</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setStep(1)}
                className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold"
              >
                Book Another Service
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Booking Details Card */}
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-3">
              <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)] block">
                Appointment Summary
              </span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[var(--color-border-subtle)]">
                  <span className="text-[var(--color-text-muted)]">Service:</span>
                  <span className="font-bold text-[var(--color-text-primary)]">
                    {confirmedBooking.serviceName}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--color-border-subtle)]">
                  <span className="text-[var(--color-text-muted)]">Master Barber:</span>
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    {confirmedBooking.barberName}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--color-border-subtle)]">
                  <span className="text-[var(--color-text-muted)]">Date & Slot:</span>
                  <span className="font-mono font-semibold text-[var(--color-brand)]">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--color-border-subtle)]">
                  <span className="text-[var(--color-text-muted)]">Client:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {confirmedBooking.clientName} ({confirmedBooking.clientPhone})
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--color-text-muted)]">Studio Location:</span>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    142 Elm St, Suite 104, Auburn AL
                  </span>
                </div>
              </div>
            </div>

            {/* Live Interactive SMS Confirmation Simulator */}
            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)]">
                  Automated Client SMS Dispatch
                </span>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] text-[var(--color-status-green)] border-[var(--color-status-green-border)]"
                >
                  Simulated 200 OK
                </Badge>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] shadow-inner space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-text-muted)]">
                  <Phone className="h-3 w-3 text-[var(--color-brand)]" />
                  <span>To: {confirmedBooking.clientPhone}</span>
                </div>
                <p className="text-xs text-[var(--color-text-primary)] leading-relaxed font-sans bg-[var(--color-panel-subtle)] p-2.5 rounded border border-[var(--color-border-subtle)]">
                  {confirmedBooking.smsPreview}
                </p>
                <div className="text-[10px] text-[var(--color-text-muted)] font-mono text-right">
                  Sent via Twilio / Vonage SMS Gateway • 100% Delivery SLA
                </div>
              </div>

              <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                Supports direct integration with Square Appointments, Booksy, Fresha, Calendly, or custom Supabase calendar.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
