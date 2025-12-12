"use client";

import { useState } from 'react';
import { CategoryGrid } from '@/components/CategoryGrid';
import { NewsContainer } from '@/components/NewsContainer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setIsFetching(false); // Reset if changing category
  };

  const handleFetchNews = () => {
    setIsFetching(true);
    // Mock simulation of API call
    setTimeout(() => {
        setIsFetching(false);
        // eventually sets a "success" state, but for now just stops loading
    }, 3000);
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center p-6 md:p-12 bg-background text-foreground">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent pb-2">
            Choose Your Topic
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a category below to have our AI agent gather and present the latest stories.
          </p>
        </div>

        <CategoryGrid 
            selectedCategory={selectedCategory} 
            onSelect={handleSelectCategory} 
        />

        <div className="w-full mt-4">
            <NewsContainer 
                category={selectedCategory}
                isFetching={isFetching}
                onFetch={handleFetchNews}
            />
        </div>
      </div>
    </main>
  );
}
