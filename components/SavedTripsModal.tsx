import React from 'https://aistudiocdn.com/react@^19.1.1';
import { Itinerary } from '../types.ts';
import { MapPinIcon, CalendarIcon } from './icons.tsx';

interface SavedTripsModalProps {
  trips: Itinerary[];
  onClose: () => void;
  onSelectTrip: (trip: Itinerary) => void;
}

const SavedTripsModal: React.FC<SavedTripsModalProps> = ({ trips, onClose, onSelectTrip }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl m-4"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-dark">My Saved Trips</h2>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
                {trips.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-muted">You haven't saved any trips yet.</p>
                        <p className="text-sm text-gray-400 mt-2">Plan a new trip and save it to see it here!</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {trips.map((trip) => (
                            <li key={trip.id}>
                                <button 
                                    onClick={() => onSelectTrip(trip)}
                                    className="w-full text-left bg-light/50 p-4 rounded-lg border border-gray-200/50 hover:shadow-md hover:border-primary transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <h3 className="font-bold text-lg text-primary">{trip.city}, {trip.country}</h3>
                                    <div className="text-sm text-muted mt-2 space-y-1">
                                        <p className="flex items-center"><CalendarIcon className="h-4 w-4 mr-2" />
                                            <span>{trip.dailyPlans[0]?.date} - {trip.dailyPlans[trip.dailyPlans.length - 1]?.date}</span>
                                        </p>
                                        <p className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2" />
                                            <span>{trip.dailyPlans.length} {trip.dailyPlans.length > 1 ? 'days' : 'day'} of activities</span>
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
             <div className="p-4 bg-gray-50 text-right rounded-b-2xl">
                <button 
                    onClick={onClose}
                    className="bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-primary-hover transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
  );
};

export default SavedTripsModal;