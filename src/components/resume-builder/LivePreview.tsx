import { useState, useEffect } from 'react';

interface LivePreviewProps {
  latexContent: string;
  onDownloadPDF: () => void;
}

export default function LivePreview({ latexContent, onDownloadPDF }: LivePreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Sending LaTeX content to compile:', latexContent);
        
        const response = await fetch('/api/latex/compile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latex: latexContent }),
        });

        console.log('Compile response status:', response.status);

        if (!response.ok) {
          let errorMessage: string;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || 'Failed to generate PDF';
          } catch {
            errorMessage = response.statusText || 'Failed to generate PDF';
          }
          throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/pdf')) {
          throw new Error('Invalid response format');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error details:', error);
        setError(error instanceof Error ? error.message : 'Failed to generate preview');
      } finally {
        setIsLoading(false);
      }
    };

    if (latexContent) {
      generatePreview();
    }

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [latexContent]);

  return (
    <div className="relative h-full">
      {/* Download button */}
      <button
        onClick={onDownloadPDF}
        className="absolute top-4 right-4 z-10 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Download PDF
      </button>

      {/* Preview container */}
      <div className="h-full overflow-auto p-8 bg-white shadow-inner">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            <p className="text-sm text-gray-600">Generating preview...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-red-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              Try again
            </button>
          </div>
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="Resume Preview"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No preview available
          </div>
        )}
      </div>
    </div>
  );
} 