import React, { useState } from 'https://aistudiocdn.com/react@^19.1.1';
import { Itinerary, Activity } from '../types';
import { BookmarkIcon, CalendarIcon, FoodIcon, LandmarkIcon, LeafIcon, LightbulbIcon, MapPinIcon, PrintIcon, ShoppingBagIcon, SunIcon, TransitIcon, UnknownIcon } from './icons';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onSave: () => void;
}

const getActivityIcon = (type: string) => {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('food') || lowerType.includes('culinary') || lowerType.includes('dining') || lowerType.includes('restaurant')) return <FoodIcon className="h-5 w-5 text-white" />;
  if (lowerType.includes('history') || lowerType.includes('culture') || lowerType.includes('museum') || lowerType.includes('landmark')) return <LandmarkIcon className="h-5 w-5 text-white" />;
  if (lowerType.includes('outdoor') || lowerType.includes('nature') || lowerType.includes('park')) return <LeafIcon className="h-5 w-5 text-white" />;
  if (lowerType.includes('shopping')) return <ShoppingBagIcon className="h-5 w-5 text-white" />;
  return <UnknownIcon className="h-5 w-5 text-white" />;
};

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="flex space-x-4 activity-card">
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow">
        {getActivityIcon(activity.type)}
      </div>
      <div className="w-px h-full bg-gray-200"></div>
    </div>
    <div className="flex-grow pb-8 last:pb-0">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-lg text-dark">{activity.description}</h4>
        <p className="text-sm font-medium text-primary flex-shrink-0 ml-4">{activity.time}</p>
      </div>
      <div className="mt-2 text-sm text-muted space-y-1">
        <p className="flex items-start"><MapPinIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /><span>{activity.location}</span></p>
        <p className="flex items-start"><TransitIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /><span>{activity.transit}</span></p>
      </div>
    </div>
  </div>
);

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, onSave }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const handlePrint = () => {
    window.print();
  };

  if (!itinerary || !itinerary.dailyPlans || itinerary.dailyPlans.length === 0) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center">
        <h3 className="text-xl font-semibold text-dark">No Itinerary Found</h3>
        <p className="text-muted mt-2">We couldn't generate an itinerary based on your request.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-200/50 space-y-6 printable-area">
      <header className="border-b border-gray-200 pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
                <h2 className="text-3xl font-extrabold text-dark tracking-tight">Your Adventure in</h2>
                <p className="text-3xl font-bold text-primary">{itinerary.city}, {itinerary.country}</p>
            </div>
            <div className="flex items-center gap-2 no-print">
                <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-sky-600 transition-colors">
                    <BookmarkIcon className="h-4 w-4" />
                    Save Plan
                </button>
                <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-muted bg-light/50 border border-gray-200/50 rounded-lg hover:bg-gray-100 hover:text-dark transition-colors">
                    <PrintIcon className="h-4 w-4" />
                    Print
                </button>
            </div>
        </div>
      </header>
      
      <nav aria-label="Daily itinerary" className="no-print">
        <div className="flex justify-center flex-wrap gap-2 border-b border-gray-200 pb-4">
          {itinerary.dailyPlans.map((plan, index) => (
            <button
              key={plan.day}
              onClick={() => setActiveDayIndex(index)}
              role="tab"
              aria-selected={activeDayIndex === index}
              aria-controls={`day-panel-${plan.day}`}
              id={`day-tab-${plan.day}`}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeDayIndex === index
                  ? 'bg-primary text-white shadow'
                  : 'text-muted hover:bg-gray-100 hover:text-dark'
              }`}
            >
              Day {plan.day}
            </button>
          ))}
        </div>
      </nav>

      <div>
        {itinerary.dailyPlans.map((plan, index) => (
            <div 
                key={plan.day} 
                id={`day-panel-${plan.day}`} 
                role="tabpanel" 
                aria-labelledby={`day-tab-${plan.day}`}
                className={`itinerary-day-panel animate-fade-in ${activeDayIndex !== index ? 'hidden print:block' : 'block'}`}
            >
              <div className="flex items-center space-x-4 mb-6">
                 <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow">
                   <CalendarIcon className="h-6 w-6 text-white" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-dark">Day {plan.day} - <span className="font-medium text-secondary">{plan.date}</span></h3>
                   <p className="text-sm font-medium text-muted flex items-center"><SunIcon className="h-4 w-4 mr-2 text-yellow-500"/>{plan.theme}</p>
                </div>
              </div>

              <div className="relative border-l-2 border-gray-200 ml-6 pl-2">
                {plan.activities.map((activity, actIndex) => (
                  <ActivityCard key={actIndex} activity={activity} />
                ))}
              </div>
              
              {plan.alternatives && plan.alternatives.length > 0 && (
                <div className="mt-6 bg-orange-50 border-l-4 border-primary-hover p-4 rounded-r-lg alternative-card">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <LightbulbIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h5 className="text-sm font-semibold text-primary">Alternative Suggestions</h5>
                      <ul className="mt-2 list-disc list-inside text-sm text-orange-800 space-y-1">
                        {plan.alternatives.map((alt, altIndex) => (
                          <li key={altIndex}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;