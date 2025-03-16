
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
import { Copy, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import AnimatedTransition from '@/components/AnimatedTransition';

const ArticleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('blog');
  const [wordCount, setWordCount] = useState(500);
  const [includeKeyPoints, setIncludeKeyPoints] = useState(true);
  const [language, setLanguage] = useState('English');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a topic for your article",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContent('article', {
        topic,
        style: style as 'formal' | 'casual' | 'academic' | 'seo' | 'blog',
        wordCount,
        includeKeyPoints,
        language,
        additionalContext
      });
      
      setGeneratedArticle(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedArticle);
    toast({
      title: "Copied to clipboard",
      description: "Article content copied successfully",
    });
  };

  return (
    <Layout>
      <AnimatedTransition animation="fade">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-display tracking-tight mb-2">Article Generator</h1>
            <p className="text-muted-foreground">Create well-written articles in various styles</p>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="result" disabled={!generatedArticle}>Result</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate">
              <Card>
                <CardHeader>
                  <CardTitle>Article Details</CardTitle>
                  <CardDescription>
                    Customize your article by filling out the form below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Textarea
                      id="topic"
                      placeholder="What would you like your article to be about?"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="style">Writing Style</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger id="style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="seo">SEO-Friendly</SelectItem>
                          <SelectItem value="blog">Blog Post</SelectItem>
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
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="wordCount">Word Count: {wordCount}</Label>
                      <span className="text-sm text-muted-foreground">{wordCount} words</span>
                    </div>
                    <Slider
                      id="wordCount"
                      value={[wordCount]}
                      min={200}
                      max={2000}
                      step={100}
                      onValueChange={(value) => setWordCount(value[0])}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeKeyPoints"
                      checked={includeKeyPoints}
                      onCheckedChange={setIncludeKeyPoints}
                    />
                    <Label htmlFor="includeKeyPoints">Include key points and summary</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
                    <Textarea
                      id="additionalContext"
                      placeholder="Any specific details, requirements or references you'd like to include"
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
                    Generate Article
                  </GradientButton>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="result">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Generated Article</CardTitle>
                    <CardDescription>
                      Your article is ready
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
                      {generatedArticle}
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

export default ArticleGenerator;
