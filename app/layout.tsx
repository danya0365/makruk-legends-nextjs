import { MainLayout } from "@/src/presentation/components/templates/MainLayout/MainLayout";
import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Makruk Legends | Thai Chess Esports Platform",
  description:
    "Join Makruk Legends for competitive Thai chess tournaments, ranked ladders, community hubs, and pro-level analysis tools.",
  keywords: [
    "Makruk",
    "Thai Chess",
    "Esports",
    "Tournament",
    "Leaderboard",
    "Community",
    "Online Chess",
  ],
  openGraph: {
    title: "Makruk Legends | Thai Chess Esports Platform",
    description:
      "Experience world-class Makruk tournaments, leaderboards, and community events tailored for competitive Thai chess players.",
    url: "https://makruk-legends.example.com",
    siteName: "Makruk Legends",
    locale: "th_TH",
    type: "website",
  },
  alternates: {
    canonical: "https://makruk-legends.example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
