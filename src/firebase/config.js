// Firebase initialization.
// Fill in your project's credentials in a .env file at the project root
// (copy .env.example to .env) — see README.md for step-by-step setup.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Fail loudly with a clear message instead of Firebase's cryptic
// "auth/invalid-api-key" when the .env file isn't being picked up.
const missing = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || value.startsWith("your-"))
  .map(([key]) => key);

if (missing.length > 0) {
  throw new Error(
    `Firebase config is missing or still using placeholder values for: ${missing.join(", ")}.\n\n` +
      `Checklist:\n` +
      `1. Does a ".env" file exist at the project root (same folder as package.json)?\n` +
      `2. Did you fully restart "npm run dev" after creating/editing .env?\n` +
      `3. Do the variable names start with "VITE_" exactly as in .env.example?\n` +
      `4. Are the values free of quotes and extra spaces?\n\n` +
      `See README.md section 2 for the full setup steps.`
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
