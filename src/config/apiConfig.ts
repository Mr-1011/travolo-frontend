// src/config/apiConfig.ts
const DEV_URL = import.meta.env.VITE_API_BASE_URL_DEV || 'http://localhost:3001';
const PROD_URL = import.meta.env.VITE_API_BASE_URL_PROD;
const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

let apiBaseUrl: string;

// Use production URL if APP_ENV is 'production' and PROD_URL is set
if (APP_ENV === 'production' && PROD_URL) {
  apiBaseUrl = PROD_URL;
} else {
  // Default to development URL otherwise
  apiBaseUrl = DEV_URL;
}

if (!apiBaseUrl) {
  console.error(
    'API Base URL is not defined. Check VITE_API_BASE_URL_DEV and VITE_API_BASE_URL_PROD in your .env file.',
  );
  // Provide a final fallback or throw an error if critical
  apiBaseUrl = 'http://localhost:3001'; // Fallback to dev
}

export const API_BASE_URL = apiBaseUrl;

// Optional: Log the environment and URL being used for debugging
console.log(`App Environment: ${APP_ENV}`);
console.log(`API Base URL: ${API_BASE_URL}`); 