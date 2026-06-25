import { getScopedClient } from '../config/supabase.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import type { Task, UpdateTaskDto } from '../types/task.types.js';

type AutomationTriggerReason = 'created' | 'updated';

interface ProfileSummary {
  name?: string | null;
  phone?: string | null;
}

interface AutomationResult {
  status: 'queued' | 'skipped' | 'failed';
  reason?: string;
}

const getWebhookUrl = () => process.env.N8N_DEADLINE_WEBHOOK || process.env.N8N_TASK_AUTOMATION_WEBHOOK || '';

const buildAutomationPayload = (task: Task, profile: ProfileSummary, reason: AutomationTriggerReason, userId: string) => ({
  source: 'campusflow',
  reason,
  taskId: task.id,
  userId,
  studentName: profile.name || '',
  phone: profile.phone || '',
  taskTitle: task.title,
  subject: task.subject || '',
  description: task.description || '',
  deadline: task.deadline || '',
  priority: task.priority,
  addToCalendar: task.add_to_calendar,
  completed: task.completed,
});

const fetchProfileSummary = async (token: string, userId: string): Promise<ProfileSummary> => {
  const supabase = getScopedClient(token);
  const { data, error } = await supabase
    .from('profiles')
    .select('name, phone')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return {};
  }

  return {
    name: data.name,
    phone: data.phone,
  };
};

export const shouldTriggerTaskAutomation = (task: Pick<Task, 'add_to_calendar' | 'deadline'>, previousTask?: Partial<Task> | null) => {
  if (!task.add_to_calendar || !task.deadline) {
    return false;
  }

  if (!previousTask) {
    return true;
  }

  return (
    previousTask.add_to_calendar !== task.add_to_calendar ||
    previousTask.deadline !== task.deadline ||
    previousTask.title !== task.title ||
    previousTask.subject !== task.subject ||
    previousTask.description !== task.description ||
    previousTask.priority !== task.priority
  );
};

export const triggerTaskAutomation = async (
  req: AuthRequest,
  task: Task,
  reason: AutomationTriggerReason,
): Promise<AutomationResult> => {
  if (!req.token || !req.userId) {
    return { status: 'skipped', reason: 'missing_auth_context' };
  }

  if (!task.add_to_calendar || !task.deadline) {
    return { status: 'skipped', reason: 'calendar_sync_disabled' };
  }

  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) {
    return { status: 'skipped', reason: 'missing_n8n_webhook' };
  }

  const profile = await fetchProfileSummary(req.token, req.userId);
  const payload = buildAutomationPayload(task, profile, reason, req.userId);

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `n8n webhook responded with ${response.status}`);
  }

  return { status: 'queued' };
};

export const automationShouldRunForUpdate = (
  nextTask: Task,
  previousTask: Task,
  updates: UpdateTaskDto,
) => {
  return shouldTriggerTaskAutomation(nextTask, previousTask);
};