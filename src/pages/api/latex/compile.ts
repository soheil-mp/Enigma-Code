import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { latex: latexContent } = req.body;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add a page to the document
    const page = pdfDoc.addPage([595.276, 841.890]); // A4 size in points
    
    // Embed the default font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    
    // Get the page dimensions
    const { width, height } = page.getSize();
    
    // Add content to the page
    page.drawText('Resume', {
      x: 50,
      y: height - 50,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    // Convert LaTeX content to simple text
    const textContent = latexContent
      .replace(/\\section\{(.*?)\}/g, '$1\n')
      .replace(/\\textbf\{(.*?)\}/g, '$1')
      .replace(/\\textit\{(.*?)\}/g, '$1')
      .replace(/\\item\s/g, '• ')
      .replace(/\\begin\{.*?\}|\\end\{.*?\}/g, '')
      .replace(/\\\\/g, '\n');

    // Draw the content
    page.drawText(textContent, {
      x: 50,
      y: height - 100,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
      lineHeight: fontSize * 1.2,
      maxWidth: width - 100,
    });

    // Serialize the PDF to bytes
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