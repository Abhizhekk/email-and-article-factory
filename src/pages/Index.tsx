
import { 
  Mail, FileText, FileSpreadsheet, CalendarClock, MessageSquare, 
  Sparkles, FileCheck, Play, RefreshCw, FileTerminal, MessageCircleMore
} from 'lucide-react';
import Layout from '@/components/Layout';
import GeneratorCard from '@/components/GeneratorCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import HeroSection from '@/components/HeroSection';

const Index = () => {
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
    <Layout className="py-8">
      <HeroSection />
      
      <div className="space-y-16 pt-8">
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
