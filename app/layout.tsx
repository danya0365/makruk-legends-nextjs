import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Makruk Legends - หมากรุกไทยออนไลน์",
  description: "เล่นหมากรุกไทยออนไลน์ แข่งขันทัวร์นาเม้นต์ระดับโลก พร้อมระบบจัดอันดับและชุมชนผู้เล่น",
  keywords: ["หมากรุก", "หมากรุกไทย", "Makruk", "Thai Chess", "Online Chess", "Tournament", "Leaderboard"],
  authors: [{ name: "Makruk Legends Team" }],
  openGraph: {
    title: "Makruk Legends - หมากรุกไทยออนไลน์",
    description: "เล่นหมากรุกไทยออนไลน์ แข่งขันทัวร์นาเม้นต์ระดับโลก",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
