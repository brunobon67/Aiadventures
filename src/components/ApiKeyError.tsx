
import React from 'react';

const ApiKeyError: React.FC = () => {
    return (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 sm:p-6 rounded-md text-left">
            <p className="font-bold text-lg text-red-900">Final Diagnostic Step: Check Server Logs</p>
            <p className="mt-2">
                You've done an excellent job verifying all the configuration settings. Since the authentication error (401) is still happening,
                it's time to look at the definitive source of truth: the server-side logs from your Netlify Function.
            </p>
            <p className="mt-2">
                The backend code has been updated to produce detailed logs. Following these steps will show you the exact error message from Google's servers.
            </p>
            
            <p className="mt-6 font-bold text-red-900">How to Inspect Your Netlify Function Logs:</p>
            <ol className="list-decimal list-inside mt-2 space-y-4">
                 <li>
                    <span className="font-semibold">Trigger the Error Again</span>
                    <p className="text-xs mt-1 ml-2">
                       Click the "Try Again" button below to run the function one more time. This ensures fresh logs are available.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Open Your Netlify Site Dashboard</span>
                    <p className="text-xs mt-1 ml-2">
                        Go to your site on <a href="https://app.netlify.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 font-bold">netlify.com</a>.
                    </p>
                </li>
                 <li>
                    <span className="font-semibold">Navigate to the Function Logs</span>
                     <p className="text-xs mt-1 ml-2">
                        From your site's dashboard, click the <code className="bg-red-100 p-1 rounded font-mono">Functions</code> tab in the top menu. Click on the function named <code className="bg-red-100 p-1 rounded font-mono">gemini</code> to see its logs.
                    </p>
                </li>
                 <li>
                    <span className="font-semibold">Analyze the Log Output</span>
                    <p className="text-xs mt-1 ml-2">
                        Look at the most recent log entry. You should see lines like:
                    </p>
                    <div className="mt-2 ml-6 p-3 rounded-lg bg-red-100 font-mono text-xs text-red-900">
                        <p>INFO Netlify function 'gemini' invoked.</p>
                        <p className="font-bold">INFO API_KEY loaded successfully. Key ending in: ...[4 chars]</p>
                        <p>INFO Executing action: 'generateItinerary'...</p>
                        <p className="font-bold text-red-700">ERROR --- GEMINI API ERROR ---</p>
                        <p className="font-bold text-red-700">ERROR Message: [The exact error from Google will be here]</p>
                        {/* FIX: The `{...}` syntax for object spreading is not valid as a JSX child. It should be rendered as a string `"{...}"`. */}
                        <p className="font-bold text-red-700">ERROR Full Error Object: {'{...}'}</p>
                    </div>
                </li>
                 <li>
                    <span className="font-semibold">Find the Root Cause</span>
                     <p className="text-xs mt-1 ml-2">
                        The <code className="bg-red-100 p-1 rounded font-mono">Message</code> in the error log is the key. It will likely give a more specific reason than just "API key not valid", such as "API key expired", "Project has been deleted", or "Generative Language API has not been used in project...". This message will tell you exactly what needs to be fixed in your Google Cloud project.
                    </p>
                </li>
            </ol>
        </div>
    );
};

export default ApiKeyError;
