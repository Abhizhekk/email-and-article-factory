
import { 
  Mail, FileText, FileSpreadsheet, CalendarClock, MessageSquare, 
  Sparkles, FileCheck, Play, RefreshCw, FileTerminal, MessageCircleMore
} from 'lucide-react';
import Layout from '@/components/Layout';
import GeneratorCard from '@/components/GeneratorCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import GradientButton from '@/components/GradientButton';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const primaryGenerators = [
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

  const secondaryGenerators = [
    {
      title: 'Business Proposal Generator',
      description: 'Create structured business proposals with executive summaries, solutions, and terms.',
      icon: <FileCheck size={20} />,
      path: '/business-proposal-generator',
    },
    {
      title: 'Scriptwriting Assistant',
      description: 'Generate scripts for YouTube videos, podcasts, or short films with dialogue and directions.',
      icon: <Play size={20} />,
      path: '/scriptwriting-generator',
    },
    {
      title: 'Paraphrasing Tool',
      description: 'Rewrite content while maintaining original meaning and improving clarity.',
      icon: <RefreshCw size={20} />,
      path: '/paraphrasing-tool',
    },
    {
      title: 'Text Summarizer',
      description: 'Convert long texts into concise, easy-to-read summaries with key points.',
      icon: <FileTerminal size={20} />,
      path: '/text-summarizer',
    },
    {
      title: 'Ad Copy Generator',
      description: 'Create persuasive ad copy for social media platforms with compelling headlines and CTAs.',
      icon: <MessageCircleMore size={20} />,
      path: '/ad-copy-generator',
    },
  ];

  return (
    <Layout className="py-10">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-full max-w-5xl relative overflow-hidden rounded-2xl mb-8 py-16 px-4 bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <AnimatedTransition animation="slide-up">
            <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium">
              <Sparkles size={14} className="mr-1" />
              Powered by Gemini 1.5 Flash
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TextCraft AI
              </span>
            </h1>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Craft perfect content in seconds with our AI-powered generators.
              From emails to scripts, we've got you covered.
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
      </div>

      <div className="space-y-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-center mb-6">Popular Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {primaryGenerators.map((generator, index) => (
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
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-display font-semibold text-center mb-6">More Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {secondaryGenerators.map((generator, index) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Index;
