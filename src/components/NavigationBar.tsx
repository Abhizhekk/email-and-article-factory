
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sun, Moon, Computer } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { useTheme } from '@/hooks/useTheme';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Logo from './Logo';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const primaryNavItems = [
    { name: 'Home', path: '/' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <AnimatedTransition animation="slide-down">
          <Logo size="md" />
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-down" delay={100}>
          <div className="hidden md:flex items-center space-x-1">
            {primaryNavItems.map((item, index) => (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200",
                  location.pathname === item.path 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                )}
                onClick={() => navigate(item.path)}
              >
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
        </AnimatedTransition>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Computer className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <Button 
              variant="ghost"
              className="text-muted-foreground"
              onClick={() => {}}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
