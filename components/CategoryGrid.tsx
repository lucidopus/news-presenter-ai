"use client";

import { CategoryCard } from './CategoryCard';
import { Cpu, Code, Monitor, Shield, Coins, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const CATEGORIES = [
  { id: 'ai', title: 'Artificial Intelligence', icon: Cpu },
  { id: 'software', title: 'Software Development', icon: Code },
  { id: 'hardware', title: 'Hardware & Gadgets', icon: Monitor },
  { id: 'cybersecurity', title: 'Cybersecurity', icon: Shield },
  { id: 'blockchain', title: 'Blockchain & Crypto', icon: Coins },
  { id: 'internet', title: 'Internet & Web', icon: Globe },
 ];

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelect: (id: string) => void;
}

export function CategoryGrid({ selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
    >
      {CATEGORIES.map((cat, index) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <CategoryCard
            id={cat.id}
            title={cat.title}
            icon={cat.icon}
            isSelected={selectedCategory === cat.id}
            onClick={onSelect}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
