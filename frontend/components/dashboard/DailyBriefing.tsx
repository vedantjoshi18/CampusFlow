'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'

export function DailyBriefing() {
  const [briefing, setBriefing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBriefing() {
      try {
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.access_token) return

        const response = await fetch('http://localhost:5000/api/v1/ai/daily-briefing', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        })
        
        const result = await response.json()
        if (result.success && result.data?.briefing) {
          setBriefing(result.data.briefing)
        }
      } catch (err) {
        console.error('Failed to fetch daily briefing', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBriefing()
  }, [])

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-900 to-slate-800 text-white rounded-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-sm font-bold text-indigo-300 uppercase tracking-wide flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          AI Daily Briefing
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 min-h-[80px] flex items-center">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Analyzing your tasks...</span>
          </div>
        ) : (
          <p className="text-base font-medium leading-relaxed text-slate-100">
            {briefing || "You're all caught up! Take a break or add some new tasks to get started."}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
