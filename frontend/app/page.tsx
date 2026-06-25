import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-paper)' }}>
      {/* N1a Minimal nav — wordmark + links */}
      <nav className="flex items-center justify-between px-6 md:px-12 h-16 border-b" style={{ borderColor: 'var(--color-rule)' }}>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}>CF</span>
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>CampusFlow</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--color-ink-2)' }}>Sign in</Link>
          <Link
            href="/register"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Manifesto + Letter hero — bold typographic statement, generous whitespace */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Eyebrow — Manifesto touch */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-accent)' }}
          >
            The student productivity OS
          </p>

          {/* Bold headline — Manifesto declaration, Letter spacing */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
            style={{ color: 'var(--color-ink)' }}
          >
            Never miss a
            {' '}
            <span style={{ color: 'var(--color-accent)' }}>deadline</span>
            {' '}
            again.
          </h1>

          {/* Subhead — Letter warmth */}
          <p
            className="text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ color: 'var(--color-ink-2)' }}
          >
            Unify your assignments, notices, and schedule in one place with AI-driven insights that keep you ahead.
          </p>

          {/* CTAs — editorial restraint */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-medium transition-all hover:opacity-70"
              style={{ color: 'var(--color-ink-2)', border: '1px solid', borderColor: 'var(--color-rule)' }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>

      {/* Ft1 Mast-headed footer */}
      <footer className="border-t px-6 md:px-12 py-8" style={{ borderColor: 'var(--color-rule)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-ink-2)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>CampusFlow</span>
            <span className="opacity-50">·</span>
            <span>All yours.</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            &copy; {new Date().getFullYear()} CampusFlow
          </p>
        </div>
      </footer>
    </div>
  )
}
