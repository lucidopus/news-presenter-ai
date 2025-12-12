import Link from 'next/link';
import { Radio } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90">
      <div className="flex h-14 max-w-screen-xl items-center justify-between px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground hover:opacity-80 transition-opacity cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Radio className="h-4 w-4 text-white" />
          </div>
          briefly.ai
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How it Works</Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">About</Link>
        </nav>
      </div>
    </header>
  );
}
