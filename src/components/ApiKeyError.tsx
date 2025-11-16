import React from 'react';
import { firebaseConfig } from '../services/geminiService'; // Assuming project ID might be useful.

const ApiKeyError: React.FC = () => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 sm:p-6 rounded-md">
            <p className="font-bold text-lg text-yellow-900">Action Required: AI Service Connection Failed</p>
            <p className="mt-2">The app received an "Authentication Error (401)". This means the Gemini API Key is missing, invalid, or restricted. Let's fix this by checking the most common causes.</p>
            
            <p className="mt-4 font-bold">Please follow these steps carefully:</p>
            <ol className="list-decimal list-inside mt-2 space-y-5">
                <li>
                    <span className="font-semibold">Step 1: Verify your API Key in Google AI Studio</span>
                    <p className="text-xs mt-1 ml-2">Ensure your API key is active and correctly copied.</p>
                    <a 
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 ml-2 bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-sky-600 transition-colors text-sm"
                    >
                        Check my API Key
                    </a>
                </li>
                <li>
                    <span className="font-semibold">Step 2: Check the Environment Variable in Netlify</span>
                     <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-xs">
                        <li>In your Netlify site dashboard, go to <code className="bg-yellow-100 p-1 rounded">Site configuration</code> &gt; <code className="bg-yellow-100 p-1 rounded">Environment variables</code>.</li>
                        <li>Ensure there is a variable with the <strong>Key</strong> set to <code className="bg-yellow-100 p-1 rounded font-mono">API_KEY</code> (all uppercase).</li>
                        <li>Double-check that the <strong>Value</strong> you pasted matches your key from Step 1 perfectly.</li>
                    </ul>
                </li>
                <li>
                    <span className="font-semibold">Step 3: Clear Cache and Redeploy on Netlify</span>
                    <p className="text-xs mt-1 ml-2">
                        <strong>This is the most critical step.</strong> Changes to environment variables only take effect on a new deployment.
                    </p>
                    <ul className="list-disc list-inside mt-2 pl-4 space-y-1 text-xs">
                         <li>Go to the <code className="bg-yellow-100 p-1 rounded">Deploys</code> tab in your Netlify dashboard.</li>
                         <li>Click the "Trigger deploy" dropdown button.</li>
                         <li>Select <strong>"Clear cache and deploy site"</strong>. This is more effective than a standard deploy.</li>
                         <li>Wait for the new deployment to finish and go "Live".</li>
                    </ul>
                </li>
            </ol>
            <div className="mt-6 border-t border-yellow-300 pt-4">
                <p className="font-bold text-yellow-900">If it's still not working, check your Google Cloud Project:</p>
                <ul className="list-disc list-inside mt-2 space-y-3 text-sm">
                    <li>
                        <strong>Billing Account is Required:</strong> The "Generative Language API" requires a billing account to be linked to your Google Cloud project, even if your usage is within the free tier. This is the most common hidden cause of 401 errors.
                        <a href={`https://console.cloud.google.com/billing?project=${firebaseConfig.projectId || ''}`} target="_blank" rel="noopener noreferrer" className="block mt-1 underline font-semibold hover:text-yellow-900">Verify Billing Here</a>
                    </li>
                    <li>
                        <strong>API is Enabled:</strong> Make sure the "Generative Language API" is enabled.
                        <a href="https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com" target="_blank" rel="noopener noreferrer" className="block mt-1 underline font-semibold hover:text-yellow-900">Enable API Here</a>
                    </li>
                    <li>
                        <strong>No API Key Restrictions:</strong> For a server-side key used in Netlify, it is safest to have no "Application restrictions" (like HTTP referrers or IP addresses) and no "API restrictions" on the key itself.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ApiKeyError;
