import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { jobTitle } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an expert in technical recruitment and career development." 
        },
        { 
          role: "user", 
          content: `List 5 key technical skills that are most relevant for a ${jobTitle} position. 
          Focus on in-demand skills that would make a candidate stand out. Format as a simple list.`
        }
      ],
      temperature: 0.7,
    });

    const suggestions = completion.choices[0].message.content?.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^[•-]\s*/, ''));

    res.status(200).json({ 
      suggestions,
      explanation: "These skills are highly valued in the current job market for your role."
    });

  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
} 