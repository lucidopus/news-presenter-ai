import { Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface NewsContainerProps {
  category: string | null;
  isFetching: boolean;
  onFetch: () => void;
}

export function NewsContainer({ category, isFetching, onFetch }: NewsContainerProps) {
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
      className="w-full flex flex-col gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold capitalize text-foreground">{category} News</h2>
          <p className="text-muted-foreground text-lg">AI-powered news briefing</p>
        </div>
        <motion.button
          onClick={onFetch}
          disabled={isFetching}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-medium shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
            "bg-primary text-white hover:bg-primary/90"
          )}
        >
          {isFetching && <Loader2 className="mr-3 h-5 w-5 animate-spin" />}
          {isFetching ? 'Generating Briefing...' : 'Start Briefing'}
        </motion.button>
      </div>

      {/* Content Area */}
      <motion.div
        className="relative overflow-hidden flex h-[500px] w-full items-center justify-center rounded-3xl border border-border bg-card shadow-sm"
        layout
      >
        <div className="relative z-10 text-center space-y-8 p-12 max-w-lg">
          {isFetching ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <motion.div
                className="h-3 w-full bg-muted rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
              </motion.div>
              <p className="text-muted-foreground text-lg">
                AI agent gathering the latest {category} updates...
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <motion.div
                className="mx-auto h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Play className="h-12 w-12 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Ready for Your Briefing</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Click above to have our AI research and present the latest {category} updates.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
