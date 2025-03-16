
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedTransition from './AnimatedTransition';
import { useNavigate } from 'react-router-dom';

interface GeneratorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  delay?: number;
  className?: string;
}

const GeneratorCard = ({
  title,
  description,
  icon,
  path,
  delay = 0,
  className,
}: GeneratorCardProps) => {
  const navigate = useNavigate();
  
  return (
    <AnimatedTransition animation="scale" delay={delay}>
      <Card className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-md border border-border/50',
        'backdrop-blur-sm bg-card/80 hover:bg-card/95',
        className
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10 text-accent-foreground">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground/90">{title}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full hover:bg-accent/10 hover:text-accent-foreground transition-all duration-300"
            onClick={() => navigate(path)}
          >
            Open Generator
          </Button>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default GeneratorCard;
