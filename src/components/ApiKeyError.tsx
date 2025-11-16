import React from 'react';

const ApiKeyError: React.FC = () => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 sm:p-6 rounded-md text-left">
            <p className="font-bold text-lg text-yellow-900">Advanced API Authentication Diagnostics (Error 401)</p>
            <p className="mt-2">
                It looks like you've covered the basics (correct key, billing enabled), but the "Authentication Error" persists.
                This almost always points to a mismatch in your Google Cloud project settings. Let's verify that everything is connected to the <strong>same project</strong>.
            </p>
            
            <p className="mt-6 font-bold text-yellow-900">Project Consistency Checklist:</p>
            <ol className="list-decimal list-inside mt-2 space-y-6">
                 <li>
                    <span className="font-semibold">Confirm Your Project ID</span>
                    <p className="text-xs mt-1 ml-2">
                        Look at the top of your Google Cloud console. Note the project name (e.g., "Travel guide") and Project ID (e.g., <code className="bg-yellow-100 p-1 rounded font-mono">ai-travel-itinerary-8688e</code>).
                        Ensure this exact Project ID appears on every page in the following steps.
                    </p>
                </li>
                <li>
                    <span className="font-semibold">Verify Billing Account Link</span>
                    <p className="text-xs mt-1 ml-2">
                        Your billing account exists, but let's confirm it's actively linked to your project.
                    </p>
                    <a 
                        href="https://console.cloud.google.com/billing/linkedaccount"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 ml-6 bg-yellow-500 text-white font-bold py-1.5 px-3 rounded hover:bg-yellow-600 transition-colors text-sm"
                    >
                        Check Project Billing Link
                    </a>
                    <p className="text-xs mt-2 ml-2">
                        On that page, find your Project ID in the list. The "Billing account" column must show your active billing account name. If it's empty or says billing is disabled, you must link it.
                    </p>
                </li>
                 <li>
                    <span className="font-semibold">Remove API Key Restrictions</span>
                     <p className="text-xs mt-1 ml-2">
                        This is a common pitfall. For server-side requests from Netlify, the safest option is to have <strong>no restrictions</strong>.
                    </p>
                    <a 
                        href="https://console.cloud.google.com/apis/credentials"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 ml-6 bg-yellow-500 text-white font-bold py-1.5 px-3 rounded hover:bg-yellow-600 transition-colors text-sm"
                    >
                        Check API Key Restrictions
                    </a>
                    <p className="text-xs mt-2 ml-2">
                        Click your API key's name. Under "Application restrictions", select "None". Under "API restrictions", select "Don't restrict key". Click <strong>Save</strong>.
                    </p>
                </li>
                 <li>
                    <span className="font-semibold">The Final, Critical Step: Clear Cache and Redeploy</span>
                    <p className="text-xs mt-1 ml-2">
                        <strong>Any changes you make in Google Cloud will not work until you do this.</strong>
                    </p>
                    <ul className="list-disc list-inside mt-2 pl-6 space-y-1 text-xs">
                         <li>In your Netlify site dashboard, go to the <code className="bg-yellow-100 p-1 rounded">Deploys</code> tab.</li>
                         <li>Click the "Trigger deploy" dropdown button and select <strong>"Clear cache and deploy site"</strong>.</li>
                         <li>Wait for the new deployment to finish and go "Live" before trying your app again.</li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default ApiKeyError;
