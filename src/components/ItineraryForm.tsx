import React, { useState } from 'react';
import { ItineraryRequest, Pace, Budget } from '../types';
import { INTERESTS_OPTIONS, PACE_OPTIONS, BUDGET_OPTIONS } from '../constants';
import { CalendarIcon, MapPinIcon, PriceTagIcon, RocketLaunchIcon, RunningIcon, SparklesIcon, LockClosedIcon } from './icons';

interface ItineraryFormProps {
  onSubmit: (request: ItineraryRequest) => void;
  onFindEvents: (request: ItineraryRequest) => void;
  isLoading: boolean;
  isFirebaseConfigured: boolean;
}

const FormSection: React.FC<{ title: string, step: string, children: React.ReactNode }> = ({ title, step, children }) => (
    <div className="bg-light/50 p-6 rounded-2xl border border-gray-200/50 mb-6 animate-slide-in-up last:mb-0 shadow-sm">
        <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">{step}</div>
            <h3 className="ml-4 text-xl font-bold text-dark">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);


const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit, onFindEvents, isLoading, isFirebaseConfigured }) => {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [pace, setPace] = useState<Pace>(Pace.Moderate);
  const [budget, setBudget] = useState<Budget>(Budget.MidRange);
  const [error, setError] = useState('');

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const validateAndGetData = (): ItineraryRequest | null => {
    setError('');
    if (!city || !startDate || !endDate || interests.length === 0) {
      setError('Please fill out all fields and select at least one interest.');
      return null;
    }
    if (new Date(startDate) > new Date(endDate)) {
        setError('End date must be after the start date.');
        return null;
    }
    return { city, startDate, endDate, interests, pace, budget };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = validateAndGetData();
    if (requestData) {
      onSubmit(requestData);
    }
  };

  const handleFindEventsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const requestData = validateAndGetData();
    if (requestData) {
        onFindEvents(requestData);
    }
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/50 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-dark">Let's plan your next adventure!</h2>
        <p className="text-muted mt-1">Tell us your preferences and we'll create a magical trip for you.</p>
      </div>
      
      <FormSection title="Where & When?" step="1">
         <div>
            <label htmlFor="city" className="block text-sm font-medium text-muted mb-2">Destination</label>
            <div className="relative">
                <MapPinIcon className="h-5 w-5 text-muted absolute top-1/2 left-3 -translate-y-1/2" />
                <input type="text" id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g., Tokyo, Japan" required className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary" />
            </div>
         </div>
         <div>
            <label className="block text-sm font-medium text-muted mb-2">Dates</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                    <CalendarIcon className="h-5 w-5 text-muted absolute top-1/2 left-3 -translate-y-1/2"/>
                    <input type="date" aria-label="Start Date" id="start-date" value={startDate} min={today} onChange={e => setStartDate(e.target.value)} required className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary" />
                </div>
                <div className="relative">
                    <CalendarIcon className="h-5 w-5 text-muted absolute top-1/2 left-3 -translate-y-1/2"/>
                    <input type="date" aria-label="End Date" id="end-date" value={endDate} min={startDate || today} onChange={e => setEndDate(e.target.value)} required className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary" />
                </div>
            </div>
        </div>
      </FormSection>

      <FormSection title="What's your vibe?" step="2">
         <div>
            <label className="block text-sm font-medium text-muted mb-3">Select your interests:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {INTERESTS_OPTIONS.map(({label, icon: Icon}) => (
                <button
                type="button"
                key={label}
                onClick={() => toggleInterest(label)}
                className={`flex flex-col items-center justify-center text-center p-3 border rounded-lg transition-all transform hover:-translate-y-1 ${interests.includes(label) ? 'bg-primary/10 border-primary text-primary shadow-md' : 'bg-light/50 hover:bg-gray-100 border-gray-200 text-muted'}`}
                >
                <Icon className="h-6 w-6 mb-1.5" />
                <span className="text-xs font-semibold">{label}</span>
                </button>
            ))}
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-muted mb-3 flex items-center"><RunningIcon className="h-4 w-4 mr-2"/>Pace</label>
              <div className="flex flex-col space-y-2">
                {PACE_OPTIONS.map(option => (
                  <button type="button" key={option.value} onClick={() => setPace(option.value)} className={`text-left p-3 border rounded-lg transition-all ${pace === option.value ? 'bg-primary/10 border-primary text-primary shadow' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-xs">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
             <div>
              <label className="block text-sm font-medium text-muted mb-3 flex items-center"><PriceTagIcon className="h-4 w-4 mr-2"/>Budget</label>
              <div className="flex flex-col space-y-2">
                {BUDGET_OPTIONS.map(option => (
                  <button type="button" key={option.value} onClick={() => setBudget(option.value)} className={`text-left p-3 border rounded-lg transition-all ${budget === option.value ? 'bg-primary/10 border-primary text-primary shadow' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>
                    <p className="font-semibold">{option.label}</p>
                    <p className="text-xs">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
         </div>
      </FormSection>
      
      <div className="pt-4 space-y-3">
        {error && <p className="text-red-500 text-sm text-center pb-2">{error}</p>}

        <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center bg-primary text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:bg-primary-hover transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
        >
            <RocketLaunchIcon className="h-6 w-6 mr-2" />
            Create My Adventure!
        </button>

        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-muted uppercase">Premium</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
            type="button"
            onClick={handleFindEventsClick}
            disabled={isLoading || !isFirebaseConfigured}
            className="w-full flex justify-center items-center bg-secondary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-sky-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
            title={!isFirebaseConfigured ? "Please configure Firebase to use this feature" : "Login to find local events for your trip"}
        >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Find Local Events
            {!isFirebaseConfigured && <LockClosedIcon className="h-4 w-4 ml-2" />}
        </button>
      </div>
    </form>
  );
};

export default ItineraryForm;
