import React, { useState, useEffect } from 'react';
import ItineraryForm from './components/ItineraryForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { Itinerary, ItineraryRequest, User } from './types';
import { generateItinerary } from './services/geminiService';
import { LoginIcon, LogoutIcon, PaperAirplaneIcon, BookmarkIcon, UserIcon } from './components/icons';
import AuthModal from './components/AuthModal';
import SavedTripsModal from './components/SavedTripsModal';
import { v4 as uuidv4 } from 'uuid';


// A simple user store using localStorage for demonstration purposes
const userStore = {
  getUsers: (): Record<string, string> => {
    const users = localStorage.getItem('adventure_ai_users');
    return users ? JSON.parse(users) : {};
  },
  saveUser: (email: string, passwordHash: string) => {
    const users = userStore.getUsers();
    users[email] = passwordHash;
    localStorage.setItem('adventure_ai_users', JSON.stringify(users));
  },
  findUser: (email: string): string | undefined => {
    const users = userStore.getUsers();
    return users[email];
  }
};

const savedTripsStore = {
  getTrips: (email: string): Itinerary[] => {
    const trips = localStorage.getItem(`adventure_ai_trips_${email}`);
    return trips ? JSON.parse(trips) : [];
  },
  saveTrip: (email: string, itinerary: Itinerary) => {
    const trips = savedTripsStore.getTrips(email);
    // Ensure each itinerary has a unique ID
    const newTrip = { ...itinerary, id: uuidv4() };
    const updatedTrips = [newTrip, ...trips];
    localStorage.setItem(`adventure_ai_trips_${email}`, JSON.stringify(updatedTrips));
  }
}

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSavedTripsModalOpen, setSavedTripsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);


  useEffect(() => {
    // Check for a logged-in user in session storage
    const loggedInUser = sessionStorage.getItem('adventure_ai_user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setCurrentUser(user);
      setSavedTrips(savedTripsStore.getTrips(user.email));
    }
  }, []);
  
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }

  const handleFormSubmit = async (request: ItineraryRequest) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setShowForm(false);
    try {
      const result = await generateItinerary(request);
      setItinerary(result);
    } catch (err) {
      console.error(err);
      setError('Failed to generate itinerary. Please check your inputs or try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setItinerary(null);
    setError(null);
    setShowForm(true);
  }

  const handleRegister = (email: string, passwordHash: string) => {
    if (userStore.findUser(email)) {
      return { success: false, message: 'User already exists.' };
    }
    userStore.saveUser(email, passwordHash);
    handleLogin(email, passwordHash);
    return { success: true };
  };

  const handleLogin = (email: string, passwordHash: string) => {
    const storedHash = userStore.findUser(email);
    if (storedHash && storedHash === passwordHash) {
      const user = { email };
      setCurrentUser(user);
      setSavedTrips(savedTripsStore.getTrips(email));
      sessionStorage.setItem('adventure_ai_user', JSON.stringify(user));
      setAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSavedTrips([]);
    sessionStorage.removeItem('adventure_ai_user');
  };

  const handleSavePlan = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    if (itinerary) {
      savedTripsStore.saveTrip(currentUser.email, itinerary);
      setSavedTrips(savedTripsStore.getTrips(currentUser.email));
      showNotification("Itinerary saved to 'My Trips'!");
    }
  };
  
  const handleSelectTrip = (trip: Itinerary) => {
    setItinerary(trip);
    setError(null);
    setShowForm(false);
    setSavedTripsModalOpen(false);
  };

  return (
    <>
    <div className="min-h-screen font-sans text-dark flex flex-col">
      <header className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center justify-center space-x-3">
                <PaperAirplaneIcon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-dark tracking-tight">
                    Adventure AI
                </h1>
            </div>
            <div className="flex items-center gap-2">
                {currentUser ? (
                    <>
                        <button onClick={() => setSavedTripsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted bg-light/50 border border-gray-200/50 rounded-lg hover:bg-gray-100 hover:text-dark transition-colors">
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
                        <button onClick={() => setAuthModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted bg-light/50 border border-gray-200/50 rounded-lg hover:bg-gray-100 hover:text-dark transition-colors">
                            <LoginIcon className="h-4 w-4" />
                            Login / Register
                        </button>
                    </>
                )}
            </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {showForm && <ItineraryForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
          
          {isLoading && <LoadingSpinner />}
          
          {!showForm && error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md animate-fade-in text-center" role="alert">
              <p className="font-bold">Oops! Something went wrong.</p>
              <p>{error}</p>
              <button onClick={handleReset} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !showForm && itinerary && (
            <div className="animate-fade-in">
              <ItineraryDisplay itinerary={itinerary} onSave={handleSavePlan} />
              <div className="text-center mt-8">
                 <button onClick={handleReset} className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-hover transition-transform hover:scale-105">
                    Plan Another Trip
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

       <footer className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted text-sm">
            <p>&copy; {new Date().getFullYear()} Adventure AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
    
    {isAuthModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} onLogin={handleLogin} onRegister={handleRegister} />}
    {isSavedTripsModalOpen && <SavedTripsModal trips={savedTrips} onClose={() => setSavedTripsModalOpen(false)} onSelectTrip={handleSelectTrip} />}
    
    {notification && (
        <div className="fixed top-20 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in z-50">
          {notification}
        </div>
    )}
    </>
  );
};

export default App;