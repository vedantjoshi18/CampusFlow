'use client'

import { useState } from 'react'
import { FileText, Calendar as CalendarIcon, MessageCircle, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function NoticeSummarizerPage() {
  const [noticeText, setNoticeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ summary: string[]; eventDate: string | null; whatsappDraft: string } | null>(null)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!noticeText.trim()) return

    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch('http://localhost:5000/api/v1/ai/summarize-notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ noticeText })
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.message || 'Failed to summarize notice')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-500" />
          Notice Summarizer
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-lg">
          Paste any long, confusing college notice and our AI will extract exactly what you need to know.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Paste College Notice
          </label>
          <textarea
            className="w-full h-80 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-slate-700 dark:text-slate-300"
            placeholder="E.g. Dear students, this is to inform you that the mid-term examinations for the upcoming semester..."
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            onClick={handleSummarize}
            disabled={!noticeText.trim() || loading}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group/btn"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Notice...
              </>
            ) : (
              <>
                Generate Summary
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both">
              
              {/* Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 mb-4">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {result.summary.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Event Date Card */}
              {result.eventDate && (
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-6 border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">
                      Event Date Detected
                    </h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {new Date(result.eventDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              )}

              {/* WhatsApp Draft Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 mb-3">
                  <MessageCircle className="w-5 h-5 text-emerald-500" />
                  WhatsApp Draft
                </h3>
                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 text-slate-600 dark:text-slate-400 font-medium italic relative">
                  "{result.whatsappDraft}"
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(result.whatsappDraft)}
                  className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>

            </div>
          ) : (
            <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Sparkles className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium text-lg text-slate-500">Awaiting Notice</p>
              <p className="text-sm mt-2 max-w-sm">Paste a notice on the left and hit generate to see the magic happen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
