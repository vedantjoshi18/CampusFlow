'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Circle, Trash2, Tag, Calendar, Clock, ChevronDown, Sparkles, AlertCircle
} from 'lucide-react'
import type { Task, UpdateTaskDto } from '@/lib/api/tasks'

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, dto: UpdateTaskDto) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const PRIORITY_CONFIG = {
  high: {
    label: 'High',
    badge: 'border-0',
    accent: 'oklch(60% 0.20 25)',
    bg: 'oklch(60% 0.20 25 / 0.1)',
    text: 'oklch(55% 0.18 25)',
  },
  medium: {
    label: 'Medium',
    badge: 'border-0',
    accent: 'oklch(65% 0.16 75)',
    bg: 'oklch(65% 0.16 75 / 0.1)',
    text: 'oklch(60% 0.14 75)',
  },
  low: {
    label: 'Low',
    badge: 'border-0',
    accent: 'oklch(55% 0.14 150)',
    bg: 'oklch(55% 0.14 150 / 0.1)',
    text: 'oklch(50% 0.12 150)',
  },
}

function formatDeadline(deadline?: string) {
  if (!deadline) return null
  const date = new Date(deadline)
  const now = new Date()
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (diffDays < 0) return { label: `Overdue · ${formatted}`, urgent: true }
  if (diffDays === 0) return { label: `Today · ${formatted}`, urgent: true }
  if (diffDays === 1) return { label: `Tomorrow · ${formatted}`, urgent: false }
  return { label: `${diffDays}d · ${formatted}`, urgent: false }
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium
  const deadline = formatDeadline(task.deadline)

  const handleToggle = async () => {
    setLoading(true)
    try {
      await onUpdate(task.id, { completed: !task.completed })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(task.id)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl border transition-all duration-200"
      style={{
        backgroundColor: task.completed ? 'var(--color-paper-2)' : 'var(--color-surface)',
        borderColor: 'var(--color-rule)',
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      {/* Priority accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ backgroundColor: priority.accent, marginLeft: '12px' }}
      />

      <div className="pl-7 pr-4 py-3.5">
        <div className="flex items-start gap-3">
          {/* Complete toggle */}
          <button
            id={`task-toggle-${task.id}`}
            onClick={handleToggle}
            disabled={loading}
            className="mt-0.5 shrink-0 transition-transform hover:scale-110 disabled:opacity-50"
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5" style={{ color: 'oklch(55% 0.14 150)' }} />
            ) : (
              <Circle className="w-5 h-5" style={{ color: 'var(--color-rule)' }} />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`font-semibold text-base leading-snug truncate transition-colors ${
                  task.completed ? 'line-through' : ''
                }`}
                style={{
                  color: task.completed ? 'var(--color-ink-2)' : 'var(--color-ink)',
                }}
              >
                {task.title}
              </h3>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {task.description && (
                  <button
                    id={`task-expand-${task.id}`}
                    onClick={() => setExpanded(!expanded)}
                    className="p-1.5 rounded-md transition-colors"
                    style={{ color: 'var(--color-ink-2)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-paper-2)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
                <button
                  id={`task-delete-${task.id}`}
                  onClick={handleDelete}
                  disabled={deleting}
                  className="p-1.5 rounded-md transition-colors disabled:opacity-50"
                  style={{ color: 'var(--color-ink-2)' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(60% 0.20 25 / 0.1)'; e.currentTarget.style.color = 'var(--destructive)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-ink-2)' }}
                  aria-label="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {/* Priority badge */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md"
                style={{ backgroundColor: priority.bg, color: priority.text }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priority.accent }} />
                {priority.label}
              </span>

              {/* Subject */}
              {task.subject && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: 'var(--color-paper-2)', color: 'var(--color-ink-2)' }}
                >
                  <Tag className="w-3 h-3" />
                  {task.subject}
                </span>
              )}

              {/* Deadline */}
              {deadline && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: deadline.urgent ? 'oklch(60% 0.20 25 / 0.1)' : 'var(--color-paper-2)',
                    color: deadline.urgent ? 'var(--destructive)' : 'var(--color-ink-2)',
                  }}
                >
                  {deadline.urgent ? <Clock className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                  {deadline.label}
                </span>
              )}

              {task.automation_status && (
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: task.automation_status === 'failed' ? 'oklch(60% 0.20 25 / 0.1)' : 'oklch(50% 0.16 250 / 0.08)',
                    color: task.automation_status === 'failed' ? 'var(--destructive)' : 'var(--color-accent)',
                  }}
                  title={task.automation_error || undefined}
                >
                  {task.automation_status === 'failed' ? <AlertCircle className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                  {task.automation_status === 'queued' ? 'Calendar sync queued' : task.automation_status === 'failed' ? 'Sync failed' : 'Sync skipped'}
                </span>
              )}
            </div>

            {/* Expandable description */}
            <AnimatePresence>
              {expanded && task.description && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 text-sm leading-relaxed overflow-hidden"
                  style={{ color: 'var(--color-ink-2)' }}
                >
                  {task.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
