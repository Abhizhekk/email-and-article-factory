
import { toast } from '@/components/ui/use-toast';

const API_KEY = 'AIzaSyBdf7PsvrPgNzLS0rvZYvbbt6auEIc7fi8';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

type GeneratorType = 
  | 'email' 
  | 'article' 
  | 'coverLetter' 
  | 'meeting' 
  | 'speech'
  | 'businessProposal'
  | 'scriptwriting'
  | 'paraphrasing'
  | 'summarize'
  | 'adCopy';

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

interface GenerateBusinessProposalParams {
  projectName: string;
  clientName: string;
  industry: string;
  objectives: string;
  budget?: string;
  timeline?: string;
  language?: string;
  additionalContext?: string;
}

interface GenerateScriptwritingParams {
  scriptType: 'youtube' | 'podcast' | 'shortFilm' | 'other';
  topic: string;
  duration: string;
  targetAudience: string;
  tone: string;
  language?: string;
  additionalContext?: string;
}

interface GenerateParaphrasingParams {
  originalText: string;
  tone?: 'formal' | 'casual' | 'academic' | 'simple';
  language?: string;
}

interface GenerateSummarizeParams {
  originalText: string;
  length: 'short' | 'medium' | 'long';
  includeKeyPoints: boolean;
  language?: string;
}

interface GenerateAdCopyParams {
  product: string;
  platform: 'facebook' | 'google' | 'linkedin' | 'instagram' | 'twitter';
  targetAudience: string;
  uniqueSellingPoints: string;
  toneStyle: string;
  language?: string;
  additionalContext?: string;
}

type GenerateParams = 
  | GenerateEmailParams
  | GenerateArticleParams
  | GenerateCoverLetterParams
  | GenerateMeetingParams
  | GenerateSpeechParams
  | GenerateBusinessProposalParams
  | GenerateScriptwritingParams
  | GenerateParaphrasingParams
  | GenerateSummarizeParams
  | GenerateAdCopyParams;

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

    case 'businessProposal':
      const proposalParams = params as GenerateBusinessProposalParams;
      prompt = `Generate a professional business proposal for project "${proposalParams.projectName}" for ${proposalParams.clientName} in the ${proposalParams.industry} industry.
      Key objectives: ${proposalParams.objectives}
      ${proposalParams.budget ? `Budget: ${proposalParams.budget}` : ''}
      ${proposalParams.timeline ? `Timeline: ${proposalParams.timeline}` : ''}
      ${proposalParams.additionalContext ? `Additional context: ${proposalParams.additionalContext}` : ''}
      ${proposalParams.language ? `Write this proposal in ${proposalParams.language}.` : ''}
      Include an executive summary, problem statement, proposed solution, timeline, budget, and terms and conditions sections.`;
      break;

    case 'scriptwriting':
      const scriptParams = params as GenerateScriptwritingParams;
      prompt = `Create a ${scriptParams.scriptType} script about "${scriptParams.topic}" for ${scriptParams.targetAudience}.
      The script should be approximately ${scriptParams.duration} in length.
      Tone: ${scriptParams.tone}
      ${scriptParams.additionalContext ? `Additional context: ${scriptParams.additionalContext}` : ''}
      ${scriptParams.language ? `Write this script in ${scriptParams.language}.` : ''}
      Format it properly with scenes, dialogue, and directions as appropriate for a ${scriptParams.scriptType}.`;
      break;

    case 'paraphrasing':
      const paraphraseParams = params as GenerateParaphrasingParams;
      prompt = `Paraphrase the following text while maintaining its original meaning:
      "${paraphraseParams.originalText}"
      ${paraphraseParams.tone ? `The paraphrased text should have a ${paraphraseParams.tone} tone.` : ''}
      ${paraphraseParams.language ? `Provide the paraphrased text in ${paraphraseParams.language}.` : ''}
      Ensure the paraphrased version is clear, concise, and avoids plagiarism.`;
      break;

    case 'summarize':
      const summarizeParams = params as GenerateSummarizeParams;
      prompt = `Summarize the following text into a ${summarizeParams.length} summary:
      "${summarizeParams.originalText}"
      ${summarizeParams.includeKeyPoints ? 'Include a bullet-point list of key points.' : ''}
      ${summarizeParams.language ? `Provide the summary in ${summarizeParams.language}.` : ''}
      Ensure the summary captures the main ideas and essential details of the original text.`;
      break;

    case 'adCopy':
      const adParams = params as GenerateAdCopyParams;
      prompt = `Write persuasive ad copy for ${adParams.product} to be used on ${adParams.platform}.
      Target audience: ${adParams.targetAudience}
      Unique selling points: ${adParams.uniqueSellingPoints}
      Tone/Style: ${adParams.toneStyle}
      ${adParams.additionalContext ? `Additional context: ${adParams.additionalContext}` : ''}
      ${adParams.language ? `Write this ad copy in ${adParams.language}.` : ''}
      Create compelling headline(s), body copy, and call-to-action that adheres to ${adParams.platform} ad format best practices.`;
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
