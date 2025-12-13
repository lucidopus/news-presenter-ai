"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryGrid } from '@/components/CategoryGrid';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setError(null);
  };

  const handleFetchNews = async () => {
    if (!selectedCategory) return;
    
    setIsFetching(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success: Generate ID, Save to LocalStorage, Redirect
        const briefingId = crypto.randomUUID();
        const briefingData = {
            category: selectedCategory,
            script: data.script,
            sources: data.sources,
            presentation: data.presentation || null,
            timestamp: Date.now()
        };
        
        localStorage.setItem(`briefing_${briefingId}`, JSON.stringify(briefingData));
        router.push(`/news/${briefingId}`);

      } else {
        console.error('Failed to fetch news:', data.error);
        setError("Failed to generate mission briefing. Please try again.");
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError("Connection error. Please check your network.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="text-center space-y-6 mb-16"
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
            Briefly AI
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Select a topic to generate a personalized AI video briefing.
          </motion.p>
        </motion.div>

        <motion.div
            className="flex flex-col items-center gap-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
        >
            <CategoryGrid
                selectedCategory={selectedCategory}
                onSelect={handleSelectCategory}
            />

            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={handleFetchNews}
                    disabled={!selectedCategory || isFetching}
                    className={`
                        relative overflow-hidden px-12 py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300
                        ${!selectedCategory 
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' 
                            : isFetching
                                ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                                : 'bg-primary text-primary-foreground hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg shadow-primary/20'
                        }
                    `}
                >
                    <div className="relative z-10 flex items-center gap-2">
                        {isFetching && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isFetching ? 'Forging Briefing...' : 'Generate Briefing'}
                    </div>
                </button>
                
                {error && (
                    <p className="text-destructive font-medium animate-pulse">{error}</p>
                )}
            </div>
        </motion.div>
      </div>
    </main>
  );
}
