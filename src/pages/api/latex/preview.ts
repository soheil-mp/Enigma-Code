import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promisify } from 'util';
import { pdf2png } from 'pdf-poppler';

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

    // Convert PDF to PNG using pdf-poppler
    const pdfPath = join(tempDir, 'resume.pdf');
    const opts = {
      format: 'png',
      out_dir: tempDir,
      out_prefix: 'preview',
      page: 1
    };

    await pdf2png(pdfPath, opts);

    // Read the preview image
    const previewImage = await readFile(join(tempDir, 'preview-1.png'));
    
    // Convert to base64
    const base64Image = previewImage.toString('base64');
    
    res.json({ previewUrl: `data:image/png;base64,${base64Image}` });

  } catch (error) {
    console.error('Preview generation error:', error);
    res.status(500).json({ message: 'Failed to generate preview' });
  }
} 