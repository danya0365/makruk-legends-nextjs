"use client";

import { ThemeToggle } from "@/src/presentation/components/atoms/theme-toggle/ThemeToggle";
import { cn } from "@/src/utils/cn";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface MainLayoutProps extends PropsWithChildren {
  className?: string;
  hideFooter?: boolean;
}

export function MainLayout({
  children,
  className,
  hideFooter = false,
}: MainLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground antialiased",
        className
      )}
    >
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background via-background/90 to-background/60" />
        <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[40vh] w-[40vh] -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[40vh] rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-sm font-bold text-white shadow-md">
              ML
            </div>
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
              Makruk Legends
            </span>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ฟีเจอร์
            </Link>
            <Link
              href="#tournaments"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              การแข่งขัน
            </Link>
            <Link
              href="#leaderboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              อันดับผู้เล่น
            </Link>
            <Link
              href="#community"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ชุมชน
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              สมัครสมาชิก
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto flex min-h-[calc(100vh-12rem)] flex-col gap-20 px-6 pb-24 pt-16 sm:gap-24 sm:pt-24">
        {children}
      </main>

      {/* Footer */}
      {!hideFooter && (
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
              {/* Brand info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-sm font-bold text-white">
                    ML
                  </div>
                  <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                    Makruk Legends
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  แพลตฟอร์มการแข่งขันหมากรุกไทยออนไลน์ที่สมบูรณ์แบบที่สุด
                </p>
              </div>

              {/* Quick links */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  เมนูหลัก
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      หน้าหลัก
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      ฟีเจอร์
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#tournaments"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      การแข่งขัน
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#leaderboard"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      อันดับผู้เล่น
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  นโยบาย
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      เงื่อนไขการใช้งาน
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      นโยบายความเป็นส่วนตัว
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      นโยบายคุกกี้
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  ติดต่อเรา
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>02-123-4567</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>contact@makruk-legends.com</span>
                  </li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a
                    href="#"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-border/50 pt-8">
              <p className="text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Makruk Legends. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
