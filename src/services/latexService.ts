import { CompilationError, TemplateError } from '@/utils/errors';

export async function generatePDF(latexContent: string): Promise<Blob> {
  try {
    if (!latexContent.trim()) {
      throw new TemplateError('Empty LaTeX content');
    }

    const cleanedContent = latexContent
      .replace(/\r\n/g, '\n')  // Normalize line endings
      .replace(/\n{3,}/g, '\n\n');  // Remove excessive blank lines

    const response = await fetch('/api/latex/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latex: cleanedContent }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error) {
        throw new CompilationError(
          errorData.error.message,
          errorData.error.details
        );
      }
      throw new Error('Failed to generate PDF');
    }

    return await response.blob();
  } catch (error) {
    console.error('PDF generation error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred during PDF generation');
  }
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
} 