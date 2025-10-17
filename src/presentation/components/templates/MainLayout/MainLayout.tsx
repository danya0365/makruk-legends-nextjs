"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

import { ThemeToggle } from "@/src/presentation/components/atoms/theme-toggle/ThemeToggle";
import { cn } from "@/src/utils/cn";

interface MainLayoutProps extends PropsWithChildren {
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-background text-foreground", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-30%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-10%] h-[38rem] w-[38rem] rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute left-[-10%] top-1/3 h-[32rem] w-[32rem] rounded-full bg-sky-500/10 blur-3xl" />
      </div>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-lg">
            <span className="rounded-full border border-primary/40 bg-primary/15 px-2 py-1 text-xs font-bold uppercase text-primary shadow-sm">
              ML
            </span>
            <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
              Makruk Legends
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
            <Link href="#features" className="transition hover:text-foreground">
              Features
            </Link>
            <Link href="#tournaments" className="transition hover:text-foreground">
              Tournaments
            </Link>
            <Link href="#leaderboard" className="transition hover:text-foreground">
              Leaderboard
            </Link>
            <Link href="#community" className="transition hover:text-foreground">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="rounded-full border border-border/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:border-primary/60 hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="hidden rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow-lg transition hover:shadow-xl sm:block"
            >
              Join Now
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl flex-col gap-20 px-6 pb-24 pt-16 sm:gap-24 sm:pt-24">
        {children}
      </main>
      <footer className="border-t border-border/60 bg-background/80 py-10 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Makruk Legends</p>
            <p className="max-w-xl text-sm">
              แพลตฟอร์มหมากรุกไทยครบวงจรสำหรับผู้เล่นทุกระดับ พร้อมการแข่งขันระดับโลก ชุมชนคุณภาพ และเครื่องมือพัฒนาฝีมือแบบครบครัน
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/terms" className="transition hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy
            </Link>
            <Link href="/support" className="transition hover:text-primary">
              Support
            </Link>
            <Link href="/press" className="transition hover:text-primary">
              Press
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
