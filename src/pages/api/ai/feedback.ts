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
4. Competitive analysis against industry standards

Focus on actionable feedback that will improve the resume's effectiveness.`;

    const userPrompt = `Analyze this resume content and provide structured feedback:

${JSON.stringify(content, null, 2)}

Provide feedback in a structured JSON format with:
- Overall score
- Section-specific scores and suggestions
- Language improvements
- Competitive analysis`;

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

    res.status(200).json(feedbackContent);

  } catch (error) {
    console.error('AI Feedback Error:', error);
    res.status(500).json({ message: 'Failed to generate feedback' });
  }
} 