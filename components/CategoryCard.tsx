import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  isSelected?: boolean;
  onClick: (id: string) => void;
}

export function CategoryCard({ id, title, icon: Icon, isSelected, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-4 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "bg-card text-card-foreground",
        isSelected 
          ? "border-primary ring-2 ring-primary/50 shadow-md shadow-primary/10" 
          : "border-border hover:border-primary/50 hover:bg-accent/5"
      )}
    >
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/50 transition-colors duration-300 group-hover:bg-primary/20",
        isSelected && "bg-primary/20"
      )}>
        <Icon className={cn(
          "h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary",
          isSelected && "text-primary"
        )} />
      </div>
      <span className={cn(
        "font-semibold transition-colors duration-300",
        isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
      )}>{title}</span>
    </button>
  );
}
