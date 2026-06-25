'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    setLoading(false)
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your account.">
      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div
            className="p-4 text-sm font-medium rounded-lg border"
            style={{
              backgroundColor: 'oklch(60% 0.20 25 / 0.08)',
              color: 'var(--destructive)',
              borderColor: 'oklch(60% 0.20 25 / 0.15)',
            }}
          >
            {error}
          </div>
        )}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold" style={{ color: 'var(--color-ink-2)' }}>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border transition-all outline-none text-sm"
              style={{
                backgroundColor: 'var(--color-paper)',
                borderColor: 'var(--color-rule)',
                color: 'var(--color-ink)',
              }}
              placeholder="student@college.edu"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold" style={{ color: 'var(--color-ink-2)' }}>Password</label>
              <Link href="/forgot-password" className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: 'var(--color-accent)' }}>
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border transition-all outline-none text-sm"
              style={{
                backgroundColor: 'var(--color-paper)',
                borderColor: 'var(--color-rule)',
                color: 'var(--color-ink)',
              }}
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--primary-foreground)', borderTopColor: 'transparent' }} />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <div className="text-center mt-6 text-sm font-medium" style={{ color: 'var(--color-ink-2)' }}>
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold transition-opacity hover:opacity-70" style={{ color: 'var(--color-accent)' }}>
          Create one now
        </Link>
      </div>
    </AuthLayout>
  )
}
