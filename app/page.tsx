import Link from "next/link";

import { LandingView } from "@/src/presentation/components/landing/LandingView";
import { LandingPresenterFactory } from "@/src/presentation/presenters/landing/LandingPresenter";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating landing metadata:", error);
    return {
      title: "Makruk Legends",
      description: "แพลตฟอร์มหมากรุกไทยออนไลน์สำหรับการแข่งขันและคอมมูนิตี้",
    };
  }
}

export default async function LandingPage() {
  const presenter = await LandingPresenterFactory.createServer();

  try {
    const viewModel = await presenter.getViewModel();
    return <LandingView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error loading landing data:", error);

    return (
      <div className="min-h-[60vh] bg-background px-6 py-16">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-foreground">เกิดข้อผิดพลาดในการโหลดข้อมูล</h1>
          <p className="mt-2 text-muted-foreground">
            ไม่สามารถโหลดข้อมูลหน้า Landing ได้ในขณะนี้ กรุณาลองใหม่อีกครั้งภายหลัง
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            ลองใหม่อีกครั้ง
          </Link>
        </div>
      </div>
    );
  }
}
