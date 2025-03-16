
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showIcon = true, 
  className,
  onClick
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/');
    }
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-1.5 cursor-pointer", 
        className
      )} 
      onClick={handleClick}
    >
      {showIcon && (
        <div className="relative">
          <Sparkles className="text-primary h-5 w-5" />
        </div>
      )}
      <span className={cn("font-display logo-text", textSizeClasses[size])}>
        TextCraft AI
      </span>
    </div>
  );
};

export default Logo;
