"use client";

import { CategoryCard } from './CategoryCard';
import { Newspaper, TrendingUp, Cpu, HeartPulse, Film, Trophy } from 'lucide-react';

export const CATEGORIES = [
  { id: 'technology', title: 'Technology', icon: Cpu },
  { id: 'business', title: 'Business', icon: TrendingUp },
  { id: 'science', title: 'Science', icon: Newspaper },
  { id: 'health', title: 'Health', icon: HeartPulse },
  { id: 'sports', title: 'Sports', icon: Trophy },
  { id: 'entertainment', title: 'Entertainment', icon: Film },
];

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

export function CategoryGrid({ selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {CATEGORIES.map((cat) => (
        <CategoryCard
          key={cat.id}
          id={cat.id}
          title={cat.title}
          icon={cat.icon}
          isSelected={selectedCategory === cat.id}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
