import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiService } from '@/services/aiService';

interface AISuggestionsProps {
  onApplySuggestion: (suggestion: string | string[]) => void;
  type: 'description' | 'skills' | 'feedback' | 'ats';
  context: {
    role?: string;
    company?: string;
    jobTitle?: string;
    existingSkills?: string[];
  };
}

export default function AISuggestions({ onApplySuggestion, type, context }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (type) {
        case 'description':
          if (!context.role || !context.company) {
            throw new Error('Please fill in the job title and company first');
          }
          response = await aiService.getDescriptionSuggestions(
            context.role,
            context.company
          );
          break;
        case 'skills':
          if (!context.jobTitle) {
            throw new Error('Please fill in your professional title first');
          }
          response = await aiService.getSkillSuggestions(
            context.jobTitle,
            context.existingSkills || []
          );
          break;
        default:
          throw new Error('Invalid suggestion type');
      }
      
      if (response?.suggestions) {
        const filteredSuggestions = Array.isArray(response.suggestions[0]) 
          ? response.suggestions.filter(group => 
              group.some(item => item.trim().length > 0)
            ).map(group => 
              group.filter(item => item.trim().length > 0)
            )
          : [response.suggestions.filter(item => item.trim().length > 0)];

        if (filteredSuggestions.some(group => group.length > 0)) {
          setSuggestions(filteredSuggestions);
        } else {
          throw new Error('No valid suggestions received');
        }
      } else {
        throw new Error('No suggestions received');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh suggestions when one is selected
  const handleSuggestionClick = async (suggestion: string[], groupIndex: number) => {
    onApplySuggestion(suggestion);
    
    // Remove the used suggestion
    const newSuggestions = suggestions.filter((_, index) => index !== groupIndex);
    setSuggestions(newSuggestions);

    // If we're running low on suggestions, get more
    if (newSuggestions.length < 2) {
      await getSuggestions();
    }
  };

  return (
    <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
          <span className="text-sm">💡</span>
        </div>
        <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!suggestions.length && !loading && (
        <button
          onClick={getSuggestions}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get AI Suggestions
        </button>
      )}

      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 mt-4"
          >
            {suggestions.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSuggestionClick(group, groupIndex)}
              >
                <div className="text-xs font-medium text-gray-500 mb-2">Option {groupIndex + 1}</div>
                {group.map((suggestion, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 