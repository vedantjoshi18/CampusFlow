import React from 'react'

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: 'var(--color-paper)' }}>
      {/* Left — editorial brand panel */}
      <div className="relative hidden md:flex flex-col justify-between p-12 overflow-hidden" style={{ backgroundColor: 'var(--color-paper-2)' }}>
        {/* Minimal background — no blobs, just rule */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-ink) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}>CF</span>
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>CampusFlow</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--color-ink)' }}>
            Your academic OS.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
            Deadlines, notices, study plans, and AI-driven insights — unified in one place.
          </p>
        </div>

        <div className="relative z-10 text-xs" style={{ color: 'var(--color-muted)' }}>
          &copy; {new Date().getFullYear()} CampusFlow
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-10">
          {/* Mobile wordmark */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}>CF</span>
            <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>CampusFlow</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>{title}</h2>
            <p className="text-base" style={{ color: 'var(--color-ink-2)' }}>{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
