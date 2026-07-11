import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404 · not found
        </p>
        <h1 className="mt-4 font-display text-6xl italic text-gradient">Page missing</h1>
        <p className="mt-3 text-sm text-muted-foreground">This route hasn't been converted yet.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition hover:bg-surface-elevated"
        >
          ← back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl italic text-gradient">Something didn't convert</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-5 py-2 font-mono text-xs uppercase tracking-widest text-primary-foreground"
          >
            retry
          </button>
          <a
            href="/"
            className="rounded-full border border-border-strong px-5 py-2 font-mono text-xs uppercase tracking-widest"
          >
            home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Morph — Convert anything to anything, from the CLI." },
      {
        name: "description",
        content:
          "One command. No format-specific tools to remember. No cloud upload. No API keys. Morph orchestrates ffmpeg, pandoc, Pillow and more behind a single, predictable interface.",
      },
      { name: "author", content: "Morph" },
      { name: "theme-color", content: "#0b0f0d" },
      { property: "og:title", content: "Morph — Convert anything to anything, from the CLI." },
      {
        property: "og:description",
        content: "66 formats. 1,000+ multi-hop routes. One verb: morph.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Morph — Convert anything to anything, from the CLI." },
      {
        name: "twitter:description",
        content: "66 formats. 1,000+ multi-hop routes. One verb: morph.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
