
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import GradientButton from './GradientButton';
import Logo from './Logo';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl mb-8">
      {/* Hero background with image overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/10 dark:hero-gradient overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        {/* Abstract graphic elements */}
        <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 py-16 px-4 md:py-20 md:px-8">
        <AnimatedTransition animation="slide-up">
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-accent/20 backdrop-blur-sm text-accent-foreground text-sm font-medium border border-accent/20">
            <Sparkles size={14} className="mr-2" />
            Powered by Gemini 1.5 Flash
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-up" delay={100}>
          <div className="mb-4">
            <Logo size="lg" showIcon={false} className="inline-block mb-2" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 max-w-2xl">
            Craft perfect content with AI
          </h1>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-up" delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            From emails to scripts, our AI-powered generators help you create professional content in seconds.
          </p>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-up" delay={300}>
          <div className="flex flex-wrap gap-4">
            <GradientButton 
              size="lg"
              onClick={() => navigate('/email-generator')}
              className="shadow-lg"
            >
              Start Generating
            </GradientButton>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default HeroSection;
