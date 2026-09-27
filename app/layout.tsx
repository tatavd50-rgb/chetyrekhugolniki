import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Caveat, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Square } from "lucide-react";
import { sections, type Section } from "@/lib/data";
import { BridgeProvider } from "@/components/bridge-provider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-hand",
});

const appName = "Четырёхугольники — 8 класс";

function HeaderNavLink({ section }: { section: Section }) {
  const Icon = section.icon;
  return (
    <a
      href={`#${section.id}`}
      className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-white/80 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-4 w-4 shrink-0 text-primary/80" />
      <span className="lg:hidden">{section.shortTitle}</span>
      <span className="hidden lg:inline">{section.title}</span>
    </a>
  );
}

export const metadata: Metadata = {
  title: appName,
  description: appName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn("font-sans", geist.variable, caveat.variable)}
    >
      <body className="antialiased min-h-screen bg-background flex flex-col">
        <BridgeProvider />
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 md:h-14 md:flex-nowrap md:py-0">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 text-base font-semibold tracking-tight sm:text-lg"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Square className="h-3.5 w-3.5 rotate-45" />
              </div>
              <span className="hidden truncate sm:inline">{appName}</span>
            </Link>
            <nav
              aria-label="Разделы курса"
              className="-mx-1 order-last flex w-full min-w-0 items-center gap-1 overflow-x-auto px-1 pb-0.5 md:order-none md:mx-0 md:w-auto md:px-0 md:pb-0"
            >
              {sections.map((section) => (
                <HeaderNavLink key={section.id} section={section} />
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t">
          <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
            © Т.В.Докина. Четырехугольники. 8 класс. 2026 год
          </div>
        </footer>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
