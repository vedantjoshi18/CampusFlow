'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, CheckSquare, Clock, ListChecks, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { tasksApi, type Task, type CreateTaskDto, type UpdateTaskDto } from '@/lib/api/tasks'
import { TaskCard } from '@/components/tasks/TaskCard'
import { AddTaskModal } from '@/components/tasks/AddTaskModal'

type FilterTab = 'all' | 'pending' | 'completed'

const TAB_CONFIG: { key: FilterTab; label: string; icon: React.ElementType }[] = [
  { key: 'all', label: 'All Tasks', icon: ListChecks },
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'completed', label: 'Completed', icon: CheckSquare },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<FilterTab>('all')
  const [modalOpen, setModalOpen] = useState(false)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await tasksApi.getAll()
      setTasks(res.tasks)
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAdd = async (dto: CreateTaskDto) => {
    const res = await tasksApi.create(dto)
    setTasks(prev => [res.task, ...prev])
  }

  const handleUpdate = async (id: string, dto: UpdateTaskDto) => {
    const res = await tasksApi.update(id, dto)
    setTasks(prev => prev.map(t => (t.id === id ? res.task : t)))
  }

  const handleDelete = async (id: string) => {
    await tasksApi.delete(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const pendingCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length
  const dueToday = tasks.filter(t => {
    if (!t.deadline || t.completed) return false
    const d = new Date(t.deadline)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      {/* Manifesto-style heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--color-accent)' }}>
            {pendingCount} pending &middot; {completedCount} done
            {dueToday > 0 && (
              <span className="ml-2" style={{ color: 'var(--destructive)' }}>&middot; {dueToday} due today</span>
            )}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            My Tasks
          </h1>
        </div>
        <button
          id="open-add-task-modal"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Letter-style stat strip — compact, clean */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: tasks.length, accent: 'var(--color-accent)' },
          { label: 'Pending', value: pendingCount, accent: 'var(--color-accent-2)' },
          { label: 'Done', value: completedCount, accent: 'oklch(55% 0.14 150)' },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center border"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-rule)' }}
          >
            <div className="text-2xl font-bold tracking-tight" style={{ color: stat.accent }}>{stat.value}</div>
            <div className="text-xs font-medium mt-1 uppercase tracking-[0.08em]" style={{ color: 'var(--color-ink-2)' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div
        className="flex items-center gap-1 p-1 rounded-lg w-fit border"
        style={{ backgroundColor: 'var(--color-paper-2)', borderColor: 'var(--color-rule)' }}
      >
        {TAB_CONFIG.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            id={`filter-tab-${key}`}
            onClick={() => setFilter(key)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: filter === key ? 'var(--color-surface)' : 'transparent',
              color: filter === key ? 'var(--color-ink)' : 'var(--color-ink-2)',
              boxShadow: filter === key ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--color-accent)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--color-ink-2)' }}>Loading your tasks...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'oklch(60% 0.20 25 / 0.1)', color: 'var(--destructive)' }}>
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--destructive)' }}>{error}</p>
          <button
            onClick={fetchTasks}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-rule)', color: 'var(--color-ink-2)' }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      ) : filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 gap-4 text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'oklch(50% 0.16 250 / 0.08)', color: 'var(--color-accent)' }}
          >
            <CheckSquare className="w-8 h-8" />
          </div>
          <div>
            <p className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>
              {filter === 'completed' ? 'No completed tasks yet' : filter === 'pending' ? 'All caught up!' : 'No tasks yet'}
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-ink-2)' }}>
              {filter === 'all' ? 'Click "Add Task" to get started.' : 'Switch to a different filter.'}
            </p>
          </div>
          {filter === 'all' && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--primary-foreground)' }}
            >
              <Plus className="w-4 h-4" /> Add your first task
            </button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      <AddTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  )
}
