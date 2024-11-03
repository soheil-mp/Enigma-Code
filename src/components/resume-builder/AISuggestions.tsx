import { motion } from 'framer-motion';
import { useState } from 'react';

interface AISuggestionsProps {
  section: string;
  onApplySuggestion: (suggestion: string) => void;
}

export default function AISuggestions({ section, onApplySuggestion }: AISuggestionsProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = async () => {
    setLoading(true);
    // TODO: Implement AI API call
    // Simulated response
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuggestions([
      'Suggestion 1...',
      'Suggestion 2...',
      'Suggestion 3...'
    ]);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-4 p-4 bg-indigo-50 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
        </div>
        <button
          onClick={getSuggestions}
          disabled={loading}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {loading ? 'Generating...' : 'Get Suggestions'}
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-2 bg-white rounded-lg flex items-center justify-between"
            >
              <p className="text-sm text-gray-700">{suggestion}</p>
              <button
                onClick={() => onApplySuggestion(suggestion)}
                className="text-xs text-indigo-600 hover:text-indigo-700"
              >
                Apply
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
} 