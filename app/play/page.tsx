import { PlayView } from "@/src/presentation/components/play/PlayView";
import { PlayPresenterFactory } from "@/src/presentation/presenters/play/PlayPresenter";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await PlayPresenterFactory.createServer();

  try {
    return await presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "เล่นเกม | Makruk Legends",
      description: "เลือกโหมดเกมและเริ่มเล่นหมากรุกไทยออนไลน์",
    };
  }
}

/**
 * Play page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function PlayPage() {
  const presenter = await PlayPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <PlayView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching play data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลการเล่นได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
