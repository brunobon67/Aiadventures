import React, { useState } from 'react';

const firestoreRules = `rules_version = '2';
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

const configSnippet = `export const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};`;

const FirebaseSetupBanner: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md shadow-sm animate-fade-in">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.636-1.026 2.252-1.026 2.888 0l6.234 10.063c.636 1.026-.18 2.338-1.444 2.338H3.467c-1.264 0-2.08-1.312-1.444-2.338L8.257 3.099zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3 w-full">
                    <div className="text-sm text-yellow-700 flex justify-between items-center">
                        <p>
                            <span className="font-bold">Action Required:</span> User features (login, save) are disabled.
                        </p>
                        <button onClick={() => setIsExpanded(!isExpanded)} className="font-semibold underline hover:text-yellow-600 whitespace-nowrap px-2">
                            {isExpanded ? 'Hide Instructions' : 'Show Instructions'}
                        </button>
                    </div>
                    {isExpanded && (
                        <div className="mt-4 text-sm text-yellow-800 space-y-4 animate-fade-in">
                            <p>To enable these features, you must connect the app to your own Firebase project (it's free for development).</p>
                            
                            <div>
                                <p className="font-semibold">Step 1: Set up a Firebase Project</p>
                                <ol className="list-decimal list-inside mt-1 space-y-1">
                                    <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 font-bold">Firebase Console</a> and create a new project.</li>
                                    <li>Add a "Web" app to your project.</li>
                                    <li>Enable "Email/Password" authentication in the "Authentication" &gt; "Sign-in method" tab.</li>
                                    <li>Create a "Firestore Database" in "production mode".</li>
                                </ol>
                            </div>

                            <div>
                                <p className="font-semibold">Step 2: Update Your Configuration</p>
                                <p>Copy your web app's <code className="bg-yellow-100 p-1 rounded text-xs">firebaseConfig</code> object and paste it into the <code className="bg-yellow-100 p-1 rounded text-xs">src/services/geminiService.ts</code> file, replacing the placeholder values.</p>
                                <div className="mt-2 relative bg-gray-800 text-white p-4 rounded-lg font-mono text-xs">
                                    <pre className="whitespace-pre-wrap"><code>{configSnippet}</code></pre>
                                </div>
                            </div>
                            
                            <div>
                                <p className="font-semibold">Step 3: Update Firestore Security Rules</p>
                                <p>In your Firebase project, go to "Firestore Database" &gt; "Rules". Replace the default rules with the following:</p>
                                <div className="mt-2 relative bg-gray-800 text-white p-4 rounded-lg font-mono text-xs">
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(firestoreRules)}
                                        className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-500 text-white text-xs font-semibold py-1 px-2 rounded"
                                    >
                                        Copy
                                    </button>
                                    <pre className="whitespace-pre-wrap"><code>{firestoreRules}</code></pre>
                                </div>
                            </div>
                            
                            <p className="font-bold mt-4">After completing these steps, refresh the app. The save and login features will be enabled.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FirebaseSetupBanner;
