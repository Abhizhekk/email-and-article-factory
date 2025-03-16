
import { toast } from '@/components/ui/use-toast';

const API_KEY = 'AIzaSyBdf7PsvrPgNzLS0rvZYvbbt6auEIc7fi8';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

type GeneratorType = 'email' | 'article' | 'coverLetter' | 'meeting' | 'speech';

interface GenerateEmailParams {
  recipient: string;
  subject: string;
  tone: 'formal' | 'informal' | 'friendly' | 'professional';
  purpose: string;
  language?: string;
  additionalContext?: string;
}

interface GenerateArticleParams {
  topic: string;
  style: 'formal' | 'casual' | 'academic' | 'seo' | 'blog';
  wordCount: number;
  includeKeyPoints: boolean;
  language?: string;
  additionalContext?: string;
}

interface GenerateCoverLetterParams {
  jobTitle: string;
  company: string;
  skills: string;
  experience: string;
  language?: string;
  additionalContext?: string;
}

interface GenerateMeetingParams {
  meetingType: string;
  participants: string;
  objectives: string;
  duration: string;
  language?: string;
  additionalContext?: string;
}

interface GenerateSpeechParams {
  topic: string;
  audience: string;
  duration: string;
  tone: 'inspirational' | 'informative' | 'persuasive' | 'entertaining';
  language?: string;
  additionalContext?: string;
}

type GenerateParams = 
  | GenerateEmailParams
  | GenerateArticleParams
  | GenerateCoverLetterParams
  | GenerateMeetingParams
  | GenerateSpeechParams;

const createPrompt = (type: GeneratorType, params: GenerateParams): string => {
  let prompt = '';
  
  switch (type) {
    case 'email':
      const emailParams = params as GenerateEmailParams;
      prompt = `Write a ${emailParams.tone} email to ${emailParams.recipient} with the subject "${emailParams.subject}". 
      The purpose of this email is ${emailParams.purpose}.
      ${emailParams.additionalContext ? `Additional context: ${emailParams.additionalContext}` : ''}
      ${emailParams.language ? `Write this email in ${emailParams.language}.` : ''}
      Format the email properly with greeting, body, and signature.`;
      break;
      
    case 'article':
      const articleParams = params as GenerateArticleParams;
      prompt = `Write a ${articleParams.style} article about "${articleParams.topic}".
      The article should be approximately ${articleParams.wordCount} words.
      ${articleParams.includeKeyPoints ? 'Include a bullet-point list of key takeaways at the end.' : ''}
      ${articleParams.additionalContext ? `Additional context: ${articleParams.additionalContext}` : ''}
      ${articleParams.language ? `Write this article in ${articleParams.language}.` : ''}
      Format the article with an engaging title, introduction, body paragraphs with subheadings, and conclusion.`;
      break;
      
    case 'coverLetter':
      const coverParams = params as GenerateCoverLetterParams;
      prompt = `Write a professional cover letter for a ${coverParams.jobTitle} position at ${coverParams.company}.
      My key skills include: ${coverParams.skills}.
      My relevant experience includes: ${coverParams.experience}.
      ${coverParams.additionalContext ? `Additional context: ${coverParams.additionalContext}` : ''}
      ${coverParams.language ? `Write this cover letter in ${coverParams.language}.` : ''}
      Format it as a proper business letter with date, address, greeting, body paragraphs, closing, and signature.`;
      break;
      
    case 'meeting':
      const meetingParams = params as GenerateMeetingParams;
      prompt = `Create a meeting agenda and notes template for a ${meetingParams.meetingType} meeting.
      Participants: ${meetingParams.participants}
      Meeting objectives: ${meetingParams.objectives}
      Duration: ${meetingParams.duration}
      ${meetingParams.additionalContext ? `Additional context: ${meetingParams.additionalContext}` : ''}
      ${meetingParams.language ? `Write this in ${meetingParams.language}.` : ''}
      Include sections for agenda items, discussion points, action items, and next steps.`;
      break;
      
    case 'speech':
      const speechParams = params as GenerateSpeechParams;
      prompt = `Write a ${speechParams.tone} speech about "${speechParams.topic}" for ${speechParams.audience}.
      The speech should last approximately ${speechParams.duration}.
      ${speechParams.additionalContext ? `Additional context: ${speechParams.additionalContext}` : ''}
      ${speechParams.language ? `Write this speech in ${speechParams.language}.` : ''}
      Structure it with an attention-grabbing opening, main points with examples, and a memorable conclusion.`;
      break;
  }
  
  return prompt;
};

export const generateContent = async (
  type: GeneratorType,
  params: GenerateParams
): Promise<string> => {
  try {
    const prompt = createPrompt(type, params);
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate content');
    }
    
    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'No content generated';
    
  } catch (error) {
    if (error instanceof Error) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error.message,
      });
    }
    throw error;
  }
};
