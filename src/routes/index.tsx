import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Lenis from "lenis";

import ch2 from "@/assets/ch2-aerial.jpg";
import ch3 from "@/assets/ch3-building.jpg";
import ch4 from "@/assets/ch4-entrance.jpg";
import ch5 from "@/assets/ch5-kudasan.jpg";
import ch6 from "@/assets/ch6-skyline.jpg";
import ch7 from "@/assets/ch7-rising.jpg";

import ch9 from "@/assets/ch9-door.jpg";
import ch10 from "@/assets/ch10-living.jpg";
import ch11 from "@/assets/ch11-kitchen.jpg";
import ch12 from "@/assets/ch12-bedroom.jpg";
import ch13 from "@/assets/ch13-balcony.jpg";
import ch14pool from "@/assets/ch14-pool.jpg";
import ch14gym from "@/assets/ch14-gym.jpg";
import ch14club from "@/assets/ch14-clubhouse.jpg";
import ch14garden from "@/assets/ch14-garden.jpg";

export const Route = createFileRoute("/")({
  component: GravityStory,
});

/* ---------------- Lenis smooth scroll ---------------- */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/* ---------------- Intro (space) ---------------- */
function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const starsOpacity = useTransform(scrollYProgress, [0, 0.1, 0.75, 0.9], [1, 1, 1, 0]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 0.88], [1, 1, 1, 0]);
  const wordScale = useTransform(scrollYProgress, [0, 0.55], [1, 1.05]);
  const wordBlur = useTransform(scrollYProgress, [0, 0.45], ["0px", "0px"]);
  const wordFilter = useTransform(wordBlur, (b) => `blur(${b})`);
  const subOpacity = useTransform(scrollYProgress, [0, 0.5, 0.78, 0.9], [1, 1, 1, 0]);
  const spaceOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  const stars = useMemo(() => {
    return Array.from({ length: 140 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 1.6 + 0.4,
      d: Math.random() * 4,
      o: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  // Nakshatra constellation points (percent)
  const constellation = [
    [22, 30], [30, 22], [38, 34], [46, 26], [55, 38], [64, 30], [72, 42], [80, 34],
  ];

  return (
    <section ref={ref} className="relative h-[400vh]">
      <motion.div
        style={{ opacity: spaceOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      >
        {/* nebula wash */}
        <div className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(60,60,90,0.35), transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(90,70,40,0.25), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(20,20,30,0.6), transparent 70%)",
          }}
        />

        {/* stars */}
        <motion.div style={{ opacity: starsOpacity, y: starsY }} className="absolute inset-0">
          {stars.map((s) => (
            <span
              key={s.id}
              className="twinkle absolute rounded-full bg-white"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.s}px`,
                height: `${s.s}px`,
                opacity: s.o,
                animationDelay: `${s.d}s`,
                boxShadow: "0 0 6px rgba(255,255,255,0.7)",
              }}
            />
          ))}

          {/* constellation lines */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {constellation.slice(0, -1).map(([x1, y1], i) => {
              const [x2, y2] = constellation[i + 1];
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(201,161,90,0.55)"
                  strokeWidth="0.08"
                  className="shimmer"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              );
            })}
            {constellation.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="0.35" fill="#C9A15A" opacity="0.9" />
            ))}
          </svg>
        </motion.div>

        {/* Center content */}
        <motion.div
          style={{ opacity: wordOpacity, scale: wordScale, filter: wordFilter }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="font-display text-white text-[16vw] md:text-[11vw] leading-none tracking-tight"
            style={{ textShadow: "0 0 60px rgba(201,161,90,0.35), 0 0 120px rgba(201,161,90,0.2)" }}
          >
            {"GRAVITY".split("").map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="inline-block"
              >
                {l}
              </motion.span>
            ))}
          </h1>

          <motion.div style={{ opacity: subOpacity }} className="mt-10 max-w-2xl">
            <p className="font-display italic text-[color:var(--gold-soft)] text-2xl md:text-3xl">
              फिर से एक बार, कूड़ासन
            </p>
            <p className="mt-6 text-white/85 text-sm md:text-base tracking-[0.28em] uppercase font-light">
              Premium 3 BHK Residences Near GIFT City
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <span className="text-white/60 text-xs tracking-[0.4em] uppercase">By Nakshatra Group</span>
              <span className="block h-px w-24 bg-[color:var(--gold)]" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: subOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase">Scroll to Begin the Journey</span>
          <span className="breathe text-lg">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- Chapter primitive ---------------- */
type ChapterProps = {
  image: string;
  eyebrow?: string;
  headline: ReactNode;
  body?: ReactNode;
  align?: "left" | "right" | "center";
  panelTone?: "light" | "dark";
  imageInitialScale?: number;
  imageInitialBlur?: number;
  panelSide?: "left" | "right" | "center";
  height?: string;
  children?: (progress: MotionValue<number>) => ReactNode;
};

function Chapter({
  image,
  eyebrow,
  headline,
  body,
  panelTone = "light",
  imageInitialScale = 1.15,
  imageInitialBlur = 14,
  panelSide = "left",
  height = "h-[220vh]",
  children,
}: ChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [imageInitialScale, 1, 1, 1.05]);
  const imgBlurN = useTransform(scrollYProgress, [0, 0.35], [imageInitialBlur, 0]);
  const imgFilter = useTransform(imgBlurN, (b) => `blur(${b}px)`);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.4]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  const panelY = useTransform(scrollYProgress, [0.25, 0.55, 0.85], [80, 0, -40]);
  const panelOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.8, 0.95], [0, 1, 1, 0]);

  const align =
    panelSide === "right" ? "justify-end pr-[6vw]" :
    panelSide === "center" ? "justify-center" :
    "justify-start pl-[6vw]";

  return (
    <section ref={ref} className={`relative ${height}`}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <motion.div
          style={{ scale: imgScale, filter: imgFilter, opacity: imgOpacity, y: imgY }}
          className="absolute inset-0"
        >
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        <div className={`relative z-10 h-full w-full flex items-center ${align}`}>
          <motion.div
            style={{ y: panelY, opacity: panelOpacity }}
            className={`${panelTone === "dark" ? "gravity-panel-dark text-white" : "gravity-panel text-[color:var(--ink)]"} max-w-xl w-[min(560px,90vw)] rounded-2xl p-8 md:p-12 mx-4`}
          >
            {eyebrow && (
              <div className="flex items-center gap-3 mb-6">
                <span className="block h-px w-8 bg-[color:var(--gold)]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">
                  {eyebrow}
                </span>
              </div>
            )}
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] text-balance">
              {headline}
            </h2>
            {body && (
              <div className={`mt-6 text-[15px] md:text-base leading-relaxed ${panelTone === "dark" ? "text-white/75" : "text-[color:var(--muted-ink)]"}`}>
                {body}
              </div>
            )}
          </motion.div>
        </div>

        {children?.(scrollYProgress)}
      </div>
    </section>
  );
}

/* ---------------- Amenities gallery (Chapter 14) ---------------- */
function AmenitiesChapter() {
  const items = [
    { title: "Swimming Pool", img: ch14pool },
    { title: "Fitness Studio", img: ch14gym },
    { title: "Clubhouse", img: ch14club },
    { title: "Landscaped Gardens", img: ch14garden },
    { title: "Indoor Games", img: ch14club },
    { title: "Kids Area", img: ch14garden },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-20 pt-16 px-[6vw]">
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-8 bg-[color:var(--gold)]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">Amenities</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-[color:var(--ink)]">
            Feel Resort Living
          </h2>
        </div>
        <motion.div style={{ x }} className="absolute top-0 left-0 h-full flex items-center gap-8 pl-[6vw] pr-[40vw] pt-40">
          {items.map((it, i) => (
            <div key={i} className="relative h-[62vh] w-[46vw] md:w-[36vw] shrink-0 overflow-hidden rounded-xl bg-black/5">
              <img src={it.img} alt={it.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold-soft)]">0{i + 1}</div>
                <div className="font-display text-3xl mt-1">{it.title}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Bedrooms sequence (Chapter 12) ---------------- */
function BedroomsChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.5]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.06]);
  const panelY = useTransform(scrollYProgress, [0.25, 0.6], [80, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.85, 0.95], [0, 1, 1, 0]);

  // 3 dots progress
  const dot1 = useTransform(scrollYProgress, [0.3, 0.45], [0.3, 1]);
  const dot2 = useTransform(scrollYProgress, [0.5, 0.65], [0.3, 1]);
  const dot3 = useTransform(scrollYProgress, [0.7, 0.85], [0.3, 1]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <motion.div style={{ opacity: imgOpacity, scale: imgScale }} className="absolute inset-0">
          <img src={ch12} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
        <div className="relative z-10 h-full flex items-center justify-end pr-[6vw]">
          <motion.div style={{ y: panelY, opacity: panelOpacity }} className="gravity-panel text-[color:var(--ink)] rounded-2xl p-8 md:p-12 max-w-xl w-[min(560px,90vw)] mx-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8 bg-[color:var(--gold)]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">Chapter 12</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02]">3 Bedrooms<br/>Feel Complete Privacy</h2>
            <p className="mt-6 text-[color:var(--muted-ink)]">Three considered retreats — each proportioned for stillness, wardrobe wall depth, and quiet light. Bedrooms that hold you.</p>
            <div className="mt-8 flex items-center gap-4">
              {[dot1, dot2, dot3].map((o, i) => (
                <motion.div key={i} style={{ opacity: o }} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
                  <span className="text-xs tracking-widest uppercase">Bedroom 0{i+1}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Finale ---------------- */
function Finale() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 py-24">
      {/* faint constellation */}
      <svg className="absolute inset-0 h-full w-full opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[[22, 30], [30, 22], [38, 34], [46, 26], [55, 38], [64, 30], [72, 42], [80, 34]].map(([x, y], i, arr) => {
          const next = arr[i + 1];
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="0.3" fill="#C9A15A" />
              {next && (
                <line x1={x} y1={y} x2={next[0]} y2={next[1]} stroke="#C9A15A" strokeWidth="0.06" />
              )}
            </g>
          );
        })}
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="relative flex items-center justify-center h-24 w-24 rounded-full"
          style={{ boxShadow: "0 0 60px rgba(201,161,90,0.35), inset 0 0 40px rgba(201,161,90,0.15)" }}
        >
          <span className="font-display text-[color:var(--gold)] text-4xl">N</span>
          <span className="absolute inset-0 rounded-full border border-[color:var(--gold)]/40" />
        </div>
        <div className="mt-8 text-[10px] tracking-[0.5em] uppercase text-[color:var(--muted-ink)]">Nakshatra Group</div>
        <div className="mt-2 text-[color:var(--muted-ink)] italic font-display text-lg">Crafting Landmarks. Building Futures.</div>

        <div className="mt-16">
          <div className="font-display text-6xl md:text-8xl text-[color:var(--ink)] tracking-tight">Gravity</div>
          <div className="mt-4 text-xs tracking-[0.4em] uppercase text-[color:var(--muted-ink)]">
            Premium 3 BHK Residences Near GIFT City
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--ink)] px-8 py-4 text-sm tracking-[0.2em] uppercase text-white transition-colors hover:bg-black"
          >
            Book a Private Site Visit
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--ink)]/20 px-8 py-4 text-sm tracking-[0.2em] uppercase text-[color:var(--ink)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            Download Brochure
            <span className="transition-transform group-hover:translate-x-1">↓</span>
          </a>
        </div>

        <div className="mt-24 text-[10px] tracking-[0.5em] uppercase text-[color:var(--muted-ink)]/60">
          © Nakshatra Group · Kudasan, Gandhinagar
        </div>
      </div>
    </section>
  );
}

/* ---------------- Chapter 3 (bridge) ---------------- */
function BridgeChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Two halves start joined at center then part slightly to reveal the bridge
  const leftX = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "-8%"]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.6], ["8%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.3]);
  const textY = useTransform(scrollYProgress, [0.3, 0.65], [40, 0]);
  const textOp = useTransform(scrollYProgress, [0.3, 0.5, 0.85, 0.95], [0, 1, 1, 0]);

  // Bridge beam animations
  const beamHeight = useTransform(scrollYProgress, [0.2, 0.55], ["0%", "100%"]);
  const rulerScale = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.3, 0.6], [0.2, 1]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div style={{ opacity }} className="absolute inset-0 flex">
          <motion.div style={{ x: leftX }} className="relative h-full w-1/2 overflow-hidden">
            <img src={ch3} alt="Gravity towers" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/60" />
          </motion.div>
          <motion.div style={{ x: rightX }} className="relative h-full w-1/2 overflow-hidden">
            <img src={ch7} alt="Rising skyline" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/60" />
          </motion.div>
        </motion.div>

        {/* Architectural bridge — vertical golden beam growing between the two halves */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{ height: beamHeight, opacity: glow }}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-px"
          >
            <div className="h-full w-px" style={{
              background: "linear-gradient(180deg, transparent, var(--gold) 20%, var(--gold) 80%, transparent)",
              boxShadow: "0 0 24px rgba(201,161,90,0.7)",
            }} />
          </motion.div>

          {/* horizontal ruler that bridges left and right */}
          <motion.div
            style={{ scaleX: rulerScale, opacity: glow }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-[70%] origin-center"
          >
            <div className="h-px w-full gold-line" style={{ boxShadow: "0 0 20px rgba(201,161,90,0.6)" }} />
          </motion.div>

          {/* center node */}
          <motion.div
            style={{ opacity: glow }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="relative block h-3 w-3 rounded-full bg-[color:var(--gold)]" style={{ boxShadow: "0 0 24px rgba(201,161,90,0.9)" }}>
              <span className="absolute inset-0 rounded-full bg-[color:var(--gold)] animate-ping opacity-60" />
            </span>
          </motion.div>
        </div>

        <motion.div style={{ y: textY, opacity: textOp }} className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-[10px] tracking-[0.4em] uppercase text-white/80 mb-6">Chapter 03</div>
            <h2 className="font-display text-white text-6xl md:text-8xl leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              Closer<br/><span className="italic text-[color:var(--gold-soft)]">to what's next</span>
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Chapter 8 (three glass cards) ---------------- */
function PillarsChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Heading now appears AFTER the three pillars have entered
  const headY = useTransform(scrollYProgress, [0.62, 0.78], [40, 0]);
  const headOp = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.62, 0.85], [0, 1]);

  const cards = [
    { t: "Premium Living", d: "Materials chosen once, kept forever. Craft that ages beautifully." },
    { t: "Exceptional Connectivity", d: "GIFT City, business districts and daily life — minutes away, not hours." },
    { t: "Future Ready Investment", d: "A landmark address in one of Gujarat's fastest-appreciating corridors." },
  ];

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* subtle gold nebula wash for depth */}
        <div className="absolute inset-0 opacity-70 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(201,161,90,0.12), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(201,161,90,0.10), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6), transparent 70%)",
          }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-[6vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {cards.map((c, i) => {
              // Sequential entrance: pillar 1 → 2 → 3
              const start = 0.18 + i * 0.16;
              return <PillarCard key={i} start={start} progress={scrollYProgress} title={c.t} desc={c.d} idx={i + 1} />;
            })}
          </div>

          <motion.div style={{ y: headY, opacity: headOp }} className="text-center max-w-3xl mt-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.span style={{ scaleX: lineScale }} className="block h-px w-10 bg-[color:var(--gold)] origin-right" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[color:var(--gold)]">Gravity · By Nakshatra Group</span>
              <motion.span style={{ scaleX: lineScale }} className="block h-px w-10 bg-[color:var(--gold)] origin-left" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-white leading-[1.02]">
              Three principles.<br/><span className="italic text-[color:var(--gold-soft)]">One landmark.</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ start, progress, title, desc, idx }: { start: number; progress: MotionValue<number>; title: string; desc: string; idx: number }) {
  const y = useTransform(progress, [start, start + 0.12], [80, 0]);
  const op = useTransform(progress, [start, start + 0.14], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.14], [0.92, 1]);
  return (
    <motion.div
      style={{ y, opacity: op, scale }}
      className="gravity-panel-dark rounded-2xl p-8 text-white"
    >
      <div className="flex items-baseline justify-between mb-8">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--gold)]">0{idx}</span>
        <span className="h-px w-12 bg-[color:var(--gold)]/60" />
      </div>
      <div className="font-display text-2xl md:text-3xl leading-tight">{title}</div>
      <div className="mt-4 text-sm text-white/70 leading-relaxed">{desc}</div>
    </motion.div>
  );
}

/* ---------------- Progress rail ---------------- */
function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 h-40 w-px bg-black/10 hidden md:block">
      <motion.div style={{ height }} className="w-px bg-[color:var(--gold)]" />
    </div>
  );
}

/* ---------------- Top brand mark ---------------- */
function TopBar() {
  return null;
}

/* ---------------- Root story component ---------------- */
function GravityStory() {
  useLenis();

  return (
    <main className="bg-white text-[color:var(--ink)]">
      <TopBar />
      <ProgressRail />

      <Intro />

      <Chapter
        image={ch2}
        eyebrow="Chapter 02"
        headline={<>The Future<br/><span className="italic">is getting closer</span></>}
        body="A skyline emerges from the haze — three towers rising into the light above Kudasan. Everything you are about to see, we shaped by hand."
        panelSide="left"
      />

      <BridgeChapter />

      <Chapter
        image={ch4}
        eyebrow="Chapter 04"
        headline={<>One more scroll —<br/>you'll see <span className="italic">your premium home.</span></>}
        body="Cross the threshold. The doors of Gravity are opening."
        panelSide="right"
        panelTone="dark"
      />

      <Chapter
        image={ch5}
        eyebrow="Chapter 05 · Location"
        headline={<>Welcome to <span className="italic">Kudasan,</span><br/>Gandhinagar.</>}
        body="One of the fastest-growing residential destinations near GIFT City — seamless access to business districts, education, healthcare and daily conveniences."
        panelSide="left"
      >
        {() => (
          <div className="absolute top-[38%] left-[52%] z-10">
            <span className="relative inline-flex">
              <span className="h-3 w-3 rounded-full bg-[color:var(--gold)]" />
              <span className="absolute inset-0 rounded-full bg-[color:var(--gold)] animate-ping opacity-60" />
            </span>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/90 drop-shadow">Gravity · Kudasan</div>
          </div>
        )}
      </Chapter>

      <Chapter
        image={ch6}
        eyebrow="Chapter 06 · Connectivity"
        headline={<>Near GIFT City<br/>= <span className="italic">near your future.</span></>}
        body="Minutes from India's global finance hub. Every commute becomes a quiet stretch of dawn or dusk."
        panelSide="right"
        panelTone="dark"
      >
        {() => (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Animated dotted travel line between Gravity and GIFT City */}
              <motion.path
                d="M 18 72 Q 40 50 55 48 T 84 24"
                fill="none"
                stroke="#C9A15A"
                strokeWidth="0.35"
                strokeDasharray="0.8 1.4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 1.2px rgba(201,161,90,0.9))" }}
              />
              {/* moving pulse along the path */}
              <motion.circle
                r="0.7"
                fill="#F1D89C"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  offsetPath: 'path("M 18 72 Q 40 50 55 48 T 84 24")',
                  filter: "drop-shadow(0 0 2px rgba(241,216,156,0.9))",
                } as React.CSSProperties}
              />
            </svg>

            {/* Origin: Gravity */}
            <div className="absolute" style={{ left: "18%", top: "72%" }}>
              <span className="relative inline-flex">
                <span className="h-3 w-3 rounded-full bg-[color:var(--gold)]" style={{ boxShadow: "0 0 16px rgba(201,161,90,0.9)" }} />
                <span className="absolute inset-0 rounded-full bg-[color:var(--gold)] animate-ping opacity-60" />
              </span>
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/90 drop-shadow whitespace-nowrap">Gravity · Kudasan</div>
            </div>

            {/* Destination: GIFT City */}
            <div className="absolute" style={{ left: "84%", top: "24%", transform: "translateX(-100%)" }}>
              <span className="relative inline-flex">
                <span className="h-3 w-3 rounded-full bg-white" style={{ boxShadow: "0 0 16px rgba(255,255,255,0.9)" }} />
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-50" />
              </span>
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/90 drop-shadow whitespace-nowrap">GIFT City</div>
            </div>
          </div>
        )}
      </Chapter>

      <Chapter
        image={ch7}
        eyebrow="Chapter 07"
        headline={<>Here,<br/>your world<br/><span className="italic">is taking shape.</span></>}
        body="Three towers reaching upward — cast in concrete, glass and intention."
        panelSide="left"
      />

      <PillarsChapter />

      <Chapter
        image={ch9}
        eyebrow="Chapter 09"
        headline={<>Let's take you through<br/><span className="italic">your premium 3 BHK home.</span></>}
        body="The door is open. Step inside."
        panelSide="right"
        panelTone="dark"
      />

      <Chapter
        image={ch10}
        eyebrow="Chapter 10 · Living Room"
        headline={<>Living Room —<br/><span className="italic">feel togetherness.</span></>}
        body="Double-height volumes, considered proportions, light that follows the day. A room built for the people you love."
        panelSide="left"
      />

      <Chapter
        image={ch11}
        eyebrow="Chapter 11 · Kitchen"
        headline={<>Kitchen —<br/><span className="italic">feel the joy of cooking.</span></>}
        body="Honed stone, warm timber, brass. A workspace as beautiful as what leaves it."
        panelSide="right"
      />

      <BedroomsChapter />

      <Chapter
        image={ch13}
        eyebrow="Chapter 13 · Balcony"
        headline={<>Balcony —<br/><span className="italic">feel every sunrise.</span></>}
        body="A private edge above the city. Soft light. Slow air. The kind of morning you don't want to end."
        panelSide="left"
        panelTone="dark"
      />

      <AmenitiesChapter />

      <Finale />
    </main>
  );
}
