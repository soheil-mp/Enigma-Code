import { useState, useEffect } from 'react';

interface LivePreviewProps {
  latexContent: string;
  onDownloadPDF: () => void;
}

export default function LivePreview({ latexContent, onDownloadPDF }: LivePreviewProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Convert LaTeX content to HTML preview
    const convertToHtml = (latex: string) => {
      // Basic conversion of LaTeX to HTML
      let html = latex
        .replace(/\\section\{(.*?)\}/g, '<h2 class="text-xl font-bold mb-4">$1</h2>')
        .replace(/\\textbf\{(.*?)\}/g, '<strong>$1</strong>')
        .replace(/\\textit\{(.*?)\}/g, '<em>$1</em>')
        .replace(/\\item\s(.*?)(?=\\item|\\end\{itemize\}|$)/g, '<li>$1</li>')
        .replace(/\\begin\{itemize\}(.*?)\\end\{itemize\}/gs, '<ul class="list-disc pl-5 space-y-2">$1</ul>')
        .replace(/\\href\{(.*?)\}\{(.*?)\}/g, '<a href="$1" class="text-blue-600 hover:underline">$2</a>');

      setHtmlContent(html);
    };

    convertToHtml(latexContent);
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
        <div 
          className="max-w-[800px] mx-auto prose prose-sm"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
} 