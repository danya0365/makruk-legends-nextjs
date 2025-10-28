import { LoginView } from "@/src/presentation/components/auth/login/LoginView";
import { LoginPresenterFactory } from "@/src/presentation/presenters/auth/login/LoginPresenter";
import type { Metadata } from "next";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = await LoginPresenterFactory.createServer();

  try {
    return await presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "เข้าสู่ระบบ | Makruk Legends",
      description: "เข้าสู่ระบบเพื่อเล่นหมากรุกไทยออนไลน์",
    };
  }
}

/**
 * Login page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function LoginPage() {
  const presenter = await LoginPresenterFactory.createServer();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <LoginView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching login data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted mb-4">ไม่สามารถโหลดหน้าเข้าสู่ระบบได้</p>
        </div>
      </div>
    );
  }
}
