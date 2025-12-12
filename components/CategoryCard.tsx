import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

export function CategoryCard({ id, title, icon: Icon, isSelected, onClick }: CategoryCardProps) {
  return (
    <motion.button
      onClick={() => onClick(id)}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-4 rounded-2xl p-6 transition-all duration-300 min-h-[140px] w-full cursor-pointer",
        "bg-card text-card-foreground shadow-sm hover:shadow-lg border",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50"
      )}
    >
      <motion.div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300",
          isSelected
            ? "bg-primary"
            : "bg-secondary group-hover:bg-primary/10"
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon className={cn(
          "h-6 w-6 transition-colors duration-300",
          isSelected ? "text-white" : "text-muted-foreground group-hover:text-primary"
        )} />
      </motion.div>
      <span className={cn(
        "text-base font-medium transition-colors duration-300 text-center",
        isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
      )}>{title}</span>
    </motion.button>
  );
}
