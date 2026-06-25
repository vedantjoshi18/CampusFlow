import React from 'react'

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/30 blur-[120px]" />
          <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] rounded-full bg-emerald-500/20 blur-[100px]" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">CF</div>
            <span className="text-2xl font-bold tracking-tight">CampusFlow</span>
          </div>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">Your ultimate academic OS.</h1>
          <p className="text-slate-300 text-xl leading-relaxed font-medium">Never miss a deadline again. Unify your WhatsApp messages, college notices, and assignments all in one place with AI-driven insights.</p>
        </div>
        
        <div className="relative z-10 text-sm text-slate-400 font-medium tracking-wide">
          © {new Date().getFullYear()} CampusFlow. All rights reserved.
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-10 relative">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center font-bold text-lg text-white shadow-lg">CF</div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CampusFlow</span>
          </div>
          
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
