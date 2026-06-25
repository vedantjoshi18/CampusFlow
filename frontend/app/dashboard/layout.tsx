import { Sidebar } from '@/components/dashboard/Sidebar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50">
      <Sidebar />
      <main className="lg:pl-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
