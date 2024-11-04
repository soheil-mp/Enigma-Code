import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb } from 'pdf-lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { latex: latexContent } = req.body;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add a page
    const page = pdfDoc.addPage([595.276, 841.890]); // A4 size
    
    // Draw content
    const { width, height } = page.getSize();
    page.drawText('Resume Preview', {
      x: 50,
      y: height - 50,
      size: 24,
      color: rgb(0, 0, 0),
    });

    // Add the LaTeX content as text (temporary solution)
    const lines = latexContent.split('\n');
    let yPosition = height - 100;
    const lineHeight = 14;

    for (const line of lines) {
      if (yPosition < 50) { // Add new page if needed
        const newPage = pdfDoc.addPage([595.276, 841.890]);
        yPosition = height - 50;
      }

      // Skip LaTeX commands for now
      if (!line.trim().startsWith('\\')) {
        page.drawText(line.trim(), {
          x: 50,
          y: yPosition,
          size: 12,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
      }
    }

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');

    // Send the PDF
    res.send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      message: 'PDF generation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 