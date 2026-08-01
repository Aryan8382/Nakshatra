import { createFileRoute } from "@tanstack/react-router";
import {
  Armchair,
  BookOpen,
  ChevronDown,
  Coffee,
  Dumbbell,
  Footprints,
  Gamepad2,
  Leaf,
  PartyPopper,
  ShieldCheck,
  Sofa,
  Sparkles,
  ToyBrick,
  TreePine,
  Trophy,
  Video,
  Waves,
} from "lucide-react";

import heroImage from "@/assets/amenities/hero-amenities.jpg";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Nakshatra Gravity — 15+ Premium Amenities" },
      {
        name: "description",
        content:
          "Curate your life at Nakshatra Gravity with 15+ premium amenities including a gym, swimming pool, indoor & outdoor games, banquet hall, lush gardens, cafe, and more.",
      },
      {
        property: "og:title",
        content: "Nakshatra Gravity — 15+ Premium Amenities",
      },
      {
        property: "og:description",
        content:
          "Curate your life at Nakshatra Gravity with 15+ premium amenities including a gym, swimming pool, indoor & outdoor games, banquet hall, lush gardens, cafe, and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: heroImage }],
  }),
  component: Index,
});

const amenities = [
  {
    icon: Dumbbell,
    title: "Gym",
    description: "A fully-equipped fitness center for your daily wellness routine.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "A sparkling pool for laps, leisure, and weekend relaxation.",
  },
  {
    icon: Gamepad2,
    title: "Indoor Games",
    description: "Billiards, table tennis, and board games for all ages.",
  },
  {
    icon: Trophy,
    title: "Outdoor Games",
    description: "Cricket nets, basketball, and open-air courts for active living.",
  },
  {
    icon: PartyPopper,
    title: "Banquet Hall",
    description: "Elegant spaces to celebrate milestones with loved ones.",
  },
  {
    icon: ShieldCheck,
    title: "Security Cabin",
    description: "Professional manned entry for complete peace of mind.",
  },
  {
    icon: Video,
    title: "CCTV Camera",
    description: "24/7 surveillance across the entire community.",
  },
  {
    icon: TreePine,
    title: "Lush Garden",
    description: "Landscaped green pockets that breathe life into every corner.",
  },
  {
    icon: Coffee,
    title: "Cafe Area",
    description: "A cozy café corner for coffee, conversations, and remote work.",
  },
  {
    icon: Footprints,
    title: "Jogging Track",
    description: "Dedicated tracks woven through greenery for morning runs.",
  },
  {
    icon: Leaf,
    title: "Yoga Deck",
    description: "Open-air deck for yoga, meditation, and mindful mornings.",
  },
  {
    icon: ToyBrick,
    title: "Kids Play Area",
    description: "Safe, vibrant play zones designed for young explorers.",
  },
  {
    icon: Sofa,
    title: "Community Lounge",
    description: "A relaxed common room to meet neighbors and unwind.",
  },
  {
    icon: BookOpen,
    title: "Library",
    description: "A quiet reading room stocked for every kind of reader.",
  },
  {
    icon: Armchair,
    title: "Senior Citizen Corner",
    description: "Comfortable spaces designed for leisure and togetherness.",
  },
  {
    icon: Sparkles,
    title: "And Many More",
    description: "Surprise amenities that keep elevating your everyday life.",
  },
];

const stats = [
  { label: "Premium Amenities", value: "15+" },
  { label: "Landscaped Greens", value: "60%" },
  { label: "Security", value: "24/7" },
  { label: "Community Spaces", value: "8" },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">


      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="Nakshatra Gravity landscaped community with pool and gardens at sunset"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/50" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
          <span
            className="animate-fade-in-up mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            style={{ animationDelay: "100ms" }}
          >
            Welcome to Nakshatra Gravity
          </span>
          <h1
            className="animate-fade-in-up max-w-4xl text-balance font-serif text-5xl font-semibold leading-tight text-foreground sm:text-6xl md:text-7xl"
            style={{ animationDelay: "200ms" }}
          >
            Curate your life with{" "}
            <span className="text-primary">15+ premium amenities</span>
          </h1>
          <p
            className="animate-fade-in-up mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
            style={{ animationDelay: "300ms" }}
          >
            Thoughtfully designed spaces for wellness, recreation, and connection — every detail
            elevates the way you live.
          </p>
          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="#amenities"
              className="rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Explore Amenities
            </a>
            <a
              href="#contact"
              className="rounded-full border border-foreground/20 bg-background/80 px-8 py-3 text-base font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              Schedule a Visit
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float">
          <ChevronDown className="h-6 w-6 text-foreground/60" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-20 mx-auto -mt-20 max-w-6xl px-6">
        <div
          className="animate-fade-in-up grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl sm:grid-cols-4"
          style={{ animationDelay: "500ms" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-card p-6 text-center"
            >
              <span className="font-serif text-3xl font-semibold text-primary">{stat.value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities grid */}
      <section id="amenities" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-accent/30 px-4 py-1.5 text-sm font-medium text-accent-foreground">
              Designed for you
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
              Amenities that enrich every day
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground">
              From fitness and recreation to quiet corners and celebration spaces, Nakshatra
              Gravity brings your ideal lifestyle home.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {amenities.map((amenity, index) => (
              <div
                key={amenity.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 animate-fade-in-up hover:border-primary/30 hover-lift"
                style={{ animationDelay: `${600 + index * 75}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-secondary p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <amenity.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-card-foreground">
                  {amenity.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="border-t border-border bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Ready to experience Nakshatra Gravity?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Book a visit and discover how 15+ amenities can reshape your everyday life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#amenities"
              className="rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Amenities
            </a>
            <a
              href="#"
              className="rounded-full border border-border bg-card px-8 py-3 font-medium text-foreground transition-colors hover:bg-background"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nakshatra Gravity. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
