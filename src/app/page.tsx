"use client";

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
██████    ██     ██████   ██    ██  ██████  ███████    ██
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

function InteractiveTitle() {
  const { display, isHovered, setIsHovered } = useGlitchTitle();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="mb-10 text-center select-none overflow-x-auto max-w-full cursor-pointer"
    >
      <pre
        className={`text-[10px] sm:text-xs leading-none font-bold tracking-tight inline-block text-left transition-colors duration-150 ${
          isHovered
            ? "text-accent-500 dark:text-accent-400 font-mono"
            : "dark:text-zinc-50 text-zinc-900 font-mono"
        }`}
      >
        {display}
      </pre>
    </div>
  );
}

function GiantInteractiveTitle() {
  const { display, isHovered, setIsHovered } = useGlitchTitle();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-center select-none overflow-hidden cursor-pointer w-full flex justify-center py-10"
    >
      <pre
        className={`text-[3vw] md:text-[2vw] leading-none font-bold tracking-tight inline-block text-left transition-colors duration-150 ${
          isHovered
            ? "text-accent-500 dark:text-accent-400 font-mono"
            : "dark:text-zinc-50 text-zinc-900 font-mono"
        }`}
      >
        {display}
      </pre>
    </div>
  );
}

const STACK = [
  { name: "GPUIX", href: "https://github.com/remorses/gpuix" },
  { name: "GPUI", href: "https://github.com/zed-industries/zed" },
  { name: "React", href: "https://react.dev" },
  { name: "Bun", href: "https://bun.sh" },
];

const PILLARS = [
  {
    title: "The cockpit",
    body: "A transcript, a composer, a conversation sidebar, an inspector and a settings view, with the model, the reasoning level, the access mode and the mode right under the field.",
  },
  {
    title: "The surfaces",
    body: "A browser, a terminal, a file browser and a review panel in the right drawer, so the run and the work it touches sit next to each other.",
  },
  {
    title: "The window",
    body: "No native titlebar. The chrome spans the whole window, and the titlebar drags it, maximizes it and restores it on every platform.",
  },
];

const STEPS = [
  {
    title: "Run.",
    body: "Clone the repository, install with Bun, and start the cockpit. The GPUIX native addon ships prebuilt for macOS, Windows and Linux.",
  },
  {
    title: "Drive.",
    body: "Send a draft. The transcript fills with the turns of the run, and the inspector reports what the agents are doing while they do it.",
  },
  {
    title: "Watch.",
    body: "Open the browser, the terminal, the files or the review surface on the right. The command palette is one keypress away.",
  },
];

const FAQ = [
  {
    question: "Is Hiroshi a web app?",
    answer:
      "No. There is no Electron, no web view and no DOM. The interface is painted on the GPU through GPUIX, the React reconciler over Zed's native GPUI engine, at 120 frames per second.",
  },
  {
    question: "What does it need to run?",
    answer:
      "Bun and a GPU. Metal on macOS, Direct3D on Windows, Vulkan on Linux. The native addon is prebuilt for all three, so there is no Rust toolchain to install.",
  },
  {
    question: "Where do the models run?",
    answer:
      "Wherever you point them. The cockpit is the interface to a run: it drives the agents, holds the transcript, and keeps the surfaces next to the work.",
  },
];

function NavLink({ href, children, external = true }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="hover:text-zinc-900 dark:hover:text-zinc-100 text-zinc-650 dark:text-zinc-400 transition"
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-800 dark:text-zinc-300 flex flex-col font-mono selection:bg-accent-500/20 selection:text-accent-300 transition-colors duration-200">
      <div className="dither-overlay" />
      {/* Custom Centered Navigation Bar */}
      <nav
        className={`bg-zinc-50 dark:bg-[#09090b] px-6 py-4 flex flex-wrap items-center justify-center gap-6 text-sm tracking-wider font-mono select-none w-full sticky top-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "border-b border-zinc-200 dark:border-zinc-800"
            : "border-b border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-5 w-5 border border-zinc-700 bg-zinc-900 flex items-center justify-center font-bold text-zinc-100 text-[10px]">
            H
          </div>
          <span className="font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
            HIROSHI
          </span>
        </Link>

        <span className="text-zinc-300 dark:text-zinc-800">|</span>

        <NavLink href={DOCS}>Docs</NavLink>
        <NavLink href={CHANGELOG}>Changelog</NavLink>
        <NavLink href={REPO}>Repository</NavLink>
        <NavLink href={RELEASES}>Releases</NavLink>

        <span className="text-zinc-305 dark:text-zinc-800">|</span>

        <NavLink href={`${DOCS}/getting-started`} external={false}>
          <span className="custom-download-btn px-4 py-1.5 rounded text-xs font-semibold transition">
            Get started
          </span>
        </NavLink>

        <PixelThemeSwitcher />
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-40 pb-20 px-6 max-w-6xl mx-auto w-full relative z-10">
        <InteractiveTitle />

        {/* Hero Copy */}
        <div className="text-center max-w-2xl mb-14">
          <h2 className="text-xl dark:text-zinc-100 text-zinc-900 font-semibold mb-5 tracking-tight">
            A GPU-native cockpit for multi-agent development swarms
          </h2>
          <p className="text-sm dark:text-zinc-300 text-zinc-600 leading-relaxed font-sans">
            Hiroshi is a multi-agent orchestration cockpit rendered on the GPU
            with GPUIX. No Electron, no web view: the transcript, the composer
            and the window chrome are one GPU surface, painted at 120 frames
            per second.
          </p>
        </div>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
          <a
            href={`${DOCS}/getting-started`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 px-8 py-3.5 rounded-lg text-sm font-semibold transition flex items-center justify-center space-x-2 font-sans shadow"
          >
            <span>Get started</span>
            <svg
              className="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          </a>

          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto border dark:border-zinc-800 border-zinc-300 dark:bg-zinc-900/30 bg-zinc-100/50 hover:dark:bg-zinc-900/80 hover:dark:border-zinc-200 text-zinc-700 dark:text-zinc-200 px-8 py-3.5 rounded-lg text-sm font-semibold transition flex items-center justify-center space-x-2 font-sans"
          >
            <span>Read the source</span>
            <span className="text-zinc-400">→</span>
          </a>
        </div>

        {/* Installation Terminal Box */}
        <div className="w-full max-w-2xl border dark:border-zinc-800 border-zinc-300 bg-zinc-100 dark:bg-[#18181b] rounded-lg overflow-hidden shadow-sm mb-28 font-mono">
          <div className="flex items-center justify-between px-4 py-2 border-b dark:border-zinc-800 border-zinc-200 bg-zinc-250 dark:bg-zinc-900/50 text-xs dark:text-zinc-400 text-zinc-650">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
            </div>
            <span>bash</span>
            <div className="w-10" />
          </div>
          <div className="p-5 text-sm dark:text-zinc-100 text-zinc-800 space-y-1 select-all overflow-x-auto leading-relaxed">
            <div className="flex">
              <span className="text-zinc-400 dark:text-zinc-600 mr-3 select-none">
                $
              </span>
              git clone https://github.com/hiroshi-os/Hiroshi
            </div>
            <div className="flex">
              <span className="text-zinc-400 dark:text-zinc-600 mr-3 select-none">
                $
              </span>
              cd Hiroshi
            </div>
            <div className="flex">
              <span className="text-zinc-400 dark:text-zinc-600 mr-3 select-none">
                $
              </span>
              bun install
            </div>
            <div className="flex">
              <span className="text-zinc-400 dark:text-zinc-600 mr-3 select-none">
                $
              </span>
              bun run dev
            </div>
          </div>
        </div>

        {/* Powered by */}
        <div className="w-full text-center mb-28">
          <div className="text-xs uppercase tracking-widest dark:text-zinc-500 text-zinc-400 mb-10 font-bold">
            [ Powered by ]
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 max-w-4xl mx-auto select-none">
            {STACK.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-bold tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-100 transition duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* What the cockpit is */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32 text-sm tracking-normal font-sans">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900/10 bg-zinc-150/10 rounded-xl flex flex-col justify-between space-y-6"
            >
              <h4 className="font-semibold dark:text-zinc-100 text-zinc-900 text-base">
                {pillar.title}
              </h4>
              <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="w-full max-w-3xl mb-32">
          <div className="flex justify-center mb-8">
            <span className="border dark:border-zinc-800 border-zinc-200 text-xs dark:text-zinc-300 text-zinc-600 dark:bg-zinc-900 bg-zinc-100 px-4 py-1.5 rounded font-bold uppercase tracking-wider">
              How it works
            </span>
          </div>

          <div className="space-y-8 font-sans text-sm">
            {STEPS.map((step, index) => (
              <div key={step.title} className="flex items-start space-x-5">
                <span className="font-mono dark:text-zinc-500 text-zinc-400 font-bold text-base">
                  {index + 1}.
                </span>
                <div>
                  <h4 className="font-semibold dark:text-zinc-200 text-zinc-900 mb-1.5 text-base">
                    {step.title}
                  </h4>
                  <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-3xl mb-32">
          <div className="flex justify-center mb-8">
            <span className="border dark:border-zinc-800 border-zinc-200 text-xs dark:text-zinc-300 text-zinc-600 dark:bg-zinc-900 bg-zinc-100 px-4 py-1.5 rounded font-bold uppercase tracking-wider">
              Frequently asked questions
            </span>
          </div>

          <div className="space-y-8 font-sans text-sm">
            {FAQ.map((entry) => (
              <div key={entry.question}>
                <h4 className="font-semibold dark:text-zinc-200 text-zinc-900 mb-2 text-base">
                  {entry.question}
                </h4>
                <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {entry.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="w-full text-center border-t dark:border-zinc-900 border-zinc-200 pt-20 flex flex-col items-center">
          <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-8 font-sans">
            The cockpit, the documentation, and the source. Everything runs on
            your machine.
          </p>
          <a
            href={`${DOCS}/getting-started`}
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 px-8 py-4 rounded-lg text-sm font-semibold transition flex items-center justify-center space-x-2 font-sans shadow"
          >
            <span>Get started</span>
            <svg
              className="w-4.5 h-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t dark:border-zinc-900 border-zinc-200 dark:bg-zinc-955/20 bg-zinc-100/20 px-6 py-16 text-sm font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <span className="text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-400 block mb-4 font-mono font-bold">
              [Project]
            </span>
            <div className="space-y-2 dark:text-zinc-400 text-zinc-600">
              <NavLink href={REPO}>Repository</NavLink>
              <NavLink href={RELEASES}>Releases</NavLink>
              <NavLink href={MILESTONE}>Milestone</NavLink>
              <NavLink href={ISSUES}>Issues</NavLink>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-400 block mb-4 font-mono font-bold">
              [Resources]
            </span>
            <div className="space-y-2 dark:text-zinc-400 text-zinc-600">
              <NavLink href={DOCS}>Docs</NavLink>
              <NavLink href={CHANGELOG}>Changelog</NavLink>
              <NavLink href={`${DOCS}/architecture`}>Architecture</NavLink>
              <NavLink href={`${DOCS}/window`}>The window</NavLink>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-400 block mb-4 font-mono font-bold">
              [Community]
            </span>
            <div className="space-y-2 dark:text-zinc-400 text-zinc-600">
              <NavLink href={ISSUES}>Open an issue</NavLink>
              <NavLink href={`${REPO}/discussions`}>Discussions</NavLink>
              <NavLink href={`${DOCS}/development`}>Development</NavLink>
              <NavLink href={`${DOCS}/versioning`}>Versioning</NavLink>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider dark:text-zinc-500 text-zinc-400 block mb-4 font-mono font-bold">
              [Built with]
            </span>
            <div className="space-y-2 dark:text-zinc-400 text-zinc-600">
              <NavLink href="https://github.com/remorses/gpuix">GPUIX</NavLink>
              <NavLink href="https://github.com/zed-industries/zed">GPUI</NavLink>
              <NavLink href="https://react.dev">React</NavLink>
              <NavLink href="https://bun.sh">Bun</NavLink>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs dark:text-zinc-500 text-zinc-400 font-mono">
          <span>© 2026 Hiroshi</span>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-200 transition"
          >
            github.com/hiroshi-os/Hiroshi
          </a>
        </div>
      </footer>

      {/* Huge Interactive Title at the very bottom */}
      <div className="w-full py-20 flex justify-center border-t dark:border-zinc-900 border-zinc-200 select-none overflow-hidden bg-zinc-50 dark:bg-[#09090b]">
        <GiantInteractiveTitle />
      </div>
    </div>
  );
}
