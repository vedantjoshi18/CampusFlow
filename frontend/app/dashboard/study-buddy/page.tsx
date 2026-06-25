'use client'

import { useState } from 'react'
import { BookOpen, Layers, CheckCircle2, Loader2, PlayCircle, Sparkles } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function StudyBuddyPage() {
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    summary: string;
    flashcards: { front: string; back: string }[];
    quizzes: { question: string; options: string[]; correctAnswer: string }[];
  } | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!notes.trim()) return

    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error('Not authenticated')
      }

      const response = await fetch('http://localhost:5000/api/v1/ai/study-buddy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ notes })
      })

      const data = await response.json()
      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.message || 'Failed to generate study materials')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-500" />
          AI Study Buddy
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-lg">
          Paste your messy lecture notes and automatically get a clean summary, flashcards, and a practice quiz.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Col: Input */}
        <div className="lg:col-span-5 space-y-4 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Lecture Notes
          </label>
          <textarea
            className="w-full h-96 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-slate-700 dark:text-slate-300"
            placeholder="Paste your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={!notes.trim() || loading}
            className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Crafting Study Materials...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Magic
              </>
            )}
          </button>
        </div>

        {/* Right Col: Output */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 fill-mode-both">
              
              {/* Summary */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-900/30">
                <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-300 mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  Executive Summary
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Flashcards */}
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 mb-4">
                  <Layers className="w-6 h-6 text-pink-500" />
                  Flashcards ({result.flashcards.length})
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {result.flashcards.map((card, i) => (
                    <div key={i} className="group [perspective:1000px]">
                      <div className="relative w-full h-40 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                        {/* Front */}
                        <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
                          <span className="text-xs font-bold text-pink-500 uppercase tracking-widest absolute top-4">Q</span>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{card.front}</p>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-5 text-white flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] shadow-lg">
                          <span className="text-xs font-bold text-white/70 uppercase tracking-widest absolute top-4">A</span>
                          <p className="font-medium text-lg leading-snug">{card.back}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quizzes */}
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 mb-4">
                  <PlayCircle className="w-6 h-6 text-amber-500" />
                  Practice Quiz
                </h3>
                <div className="space-y-4">
                  {result.quizzes.map((quiz, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                        <span className="text-amber-500 mr-2">{i + 1}.</span>
                        {quiz.question}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {quiz.options.map((opt, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 cursor-pointer transition-colors group">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-amber-500 transition-colors" />
                            <span className="text-slate-600 dark:text-slate-400 font-medium">{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
             <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <BookOpen className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium text-lg text-slate-500">Awaiting Notes</p>
              <p className="text-sm mt-2 max-w-sm">Provide your notes to generate tailored study materials immediately.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
