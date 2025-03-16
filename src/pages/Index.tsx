
import { 
  Mail, FileText, FileSpreadsheet, CalendarClock, MessageSquare, Sparkles
} from 'lucide-react';
import Layout from '@/components/Layout';
import GeneratorCard from '@/components/GeneratorCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import GradientButton from '@/components/GradientButton';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const generators = [
    {
      title: 'Email Generator',
      description: 'Create formal and informal emails with customizable tone, purpose, and language.',
      icon: <Mail size={20} />,
      path: '/email-generator',
    },
    {
      title: 'Article Generator',
      description: 'Write articles in various styles with customizable word count and key points extraction.',
      icon: <FileText size={20} />,
      path: '/article-generator',
    },
    {
      title: 'Cover Letter Generator',
      description: 'Generate professional cover letters tailored to specific job positions and companies.',
      icon: <FileSpreadsheet size={20} />,
      path: '/cover-letter-generator',
    },
    {
      title: 'Meeting Agenda Generator',
      description: 'Create comprehensive meeting agendas with objectives, discussion points, and action items.',
      icon: <CalendarClock size={20} />,
      path: '/meeting-generator',
    },
    {
      title: 'Speech Generator',
      description: 'Write compelling speeches for various occasions with different tones and durations.',
      icon: <MessageSquare size={20} />,
      path: '/speech-generator',
    },
  ];

  return (
    <Layout className="py-10">
      <div className="flex flex-col items-center text-center mb-16">
        <AnimatedTransition animation="slide-up">
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium">
            <Sparkles size={14} className="mr-1" />
            Powered by Gemini 1.5 Flash
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-up" delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Maestro AI
            </span>
          </h1>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-up" delay={200}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Create professional content in seconds with our AI-powered generators.
            From emails to speeches, we've got you covered.
          </p>
        </AnimatedTransition>
        
        <AnimatedTransition animation="slide-up" delay={300}>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton 
              size="lg"
              onClick={() => navigate('/email-generator')}
            >
              Start Generating
            </GradientButton>
          </div>
        </AnimatedTransition>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {generators.map((generator, index) => (
          <GeneratorCard
            key={generator.path}
            title={generator.title}
            description={generator.description}
            icon={generator.icon}
            path={generator.path}
            delay={400 + index * 100}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
