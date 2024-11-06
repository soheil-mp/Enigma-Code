import axios from 'axios';

interface AIResponse {
  suggestions: string[] | string[][];
  explanation?: string;
  score?: number;
}

export const aiService = {
  // Get AI suggestions for job descriptions
  async getDescriptionSuggestions(role: string, company: string): Promise<AIResponse> {
    try {
      const response = await axios.post('/api/ai/suggestions/description', {
        role,
        company
      });
      return response.data;
    } catch (error) {
      console.error('AI Description Error:', error);
      throw new Error('Failed to get AI suggestions');
    }
  },

  // Get skill recommendations based on job title
  async getSkillSuggestions(jobTitle: string, existingSkills: string[] = []): Promise<AIResponse> {
    try {
      const response = await axios.post('/api/ai/suggestions/skills', {
        jobTitle,
        existingSkills
      });
      return response.data;
    } catch (error) {
      console.error('AI Skills Error:', error);
      throw new Error('Failed to get skill suggestions');
    }
  },

  // Get AI feedback on resume content
  async getResumeFeedback(content: any): Promise<AIResponse> {
    try {
      const response = await axios.post('/api/ai/feedback', {
        content,
        industry: content.industry || 'software'
      });
      return response.data;
    } catch (error) {
      console.error('AI Feedback Error:', error);
      throw new Error('Failed to get resume feedback');
    }
  },

  // Optimize content for ATS
  async optimizeForATS(content: string, jobDescription: string): Promise<AIResponse> {
    try {
      const response = await axios.post('/api/ai/optimize', {
        content,
        jobDescription
      });
      return response.data;
    } catch (error) {
      console.error('AI Optimization Error:', error);
      throw new Error('Failed to optimize for ATS');
    }
  }
}; 