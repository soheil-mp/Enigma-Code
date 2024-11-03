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

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      id,
      title,
      template,
      personalInfo,
      experiences,
      education,
      skills,
      languages,
      projects,
      certifications
    } = req.body;

    // Find existing resume for this user
    const existingResume = await prisma.resume.findFirst({
      where: {
        userId: user.id,
        title: title || 'My Resume'
      }
    });

    // Create or update resume
    const resume = await prisma.resume.upsert({
      where: {
        id: existingResume?.id || 'new',
      },
      update: {
        template,
        personalInfo: personalInfo as any,
        experiences: experiences as any[],
        education: education as any[],
        skills: skills as any[],
        languages: languages as any[],
        projects: projects as any[],
        certifications: certifications as any[]
      },
      create: {
        userId: user.id,
        title: title || 'My Resume',
        template,
        personalInfo: personalInfo as any,
        experiences: experiences as any[],
        education: education as any[],
        skills: skills as any[],
        languages: languages as any[],
        projects: projects as any[],
        certifications: certifications as any[]
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