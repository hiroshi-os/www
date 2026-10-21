"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PixelThemeSwitcher } from "../components/ThemeSwitcher";

const DOCS = "https://docs.hiroshios.xyz";
const REPO = "https://github.com/hiroshi-os/Hiroshi";
const RELEASES = `${REPO}/releases`;
const CHANGELOG = `${REPO}/blob/main/CHANGELOG.md`;
const MILESTONE = `${REPO}/milestone/1`;
const ISSUES = `${REPO}/issues`;

const HIROSHI_ASCII = `██   ██  ███████  ██████    ██████   ██████  ██   ██  ███████
██   ██    ██     ██   ██  ██    ██ ██       ██   ██    ██
███████    ██     ██████   ██    ██  ██████  ███████    ██
██   ██    ██     ██   ██  ██    ██       ██ ██   ██    ██
██   ██  ███████  ██   ██   ██████   ██████  ██   ██  ███████`;

const GLITCH_GLYPHS = ["░", "▒", "▓", "X", "0", "1", "?", "*", "#", "H", "I", "R", "O", "S", "H", "I"];

function useGlitchTitle() {
  const [glitch, setGlitch] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      const chars = HIROSHI_ASCII.split("");
      const glitched = chars.map((char) => {
        if (char === " " || char === "\n") return char;
        if (Math.random() < 0.15) {
          return GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];
        }
        return char;
      });
      setGlitch(glitched.join(""));
    }, 80);

    return () => clearInterval(interval);
  }, [isHovered]);

  // The clean title is derived, so the pointer leaving it needs no reset.
  const display = isHovered && glitch !== null ? glitch : HIROSHI_ASCII;

  return { display, isHovered, setIsHovered };
}

function BlockTitle() {
  const { display, isHovered, setIsHovered } = useGlitchTitle();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="select-none overflow-x-auto max-w-full cursor-pointer"
    >
      <pre
        className={`block-art text-[9px] sm:text-[11px] leading-[1.15] font-bold tracking-tight inline-block text-left transition-colors duration-150 ${
          isHovered ? "text-brand" : "text-foreground"
        }`}
      >
        {display}
      </pre>
    </div>
  );
}

function Icon({ path, className = "" }: { path: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 text-muted-foreground ${className}`}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const FEATURES = [
  {
    icon: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",
    title: "Native down to the frame",
    body: "React on GPUI, the GPU accelerated framework behind Zed. Instant launch, smooth scrolling through years of transcript, no Electron.",
  },
  {
    icon: "M12.83 2.18a2 2 0 00-1.66 0L2.6 6.08a1 1 0 000 1.83l8.58 3.91a2 2 0 001.66 0l8.58-3.9a1 1 0 000-1.83z M2 12a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9A1 1 0 0022 12 M2 17a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9A1 1 0 0022 17",
    title: "One surface, no DOM",
    body: "The transcript, the composer, the panels and the window chrome are a single GPU surface. There is no browser engine between you and the work.",
  },
  {
    icon: "M4 5h16v14H4z M4 9h16",
    title: "The window is yours",
    body: "No native titlebar. The chrome spans the whole window, and the titlebar drags it, maximizes it and restores it on every platform.",
  },
  {
    icon: "M4 17l6-6-6-6 M12 19h8",
    title: "Every surface next to the work",
    body: "A browser, a terminal, a file tree and a review panel in the right drawer, so the run and the code it touches sit side by side.",
  },
  {
    icon: "M10 16h.01 M2.212 11.577a2 2 0 00-.212.896V18a2 2 0 002 2h16a2 2 0 002-2v-5.527a2 2 0 00-.212-.896L18.55 5.11A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z M21.946 12.013H2.054 M6 16h.01",
    title: "Local by architecture",
    body: "The workspace, the transcripts and the configuration live on your disk. No account, no telemetry, no cloud between you and your agents.",
  },
  {
    icon: "M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8 M21 3v5h-5 M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16 M8 16H3v5",
    title: "Quietly current",
    body: "The integration suite drives the real app on the GPU test renderer, and it runs on macOS and Windows on every push.",
  },
];

const QUESTIONS = [
  {
    question: "Is this another Electron app?",
    answer:
      "No. Hiroshi is React on GPUIX, the React reconciler over Zed's native GPUI engine. There is no browser engine and no web view: the transcript, the composer and the window chrome are painted on the GPU at 120 frames per second.",
  },
  {
    question: "What do I need to run it?",
    answer:
      "Bun and a GPU. Metal on macOS, Direct3D on Windows, Vulkan on Linux. The native addon ships prebuilt for all three, so there is no Rust toolchain to install.",
  },
  {
    question: "Where does my data live?",
    answer:
      "On your disk. The workspace, the transcripts and the configuration are local files. No account, no telemetry, no cloud between you and your agents.",
  },
  {
    question: "Is it finished?",
    answer:
      "Not yet. The cockpit is there, the orchestration behind it is not. The 1.0.0 milestone tracks what is left, and the issues under it are open to anyone.",
  },
];

const STACK = [
  { name: "GPUIX", href: "https://github.com/remorses/gpuix" },
  { name: "GPUI", href: "https://github.com/zed-industries/zed" },
  { name: "React", href: "https://react.dev" },
  { name: "Bun", href: "https://bun.sh" },
];

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`transition-colors ${className}`}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <div className="mx-auto w-full max-w-[1100px] border-border md:border-x">
        <header className="flex h-16 items-center justify-between px-5 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/icon.svg"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-[6px]"
            />
            <span className="text-[15px] font-semibold tracking-tight">Hiroshi</span>
          </Link>

          <div className="flex items-center gap-5">
            <ExternalLink
              href={REPO}
              className="rounded-full text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-6"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 1.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
              </svg>
            </ExternalLink>

            <ExternalLink
              href={`${DOCS}/getting-started`}
              className="inline-flex h-7 items-center rounded-[6px] bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Get started
            </ExternalLink>

            <PixelThemeSwitcher />
          </div>
        </header>

        <main>
          <section className="px-5 pt-14 pb-14 md:px-10 md:pt-20">
            <BlockTitle />

            <div className="mt-12 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="flex size-3.5 items-center justify-center rounded-[3px] bg-brand text-[10px] font-bold text-white">
                H
              </span>
              No Electron, no web view
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-balance md:text-[3.4rem] md:leading-[1.04]">
              One GPU native cockpit for every agent in the swarm.
            </h1>

            <p className="mt-5 max-w-[36rem] text-[17px] leading-relaxed text-pretty text-muted-foreground">
              Hiroshi renders the whole cockpit on the GPU with GPUIX: the
              transcript, the composer, the surfaces and the window chrome are
              one surface at 120 frames per second, entirely on your machine.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ExternalLink
                href={`${DOCS}/getting-started`}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M12 15V3" />
                  <path d="M21 15v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4" />
                  <path d="m7 10 5 5 5-5" />
                </svg>
                Get started
              </ExternalLink>

              <ExternalLink
                href={REPO}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Read the source
                <span aria-hidden="true">→</span>
              </ExternalLink>
            </div>

            <div className="mt-16">
              <div className="eyebrow">Built on</div>
              <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4">
                {STACK.map((item) => (
                  <ExternalLink
                    key={item.name}
                    href={item.href}
                    className="text-[15px] font-semibold tracking-tight text-muted-foreground/70 hover:text-foreground"
                  >
                    {item.name}
                  </ExternalLink>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 pb-14 md:px-10">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <Image
                src="/cockpit.png"
                alt="The Hiroshi cockpit: the conversation sidebar, the transcript and the composer"
                width={1180}
                height={820}
                className="block h-auto w-full"
              />
            </div>
          </section>

          <section className="border-t">
            <div className="px-5 pt-14 md:px-10">
              <div className="eyebrow">Why native</div>
              <div className="mt-8 grid grid-cols-1 gap-px border-t bg-border sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="bg-background p-6 md:p-8">
                    <div className="flex items-center gap-2.5">
                      <Icon path={feature.icon} />
                    </div>
                    <h3 className="mt-4 text-sm font-medium">{feature.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {feature.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="get-started" className="border-t px-5 py-16 md:px-10 md:py-20">
            <div className="eyebrow">Get started</div>
            <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Clone it and run it.
                </h2>
                <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-muted-foreground">
                  The native addon ships prebuilt for macOS, Windows and Linux,
                  so there is no Rust toolchain to install. The repository
                  carries the rules the app is built under, the integration
                  suite, and the changelog.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <ExternalLink
                    href={REPO}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                      aria-hidden="true"
                    >
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 1.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                    </svg>
                    Repository
                  </ExternalLink>
                  <ExternalLink
                    href={RELEASES}
                    className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    Releases
                  </ExternalLink>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    bash
                  </span>
                  <div className="w-12" />
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
                  <code>
                    <span className="text-muted-foreground">$ </span>
                    {"git clone https://github.com/hiroshi-os/Hiroshi\n"}
                    <span className="text-muted-foreground">$ </span>
                    {"cd Hiroshi\n"}
                    <span className="text-muted-foreground">$ </span>
                    {"bun install\n"}
                    <span className="text-muted-foreground">$ </span>
                    {"bun run dev"}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section className="border-t px-5 py-16 md:px-10 md:py-20">
            <div className="eyebrow">Questions</div>
            <div className="mt-8 divide-y divide-border border-t border-border">
              {QUESTIONS.map((entry) => (
                <div key={entry.question} className="py-6 md:py-7">
                  <h3 className="text-[15px] font-medium">{entry.question}</h3>
                  <p className="mt-2 max-w-[46rem] text-sm leading-relaxed text-muted-foreground">
                    {entry.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t px-5 py-8 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>© 2026 Hiroshi</span>
            <div className="flex items-center gap-5">
              <ExternalLink href={DOCS} className="hover:text-foreground">
                Docs
              </ExternalLink>
              <ExternalLink href={CHANGELOG} className="hover:text-foreground">
                Changelog
              </ExternalLink>
              <ExternalLink href={MILESTONE} className="hover:text-foreground">
                Milestone
              </ExternalLink>
              <ExternalLink href={ISSUES} className="hover:text-foreground">
                Issues
              </ExternalLink>
              <ExternalLink href={REPO} className="hover:text-foreground">
                github.com/hiroshi-os/Hiroshi
              </ExternalLink>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
