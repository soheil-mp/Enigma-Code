import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { CompilationError } from '@/utils/errors';
import { errorHandler } from '@/middleware/errorHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { latex: latexContent } = req.body;
    if (!latexContent) {
      throw new CompilationError('No LaTeX content provided');
    }

    const tempDir = path.join(os.tmpdir(), 'enigma-latex', uuidv4());
    
    // Create temp directory
    await fs.mkdir(tempDir, { recursive: true });
    const texFile = path.join(tempDir, 'resume.tex');
    
    // Write LaTeX content to file
    await fs.writeFile(texFile, latexContent);

    // Run pdflatex
    const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
      exec(
        `pdflatex -interaction=nonstopmode -output-directory="${tempDir}" "${texFile}"`,
        (error, stdout, stderr) => {
          if (error && !existsSync(path.join(tempDir, 'resume.pdf'))) {
            reject(new CompilationError('LaTeX compilation failed', stderr));
            return;
          }
          resolve({ stdout, stderr });
        }
      );
    });

    // Read the generated PDF
    const pdfPath = path.join(tempDir, 'resume.pdf');
    const pdfContent = await fs.readFile(pdfPath);

    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });

    // Send the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.send(pdfContent);

  } catch (error) {
    errorHandler(error, req, res);
  }
} 