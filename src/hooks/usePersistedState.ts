import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuestionStep } from '@/types';

// Step mapping between names and numbers
const stepNameToIndex: Record<QuestionStep, number> = {
  'travel-themes': 1,
  'preferred-weather': 2,
  'travel-months': 3,
  'travel-duration': 4,
  'preferred-region': 5,
  'travel-budget': 6,
  'rate-destinations': 7,
  'upload-photo': 8,
  'refine-preferences': 9
};

// Reverse mapping
const stepIndexToName: Record<number, QuestionStep> = {
  1: 'travel-themes',
  2: 'preferred-weather',
  3: 'travel-months',
  4: 'travel-duration',
  5: 'preferred-region',
  6: 'travel-budget',
  7: 'rate-destinations',
  8: 'upload-photo',
  9: 'refine-preferences'
};

// Hook for state that persists in both localStorage and URL
export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  options: {
    saveToUrl?: boolean;
    saveToStorage?: boolean;
  } = { saveToUrl: true, saveToStorage: true }
) {
  const navigate = useNavigate();
  const location = useLocation();

  // Load initial state
  const getInitialState = (): T => {
    // First try to get from URL params
    if (options.saveToUrl) {
      const params = new URLSearchParams(location.search);
      const urlValue = params.get(key);
      if (urlValue) {
        try {
          return JSON.parse(urlValue);
        } catch (e) {
          console.warn(`Failed to parse URL param ${key}:`, e);
        }
      }
    }

    // Then try localStorage
    if (options.saveToStorage) {
      const storedValue = localStorage.getItem(`travel_app_${key}`);
      if (storedValue) {
        try {
          return JSON.parse(storedValue);
        } catch (e) {
          console.warn(`Failed to parse stored value for ${key}:`, e);
        }
      }
    }

    // Fall back to default
    return defaultValue;
  };

  const [state, setState] = useState<T>(getInitialState);

  // Update URL and localStorage when state changes
  useEffect(() => {
    // Save to localStorage
    if (options.saveToStorage) {
      localStorage.setItem(`travel_app_${key}`, JSON.stringify(state));
    }

    // Update URL
    if (options.saveToUrl) {
      const params = new URLSearchParams(location.search);

      // For simple values, store directly. For complex objects, handle more carefully
      // to keep URLs reasonably sized
      if (
        typeof state === 'string' ||
        typeof state === 'number' ||
        typeof state === 'boolean'
      ) {
        params.set(key, JSON.stringify(state));
      } else {
        // For objects/arrays, we might want to be selective about what goes in URL
        // Here we're just putting everything, but you might want to customize this
        params.set(key, JSON.stringify(state));
      }

      // Update URL without triggering a navigation
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [state, key, navigate, location.pathname, options.saveToStorage, options.saveToUrl]);

  return [state, setState] as const;
}

// Hook specifically for current step - uses numbers in URL instead of step names
export function usePersistedStep(defaultStep: QuestionStep) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial step from URL or localStorage
  const getInitialStep = (): QuestionStep => {
    // First check URL for step number
    const params = new URLSearchParams(location.search);
    const stepParam = params.get('step');

    if (stepParam) {
      try {
        // Check if this is a number
        const stepNumber = parseInt(stepParam, 10);
        if (!isNaN(stepNumber) && stepIndexToName[stepNumber]) {
          return stepIndexToName[stepNumber];
        }

        // If it's a JSON string (old format), try to parse it
        const parsedStep = JSON.parse(stepParam);
        if (typeof parsedStep === 'string' && parsedStep in stepNameToIndex) {
          return parsedStep as QuestionStep;
        }
      } catch (e) {
        console.warn('Failed to parse step param:', e);
      }
    }

    // Then check localStorage
    const storedStep = localStorage.getItem('travel_app_step');
    if (storedStep) {
      try {
        const parsedStep = JSON.parse(storedStep);
        if (typeof parsedStep === 'string' && parsedStep in stepNameToIndex) {
          return parsedStep as QuestionStep;
        }
      } catch (e) {
        console.warn('Failed to parse stored step:', e);
      }
    }

    return defaultStep;
  };

  const [step, setStepInternal] = useState<QuestionStep>(getInitialStep);

  // When step changes, update URL and localStorage
  useEffect(() => {
    // Save to localStorage with the full step name
    localStorage.setItem('travel_app_step', JSON.stringify(step));

    // Update URL with just the step number
    const params = new URLSearchParams(location.search);
    params.set('step', stepNameToIndex[step].toString());

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [step, navigate, location.pathname]);

  return [step, setStepInternal] as const;
}

// Hook for preferences (might be too large for URL)
export function usePersistedPreferences<T>(defaultPreferences: T) {
  return usePersistedState('preferences', defaultPreferences, {
    saveToUrl: false, // Preferences might be too large for URL
    saveToStorage: true
  });
} 