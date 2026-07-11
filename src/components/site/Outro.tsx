import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionLabel } from "./Sections";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* ---------------- Architecture ---------------- */
const FILES = [
  { name: "cli.py", d: "dispatch + subcommands" },
  { name: "registry.py", d: "the graph · BFS routing" },
  { name: "batch.py", d: "parallel batch engine" },
  { name: "history.py", d: "JSONL log at ~/.morph_history" },
  { name: "deps.py", d: "cross-platform dep detection" },
  { name: "progress.py", d: "Rich progress bars" },
  { name: "ffmpeg_utils.py", d: "ffmpeg -progress pipe parser" },
  { name: "tui.py", d: "Textual keyboard-driven TUI" },
];

export function Architecture() {
  return (
    <section id="architecture" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>06 · architecture</SectionLabel>
        <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 className="font-display text-4xl italic leading-tight md:text-6xl">
            <span className="text-gradient">A tiny core.</span>{" "}
            <span className="text-accent-gradient">A converter per file.</span>
          </h2>
          <p className="max-w-md text-muted-foreground">
            Every converter is a function{" "}
            <code className="font-mono text-foreground">
              (input, output, **options) → ConversionResult
            </code>
            . Drop it in <code className="font-mono text-foreground">morph/converters/</code> and
            it's live — auto-discovered, wired into the graph, everything that could reach it can
            now reach whatever it produces.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div className="glass overflow-hidden rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              morph/
            </p>
            <div className="mt-4 space-y-1 font-mono text-sm">
              {FILES.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-baseline justify-between gap-4 rounded-md px-2 py-1.5 transition hover:bg-surface-elevated"
                >
                  <span className="text-foreground">
                    <span className="text-primary">├──</span> {f.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">{f.d}</span>
                </motion.div>
              ))}
              <div className="mt-2 pl-2 font-mono text-sm text-primary">└── converters/</div>
              <div className="pl-6 font-mono text-xs text-muted-foreground">
                csv_to_xlsx · documents · images · audio · video · fonts · ebooks · archives · svg …
              </div>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              adding a converter
            </p>
            <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-relaxed">
              {`from ..registry import (
  ConversionResult, OptionSpec, register,
)

OPTIONS = [
  OptionSpec("quality", ("--quality",),
    "Output quality (1-100).",
    default=85, type=int),
]

`}
              <span className="text-primary">{`@register("foo", "bar", family="image",
          backend="sometool", options=OPTIONS)`}</span>
              {`
def foo_to_bar(input, output, *, quality=85, **_):
    # ... do the conversion ...
    return ConversionResult(output=output)`}
            </pre>
            <p className="mt-4 text-xs text-muted-foreground">
              That's the whole integration. No CLI wiring, no imports to add elsewhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA / Install ---------------- */
export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-word", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      } as gsap.TweenVars);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="install" ref={ref} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionLabel>07 · get morph</SectionLabel>
        <h2 className="mt-8 text-balance font-display text-6xl md:text-[9rem]">
          <span className="block relative z-20">
            <span className="cta-word block leading-normal text-gradient">One command.</span>
          </span>
          <span className="block relative z-10 -mt-[0.25em]">
            <span className="cta-word block leading-normal italic text-accent-gradient pb-4">Everything else.</span>
          </span>
        </h2>

        <div className="mx-auto mt-14 max-w-2xl text-left">
          <Tabs defaultValue="windows" className="w-full">
            <div className="mb-6 flex justify-center">
              <TabsList className="h-auto rounded-full border border-border bg-surface/50 p-1">
                <TabsTrigger
                  value="windows"
                  className="rounded-full px-4 py-1.5 font-mono text-xs transition data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Windows
                </TabsTrigger>
                <TabsTrigger
                  value="macos"
                  className="rounded-full px-4 py-1.5 font-mono text-xs transition data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  macOS
                </TabsTrigger>
                <TabsTrigger
                  value="python"
                  className="rounded-full px-4 py-1.5 font-mono text-xs transition data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Pipx
                </TabsTrigger>
                <TabsTrigger
                  value="source"
                  className="rounded-full px-4 py-1.5 font-mono text-xs transition data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none"
                >
                  Source
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="windows">
              <InstallCommand
                code="winget install hariharen.morph"
                note="via Winget (Recommended). Standalone binary, no Python required."
              />
            </TabsContent>
            <TabsContent value="macos">
              <InstallCommand
                code="brew tap hariharen9/homebrew-tap && brew install morph"
                note="via Homebrew. Standalone binary, no Python required."
              />
            </TabsContent>
            <TabsContent value="python">
              <InstallCommand
                code="pipx install morphconv"
                note="via PyPI using pipx. Global installation in isolated environment."
              />
            </TabsContent>
            <TabsContent value="source">
              <InstallCommand
                code="git clone https://github.com/hariharen9/morph && cd morph && pip install -e ."
                note="Clone and install in editable mode for development."
              />
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center font-mono text-[11px] text-muted-foreground">
            Dependencies like pandoc &amp; ffmpeg are auto-detected and installed on first use.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/hariharen9/morph"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            star on github
            <span>↗</span>
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-6 py-3 font-mono text-sm text-foreground backdrop-blur"
          >
            back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <div className="font-display text-3xl italic text-gradient">morph</div>
          <p className="mt-2 max-w-sm font-mono text-xs text-muted-foreground">
            Convert anything to anything, from the CLI. Local-first, MIT-licensed, pluggable by
            design.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs text-muted-foreground sm:grid-cols-3">
          <a href="#features" className="hover:text-foreground">
            features
          </a>
          <a href="#terminal" className="hover:text-foreground">
            demo
          </a>
          <a href="#formats" className="hover:text-foreground">
            formats
          </a>
          <a href="#architecture" className="hover:text-foreground">
            architecture
          </a>
          <a
            href="https://github.com/hariharen9/morph"
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          <a href="#install" className="hover:text-foreground">
            install
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row">
        <div>
          © {new Date().getFullYear()} morph · MIT · built with pandoc, ffmpeg, pillow &amp; a lot of
          love
        </div>
        <div>
          Built with 💖 by{" "}
          <a
            href="https://hariharen.site"
            target="_blank"
            rel="noreferrer"
            className="text-foreground transition-colors hover:text-primary"
          >
            Hariharen
          </a>
        </div>
      </div>
    </footer>
  );
}

function InstallCommand({ code, note }: { code: string; note: string }) {
  return (
    <div>
      <div className="glass flex items-center justify-between gap-4 rounded-2xl border border-border-strong px-5 py-4 text-left font-mono text-sm shadow-soft">
        <div className="flex items-center gap-3 truncate">
          <span className="text-primary">$</span>
          <span className="truncate text-foreground">{code}</span>
        </div>
        <button
          onClick={() => navigator.clipboard?.writeText(code)}
          className="shrink-0 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-[11px] uppercase tracking-widest text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
        >
          copy
        </button>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">{note}</p>
    </div>
  );
}
