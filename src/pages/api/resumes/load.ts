import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

// Move prisma client outside handler to prevent multiple instances
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Log to debug session
    const session = await getServerSession(req, res, authOptions);
    console.log('Session:', session);

    if (!session?.user?.email) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Debug log
    console.log('Looking up user with email:', session.user.email);

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    // Debug log
    console.log('Found user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Debug log
    console.log('Looking up resume for user ID:', user.id);

    // Get the most recent resume for this user
    const resume = await prisma.resume.findFirst({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Debug log
    console.log('Found resume:', resume);

    if (!resume) {
      return res.status(200).json({
        title: '',
        template: 'modern',
        personalInfo: {},
        experiences: [],
        education: [],
        skills: [],
        languages: [],
        projects: [],
        certifications: []
      });
    }

    return res.status(200).json(resume);
  } catch (error) {
    // Enhanced error logging
    console.error('Resume load error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return res.status(500).json({ 
      message: 'Error loading resume',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    // Clean up
    await prisma.$disconnect()
  }
} 