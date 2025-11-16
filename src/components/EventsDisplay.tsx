import React from 'react';
import { Event, EventSource } from '../types';
import { SparklesIcon, CalendarIcon, MapPinIcon, LinkIcon } from './icons';

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <div className="bg-light/50 p-4 rounded-lg border border-gray-200/50 shadow-sm transition-shadow hover:shadow-md">
        <h3 className="font-bold text-lg text-secondary">{event.name}</h3>
        <div className="text-sm text-muted mt-2 space-y-1">
            <p className="flex items-start"><CalendarIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /><span>{event.date}</span></p>
            <p className="flex items-start"><MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /><span>{event.location}</span></p>
        </div>
        <p className="text-sm text-dark mt-3">{event.description}</p>
    </div>
);


interface EventsDisplayProps {
  foundEvents: { events: Event[], sources: EventSource[], city: string };
  onReset: () => void;
}

const EventsDisplay: React.FC<EventsDisplayProps> = ({ foundEvents, onReset }) => {
    const { events, sources, city } = foundEvents;
    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/50 space-y-6 animate-fade-in">
            <header className="border-b border-gray-200 pb-4 text-center">
                <SparklesIcon className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h2 className="text-3xl font-extrabold text-dark tracking-tight">Local Events in</h2>
                <p className="text-3xl font-bold text-secondary">{city}</p>
            </header>

            {events.length > 0 ? (
                <div className="space-y-4">
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-muted font-semibold">No specific events found for your dates and interests.</p>
                    <p className="text-sm text-gray-400 mt-2">Try broadening your interests or checking different dates!</p>
                </div>
            )}
            
            {sources && sources.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-muted mb-2">Sources from the web:</h4>
                     <ul className="text-sm space-y-1">
                        {sources.map((source, index) => (
                           <li key={index}>
                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline flex items-center gap-1.5 break-all">
                                    <LinkIcon className="h-4 w-4 flex-shrink-0" />
                                    <span>{source.title || source.uri}</span>
                                </a>
                           </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="text-center pt-4 border-t border-gray-200">
                <button onClick={onReset} className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-hover transition-transform hover:scale-105">
                    Plan Another Trip
                </button>
            </div>
        </div>
    );
};

export default EventsDisplay;
