import axios from 'axios';

// Update this to your actual LaTeX service URL
const LATEX_SERVICE_URL = process.env.NEXT_PUBLIC_LATEX_SERVICE_URL || '/api/latex';

export const generatePDF = async (latexContent: string): Promise<Blob> => {
  try {
    // First validate that we have content
    if (!latexContent) {
      throw new Error('No LaTeX content provided');
    }

    const response = await axios.post(LATEX_SERVICE_URL, 
      { content: latexContent },
      { 
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to generate PDF');
    }

    return new Blob([response.data], { type: 'application/pdf' });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const downloadPDF = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}; 