import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiroshi - a GPU-native multi-agent cockpit",
  description:
    "Hiroshi is a multi-agent orchestration cockpit rendered on the GPU with GPUIX. No Electron, no web view: the transcript, the composer and the window chrome are one GPU surface.",
  metadataBase: new URL("https://www.hiroshios.xyz"),
  openGraph: {
    title: "Hiroshi - a GPU-native multi-agent cockpit",
    description:
      "A multi-agent orchestration cockpit rendered on the GPU with GPUIX.",
    url: "https://www.hiroshios.xyz",
    siteName: "Hiroshi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiroshi - a GPU-native multi-agent cockpit",
    description:
      "A multi-agent orchestration cockpit rendered on the GPU with GPUIX.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
