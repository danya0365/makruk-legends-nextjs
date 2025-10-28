import { TournamentDetailView } from "@/src/presentation/components/tournament-detail/TournamentDetailView";
import { TournamentDetailPresenterFactory } from "@/src/presentation/presenters/tournament-detail/TournamentDetailPresenter";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface PageProps {
  params: {
    id: string;
  };
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const presenter = await TournamentDetailPresenterFactory.createServer();

  try {
    return await presenter.generateMetadata(params.id);
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Tournament | Makruk Legends",
      description: "Tournament details",
    };
  }
}

/**
 * Tournament Detail page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function TournamentDetailPage({ params }: PageProps) {
  const presenter = await TournamentDetailPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel(params.id);

    return (
      <MainLayout>
        <TournamentDetailView tournamentId={params.id} initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching tournament detail:", error);

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
