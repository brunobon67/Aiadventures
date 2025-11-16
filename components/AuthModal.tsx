import React, { useState } from 'https://aistudiocdn.com/react@^19.1.1';

interface AuthModalProps {
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean, message?: string }>;
  onRegister: (email: string, password: string) => Promise<{ success: boolean, message?: string }>;
  projectId?: string;
}

const CopyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
);


const AuthModal: React.FC<AuthModalProps> = ({ initialMode, onClose, onLogin, onRegister, projectId }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
        setError('Please enter both email and password.');
        setIsLoading(false);
        return;
    }

    let result;
    if (isLogin) {
        result = await onLogin(email, password);
    } else {
        result = await onRegister(email, password);
    }

    if (!result.success) {
        setError(result.message || 'An unknown error occurred.');
    }
    // Don't set loading to false on success, as the modal will close.
    // Only set it to false on error so the user can try again.
    if (!result.success) {
      setIsLoading(false);
    }
  };

  const isDomainError = error.includes('auth/requests-from-referer');
  const blockedDomainMatch = error.match(/referer-https?:\/\/([^/]+)-are-blocked/);
  const blockedDomain = blockedDomainMatch ? blockedDomainMatch[1] : null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex border-b border-gray-200 mb-6">
            <button 
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-dark'}`}
            >
                Login
            </button>
            <button 
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-dark'}`}
            >
                Register
            </button>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-dark mb-2">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
        <p className="text-muted text-center mb-6">
            {isLogin ? 'Sign in to access your saved trips.' : 'Join to start saving your adventures.'}
        </p>

        {error && isDomainError && blockedDomain && projectId && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md text-sm space-y-3 mb-4">
                <p className="font-bold text-base text-red-900">Configuration Error: Unauthorized Domain</p>
                <p>Your app is running on a domain that hasn't been authorized. To fix this, you must add the domain to the allowed list in Firebase.</p>
                <ol className="list-decimal list-inside space-y-3">
                    <li>
                        <span className="font-semibold">Copy this domain:</span>
                        <div className="mt-1 flex items-center bg-red-100 p-2 rounded">
                            <code className="text-xs font-mono break-all">{blockedDomain}</code>
                            <button type="button" onClick={() => navigator.clipboard.writeText(blockedDomain)} className="ml-auto flex-shrink-0 text-red-600 hover:text-red-800 p-1" title="Copy domain">
                                <CopyIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </li>
                    <li>
                        <span className="font-semibold">Go to your Firebase Authentication settings:</span>
                        <a 
                            href={`https://console.firebase.google.com/project/${projectId}/authentication/settings`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1 bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition-colors text-xs"
                        >
                            Open Firebase Settings
                        </a>
                    </li>
                    <li>In the "Authorized domains" section, click "Add domain", paste the domain you copied, and click "Add".</li>
                </ol>
                <p className="font-semibold mt-2">Important: It may take a few minutes for this change to take effect. Please wait 2-3 minutes after adding the domain, then refresh this page and try again.</p>
            </div>
        )}

        {error && !isDomainError && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email-auth" className="block text-sm font-medium text-muted mb-2">Email Address</label>
            <input 
              type="email" 
              id="email-auth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password-auth" className="block text-sm font-medium text-muted mb-2">Password</label>
            <input 
              type="password" 
              id="password-auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          <div className="pt-2">
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary-hover transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                   isLogin ? 'Login' : 'Create Account'
                )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;