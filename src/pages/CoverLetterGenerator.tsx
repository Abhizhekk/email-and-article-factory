
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

const CoverLetterGenerator = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [language, setLanguage] = useState('English');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle || !company || !skills) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContent('coverLetter', {
        jobTitle,
        company,
        skills,
        experience,
        language,
        additionalContext
      });
      
      setGeneratedCoverLetter(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCoverLetter);
    toast({
      title: "Copied to clipboard",
      description: "Cover letter copied successfully",
    });
  };

  return (
    <Layout>
      <AnimatedTransition animation="fade">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-display tracking-tight mb-2">Cover Letter Generator</h1>
            <p className="text-muted-foreground">Create professional cover letters tailored to your job applications</p>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="result" disabled={!generatedCoverLetter}>Result</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate">
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter Details</CardTitle>
                  <CardDescription>
                    Fill out the form to create a personalized cover letter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        placeholder="Position you're applying for"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Company you're applying to"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Key Skills</Label>
                    <Textarea
                      id="skills"
                      placeholder="List your relevant skills and qualifications"
                      rows={3}
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Work Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Briefly describe your relevant work experience"
                      rows={3}
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
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
                      placeholder="Any other information you'd like to include"
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
                    Generate Cover Letter
                  </GradientButton>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="result">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Generated Cover Letter</CardTitle>
                    <CardDescription>
                      Your cover letter is ready to use
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
                      {generatedCoverLetter}
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

export default CoverLetterGenerator;
