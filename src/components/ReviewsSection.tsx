"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Award,
  ThumbsUp,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GOOGLE_REVIEWS, GoogleReview } from "@/lib/data";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS);
  const [filter, setFilter] = useState<string>("all");
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  // New review form
  const [authorName, setAuthorName] = useState<string>("");
  const [haircutType, setHaircutType] = useState<string>("The Signature Atelier Haircut");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) return;

    const newRev: GoogleReview = {
      id: `rev-${Date.now()}`,
      author: authorName,
      rating,
      date: "Just now",
      verified: true,
      haircutType,
      barberName: "Julian Vance",
      comment,
      ownerReply: "Thank you for the review! Honored to craft your haircut.",
    };

    setReviews([newRev, ...reviews]);
    setReviewDialogOpen(false);
    setAuthorName("");
    setComment("");
  };

  const filteredReviews =
    filter === "all"
      ? reviews
      : filter === "5star"
      ? reviews.filter((r) => r.rating === 5)
      : reviews.filter((r) =>
          r.haircutType.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="space-y-6">
      {/* Header & Google Places Badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-brand)]">
              Client Reputation
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-status-green-bg)] text-[var(--color-status-green)] border border-[var(--color-status-green-border)] font-semibold">
              Verified Google Places Feed
            </span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            Client Testimonials & Google Ratings
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-2xl">
            Real feedback from gentlemen who demand precision shear work, zero chair delays, and a luxurious studio experience.
          </p>
        </div>

        <Button
          onClick={() => setReviewDialogOpen(true)}
          className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold gap-1.5 whitespace-nowrap shrink-0 shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Write a Google Review</span>
        </Button>
      </div>

      {/* Google Reputation Benchmark Card */}
      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Overall Score (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[var(--color-border-subtle)] pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm text-[var(--color-text-primary)]">
                Google Customer Reviews
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold font-mono text-[var(--color-text-primary)]">
                4.9
              </span>
              <span className="text-sm text-[var(--color-text-muted)] font-mono">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 my-2 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] font-mono">
              Based on 482 verified client reviews
            </p>
          </div>

          {/* Center: Rating Distribution (5 cols) */}
          <div className="md:col-span-5 space-y-1.5 text-xs font-mono">
            {[
              { stars: 5, pct: 96, count: 462 },
              { stars: 4, pct: 4, count: 20 },
              { stars: 3, pct: 0, count: 0 },
              { stars: 2, pct: 0, count: 0 },
              { stars: 1, pct: 0, count: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-2">
                <span className="w-12 text-[var(--color-text-secondary)]">
                  {row.stars} stars
                </span>
                <div className="flex-1 h-2 rounded-full bg-[var(--color-panel-subtle)] overflow-hidden border border-[var(--color-border-subtle)]">
                  <div
                    className="h-full bg-[var(--color-brand)] rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[var(--color-text-muted)]">
                  {row.count}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Guarantee Badge (3 cols) */}
          <div className="md:col-span-3 p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border-subtle)] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-primary)]">
              <Award className="h-4 w-4 text-[var(--color-brand)] shrink-0" />
              <span>100% Satisfaction SLA</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-snug">
              If your neckline or fade needs any micro-touchup within 48 hours, drop into any chair with zero charge.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
        {[
          { id: "all", label: "All Reviews (482)" },
          { id: "5star", label: "5 Stars (462)" },
          { id: "beard", label: "Beard Sculpting" },
          { id: "fade", label: "Skin Fades" },
          { id: "ritual", label: "Executive Ritual" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
              filter === btn.id
                ? "bg-[var(--color-brand)] text-white"
                : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-[var(--color-brand-subtle)] text-[var(--color-brand)] font-bold text-xs flex items-center justify-center border border-[var(--color-brand)]/20 font-mono">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-[var(--color-text-primary)]">
                        {rev.author}
                      </h4>
                      {rev.verified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-status-green)]" />
                      )}
                    </div>
                    <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {rev.date} • Verified Client
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>

              <div className="mt-2.5 inline-block">
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] text-[var(--color-brand)] border-[var(--color-brand)]/30"
                >
                  {rev.haircutType} ({rev.barberName})
                </Badge>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            {/* Owner Reply if present */}
            {rev.ownerReply && (
              <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] pl-3 border-l-2 border-l-[var(--color-brand)] text-[11px] space-y-1">
                <span className="font-mono font-bold text-[var(--color-text-primary)] block">
                  Response from Atelier Management:
                </span>
                <p className="text-[var(--color-text-muted)] italic">
                  "{rev.ownerReply}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Submission Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-md bg-[var(--color-surface)] border-[var(--color-border)] p-6">
          <DialogHeader>
            <DialogTitle className="font-serif-luxury text-lg font-bold text-[var(--color-text-primary)]">
              Submit a Client Review
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--color-text-secondary)]">
              Share your experience with our master barbers. Reviews post directly to the verified feed.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReview} className="space-y-3 pt-2">
            <div>
              <Label className="text-xs font-semibold">Your Name</Label>
              <Input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. William Sterling"
                className="h-8 text-xs mt-1"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Haircut or Service Received</Label>
              <Input
                value={haircutType}
                onChange={(e) => setHaircutType(e.target.value)}
                placeholder="Signature Haircut, Beard Sculpt, etc."
                className="h-8 text-xs mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Star Rating</Label>
              <div className="flex items-center gap-2 mt-1">
                {[5, 4, 3, 2, 1].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold border transition-colors ${
                      rating === num
                        ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                        : "bg-[var(--color-panel-subtle)] border-[var(--color-border)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {num} ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Your Feedback</Label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Describe the consultation, scissors, razor, or atmosphere..."
                className="w-full text-xs p-2 rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] text-white text-xs font-semibold py-2"
            >
              Post Review to Live Feed
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
