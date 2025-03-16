
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

const EmailGenerator = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState('professional');
  const [language, setLanguage] = useState('English');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!recipient || !subject || !purpose) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContent('email', {
        recipient,
        subject,
        tone: tone as 'formal' | 'informal' | 'friendly' | 'professional',
        purpose,
        language,
        additionalContext
      });
      
      setGeneratedEmail(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast({
      title: "Copied to clipboard",
      description: "Email content copied successfully",
    });
  };

  return (
    <Layout>
      <AnimatedTransition animation="fade">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-display tracking-tight mb-2">Email Generator</h1>
            <p className="text-muted-foreground">Create professional emails in seconds</p>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="result" disabled={!generatedEmail}>Result</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate">
              <Card>
                <CardHeader>
                  <CardTitle>Email Details</CardTitle>
                  <CardDescription>
                    Fill out the form below to generate a custom email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Input
                        id="recipient"
                        placeholder="Recipient name or title"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Email subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Textarea
                      id="purpose"
                      placeholder="What is the purpose of this email?"
                      rows={3}
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
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
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="informal">Informal</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
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
                    <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
                    <Textarea
                      id="additionalContext"
                      placeholder="Any additional details you'd like to include"
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
                    Generate Email
                  </GradientButton>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="result">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Generated Email</CardTitle>
                    <CardDescription>
                      Your email is ready to use
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
                    <div className="flex justify-center items-center h-[300px]">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : (
                    <div className="whitespace-pre-line border rounded-md p-4 bg-muted/30 min-h-[300px]">
                      {generatedEmail}
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

export default EmailGenerator;
