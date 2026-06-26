# CampusFlow

An AI-powered student productivity platform that unifies assignments, deadlines, college notices, study schedules, and WhatsApp reminders in one dashboard.

---

## What it does

- **Task Management** — Create, edit, and track assignments with deadlines, priority levels, and automatic Google Calendar sync
- **AI Study Buddy** — Paste lecture notes to get a summary, flashcards, and a practice quiz (powered by Groq / LLaMA)
- **Notice Summarizer** — Paste any college notice to extract key points, event date, and a ready-to-send WhatsApp draft
- **Daily Briefing** — AI-generated motivational summary of your pending tasks every time you open the dashboard
- **WhatsApp Reminders** — Automated deadline alerts sent to your phone via n8n + WhatsApp Business API
- **Attendance Risk Analyzer** — Input your attendance percentage to get risk level and classes required to stay safe
- **Placement Tracker** — Track companies applied, interview rounds, and upcoming interviews

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TailwindCSS v4, shadcn/ui |
| Backend | Node.js, Express 5, TypeScript |
| Database | Supabase (PostgreSQL + Auth + RLS) |
| AI | Groq SDK (LLaMA 3.3 70B) |
| Automation | n8n workflows |
| Messaging | WhatsApp Business API |
| Calendar | Google Calendar API (via n8n) |
| Animation | Framer Motion |
| State | TanStack Query + Zustand |

---

## Project Structure

```
campusflow/
├── frontend/                  # Next.js app
│   ├── app/
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── tasks/         # Task management
│   │   │   ├── study-buddy/   # AI flashcards & quiz
│   │   │   ├── notice-summarizer/
│   │   │   └── profile/
│   │   ├── login/
│   │   └── register/
│   ├── components/
│   │   ├── dashboard/         # Sidebar, DailyBriefing
│   │   ├── tasks/             # TaskCard, AddTaskModal
│   │   ├── profile/           # ProfileForm
│   │   └── ui/                # shadcn/ui primitives
│   ├── lib/api/tasks.ts       # Tasks API client
│   └── utils/supabase/        # Supabase SSR helpers
│
└── backend/                   # Express API
    └── src/
        ├── index.ts           # Server entry point
        ├── routes/            # auth, task, ai routes
        ├── controllers/       # auth, task, ai controllers
        ├── middleware/        # JWT auth middleware
        ├── services/
        │   └── task-automation.service.ts  # n8n webhook trigger
        ├── types/task.types.ts
        └── config/supabase.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Groq](https://console.groq.com) API key
- An [n8n](https://n8n.io) instance (cloud or self-hosted)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/campusflow.git
cd campusflow
```

### 2. Set up the database

Run the following SQL in your Supabase SQL editor (Dashboard → SQL Editor):

```sql
-- Tasks table
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  subject text,
  description text,
  deadline timestamptz,
  priority text default 'medium',
  completed boolean default false,
  add_to_calendar boolean default false,
  created_at timestamptz default now()
);

alter table tasks enable row level security;

create policy "Users manage own tasks" on tasks
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Profiles table
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  phone text,
  branch text,
  year integer,
  subjects text[],
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users manage own profile" on profiles
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, phone, branch, year)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'branch',
    (new.raw_user_meta_data->>'year')::integer
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
```

### 3. Configure the backend

```bash
cd backend
cp .env.example .env
npm install
```

Edit `backend/.env`:

```env
PORT=5000

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

# Groq
GROQ_API_KEY=your_groq_api_key

# n8n — paste your webhook URL after setting up the workflow
N8N_DEADLINE_WEBHOOK=https://your-n8n-instance.com/webhook/deadline
```

Start the backend:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 4. Configure the frontend

```bash
cd frontend
cp .env.example .env.local
npm install
```

Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
# App runs on http://localhost:3000
```

---

## n8n Automation Setup

CampusFlow uses n8n to handle Google Calendar event creation and WhatsApp reminders. When a task is created or updated with `add_to_calendar: true` and a deadline, the backend sends a webhook payload to n8n.

### Webhook payload

```json
{
  "source": "campusflow",
  "reason": "created",
  "taskId": "uuid",
  "studentName": "Arjun Sharma",
  "phone": "+91XXXXXXXXXX",
  "taskTitle": "Submit OS Assignment",
  "subject": "Operating Systems",
  "deadline": "2024-12-20T23:59:00.000Z",
  "priority": "high",
  "addToCalendar": true
}
```

### Workflow nodes

1. **Webhook** — `POST /webhook/deadline` → copy the URL into `N8N_DEADLINE_WEBHOOK`
2. **IF** — condition: `{{ $json.addToCalendar }} == true`
3. **Google Calendar** — Create event using `taskTitle`, `subject`, and `deadline`
4. **HTTP Request** — POST to WhatsApp Business API with `phone` and a formatted reminder message

---

## API Reference

Base URL: `http://localhost:5000/api/v1`

All endpoints except `/auth/*` require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new student |
| POST | `/auth/login` | Login and receive JWT |
| GET | `/tasks` | Get all tasks for the user |
| POST | `/tasks` | Create a task (triggers automation) |
| PUT | `/tasks/:id` | Update a task (re-triggers if deadline/calendar changed) |
| DELETE | `/tasks/:id` | Delete a task |
| POST | `/ai/summarize-notice` | Summarize a college notice |
| POST | `/ai/study-buddy` | Generate flashcards and quiz from notes |
| POST | `/ai/daily-briefing` | Get an AI-generated daily task summary |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 5000) |
| `SUPABASE_URL` | Yes | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Supabase anon/publishable key |
| `GROQ_API_KEY` | Yes | Groq API key for AI features |
| `N8N_DEADLINE_WEBHOOK` | No | n8n webhook URL (automation skipped if missing) |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase anon key |
| `NEXT_PUBLIC_API_URL` | No | Backend URL (default: http://localhost:5000) |

---

## Automation Status

Every task create/update response includes an `automation` field:

```json
{
  "success": true,
  "task": { ... },
  "automation": {
    "status": "queued",
    "error": null
  }
}
```

| Status | Meaning |
|---|---|
| `queued` | Webhook sent successfully to n8n |
| `skipped` | `add_to_calendar` is false, no deadline set, or webhook URL not configured |
| `failed` | Webhook sent but n8n returned an error |

The task card in the UI shows a sync badge reflecting this status.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push and open a Pull Request

---

## License

MIT
