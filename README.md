# JobPulse 🚀

An AI-powered job application tracker that helps you organize your job search, track application status, and analyze job descriptions with AI.

**Live Demo:** [jobpulse.vercel.app](https://jobpulse.vercel.app) <!-- Update after deploy -->

---

## ✨ Features

- **Kanban Board** — Drag-and-drop job applications across stages (Applied → Interview → Offer → Rejected)
- **AI Job Description Analyzer** — Paste any job description to get AI-powered skill gap analysis (powered by Google Gemini)
- **Analytics Dashboard** — Visual breakdown of application stats, response rates, and status distribution
- **Real-time Persistence** — All data saved to Firebase Firestore, accessible across devices
- **Edit Applications** — Click any card to edit details and add interview notes
- **Smooth Animations** — Framer Motion powered transitions throughout the app

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend Framework | React.js (Vite) |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Drag & Drop | @dnd-kit |
| Animations | Framer Motion |
| Charts | Recharts |
| AI Integration | Google Gemini API |
| Database | Firebase Firestore |
| Routing | React Router DOM |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/jobpulse.git

# Navigate to project folder
cd jobpulse

# Install dependencies
npm install

# Create .env file and add your keys
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### Run Locally

```bash
npm run dev
```

---

## 📸 Screenshots

> Board, Analytics, and AI Analyzer screenshots here (add after deploy)

---

## 💡 Key Technical Decisions

- **Zustand over Redux** — Simpler state management without boilerplate, suitable for this project's scale
- **@dnd-kit over react-beautiful-dnd** — More actively maintained, better React 18/19 compatibility
- **Firestore persistent cache** — Reduces load time from ~10s to ~1s on repeat visits
- **Gemini over OpenAI** — Free tier available without credit card, suitable for portfolio demo

---

## 👩‍💻 Author

**Fatima tu Zahraa**
- LinkedIn: [your-linkedin-url]
- GitHub: [your-github-url]