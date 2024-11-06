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

    const resumeContext = {
      fullName: `${content.personalInfo?.firstName || ''} ${content.personalInfo?.lastName || ''}`.trim(),
      currentRole: content.personalInfo?.title || '',
      summary: content.personalInfo?.summary || '',
      experience: content.experiences?.map((exp: any) => ({
        role: exp.title,
        company: exp.company,
        duration: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
        description: exp.description,
        achievements: exp.achievements
      })),
      skills: content.skills?.map((skill: any) => ({
        name: skill.name,
        category: skill.category,
        level: skill.level
      })),
      education: content.education?.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        graduationYear: edu.graduationYear
      })),
      projects: content.projects?.map((project: any) => ({
        name: project.name,
        description: project.description,
        technologies: project.technologies
      }))
    };

    const systemPrompt = `You are an expert resume writer and career coach with deep knowledge of ${industry} industry standards.
Your task is to analyze the resume and provide READY-TO-USE content improvements.

Guidelines:
1. For each section, provide actual rewritten content, not instructions
2. Use the candidate's real experience and achievements
3. Maintain professional tone while improving impact
4. Include specific metrics and achievements from their experience
5. Keep the candidate's original information but enhance the presentation

When suggesting improvements:
- Generate complete, ready-to-use text that can directly replace existing content
- Include specific details from their actual experience
- Maintain the same facts but present them more effectively
- For summary suggestions, write complete summary paragraphs
- For experience suggestions, write complete bullet points
- For skills suggestions, write complete skill descriptions`;

    const userPrompt = `Analyze this resume and provide ready-to-use content improvements:

${JSON.stringify(resumeContext, null, 2)}

Provide feedback in this exact JSON structure:
{
  "overallScore": number,
  "sections": {
    "summary": {
      "score": number,
      "feedback": "specific feedback",
      "suggestions": [
        "Complete, ready-to-use professional summary incorporating their actual experience",
        "Alternative summary highlighting different aspects of their background"
      ]
    },
    "experience": {
      "score": number,
      "feedback": "specific feedback",
      "suggestions": [
        "Rewritten bullet point with actual metrics and achievements",
        "Enhanced description of real accomplishments"
      ]
    },
    "skills": {
      "score": number,
      "feedback": "specific feedback",
      "suggestions": [
        "Reorganized skill section with actual technologies",
        "Alternative skill grouping based on their real expertise"
      ]
    },
    "education": {
      "score": number,
      "feedback": "specific feedback",
      "suggestions": [
        "Improved presentation of actual educational background",
        "Enhanced format for academic achievements"
      ]
    }
  },
  "languageImprovements": [
    {
      "text": "original text from their resume",
      "suggestion": "improved version maintaining same facts",
      "reason": "explanation of the improvement"
    }
  ],
  "competitiveAnalysis": {
    "strengths": ["actual strength from their experience"],
    "gaps": ["specific improvement area based on their background"],
    "industryComparison": "comparison based on their actual experience"
  }
}

Important: All suggestions must be complete, ready-to-use content based on their actual experience, not instructions or placeholders.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 2000,
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