import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'No content provided' });
    }

    // Create a temporary directory for this job
    const jobId = uuidv4();
    const tempDir = path.join(process.cwd(), 'temp', jobId);
    await fs.mkdir(tempDir, { recursive: true });

    // Write LaTeX content to file
    const texFile = path.join(tempDir, 'resume.tex');
    await fs.writeFile(texFile, content);

    // Run pdflatex
    await execAsync(`pdflatex -output-directory=${tempDir} ${texFile}`);

    // Read the generated PDF
    const pdfFile = path.join(tempDir, 'resume.pdf');
    const pdfContent = await fs.readFile(pdfFile);

    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true });

    // Send PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfContent);

  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}; 