import React, { useState } from 'https://aistudiocdn.com/react@^19.1.1';

// A simple hashing function for demonstration. 
// In a real app, use a library like bcrypt.
const simpleHash = (s: string) => {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
};


interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, passwordHash: string) => { success: boolean, message?: string };
  onRegister: (email: string, passwordHash: string) => { success: boolean, message?: string };
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }

    const passwordHash = simpleHash(password);
    let result;
    if (isLogin) {
        result = onLogin(email, passwordHash);
    } else {
        result = onRegister(email, passwordHash);
    }

    if (!result.success) {
        setError(result.message || 'An unknown error occurred.');
    }
  };

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
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-dark'}`}
            >
                Login
            </button>
            <button 
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-dark'}`}
            >
                Register
            </button>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-dark mb-2">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
        <p className="text-muted text-center mb-6">
            {isLogin ? 'Sign in to access your saved trips.' : 'Join to start saving your adventures.'}
        </p>

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
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="pt-2">
            <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary-hover transition-all transform hover:scale-105"
            >
                {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;