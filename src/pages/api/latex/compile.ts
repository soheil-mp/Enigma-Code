import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { content } = req.body;
    const tempDir = join(process.cwd(), 'temp', uuidv4());
    
    // Create temp directory
    await mkdir(tempDir, { recursive: true });
    
    // Write LaTeX content to file
    const texPath = join(tempDir, 'resume.tex');
    await writeFile(texPath, content);

    // Compile LaTeX to PDF
    await execAsync(`pdflatex -interaction=nonstopmode -output-directory=${tempDir} ${texPath}`);

    // Read the generated PDF
    const pdfPath = join(tempDir, 'resume.pdf');
    const pdfContent = await readFile(pdfPath);

    // Send PDF back to client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfContent);

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
} 