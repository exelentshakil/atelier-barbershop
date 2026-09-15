import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Atelier Men's Grooming — Bespoke Editorial Barbershop & Studio",
  description: "High-end masculine editorial barbershop web platform featuring interactive lookbook transformations, seamless 4-step appointment booking, and live owner CMS studio.",
  openGraph: {
    title: "Atelier Men's Grooming — Editorial Barbershop & Studio",
    description: "Master craftsmanship, haircut lookbook, and online appointment booking.",
    url: "https://atelier-barbershop.vercel.app",
    siteName: "Atelier Men's Grooming",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] antialiased selection:bg-[var(--color-brand)] selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          {/* Centralized Traffic Hub Pixel */}
          <img
            src="https://demo-traffic.vercel.app/api/px?p=atelier-barbershop"
            alt=""
            width={1}
            height={1}
            style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
