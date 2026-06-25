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
    
    // We use Supabase client directly since Next.js + Supabase handles secure sessions gracefully
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
          <div className="p-4 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-slate-900 dark:text-white"
              placeholder="student@college.edu"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-slate-900 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-white dark:border-slate-300 dark:border-t-slate-900 rounded-full animate-spin" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      <div className="text-center text-slate-500 dark:text-slate-400 mt-6 font-medium">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
          Create one now
        </Link>
      </div>
    </AuthLayout>
  )
}
