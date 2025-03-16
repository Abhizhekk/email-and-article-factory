
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';
import LoadingSpinner from './LoadingSpinner';

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  isLoading?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradientFrom = 'from-primary', gradientTo = 'to-accent', isLoading, children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          'relative overflow-hidden bg-gradient-to-r transition-all duration-300 hover:shadow-md',
          gradientFrom,
          gradientTo,
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner size="sm" className="border-white" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </Button>
    );
  }
);

GradientButton.displayName = 'GradientButton';

export default GradientButton;
