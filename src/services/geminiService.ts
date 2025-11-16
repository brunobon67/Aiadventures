import { Itinerary, ItineraryRequest, FoundEvents } from '../types';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Firebase Initialization ---
// The configuration below is for the CLIENT-SIDE Firebase SDK. It is meant to be public.
// Your database is protected by the Firestore Security Rules you set up, not by hiding these keys.
export const firebaseConfig = {
  apiKey: "AIzaSyDugWy1ZE7Nf_oDTWljAK04BpM8zyu1d34",
  authDomain: "ai-travel-itinerary-8688e.firebaseapp.com",
  projectId: "ai-travel-itinerary-8688e",
  storageBucket: "ai-travel-itinerary-8688e.firebasestorage.app",
  messagingSenderId: "545364703811",
  appId: "1:545364703811:web:60e1afcdeb4b2d073f72f6",
  measurementId: "G-HRLR0S9MRK"
};

// Check if the user has replaced the placeholder configuration
export const isFirebaseConfigured = firebaseConfig.apiKey !== "REPLACE_WITH_YOUR_API_KEY" && firebaseConfig.projectId !== "REPLACE_WITH_YOUR_PROJECT_ID" && firebaseConfig.apiKey !== "AIzaSyFAKE-KEY-FOR-UI-TESTING-ONLY";

// Initialize Firebase only if it has been configured
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
// --- End Firebase Initialization ---


// The Gemini API calls have been moved to a secure serverless function.
// The frontend will now call this function instead of the Gemini API directly.

const callApiFunction = async (action: string, request: ItineraryRequest) => {
  const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, request }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: 'An unknown error occurred.' }));
    throw new Error(errorBody.error || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export const generateItinerary = async (request: ItineraryRequest): Promise<Itinerary> => {
  try {
    const itineraryData: Itinerary = await callApiFunction('generateItinerary', request);
    
    // Simple validation
    if (!itineraryData.city || !itineraryData.dailyPlans || itineraryData.dailyPlans.length === 0) {
      throw new Error("Generated itinerary is missing required fields.");
    }
    return itineraryData;
  } catch (error: any) {
    console.error("Error calling generate itinerary function:", error);
    throw new Error(`The AI failed to generate a valid itinerary. ${error.message}`);
  }
};

export const findLocalEvents = async (request: ItineraryRequest): Promise<FoundEvents> => {
    try {
        const result: FoundEvents = await callApiFunction('findLocalEvents', request);

        if (!Array.isArray(result.events)) {
             throw new Error("Generated events data is not in the expected format (array).");
        }

        return { ...result, city: request.city };
    } catch (error: any) {
        console.error("Error calling find local events function:", error);
        throw new Error(`The AI failed to find local events. ${error.message}`);
    }
};
