export enum Pace {
  Relaxed = 'Relaxed',
  Moderate = 'Moderate',
  Packed = 'Packed',
}

export enum Budget {
  Budget = 'Budget-Friendly',
  MidRange = 'Mid-Range',
  Luxury = 'Luxury',
}

export interface ItineraryRequest {
  city: string;
  startDate: string;
  endDate: string;
  interests: string[];
  pace: Pace;
  budget: Budget;
}

export interface Activity {
  time: string;
  description: string;
  location: string;
  transit: string;
  type: string;
}

export interface DailyPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
  alternatives: string[];
}

export interface Itinerary {
  id?: string;
  city: string;
  country: string;
  dailyPlans: DailyPlan[];
}

export interface User {
    email: string;
    uid: string;
}

export interface Event {
  name: string;
  date: string;
  location: string;
  description: string;
}

export interface EventSource {
  uri: string;
  title: string;
}

export interface FoundEvents {
  events: Event[];
  sources: EventSource[];
  city: string;
}