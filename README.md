# Travolo

**Discover Your Perfect Travel Destination**

Travolo is an intelligent travel recommendation platform that combines the power of AI with user preferences to create personalized travel experiences. Through an intuitive 9-step questionnaire, we gather your travel preferences, analyze your choices, and deliver tailored destination recommendations that match your unique travel style.

Whether you're a culture enthusiast seeking historical treasures, an adventure seeker craving adrenaline-pumping activities, or someone looking for peaceful seclusion, Travolo helps you discover destinations that align perfectly with your interests, budget, and travel constraints.

---

## 🎯 How It Works

Travolo guides you through a comprehensive yet user-friendly questionnaire designed to understand your travel preferences in detail. Each step is carefully crafted to capture different aspects of your ideal travel experience.

### Step 1: Travel Themes
**What experiences are you looking for?**

Select from nine distinct travel themes that define your ideal vacation style. Choose multiple themes that resonate with you:
- **Culture**: Immerse yourself in rich history, traditions, and cultural heritage
- **Adventure**: Seek adrenaline-fueled activities and thrilling experiences
- **Nature**: Connect with the natural world and stunning landscapes
- **Beaches**: Relax on pristine shores with sun, sand, and sea
- **Nightlife**: Experience vibrant bars, clubs, and after-dark entertainment
- **Cuisine**: Savor authentic local flavors and culinary adventures
- **Wellness**: Focus on health, spa treatments, and rejuvenation
- **Urban**: Embrace the energy of bustling cities and modern attractions
- **Seclusion**: Find peace and tranquility away from crowds

### Step 2: Weather Preferences
**What's your ideal temperature?**

Use our interactive slider to set your preferred temperature range (°C). Whether you love tropical warmth or cooler climates, we'll match you with destinations that offer your ideal weather conditions.

### Step 3: Travel Months
**When do you want to travel?**

Select the months that work best for your schedule. Our system considers seasonal variations, weather patterns, and local events to recommend the perfect timing for each destination.

### Step 4: Trip Duration
**How long do you want to travel?**

Choose from flexible duration options:
- **Day trip** (1 day): Perfect for nearby escapes
- **Weekend** (2–3 days): Quick getaways and city breaks
- **Short trip** (4–6 days): Focused exploration of key highlights
- **One week** (7–9 days): Comprehensive destination experience
- **Long trip** (10+ days): Extended adventures and deep immersion

### Step 5: Preferred Regions
**Where in the world do you want to go?**

Select from major geographical regions using our interactive world map:
- Europe, Asia, North America, South America, Africa, Middle East, or choose "Anywhere" for global recommendations.

### Step 6: Origin Location
**Where are you traveling from?**

Enter your departure city to help us calculate travel distances, flight connections, and provide more accurate recommendations based on your location.

### Step 7: Travel Budget
**What's your budget range?**

Choose the budget level that fits your travel style:
- **Budget**: Hostels, public transport, local eateries
- **Mid-range**: 3-star hotels, restaurants, comfortable transportation
- **Luxury**: High-end accommodations, fine dining, premium experiences

### Step 8: Destination Rating
**Help us learn your preferences**

Rate up to 10 randomly selected destinations using our intuitive swipe interface (mobile) or like/dislike buttons (desktop). This helps our AI understand your preferences and improve recommendation accuracy.

### Step 9: Photo Upload
**Show us what you love**

Upload up to 3 photos from your favorite travel experiences. Our AI analyzes the visual elements to understand your aesthetic preferences and refine recommendations accordingly. Photos are processed but never stored, ensuring your privacy.

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
VITE_APP_ENV=development

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
