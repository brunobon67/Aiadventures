import React from 'react';
import { KeyIcon, LockClosedIcon } from './icons';

const ApiKeyError: React.FC = () => {
    return (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 sm:p-6 rounded-md text-left text-orange-900">
            <div className="flex">
                <div className="flex-shrink-0">
                    <KeyIcon className="h-6 w-6 text-orange-500" />
                </div>
                <div className="ml-3">
                    <h2 className="font-bold text-lg">Action Required: Set Your Gemini API Key</h2>
                    <p className="mt-2 text-sm">
                        To use this app, you first need to get a personal API key from Google AI Studio and add it to your app's secrets. It's a quick, one-time setup.
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {/* Step 1: Get API Key */}
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">1</div>
                    <div className="ml-4">
                        <h3 className="text-base font-semibold">Get Your API Key from Google AI Studio</h3>
                        <p className="text-sm mt-1">
                            Click the button below to go to Google AI Studio. You may need to sign in with your Google account. Once there, click "Create API key in new project".
                        </p>
                        <a 
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors text-sm shadow"
                        >
                            <KeyIcon className="h-4 w-4" />
                            Get Google AI API Key
                        </a>
                    </div>
                </div>

                {/* Step 2: Set API Key */}
                <div className="flex items-start">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg shadow-md">2</div>
                    <div className="ml-4">
                        <h3 className="text-base font-semibold">Add the Key to Your App's Secrets</h3>
                        <p className="text-sm mt-1">
                            Once you have your key, you need to add it to this development environment so the app can use it.
                        </p>
                        <ol className="list-decimal list-inside mt-3 space-y-2 text-sm">
                            <li>In the sidebar on the left, click the <strong>Secrets</strong> icon (<LockClosedIcon className="inline h-4 w-4" />).</li>
                            <li>Click <strong>Add new secret</strong>.</li>
                            <li>For the <strong>Name</strong>, enter exactly <code className="bg-orange-100 p-1 rounded font-mono text-xs">API_KEY</code>.</li>
                            <li>For the <strong>Value</strong>, paste the key you just copied from Google AI Studio.</li>
                            <li>Click <strong>Save</strong>, then refresh this page.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyError;
