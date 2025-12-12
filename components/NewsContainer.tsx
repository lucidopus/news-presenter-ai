import { Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AvatarPlayer } from './AvatarPlayer';
import { NewsPresentation } from '@/lib/agent';

interface NewsContainerProps {
  category: string | null;
  isFetching: boolean;
  onFetch: () => void;
  presentation: NewsPresentation | null;
}

export function NewsContainer({ category, isFetching, onFetch, presentation }: NewsContainerProps) {
  // Cycling loading text - Top Level
  const [loadingText, setLoadingText] = useState('Gathering the latest updates...');
  
  useEffect(() => {
    if (!isFetching || !category) return;
    
    const texts = [
        `Scanning global news sources for ${category}...`,
        `Analyzing top stories in ${category}...`,
        `Synthesizing broadcast script...`,
        `Preparing AI news anchor...`
    ];
    let i = 0;
    
    // Set initial
    setLoadingText(texts[0]);

    const interval = setInterval(() => {
        i++;
        setLoadingText(texts[i % texts.length]);
    }, 2000); // Change every 2 seconds
    
    return () => clearInterval(interval);
  }, [isFetching, category]);

  // Dynamic subtle background color based on category (simple hash)
  const getCategoryColor = (cat: string) => {
      const colors = ['bg-blue-500/5', 'bg-purple-500/5', 'bg-emerald-500/5', 'bg-orange-500/5'];
      return colors[cat.length % colors.length];
  };

  const bgClass = category ? getCategoryColor(category) : 'bg-card';

  // Toggle Transcript
  const [showTranscript, setShowTranscript] = useState(false);

  // -- Render Logic --

  if (!category) {
    return (
      <motion.div
        className="flex h-[500px] w-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-16 text-center shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Play className="h-10 w-10 text-muted-foreground" />
        </motion.div>
        <h3 className="text-2xl font-semibold text-foreground mb-4">Choose a Tech Category</h3>
        <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
          Select a technology category above to begin your personalized AI news briefing.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("w-full flex flex-col gap-8 p-6 rounded-3xl transition-colors duration-500", bgClass)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
             {category} News
           </h2>
           <p className="text-muted-foreground mt-1">Briefly AI &bull; Latest Updates</p>
        </div>
        <button
          onClick={onFetch}
          disabled={isFetching}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
        >
          {isFetching ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </span>
          ) : (
            'Refresh Briefing'
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area (Video/Script) */}
        <div className="lg:col-span-2">
          {isFetching ? (
            <motion.div 
               className="h-[400px] bg-background/50 rounded-3xl flex flex-col items-center justify-center border border-border/50 gap-6 backdrop-blur-sm"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
            >
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <motion.div 
                className="w-64 h-2 bg-secondary rounded-full overflow-hidden"
              >
                <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
              </motion.div>
              <motion.p 
                key={loadingText} // Animate change
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-muted-foreground text-lg"
              >
                {loadingText}
              </motion.p>
            </motion.div>
          ) : presentation ? (
             <motion.div
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="flex flex-col gap-4"
             >
                {/* Avatar Player */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                   <AvatarPlayer script={presentation.script} />
                </div>
                
                {/* Toggle Transcript */}
                 <div className="flex justify-end">
                    <button 
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="text-sm text-primary hover:underline"
                    >
                        {showTranscript ? "Hide Transcript" : "Show Transcript"}
                    </button>
                 </div>

                {/* Transcript */}
                {showTranscript && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="p-6 bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50"
                    >
                        <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                            {presentation.script}
                        </p>
                    </motion.div>
                )}

             </motion.div>
          ) : (
             <div className="h-[400px] bg-card rounded-3xl flex items-center justify-center border border-dashed border-border">
               <p className="text-muted-foreground">Ready to generate news.</p>
             </div>
          )}
        </div>

        {/* Sidebar (Sources) */}
        <div className="space-y-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/50 h-full">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"/>
              Sources
            </h3>
            
            {presentation ? (
              <ul className="space-y-4">
                {presentation.sources.map((source, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <a 
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group p-4 rounded-xl hover:bg-secondary/50 transition-all border border-transparent hover:border-border"
                    >
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {source.title}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-xs uppercase tracking-wider bg-secondary px-2 py-0.5 rounded-md">
                            {source.source}
                        </span>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            ) : (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-secondary/30 rounded-xl animate-pulse" />
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
