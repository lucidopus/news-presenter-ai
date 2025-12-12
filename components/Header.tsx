import Link from 'next/link';
import { Radio } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-2">
           <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
             <Radio className="h-5 w-5 text-white" />
           </div>
           <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
             briefly.ai
           </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">How it Works</Link>
          <Link href="#" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
        </nav>
      </div>
    </header>
  );
}
