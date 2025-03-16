
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GradientButton from '@/components/GradientButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateContent } from '@/utils/geminiAPI';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import AnimatedTransition from '@/components/AnimatedTransition';

const SpeechGenerator = () => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [duration, setDuration] = useState('');
  const [tone, setTone] = useState('inspirational');
  const [language, setLanguage] = useState('English');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedSpeech, setGeneratedSpeech] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic || !audience) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContent('speech', {
        topic,
        audience,
        duration,
        tone: tone as 'inspirational' | 'informative' | 'persuasive' | 'entertaining',
        language,
        additionalContext
      });
      
      setGeneratedSpeech(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSpeech);
    toast({
      title: "Copied to clipboard",
      description: "Speech content copied successfully",
    });
  };

  return (
    <Layout>
      <AnimatedTransition animation="fade">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-display tracking-tight mb-2">Speech Generator</h1>
            <p className="text-muted-foreground">Create compelling speeches and presentations</p>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="result" disabled={!generatedSpeech}>Result</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate">
              <Card>
                <CardHeader>
                  <CardTitle>Speech Details</CardTitle>
                  <CardDescription>
                    Fill out the form to create a compelling speech
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="What is your speech about?"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience">Audience</Label>
                    <Input
                      id="audience"
                      placeholder="Who will be listening to your speech?"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inspirational">Inspirational</SelectItem>
                          <SelectItem value="informative">Informative</SelectItem>
                          <SelectItem value="persuasive">Persuasive</SelectItem>
                          <SelectItem value="entertaining">Entertaining</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 5 minutes, 15 minutes"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
                    <Textarea
                      id="additionalContext"
                      placeholder="Any specific points you'd like to include, or background information"
                      rows={3}
                      value={additionalContext}
                      onChange={(e) => setAdditionalContext(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <GradientButton 
                    onClick={handleGenerate} 
                    className="w-full"
                    isLoading={isGenerating}
                  >
                    Generate Speech
                  </GradientButton>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="result">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Generated Speech</CardTitle>
                    <CardDescription>
                      Your speech is ready to use
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                  >
                    <Copy size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex justify-center items-center h-[400px]">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : (
                    <div className="whitespace-pre-line border rounded-md p-4 bg-muted/30 min-h-[400px] max-h-[600px] overflow-y-auto">
                      {generatedSpeech}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <GradientButton onClick={handleGenerate} isLoading={isGenerating}>
                    Regenerate
                  </GradientButton>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default SpeechGenerator;
