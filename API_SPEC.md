# CampusFlow REST API Specification

Base URL

/api/v1

---

# Authentication

## Register

POST /auth/register

Request

{
  "name": "",
  "email": "",
  "password": "",
  "phone": "",
  "branch": "",
  "year": 3,
  "subjects": []
}

Response

201 Created

{
  "success": true,
  "token": ""
}

---

## Login

POST /auth/login

Request

{
  "email": "",
  "password": ""
}

Response

{
  "token": ""
}

---

# Dashboard

GET /dashboard

Response

{
  "todaySchedule": [],
  "pendingTasks": [],
  "aiTip": ""
}

---

# Tasks

## Create Task

POST /tasks

Request

{
  "title": "",
  "subject": "",
  "description": "",
  "deadline": "",
  "reminderTime": "",
  "addToCalendar": true
}

Response

201 Created

---

## Get All Tasks

GET /tasks

---

## Get Task

GET /tasks/:id

---

## Update Task

PUT /tasks/:id

---

## Delete Task

DELETE /tasks/:id

---

# AI

## Flashcards

POST /ai/flashcards

Request

{
  "notes": ""
}

Response

{
  "flashcards":[]
}

---

## Quiz

POST /ai/quiz

Request

{
  "notes":""
}

Response

{
  "questions":[]
}

---

## Summarize Notice

POST /ai/summarize

Request

{
  "notice":""
}

Response

{
  "summary":""
}

---

# Attendance

POST /attendance/analyze

Request

{
  "subject":"",
  "attendance":72
}

Response

{
  "risk":"Medium",
  "requiredClasses":8
}

---

# Placement

POST /placement

GET /placement

PUT /placement/:id

DELETE /placement/:id

---

# Study Groups

POST /study-groups

GET /study-groups

PUT /study-groups/:id

DELETE /study-groups/:id

---

# Notifications

GET /notifications

POST /notifications/read

---

# Profile

GET /profile

PUT /profile

---

# n8n Webhooks

POST /webhooks/deadline

Payload

{
  "studentName":"",
  "phone":"",
  "taskTitle":"",
  "deadline":"",
  "subject":""
}

---

POST /webhooks/notice

Payload

{
  "noticeText":"",
  "summary":"",
  "eventDate":"",
  "phoneList":[]
}

---

# Status Codes

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

500 Internal Server Error

---

# Authentication

Bearer JWT Token

Authorization

Bearer <token>

---

# Third Party Integrations

- OpenAI API
- Groq API
- Gemini API
- Supabase
- Google Calendar API
- WhatsApp Business API
- n8n Webhooks