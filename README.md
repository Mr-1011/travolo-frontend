# Travolo

**Discover Your Perfect Travel Destination**

Travolo is an intelligent travel recommendation platform that combines the power of AI with user preferences to create personalized travel experiences. Through an intuitive 9-step questionnaire, we gather your travel preferences, analyze your choices, and deliver tailored destination recommendations that match your unique travel style.

Whether you're a culture enthusiast seeking historical treasures, an adventure seeker craving adrenaline-pumping activities, or someone looking for peaceful seclusion, Travolo helps you discover destinations that align perfectly with your interests, budget, and travel constraints.





## 🎯 How It Works

Travolo guides you through a comprehensive yet user-friendly questionnaire designed to understand your travel preferences in detail. Each step is carefully crafted to capture different aspects of your ideal travel experience.

### Step 1: Travel Themes
**What experiences are you looking for?**

![step_1](https://github.com/user-attachments/assets/d9aa533a-5ba7-48a5-bbf0-47b2e43e1250)

### Step 2: Weather Preferences
**What's your ideal temperature?**

![step_2](https://github.com/user-attachments/assets/9142ecd0-2b0f-486e-afb0-9a33afaa82f5)

### Step 3: Travel Months
**When do you want to travel?**

![step_3](https://github.com/user-attachments/assets/afd01a24-6530-4cb9-862f-9fafd5b1fcff)

### Step 4: Trip Duration
**How long do you want to travel?**

![step_4](https://github.com/user-attachments/assets/57b92330-5b2a-472d-93f5-ec2481398f85)

### Step 5: Preferred Regions
**Where in the world do you want to go?**

![step_5](https://github.com/user-attachments/assets/3b5cb48b-86f9-469a-8d18-90e2fd1e3476)

### Step 6: Origin Location
**Where are you traveling from?**

![step_6](https://github.com/user-attachments/assets/1e2e752b-2f54-457d-ad58-ad9a9f3b384b)

### Step 7: Travel Budget
**What's your budget range?**

![step_7](https://github.com/user-attachments/assets/2aa503a7-52ba-46ae-b2f7-21e159c5eed3)

### Step 8: Destination Rating
**Help us learn your preferences**

![step_8](https://github.com/user-attachments/assets/381a707b-ad86-47e7-8cf8-b88eb6447dd8)

### Step 9: Photo Upload
**Show us what you love**

![step_9](https://github.com/user-attachments/assets/a38808f2-776b-4ef8-87c6-7c782c82d750)

---

## ✨ Key Features

- **AI-Powered Recommendations** – Advanced algorithms analyze your preferences to deliver highly personalized suggestions
- **Smart Matching** – Each recommendation comes with a confidence score showing how well it matches your criteria
- **Comprehensive Destination Data** – Detailed information including weather patterns, budget estimates, ideal duration, and category ratings
- **Interactive Experience** – Swipe interface for mobile, responsive design for all devices
- **Privacy-First** – Photos are analyzed but never stored; all data remains secure
- **Progressive Enhancement** – Continue where you left off with automatic progress saving
- **Real-time Feedback** – Rate destinations and provide feedback to improve future recommendations

---

## 🛠️ Tech Stack

| Layer | Library / Tool | Notes |
|-------|----------------|-------|
| Build | **Vite** | Ultra-fast dev server with HMR |
| Language | **TypeScript** | Type-safe React 18 codebase |
| UI | **React + shadcn/ui** | Radix primitives wrapped with Tailwind variants |
| Styling | **Tailwind CSS 3** | Utility-first, with `tailwindcss-animate` for smooth transitions |
| State / Data | **React Query 5** | Caching & async states for API calls |
| Routing | **React Router 6** | File-based, SPA navigation |
| Charts | **Recharts** | Temperature line-charts |
| Gestures | **react-tinder-card** | Swipe interface in rating step |
| Icons | **Lucide-react** | Consistent SVG icon set |
| Linting | **ESLint** | Configured via `npm run lint` |

---

## Environment Variables

Create a `.env` (or `.env.local`) in the project root with the following keys:

```
VITE_OPENCAGE_API_KEY=
VITE_API_BASE_URL_DEV=http://localhost:3001
VITE_API_BASE_URL_PROD=
VITE_APP_ENV=development=
```

---

## Getting Started

```bash
# 1. Clone & install
$ git clone <repository-url>
$ cd travolo-frontend
$ npm install

$ npm run dev
```

`vite` will pick up your `.env` file, reload on changes and open the browser automatically.

---

## API Endpoints (Quick Reference)

The frontend expects a REST backend that implements:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/destinations/random?exclude=<ids>` | Returns ≤10 random destinations |
| `POST` | `/api/destinations/:id/feedback` | Text feedback for a specific place |
| `POST` | `/api/preferences/analyze-images` | Accepts uploaded photos & returns theme adjustments |
| `POST` | `/api/recommendations` | Generates personalised recommendation list |
| `POST` | `/api/recommendations/:id/feedback` | Like / dislike feedback after results |

---

## 📄 License

Released under the [MIT](LICENSE) license.
