import axios from 'axios';

export async function saveResume(data: {
  title: string;
  template: string;
  personalInfo: any;
  experiences: any[];
  education: any[];
  skills: any[];
  languages?: any[];
  projects?: any[];
  certifications?: any[];
}) {
  try {
    const response = await axios.post('/api/resumes/save', data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Resume save error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Please sign in to save your resume');
      }
      throw new Error(error.response?.data?.message || 'Failed to save resume');
    }
    throw new Error('Failed to save resume');
  }
}

export async function loadResume(userId: string) {
  try {
    const response = await axios.get(`/api/resumes/load`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific HTTP error responses
      if (error.response?.status === 404) {
        // Return empty resume data if none found
        return {
          title: '',
          template: 'modern',
          personalInfo: {},
          experiences: [],
          education: [],
          skills: [],
          languages: [],
          projects: [],
          certifications: []
        };
      }
      throw new Error(error.response?.data?.message || 'Failed to load resume');
    }
    throw new Error('Failed to load resume');
  }
} 