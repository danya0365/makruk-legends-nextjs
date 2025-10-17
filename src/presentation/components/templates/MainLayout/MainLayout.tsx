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
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <header className="border-b border-border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="rounded bg-primary px-2 py-1 text-primary-foreground">ML</span>
            <span>Makruk Legends</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="transition hover:text-primary">
              Features
            </Link>
            <Link href="#tournaments" className="transition hover:text-primary">
              Tournaments
            </Link>
            <Link href="#community" className="transition hover:text-primary">
              Community
            </Link>
            <Link href="#leaderboard" className="transition hover:text-primary">
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Join Now
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto min-h-[calc(100vh-12rem)] max-w-6xl px-6 py-10">{children}</main>
      <footer className="border-t border-border bg-card/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-foreground">Makruk Legends</p>
            <p className="mt-1 max-w-xl">
              Competitive Makruk platform featuring global tournaments, ranked ladder, and a vibrant community hub for Thai chess enthusiasts.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="transition hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="transition hover:text-primary">
              Privacy
            </Link>
            <Link href="/support" className="transition hover:text-primary">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
