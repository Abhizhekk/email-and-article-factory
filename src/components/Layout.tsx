
import React from 'react';
import NavigationBar from './NavigationBar';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();

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
          <div className="flex items-center justify-center mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
          <p>© {new Date().getFullYear()} Maestro AI Generator. Powered by Gemini 1.5 Flash.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
