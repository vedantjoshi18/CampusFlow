'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    branch: '',
    year: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Calling our custom backend API for registration so it handles the profile creation logic
      // Note: Make sure the backend server is running on port 5000 and has CORS enabled!
      const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year) || 1,
          subjects: []
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register')
      }

      // Registration successful
      router.push('/login?registered=true')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create an account" subtitle="Join CampusFlow and boost your productivity.">
      <form onSubmit={handleRegister} className="space-y-5">
        {error && (
          <div className="p-4 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Email address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Branch</label>
            <input
              type="text"
              required
              value={formData.branch}
              onChange={(e) => setFormData({...formData, branch: e.target.value})}
              placeholder="e.g. CSE"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Year</label>
            <input
              type="number"
              min="1" max="5"
              required
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              placeholder="e.g. 3"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 mt-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-slate-400 border-t-white dark:border-slate-300 dark:border-t-slate-900 rounded-full animate-spin" />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className="text-center font-medium text-slate-500 dark:text-slate-400 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  )
}
