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
    const { jobTitle, existingSkills = [] } = req.body;

    const systemPrompt = `You are an expert technical recruiter. 
Your task is to suggest individual skills for the given position.
Each suggestion should be a single, specific skill.
Do not include descriptions, categories, or explanations.
Do not suggest any of these existing skills: ${existingSkills.join(', ')}
Format as:
Set 1:
- Skill

Set 2:
- Skill

Set 3:
- Skill`;

    const userPrompt = `List 3 different individual skills that would be valuable for a ${jobTitle} position.
Each suggestion should be a single skill name.
Keep it concise and specific (e.g., "Python" instead of "Python Programming").
Do not include any descriptions or explanations.
Do not suggest any skills that are already in use: ${existingSkills.join(', ')}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: systemPrompt
        },
        { 
          role: "user", 
          content: userPrompt
        }
      ],
      temperature: 0.6,
      max_tokens: 200,
      presence_penalty: 0.2,
      frequency_penalty: 0.4,
    });

    // Process the response to get single skills
    const content = completion.choices[0].message.content || '';
    const skillSets = content
      .split(/Set \d+:/)
      .filter(set => set.trim().length > 0)
      .map(set => [
        set
          .split('\n')
          .map(line => line.replace(/^[-•]\s*/, '').trim())
          .filter(line => line.length > 0)[0] // Take only the first skill from each set
      ])
      .filter(set => set[0]) // Filter out empty sets
      .filter(([skill]) => !existingSkills.includes(skill)); // Filter out existing skills

    res.status(200).json({ 
      suggestions: skillSets,
      explanation: "Click on a skill to add it to your resume."
    });

  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
} 