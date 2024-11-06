import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Section {
  score: number;
  feedback: string;
  suggestions: string[];
}

interface FeedbackResponse {
  overallScore: number;
  sections: {
    summary?: Section;
    experience?: Section;
    skills?: Section;
    education?: Section;
    projects?: Section;
  };
  languageImprovements: {
    text: string;
    suggestion: string;
    reason: string;
  }[];
  competitiveAnalysis: {
    strengths: string[];
    gaps: string[];
    industryComparison: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content, industry = 'software' } = req.body;

    const systemPrompt = `You are an expert resume reviewer and career coach with deep knowledge of ${industry} industry standards.
Analyze the resume content and provide detailed feedback in the following areas:

1. Section-by-section analysis (score out of 100 and specific improvements)
2. Impact assessment of achievements
3. Language and phrasing suggestions
4. Competitive analysis against industry standards, including:
   - At least 3 specific strengths
   - At least 3 areas for improvement
   - A brief industry comparison statement

Your response MUST include arrays of strengths and gaps in the competitiveAnalysis section.
Format the response exactly as specified in the JSON structure.`;

    const userPrompt = `Analyze this resume content and provide structured feedback:

${JSON.stringify(content, null, 2)}

Provide feedback in this exact JSON structure:
{
  "overallScore": number,
  "sections": {
    "summary": { "score": number, "feedback": string, "suggestions": string[] },
    "experience": { "score": number, "feedback": string, "suggestions": string[] },
    "skills": { "score": number, "feedback": string, "suggestions": string[] },
    "education": { "score": number, "feedback": string, "suggestions": string[] }
  },
  "languageImprovements": [
    { "text": string, "suggestion": string, "reason": string }
  ],
  "competitiveAnalysis": {
    "strengths": string[],
    "gaps": string[],
    "industryComparison": string
  }
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const feedbackContent = JSON.parse(completion.choices[0].message.content || '{}');

    // Add default values and ensure arrays exist
    const sanitizedFeedback: FeedbackResponse = {
      overallScore: feedbackContent.overallScore || 0,
      sections: feedbackContent.sections || {},
      languageImprovements: Array.isArray(feedbackContent.languageImprovements) 
        ? feedbackContent.languageImprovements 
        : [],
      competitiveAnalysis: {
        strengths: Array.isArray(feedbackContent.competitiveAnalysis?.strengths) 
          ? feedbackContent.competitiveAnalysis.strengths 
          : ['Strong technical skills', 'Good educational background', 'Clear work history'],
        gaps: Array.isArray(feedbackContent.competitiveAnalysis?.gaps) 
          ? feedbackContent.competitiveAnalysis.gaps 
          : ['Could add more quantifiable achievements', 'Consider adding more industry keywords', 'Could expand on leadership experience'],
        industryComparison: feedbackContent.competitiveAnalysis?.industryComparison || 
          'Your resume shows good potential but could be enhanced with more specific industry-relevant details.'
      }
    };

    // Log the response for debugging
    console.log('AI Feedback Response:', JSON.stringify(sanitizedFeedback, null, 2));

    res.status(200).json(sanitizedFeedback);

  } catch (error) {
    console.error('AI Feedback Error:', error);
    res.status(500).json({ message: 'Failed to generate feedback' });
  }
} 