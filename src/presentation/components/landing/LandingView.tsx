"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, GraduationCap, LineChart, Trophy, Users } from "lucide-react";

import type { LandingMasterData } from "@/src/domain/models/landing";
import { SectionHeader } from "@/src/presentation/components/molecules/section/SectionHeader";
import { useLandingPresenter } from "@/src/presentation/presenters/landing/useLandingPresenter";
import type { LandingRegionFilter, TournamentStatusFilter } from "@/src/presentation/stores/landingStore";
import { cn } from "@/src/utils/cn";

const highlightIcons = {
  trophy: Trophy,
  users: Users,
  "graduation-cap": GraduationCap,
  "line-chart": LineChart,
  flame: Flame,
} as const;

const regionOptions: { value: LandingRegionFilter; label: string }[] = [
  { value: "all", label: "ทุกภูมิภาค" },
  { value: "asia", label: "เอเชีย" },
  { value: "global", label: "Global" },
  { value: "europe", label: "ยุโรป" },
];

const statusOptions: { value: TournamentStatusFilter; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "registration", label: "เปิดรับสมัคร" },
  { value: "live", label: "ถ่ายทอดสด" },
  { value: "completed", label: "สิ้นสุดแล้ว" },
];

interface LandingViewProps {
  initialViewModel: LandingMasterData;
}

export function LandingView({ initialViewModel }: LandingViewProps) {
  const [state, actions] = useLandingPresenter(initialViewModel);
  const {
    viewModel,
    featuredTournaments,
    filteredTournaments,
    topLeaders,
    trendingCommunities,
    loading,
    error,
    filters,
  } = state;

  if (loading && !viewModel) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground">กำลังโหลดข้อมูล Makruk Legends...</p>
        </div>
      </div>
    );
  }

  if (error && !viewModel) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">เกิดข้อผิดพลาด</h1>
          <p className="text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={actions.loadData}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  if (!viewModel) {
    return null;
  }

  const hero = viewModel.hero;

  return (
    <div className="space-y-24">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              {hero.subtitle}
            </span>
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">{hero.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryCta.href}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur">
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-bold text-foreground">{stat.value}</dd>
                <p className="text-xs text-muted-foreground">{stat.subLabel}</p>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
          <div className="relative space-y-6 p-8">
            <SectionHeader
              eyebrow="LIVE ARENA"
              title="Featured Showdowns"
              description="ติดตามการแข่งขันระดับตำนานและแมตช์พิเศษที่คัดสรรเพื่อคุณ"
            />
            <ul className="space-y-4">
              {featuredTournaments.map((tournament) => (
                <li
                  key={tournament.id}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/60 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tournament.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tournament.format} · {tournament.timeControl}
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {tournament.status === "registration" ? "เปิดรับสมัคร" : tournament.status === "live" ? "ถ่ายทอดสด" : "สิ้นสุดแล้ว"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="space-y-10">
        <SectionHeader
          eyebrow="MAKRUK ECOSYSTEM"
          title="ยกระดับประสบการณ์หมากรุกไทยในทุกมิติ"
          description="ระบบการเล่น การเรียนรู้ และชุมชนครบถ้วนทัดเทียมแพลตฟอร์มระดับโลก"
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {viewModel.highlights.map((highlight) => {
            const Icon = highlightIcons[highlight.icon as keyof typeof highlightIcons] ?? Trophy;
            return (
              <div
                key={highlight.id}
                className="group rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
              >
                <Icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-semibold text-foreground">{highlight.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="tournaments" className="space-y-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            eyebrow="TOURNAMENT CIRCUIT"
            title="รายการแข่งขัน Makruk Legends"
            description="เลือกทัวร์นาเมนต์ที่เหมาะกับคุณ ทั้ง Arena, Swiss, Knockout และทีม"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={filters.region}
              onChange={(event) => actions.setRegion(event.target.value as LandingRegionFilter)}
              className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
            >
              {regionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={filters.tournamentStatus}
              onChange={(event) => actions.setTournamentStatus(event.target.value as TournamentStatusFilter)}
              className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={actions.toggleFeatured}
              className={cn(
                "rounded-full border border-border/70 px-4 py-2 text-sm font-medium transition",
                filters.showOnlyFeatured ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              แสดงเฉพาะ Featured
            </button>
            <button
              type="button"
              onClick={actions.resetFilters}
              className="rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary"
            >
              รีเซ็ต
            </button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredTournaments.map((tournament) => (
            <article
              key={tournament.id}
              className="flex flex-col justify-between rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {tournament.format}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {new Intl.DateTimeFormat("th-TH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(tournament.startDate))}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{tournament.name}</h3>
                <p className="text-sm text-muted-foreground">{tournament.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-3 py-1">{tournament.timeControl}</span>
                  <span className="rounded-full bg-muted px-3 py-1">{tournament.prizePool}</span>
                  <span className="rounded-full bg-muted px-3 py-1">
                    {tournament.registeredPlayers}/{tournament.playerCap} Players
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1">{tournament.region.toUpperCase()}</span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Link href={`/tournaments/${tournament.id}`} className="text-sm font-semibold text-primary hover:underline">
                  รายละเอียดการแข่งขัน
                </Link>
                <button
                  type="button"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  {tournament.status === "registration" ? "สมัครเข้าร่วม" : tournament.status === "live" ? "รับชมสด" : "ดูสรุปผล"}
                </button>
              </div>
            </article>
          ))}
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-border/70 p-12 text-center text-muted-foreground">
              ไม่พบการแข่งขันที่ตรงกับตัวกรองของคุณ
            </div>
          ) : null}
        </div>
      </section>

      <section id="leaderboard" className="space-y-10">
        <SectionHeader
          eyebrow="LEGENDS LEADERBOARD"
          title="Top 5 ผู้เล่นที่ฮอตที่สุด"
          description="ติดตามอันดับ Elo และสถิติการชนะของผู้เล่นที่โดดเด่นในแต่ละซีซั่น"
        />
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Player</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Win Rate</th>
                <th className="px-6 py-3">Streak</th>
                <th className="px-6 py-3">Region</th>
              </tr>
            </thead>
            <tbody>
              {topLeaders.map((leader) => (
                <tr key={leader.id} className="border-t border-border/50">
                  <td className="px-6 py-4 text-base font-semibold text-foreground">#{leader.rank}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{leader.playerName}</div>
                    <div className="text-xs text-muted-foreground">ประเทศ {leader.country}</div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{leader.rating}</td>
                  <td className="px-6 py-4 text-foreground">{leader.winRate}%</td>
                  <td className="px-6 py-4 text-foreground">{leader.streak} W</td>
                  <td className="px-6 py-4 text-foreground">{leader.region.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="community" className="space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader
            eyebrow="COMMUNITY HUB"
            title="ชุมชนหมากรุกไทยที่เติบโตเร็วที่สุด"
            description="แลกเปลี่ยน วิเคราะห์ และเติบโตไปพร้อมกับผู้เล่นแนวหน้าจากทั่วทุกมุมโลก"
          />
          <div className="flex gap-3">
            {(["all", "forum", "live", "learning"] as const).map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => actions.setCommunityCategory(category)}
                className={cn(
                  "rounded-full border border-border/70 px-4 py-2 text-sm font-medium capitalize transition",
                  filters.activeCommunityCategory === category
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {category === "all" ? "ทั้งหมด" : category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {trendingCommunities.map((community) => (
            <article
              key={community.id}
              className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-foreground">{community.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{community.description}</p>
              <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>สมาชิก</dt>
                  <dd>{community.memberCount.toLocaleString()} คน</dd>
                </div>
                <div className="flex justify-between">
                  <dt>คะแนนการมีส่วนร่วม</dt>
                  <dd>{community.engagementScore}/100</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeader
          eyebrow="PLAYER STORIES"
          title="เสียงจากผู้เล่นระดับตำนาน"
          description="ประสบการณ์จริงจากนักแข่ง โค้ช และผู้นำคอมมูนิตี้"
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {viewModel.testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <figcaption className="text-sm font-semibold text-foreground">{testimonial.name}</figcaption>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="mt-4 text-sm text-muted-foreground">“{testimonial.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeader
          eyebrow="PARTNERS & METRICS"
          title="พันธมิตรและข้อมูลเชิงลึก"
          description="สนับสนุนโดยองค์กรชั้นนำ พร้อมสถิติที่แสดงการเติบโตของแพลตฟอร์ม"
          align="center"
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">พันธมิตร</h3>
            <div className="mt-4 flex flex-wrap items-center gap-6">
              {viewModel.partners.map((partner) => (
                <Link
                  key={partner.id}
                  href={partner.url}
                  className="flex h-16 w-32 items-center justify-center rounded-2xl border border-border/40 bg-background/40 p-4 text-sm font-semibold text-muted-foreground transition hover:border-primary/60 hover:text-primary"
                >
                  {partner.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">ข้อมูลเชิงลึก</h3>
            <ul className="mt-4 space-y-3">
              {viewModel.insights.map((insight) => (
                <li key={insight.id} className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{insight.label}</p>
                    <p className="text-xs text-muted-foreground">{insight.change}</p>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      insight.trend === "up"
                        ? "text-emerald-500"
                        : insight.trend === "down"
                          ? "text-red-500"
                          : "text-muted-foreground",
                    )}
                  >
                    {insight.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
