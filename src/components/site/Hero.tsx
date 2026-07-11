import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ---------------- Nav ---------------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled
            ? "glass border-border-strong shadow-soft"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <MorphMark />
          <span className="font-mono text-sm font-medium tracking-tight">morph</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
            v1 · cli
          </span>
        </a>
        <nav className="hidden items-center gap-7 font-mono text-xs text-muted-foreground md:flex">
          <a href="#features" className="transition hover:text-foreground">
            features
          </a>
          <a href="#terminal" className="transition hover:text-foreground">
            demo
          </a>
          <a href="#formats" className="transition hover:text-foreground">
            formats
          </a>
          <a href="#architecture" className="transition hover:text-foreground">
            architecture
          </a>
        </nav>
        <a
          href="https://github.com/hariharen9/morph"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-3.5 py-1.5 font-mono text-xs text-foreground transition hover:bg-surface-elevated"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
          github
          <span className="text-muted-foreground transition group-hover:translate-x-0.5">↗</span>
        </a>
      </div>
    </motion.header>
  );
}

function MorphMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        d="M2 16 L2 6 L11 12 L20 6 L20 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <circle cx="2" cy="16" r="1.6" className="fill-primary" />
      <circle cx="20" cy="16" r="1.6" className="fill-magenta" />
    </svg>
  );
}

/* ---------------- Aurora background ---------------- */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-primary/20 blur-3xl animate-aurora" />
      <div
        className="absolute right-[-120px] top-1/3 h-[520px] w-[520px] rounded-full bg-magenta/20 blur-3xl animate-aurora"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-[-160px] left-1/3 h-[600px] w-[600px] rounded-full bg-accent/15 blur-3xl animate-aurora"
        style={{ animationDelay: "-8s" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_92%)]" />
      <GridBackdrop />
    </div>
  );
}

function GridBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0 L0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="m">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" mask="url(#m)" className="text-foreground" />
    </svg>
  );
}

/* ---------------- Hero ---------------- */
const HERO_COMMANDS = [
  { cmd: "morph report.docx report.pdf", note: "via pandoc" },
  { cmd: "morph clip.mp4 clip.gif --fps 10 --width 480", note: "via ffmpeg" },
  { cmd: "morph data.csv data.yaml", note: "csv → json → yaml" },
  { cmd: "morph batch '*.mp4' mp3 --workers 4", note: "parallel batch" },
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_COMMANDS.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
      });
      gsap.from(".hero-tag", { opacity: 0, y: 10, duration: 0.8, delay: 0.3 });
      gsap.from(".hero-sub", { opacity: 0, y: 14, duration: 0.9, delay: 0.9 });
      gsap.from(".hero-cta", { opacity: 0, y: 12, duration: 0.8, delay: 1.05, stagger: 0.1 });
      gsap.from(".hero-terminal", {
        opacity: 0,
        y: 30,
        scale: 0.98,
        duration: 1.2,
        delay: 0.6,
        ease: "expo.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative pt-36 pb-24 md:pt-44 md:pb-40">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="hero-tag glass inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
            v1 · 66 formats · 1,000+ routes
          </div>

          <h1 className="mt-8 max-w-5xl text-balance font-display text-[15vw] leading-[0.9] tracking-tight sm:text-[9rem] md:text-[11rem]">
            <span className="block overflow-hidden">
              <span className="hero-line block text-gradient">Convert</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic text-accent-gradient">anything</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block font-sans text-[0.42em] font-light uppercase tracking-[0.3em] text-muted-foreground">
                to&nbsp;anything&nbsp;·&nbsp;from&nbsp;the&nbsp;CLI
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-10 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            One command. No format-specific tools to remember. No cloud upload. No API keys. Morph
            orchestrates <span className="text-foreground">ffmpeg</span>,{" "}
            <span className="text-foreground">pandoc</span>,{" "}
            <span className="text-foreground">Pillow</span> and more behind a single, predictable
            grammar.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#install"
              className="hero-cta group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <span className="relative z-10">$ pip install morph</span>
              <span className="relative z-10 transition group-hover:translate-x-0.5">→</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#terminal"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 font-mono text-sm text-foreground backdrop-blur transition hover:bg-surface-elevated"
            >
              watch it work ↓
            </a>
          </div>
        </div>

        <div className="hero-terminal mt-20">
          <TerminalCard cmd={HERO_COMMANDS[idx].cmd} note={HERO_COMMANDS[idx].note} idx={idx} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs text-muted-foreground">
          <Kbd label="↑ ↓" /> arrow through formats
          <span className="opacity-40">·</span>
          <Kbd label="⇥" /> autocomplete paths
          <span className="opacity-40">·</span>
          <Kbd label="⏎" /> convert
        </div>
      </motion.div>
    </section>
  );
}

function Kbd({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border-strong bg-surface px-1.5 py-0.5 font-mono text-[10px] text-foreground">
      {label}
    </span>
  );
}

function TerminalCard({ cmd, note, idx }: { cmd: string; note: string; idx: number }) {
  return (
    <div className="glass mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          ~/projects — morph
        </span>
        <span className="w-14" />
      </div>
      <div className="relative px-6 py-8 font-mono text-sm leading-relaxed sm:text-base">
        <div className="flex items-baseline gap-2 text-muted-foreground">
          <span className="text-primary">➜</span>
          <span className="text-accent">~</span>
        </div>
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-1"
        >
          <span className="text-foreground">{cmd}</span>
          <span className="animate-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary" />
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-primary">
              ok
            </span>
            <span>{note}</span>
            <span className="opacity-40">·</span>
            <span>0.14s</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Command marquee ---------------- */
const MARQUEE = [
  "morph report.docx report.pdf",
  "morph photo.png photo.webp --quality 80",
  "morph song.wav song.mp3 --bitrate 192k",
  "morph book.epub book.mobi",
  "morph data.csv data.xlsx",
  "morph font.ttf font.woff2",
  "morph clip.mov clip.mp4",
  "morph diagram.svg diagram.png",
  "morph notes.md notes.docx",
  "morph project.zip project.tar.gz",
];

export function CommandMarquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span>
            {c}
            <span className="text-border-strong">◇</span>
          </span>
        ))}
      </div>
    </div>
  );
}
