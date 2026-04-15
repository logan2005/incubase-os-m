# IncubaseOS - Complete Product Documentation

> **The Operating System for Modern Startup Incubators**

IncubaseOS is a full-stack SaaS platform purpose-built for startup incubation centers. It provides end-to-end management of startups, mentors, investors, events, facilities, hackathons, intellectual property workflows, and revenue tracking — all within a single, role-based platform.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [User Roles & Access Control](#4-user-roles--access-control)
5. [Module Reference](#5-module-reference)
   - 5.1 [Accounts & Authentication](#51-accounts--authentication)
   - 5.2 [Applications (Onboarding Pipeline)](#52-applications-onboarding-pipeline)
   - 5.3 [Startup Management](#53-startup-management)
   - 5.4 [Mentor Management](#54-mentor-management)
   - 5.5 [Investor Management](#55-investor-management)
   - 5.6 [Events](#56-events)
   - 5.7 [Hackathons](#57-hackathons)
   - 5.8 [C.Pro (Innovation Pipeline)](#58-cpro-innovation-pipeline)
   - 5.9 [Funding Schemes](#59-funding-schemes)
   - 5.10 [Resources & Facilities](#510-resources--facilities)
   - 5.11 [Internships](#511-internships)
   - 5.12 [Publications](#512-publications)
   - 5.13 [Revenue Tracking](#513-revenue-tracking)
   - 5.14 [Messaging](#514-messaging)
   - 5.15 [Notifications](#515-notifications)
   - 5.16 [Success Stories](#516-success-stories)
6. [API Reference](#6-api-reference)
7. [Frontend Application](#7-frontend-application)
8. [Deployment](#8-deployment)
9. [Environment Variables](#9-environment-variables)
10. [Development Guide](#10-development-guide)

---

## 1. Product Overview

### What is IncubaseOS?

IncubaseOS digitizes the entire lifecycle of a startup incubation program:

- **Intake**: Accept applications from startups, mentors, and investors via structured online forms with document uploads
- **Incubation**: Track KPIs, milestones, tasks, and grievances per startup with dual-approval workflows (mentor + admin)
- **Mentorship**: Assign mentors to startups, schedule sessions, collect feedback, and validate outcomes
- **Investment**: Connect investors with startups through an admin-mediated approval pipeline with NOC grants and validation
- **Innovation**: Run hackathons with multi-level judging, scoring criteria, and team management; operate a C.Pro innovation pipeline with IP services and venture studio matching
- **Facilities**: Manage coworking seats, lab equipment bookings, and shared resources
- **Revenue**: Track income streams (incubation fees, coworking, events, labs, success fees) with invoice tracking
- **Communication**: In-app messaging between all users, role-targeted notifications

### Key Differentiators

- **Role-based architecture**: Four distinct user roles (Admin, Startup, Mentor, Investor) with tailored dashboards
- **Dual-approval workflows**: Milestones require both mentor and admin approval before completion
- **Stakeholder validation**: Applications and sessions can be validated by designated stakeholders
- **Comprehensive hackathon system**: Multi-level rounds, per-level judging with weighted criteria, team management, and admin override capabilities
- **C.Pro innovation pipeline**: Three tracks (Front Desk showcase, IP services, Venture Studio matching) for approved submissions
- **Indian startup ecosystem focus**: INR currency, Indian timezone (IST), sectors aligned with Indian incubation programs

---

## 2. Architecture

### System Overview

```
Browser
  │
  ├─ Production (Docker Compose)
  │   └─ Nginx :80
  │       ├─ /api/v1/*    → Django/Gunicorn :8000  (REST API)
  │       ├─ /media/*     → Nginx serves uploads directly
  │       ├─ /static/*    → Nginx serves Django static files
  │       └─ /*           → Next.js :3000  (Frontend)
  │
  ├─ Development
  │   ├─ Django dev server :8000
  │   └─ Next.js dev server :3000
  │
  └─ Vercel + VPS Split
      ├─ Frontend on Vercel (automatic)
      └─ Backend on VPS (CORS-configured cross-origin)
```

### Data Flow

```
Frontend (Next.js)
  │
  ├─ Zustand Store (auth state, persisted to localStorage)
  │   └─ JWT access + refresh tokens
  │
  ├─ Axios HTTP Client (lib/api.ts)
  │   ├─ Request interceptor: attaches Bearer token
  │   └─ Response interceptor: auto-refreshes on 401
  │
  └─ React Query (TanStack Query v5)
      └─ Hooks per module (lib/hooks.ts)
          └─ GET/POST/PATCH/DELETE → Django REST API
                                       │
                                       ├─ JWT Authentication (simplejwt)
                                       ├─ Permission checks (IsAuthenticated)
                                       ├─ DRF ViewSets + DefaultRouter
                                       ├─ Django ORM → PostgreSQL/SQLite
                                       └─ File uploads → /media/ directory
```

---

## 3. Technology Stack

### Backend

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Django | 6.0.3 |
| REST API | Django REST Framework | 3.16.1 |
| Authentication | djangorestframework-simplejwt | 5.5.1 |
| CORS | django-cors-headers | 4.9.0 |
| Filtering | django-filter | 25.2 |
| Database (dev) | SQLite3 | Built-in |
| Database (prod) | PostgreSQL | 16 |
| WSGI Server | Gunicorn | 23.0.0 |
| Static Files | WhiteNoise | 6.9.0 |
| Image Processing | Pillow | 12.1.1 |
| Excel Export | openpyxl | 3.1.5 |
| PDF Generation | ReportLab | 4.4.0 |
| Environment | python-dotenv | 1.2.2 |
| Python | CPython | 3.12 |

### Frontend

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 4.2.2 |
| State Management | Zustand | 5.0.11 |
| Server State | TanStack React Query | 5.90.21 |
| HTTP Client | Axios | 1.13.6 |
| Forms | React Hook Form + Zod | 7.71 + 4.3 |
| Charts | Recharts | 3.8.0 |
| Animations | Framer Motion | 12.35.1 |
| Icons | Lucide React | 0.577.0 |
| Toasts | React Hot Toast | 2.6.0 |
| Date Utilities | date-fns | 4.1.0 |
| Fonts | Outfit + DM Sans | Google Fonts |
| Node.js | Node.js | 22 (Alpine) |

### Infrastructure

| Component | Technology |
|-----------|-----------|
| Containerization | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| Database | PostgreSQL 16 (Alpine) |
| WSGI | Gunicorn (3 workers) |
| Frontend Build | Multi-stage Docker (standalone output) |
| Static Serving | WhiteNoise (serverless) + Nginx (Docker) |

---

## 4. User Roles & Access Control

### Role Definitions

| Role | Code | Description |
|------|------|-------------|
| **Admin** | `admin` | Full platform control. Manages all entities, approves applications, assigns mentors, validates connections, configures events/hackathons, views revenue/analytics |
| **Startup** | `startup` | Incubated startup founder. Views their own startup profile, submits KPIs/milestones, files grievances, books facilities, requests mentorship sessions, applies for funding |
| **Mentor** | `mentor` | Domain expert. Manages assigned startups, conducts sessions, approves milestones (step 1 of dual-approval), validates applications, refers new startups |
| **Investor** | `investor` | Capital provider. Browses recommended startups, requests connections (admin-mediated), manages deal flow/portfolio, views events and hackathons |

### Authentication Flow

1. **Registration**: User signs up with email, name, role selection. Account created with `approval_status = pending`
2. **Admin Approval**: Admin reviews pending users at `/api/v1/auth/users/pending-approvals/` and approves/rejects
3. **Login**: Approved users receive JWT access token (1 hour) + refresh token (7 days, rotating)
4. **Token Refresh**: Automatic on 401 response via Axios interceptor. Failed refresh redirects to login
5. **Role-Based Routing**: Frontend sidebar renders role-specific navigation. Dashboard URLs are prefixed: `/admin/*`, `/startup/*`, `/mentor/*`, `/investor/*`

### Mentor Terms Gate

Mentors must accept Terms & Conditions on first login before accessing their dashboard. The `MentorTermsGate` component enforces this.

### Role Promotion

Startup users can request promotion to Mentor or Investor role via `RolePromotionRequest` with a justification (min 100 characters). Admin reviews and approves/rejects.

---

## 5. Module Reference

### 5.1 Accounts & Authentication

**Models**: `User`, `AuditLog`

#### User Model

Extends Django's `AbstractUser`. Email is the primary login field (`USERNAME_FIELD = 'email'`).

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `email` | EmailField | Unique, used for login |
| `role` | CharField | `admin` / `startup` / `mentor` / `investor` |
| `phone` | CharField | Phone number |
| `whatsapp` | CharField | WhatsApp number |
| `avatar` | ImageField | Profile photo (uploads to `avatars/`) |
| `approval_status` | CharField | `pending` / `approved` / `rejected` |
| `notification_preferences` | JSONField | User notification settings |

#### AuditLog Model

Tracks user actions for compliance and debugging.

| Field | Type | Description |
|-------|------|-------------|
| `user` | ForeignKey(User) | Who performed the action |
| `action` | CharField | Action description |
| `entity_type` | CharField | Model/resource type affected |
| `entity_id` | CharField | ID of affected entity |
| `details` | JSONField | Additional context |
| `ip_address` | GenericIPAddressField | Client IP |

#### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register/` | Register new user | Public |
| POST | `/api/v1/auth/login/` | Login, returns JWT tokens | Public |
| POST | `/api/v1/auth/token/refresh/` | Refresh access token | Public |
| GET/PATCH | `/api/v1/auth/me/` | Get/update current user profile | Authenticated |
| POST | `/api/v1/auth/change-password/` | Change password | Authenticated |
| POST | `/api/v1/auth/password-reset/` | Request password reset | Public |
| POST | `/api/v1/auth/password-reset/confirm/` | Confirm password reset | Public |
| GET | `/api/v1/auth/users/` | List all users (admin) | Admin |
| GET | `/api/v1/auth/users/pending-approvals/` | List pending users | Admin |
| GET/PATCH | `/api/v1/auth/users/{id}/` | Get/update specific user | Admin |
| PATCH | `/api/v1/auth/users/{id}/approval/` | Approve/reject user | Admin |

---

### 5.2 Applications (Onboarding Pipeline)

**Models**: `StartupApplication`, `MentorApplication`, `InvestorApplication`, `RolePromotionRequest`

Three separate application types, each with its own tailored form and review workflow.

#### StartupApplication

Comprehensive intake form for startups seeking incubation.

| Field Group | Key Fields |
|-------------|-----------|
| **Contact** | `founder_name`, `cofounder_name`, `contact_number`, `whatsapp_number`, `email`, `official_email` |
| **Startup Details** | `startup_name`, `sector`, `stage` (Ideation → Growth), `is_registered`, `registration_type`, `registration_certificate` |
| **Pitch** | `pitch_title`, `pitch_description`, `video_link`, `funding_requirement` |
| **Funding History** | `has_applied_funding`, `funding_type`, `funding_details`, `pitch_deck`, `incubation_agreement` |
| **Source** | `source` (Cohort / Referral / Direct), `cohort_name`, `referrer_name`, `referred_by` |
| **Review** | `status` (Submitted → In Review → In Progress → Accepted / Rejected), `reviewed_by`, `review_notes`, `stakeholder_validated`, `validated_by` |

**Stages**: Ideation, Validation, Early Traction, Scaling, Growth

#### MentorApplication

| Field Group | Key Fields |
|-------------|-----------|
| **Personal** | `full_name`, `contact_number`, `email`, `linkedin_url` |
| **Professional** | `years_of_experience`, `areas_of_expertise` (JSON array), `previous_mentorship_details`, `past_mentees` |
| **Availability** | `engagement_type` (Full-time / Part-time), `availability` |
| **Documents** | `resume`, `portfolio`, `id_proof` |
| **Review** | `status`, `terms_accepted`, `stakeholder_validated` |

#### InvestorApplication

| Field Group | Key Fields |
|-------------|-----------|
| **Identity** | `investor_name`, `agency_name`, `contact_number`, `email`, `linkedin_url` |
| **Investment Profile** | `investment_thesis`, `planned_investment_amount`, `available_funds`, `previous_investments`, `sectors_of_interest` (JSON), `investment_stage_preference` (Pre-Seed → Growth / Any), `investment_preferences` |
| **Documents** | `portfolio`, `portfolio_text`, `id_proof` |
| **Source** | `referral_source` (Mentor / Existing Investor / Direct) |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/startup-applications/` | CRUD for startup applications |
| `/api/v1/mentor-applications/` | CRUD for mentor applications |
| `/api/v1/investor-applications/` | CRUD for investor applications |
| `/api/v1/role-promotion-requests/` | CRUD for role promotion requests |
| `/api/v1/status/` | Public application status check |

---

### 5.3 Startup Management

**Models**: `Startup`, `KPI`, `Milestone`, `Task`, `Grievance`

#### Startup

The core entity representing an incubated startup.

| Field | Type | Description |
|-------|------|-------------|
| `startup_id` | CharField | Auto-generated unique ID (format: `SU-XXXXXX`) |
| `user` | ForeignKey(User) | Linked user account |
| `name` | CharField | Startup name |
| `logo` | ImageField | Company logo |
| `sector` | CharField | Industry sector |
| `stage` | CharField | Current stage |
| `founder_name` | CharField | Primary founder |
| `cofounder_name` | CharField | Co-founder (optional) |
| `incubation_start` | DateField | Program start date |
| `incubation_end` | DateField | Program end date |
| `incubation_agreement` | FileField | Signed agreement document |
| `source` | CharField | How startup was sourced |
| `cohort_name` | CharField | Cohort batch name |
| `status` | CharField | `active` / `graduated` / `exited` / `suspended` |
| `noc_granted` | BooleanField | No Objection Certificate issued |
| `is_registered` | BooleanField | Company registered |
| `registration_type` | CharField | Registration type (Pvt Ltd, LLP, etc.) |
| `is_recommended_for_fundraising` | BooleanField | Flagged for investor connections |
| `allocated_credits` | DecimalField | Platform credits allocated |
| `used_credits` | DecimalField | Credits consumed |
| `perks` | JSONField | List of perks granted |

#### KPI (Key Performance Indicators)

Quarterly performance tracking for startups.

| Field | Type | Description |
|-------|------|-------------|
| `startup` | ForeignKey(Startup) | Parent startup |
| `name` | CharField | KPI metric name |
| `target_value` | CharField | Expected value |
| `actual_value` | CharField | Reported value |
| `quarter` | CharField | Q1 / Q2 / Q3 / Q4 |
| `year` | PositiveIntegerField | Year |
| `category` | CharField | `operational` / `fundraising` / `growth` / `financial` |
| `admin_remarks` | TextField | Admin feedback |
| `mentor_remarks` | TextField | Mentor feedback |
| `is_completed` | BooleanField | KPI target met |

#### Milestone (Dual-Approval Workflow)

Key achievement checkpoints with a two-step approval process.

**Workflow**:
1. Startup creates milestone and marks as completed
2. **Step 1 - Mentor Approval**: Assigned mentor reviews and approves/rejects with feedback
3. **Step 2 - Admin Approval**: Only accessible after mentor approves. Admin gives final approval/rejection

| Field | Type | Description |
|-------|------|-------------|
| `startup` | ForeignKey(Startup) | Parent startup |
| `title` | CharField | Milestone title |
| `due_date` | DateField | Target completion date |
| `is_completed` | BooleanField | Marked as complete by startup |
| `mentor_approval_status` | CharField | `pending` / `approved` / `rejected` |
| `mentor_approved_by` | ForeignKey(User) | Which mentor approved |
| `mentor_feedback` | TextField | Mentor comments |
| `admin_approval_status` | CharField | `pending` / `approved` / `rejected` |
| `admin_approved_by` | ForeignKey(User) | Which admin approved |
| `admin_feedback` | TextField | Admin comments |

#### Task

Admin-assigned tasks for startups with priority levels.

| Field | Type | Description |
|-------|------|-------------|
| `startup` | ForeignKey(Startup) | Assigned startup |
| `assigned_by` | ForeignKey(User) | Who assigned |
| `title` | CharField | Task title |
| `priority` | CharField | `low` / `medium` / `high` / `urgent` |
| `due_date` | DateField | Deadline |
| `is_completed` | BooleanField | Completion status |

#### Grievance

Startup complaint/issue tracking system.

| Field | Type | Description |
|-------|------|-------------|
| `startup` | ForeignKey(Startup) | Filing startup |
| `subject` | CharField | Issue title |
| `description` | TextField | Full description |
| `status` | CharField | `open` / `in_progress` / `resolved` / `closed` |
| `resolution` | TextField | How it was resolved |
| `resolved_by` | ForeignKey(User) | Resolver |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/startups/` | CRUD for startups |
| `/api/v1/kpis/` | CRUD for KPIs |
| `/api/v1/milestones/` | CRUD for milestones |
| `/api/v1/tasks/` | CRUD for tasks |
| `/api/v1/grievances/` | CRUD for grievances |

---

### 5.4 Mentor Management

**Models**: `Mentor`, `MentorSession`, `MentorStartupAssignment`

#### Mentor Profile

| Field | Type | Description |
|-------|------|-------------|
| `user` | OneToOneField(User) | Linked user account |
| `full_name` | CharField | Display name |
| `bio` | TextField | Professional bio |
| `years_of_experience` | PositiveIntegerField | Experience years |
| `engagement_type` | CharField | Full-time / Part-time |
| `areas_of_expertise` | JSONField | List of skill areas |
| `linkedin_url` | URLField | LinkedIn profile |
| `is_visible_in_directory` | BooleanField | Show in mentor directory |
| `terms_signed` | BooleanField | T&C acceptance status |
| `terms_signed_at` | DateTimeField | When terms were signed |

#### MentorSession

Tracks individual mentoring sessions between mentors and startups.

| Field | Type | Description |
|-------|------|-------------|
| `mentor` | ForeignKey(Mentor) | Session mentor |
| `startup` | ForeignKey(Startup) | Session startup |
| `status` | CharField | `requested` → `accepted` / `rejected` → `scheduled` → `completed` / `cancelled` |
| `topic` | CharField | Session topic |
| `scheduled_date` | DateTimeField | When it occurs |
| `meeting_link` | URLField | Virtual meeting URL |
| `duration_minutes` | PositiveIntegerField | Duration (default: 60) |
| `mentor_feedback` | TextField | Mentor's post-session notes |
| `startup_feedback` | TextField | Startup's post-session notes |
| `stakeholder_validated` | BooleanField | Validated by stakeholder |

#### MentorStartupAssignment

Maps which mentors are assigned to which startups.

| Constraint | Rule |
|-----------|------|
| `unique_together` | `['mentor', 'startup']` — one assignment per pair |
| `is_active` | Can deactivate without deleting |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/mentors/` | CRUD for mentor profiles |
| `/api/v1/mentor-sessions/` | CRUD for mentoring sessions |
| `/api/v1/mentor-assignments/` | CRUD for mentor-startup assignments |

---

### 5.5 Investor Management

**Models**: `Investor`, `InvestorStartupConnection`

#### Investor Profile

| Field | Type | Description |
|-------|------|-------------|
| `user` | OneToOneField(User) | Linked user account |
| `name` | CharField | Investor name |
| `agency_name` | CharField | Fund / organization name |
| `investment_thesis` | TextField | Investment strategy |
| `sectors_of_interest` | JSONField | Target sectors |
| `min_investment` | DecimalField | Minimum ticket size |
| `max_investment` | DecimalField | Maximum ticket size |
| `portfolio_file` | FileField | Portfolio document |
| `is_visible_in_directory` | BooleanField | Show in investor directory |

#### InvestorStartupConnection

Admin-mediated connection pipeline between investors and startups.

**Workflow**:
1. Investor or startup requests connection (`requested`)
2. Admin reviews and approves (`approved`) or rejects
3. NOC may be granted (`noc_granted`)
4. Investor validates the connection (`investor_validated`)
5. Connection becomes active (`connected`)

| Field | Type | Description |
|-------|------|-------------|
| `investor` | ForeignKey(Investor) | Connecting investor |
| `startup` | ForeignKey(Startup) | Target startup |
| `status` | CharField | `requested` / `approved` / `rejected` / `connected` |
| `admin_approved` | BooleanField | Admin approval flag |
| `noc_granted` | BooleanField | No Objection Certificate |
| `investor_validated` | BooleanField | Investor confirmed |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/investors/` | CRUD for investor profiles |
| `/api/v1/investor-connections/` | CRUD for investor-startup connections |

---

### 5.6 Events

**Models**: `Event`, `EventRegistration`, `EventCoupon`

#### Event

| Field | Type | Description |
|-------|------|-------------|
| `name` | CharField | Event name |
| `event_type` | CharField | `online` / `offline` / `hybrid` / `workshop` / `demo_day` / `networking` / `hackathon` / `seminar` / `webinar` |
| `description` | TextField | Event details |
| `cover_image` | ImageField | Banner image |
| `start_date` / `end_date` | DateField | Date range |
| `start_time` / `end_time` | TimeField | Time range |
| `venue` | CharField | Physical location |
| `location_link` | URLField | Map/directions link |
| `ticket_type` | CharField | `free` / `paid` |
| `ticket_price` | DecimalField | Price (if paid) |
| `ticket_capacity` | PositiveIntegerField | Max attendees |
| `registration_start` / `registration_end` | DateField | Registration window |
| `publish_status` | CharField | `draft` / `published` / `cancelled` / `completed` |

#### EventRegistration

| Field | Type | Description |
|-------|------|-------------|
| `event` | ForeignKey(Event) | Which event |
| `name` / `email` / `phone` | Contact info | Attendee details |
| `category` | CharField | `startup` / `investor` / `mentor` / `student` / `other` |
| `terms_accepted` | BooleanField | T&C accepted |

**Constraint**: `unique_together = ['event', 'email']` — one registration per email per event

#### EventCoupon

Discount codes for paid events with usage tracking.

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/events/` | CRUD for events |
| `/api/v1/event-registrations/` | CRUD for registrations |
| `/api/v1/event-coupons/` | CRUD for discount coupons |

---

### 5.7 Hackathons

**Models**: `Hackathon`, `HackathonLevel`, `HackathonJudge`, `HackathonRegistration`, `HackathonTeam`, `HackathonSubmission`, `LevelCriteria`, `LevelScore`, `LevelResult`

This is the most complex module, supporting full hackathon lifecycle management with multi-level competition structure.

#### Hackathon

| Field | Type | Description |
|-------|------|-------------|
| `title` | CharField | Hackathon name |
| `hackathon_type` | CharField | `problem_statement` / `theme_based` |
| `mode` | CharField | `online` / `offline` / `hybrid` |
| `registration_type` | CharField | `free` / `paid` |
| `difficulty` | CharField | `beginner` / `intermediate` / `advanced` / `expert` |
| `max_teams` | PositiveIntegerField | Team capacity |
| `min_team_size` / `max_team_size` | PositiveIntegerField | Team size constraints |
| `prize_pool` | CharField | Prize description |
| `prizes` | JSONField | Detailed prize breakdown |
| `sponsors` | JSONField | Sponsor list |
| `rules` | TextField | Competition rules |
| `spoc_name` / `spoc_email` / `spoc_phone` | SPOC info | Single Point of Contact |
| `status` | CharField | Full lifecycle: `draft` → `pending_approval` → `approved` → `published` → `registration_open` → `in_progress` → `completed` / `cancelled` |
| `is_visible_public` | BooleanField | Show on public page |

#### HackathonLevel (Rounds)

Each hackathon has N sequential levels/rounds.

| Field | Type | Description |
|-------|------|-------------|
| `hackathon` | ForeignKey(Hackathon) | Parent hackathon |
| `level_number` | PositiveIntegerField | Order (1, 2, 3...) |
| `title` | CharField | Round name (e.g., "Round 1 - Idea Pitch") |
| `duration_minutes` | PositiveIntegerField | Time allocation |
| `difficulty` | CharField | `easy` / `medium` / `hard` / `expert` |
| `selection_criteria` | TextField | Criteria for passing |
| `is_active` | BooleanField | Currently active level |

#### HackathonJudge

Judges assigned per level with configurable profile visibility.

| Field | Type | Description |
|-------|------|-------------|
| `hackathon` | ForeignKey(Hackathon) | Which hackathon |
| `level` | ForeignKey(HackathonLevel) | Which level they judge |
| `user` | ForeignKey(User) | Platform user (optional) |
| `name` / `email` / `designation` / `organization` | Profile | Judge details |
| `profile_visibility` | CharField | `public` / `private` |

#### HackathonRegistration

External participant registration with verification.

| Field | Type | Description |
|-------|------|-------------|
| `participant_name` / `email` / `mobile` | Contact | Participant info |
| `email_verified` / `mobile_verified` | BooleanField | Verification status |
| `payment_status` / `payment_reference` | Payment | For paid hackathons |
| `skills` | JSONField | Participant skills |
| `team` | ForeignKey(HackathonTeam) | Assigned team |
| `status` | CharField | `registered` → `confirmed` → `checked_in` / `withdrawn` |

#### HackathonTeam

| Field | Type | Description |
|-------|------|-------------|
| `name` | CharField | Team name |
| `leader` | ForeignKey(HackathonRegistration) | Team captain |
| `invite_code` | CharField | 8-character unique code (auto-generated) |
| `is_looking_for_members` | BooleanField | Open for recruitment |
| `current_level` | ForeignKey(HackathonLevel) | Current round |
| `is_eliminated` | BooleanField | Knocked out |

#### HackathonSubmission

Per team per level submissions.

| Field | Type | Description |
|-------|------|-------------|
| `team` | ForeignKey(HackathonTeam) | Submitting team |
| `level` | ForeignKey(HackathonLevel) | For which round |
| `project_title` | CharField | Project name |
| `description` | TextField | Project details |
| `demo_link` | URLField | Live demo URL |
| `repo_link` | URLField | Source code URL |
| `presentation_file` | FileField | Slide deck |
| `is_final` | BooleanField | Final submission flag |

#### LevelCriteria (Scoring Rubric)

Admin defines marking criteria per level.

| Field | Type | Description |
|-------|------|-------------|
| `level` | ForeignKey(HackathonLevel) | Which level |
| `name` | CharField | Criteria name (e.g., "Innovation", "Feasibility") |
| `max_score` | PositiveIntegerField | Maximum points |
| `weight` | DecimalField | Scoring weight multiplier |

#### LevelScore

Individual judge scores per criteria per submission.

| Constraint | `unique_together = ['submission', 'judge', 'criteria']` |
|-----------|--------------------------------------------------------|

#### LevelResult

Final result per team per level with admin override capability.

| Field | Type | Description |
|-------|------|-------------|
| `total_score` | DecimalField | Calculated total score |
| `result` | CharField | `pending` / `passed` / `failed` |
| `admin_overridden` | BooleanField | Admin manually changed result |
| `override_reason` | TextField | Justification for override |
| `notification_sent` | BooleanField | Result notification sent |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/hackathons/` | CRUD for hackathons |
| `/api/v1/hackathon-levels/` | CRUD for levels/rounds |
| `/api/v1/hackathon-judges/` | CRUD for judge assignments |
| `/api/v1/hackathon-registrations/` | CRUD for participant registrations |
| `/api/v1/hackathon-teams/` | CRUD for teams |
| `/api/v1/hackathon-submissions/` | CRUD for submissions |
| `/api/v1/hackathon-criteria/` | CRUD for scoring criteria |
| `/api/v1/hackathon-scores/` | CRUD for judge scores |
| `/api/v1/hackathon-results/` | CRUD for level results |

---

### 5.8 C.Pro (Innovation Pipeline)

**Models**: `CProListing`, `CProSubmission`, `FrontDeskEntry`, `FrontDeskEngagement`, `IPServiceProvider`, `IPRequest`, `VentureStudioPartner`, `ProblemStatement`, `VentureMatch`

C.Pro is an innovation pipeline with three tracks for approved submissions.

#### CProListing (Admin-created project calls)

| Field | Type | Description |
|-------|------|-------------|
| `title` | CharField | Listing title |
| `open_to` | CharField | `startups` / `students` / `both` |
| `available_tracks` | JSONField | `["front_desk", "ip", "venture_studio"]` |
| `linked_hackathon` | ForeignKey(Hackathon) | Optional linked hackathon |
| `max_submissions` | PositiveIntegerField | Submission cap |
| `deadline` | DateTimeField | Submission deadline |
| `status` | CharField | `draft` / `published` / `closed` / `archived` |

#### CProSubmission (Core data hub)

Comprehensive submission form supporting both startup and student innovator applicants.

| Field Group | Key Fields |
|-------------|-----------|
| **Applicant** | `applicant_type` (Startup / Student Innovator), `applicant_name`, `email`, `mobile` |
| **Startup-specific** | `company_name`, `registration_status`, `founder_name`, `cofounder_name` |
| **Student-specific** | `institution_name`, `program`, `year_of_study`, `team_members` (JSON) |
| **Project Category** | `project_category` (Hardware / Software / Hybrid) |
| **Market & Stage** | `industry_sector`, `solution_type`, `trl_level` (1-9), `brl_level` (1-9) |
| **Core Details** | `project_title`, `abstract` (min 500 chars), `industry_usage`, `problem_solving_usp`, `video_link` |
| **Attachments** | `pitch_deck`, `supporting_docs`, `ip_documents`, `ip_status` (None / Filed / Granted) |
| **Review** | `status` (Draft → Submitted → In Review → Approved / Rejected / Revision Requested), `approved_tracks` (JSON) |

#### Track 1: Front Desk (Public Showcase)

Approved submissions get a public showcase entry.

| Field | Type | Description |
|-------|------|-------------|
| `submission` | OneToOneField(CProSubmission) | Source submission |
| `is_featured` | BooleanField | Featured/highlighted |
| `views_count` / `likes_count` / `interests_count` | Counters | Engagement metrics |

`FrontDeskEngagement` tracks individual user actions (view / like / interest) per entry.

#### Track 2: IP Services

Connects submissions with IP service providers for patent/trademark assistance.

**IPServiceProvider** types: Patent Agent, Patent Attorney, Trademark Specialist, IP Consulting Firm, University TTO

**IPRequest** workflow: `requested` → `interested` / `not_interested` / `need_more_info` → `in_progress` → `completed`

#### Track 3: Venture Studio

Matches problem statements with venture studio partners.

**VentureStudioPartner** types: Corporate, Accelerator, VC Fund, University, Research Lab, Service Provider

**ProblemStatement**: Can originate from C.Pro submissions or hackathon submissions. Status: `draft` → `listed` → `matched` → `closed`

**VentureMatch**: Partner expresses interest → admin reviews → approved → active → completed

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/cpro-listings/` | CRUD for project call listings |
| `/api/v1/cpro-submissions/` | CRUD for submissions |
| `/api/v1/cpro-front-desk/` | CRUD for front desk entries |
| `/api/v1/cpro-ip-providers/` | CRUD for IP service providers |
| `/api/v1/cpro-ip-requests/` | CRUD for IP requests |
| `/api/v1/cpro-vs-partners/` | CRUD for venture studio partners |
| `/api/v1/cpro-problem-statements/` | CRUD for problem statements |
| `/api/v1/cpro-venture-matches/` | CRUD for venture matches |

---

### 5.9 Funding Schemes

**Model**: `FundingScheme`

Directory of available funding schemes (grants, loans, equity, accelerator programs) for startups.

| Field | Type | Description |
|-------|------|-------------|
| `title` | CharField | Scheme name |
| `provider` | CharField | Provider (e.g., DPIIT, DST, HDFC Bank) |
| `scheme_type` | CharField | `grant` / `loan` / `equity` / `accelerator` / `other` |
| `eligibility` | TextField | Eligibility criteria |
| `min_amount` / `max_amount` | DecimalField | Funding range (INR) |
| `amount_range` | CharField | Human-readable range (e.g., "₹5L - ₹20L") |
| `sector_tags` | JSONField | Target sectors |
| `stage_eligibility` | CharField | Minimum startup stage required |
| `deadline` | DateField | Application deadline |
| `application_link` | URLField | Where to apply |
| `is_active` | BooleanField | Currently accepting applications |

#### API Endpoint

| Endpoint | Description |
|----------|-------------|
| `/api/v1/funding/` | CRUD for funding schemes |

---

### 5.10 Resources & Facilities

**Models**: `LabEquipment`, `LabBooking`, `CoworkingSeat`, `SeatAllocation`, `Resource`

#### Lab Equipment & Bookings

Manage shared lab equipment with booking system.

| Equipment Fields | `name`, `description`, `image`, `cost`, `maintenance_cost`, `hourly_rate`, `is_available`, `location` |
|-----------------|---|
| Booking Fields | `equipment`, `startup`, `date`, `start_time`, `end_time`, `status` (pending → approved / rejected → completed / cancelled) |

#### Coworking Seats & Allocations

| Seat Fields | `seat_number` (unique), `floor`, `zone`, `has_monitor`, `monthly_rate`, `is_available` |
|------------|---|
| Allocation Fields | `seat`, `startup`, `start_date`, `end_date`, `is_active`, `payment_confirmed` |

#### Resources (Knowledge Base)

| Field | Type | Description |
|-------|------|-------------|
| `title` | CharField | Resource name |
| `resource_type` | CharField | `document` / `video` / `link` / `template` / `other` |
| `file` | FileField | Uploaded document |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/lab-equipment/` | CRUD for lab equipment |
| `/api/v1/lab-bookings/` | CRUD for lab bookings |
| `/api/v1/coworking-seats/` | CRUD for coworking seats |
| `/api/v1/seat-allocations/` | CRUD for seat allocations |
| `/api/v1/resources/` | CRUD for shared resources |

---

### 5.11 Internships

**Models**: `Internship`, `InternshipApplication`

Startups can post internship openings that are publicly visible.

| Internship Fields | `startup`, `title`, `description`, `requirements`, `duration`, `stipend`, `location_type` (Onsite / Remote / Hybrid), `positions_available`, `application_deadline`, `status` (Draft / Open / Closed / Filled), `is_visible_public` |
|------------------|---|
| Application Fields | `internship`, `applicant_name`, `email`, `phone`, `resume`, `cover_letter`, `status` (Submitted / Shortlisted / Accepted / Rejected) |

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/internships/` | CRUD for internship listings |
| `/api/v1/internship-applications/` | CRUD for applications |

---

### 5.12 Publications

**Model**: `Publication`

Track research output, patents, and case studies from incubated startups.

| Field | Type | Description |
|-------|------|-------------|
| `startup` | ForeignKey(Startup) | Publishing startup |
| `title` | CharField | Publication title |
| `authors` | CharField | Author list |
| `abstract` | TextField | Summary |
| `publication_type` | CharField | `research_paper` / `patent` / `case_study` / `whitepaper` / `other` |
| `published_in` | CharField | Journal/venue name |
| `doi_url` | URLField | DOI link |
| `file` | FileField | Document file |
| `is_partnered` | BooleanField | Co-authored with partner |
| `partner_name` | CharField | Partner organization |
| `status` | CharField | `submitted` / `approved` / `published` |
| `is_visible_public` | BooleanField | Show on public page |

#### API Endpoint

| Endpoint | Description |
|----------|-------------|
| `/api/v1/publications/` | CRUD for publications |

---

### 5.13 Revenue Tracking

**Model**: `RevenueEntry`

Track all incubator income streams.

| Revenue Stream | Code |
|---------------|------|
| Incubation Fee | `incubation_fee` |
| Co-working Revenue | `coworking` |
| Events Revenue | `events` |
| Mentor Connect Fee | `mentor_connect` |
| Investor Connect Fee | `investor_connect` |
| Labs Revenue | `labs` |
| Success Fee | `success_fee` |
| Other | `other` |

| Field | Type | Description |
|-------|------|-------------|
| `stream` | CharField | Revenue stream type |
| `amount` | DecimalField | Amount |
| `startup` | ForeignKey(Startup) | Associated startup (optional) |
| `event` | ForeignKey(Event) | Associated event (optional) |
| `date` | DateField | Revenue date |
| `invoice_number` | CharField | Invoice reference |
| `is_paid` | BooleanField | Payment received |
| `payment_date` | DateField | When paid |

#### API Endpoint

| Endpoint | Description |
|----------|-------------|
| `/api/v1/revenue/` | CRUD for revenue entries |

---

### 5.14 Messaging

**Models**: `Conversation`, `Message`

In-app direct messaging between platform users.

| Conversation | `participants` (ManyToMany → User) |
|-------------|---|
| Message | `conversation`, `sender`, `content`, `is_read` |

Conversations are ordered by `updated_at` (most recent activity first). Messages are ordered chronologically within a conversation.

#### API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/v1/conversations/` | CRUD for conversations |
| `/api/v1/messages/` | CRUD for messages |

---

### 5.15 Notifications

**Model**: `Notification`

System and custom notifications for all users.

| Notification Type | Code |
|------------------|------|
| Payment Reminder | `payment_reminder` |
| Event Reminder | `event_reminder` |
| KPI Submission | `kpi_submission` |
| Application Update | `application_update` |
| Session Update | `session_update` |
| Connection Update | `connection_update` |
| Grievance Update | `grievance_update` |
| Stakeholder Validation | `stakeholder_validation` |
| System | `system` |
| Custom | `custom` |

| Field | Type | Description |
|-------|------|-------------|
| `user` | ForeignKey(User) | Target user |
| `notification_type` | CharField | Type from above |
| `title` | CharField | Notification title |
| `message` | TextField | Full message |
| `link` | CharField | Deep link URL |
| `is_read` | BooleanField | Read status |

#### API Endpoint

| Endpoint | Description |
|----------|-------------|
| `/api/v1/notifications/` | CRUD for notifications |

---

### 5.16 Success Stories

**Model**: `SuccessStory`

Showcase graduated/successful startups on the public site.

| Field | Type | Description |
|-------|------|-------------|
| `startup_name` | CharField | Company name |
| `founder_name` | CharField | Founder name |
| `story_title` | CharField | Headline |
| `story_text` | TextField | Full narrative |
| `image_url` | URLField | Story image |
| `sector` | CharField | Industry |
| `raised_amount` | CharField | Total funding raised |
| `exit_type` | CharField | `ipo` / `acquisition` / `graduated` / `ongoing` |
| `featured` | BooleanField | Featured story |

#### API Endpoint

| Endpoint | Description |
|----------|-------------|
| `/api/v1/success-stories/` | CRUD for success stories |

---

### 5.17 Permissions System

Six reusable permission classes in `backend/accounts/permissions.py`:

| Permission | Rule |
|-----------|------|
| `IsAdminUser` | `role == 'admin'` (not subject to approval_status) |
| `IsMentorUser` | `role == 'mentor'` AND `approval_status == 'approved'` |
| `IsInvestorUser` | `role == 'investor'` AND `approval_status == 'approved'` |
| `IsStartupUser` | `role == 'startup'` AND `approval_status == 'approved'` |
| `IsOwnerOrAdmin` | Object-level: user owns the object OR is admin |
| `IsOwnerOrReadOnly` | Safe methods (GET) allowed for all; write only for owner/admin |

`IsOwnerOrAdmin` checks ownership via `obj.user_id`, `obj.user`, or `obj.email` fields.

### 5.18 Export & Reporting

`backend/accounts/exports.py` provides three export utilities:

| Function | Output | Description |
|---------|--------|-------------|
| `export_to_excel()` | `.xlsx` | Styled Excel with branded header row (teal `#0D6B6E`), data rows, auto-width columns |
| `export_to_pdf()` | `.pdf` | Table-format PDF (A4 or landscape), supports large datasets |
| `export_quarterly_report_pdf()` | `.pdf` | Per-startup quarterly report with KPIs, milestones, and task summaries |

**Startup-specific export endpoints**:

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/startups/export/excel/` | Export all startups as Excel |
| `GET /api/v1/startups/export/pdf/` | Export all startups as PDF |
| `GET /api/v1/startups/{id}/quarterly-report/` | Generate quarterly PDF report |
| `GET /api/v1/startups/{id}/due-diligence/` | Aggregated data: KPIs, milestones, sessions, revenue |
| `GET /api/v1/startups/{id}/workspace-usage/` | Seat allocations + lab bookings |

### 5.19 Email Notifications

`backend/accounts/emails.py` provides templated email functions:

| Function | Trigger |
|---------|---------|
| `notify_admin_new_application()` | New user registration pending approval |
| `notify_application_received()` | Confirmation to applicant after submission |
| `notify_application_status()` | Application approved/rejected notification |
| `notify_stakeholder_review_needed()` | Mentor asked to validate an application |
| `notify_admin_stakeholder_approved()` | Escalate to admin after mentor validation |
| `notify_grievance_update()` | Grievance status change notification |
| `send_notification()` | Generic email sender |

Email backend defaults to console (development). Configure `EMAIL_BACKEND` env var for production SMTP.

### 5.20 Application Review Custom Actions

Applications have custom ViewSet actions beyond standard CRUD:

| Endpoint | Method | Permission | Description |
|----------|--------|-----------|-------------|
| `/api/v1/startup-applications/{id}/validate/` | PATCH | Mentor | Mentor validates application |
| `/api/v1/startup-applications/{id}/review/` | PATCH | Admin | Admin approves/rejects |
| `/api/v1/mentor-applications/{id}/validate/` | PATCH | Mentor | Mentor validates |
| `/api/v1/mentor-applications/{id}/review/` | PATCH | Admin | Admin approves/rejects |
| `/api/v1/investor-applications/{id}/validate/` | PATCH | Mentor | Mentor validates |
| `/api/v1/investor-applications/{id}/review/` | PATCH | Admin | Admin approves/rejects |
| `/api/v1/role-promotion-requests/my-requests/` | GET | Authenticated | User's own requests |
| `/api/v1/role-promotion-requests/{id}/review/` | PATCH | Admin | Admin reviews |
| `/api/v1/milestones/{id}/mentor-approve/` | PATCH | Mentor | Mentor approves/rejects milestone |
| `/api/v1/milestones/{id}/admin-approve/` | PATCH | Admin | Admin approves/rejects milestone |

---

## 6. API Reference

### Base URL

- **Development**: `http://localhost:8000/api/v1/`
- **Docker**: `/api/v1/` (proxied via Nginx)
- **Production**: Set via `NEXT_PUBLIC_API_URL` environment variable

### Authentication

All endpoints require JWT Bearer token unless marked as Public.

```
Authorization: Bearer <access_token>
```

### Pagination

All list endpoints return paginated responses:

```json
{
  "count": 42,
  "next": "http://localhost:8000/api/v1/startups/?page=2",
  "previous": null,
  "results": [...]
}
```

Default page size: 20

### Rate Limiting

| User Type | Rate |
|-----------|------|
| Anonymous | 30 requests/minute |
| Authenticated | 120 requests/minute |
| Auth endpoints | 5 requests/minute |

### Filtering, Search & Ordering

All ViewSets support:
- **Filtering**: Django Filter backend (query params matching model fields)
- **Search**: `?search=term` (full-text search on configured fields)
- **Ordering**: `?ordering=field_name` or `?ordering=-field_name` (descending)

### Complete Endpoint Map

```
/api/v1/
├── auth/
│   ├── register/                    POST
│   ├── login/                       POST
│   ├── token/refresh/               POST
│   ├── me/                          GET, PATCH
│   ├── change-password/             POST
│   ├── password-reset/              POST
│   ├── password-reset/confirm/      POST
│   ├── users/                       GET
│   ├── users/pending-approvals/     GET
│   ├── users/{id}/                  GET, PATCH
│   └── users/{id}/approval/         PATCH
│
├── startup-applications/            GET, POST, PUT, PATCH, DELETE
├── mentor-applications/             GET, POST, PUT, PATCH, DELETE
├── investor-applications/           GET, POST, PUT, PATCH, DELETE
├── role-promotion-requests/         GET, POST, PUT, PATCH, DELETE
├── status/                          GET
│
├── startups/                        GET, POST, PUT, PATCH, DELETE
├── kpis/                            GET, POST, PUT, PATCH, DELETE
├── milestones/                      GET, POST, PUT, PATCH, DELETE
├── tasks/                           GET, POST, PUT, PATCH, DELETE
├── grievances/                      GET, POST, PUT, PATCH, DELETE
│
├── mentors/                         GET, POST, PUT, PATCH, DELETE
├── mentor-sessions/                 GET, POST, PUT, PATCH, DELETE
├── mentor-assignments/              GET, POST, PUT, PATCH, DELETE
│
├── investors/                       GET, POST, PUT, PATCH, DELETE
├── investor-connections/            GET, POST, PUT, PATCH, DELETE
│
├── events/                          GET, POST, PUT, PATCH, DELETE
├── event-registrations/             GET, POST, PUT, PATCH, DELETE
├── event-coupons/                   GET, POST, PUT, PATCH, DELETE
│
├── hackathons/                      GET, POST, PUT, PATCH, DELETE
├── hackathon-levels/                GET, POST, PUT, PATCH, DELETE
├── hackathon-judges/                GET, POST, PUT, PATCH, DELETE
├── hackathon-registrations/         GET, POST, PUT, PATCH, DELETE
├── hackathon-teams/                 GET, POST, PUT, PATCH, DELETE
├── hackathon-submissions/           GET, POST, PUT, PATCH, DELETE
├── hackathon-criteria/              GET, POST, PUT, PATCH, DELETE
├── hackathon-scores/                GET, POST, PUT, PATCH, DELETE
├── hackathon-results/               GET, POST, PUT, PATCH, DELETE
│
├── cpro-listings/                   GET, POST, PUT, PATCH, DELETE
├── cpro-submissions/                GET, POST, PUT, PATCH, DELETE
├── cpro-front-desk/                 GET, POST, PUT, PATCH, DELETE
├── cpro-ip-providers/               GET, POST, PUT, PATCH, DELETE
├── cpro-ip-requests/                GET, POST, PUT, PATCH, DELETE
├── cpro-vs-partners/                GET, POST, PUT, PATCH, DELETE
├── cpro-problem-statements/         GET, POST, PUT, PATCH, DELETE
├── cpro-venture-matches/            GET, POST, PUT, PATCH, DELETE
│
├── funding/                         GET, POST, PUT, PATCH, DELETE
│
├── lab-equipment/                   GET, POST, PUT, PATCH, DELETE
├── lab-bookings/                    GET, POST, PUT, PATCH, DELETE
├── coworking-seats/                 GET, POST, PUT, PATCH, DELETE
├── seat-allocations/                GET, POST, PUT, PATCH, DELETE
├── resources/                       GET, POST, PUT, PATCH, DELETE
│
├── internships/                     GET, POST, PUT, PATCH, DELETE
├── internship-applications/         GET, POST, PUT, PATCH, DELETE
│
├── publications/                    GET, POST, PUT, PATCH, DELETE
│
├── revenue/                         GET, POST, PUT, PATCH, DELETE
│
├── conversations/                   GET, POST, PUT, PATCH, DELETE
├── messages/                        GET, POST, PUT, PATCH, DELETE
│
├── notifications/                   GET, POST, PUT, PATCH, DELETE
│
└── success-stories/                 GET, POST, PUT, PATCH, DELETE
```

---

## 7. Frontend Application

### Route Structure

The frontend uses Next.js 16 App Router with route groups for layout separation.

#### Public Pages (`(public)/*`)

| Route | Page |
|-------|------|
| `/` | Landing page with hero, features, stats, testimonials, CTA |
| `/login` | Email/password login form |
| `/signup` | User registration with role selection |
| `/forgot-password` | Password reset request |
| `/about` | About the incubator |
| `/contact` | Contact form |
| `/apply` | Public application portal |
| `/events` | Public events listing |
| `/hackathons` | Public hackathons listing |
| `/internships` | Public internship board |
| `/publications` | Public research/patent showcase |
| `/funding` | Public funding schemes directory |
| `/facilities` | Facility showcase |
| `/partners` | Partner organizations |
| `/success-stories` | Alumni success stories |
| `/cpro` | C.Pro public showcase (Front Desk) |

#### Admin Dashboard (`(dashboard)/admin/*`)

| Route | Page |
|-------|------|
| `/admin` | Dashboard with overview stats, charts, recent activity |
| `/admin/startups` | Manage all startups |
| `/admin/applications` | Review startup/mentor/investor applications |
| `/admin/mentors` | Manage mentor profiles and assignments |
| `/admin/investors` | Manage investor profiles and connections |
| `/admin/facilities` | Manage seats, equipment, bookings |
| `/admin/events` | Create and manage events |
| `/admin/internships` | Manage internship listings |
| `/admin/publications` | Review and publish research output |
| `/admin/grievances` | Handle startup grievances |
| `/admin/tasks` | Assign and track tasks |
| `/admin/resources` | Manage shared resources |
| `/admin/funding` | Manage funding scheme directory |
| `/admin/hackathons` | Full hackathon management |
| `/admin/cpro` | C.Pro pipeline management |
| `/admin/success-stories` | Manage success stories |
| `/admin/users` | User management and approvals |
| `/admin/reports` | Analytics and reports |
| `/admin/mentor-analytics` | Mentor performance analytics |
| `/admin/investor-analytics` | Investor engagement analytics |
| `/admin/notifications` | Send notifications |
| `/admin/settings` | Platform settings |

#### Startup Dashboard (`(dashboard)/startup/*`)

| Route | Page |
|-------|------|
| `/startup` | Dashboard with KPI summary, upcoming tasks, milestones |
| `/startup/profile` | Startup profile editor |
| `/startup/milestones` | Milestone tracker with approval status |
| `/startup/kpi` | KPI submission and tracking |
| `/startup/tasks` | View assigned tasks |
| `/startup/grievances` | File and track grievances |
| `/startup/mentors` | View assigned mentors, request sessions |
| `/startup/resources` | Access shared resources |
| `/startup/facilities` | Book seats and equipment |
| `/startup/internships` | Post and manage internships |
| `/startup/publications` | Submit research/patents |
| `/startup/investors` | View investor directory |
| `/startup/funding` | Browse funding schemes |
| `/startup/hackathons` | Browse and register for hackathons |
| `/startup/cpro` | Submit to C.Pro listings |
| `/startup/events` | Browse and register for events |
| `/startup/messages` | In-app messaging |
| `/startup/settings` | Account settings |

#### Mentor Dashboard (`(dashboard)/mentor/*`)

| Route | Page |
|-------|------|
| `/mentor` | Dashboard with session overview, assigned startups |
| `/mentor/startups` | View assigned startups |
| `/mentor/sessions` | Manage mentoring sessions |
| `/mentor/validations` | Validate applications and milestones |
| `/mentor/resources` | Access shared resources |
| `/mentor/investors` | View investor directory |
| `/mentor/hackathons` | Browse hackathons |
| `/mentor/cpro` | View C.Pro pipeline |
| `/mentor/refer-startup` | Refer a new startup |
| `/mentor/messages` | In-app messaging |
| `/mentor/profile` | Edit mentor profile |
| `/mentor/settings` | Account settings |

#### Investor Dashboard (`(dashboard)/investor/*`)

| Route | Page |
|-------|------|
| `/investor` | Dashboard with portfolio overview, deal pipeline |
| `/investor/portfolio` | Investment portfolio tracker |
| `/investor/startups` | Browse recommended startups |
| `/investor/deals` | Deal flow management |
| `/investor/hackathons` | Browse hackathons |
| `/investor/cpro` | View C.Pro showcase |
| `/investor/events` | Browse events |
| `/investor/messages` | In-app messaging |
| `/investor/profile` | Edit investor profile |
| `/investor/settings` | Account settings |

### Key Components

| Component | Purpose |
|-----------|---------|
| `DashboardLayout` | Wraps all dashboard pages with sidebar + navbar |
| `Sidebar` | Role-aware navigation with collapsible menu |
| `Navbar` | Top bar with user info and notification bell |
| `NotificationBell` | Real-time notification indicator |
| `MessagingPanel` | In-app messaging interface |
| `MentorTermsGate` | Enforces T&C acceptance for mentors |
| `Card` | Reusable card component |
| `TableCard` | Card with tabular data display |
| `Modal` | Dialog/overlay component |
| `ConfirmDialog` | Confirmation dialog for destructive actions |
| `FormField` | Standardized form input wrapper |
| `AnimatedStat` | Animated statistic display |
| `EmptyState` | Placeholder for empty lists |
| `PageSkeleton` | Loading skeleton |
| `Breadcrumbs` | Navigation breadcrumbs |
| `InternshipCard` / `InternshipTable` | Internship display components |
| `InvestorSuggestionCard` | Investor recommendation card |
| `Providers` | React Query + Hot Toast providers wrapper |

### State Management

| Store | Library | Purpose |
|-------|---------|---------|
| Auth Store | Zustand (persisted) | User data, JWT tokens, login/logout |
| Server State | React Query (TanStack) | API data fetching, caching, mutations |

The auth store persists to `localStorage` under the key `incubaseos-auth`, surviving page refreshes and browser restarts.

### API Hooks (`lib/hooks.ts`)

Every API module has dedicated React Query hooks:

```typescript
// Pattern for each module:
useModuleList(params?)     // GET list with pagination
useModuleDetail(id)        // GET single item
useCreateModule()          // POST mutation
useUpdateModule()          // PATCH mutation
useDeleteModule()          // DELETE mutation
```

All mutations automatically invalidate related query caches on success.

### Design System

- **Theme**: Dark mode by default (`className="dark"` on `<html>`)
- **Color Palette**: Navy (900/800) backgrounds, teal-500 accents
- **Fonts**: Outfit (headings), DM Sans (body text)
- **Icons**: Lucide React
- **Animations**: Framer Motion (page transitions, stat counters)
- **Layout**: Sidebar navigation (collapsible) + top navbar + main content area

---

## 8. Deployment

### Option 1: Docker Compose (Recommended for Self-Hosting)

```bash
# Clone repository
git clone <repo-url>
cd incubaseos

# Configure environment (optional - defaults work for local)
cp .env.docker .env

# Build and start all services
docker compose up --build -d

# Access at http://localhost:9080
```

#### Services Architecture

| Service | Image | Port | Health Check |
|---------|-------|------|-------------|
| `db` | postgres:16-alpine | 5432 (internal), 5433 (external) | `pg_isready` every 5s |
| `backend` | Custom (Python 3.12-slim) | 8000 (internal) | Depends on db health |
| `frontend` | Custom (Node 22-alpine) | 3000 (internal) | `wget` to `/` every 5s |
| `nginx` | Custom (nginx) | 80 → host port 9080 | Depends on frontend health |

#### Startup Sequence

1. **PostgreSQL** starts and becomes healthy (pg_isready)
2. **Backend** starts → waits for DB connection → runs migrations → collects static files → seeds data if empty → starts Gunicorn (3 workers)
3. **Frontend** builds standalone Next.js output → starts Node server
4. **Nginx** starts after frontend health check passes → routes traffic

#### Volumes

| Volume | Purpose |
|--------|---------|
| `postgres_data` | PostgreSQL data persistence |
| `media_data` | User uploaded files (shared: backend write, nginx read) |
| `static_data` | Django static files (shared: backend write, nginx read) |

### Option 2: Vercel (Frontend) + VPS (Backend)

1. Deploy frontend to Vercel (auto-detected as Next.js)
2. Deploy backend to VPS with PostgreSQL
3. Set `NEXT_PUBLIC_API_URL` on Vercel to point to VPS backend (e.g., `https://api.yourdomain.com/api/v1/`)
4. Configure CORS on backend: set `FRONTEND_URL` to Vercel app URL
5. Backend auto-adds Vercel preview URLs to CORS via regex (`*.vercel.app`)

### Option 3: Local Development

```bash
# Terminal 1: Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Backend runs on http://localhost:8000, Frontend on http://localhost:3000

---

## 9. Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | `django-insecure-...` | Django secret key (CHANGE in production) |
| `DEBUG` | `False` | Debug mode |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` | Comma-separated allowed hosts |
| `DATABASE_URL` | *(empty = SQLite)* | PostgreSQL connection string |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Comma-separated CORS origins |
| `CORS_ALLOW_ALL_ORIGINS` | `False` | Allow all origins (dev only) |
| `CSRF_TRUSTED_ORIGINS` | `http://localhost:3000` | CSRF trusted origins |
| `FRONTEND_URL` | *(empty)* | Frontend URL (for Vercel cross-origin setup) |
| `ADDITIONAL_CORS_ORIGINS` | *(empty)* | Extra CORS origins (staging URLs) |
| `SECURE_SSL_REDIRECT` | `False` | Redirect HTTP to HTTPS |
| `FORCE_HTTPS_COOKIES` | `False` | Secure cookie flag |
| `EMAIL_BACKEND` | `console.EmailBackend` | Email delivery backend |
| `DEFAULT_FROM_EMAIL` | `noreply@incubaseos.com` | From address |
| `DB_CONN_MAX_AGE` | `0` | Connection pooling (0 for serverless) |
| `VERCEL_URL` | *(auto-set by Vercel)* | Vercel deployment URL |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `/api/v1/` | Backend API base URL |
| `DOCKER_BUILD` | *(unset)* | Set to `true` for standalone Docker build |

### Docker Compose

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_DB` | `incubaseos` | Database name |
| `POSTGRES_USER` | `incubaseos` | Database user |
| `POSTGRES_PASSWORD` | `incubaseos_secret_2024` | Database password |
| `DB_PORT_EXTERNAL` | `5433` | Host-mapped PostgreSQL port |
| `PORT` | `9080` | Nginx host port |

---

## 10. Development Guide

### Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@incubaseos.com` | `Admin@123456` |
| Startup | `startup@incubaseos.com` | `Test@123456` |
| Mentor | `mentor@incubaseos.com` | `Test@123456` |
| Investor | `investor@incubaseos.com` | `Test@123456` |

### Seeding Data

```bash
cd backend
python manage.py createsuperuser  # Create base users first
python manage.py shell < seed_data.py  # Seed realistic test data
```

The seed script creates:
- Startup profile "GreenPulse AI" with KPIs, milestones, tasks, grievances
- Mentor profile with expertise areas and session history
- Investor profile with portfolio data
- Events, resources, and other related entities
- 15 additional dummy users (5 per role)

### Adding a New Module

1. **Backend**:
   - `python manage.py startapp <name>` inside `backend/`
   - Add to `INSTALLED_APPS` in `config/settings.py`
   - Define models in `models.py` (UUID PKs, timestamps)
   - Create serializer in `serializers.py`
   - Create ViewSet in `views.py`
   - Register routes in `urls.py` with `DefaultRouter`
   - Include in `config/urls.py`: `path('api/v1/', include('<name>.urls'))`
   - Run `python manage.py makemigrations && python manage.py migrate`

2. **Frontend**:
   - Add React Query hooks in `src/lib/hooks.ts`
   - Create page at `src/app/(dashboard)/<role>/<module>/page.tsx`
   - Add navigation item to `src/components/Sidebar.tsx` `menusByRole`

### Conventions

- All models use UUID primary keys (`models.UUIDField(primary_key=True, default=uuid.uuid4)`)
- All models have `created_at` (auto_now_add) and `updated_at` (auto_now) timestamps
- Status fields use `TextChoices` enums
- ViewSets default to `IsAuthenticated` permission
- API uses PageNumberPagination with `page_size=20`
- Frontend components use Tailwind CSS with `cn()` utility (clsx + tailwind-merge)
- File uploads stored under `media/` directory, organized by model

### Project Structure

```
incubaseos/
├── backend/
│   ├── config/                   # Django project config
│   │   ├── settings.py          # All settings (DB, JWT, CORS, etc.)
│   │   ├── urls.py              # Root URL configuration
│   │   └── wsgi.py              # WSGI entry point
│   ├── accounts/                # User model, auth endpoints
│   ├── applications/            # Onboarding applications
│   ├── startups/                # Startup profiles, KPIs, milestones
│   ├── mentors/                 # Mentor profiles, sessions, assignments
│   ├── investors/               # Investor profiles, connections
│   ├── events/                  # Events, registrations, coupons
│   ├── hackathons/              # Full hackathon system
│   ├── cpro/                    # Innovation pipeline (3 tracks)
│   ├── funding/                 # Funding scheme directory
│   ├── resources/               # Facilities, equipment, resources
│   ├── internships/             # Internship listings
│   ├── publications/            # Research output tracking
│   ├── revenue/                 # Revenue tracking
│   ├── messaging/               # In-app messaging
│   ├── notifications/           # Notification system
│   ├── successstories/          # Success stories
│   ├── requirements.txt         # Python dependencies
│   ├── Dockerfile               # Backend Docker image
│   ├── entrypoint.sh           # Docker startup script
│   └── seed_data.py            # Test data seeder
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/       # Public pages (login, signup, etc.)
│   │   │   ├── (dashboard)/    # Protected dashboard pages
│   │   │   │   ├── admin/      # 20+ admin pages
│   │   │   │   ├── startup/    # 18 startup pages
│   │   │   │   ├── mentor/     # 12 mentor pages
│   │   │   │   └── investor/   # 10 investor pages
│   │   │   ├── layout.tsx      # Root layout (fonts, providers)
│   │   │   ├── page.tsx        # Landing page
│   │   │   └── globals.css     # Tailwind + custom styles
│   │   ├── components/         # 19 shared components
│   │   └── lib/
│   │       ├── api.ts          # Axios client with JWT interceptor
│   │       ├── auth.ts         # Zustand auth store
│   │       ├── hooks.ts        # React Query hooks (all modules)
│   │       └── utils.ts        # Utility functions
│   ├── package.json            # Frontend dependencies
│   └── Dockerfile              # Multi-stage frontend build
│
├── nginx/
│   ├── nginx.conf              # Reverse proxy configuration
│   └── Dockerfile              # Nginx Docker image
│
├── docker-compose.yml          # 4-service orchestration
├── .env.docker                 # Docker environment template
└── CLAUDE.md                   # AI assistant instructions
```

---

## Summary

IncubaseOS is a comprehensive incubation management platform with:

- **16 Django apps** covering the full incubation lifecycle
- **50+ database models** with rich relationships and workflows
- **60+ REST API endpoint groups** (full CRUD via DRF ViewSets)
- **75+ frontend pages** across 4 role-based dashboards + 15 public pages
- **19 shared UI components** with a dark-themed design system
- **Dual-approval workflows** for milestones (mentor + admin)
- **Multi-level hackathon system** with weighted judging criteria
- **3-track innovation pipeline** (Front Desk + IP Services + Venture Studio)
- **Docker Compose deployment** with PostgreSQL, Gunicorn, Nginx
- **Vercel-compatible** frontend with cross-origin VPS backend support
