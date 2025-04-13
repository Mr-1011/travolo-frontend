# Travolo

A progressive web application that helps users discover personalized travel destinations based on their preferences and interests.

## Project Overview

This application guides users through a step-by-step questionnaire to gather travel preferences, then provides tailored vacation recommendations. The user journey includes:

1. **Travel Themes**: Select interests (adventure, relaxation, culture, etc.)
2. **Weather Preference**: Choose preferred climate conditions
3. **Travel Months**: Select ideal time periods for travel
4. **Trip Duration**: Specify length of stay
5. **Preferred Regions**: Select geographic areas of interest
6. **Origin Location**: Specify your starting location
7. **Budget**: Indicate spending capacity
8. **Destination Ratings**: Rate sample destinations to refine recommendations
9. **Photo Upload**: Share travel photos for inspiration
10. **Refine Preferences**: Final adjustments before receiving recommendations
11. **Recommendations View**: Display of personalized travel suggestions

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
