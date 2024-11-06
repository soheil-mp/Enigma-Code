import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define industry-specific achievement metrics
const achievementMetrics = {
  software: ['performance improvements', 'user adoption', 'code quality', 'deployment time'],
  management: ['team growth', 'project delivery', 'cost savings', 'efficiency gains'],
  sales: ['revenue growth', 'client acquisition', 'deal size', 'retention rates'],
  marketing: ['campaign performance', 'lead generation', 'conversion rates', 'ROI'],
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { role, company, industry = 'software' } = req.body;

    const systemPrompt = `You are an expert resume writer with extensive experience in the ${industry} industry.
Your goal is to create impactful bullet points that:
- Start with strong action verbs
- Include specific metrics and achievements
- Focus on results and impact rather than just responsibilities
- Demonstrate leadership and initiative
- Highlight relevant technical skills and tools
- Use industry-standard terminology

Format each set of bullet points to tell a cohesive story about different aspects:
1. Technical achievements and innovations
2. Leadership and team collaboration
3. Project management and delivery`;

    const userPrompt = `Create 3 sets of bullet points for a ${role} position at ${company}.
Each set should focus on a different aspect of the role and include measurable achievements.

Consider these metrics for impact measurement:
${achievementMetrics[industry as keyof typeof achievementMetrics]?.join(', ')}

Format as:
1. [Technical Impact]
• [Achievement with metrics]
• [Achievement with metrics]
• [Achievement with metrics]

2. [Leadership & Collaboration]
• [Achievement with metrics]
• [Achievement with metrics]
• [Achievement with metrics]

3. [Project Delivery]
• [Achievement with metrics]
• [Achievement with metrics]
• [Achievement with metrics]

Use specific numbers, percentages, and timeframes where possible.`;

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
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.3, // Encourage some creativity
      frequency_penalty: 0.5, // Avoid repetitive language
    });

    const content = completion.choices[0].message.content || '';
    
    // Split by numbered sections and process each group
    const groups = content
      .split(/\d+\.\s*(?:\[.*?\])?/)
      .filter(group => group.trim().length > 0)
      .map(group => {
        return group
          .split('\n')
          .map(line => line.trim())
          .filter(line => {
            const cleaned = line.replace(/^[•-]\s*/, '').trim();
            return cleaned.length > 0 && 
                   !cleaned.endsWith(':') && 
                   !cleaned.toLowerCase().includes('position at');
          })
          .map(line => line.replace(/^[•-]\s*/, '').trim());
      })
      .filter(group => group.length > 0);

    if (groups.length === 0) {
      return res.status(400).json({ message: 'Failed to generate meaningful suggestions' });
    }

    res.status(200).json({ 
      suggestions: groups,
      explanation: "Each set focuses on different aspects of your role. Choose the set that best highlights your achievements."
    });

  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ message: 'Failed to generate suggestions' });
  }
} 