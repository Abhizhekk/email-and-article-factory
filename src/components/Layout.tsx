
import React from 'react';
import NavigationBar from './NavigationBar';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className={cn("flex-1 container mx-auto px-4 py-8", className)}>
        <AnimatedTransition animation="fade">
          {children}
        </AnimatedTransition>
      </main>
      <footer className="py-6 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1.5">
            Built with <Heart size={14} className="text-destructive" /> by TextCraft AI 
            &bull; © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
