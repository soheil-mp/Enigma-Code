import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      title = 'My Resume',
      template = 'modern',
      personalInfo = {},
      experiences = [],
      education = [],
      skills = [],
      languages = [],
      projects = [],
      certifications = []
    } = req.body;

    // Validate required fields
    if (!personalInfo || !Array.isArray(experiences) || !Array.isArray(education) || !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const resumeData = {
      title,
      template,
      content: {
        personalInfo,
        experiences,
        education,
        skills,
        languages,
        projects,
        certifications
      }
    };

    const existingResume = await prisma.resume.findFirst({
      where: { userId: user.id }
    });

    const resume = existingResume 
      ? await prisma.resume.update({
          where: { id: existingResume.id },
          data: resumeData
        })
      : await prisma.resume.create({
          data: {
            userId: user.id,
            ...resumeData
          }
        });

    return res.status(200).json(resume);
  } catch (error) {
    console.error('Resume save error:', error);
    return res.status(500).json({ 
      message: 'Error saving resume',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 