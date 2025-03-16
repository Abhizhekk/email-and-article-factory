
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Mail, FileText, FileSpreadsheet, CalendarClock, MessageSquare, Home 
} from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Email', path: '/email-generator', icon: <Mail size={18} /> },
    { name: 'Article', path: '/article-generator', icon: <FileText size={18} /> },
    { name: 'Cover Letter', path: '/cover-letter-generator', icon: <FileSpreadsheet size={18} /> },
    { name: 'Meeting', path: '/meeting-generator', icon: <CalendarClock size={18} /> },
    { name: 'Speech', path: '/speech-generator', icon: <MessageSquare size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <AnimatedTransition animation="slide-down">
          <div className="flex items-center space-x-1">
            <span className="text-xl font-display font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Maestro AI
            </span>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-down" delay={100}>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
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
                {item.icon}
                <span>{item.name}</span>
              </Button>
            ))}
          </div>
        </AnimatedTransition>

        <div className="md:hidden flex items-center">
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
    </nav>
  );
};

export default NavigationBar;
