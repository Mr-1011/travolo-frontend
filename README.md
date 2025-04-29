# Travolo

A progressive web application that helps users discover personalized travel destinations based on their preferences and interests.

## Project Overview

This application guides users through a step-by-step questionnaire to gather travel preferences, then provides tailored vacation recommendations. The user journey includes 10 steps to progressively refine the users travel preferences:

1. **Travel Themes**: Select interests from options like Culture, Adventure, Nature, Beaches, Nightlife, Cuisine, Wellness, Urban, and Seclusion.
2. **Weather Preference**: Select a preferred temperature range (in Celsius) using a slider. Min -10 to Max 40.
3. **Travel Months**: Select ideal time periods for travel. Select Months in a year.
4. **Trip Duration**: Specify length of stay: Day trip (1 day), Weekend (2–3 days), Short trip (4–6 days), One week (7–9 days), Long trip (10+ days)
5. **Preferred Regions**: Select geographic areas of interest: Europe, Asia, North America, South America, Africa, Middle East, Anywhere.
6. **Origin Location**: Specify your starting location
7. **Budget**: Indicate spending capacity by selecting from options like Budget, Mid-range, or Luxury.
8. **Destination Ratings**: Rate up to 10 random destinations (like/dislike) using a card-swiping interface to refine recommendations.
9. **Photo Upload**: Optionally upload up to 3 photos from past trips for visual preference analysis.

**Recommendations View**: Display of personalized travel suggestions

## Technology Stack

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tooling
- **shadcn/ui**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Navigation
- **React Query**: Data fetching and state management

## Project Structure

```
src/
├── components/       # UI components
│   ├── steps/        # Step-specific components
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── lib/              # Libraries and integrations
├── pages/            # Page components
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

## Features

- Multi-step preference collection
- Interactive UI with real-time feedback
- Photo upload capabilities
- Personalized travel recommendations
- Responsive design for all devices

## License

This project is licensed under the MIT License - see the LICENSE file for details.
