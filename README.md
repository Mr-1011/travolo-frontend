# Travolo

A progressive web application that guides users through a rich, interactive questionnaire and then generates personalised travel destination recommendations.

---

- **Structured Preference Collection** – Nine clearly defined steps gather all relevant travel criteria:
1. **Travel Themes**: Select interests from options like Culture, Adventure, Nature, Beaches, Nightlife, Cuisine, Wellness, Urban, and Seclusion.
2. **Weather Preference**: Select a preferred temperature range (in Celsius) using a slider. Min -10 to Max 40.
3. **Travel Months**: Select ideal time periods for travel. Select Months in a year.
4. **Trip Duration**: Specify length of stay: Day trip (1 day), Weekend (2–3 days), Short trip (4–6 days), One week (7–9 days), Long trip (10+ days)
5. **Preferred Regions**: Select geographic areas of interest: Europe, Asia, North America, South America, Africa, Middle East, Anywhere.
6. **Origin Location**: Specify your starting location 
7. **Budget**: Indicate spending capacity by selecting from options like Budget, Mid-range, or Luxury.
8. **Destination Ratings**: Rate up to 10 random destinations (like/dislike) using a card-swiping interface to refine recommendations.
9. **Photo Upload**: Optionally upload up to 3 photos from past trips for visual preference analysis

- **Recommendation Engine** – Generates a ranked list of destinations accompanied by match percentages and key attributes (budget, ideal duration, seasonal temperatures).

- **Detailed Destination View** – Modal with category ratings, temperature chart, budget guidance and feedback form.

- **User Feedback Capture** – Like/dislike toggles and open-text comments are sent back to the API for continuous improvement.

- **Responsive & Persistent** – Fully functional on mobile and desktop; current progress is saved to localStorage to survive page refreshes.

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

## Project Structure

```
src/
 ├─ components/
 │   ├─ steps/            # One file per questionnaire step
 │   ├─ DestinationCard.tsx
 │   ├─ DestinationDetailModal.tsx
 │   ├─ WorldMap.tsx      # Interactive SVG map wrapper
 │   ├─ TemperatureChart.tsx
 │   └─ …
 │
 ├─ hooks/                # Custom React hooks (e.g. useUserPreferences)
 ├─ services/             # Thin API wrappers (destinationService, recommendationService …)
 ├─ pages/                # Route end-points (PreferencesPage, ResultsPage)
 └─ types/                # Shared TypeScript types
```

---

## Environment Variables

Create a `.env` (or `.env.local`) in the project root with the following keys:

```
# Base URLs for the backend API
VITE_API_BASE_URL_DEV=http://localhost:3001

# Build mode – "production" picks the *_PROD* URL, anything else uses *_DEV*
VITE_APP_ENV=development
```

> The file is consumed inside `src/config/apiConfig.ts` – adjust if your backend runs elsewhere.

---

## Getting Started

```bash
# 1. Clone & install
$ git clone <repository-url>
$ cd travolo-frontend
$ npm install

# 2. Start the dev server (http://localhost:5173 by default)
$ npm run dev
```

`vite` will pick up your `.env` file, reload on changes and open the browser automatically.

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Create an optimised production bundle in `dist/` |
| `npm run build:dev` | Build using the *development* env (helpful for Netlify previews) |
| `npm run preview` | Serve the _built_ bundle locally to verify integrity |
| `npm run lint` | Run ESLint over the entire codebase |

---

## API End-Points (quick reference)

The frontend expects a REST backend that implements:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/destinations/random?exclude=<ids>` | Returns ≤10 random destinations |
| `POST` | `/api/destinations/:id/feedback` | Text feedback for a specific place |
| `POST` | `/api/preferences/analyze-images` | Accepts uploaded photos & returns theme adjustments |
| `POST` | `/api/recommendations` | Generates personalised recommendation list |
| `POST` | `/api/recommendations/:id/feedback` | Like / dislike feedback after results |

Feel free to stub or mock these routes while developing.

---

## 📄 License

Released under the [MIT](LICENSE) license.
