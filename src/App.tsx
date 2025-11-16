import React, { useState, useEffect, useRef } from 'react';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import EventsDisplay from './components/EventsDisplay';
import FirebaseSetupBanner from './components/FirebaseSetupBanner';
import { Itinerary, ItineraryRequest, User, FoundEvents } from './types';
import { generateItinerary, findLocalEvents, auth, db, isFirebaseConfigured, firebaseConfig } from './services/geminiService';
import { LoginIcon, LogoutIcon, PaperAirplaneIcon, BookmarkIcon, GithubIcon } from './components/icons';
import AuthModal from './components/AuthModal';
import SavedTripsModal from './components/SavedTripsModal';
import { GITHUB_REPO_URL } from './constants';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

type AuthMode = 'login' | 'register';
type TripWithTimestamp = Itinerary & { createdAt?: Timestamp };

const LandingContent: React.FC<{ onPlanClick: () => void }> = ({ onPlanClick }) => (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center pt-16 pb-24">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black text-dark tracking-tighter leading-tight">
            Your Next Adventure Starts Here!
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
            Dream up your destination. We'll craft the perfect journey, from weekend getaways to epic expeditions.
        </p>
        <button
            onClick={onPlanClick}
            className="mt-10 bg-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-primary-hover transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 text-lg"
        >
            Start Planning
        </button>
    </div>
);


const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [foundEvents, setFoundEvents] = useState<FoundEvents | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultView, setResultView] = useState<'itinerary' | 'events' | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isSavedTripsModalOpen, setSavedTripsModalOpen] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && firebaseUser.email && db) {
        const user: User = { email: firebaseUser.email, uid: firebaseUser.uid };
        setCurrentUser(user);
        
        try {
            const tripsRef = collection(db, "trips");
            const q = query(tripsRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            
            const trips = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Itinerary[];
            setSavedTrips(trips);
        } catch (err: any) {
            console.error("Failed to fetch user trips:", err);
            // Improved error handling for missing Firestore index
            if (err.code === 'failed-precondition' && err.message.includes('index')) {
                 const queryParts = err.message.match(/you can create it here: (https?:\/\/[^\s]+)/);
                 const indexCreationLink = queryParts ? queryParts[1] : `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/indexes`;

                setError(`firestore-index-required:${indexCreationLink}`);
            } else {
                setError("Failed to load your saved trips. Please try again later.");
            }
        }

      } else {
        setCurrentUser(null);
        setSavedTrips([]);
      }
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (isLoading || error) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [isLoading, error]);

  const handleFormSubmit = async (request: ItineraryRequest) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setFoundEvents(null);
    setResultView(null);
    try {
      const result = await generateItinerary(request);
      setItinerary(result);
      setResultView('itinerary');
    } catch (err: any) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary. Please try again.');
      setResultView(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindEvents = async (request: ItineraryRequest) => {
    if (!isFirebaseConfigured || !currentUser) {
        handleAuthRequest('login');
        return;
    }
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setFoundEvents(null);
    setResultView(null);
    try {
        const result = await findLocalEvents(request);
        setFoundEvents(result);
        setResultView('events');
    } catch (err: any) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to find events. Please try again.');
        setResultView(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setItinerary(null);
    setFoundEvents(null);
    setError(null);
    setResultView(null);
    setIsLoading(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleRegister = async (email: string, password: string): Promise<{ success: boolean, message?: string }> => {
    if (!auth) return { success: false, message: "Firebase not configured." };
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAuthModalOpen(false);
      return { success: true };
    } catch (error: any) {
       return { success: false, message: error.message.replace('Firebase: ', '') };
    }
  };

  const handleLogin = async (email: string, password: string): Promise<{ success: boolean, message?: string }> => {
    if (!auth) return { success: false, message: "Firebase not configured." };
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthModalOpen(false);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message.replace('Firebase: ', '') };
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
        await signOut(auth);
        handleReset(); // Also reset view
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };

  const handleSavePlan = async () => {
    if (!isFirebaseConfigured) return;
    if (!currentUser) {
      handleAuthRequest('login');
      return;
    }
    if (!itinerary || itinerary.id || !db) {
      return;
    }

    setError(null);
    try {
      const savedAt = serverTimestamp();
      const dataToSave = {
        city: itinerary.city,
        country: itinerary.country || '',
        dailyPlans: itinerary.dailyPlans,
        userId: currentUser.uid,
        createdAt: savedAt,
      };

      const docRef = await addDoc(collection(db, "trips"), dataToSave);

      const newSavedTrip: Itinerary = {
        ...itinerary,
        id: docRef.id,
        country: dataToSave.country,
      };

      setItinerary(newSavedTrip);
      
      const newTripWithTimestamp: TripWithTimestamp = {
          ...newSavedTrip,
          createdAt: { toDate: () => new Date() } as Timestamp // Mock timestamp for immediate sorting
      };
      
      setSavedTrips(prevTrips => [newTripWithTimestamp, ...prevTrips].sort((a,b) => (b.createdAt?.toDate().getTime() || 0) - (a.createdAt?.toDate().getTime() || 0)));

    } catch (e: any) {
      console.error("Error adding document: ", e);
       if (e.code === 'permission-denied' || (e.message && e.message.toLowerCase().includes('permission'))) {
          setError("firestore-permission-denied");
      } else {
          setError("Failed to save itinerary. Please check your connection and try again.");
      }
    }
  };
  
  const handleSelectTrip = (trip: Itinerary) => {
    setItinerary(trip);
    setError(null);
    setFoundEvents(null);
    setResultView('itinerary');
    setIsLoading(false);
    setSavedTripsModalOpen(false);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  
  const handleAuthRequest = (mode: AuthMode) => {
    if (!isFirebaseConfigured) return;
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleMyTripsClick = () => {
      if (!isFirebaseConfigured) return;
      if (currentUser) {
          setSavedTripsModalOpen(true);
      } else {
          handleAuthRequest('login');
      }
  };

  const handlePlanClick = () => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const firestoreRulesForDisplay = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{tripId} {
      // Users can only create trips for themselves.
      allow create: if request.auth.uid == request.resource.data.userId;

      // Users can only read, update, or delete their own trips.
      allow read, update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}`;

  return (
    <>
    {isAuthModalOpen && (
      <AuthModal
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        projectId={isFirebaseConfigured ? firebaseConfig.projectId : ''}
      />
    )}
    {isSavedTripsModalOpen && (
        <SavedTripsModal
            trips={savedTrips}
            onClose={() => setSavedTripsModalOpen(false)}
            onSelectTrip={handleSelectTrip}
        />
    )}

    <div className="min-h-screen font-sans text-dark flex flex-col">
      <header className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center space-x-3">
                <PaperAirplaneIcon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-dark tracking-tight">
                    Adventure AI
                </h1>
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-base font-semibold text-muted hover:text-primary transition-colors">Pricing</a>
                <a href="#" className="text-base font-semibold text-muted hover:text-primary transition-colors">More</a>
            </nav>

            <div className="flex items-center gap-2">
                <a 
                    href={GITHUB_REPO_URL}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted hover:text-dark transition-colors p-2"
                    aria-label="View source on GitHub"
                    title="View source on GitHub"
                >
                    <GithubIcon className="h-6 w-6" />
                </a>
                {currentUser && isFirebaseConfigured ? (
                    <>
                        <button onClick={handleMyTripsClick} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-sky-600 transition-colors">
                            <BookmarkIcon className="h-4 w-4" />
                            My Trips
                        </button>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted bg-light/50 border border-gray-200/50 rounded-lg hover:bg-gray-100 hover:text-dark transition-colors">
                            <LogoutIcon className="h-4 w-4" />
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleAuthRequest('login')} disabled={!isFirebaseConfigured} className="px-4 py-2 text-sm font-semibold text-muted hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Login
                        </button>
                        <button onClick={() => handleAuthRequest('register')} disabled={!isFirebaseConfigured} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                           Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col items-center">
        <div className="w-full max-w-4xl">
            <LandingContent onPlanClick={handlePlanClick} />
            <div ref={formRef} className="scroll-mt-24">
                {!isFirebaseConfigured && <FirebaseSetupBanner />}
                <ItineraryForm 
                    onSubmit={handleFormSubmit} 
                    onFindEvents={handleFindEvents} 
                    isLoading={isLoading}
                    isFirebaseConfigured={isFirebaseConfigured}
                />
            </div>

            <div ref={resultsRef} className="mt-12 min-h-[100px]">
              {isLoading && <LoadingSpinner />}
              {!isLoading && error && (
                 <div className="animate-fade-in" role="alert">
                    {error.startsWith('firestore-index-required:') ? (
                         <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 sm:p-6 rounded-md">
                            <p className="font-bold text-lg text-yellow-900">Action Required: Create Firestore Index</p>
                            <p className="mt-2">Your saved trips couldn't be loaded because a required database index is missing. This is needed to sort your trips by creation date efficiently.</p>
                            <p className="mt-3 font-medium">Please click the button below to create the index in your Firebase project:</p>
                             <a 
                                href={error.split(':')[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-sky-600 transition-colors"
                            >
                                Create Database Index
                            </a>
                            <p className="mt-4 text-sm">After clicking, the index will start building (it may take a few minutes). Once it's "Enabled", refresh this page.</p>
                        </div>
                    ) : error === 'firestore-permission-denied' ? (
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 sm:p-6 rounded-md">
                            <p className="font-bold text-lg text-yellow-900">Action Required: Update Firestore Security Rules</p>
                            <p className="mt-2">Your trip could not be saved due to a "Permission Denied" error. This is usually caused by incorrect Firestore Security Rules in your Firebase project.</p>
                            <p className="mt-3 font-medium">Please follow these steps to fix it:</p>
                            <ol className="list-decimal list-inside mt-2 space-y-4">
                                <li>
                                    <span className="font-semibold">Open your Firestore Rules Editor in a new tab:</span>
                                    <br/>
                                    <a 
                                        href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/rules`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-sky-600 transition-colors text-sm"
                                    >
                                        Open Firebase Rules
                                    </a>
                                </li>
                                <li>
                                    <span className="font-semibold">Copy the rules below</span> and paste them into the editor, replacing all existing text.
                                    <div className="mt-2 relative bg-gray-800 text-white p-4 rounded-lg font-mono text-xs">
                                        <button 
                                            onClick={() => navigator.clipboard.writeText(firestoreRulesForDisplay)}
                                            className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white text-xs font-semibold py-1 px-2 rounded"
                                        >
                                            Copy
                                        </button>
                                        <pre className="whitespace-pre-wrap"><code>{firestoreRulesForDisplay}</code></pre>
                                    </div>
                                </li>
                                <li>Click the <strong>Publish</strong> button. It may take a minute for the changes to apply.</li>
                            </ol>
                             <div className="mt-6 border-t border-yellow-300 pt-4">
                                <p className="font-bold text-yellow-900">Troubleshooting</p>
                                <p className="mt-2">If you still see the error after publishing the rules, please double-check:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li><strong>Correct Project ID:</strong> Make sure the `projectId` in `src/services/geminiService.ts` ("{firebaseConfig.projectId}") matches the one in your Firebase console URL.</li>
                                    <li><strong>Authentication Enabled:</strong> Ensure "Email/Password" is enabled in Firebase Authentication &gt; "Sign-in method" tab.</li>
                                    <li><strong>Wait a minute:</strong> Sometimes rules take a moment to become active. Give it 60 seconds and try saving again.</li>
                                </ul>
                            </div>
                        </div>
                    ) : (error.includes('API_KEY') || error.includes('Authentication Error')) ? (
                         <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 sm:p-6 rounded-md">
                            <p className="font-bold text-lg text-yellow-900">Action Required: Configure Gemini API Key</p>
                            <p className="mt-2">The app couldn't connect to the AI service. This is likely because the Gemini API Key is missing or invalid in your Netlify project settings.</p>
                            <p className="mt-3 font-medium">Please follow these steps to fix it:</p>
                            <ol className="list-decimal list-inside mt-2 space-y-4">
                                <li>
                                    <span className="font-semibold">Get your Gemini API Key:</span>
                                    <br/>
                                    <a 
                                        href="https://aistudio.google.com/app/apikey"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-2 bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-sky-600 transition-colors text-sm"
                                    >
                                        Create API Key in Google AI Studio
                                    </a>
                                </li>
                                <li>
                                    <span className="font-semibold">Add the key to your Netlify project:</span>
                                    <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-xs">
                                        <li>Go to your Netlify site dashboard.</li>
                                        <li>Navigate to <code className="bg-yellow-100 p-1 rounded">Site configuration</code> &gt; <code className="bg-yellow-100 p-1 rounded">Environment variables</code>.</li>
                                        <li>Click <code className="bg-yellow-100 p-1 rounded">Add a variable</code>.</li>
                                        <li>Set the <strong>Key</strong> to exactly <code className="bg-yellow-100 p-1 rounded font-mono">API_KEY</code>.</li>
                                        <li>Paste your key into the <strong>Value</strong> field.</li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-semibold">Redeploy your site:</span>
                                    <p className="text-xs mt-1">Navigate to the <code className="bg-yellow-100 p-1 rounded">Deploys</code> tab in Netlify and trigger a new deploy of your main branch. This is required for the new environment variable to be applied.</p>
                                </li>
                            </ol>
                        </div>
                    ) : (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                            <p className="font-bold">An Error Occurred</p>
                            <p>{error}</p>
                        </div>
                    )}
                     <div className="text-center mt-6">
                        <button onClick={handleReset} className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-hover transition-transform hover:scale-105">
                            Try Again
                        </button>
                    </div>
                </div>
              )}
              {!isLoading && !error && resultView === 'itinerary' && itinerary && (
                <ItineraryDisplay 
                    itinerary={itinerary} 
                    onSave={handleSavePlan}
                    onReset={handleReset}
                    isFirebaseConfigured={isFirebaseConfigured} 
                />
              )}
               {!isLoading && !error && resultView === 'events' && foundEvents && (
                <EventsDisplay 
                    foundEvents={foundEvents} 
                    onReset={handleReset} 
                />
              )}
            </div>
        </div>
      </main>

       <footer className="text-center py-6 mt-12 bg-light/30 border-t border-gray-200/50">
            <p className="text-muted text-sm">&copy; {new Date().getFullYear()} Adventure AI. All rights reserved.</p>
        </footer>
    </div>
    </>
  );
};

export default App;
