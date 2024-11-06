import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '@/services/aiService';

interface AIFeedbackProps {
  resumeData: any;
  onApplyFeedback: (section: string, suggestion: string) => void;
}

interface FeedbackData {
  overallScore: number;
  sections: {
    [key: string]: {
      score: number;
      feedback: string;
      suggestions: string[];
    };
  };
  languageImprovements: Array<{
    text: string;
    suggestion: string;
    reason: string;
  }>;
  competitiveAnalysis: {
    strengths: string[];
    gaps: string[];
    industryComparison: string;
  };
}

interface SectionScore {
  score: number;
  suggestions: string[];
  keywords: string[];
}

export default function AIFeedback({ resumeData, onApplyFeedback }: AIFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sectionScores, setSectionScores] = useState<Record<string, SectionScore>>({});

  const getFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await aiService.getResumeFeedback(resumeData);
      setFeedback(response as FeedbackData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get feedback');
    } finally {
      setLoading(false);
    }
  };

  const renderScoreBadge = (score: number) => {
    const color = score >= 80 ? 'bg-green-100 text-green-800' :
                 score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                 'bg-red-100 text-red-800';
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {score}/100
      </span>
    );
  };

  const analyzeSectionContent = async (section: string, content: any) => {
    const score = await aiService.analyzeSection(section, content);
    setSectionScores(prev => ({
      ...prev,
      [section]: score
    }));
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Resume Analysis</h3>
          <p className="text-sm text-gray-600">Get detailed feedback on your resume</p>
        </div>
        {feedback?.overallScore && (
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{feedback.overallScore}</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
        )}
      </div>

      {!feedback && !loading && (
        <button
          onClick={getFeedback}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Analyze Resume
        </button>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Section Feedback */}
            <div className="space-y-4">
              {feedback.sections && Object.entries(feedback.sections).map(([section, data]) => (
                <div key={section} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-md font-medium capitalize">{section}</h4>
                    {renderScoreBadge(data.score)}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{data.feedback}</p>
                  <div className="space-y-2">
                    {data.suggestions.map((suggestion: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => onApplyFeedback(section, suggestion)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 block"
                      >
                        → Apply this suggestion
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Language Improvements */}
            {feedback.languageImprovements && feedback.languageImprovements.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-3">Language Improvements</h4>
                <div className="space-y-3">
                  {feedback.languageImprovements.map((improvement, index) => (
                    <div key={index} className="text-sm">
                      <div className="text-gray-500 line-through">{improvement.text}</div>
                      <div className="text-green-600">→ {improvement.suggestion}</div>
                      <div className="text-gray-600 text-xs mt-1">{improvement.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competitive Analysis */}
            {feedback.competitiveAnalysis && (
              <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-3">Industry Comparison</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-green-600 mb-2">Strengths</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {feedback.competitiveAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-700">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-red-600 mb-2">Areas to Improve</h5>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {feedback.competitiveAnalysis.gaps.map((gap, index) => (
                        <li key={index} className="text-gray-700">{gap}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-4">
                  {feedback.competitiveAnalysis.industryComparison}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 