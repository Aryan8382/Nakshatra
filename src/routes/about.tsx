import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";

import ch1 from "@/assets/about/ch1-1992.jpg";
import ch2 from "@/assets/about/ch2-2001.jpg";
import ch3 from "@/assets/about/ch3-2010.jpg";
import ch4 from "@/assets/about/ch4-2014.jpg";
import ch5 from "@/assets/about/ch5-2020.jpg";
import ch6 from "@/assets/about/ch6-2021.jpg";
import ch7 from "@/assets/about/ch7-2022.jpg";
import ch8 from "@/assets/about/ch8-2024.jpg";
import ch9 from "@/assets/about/ch9-gravity.jpg";
import founderImg from "@/assets/about/founder.jpg";
import cofounderImg from "@/assets/about/cofounder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Nakshatra Legacy — A Cinematic About Us" },
      {
        name: "description",
        content:
          "An interactive cinematic film tracing 30+ years of Nakshatra Group — from the first blueprint in 1992 to Gravity in Kudasan.",
      },
      { property: "og:title", content: "The Nakshatra Legacy — A Cinematic About Us" },
      {
        property: "og:description",
        content: "Watch three decades of vision unfold, scene by scene.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ch9 },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ch9 },
    ],
  }),
  component: Cinema,
});

/* ------------------------------------------------------------------ */
/*  Scene definitions                                                   */
/* ------------------------------------------------------------------ */

type Scene = {
  id: string;
  duration: number; // ms
  render: (progress: number) => ReactNode; // progress 0..1
};

/* ---- reusable film chrome ---- */

function FilmFrame({ children, slate, code }: { children: ReactNode; slate?: string; code?: string }) {
  // parse slate like "ACT I · 1992"  →  kicker / index
  const parts = (slate ?? "REEL · 01").split("·").map((s) => s.trim());
  const kicker = parts[0] ?? "";
  const index = parts[1] ?? "";
  return (
    <div className="absolute inset-0 bg-[color:var(--ink)] scanline">
      {/* scene content */}
      <div className="absolute inset-0 overflow-hidden">{children}</div>

      {/* vertical letterbox bars */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 md:w-10 bg-black z-30" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 md:w-10 bg-black z-30" />

      {/* left column scene index */}
      <div className="pointer-events-none absolute left-12 md:left-16 top-10 z-40 flex flex-col gap-2">
        <span className="font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase">
          {kicker || "Chronicle"}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-2xl text-white/90 tabular-nums">{index || "—"}</span>
        </div>
        <div className="mt-3 h-24 w-px bg-white/10" />
      </div>

      {/* top-right auto-advance */}
      <div className="pointer-events-none absolute right-12 md:right-16 top-10 z-40 flex items-center gap-3">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--gold)]/50 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
        </span>
        <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">
          {code ?? "Auto-Advance Active"}
        </span>
      </div>
    </div>
  );
}

function SceneImage({ src, filter, scale = 1, opacity = 1 }: { src: string; filter?: string; scale?: number; opacity?: number }) {
  return (
    <div
      className={`absolute inset-0 ${filter ?? ""}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `scale(${scale})`,
        opacity,
        transition: "transform 200ms linear, opacity 200ms linear",
      }}
    />
  );
}

/* ---- Poster card: image + text side-by-side, no overlap ---- */

function CornerMarks() {
  const base = "absolute w-4 h-4 md:w-5 md:h-5 border-[color:var(--gold)]/70";
  return (
    <>
      <span className={`${base} top-2 left-2 border-t border-l`} />
      <span className={`${base} top-2 right-2 border-t border-r`} />
      <span className={`${base} bottom-2 left-2 border-b border-l`} />
      <span className={`${base} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

function PosterScene({
  img,
  filter,
  imgScale = 1,
  overlay,
  kicker,
  roman,
  title,
  sub,
  counter,
  counterLabel,
}: {
  img: string;
  filter?: string;
  imgScale?: number;
  overlay?: ReactNode;
  kicker: string;
  roman: string;
  title: string;
  sub?: string;
  counter?: string;
  counterLabel?: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-16 md:px-24 py-16">
      <motion.article
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1180px] max-h-full grid grid-cols-1 md:grid-cols-[1.2fr_1fr] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)] border border-[color:var(--gold)]/25 bg-black"
        style={{ aspectRatio: "16 / 8.2" }}
      >
        {/* IMAGE PANEL */}
        <div className="relative overflow-hidden">
          <SceneImage src={img} filter={`${filter ?? ""} slow-zoom`} scale={imgScale} />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
          <div className="absolute inset-0 vignette" />
          {overlay && <div className="absolute inset-0">{overlay}</div>}

          {/* film-stock stamp */}
          <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[9px] tracking-[0.4em] text-white/55 uppercase">
            <span>Nakshatra · 35mm</span>
            <span className="text-white/30">Kodak Vision</span>
          </div>

          {/* frame corners */}
          <CornerMarks />
        </div>

        {/* TEXT PANEL */}
        <div className="relative flex flex-col justify-between p-8 md:p-12 bg-[oklch(0.045_0.005_60)] border-l border-[color:var(--gold)]/15">
          {/* top row: kicker + roman */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex items-start justify-between gap-6"
          >
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.5em] text-white/45 uppercase leading-relaxed">
              {kicker}
            </span>
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-[color:var(--gold)]/70 uppercase whitespace-nowrap">
              {roman}
            </span>
          </motion.div>

          {/* main title block */}
          <div className="flex flex-col gap-5 py-6">
            {counter && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-baseline gap-3"
              >
                <span className="font-display text-5xl md:text-7xl text-[color:var(--gold-soft)] tabular-nums leading-none">
                  {counter}
                </span>
                {counterLabel && (
                  <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">
                    {counterLabel}
                  </span>
                )}
              </motion.div>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display italic text-3xl md:text-5xl leading-[1.02] text-[color:var(--gold-soft)] py-1"
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-14 bg-[color:var(--gold)]/60 origin-left"
            />
            {sub && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[11px] md:text-xs text-white/65 tracking-[0.22em] uppercase leading-[1.9] max-w-sm"
              >
                {sub}
              </motion.p>
            )}
          </div>

          {/* bottom row: reel meta */}
          <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.4em] text-white/25 uppercase pt-4 border-t border-white/5">
            <span>Nakshatra Group</span>
            <span>Est. MCMXCII</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}


/* ---- individual scenes ---- */

// Opening: constellation forms
function Opening({ p }: { p: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        r: 0.4 + Math.random() * 1.2,
        d: Math.random() * 0.3,
      })),
    [],
  );
  const constellationPoints = [
    [30, 40], [42, 30], [55, 45], [63, 32], [72, 50], [58, 60], [45, 55], [30, 40],
  ];
  const pathD = "M " + constellationPoints.map(([x, y]) => `${x} ${y}`).join(" L ");
  const logoP = Math.max(0, (p - 0.75) / 0.25);
  return (
    <div className="absolute inset-0 bg-black">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r * 0.15}
            fill="oklch(0.9 0.08 82)"
            opacity={Math.min(1, Math.max(0, (p - s.d) * 2))}
          />
        ))}
        <path
          d={pathD}
          fill="none"
          stroke="oklch(0.82 0.13 78)"
          strokeWidth="0.15"
          strokeDasharray="100"
          strokeDashoffset={100 - Math.min(100, p * 140)}
          opacity={0.9}
        />
      </svg>
      <motion.div
        style={{ opacity: logoP }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      >
        <div className="font-display text-6xl md:text-8xl tracking-tight text-[color:var(--gold-soft)]">
          Nakshatra
        </div>
        <div className="h-px w-24 bg-[color:var(--gold)]/60" />
        <div className="font-mono text-xs tracking-[0.5em] text-[color:var(--gold)]/70 uppercase">
          30 Years of Building Trust
        </div>
      </motion.div>
    </div>
  );
}

// 1992 — blueprint being drawn
function Scene1992({ p }: { p: number }) {
  return (
    <FilmFrame slate="ACT I · 1992" code="REEL 01">
      <PosterScene
        img={ch1}
        filter="grade-mono film-grain flicker"
        imgScale={1 + p * 0.04}
        kicker="Chronicle I"
        roman="MCMXCII"
        title="The Beginning"
        sub="A pencil  ·  A blueprint  ·  A dream drawn line by line in old Gandhinagar"
        overlay={
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full mix-blend-screen opacity-80">
            <g stroke="oklch(0.82 0.13 78)" strokeWidth="0.2" fill="none">
              <path d="M20 80 L20 40 L50 25 L80 40 L80 80 Z" strokeDasharray="200" strokeDashoffset={200 - p * 200} />
              <path d="M20 80 L80 80" strokeDasharray="60" strokeDashoffset={60 - Math.max(0, p - 0.4) * 100} />
              <path d="M35 80 L35 55 L65 55 L65 80" strokeDasharray="120" strokeDashoffset={120 - Math.max(0, p - 0.55) * 200} />
            </g>
          </svg>
        }
      />
    </FilmFrame>
  );
}

// 2001 — building rises
function Scene2001({ p }: { p: number }) {
  const floors = 8;
  return (
    <FilmFrame slate="ACT II · 2001" code="REEL 02">
      <PosterScene
        img={ch2}
        filter="grade-sepia film-grain"
        imgScale={1 + p * 0.04}
        kicker="Chronicle II"
        roman="MMI"
        title="Our First Landmark"
        sub="Steel  ·  Concrete  ·  Glass — the sketch stood up and became a home"
        overlay={
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {Array.from({ length: floors }).map((_, i) => {
              const t = Math.max(0, Math.min(1, p * floors - i));
              return (
                <rect
                  key={i}
                  x={40}
                  y={80 - (i + 1) * 6}
                  width={20}
                  height={6}
                  fill="oklch(0.82 0.13 78 / 0.22)"
                  stroke="oklch(0.9 0.08 82)"
                  strokeWidth="0.18"
                  opacity={t}
                  transform={`translate(0, ${(1 - t) * 4})`}
                />
              );
            })}
          </svg>
        }
      />
    </FilmFrame>
  );
}

// 2010 — city expansion + counter
function Scene2010({ p }: { p: number }) {
  const value = Math.round(500000 * p);
  return (
    <FilmFrame slate="ACT III · 2010" code="REEL 03">
      <PosterScene
        img={ch3}
        filter="grade-warm film-grain"
        imgScale={1.06 - p * 0.03}
        kicker="Chronicle III"
        roman="MMX"
        counter={`${value.toLocaleString()}+`}
        counterLabel="Sq. Ft. Delivered"
        title="A City Takes Shape"
        sub="Five lakh square feet and rising above the plain"
      />
    </FilmFrame>
  );
}

// 2014 — families
function Scene2014({ p }: { p: number }) {
  const value = Math.round(280 * p);
  return (
    <FilmFrame slate="ACT IV · 2014" code="REEL 04">
      <PosterScene
        img={ch4}
        filter="grade-warm film-grain"
        imgScale={1 + p * 0.03}
        kicker="Chronicle IV"
        roman="MMXIV"
        counter={`${value}+`}
        counterLabel="Families · One Name"
        title="Homes, Not Apartments"
        sub="Curtains move  ·  Lights switch on  ·  A building becomes alive"
      />
    </FilmFrame>
  );
}

// 2020 — luxury
function Scene2020({ p }: { p: number }) {
  const value = Math.round(5000 * p);
  return (
    <FilmFrame slate="ACT V · 2020" code="REEL 05">
      <PosterScene
        img={ch5}
        filter="grade-cool"
        imgScale={1 + p * 0.04}
        kicker="Chronicle V"
        roman="MMXX"
        counter={`${value.toLocaleString()}+`}
        counterLabel="Families Home"
        title="Luxury Living, Redefined"
        sub="Glass architecture  ·  Water reflections  ·  A new standard"
      />
    </FilmFrame>
  );
}

// 2021 — redevelopment
function Scene2021({ p }: { p: number }) {
  return (
    <FilmFrame slate="ACT VI · 2021" code="REEL 06">
      <PosterScene
        img={ch6}
        filter="grade-cool film-grain"
        imgScale={1 + p * 0.03}
        kicker="Chronicle VI"
        roman="MMXXI"
        title="Transforming Communities"
        sub="Not demolition — transformation. Old streets breathe again."
        overlay={
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, oklch(0.82 0.13 78 / 0.15) 0%, transparent ${40 + p * 40}%)`,
            }}
          />
        }
      />
    </FilmFrame>
  );
}

// 2022 — Ragalia tower emerging
function Scene2022({ p }: { p: number }) {
  return (
    <FilmFrame slate="ACT VII · 2022" code="REEL 07">
      <PosterScene
        img={ch7}
        filter="grade-cool"
        imgScale={1.1 - p * 0.08}
        kicker="Chronicle VII · GIFT City"
        roman="MMXXII"
        title="Ragalia"
        sub="Gujarat's tallest ambition rises through the clouds"
        overlay={
          <div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none"
            style={{ height: `${100 - p * 70}%`, transition: "height 200ms linear" }}
          />
        }
      />
    </FilmFrame>
  );
}

// 2024 — Kudasan map
function Scene2024({ p }: { p: number }) {
  const pins = [
    [30, 40], [50, 30], [65, 50], [45, 65], [70, 70], [35, 60],
  ];
  return (
    <FilmFrame slate="ACT VIII · 2024" code="REEL 08">
      <PosterScene
        img={ch8}
        filter="grade-cool"
        imgScale={1.04 - p * 0.03}
        kicker="Chronicle VIII · Kudasan"
        roman="MMXXIV"
        title="Expanding Across Kudasan"
        sub="A future of premium enclaves — mapped in golden light"
        overlay={
          <>
            <div className="absolute inset-0 bg-black/40" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {pins.map(([x, y], i) => {
                const t = Math.max(0, Math.min(1, p * pins.length - i));
                return (
                  <g key={i} opacity={t}>
                    <circle cx={x} cy={y} r={0.7} fill="oklch(0.9 0.08 82)" />
                    <circle cx={x} cy={y} r={1.8 + t * 2.5} fill="none" stroke="oklch(0.82 0.13 78)" strokeWidth="0.18" opacity={1 - t * 0.5} />
                  </g>
                );
              })}
            </svg>
          </>
        }
      />
    </FilmFrame>
  );
}

// Gravity — hero poster
function SceneGravity({ p }: { p: number }) {
  return (
    <FilmFrame slate="FINALE · 2026" code="REEL 09">
      <PosterScene
        img={ch9}
        imgScale={1.12 - p * 0.1}
        kicker="Chronicle IX · Kudasan"
        roman="MMXXVI"
        title="Gravity"
        sub="फिर से एक बार, कूड़ासन  ·  Where the next generation lands"
        overlay={
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        }
      />
    </FilmFrame>
  );
}


// Founder scenes
function FounderScene({
  img,
  name,
  role,
  quote,
  bio,
  code,
  p,
}: {
  img: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  code: string;
  p: number;
}) {
  const letters = Math.floor(quote.length * Math.min(1, p * 1.6));
  const bioShown = Math.max(0, (p - 0.5) / 0.5);
  return (
    <FilmFrame slate={`PORTRAIT · ${name.toUpperCase()}`} code={code}>
      <div className="absolute inset-0 flex items-center justify-center px-16 md:px-24 py-24">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-[1fr_1.1fr] bg-black border border-[color:var(--gold)]/20 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]"
          style={{ aspectRatio: "16 / 8.2" }}
        >
          <div className="relative overflow-hidden">
            <SceneImage src={img} filter="grade-mono slow-zoom" scale={1.04} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/70" />
            <div className="absolute inset-0 vignette" />
            <CornerMarks />
            <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.4em] text-white/50 uppercase">
              Portrait · {name.split(" ")[0]}
            </div>
          </div>
          <div className="relative flex flex-col justify-between p-8 md:p-12 bg-[oklch(0.045_0.005_60)] border-l border-[color:var(--gold)]/15">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.5em] text-[color:var(--gold)]/70 uppercase">
                {role}
              </span>
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/35 uppercase">{code}</span>
            </div>
            <div className="flex flex-col gap-5 py-4">
              <h3 className="font-display italic text-4xl md:text-5xl leading-[1.02] text-[color:var(--gold-soft)]">
                {name}
              </h3>
              <div className="h-px w-14 bg-[color:var(--gold)]/60" />
              <p className="font-display italic text-xl md:text-2xl leading-snug text-white/90 min-h-[5rem]">
                &ldquo;{quote.slice(0, letters)}
                <span className="opacity-40">|</span>&rdquo;
              </p>
              <p
                className="text-[13px] text-white/60 leading-relaxed max-w-md tracking-wide"
                style={{ opacity: bioShown, transition: "opacity 400ms ease-out" }}
              >
                {bio}
              </p>
            </div>
            <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.4em] text-white/25 uppercase pt-4 border-t border-white/5">
              <span>Nakshatra Group</span>
              <span>Est. MCMXCII</span>
            </div>
          </div>
        </motion.article>
      </div>
    </FilmFrame>
  );
}

// Final constellation
function FinaleConstellation({ p }: { p: number }) {
  const pts = [
    [20, 70], [30, 40], [45, 55], [55, 30], [65, 60], [75, 40], [85, 65],
  ];
  const white = p > 0.85 ? (p - 0.85) / 0.15 : 0;
  return (
    <div className="absolute inset-0 bg-black overflow-hidden" style={{ backgroundColor: white > 0.5 ? "white" : undefined, transition: "background-color 0.8s" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {pts.map(([x, y], i) => {
          const t = Math.max(0, Math.min(1, p * pts.length - i));
          return <circle key={i} cx={x} cy={y} r={0.5 + t * 0.4} fill="oklch(0.9 0.08 82)" opacity={t} />;
        })}
        {pts.slice(1).map(([x, y], i) => {
          const [px, py] = pts[i];
          const t = Math.max(0, Math.min(1, p * pts.length - i - 1));
          return (
            <line
              key={i}
              x1={px}
              y1={py}
              x2={px + (x - px) * t}
              y2={py + (y - py) * t}
              stroke="oklch(0.82 0.13 78)"
              strokeWidth="0.15"
              opacity={0.9}
            />
          );
        })}
      </svg>
      <motion.div
        style={{ opacity: white }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
      >
        <div className="font-display text-6xl md:text-8xl text-[color:var(--ink)]">Nakshatra</div>
        <div className="h-px w-24 bg-[color:var(--ink)]/40" />
        <div className="font-mono text-xs tracking-[0.5em] text-[color:var(--ink)]/70 uppercase">
          Building Legacies Since 1992
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const SCENES: (Scene & { label: string; year: string })[] = [
  { id: "opening", label: "Overture", year: "Prologue", duration: 8000, render: (p) => <Opening p={p} /> },
  { id: "1992", label: "The First Line", year: "MCMXCII", duration: 11000, render: (p) => <Scene1992 p={p} /> },
  { id: "2001", label: "The First Landmark", year: "MMI", duration: 12000, render: (p) => <Scene2001 p={p} /> },
  { id: "2010", label: "A City Takes Shape", year: "MMX", duration: 10000, render: (p) => <Scene2010 p={p} /> },
  { id: "2014", label: "Homes, Not Apartments", year: "MMXIV", duration: 10000, render: (p) => <Scene2014 p={p} /> },
  { id: "2020", label: "Luxury Redefined", year: "MMXX", duration: 10000, render: (p) => <Scene2020 p={p} /> },
  { id: "2021", label: "Transformation", year: "MMXXI", duration: 10000, render: (p) => <Scene2021 p={p} /> },
  { id: "2022", label: "Ragalia", year: "MMXXII", duration: 11000, render: (p) => <Scene2022 p={p} /> },
  { id: "2024", label: "Kudasan Expansion", year: "MMXXIV", duration: 10000, render: (p) => <Scene2024 p={p} /> },
  { id: "gravity", label: "Gravity", year: "MMXXVI", duration: 12000, render: (p) => <SceneGravity p={p} /> },
  {
    id: "founder",
    label: "The Founder",
    year: "Chronicle X",
    duration: 14000,
    render: (p) => (
      <FounderScene
        p={p}
        code="REEL 10"
        img={founderImg}
        name="Pankaj H. Patel"
        role="Founder · Chairman"
        quote="Every landmark begins as a promise made to a family."
        bio="In 1992, Pankaj H. Patel drew the first line of what would become the Nakshatra story — a family-run practice rooted in Gandhinagar, built on trust before scale."
      />
    ),
  },
  {
    id: "cofounder",
    label: "The Co-Founder",
    year: "Chronicle XI",
    duration: 14000,
    render: (p) => (
      <FounderScene
        p={p}
        code="REEL 11"
        img={cofounderImg}
        name="Uttpal Patel"
        role="Co-Founder · Managing Director"
        quote="Luxury is quiet. It is the detail you feel before you see."
        bio="Uttpal Patel carries the second generation of the vision — pairing architectural precision with a modern language of premium living across Kudasan and GIFT City."
      />
    ),
  },
  { id: "finale", label: "The Constellation", year: "Fin.", duration: 12000, render: (p) => <FinaleConstellation p={p} /> },
];

function Cinema() {
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const [pVal, setPVal] = useState(0);

  const scene = SCENES[idx];

  // animate progress across duration
  useEffect(() => {
    if (!started || ended) return;
    progress.set(0);
    setPVal(0);
    const controls = animate(progress, 1, {
      duration: scene.duration / 1000,
      ease: "linear",
      onUpdate: (v) => setPVal(v),
      onComplete: () => {
        if (idx < SCENES.length - 1) setIdx((i) => i + 1);
        else setEnded(true);
      },
    });
    if (paused) controls.pause();
    return () => controls.stop();
  }, [idx, started, ended, paused, scene.duration, progress]);

  const advance = () => {
    if (idx < SCENES.length - 1) setIdx((i) => i + 1);
    else setEnded(true);
  };
  const back = () => {
    if (idx > 0) setIdx((i) => i - 1);
  };

  // keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!started) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); advance(); }
      if (e.key === "ArrowLeft") back();
      if (e.key.toLowerCase() === "p") setPaused((v) => !v);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [started, idx]);

  return (
    <main className="fixed inset-0 bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!started ? (
          <StartCurtain key="start" onStart={() => setStarted(true)} />
        ) : ended ? (
          <EndCard key="end" onReplay={() => { setIdx(0); setEnded(false); }} />
        ) : (
          <motion.div
            key={scene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {scene.render(pVal)}
          </motion.div>
        )}
      </AnimatePresence>

      {started && !ended && (
        <Controls
          idx={idx}
          total={SCENES.length}
          progress={pVal}
          paused={paused}
          onPause={() => setPaused((v) => !v)}
          onNext={advance}
          onPrev={back}
          label={SCENES[idx].label}
          year={SCENES[idx].year}
        />
      )}
    </main>
  );
}

/* ---- start / end / controls ---- */

function StartCurtain({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-black film-grain scanline"
    >
      {/* faint gold radial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.82_0.13_78/0.08)_0%,transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.3em" }}
        animate={{ opacity: 1, letterSpacing: "0.6em" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-[10px] text-white/40 uppercase mb-6 pl-[0.6em]"
      >
        A Nakshatra Group Presentation
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="font-display italic text-6xl md:text-8xl gold-shimmer text-center leading-none py-2"
      >
        The Nakshatra Legacy
      </motion.h1>

      <div className="mt-4 h-px w-16 bg-white/20" />

      <div className="mt-6 font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
        A Cinematic Chronicle  ·  Thirteen Scenes  ·  Thirty Years
      </div>

      <button
        onClick={onStart}
        className="group mt-14 flex items-center gap-6 focus:outline-none"
      >
        <span className="font-mono text-[11px] tracking-[0.4em] uppercase text-white/60 group-hover:text-white transition-colors">
          Begin the Film
        </span>
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[color:var(--gold)]/30 group-hover:border-[color:var(--gold)] transition-colors duration-500">
          <span className="absolute inset-[3px] rounded-full border border-white/5" />
          <span className="w-2 h-2 rotate-45 bg-[color:var(--gold)] group-hover:scale-125 transition-transform duration-500" />
          <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90 h-full w-full">
            <circle
              cx="32" cy="32" r="30" fill="none"
              stroke="oklch(0.82 0.13 78)" strokeWidth="1"
              strokeDasharray="188" strokeDashoffset="188"
              className="transition-[stroke-dashoffset] duration-[1400ms] ease-out group-hover:[stroke-dashoffset:0]"
            />
          </svg>
        </span>
      </button>

      <div className="mt-10 font-mono text-[9px] tracking-[0.4em] text-white/25 uppercase">
        Best viewed with sound  ·  ← →  ·  Space to advance
      </div>
    </motion.div>
  );
}

function EndCard({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white text-[color:var(--ink)] flex flex-col items-center justify-center gap-6"
    >
      <div className="font-mono text-[10px] tracking-[0.6em] uppercase opacity-60">Fin.</div>
      <h2 className="font-display text-6xl md:text-8xl">Nakshatra Group</h2>
      <div className="h-px w-24 bg-[color:var(--ink)]/40" />
      <p className="max-w-md text-center opacity-70 leading-relaxed">
        Thirty years. One family. A skyline still being drawn.
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={onReplay}
          className="px-8 py-3 border border-[color:var(--ink)]/40 font-mono text-xs tracking-[0.4em] uppercase hover:bg-[color:var(--ink)] hover:text-[color:var(--gold-soft)] transition-colors"
        >
          Replay
        </button>
        <a
          href="#projects"
          className="px-8 py-3 bg-[color:var(--ink)] text-[color:var(--gold-soft)] font-mono text-xs tracking-[0.4em] uppercase"
        >
          Explore Projects
        </a>
      </div>
    </motion.div>
  );
}

function Controls({
  idx,
  total,
  progress,
  paused,
  onPause,
  onNext,
  onPrev,
  label,
  year,
}: {
  idx: number;
  total: number;
  progress: number;
  paused: boolean;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  label: string;
  year: string;
}) {
  const circumference = 2 * Math.PI * 26;
  return (
    <div className="absolute inset-x-0 bottom-0 z-40 pointer-events-none">
      {/* progress rail */}
      <div className="mx-12 md:mx-16 h-px bg-white/8">
        <div
          className="h-full bg-[color:var(--gold)]/70"
          style={{ width: `${progress * 100}%`, transition: "width 120ms linear" }}
        />
      </div>

      <div className="pointer-events-auto flex items-end justify-between px-12 md:px-16 pt-6 pb-8">
        {/* LEFT — chronicle metadata */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] tracking-[0.5em] text-white/35 uppercase">
            Chronicle {String(idx + 1).padStart(2, "0")}  /  {String(total).padStart(2, "0")}  ·  {year}
          </span>
          <div className="flex items-baseline gap-4">
            <span className="font-display italic text-2xl md:text-3xl gold-shimmer leading-none py-0.5">
              {label}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-5">
            <button
              onClick={onPrev}
              className="font-mono text-[9px] tracking-[0.4em] text-white/40 hover:text-white/90 uppercase transition-colors"
            >
              ← Previous
            </button>
            <span className="text-white/15">·</span>
            <button
              onClick={onPause}
              className="font-mono text-[9px] tracking-[0.4em] text-white/40 hover:text-white/90 uppercase transition-colors"
            >
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>

        {/* RIGHT — circular continue */}
        <button
          onClick={onNext}
          className="group flex items-center gap-6 focus:outline-none"
          aria-label="Advance to next chronicle"
        >
          <div className="flex flex-col items-end gap-1.5">
            <span className="font-mono text-[9px] tracking-[0.5em] text-white/35 uppercase">
              Advance
            </span>
            <span className="font-display italic text-lg md:text-xl text-white/85 group-hover:text-[color:var(--gold-soft)] transition-colors leading-none">
              Continue the film
            </span>
          </div>
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full border border-[color:var(--gold)]/30 group-hover:border-[color:var(--gold)] transition-colors duration-500">
            <svg viewBox="0 0 60 60" className="absolute inset-0 -rotate-90 h-full w-full">
              <circle cx="30" cy="30" r="26" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="1" />
              <circle
                cx="30" cy="30" r="26" fill="none"
                stroke="oklch(0.82 0.13 78)" strokeWidth="1"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{ transition: "stroke-dashoffset 120ms linear" }}
              />
            </svg>
            <span className="text-[color:var(--gold-soft)] text-sm group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </button>
      </div>
    </div>
  );
}
