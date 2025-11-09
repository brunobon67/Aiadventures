import React from 'https://aistudiocdn.com/react@^19.1.1';
import { Budget, Pace } from './types.ts';
import { ArchitectureIcon, ArtIcon, FamilyIcon, FoodIcon, HistoryIcon, LeafIcon, NightlifeIcon, RelaxationIcon, ShoppingBagIcon, TechIcon } from './components/icons.tsx';

export const INTERESTS_OPTIONS: { label: string; icon: React.FC<{className?: string}> }[] = [
  { label: 'History & Culture', icon: HistoryIcon },
  { label: 'Food & Culinary', icon: FoodIcon },
  { label: 'Art & Museums', icon: ArtIcon },
  { label: 'Outdoor & Nature', icon: LeafIcon },
  { label: 'Shopping & Fashion', icon: ShoppingBagIcon },
  { label: 'Nightlife & Entertainment', icon: NightlifeIcon },
  { label: 'Relaxation & Wellness', icon: RelaxationIcon },
  { label: 'Architecture', icon: ArchitectureIcon },
  { label: 'Family-Friendly', icon: FamilyIcon },
  { label: 'Technology & Innovation', icon: TechIcon }
];

export const PACE_OPTIONS = [
  { value: Pace.Relaxed, label: 'Relaxed', description: 'Fewer activities, more downtime.' },
  { value: Pace.Moderate, label: 'Moderate', description: 'A good mix of activities and free time.' },
  { value: Pace.Packed, label: 'Packed', description: 'See as much as possible, dawn till dusk.' },
];

export const BUDGET_OPTIONS = [
  { value: Budget.Budget, label: 'Budget', description: 'Hostels, street food, free attractions.' },
  { value: Budget.MidRange, label: 'Mid-Range', description: 'Comfortable hotels, mix of dining.' },
  { value: Budget.Luxury, label: 'Luxury', description: '5-star stays, fine dining, private tours.' },
];