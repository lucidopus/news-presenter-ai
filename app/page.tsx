"use client";

import { useState } from 'react';
import { CategoryGrid } from '@/components/CategoryGrid';
import { NewsContainer } from '@/components/NewsContainer';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setIsFetching(false); // Reset if changing category
  };

  interface PresentationData {
    script: string;
    sources: { title: string; url: string; source: string }[];
  }

  const [presentation, setPresentation] = useState<PresentationData | null>(null);

  const handleFetchNews = async () => {
    if (!selectedCategory) return;
    
    setIsFetching(true);
    setPresentation(null);
    
    try {
      const response = await fetch('/api/generate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPresentation(data);
      } else {
        console.error('Failed to fetch news:', data.error);
        // Handle error state gracefully in UI (could add error state later)
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="text-center space-y-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose Your Tech Topic
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Select a technology category below to have our AI agent gather and present the latest stories in an engaging, natural way.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelect={handleSelectCategory}
          />
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <NewsContainer
            category={selectedCategory}
            isFetching={isFetching}
            onFetch={handleFetchNews}
            presentation={presentation}
          />
        </motion.div>
      </div>
    </main>
  );
}
