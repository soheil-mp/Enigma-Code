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
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-8 border border-indigo-100/50">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-indigo-500/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent blur-3xl" />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-3xl">🤖</span>
              </div>
              {/* Decorative dots */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full animate-pulse" />
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-75" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  AI Resume Analyzer
                </span>
              </h2>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Powered by Advanced AI
              </p>
            </div>
          </div>

          {feedback?.overallScore && (
            <div className="relative group">
              <div className="relative">
                {/* Circular progress indicator */}
                <div className="w-24 h-24 rounded-full relative">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-indigo-600 transition-all duration-1000"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 42}`,
                        strokeDashoffset: `${2 * Math.PI * 42 * (1 - feedback.overallScore / 100)}`,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                      }}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-2xl font-bold text-indigo-600">{feedback.overallScore}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  Resume Score
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Analyze Button */}
      {!feedback && !loading && (
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(79, 70, 229, 0.15)" }}
          whileTap={{ scale: 0.98 }}
          onClick={getFeedback}
          className="relative w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl transition-all duration-200 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          <div className="relative flex items-center justify-center gap-3">
            <span className="text-lg font-medium">Analyze Resume</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </motion.button>
      )}

      {/* Enhanced Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-center">
            <p className="text-gray-800 font-medium">Analyzing your resume...</p>
            <p className="text-gray-500 text-sm">This might take a few seconds</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Competitive Analysis */}
            {feedback?.competitiveAnalysis && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Resume Analysis Overview</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-50/50 rounded-xl p-5 border border-green-100">
                    <h5 className="flex items-center gap-2 text-green-700 font-medium mb-4">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Key Strengths
                    </h5>
                    <ul className="space-y-3">
                      {feedback.competitiveAnalysis.strengths?.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
                    <h5 className="flex items-center gap-2 text-amber-700 font-medium mb-4">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Areas to Improve
                    </h5>
                    <ul className="space-y-3">
                      {feedback.competitiveAnalysis.gaps?.map((gap, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {feedback.competitiveAnalysis.industryComparison && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700">
                    <p className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {feedback.competitiveAnalysis.industryComparison}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Section Feedback */}
            <div className="space-y-6">
              {feedback.sections && Object.entries(feedback.sections).map(([section, data]) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium capitalize text-gray-900">{section}</h4>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      data.score >= 80 ? 'bg-green-100 text-green-700' :
                      data.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {data.score}/100
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{data.feedback}</p>
                  <div className="space-y-3">
                    {data.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-50/80 transition-colors">
                        <p className="text-gray-800 mb-3 whitespace-pre-wrap">{suggestion}</p>
                        <button
                          onClick={() => onApplyFeedback(section, suggestion)}
                          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm group"
                        >
                          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Apply this version
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Language Improvements */}
            {feedback?.languageImprovements && Array.isArray(feedback.languageImprovements) && feedback.languageImprovements.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-3">Language Improvements</h4>
                <div className="space-y-3">
                  {feedback.languageImprovements.map((improvement, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm">
                        <div className="text-gray-500 line-through">{improvement.text}</div>
                        <div className="text-green-600 mt-1">→ {improvement.suggestion}</div>
                        <div className="text-gray-600 text-xs mt-1">{improvement.reason}</div>
                      </div>
                      <button
                        onClick={() => onApplyFeedback('language', improvement.suggestion)}
                        className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mt-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Apply this improvement
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden p-4 bg-red-50 border border-red-100 rounded-xl"
        >
          <div className="absolute inset-0 bg-grid-red-500/5" />
          <div className="relative flex items-center gap-3 text-red-700">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Error</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
      </div>
    </div>
  );
} 