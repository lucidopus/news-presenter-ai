import { Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsContainerProps {
  category: string | null;
  isFetching: boolean;
  onFetch: () => void;
}

export function NewsContainer({ category, isFetching, onFetch }: NewsContainerProps) {
  if (!category) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 p-12 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
            <Play className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Ready to start</h3>
        <p className="text-muted-foreground mt-2 max-w-sm">Select a category from the grid above to begin your personalized news briefing.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
         <div className="space-y-1">
            <h2 className="text-2xl font-bold capitalize">{category} News</h2>
            <p className="text-sm text-muted-foreground">AI Agent ready to deploy</p>
         </div>
         <button 
            onClick={onFetch}
            disabled={isFetching}
            className={cn(
                "inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-medium shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            )}
         >
           {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           {isFetching ? 'Gathering Intel...' : 'Generate Newscast'}
         </button>
      </div>
      
      {/* Content Area */}
      <div className="relative overflow-hidden flex h-[400px] w-full items-center justify-center rounded-2xl border bg-card text-card-foreground shadow-sm">
         {/* Background pattern */}
         <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
         
         <div className="relative z-10 text-center space-y-6 p-8 max-w-md">
            {isFetching ? (
                <>
                    <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-progress origin-left" style={{ width: '50%' }} />
                    </div>
                    <p className="text-muted-foreground animate-pulse">
                        Scanning top sources for {category} trends...
                    </p>
                </>
            ) : (
                <>
                    <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20">
                        <Play className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Ready to Generate</h3>
                        <p className="text-muted-foreground mt-2">Click the button above to have our AI agent research and present the latest stories.</p>
                    </div>
                </>
            )}
         </div>
      </div>
    </div>
  );
}
