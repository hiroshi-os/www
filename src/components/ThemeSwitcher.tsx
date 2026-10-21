"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

// The theme is only known in the browser, so the switcher renders a placeholder
// on the server and the real control after the hydration. `useSyncExternalStore`
// says that without the setState-in-an-effect the lint rule complains about.
const emptySubscribe = () => () => {};

export function PixelThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div className="h-5 w-10 rounded-full border border-border bg-muted p-[1px]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-5 w-10 cursor-pointer items-center rounded-full border border-border bg-muted p-[1px] transition-colors duration-200 focus:outline-none"
      aria-label="Theme Switcher"
    >
      <div
        className={`size-3.5 rounded-[3px] border border-border bg-foreground transition-transform duration-200 ${
          isDark ? "translate-x-[20px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}
