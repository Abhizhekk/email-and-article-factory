
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import GradientButton from '@/components/GradientButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateContent } from '@/utils/geminiAPI';
import { Copy, FileTerminal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import AnimatedTransition from '@/components/AnimatedTransition';

const TextSummarizer = () => {
  const [originalText, setOriginalText] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [includeKeyPoints, setIncludeKeyPoints] = useState(true);
  const [language, setLanguage] = useState('English');
  const [summarizedText, setSummarizedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!originalText || originalText.trim().length < 100) {
      toast({
        variant: "destructive",
        title: "Text too short",
        description: "Please enter more text to summarize (at least 100 characters)",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContent('summarize', {
        originalText,
        length,
        includeKeyPoints,
        language
      });
      
      setSummarizedText(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summarizedText);
    toast({
      title: "Copied to clipboard",
      description: "Summary copied successfully",
    });
  };

  return (
    <Layout>
      <AnimatedTransition animation="fade">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-display tracking-tight mb-2">Text Summarizer</h1>
            <p className="text-muted-foreground">Convert long texts into concise, easy-to-read summaries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTerminal className="h-5 w-5" />
                  <span>Original Text</span>
                </CardTitle>
                <CardDescription>
                  Enter the text you want to summarize
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Paste your long text here..."
                    rows={10}
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    className="min-h-[300px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Summary Length</Label>
                    <Select 
                      value={length} 
                      onValueChange={(value: 'short' | 'medium' | 'long') => setLength(value)}
                    >
                      <SelectTrigger id="length">
                        <SelectValue placeholder="Select length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="long">Long</SelectItem>
                      </SelectContent>
                    </Select>
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
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="keyPoints" 
                    checked={includeKeyPoints}
                    onCheckedChange={setIncludeKeyPoints}
                  />
                  <Label htmlFor="keyPoints">Include key points</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center md:justify-end">
                <div className="hidden md:block">
                  <ArrowRight className="text-muted-foreground" />
                </div>
                <div className="md:hidden">
                  <GradientButton 
                    onClick={handleGenerate} 
                    className="w-full"
                    isLoading={isGenerating}
                  >
                    Summarize Text
                  </GradientButton>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>
                    Concise version of your text
                  </CardDescription>
                </div>
                {summarizedText && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                  >
                    <Copy size={16} />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex justify-center items-center h-[300px]">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : (
                  <div className="border rounded-md p-4 bg-muted/30 min-h-[300px] overflow-y-auto whitespace-pre-line">
                    {summarizedText || (
                      <p className="text-muted-foreground text-center flex items-center justify-center h-full">
                        Your summarized text will appear here
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <GradientButton 
                  onClick={handleGenerate} 
                  className="w-full"
                  isLoading={isGenerating}
                >
                  {summarizedText ? "Summarize Again" : "Summarize Text"}
                </GradientButton>
              </CardFooter>
            </Card>
          </div>
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default TextSummarizer;
