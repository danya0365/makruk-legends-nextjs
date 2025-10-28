import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import { ProfilePresenterFactory } from "@/src/presentation/presenters/profile/ProfilePresenter";
import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await ProfilePresenterFactory.createServer();

  try {
    return await presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "โปรไฟล์ | Makruk Legends",
      description: "ดูโปรไฟล์และสถิติของผู้เล่น",
    };
  }
}

/**
 * Profile page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function ProfilePage() {
  const presenter = await ProfilePresenterFactory.createServer();

  try {
    // Get view model from presenter (user will be loaded client-side)
    const viewModel = await presenter.getViewModel(null);

    return (
      <MainLayout>
        <ProfileView initialViewModel={viewModel} />
      </MainLayout>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);

    // Fallback UI
    return (
      <MainLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              เกิดข้อผิดพลาด
            </h1>
            <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลโปรไฟล์ได้</p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
