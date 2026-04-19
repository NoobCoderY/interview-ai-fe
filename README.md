# InterviewIQ.AI

An AI-powered mock interview platform that simulates real interview pressure, evaluates your answers, and gives you actionable feedback to help you land your next job.

---

## What It Does

- **AI-generated questions** tailored to your target role, experience level, and interview mode (Technical / HR)
- **Resume parsing** — upload your PDF and the AI generates questions based on your actual projects and skills
- **Voice-based answers** — speak your responses naturally during the interview
- **Real-time AI scoring** — every answer is evaluated on communication, technical correctness, and confidence
- **Detailed PDF report** — download a full breakdown of your performance after each session
- **Interview history** — track your progress and scores across all past sessions
- **Credits system** — start free with 100 credits, buy more via Razorpay when needed

---

## Tech Stack

### Client (`/client`)

| Technology                 | Purpose                            |
| -------------------------- | ---------------------------------- |
| React 19 + Vite            | UI framework and build tool        |
| Tailwind CSS v4            | Styling                            |
| Framer Motion              | Animations                         |
| Redux Toolkit              | Global state (user data, auth)     |
| React Router v7            | Client-side routing                |
| Firebase Auth              | Google OAuth sign-in               |
| Axios                      | HTTP requests to backend           |
| Recharts                   | Performance analytics charts       |
| jsPDF                      | Downloadable PDF report generation |
| React Circular Progressbar | Score display                      |

### Server (`/server`)

| Technology                   | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| Node.js + Express            | REST API server                              |
| MongoDB + Mongoose           | Database                                     |
| JWT + Cookies                | Authentication                               |
| Firebase (Google OAuth)      | Identity verification                        |
| OpenRouter API (GPT-4o-mini) | AI question generation and answer evaluation |
| Razorpay                     | Payment processing for credits               |
| Multer                       | Resume file upload handling                  |
| pdf-parse                    | PDF text extraction from uploaded resumes    |

---

## Project Structure

```
├── client/                        # React frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx           # Landing page with features, how-it-works, CTA
│       │   ├── Auth.jsx           # Google sign-in page
│       │   ├── InterviewPage.jsx  # Main interview flow (setup → interview → report)
│       │   ├── InterviewHistory.jsx # List of all past interviews
│       │   ├── InterviewReport.jsx  # Detailed report for a single interview
│       │   └── Pricing.jsx        # Credits/pricing plans with Razorpay integration
│       ├── components/
│       │   ├── Navbar.jsx         # Top navigation with credits display and user menu
│       │   ├── Footer.jsx         # Site footer
│       │   ├── AuthModel.jsx      # Auth modal overlay
│       │   ├── Step1SetUp.jsx     # Interview setup form (role, experience, resume upload)
│       │   ├── Step2Interview.jsx # Active interview session with voice input
│       │   ├── Step3Report.jsx    # Post-interview summary and score breakdown
│       │   └── Timer.jsx          # Interview countdown timer
│       ├── redux/
│       │   ├── store.js           # Redux store
│       │   └── userSlice.js       # User state slice
│       └── utils/
│           └── firebase.js        # Firebase app + Google Auth provider setup
│
└── server/                        # Express backend
    ├── index.js                   # App entry point, middleware, route mounting
    ├── config/
    │   ├── connectDb.js           # MongoDB connection
    │   └── token.js               # JWT token generation
    ├── controllers/
    │   ├── auth.controller.js     # Google OAuth login, logout
    │   ├── interview.controller.js # Resume analysis, question generation, answer submission, report
    │   ├── payment.controller.js  # Razorpay order creation and payment verification
    │   └── user.controller.js     # Get current authenticated user
    ├── middlewares/
    │   ├── isAuth.js              # JWT cookie authentication middleware
    │   └── multer.js              # File upload middleware (PDF only)
    ├── models/
    │   ├── user.model.js          # User schema (name, email, credits)
    │   ├── interview.model.js     # Interview schema (role, questions, scores, status)
    │   └── payment.model.js       # Payment record schema
    ├── routes/
    │   ├── auth.route.js          # POST /api/auth/google, GET /api/auth/logout
    │   ├── interview.route.js     # Resume, questions, answers, finish, history, report
    │   ├── payment.route.js       # POST /api/payment/order, /api/payment/verify
    │   └── user.route.js          # GET /api/user/current-user
    └── services/
        ├── openRouter.service.js  # OpenRouter API wrapper (GPT-4o-mini)
        └── razorpay.service.js    # Razorpay SDK instance
```

---

## API Reference

### Auth

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | `/api/auth/google` | Sign in / register via Google OAuth |
| GET    | `/api/auth/logout` | Clear session cookie                |

### User

| Method | Endpoint                 | Auth | Description             |
| ------ | ------------------------ | ---- | ----------------------- |
| GET    | `/api/user/current-user` | ✅   | Get logged-in user data |

### Interview

| Method | Endpoint                            | Auth | Description                                      |
| ------ | ----------------------------------- | ---- | ------------------------------------------------ |
| POST   | `/api/interview/resume`             | ✅   | Upload PDF and extract role/skills/projects      |
| POST   | `/api/interview/generate-questions` | ✅   | Generate AI interview questions (costs credits)  |
| POST   | `/api/interview/submit-answer`      | ✅   | Submit an answer and receive AI evaluation       |
| POST   | `/api/interview/finish`             | ✅   | Mark interview as completed, compute final score |
| GET    | `/api/interview/get-interview`      | ✅   | Get all interviews for the current user          |
| GET    | `/api/interview/report/:id`         | ✅   | Get detailed report for a specific interview     |

### Payment

| Method | Endpoint              | Auth | Description                               |
| ------ | --------------------- | ---- | ----------------------------------------- |
| POST   | `/api/payment/order`  | ✅   | Create a Razorpay order                   |
| POST   | `/api/payment/verify` | ✅   | Verify payment and add credits to account |

---

## Environment Variables

### `server/.env`

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### `client/.env`

```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd interviewiq
```

### 2. Setup the server

```bash
cd server
npm install
# create server/.env with the variables above
npm run dev
```

### 3. Setup the client

```bash
cd client
npm install
# create client/.env with the variables above
npm run dev
```

### 4. Firebase setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Add a Web app → copy the `apiKey` into `client/.env`
3. Authentication → Sign-in method → Enable **Google**
4. Authentication → Settings → Authorized domains → add `localhost`

### 5. Open the app

- Client: `http://localhost:5173`
- Server: `http://localhost:8000`

---

## Credits System

| Plan         | Price | Credits |
| ------------ | ----- | ------- |
| Free         | ₹0    | 100     |
| Starter Pack | ₹100  | 150     |
| Pro Pack     | ₹500  | 650     |

Each interview session consumes credits. Credits are deducted when questions are generated.

---

## Interview Flow

```
1. Sign in with Google
       ↓
2. Setup: Enter role, experience, interview mode
   (Optional) Upload resume PDF for tailored questions
       ↓
3. AI generates questions via OpenRouter (GPT-4o-mini)
       ↓
4. Answer each question using your voice within the time limit
       ↓
5. AI evaluates each answer: communication + correctness + confidence
       ↓
6. Finish → final score computed → session saved to MongoDB
       ↓
7. View detailed report → download as PDF
```

---

## License

MIT
