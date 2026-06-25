import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-8 animate-in zoom-in-95 duration-1000 p-6">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center font-bold text-4xl shadow-2xl shadow-blue-500/20">CF</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">CampusFlow</h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          The all-in-one AI productivity OS for students. Never miss a deadline again.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-extrabold px-10 py-7 text-lg rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95">
              Get Started
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-slate-300 hover:text-white hover:bg-slate-800/50 font-bold px-10 py-7 text-lg rounded-xl transition-all">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
