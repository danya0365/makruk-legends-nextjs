import { TournamentsView } from "@/src/presentation/components/tournaments/TournamentsView";
import { TournamentsPresenterFactory } from "@/src/presentation/presenters/tournaments/TournamentsPresenter";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await TournamentsPresenterFactory.createServer();

  try {
    return await presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "ทัวร์นาเม้นต์ | Makruk Legends",
      description: "เข้าร่วมทัวร์นาเม้นต์หมากรุกไทยออนไลน์",
    };
  }
}

/**
 * Tournaments page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function TournamentsPage() {
  const presenter = await TournamentsPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <MainLayout>
        <TournamentsView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching tournaments data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลทัวร์นาเม้นต์ได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
