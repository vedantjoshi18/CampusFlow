# CampusFlow - Product Requirements Document (PRD)

## Version
1.0

## Product Name
CampusFlow

## Overview

CampusFlow is an AI-powered student productivity platform that integrates WhatsApp, Google Calendar, AI services, and n8n automation to help students organize assignments, deadlines, college notices, study schedules, and academic activities from a single platform.

The system automatically creates calendar events, sends WhatsApp reminders, summarizes notices using AI, and provides personalized study assistance.

---

# Problem Statement

Students receive hundreds of academic messages every week through WhatsApp groups.

Important deadlines, notices, assignments, and exam schedules often get buried inside conversations, causing students to miss submissions.

CampusFlow solves this problem through AI-powered automation.

---

# Goals

- Never let students miss deadlines.
- Automatically create Google Calendar events.
- Send WhatsApp reminders.
- Generate AI summaries.
- Help students study smarter.
- Improve academic productivity.

---

# Target Users

- Undergraduate Students
- Engineering Students
- College Faculty
- Student Clubs

---

# Functional Requirements

## 1. Authentication

### Student Registration

Fields

- Full Name
- Email
- Password
- Phone Number
- Branch
- Year
- Subjects
- Google Account

### Login

- Email Login
- Password Login
- JWT Authentication

---

## 2. Dashboard

Displays

- Today's Schedule
- Pending Assignments
- Upcoming Deadlines
- AI Tip of the Day
- Recent Notifications

---

## 3. Task Management

Users can

- Create Task
- Edit Task
- Delete Task
- Mark Complete

Task contains

- Title
- Subject
- Description
- Deadline
- Reminder Time
- Calendar Toggle
- Priority

---

## 4. AI Study Buddy

Input

Lecture Notes

Output

- Flashcards
- MCQs
- Important Topics
- Study Summary

---

## 5. Notice Summarizer

Input

College Notice

Output

- Three Bullet Summary
- Event Date
- Calendar Event
- WhatsApp Broadcast

---

## 6. Smart Deadline Manager

Features

- AI Study Schedule
- Reminder Generation
- Calendar Sync
- WhatsApp Notifications

---

## 7. Attendance Risk Analyzer

Input

Attendance Percentage

Output

- Risk Level
- Classes Required
- AI Suggestions

---

## 8. Placement Tracker

Track

- Companies Applied
- Interview Rounds
- AI Weekly Plan

---

## 9. Study Group Scheduler

Features

- Match Students
- Shared Calendar
- WhatsApp Invitations

---

# Non Functional Requirements

- Responsive Design
- Mobile Friendly
- Fast API Response
- Secure Authentication
- REST API
- Cloud Ready
- Scalable
- Modular Architecture

---

# Tech Stack

Frontend

- React
- Next.js
- TailwindCSS
- Shadcn UI

Backend

- Node.js
- Express

Database

- Supabase

AI

- GPT
- Gemini
- Groq

Automation

- n8n

Messaging

- WhatsApp API

Calendar

- Google Calendar API

---

# Success Metrics

- Calendar Event Creation
- WhatsApp Reminder Delivery
- AI Response Time
- Daily Active Users
- Task Completion Rate