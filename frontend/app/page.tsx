import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, LayoutDashboard, MessageSquareText, Sparkles, Wand2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const quickStats = [
    { label: "Pending tasks", value: "08", detail: "Assignments and submissions due soon" },
    { label: "Automations", value: "14", detail: "Calendar and WhatsApp reminder flows" },
    { label: "Attendance risk", value: "Medium", detail: "Two classes needed this week" },
  ] as const;

  const focusCards = [
    {
      icon: CalendarDays,
      title: "Today’s schedule",
      detail: "Lectures, submissions, and study blocks arranged in one timeline.",
    },
    {
      icon: CheckCircle2,
      title: "Pending tasks",
      detail: "Track what still needs action, priority, and reminder setup.",
    },
    {
      icon: Sparkles,
      title: "AI tip of the day",
      detail: "A focused study recommendation generated from the current workload.",
    },
  ] as const;

  const actions = ["Add Task", "AI Study Buddy", "Summarize Notice", "Attendance", "Placement Tracker"] as const;

  const notifications = [
    "DSA assignment due in 6 hours.",
    "College notice summarized and ready for broadcast.",
    "Google Calendar reminder synced for tomorrow 9:00 AM.",
  ] as const;

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(180deg,_rgba(15,23,42,0.02),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(45,212,191,0.12),_transparent_34%),linear-gradient(180deg,_rgba(15,23,42,0.46),_transparent_70%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-full border border-border/70 bg-background/75 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-primary">CampusFlow</p>
              <p className="text-sm text-muted-foreground">AI-powered student productivity workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 md:flex">
              <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground" href="#overview">Overview</Link>
              <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground" href="#workflow">Workflow</Link>
              <Link className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground" href="#modules">Modules</Link>
            </nav>
            <ThemeToggle />
            <Link
              href="#modules"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        <section id="overview" className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-14">
          <div className="space-y-8 motion-safe:animate-[fade-in_600ms_ease-out_both]">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Wand2 className="h-4 w-4" aria-hidden="true" />
                AI-powered student workflow hub
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                  Never miss a deadline, notice, or study session again.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  CampusFlow centralizes tasks, notices, attendance risk, reminders, and AI study support in a premium dashboard built for students.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#workflow"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Open dashboard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#modules"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border/70 bg-background/80 px-6 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-muted"
              >
                <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                Summarize notice
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <article key={stat.label} className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4 motion-safe:animate-[fade-in_700ms_ease-out_both] rounded-[2rem] border border-border/70 bg-card/85 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-6">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/80 p-4 shadow-sm sm:p-5">
              <p className="text-sm font-medium text-muted-foreground">Current focus</p>
              <div className="mt-4 space-y-3">
                {focusCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div key={card.title} className="flex gap-4 rounded-2xl border border-border/70 bg-background/90 p-4">
                      <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-base font-semibold text-foreground">{card.title}</h2>
                        <p className="text-sm leading-6 text-muted-foreground">{card.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="workflow" className="grid gap-4 rounded-[1.5rem] bg-gradient-to-br from-primary/10 via-background to-cyan-500/10 p-4 sm:p-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Quick actions</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <span key={action} className="rounded-full border border-border/70 bg-background/80 px-3 py-2 text-sm font-medium text-foreground shadow-sm">
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/85 p-4 shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Recent notifications</p>
                <ul className="mt-3 space-y-3">
                  {notifications.map((notification) => (
                    <li key={notification} className="rounded-xl border border-border/70 bg-card px-4 py-3 text-sm leading-6 text-foreground">
                      {notification}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="py-4 pb-10 sm:py-6 lg:py-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Core modules</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Built around the student workflows defined in the product spec.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              This first pass establishes the visual system and app shell for the areas that will be expanded feature by feature.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Notice summarizer", description: "Convert long college notices into concise summaries with event dates and broadcast actions.", icon: MessageSquareText },
              { title: "AI study buddy", description: "Generate flashcards, quiz questions, important topics, and study summaries from lecture notes.", icon: Sparkles },
              { title: "Smart deadline manager", description: "Create calendar events and reminders from tasks, deadlines, and reminder times.", icon: CalendarDays },
              { title: "Attendance risk analyzer", description: "Assess attendance risk, required classes, and AI suggestions from a single percentage input.", icon: CheckCircle2 },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="group h-full rounded-3xl border border-border/70 bg-card/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
