<div align="center">

# 🤖 InterviewAI

### AI-Powered Interview Preparation & Career Intelligence Platform

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-3_Flash-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![JWT](https://img.shields.io/badge/Auth-JWT_+_Cookies-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-PDF_Gen-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white)](https://pptr.dev/)

<br />

*Upload your resume. Paste the job description. Let AI do the rest.*

**InterviewAI** analyzes your resume against any job description using **Google Gemini AI** and generates a comprehensive interview preparation strategy — a compatibility match score, targeted technical & behavioral questions with model answers, skill gap analysis with severity ratings, a 7-day preparation roadmap, and a tailored ATS-optimized resume PDF — all in seconds.

<br />

[Features](#-core-features) · [AI Deep Dive](#-ai-systems-engineering) · [Architecture](#️-architecture) · [Quick Start](#-quick-start) · [API Reference](#-api-reference)

</div>

---

## How It Works

```
                    ┌─────────────────┐
                    │      USER       │
                    │                 │
                    │  Resume (PDF)   │
                    │  Job Desc       │
                    │  Self Desc      │
                    └────────┬────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │   PDF Text Extraction  │
                │   (pdf-parse)          │
                └────────────┬───────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │   Google Gemini AI     │
                │   gemini-3-flash      │
                │                        │
                │   Structured Output    │
                │   Zod → JSON Schema   │
                │   enforcement          │
                └────────────┬───────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
 ┌────────────────┐  ┌─────────────┐  ┌────────────────┐
 │  Match Score   │  │  Interview  │  │  Skill Gaps    │
 │  (0-100)       │  │  Questions  │  │  + Severity    │
 │                │  │             │  │  (low/med/high)│
 │  Job title     │  │  5 Tech     │  │                │
 │  extraction    │  │  5 Behav    │  │  7-Day Prep    │
 │                │  │  + Answers  │  │  Roadmap       │
 │                │  │  + Intent   │  │                │
 └────────────────┘  └─────────────┘  └────────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │   ATS Resume PDF       │
                │   Gemini → HTML →      │
                │   Puppeteer → A4 PDF   │
                └────────────────────────┘
```

---

## ✨ Core Features

### 📊 AI Interview Report Generation

The heart of the platform. Upload your resume (PDF), paste the target job description, and optionally describe yourself — the AI generates a complete, structured interview preparation report:

| Output | Description |
|--------|-------------|
| 🎯 **Match Score (0–100)** | AI-computed compatibility score between your profile and the job requirements |
| 🏷️ **Auto Job Title Extraction** | AI detects and extracts the job title from the description automatically |
| 🔵 **5 Technical Questions** | Role-specific technical questions — each with the **interviewer's intention** behind asking it and a comprehensive **model answer** covering key points and approach |
| 🟢 **5 Behavioral Questions** | STAR-method behavioral questions with **interviewer intentions** and **detailed answer frameworks** |
| 🔴 **Skill Gap Analysis** | Every identified gap categorized by severity: `Low` · `Medium` · `High` — showing how critical each gap is for the role |
| 📅 **7-Day Preparation Plan** | A day-by-day roadmap — each day has a **focus area** (e.g., data structures, system design, mock interviews) and a list of **actionable tasks** (specific problems, articles, videos) |

### 🔍 Interactive Report Viewer

A rich, multi-panel interface to study your personalized interview strategy:

**Left Navigation Panel:**
- Three tab buttons with icons — Technical Questions `<>`, Behavioral Questions 💬, Road Map 🧭
- **Download Resume** button with sparkle icon to generate and download a tailored PDF

**Center Content (Scrollable):**
- **Technical & Behavioral Tabs** — Expandable Q&A cards with:
  - Numbered question badges (`Q1`, `Q2`, etc.) in accent color
  - Click-to-expand with animated chevron rotation
  - **Intention tag** (purple `#a78bfa`) explaining *why* the interviewer asks this
  - **Model Answer tag** (green `#3fb950`) with a comprehensive answer strategy
- **Road Map Tab** — Visual vertical timeline with:
  - Gradient accent line connecting each day
  - Circular dot markers on the timeline
  - Day pill badges, focus area titles, and bullet-point task lists

**Right Sidebar:**
- **Match Score Ring** — 90px circle with color-coded border (green ≥80, amber ≥60, red <60)
- **Skill Gap Tags** — Flex-wrapped, color-coded by severity (red/amber/green)

### 📄 AI Resume PDF Generator

Generate a job-tailored, ATS-optimized resume as a downloadable PDF with a single click:

- **Gemini AI writes professional resume content** tailored specifically to the target job description
- Content is crafted to **not sound AI-generated** — reads like a human-written resume
- Produces **clean, inline-styled HTML** with professional formatting, subtle colors, and varied font styles
- Optimized for **ATS parsability** — structured so applicant tracking systems can extract information without loss
- Targeted to be **1–2 pages** — quality over quantity, highlighting relevant skills and experience
- **Puppeteer** renders the HTML into a polished **A4 PDF** (margins: 20mm top/bottom, 15mm left/right)
- **One-click download** — file is automatically downloaded as `resume_{reportId}.pdf`

### 🏠 Home Dashboard

A polished two-panel card layout for creating new interview plans:

- **Left Panel — "Target Job Description"**: Textarea with a `REQUIRED` badge and 5,000 character limit
- **Right Panel — "Your Profile"**: 
  - Resume upload dropzone (drag & drop or click) accepting PDF/DOCX with a cloud-upload icon
  - OR a quick self-description textarea
  - Info box: *"Either a Resume or a Self Description is required"*
- **Footer**: AI-powered strategy generation status and generate button with star icon
- **Recent Reports Grid**: Clickable cards showing title, date, and color-coded match scores

### 🔐 Secure Authentication System

- **JWT Cookie-Based Auth** — Tokens stored in HTTP-only cookies, sent with every request via `withCredentials: true`
- **bcrypt Password Hashing** — Secure password storage with cryptographic salt
- **Token Blacklisting in MongoDB** — Logged-out tokens are persisted and checked on every protected request
- **Protected Route Guard** — `<Protected>` component auto-fetches user profile on mount, redirects to `/login` if not authenticated
- **Persistent Sessions** — User state restored on app load via `getMe()` endpoint

---

## 🧬 AI Systems Engineering

This project implements a **structured AI output pipeline** — going beyond simple prompt-and-pray API calls to ensure reliable, type-safe, schema-validated responses from the language model every time.

### Structured Output Pipeline

```
Zod Schema (Runtime Type Definition)
        │
        ▼
zod-to-json-schema (Conversion)
        │
        ▼
Gemini responseSchema Parameter
        │
        ▼
responseMimeType: "application/json"
        │
        ▼
✅ Guaranteed structured JSON matching exact schema
```

**Why this matters:** Raw LLM outputs are unpredictable strings. By defining a **Zod schema** for the expected output shape, converting it to **JSON Schema**, and passing it to Gemini's `responseSchema` parameter with `responseMimeType: "application/json"`, the AI is **constrained** to return data matching the exact structure — no parsing errors, no malformed responses, no hallucinated fields.

### Gemini Configuration

| Parameter | Value |
|-----------|-------|
| **Model** | `gemini-3-flash-preview` |
| **SDK** | `@google/genai` (`GoogleGenAI` class) |
| **Output Mode** | Structured JSON via `responseSchema` |
| **Response MIME** | `application/json` |

### Zod Output Schema

The AI output is constrained to this exact shape via Zod → JSON Schema conversion:

```javascript
const interviewReportSchema = z.object({
  title: z.string(),                    // Auto-extracted job title
  matchScore: z.number(),               // 0-100 compatibility score

  technicalQuestions: z.array(z.object({
    question: z.string(),               // The interview question
    intention: z.string(),              // Why the interviewer asks this
    answer: z.string(),                 // How to answer — key points, approach
  })),

  behavioralQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  })),

  skillGaps: z.array(z.object({
    skill: z.string(),                  // Missing or weak skill
    severity: z.enum(["low", "medium", "high"]),  // Impact on candidacy
  })),

  preparationPlan: z.array(z.object({
    day: z.number(),                    // Day 1-7
    focus: z.string(),                  // Focus area (e.g., system design)
    tasks: z.array(z.string()),         // Actionable tasks for the day
  })),
})
```

### Resume PDF Schema

```javascript
const resumePdfSchema = z.object({
  html: z.string(),                     // Complete HTML resume for PDF conversion
})
```

### AI Prompt Design

**Interview Report Prompt:**
- Takes three inputs: extracted resume text, self-description, and job description
- Generates the full structured report in a single API call
- Schema enforcement ensures all fields (score, questions, gaps, plan) are always present

**Resume Generation Prompt:**
- Instructs Gemini to act as an expert resume writer
- Generates clean, inline-styled HTML suitable for Puppeteer PDF conversion
- Content must **not sound AI-generated** — reads like a human-written resume
- Uses subtle colors and professional font styles while remaining **ATS-friendly**
- Targets **1–2 pages** — prioritizes quality and relevance to the specific job description

### PDF Generation Pipeline

```
Gemini AI → HTML String → Puppeteer Headless Chrome → A4 PDF Buffer → HTTP Response
```

- Puppeteer launches a headless browser
- Sets HTML content with `waitUntil: "networkidle0"` (waits for all resources)
- Generates A4 format PDF with `printBackground: true`
- Returns raw PDF buffer as downloadable attachment

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   FRONTEND  (React 19 + Vite 7)              │
│                                                              │
│  ┌────────────┐   ┌────────────────┐   ┌─────────────────┐  │
│  │  Login /   │   │     Home       │   │   Interview     │  │
│  │  Register  │   │                │   │  Report Viewer  │  │
│  │            │   │  Two-panel     │   │                 │  │
│  │  Auth      │   │  card layout   │   │  3-column:      │  │
│  │  Forms     │   │  • Job Desc    │   │  Nav | Content  │  │
│  │            │   │  • Resume ↑    │   │       | Sidebar │  │
│  │            │   │  • Self Desc   │   │                 │  │
│  │            │   │  • Generate →  │   │  • Q&A Tabs     │  │
│  │            │   │  • Reports ↓   │   │  • Road Map     │  │
│  │            │   │                │   │  • Score Ring    │  │
│  │            │   │                │   │  • Skill Gaps    │  │
│  │            │   │                │   │  • Resume PDF ↓  │  │
│  └────────────┘   └────────────────┘   └─────────────────┘  │
│                                                              │
│        AuthContext          InterviewContext                  │
│           (React Context API + Custom Hooks)                 │
└──────────────────────────┬───────────────────────────────────┘
                           │  Axios (withCredentials: true)
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                  BACKEND  (Express 5 + Node.js)              │
│                                                              │
│  ┌──────────────────┐      ┌───────────────────────────┐    │
│  │   Auth Routes     │      │   Interview Routes        │    │
│  │  POST /register   │      │  POST /         (generate)│    │
│  │  POST /login      │      │  GET  /         (list all)│    │
│  │  GET  /logout     │      │  GET  /report/:id  (view) │    │
│  │  GET  /get-me     │      │  POST /resume/pdf/:id     │    │
│  └────────┬──────────┘      └──────────┬────────────────┘    │
│           │         JWT Middleware       │                    │
│  ┌────────▼─────────────────────────────▼────────────────┐   │
│  │                    Service Layer                       │   │
│  │                                                       │   │
│  │  ai.service.js                                        │   │
│  │  ├── generateInterviewReport()                        │   │
│  │  │   Zod Schema → JSON Schema → Gemini → Struct JSON  │   │
│  │  └── generateResumePdf()                              │   │
│  │      Gemini → HTML → Puppeteer → A4 PDF Buffer        │   │
│  │                                                       │   │
│  │  Multer (3MB) · pdf-parse · bcrypt · cookie-parser    │   │
│  └────────┬──────────────────────────┬───────────────────┘   │
└───────────┼──────────────────────────┼───────────────────────┘
            │                          │
     ┌──────▼──────┐           ┌───────▼───────┐
     │  MongoDB    │           │  Google       │
     │  Atlas      │           │  Gemini AI    │
     │             │           │  3-Flash      │
     │  • Users    │           │               │
     │  • Interview│           │  Structured   │
     │    Reports  │           │  Output via   │
     │  • Blacklist│           │  Zod → JSON   │
     │    Tokens   │           │  Schema       │
     └─────────────┘           └───────────────┘
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|-----------|---------|
| **Express.js 5** | Modern web framework |
| **MongoDB + Mongoose 9** | Document database — users, interview reports, blacklisted tokens |
| **@google/genai** | Google Gemini AI SDK — interview analysis and resume generation |
| **Zod + zod-to-json-schema** | Runtime type validation → JSON Schema for structured AI output |
| **Puppeteer** | Headless Chrome — HTML to A4 PDF conversion |
| **jsonwebtoken + bcryptjs** | JWT authentication with secure password hashing |
| **Multer** | Multipart file upload — 3MB memory storage for resume PDFs |
| **pdf-parse** | Extract raw text from uploaded PDF resumes |
| **cookie-parser** | HTTP-only cookie management for JWT tokens |
| **cors + dotenv** | Cross-origin configuration and environment variables |

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 19** | Component-based UI with hooks and Context API |
| **React Router 7** | Client-side routing with `createBrowserRouter` and protected route guards |
| **Vite 7** | Lightning-fast HMR dev server and optimized builds |
| **Axios** | HTTP client with automatic cookie credentials |
| **Sass/SCSS** | Modular styling — dark theme with GitHub-dark inspired color palette |

### Design System

| Element | Value |
|---------|-------|
| Background | `#0d1117` (page), `#161b22` (cards), `#1c2230` (panels) |
| Text | `#e6edf3` (primary), `#7d8590` (muted) |
| Accent | `#ff2d78` (hot pink), `#e1034d` (buttons) |
| Borders | `#2a3348` |
| Score High | `#3fb950` (green) |
| Score Mid | `#f5a623` (amber) |
| Score Low | `#ff4d4d` (red) |
| Intent Tags | `#a78bfa` (purple) |
| Answer Tags | `#3fb950` (green) |

---

## 📁 Project Structure

```
interview-ai/
│
├── Backend/
│   ├── server.js                          # Entry point — dotenv, DB connect, listen :3000
│   ├── package.json
│   └── src/
│       ├── app.js                         # Express app (CORS, cookies, JSON, routes)
│       ├── config/
│       │   └── database.js               # MongoDB connection via Mongoose
│       ├── controllers/
│       │   ├── auth.controller.js        # Register, Login, Logout, GetMe
│       │   └── interview.controller.js   # Generate report, list, view, resume PDF
│       ├── middlewares/
│       │   ├── auth.middleware.js         # JWT verify + blacklist check
│       │   └── file.middleware.js         # Multer config (3MB, memory storage)
│       ├── models/
│       │   ├── user.model.js             # User schema (username, email, password)
│       │   ├── blacklist.model.js        # Blacklisted JWT tokens
│       │   └── interviewReport.model.js  # Interview report (score, Q&A, gaps, plan)
│       ├── routes/
│       │   ├── auth.routes.js            # /api/auth/* endpoints
│       │   └── interview.routes.js       # /api/interview/* endpoints
│       └── services/
│           └── ai.service.js             # Gemini AI + Zod schemas + Puppeteer PDF
│
├── Frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                      # React entry point
│       ├── App.jsx                       # AuthProvider → InterviewProvider → Router
│       ├── app.routes.jsx                # 4 routes: login, register, home, interview/:id
│       ├── style.scss                    # Global dark theme
│       ├── style/
│       │   └── button.scss              # Shared button styles (press animation)
│       └── features/
│           ├── auth/
│           │   ├── auth.context.jsx      # Auth state context
│           │   ├── auth.form.scss        # Auth form styling
│           │   ├── components/
│           │   │   └── Protected.jsx     # Auth guard — auto getMe, redirect if unauthed
│           │   ├── hooks/
│           │   │   └── useAuth.js        # login, register, logout, auto getMe on mount
│           │   ├── pages/
│           │   │   ├── Login.jsx         # Login page
│           │   │   └── Register.jsx      # Register page
│           │   └── services/
│           │       └── auth.api.js       # Axios calls to /api/auth
│           └── interview/
│               ├── interview.context.jsx # Interview state context
│               ├── hooks/
│               │   └── useInterview.js   # generate, getReports, downloadResumePdf
│               ├── pages/
│               │   ├── Home.jsx          # Two-panel card — upload resume, generate
│               │   └── Interview.jsx     # 3-column report viewer with tabs
│               ├── services/
│               │   └── interview.api.js  # Axios calls to /api/interview
│               └── style/
│                   ├── home.scss         # Home page styles
│                   └── interview.scss    # Report viewer styles
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Link |
|-------------|------|
| **Node.js** v18+ | [Download](https://nodejs.org/) |
| **MongoDB Atlas** account | [Sign up free](https://www.mongodb.com/cloud/atlas) |
| **Google Gemini API Key** | [Get API Key](https://ai.google.dev/) |

### 1. Clone & Install

```bash
git clone https://github.com/your-username/interview-ai.git
cd interview-ai
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interviewai
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
```

```bash
npm run dev     # Starts with nodemon → http://localhost:3000
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev     # Starts Vite → http://localhost:5173
```

> **CORS** is pre-configured: the backend accepts requests from `http://localhost:5173` with credentials enabled.

---

## 🔌 API Reference

### Authentication — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/api/auth/register` | Create account — `username`, `email`, `password` | ❌ |
| `POST` | `/api/auth/login` | Login — sets JWT in HTTP-only cookie | ❌ |
| `GET`  | `/api/auth/logout` | Logout — blacklists token in MongoDB, clears cookie | ✅ |
| `GET`  | `/api/auth/get-me` | Get current authenticated user details | ✅ |

### Interview AI — `/api/interview`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/api/interview/` | Generate interview report — multipart: `resume` (PDF, 3MB max) + `jobDescription` + `selfDescription` | ✅ |
| `GET`  | `/api/interview/` | List all reports for current user — returns `title`, `matchScore`, `createdAt` (sorted newest first) | ✅ |
| `GET`  | `/api/interview/report/:interviewId` | Get full interview report by ID (with ownership check) | ✅ |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Generate & download a tailored ATS resume PDF | ✅ |

---

## 🗃️ Database Schema

### User
| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Unique, required |
| `email` | String | Unique, required |
| `password` | String | bcrypt-hashed |

### InterviewReport
| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId | Reference to User |
| `title` | String | AI-extracted job title |
| `jobDescription` | String | Target job description |
| `resume` | String | Extracted PDF text |
| `selfDescription` | String | User's self-description |
| `matchScore` | Number | 0–100 compatibility score |
| `technicalQuestions` | Array | `[{ question, intention, answer }]` — 5 questions |
| `behavioralQuestions` | Array | `[{ question, intention, answer }]` — 5 questions |
| `skillGaps` | Array | `[{ skill, severity }]` — severity: `low` / `medium` / `high` |
| `preparationPlan` | Array | `[{ day, focus, tasks[] }]` — 7-day roadmap |
| `createdAt` | Date | Auto-generated timestamp |
| `updatedAt` | Date | Auto-generated timestamp |

### BlacklistToken
| Field | Type | Notes |
|-------|------|-------|
| `token` | String | Invalidated JWT |
| `createdAt` | Date | Auto-generated timestamp |

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key — get one free at [AI Studio](https://ai.google.dev/) |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch — `git checkout -b feature/new-feature`
3. **Commit** your changes — `git commit -m 'Add new feature'`
4. **Push** to the branch — `git push origin feature/new-feature`
5. **Open** a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**⭐ Star this repo if you found it useful!**

</div>
