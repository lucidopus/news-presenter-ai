"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NewsContainer } from '@/components/NewsContainer';
import { Button } from '@/components/ui/button'; // Assuming we can use shadcn button or standard html
import { ArrowLeft, Loader2 } from 'lucide-react';
import { PresentationData } from '@/app/page'; // We might need to move this type to a shared location

// Move this type to a shared file later, duplicating for now to avoid breakage
interface PresentationData {
  title: string;
  subtitle: string;
  points: string[];
}

interface StoredBriefing {
  category: string;
  script: string;
  sources: any[];
  presentation: PresentationData | null;
  timestamp: number;
}

export default function NewsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [data, setData] = useState<StoredBriefing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Simulate small delay for storage read/hydration
    const timer = setTimeout(() => {
        try {
            const stored = localStorage.getItem(`briefing_${id}`);
            if (stored) {
                setData(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load briefing", e);
        } finally {
            setLoading(false);
        }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-neutral-500 font-medium">Retrieving Briefing...</p>
        </div>
    );
  }

  if (!data) {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Briefing Not Found</h1>
            <p className="text-neutral-500 mb-8 max-w-md">
                We couldn't find the news briefing you were looking for. It may have expired or the link is invalid.
            </p>
            <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Return to Newsroom
            </button>
        </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-12 px-4 md:px-6">
       <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Select New Topic
            </button>
          </div>

          {/* We reuse the container but pass 'false' for global loading since data is ready */}
          <NewsContainer
            loading={false}
            error={null}
            category={data.category}
            script={data.script}
            sources={data.sources}
            presentationData={data.presentation || []}
            // No-op for generate functionality on this page
            onGenerate={() => {}} 
          />
       </div>
    </main>
  );
}
