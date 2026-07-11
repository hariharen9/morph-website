import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ---------------- Why Morph (big statement) ---------------- */
export function WhyMorph() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6">
        <SectionLabel>01 · why morph exists</SectionLabel>
        <motion.h2
          style={{ y }}
          className="mt-8 text-balance font-display text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          <RevealText>
            <span className="text-muted-foreground">ffmpeg converts media.</span>{" "}
            <span className="text-muted-foreground">pandoc converts documents.</span>{" "}
            <span className="text-muted-foreground">ImageMagick converts images.</span>{" "}
            <span className="text-foreground">Nobody wired them into </span>
            <span className="italic text-accent-gradient">one coherent tool</span>
            <span className="text-foreground"> with one grammar and a genuinely good CLI.</span>
          </RevealText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 max-w-2xl font-mono text-sm text-muted-foreground"
        >
          → morph orchestrates the best tool for each job behind a single, predictable interface —
          detects what's missing, tells you exactly what it'll install, and routes through
          intermediate formats automatically when there's no direct converter.
        </motion.p>
      </div>
    </section>
  );
}

function RevealText({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ staggerChildren: 0.02 }}
      className="inline"
    >
      {children}
    </motion.span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
      <span className="h-px w-8 bg-border-strong" />
      {children}
    </div>
  );
}

/* ---------------- Feature Bento ---------------- */
export function FeatureBento() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>02 · what makes it different</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-display text-4xl italic leading-tight md:text-6xl">
          <span className="text-gradient">A CLI that</span>{" "}
          <span className="text-accent-gradient">respects your time.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[repeat(4,minmax(0,220px))]">
          <BentoCard className="md:col-span-4 md:row-span-2" glow>
            <FeatureRouting />
          </BentoCard>
          <BentoCard className="md:col-span-2">
            <FeatureOneVerb />
          </BentoCard>
          <BentoCard className="md:col-span-2">
            <FeatureTui />
          </BentoCard>
          <BentoCard className="md:col-span-3">
            <FeatureRemote />
          </BentoCard>
          <BentoCard className="md:col-span-3">
            <FeatureContextHelp />
          </BentoCard>
          <BentoCard className="md:col-span-3">
            <FeaturePluggable />
          </BentoCard>
          <BentoCard className="md:col-span-1">
            <FeatureUndo />
          </BentoCard>
          <BentoCard className="md:col-span-2">
            <FeatureLocal />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur transition hover:border-border-strong ${className}`}
      style={
        {
          backgroundImage: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%)`,
        } as React.CSSProperties
      }
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--primary) 40%, transparent)",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

function CardTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl italic leading-tight md:text-3xl">{title}</h3>
    </div>
  );
}

function FeatureRouting() {
  return (
    <div className="flex h-full flex-col justify-between">
      <CardTitle
        eyebrow="Smart multi-hop routing"
        title="Finds a route even when none exists directly."
      />
      <RoutingGraph />
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        No direct <code className="font-mono text-foreground">csv → yaml</code>? A BFS over the
        conversion graph resolves{" "}
        <code className="font-mono text-foreground">csv → json → yaml</code> on its own. Instantly
        unlocks thousands of implicit conversions.
      </p>
    </div>
  );
}

function RoutingGraph() {
  const nodes = [
    { id: "csv", x: 60, y: 60 },
    { id: "json", x: 220, y: 60 },
    { id: "yaml", x: 380, y: 60 },
    { id: "xlsx", x: 220, y: 170 },
    { id: "parquet", x: 380, y: 170 },
    { id: "html", x: 60, y: 170 },
  ];
  const edges = [
    ["csv", "json"],
    ["json", "yaml"],
    ["json", "parquet"],
    ["csv", "xlsx"],
    ["xlsx", "parquet"],
    ["csv", "html"],
  ];
  const highlight = new Set(["csv-json", "json-yaml"]);
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-background/50 p-4">
      <svg viewBox="0 0 440 220" className="h-56 w-full">
        {edges.map(([a, b], i) => {
          const na = nodes.find((n) => n.id === a)!;
          const nb = nodes.find((n) => n.id === b)!;
          const hl = highlight.has(`${a}-${b}`);
          return (
            <motion.line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={hl ? "var(--primary)" : "var(--border-strong)"}
              strokeWidth={hl ? 1.6 : 1}
              strokeDasharray={hl ? "0" : "3 3"}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
            />
          );
        })}
        {nodes.map((n) => {
          const hl = n.id === "csv" || n.id === "json" || n.id === "yaml";
          return (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={22}
                fill={
                  hl ? "color-mix(in oklab, var(--primary) 18%, var(--surface))" : "var(--surface)"
                }
                stroke={hl ? "var(--primary)" : "var(--border-strong)"}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                className="fill-foreground font-mono text-[11px]"
              >
                {n.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function FeatureOneVerb() {
  return (
    <div className="flex h-full flex-col justify-between">
      <CardTitle eyebrow="One verb" title="morph is the verb." />
      <div className="my-4 rounded-lg border border-border bg-background/60 p-3 font-mono text-xs">
        <div className="text-muted-foreground">
          <span className="line-through">morph convert</span> file.a file.b
        </div>
        <div className="mt-1 text-foreground">
          <span className="text-primary">$</span> morph file.a file.b
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        No subcommand ceremony. Two paths in, one line out.
      </p>
    </div>
  );
}

function FeatureLocal() {
  return (
    <div className="flex h-full flex-col justify-between">
      <CardTitle eyebrow="Local-first" title="Nothing leaves your machine." />
      <div className="my-4 flex flex-wrap gap-2">
        {["no accounts", "no upload", "no api keys", "no telemetry"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Just your files and the tools already on your box.
      </p>
    </div>
  );
}

function FeatureContextHelp() {
  return (
    <div>
      <CardTitle eyebrow="Contextual --help" title="Only flags relevant to this pair." />
      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
        <div className="rounded-lg border border-border bg-background/60 p-3">
          <div className="text-primary">$ morph data.csv data.xlsx --help</div>
          <div className="mt-2 space-y-1 text-muted-foreground">
            <div>-d, --delimiter</div>
            <div>--table-style</div>
            <div>--header-bg</div>
            <div>--freeze-cols</div>
            <div>--password</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-background/60 p-3">
          <div className="text-accent">$ morph notes.md report.pdf --help</div>
          <div className="mt-2 space-y-1 text-muted-foreground">
            <div>--pdf-engine</div>
            <div className="opacity-40">— that's it —</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturePluggable() {
  return (
    <div>
      <CardTitle eyebrow="Pluggable" title="Drop a file. It's live." />
      <pre className="mt-4 overflow-hidden rounded-lg border border-border bg-background/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {`# morph/converters/my_converter.py
@register("foo", "bar", backend="sometool")
def foo_to_bar(input, output, **_):
    ...
    return ConversionResult(output=output)`}
      </pre>
      <p className="mt-3 text-sm text-muted-foreground">
        No central registry to edit. The graph rewires itself.
      </p>
    </div>
  );
}

function FeatureTui() {
  return (
    <div className="flex h-full flex-col justify-between">
      <CardTitle eyebrow="Interactive TUI" title="Visual dashboard." />
      <div className="my-4 rounded-lg border border-border bg-background/60 p-3 font-mono text-[10px] text-muted-foreground flex flex-col gap-1 overflow-hidden">
        <div className="flex justify-between border-b border-border-strong pb-1">
           <span>morph interactive</span><span>v1.0</span>
        </div>
        <div className="flex gap-2 pt-1">
           <span className="text-primary">▶ convert</span>
           <span>history</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Type <code className="font-mono text-xs text-foreground">morph</code> to launch a keyboard-driven Textual UI.
      </p>
    </div>
  );
}

function FeatureRemote() {
  return (
    <div>
      <CardTitle eyebrow="Web Extraction" title="Native remote downloads." />
      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px]">
        <div className="rounded-lg border border-border bg-background/60 p-3">
          <div className="text-primary truncate">$ morph https://youtu... audio.mp3</div>
          <div className="mt-2 text-muted-foreground truncate">→ via yt-dlp</div>
        </div>
        <div className="rounded-lg border border-border bg-background/60 p-3">
          <div className="text-accent truncate">$ morph https://wiki... doc.md</div>
          <div className="mt-2 text-muted-foreground truncate">→ via trafilatura</div>
        </div>
      </div>
    </div>
  );
}

function FeatureUndo() {
  return (
    <div className="flex h-full flex-col justify-between">
      <CardTitle eyebrow="Safety" title="Undo." />
      <div className="my-2 rounded-lg border border-border bg-background/60 p-2 font-mono text-[11px] text-center text-primary">
        $ morph undo
      </div>
      <p className="text-sm text-muted-foreground">
        Instantly revert mistakes.
      </p>
    </div>
  );
}

/* ---------------- Terminal Demo (typing) ---------------- */
const SCENES = [
  {
    input: "morph report.docx report.pdf",
    lines: [
      { c: "muted", t: "→ resolving route: docx → pdf (via pandoc)" },
      { c: "muted", t: "→ pandoc found: /opt/homebrew/bin/pandoc" },
      { c: "primary", t: "✓ report.pdf  1.8s  (312 KB)" },
    ],
    tag: "docx → pdf",
  },
  {
    input: "morph clip.mp4 clip.gif --fps 10 --width 480",
    lines: [
      { c: "muted", t: "→ route: mp4 → gif (via ffmpeg)" },
      { c: "primary", t: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%  128/128 frames" },
      { c: "primary", t: "✓ clip.gif   4.2s  (1.1 MB)" },
    ],
    tag: "mp4 → gif",
  },
  {
    input: "morph https://youtu.be/... audio.mp3",
    lines: [
      { c: "muted", t: "→ extracting stream metadata (via yt-dlp)" },
      { c: "primary", t: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%  Downloading" },
      { c: "primary", t: "✓ audio.mp3  3.4s" },
    ],
    tag: "url → mp3",
  },
  {
    input: "morph data.csv data.yaml",
    lines: [
      { c: "muted", t: "→ no direct route csv → yaml" },
      { c: "accent", t: "→ found: csv → json → yaml  (2 hops, BFS)" },
      { c: "primary", t: "✓ data.yaml  0.09s" },
    ],
    tag: "multi-hop",
  },
];

export function TerminalDemo() {
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30%" });

  useEffect(() => {
    if (!inView) return;
    setTyped("");
    setShowOutput(false);
    const target = SCENES[scene].input;
    let i = 0;
    const typer = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(typer);
        setTimeout(() => setShowOutput(true), 400);
      }
    }, 32);
    const next = setTimeout(() => setScene((s) => (s + 1) % SCENES.length), 6000);
    return () => {
      clearInterval(typer);
      clearTimeout(next);
    };
  }, [scene, inView]);

  return (
    <section id="terminal" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>03 · live in your terminal</SectionLabel>
            <h2 className="mt-6 font-display text-4xl italic leading-tight md:text-6xl">
              <span className="text-gradient">You type.</span>{" "}
              <span className="text-accent-gradient">Morph routes.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Real progress bars driven by ffmpeg's own{" "}
              <code className="font-mono text-foreground">-progress</code> pipe. Spinners labeled
              with the tool doing the work. Every conversion is self-documenting.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {SCENES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setScene(i)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${
                    i === scene
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-surface/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.tag}
                </button>
              ))}
            </div>
          </div>

          <div className="glass overflow-hidden rounded-2xl shadow-soft">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                morph — {SCENES[scene].tag}
              </span>
              <span className="w-14" />
            </div>
            <div className="min-h-[280px] px-6 py-6 font-mono text-sm leading-relaxed">
              <div>
                <span className="text-primary">➜</span> <span className="text-accent">~/work</span>{" "}
                <span className="text-foreground">{typed}</span>
                <span className="animate-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-primary" />
              </div>
              {showOutput && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.35 }}
                  className="mt-3 space-y-1"
                >
                  {SCENES[scene].lines.map((l, i) => (
                    <motion.div
                      key={i}
                      variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                      className={
                        l.c === "primary"
                          ? "text-primary"
                          : l.c === "accent"
                            ? "text-accent"
                            : "text-muted-foreground"
                      }
                    >
                      {l.t}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Format Graph ---------------- */
const FAMILIES = [
  {
    name: "document",
    count: 11,
    color: "primary",
    formats: ["md", "docx", "pdf", "html", "odt", "epub", "rtf", "latex", "rst", "txt", "pptx"],
  },
  {
    name: "image",
    count: 11,
    color: "accent",
    formats: ["png", "jpg", "webp", "gif", "bmp", "tiff", "ico", "heic", "avif", "svg", "pdf"],
  },
  {
    name: "audio",
    count: 8,
    color: "magenta",
    formats: ["mp3", "wav", "flac", "ogg", "aac", "m4a", "opus", "wma"],
  },
  {
    name: "video",
    count: 8,
    color: "sky",
    formats: ["mp4", "mkv", "mov", "webm", "avi", "flv", "wmv", "mpeg"],
  },
  {
    name: "data",
    count: 10,
    color: "amber",
    formats: ["csv", "xlsx", "json", "yaml", "parquet", "feather", "ods", "xml", "html", "sqlite"],
  },
  { name: "font", count: 4, color: "primary", formats: ["ttf", "otf", "woff", "woff2"] },
  { name: "ebook", count: 3, color: "accent", formats: ["epub", "mobi", "azw3"] },
  {
    name: "archive",
    count: 5,
    color: "magenta",
    formats: ["zip", "tar", "tar.gz", "tar.bz2", "tar.xz"],
  },
  { name: "3d", count: 6, color: "sky", formats: ["obj", "stl", "fbx", "gltf", "glb", "blend"] },
  { name: "web", count: 4, color: "primary", formats: ["url", "html", "md", "txt"] },
  { name: "ocr", count: 5, color: "accent", formats: ["png", "jpg", "webp", "pdf", "txt"] },
];

export function FormatGraph() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-num", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.15,
      } as gsap.TweenVars);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="formats" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>04 · the graph</SectionLabel>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h2 className="max-w-2xl font-display text-4xl italic leading-tight md:text-6xl">
            <span className="text-gradient">75 formats.</span>{" "}
            <span className="text-accent-gradient">1,000+ routes.</span>{" "}
            <span className="text-gradient">One graph.</span>
          </h2>
          <div className="grid grid-cols-3 gap-4 font-mono text-xs">
            <Stat n={75} label="formats" />
            <Stat n={11} label="families" />
            <Stat n={1000} label="routes" suffix="+" />
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-[1fr_2fr]">
          <div className="glass rounded-2xl p-2">
            {FAMILIES.map((f, i) => (
              <button
                key={f.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                  i === active ? "bg-surface-elevated" : "hover:bg-surface"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: `var(--${f.color})`,
                      boxShadow: `0 0 12px var(--${f.color})`,
                    }}
                  />
                  <span className="font-mono text-sm">{f.name}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{f.count} formats</span>
              </button>
            ))}
          </div>
          <FamilyPanel family={FAMILIES[active]} />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-4">
      <div className="flex items-baseline gap-0.5 font-display text-4xl md:text-5xl">
        <span className="stat-num text-gradient">{n}</span>
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function FamilyPanel({ family }: { family: (typeof FAMILIES)[number] }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            family
          </p>
          <h3 className="mt-1 font-display text-3xl italic">{family.name}</h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {family.formats.length} formats · fully connected
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {family.formats.map((f, i) => (
          <motion.span
            key={f + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-lg border border-border bg-background/60 px-3 py-1.5 font-mono text-sm"
          >
            .{f}
          </motion.span>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-border bg-background/60 p-4 font-mono text-xs text-muted-foreground">
        <div>
          <span className="text-primary">$</span> morph formats {family.formats[0]}
        </div>
        <div className="mt-2 space-y-0.5">
          {family.formats.slice(1, 5).map((t) => (
            <div key={t}>
              <span className="text-foreground">{family.formats[0]}</span>{" "}
              <span className="opacity-40">→</span> <span className="text-primary">{t}</span>
              <span className="opacity-40"> · 1 hop</span>
            </div>
          ))}
          <div className="opacity-40">
            ... and {family.formats.length - 5 > 0 ? family.formats.length - 5 : 0} more
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Batch showcase ---------------- */
export function BatchShowcase() {
  const rows = [
    { s: "done", n: "concert_01.flac", t: "0:04", size: "8.3MB → 4.1MB" },
    { s: "done", n: "concert_02.flac", t: "0:03", size: "7.9MB → 3.8MB" },
    { s: "conv", n: "concert_03.flac", t: "0:01", size: "" },
    { s: "wait", n: "concert_04.wav", t: "", size: "" },
    { s: "wait", n: "concert_05.wav", t: "", size: "" },
    { s: "wait", n: "concert_06.flac", t: "", size: "" },
  ];
  const progress = 0.34;
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <SectionLabel>05 · batch mode</SectionLabel>
            <h2 className="mt-6 font-display text-4xl italic leading-tight md:text-6xl">
              <span className="text-gradient">Convert a folder</span>{" "}
              <span className="text-accent-gradient">without writing a loop.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Parallel workers, live Rich table, mirror the input tree, rename templates,
              <code className="mx-1 font-mono text-foreground">--newer-only</code> like{" "}
              <code className="font-mono text-foreground">make</code>, dry runs. Every job
              auto-logged.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-background/60 p-4 font-mono text-[12px] leading-relaxed text-muted-foreground">
              {`$ morph batch ./raw/ mp3 \\
    --recursive --out-dir ./converted/ \\
    --mirror --workers 4 --newer-only`}
            </pre>
          </div>

          <div className="glass overflow-hidden rounded-2xl shadow-soft">
            <div className="border-b border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              morph batch — 8 files → mp3
            </div>
            <div className="divide-y divide-border">
              {rows.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-[80px_1fr_60px_140px] items-center gap-3 px-4 py-2.5 font-mono text-xs"
                >
                  <StatusPill s={r.s} />
                  <span className="truncate text-foreground">{r.n}</span>
                  <span className="text-muted-foreground">{r.t}</span>
                  <span className="text-right text-muted-foreground">{r.size}</span>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-border px-4 py-4">
              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>Overall</span>
                <span>{Math.round(progress * 8)}/8 · 0:00:07</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function StatusPill({ s }: { s: string }) {
  if (s === "done") return <span className="text-primary">✓ done</span>;
  if (s === "conv") return <span className="text-accent">▶ converting…</span>;
  return <span className="text-muted-foreground">· waiting</span>;
}
