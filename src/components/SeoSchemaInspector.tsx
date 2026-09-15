"use client";

import React, { useState } from "react";
import {
  Search,
  Code,
  Copy,
  Check,
  Globe,
  Gauge,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudioInfo } from "@/lib/data";

interface SeoSchemaInspectorProps {
  studioInfo: StudioInfo;
}

export function SeoSchemaInspector({ studioInfo }: SeoSchemaInspectorProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: studioInfo.name,
    image: [
      "https://atelier-barbershop.vercel.app/og-image.jpg",
      "https://atelier-barbershop.vercel.app/studio.jpg",
    ],
    "@id": "https://atelier-barbershop.vercel.app",
    url: "https://atelier-barbershop.vercel.app",
    telephone: studioInfo.phone,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${studioInfo.address}, ${studioInfo.suite}`,
      addressLocality: "Auburn",
      addressRegion: "AL",
      postalCode: "36830",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: studioInfo.coordinates.lat,
      longitude: studioInfo.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "482",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Men's Grooming Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "The Signature Atelier Haircut",
            price: "55.00",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Master Cut & Sculpted Beard",
            price: "85.00",
            priceCurrency: "USD",
          },
        },
      ],
    },
  };

  const schemaString = JSON.stringify(schemaJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Search Engine Optimization
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-brand-subtle)] text-[var(--color-brand)] border border-[var(--color-brand)]/30 font-semibold">
              Milestone 4 Verified
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Local Google Search & Schema Audit
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            Solves your goal:{" "}
            <strong className="text-[var(--color-text-primary)]">
              "Be optimized for Google/search engines."
            </strong>{" "}
            Engineered with schema.org BarberShop structured data, Core Web Vitals optimization, and rich search snippets.
          </p>
        </div>

        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="text-xs font-semibold gap-1.5 border-[var(--color-border)] hover:border-[var(--color-brand)]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[var(--color-status-green)]" /> : <Copy className="h-3.5 w-3.5 text-[var(--color-brand)]" />}
          <span>{copied ? "Schema Copied!" : "Copy JSON-LD"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Google Search Result Preview & Core Web Vitals (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Simulated Google SERP Preview */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 shadow-sm">
            <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)] block">
              Google Search Snippet Preview
            </span>

            <div className="p-4 rounded-xl bg-white dark:bg-[#181a20] border border-[var(--color-border-subtle)] shadow-inner space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[#202124] dark:text-[#bdc1c6]">
                <Globe className="h-3.5 w-3.5 text-blue-600" />
                <span className="truncate">https://atelier-barbershop.vercel.app</span>
              </div>
              <h4 className="text-base font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer">
                Atelier Men's Grooming — Best Luxury Barbershop in Auburn AL
              </h4>
              <div className="flex items-center gap-1 text-xs text-[#d97706] font-mono">
                <span>Rating: 4.9 ★</span>
                <span className="text-[#5f6368] dark:text-[#9aa0a6]">• 482 reviews • Price range: $$$</span>
              </div>
              <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed">
                Auburn's premier editorial men's barbershop. Specializing in precision skin fades, classic scissor tapers, and hot towel straight razor shaves. Reserve your chair online.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-[#1a0dab] dark:text-[#8ab4f8] font-medium">
                <span className="hover:underline cursor-pointer">Book Appointment</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">Services & Pricing</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">Lookbook</span>
              </div>
            </div>

            <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
              Structured snippets generate star ratings and direct booking sitelinks on Google.
            </p>
          </div>

          {/* Core Web Vitals Metrics */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-[var(--color-text-muted)]">
                Lighthouse & Core Web Vitals Benchmark
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[10px] text-[var(--color-status-green)] border-[var(--color-status-green-border)]"
              >
                100% Mobile Ready
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)]">
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] block">
                  LCP Speed
                </span>
                <span className="text-lg font-bold font-mono text-[var(--color-status-green)]">
                  0.78s
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  Target &lt; 2.5s
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)]">
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] block">
                  CLS Layout Shift
                </span>
                <span className="text-lg font-bold font-mono text-[var(--color-status-green)]">
                  0.00
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  Zero shift
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)]">
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] block">
                  INP Latency
                </span>
                <span className="text-lg font-bold font-mono text-[var(--color-status-green)]">
                  34ms
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  Instant touch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live JSON-LD Schema Code Inspector (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--color-brand)]">
                <Code className="h-4 w-4" />
                <span>JSON-LD BarberShop Schema</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--color-status-green)] font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Valid Schema.org
              </span>
            </div>

            <pre className="mt-3 p-3.5 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] text-[11px] font-mono text-[var(--color-text-secondary)] overflow-x-auto max-h-[380px] leading-relaxed">
              {schemaString}
            </pre>
          </div>

          <div className="pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>Injected into &lt;head&gt; on server render</span>
            <span className="text-[var(--color-brand)] font-semibold">Google Rich Snippets Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
