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
    const { role, company } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an expert resume writer with years of experience in crafting compelling job descriptions." 
        },
        { 
          role: "user", 
          content: `Generate 3 different job descriptions for a ${role} position at ${company}. 
          Each description should be a group of 3-4 bullet points highlighting different aspects of the role.
          Format as numbered list (1., 2., 3.) with bullet points under each number.
          Ensure each bullet point is meaningful and complete.`
        }
      ],
      temperature: 0.7,
    });

    // Process the content to group suggestions and filter empty ones
    const content = completion.choices[0].message.content || '';
    const groups = content.split(/\d+\./)
      .filter(Boolean)
      .map(group => {
        return group
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^[•-]\s*/, '').trim())
          .filter(line => line.length > 0); // Filter out empty lines
      })
      .filter(group => group.length > 0); // Filter out empty groups

    if (groups.length === 0) {
      return res.status(400).json({ message: 'Failed to generate meaningful suggestions' });
    }

    res.status(200).json({ 
      suggestions: groups,
      explanation: "Click on a group of suggestions to apply them all at once."
    });

  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
} 