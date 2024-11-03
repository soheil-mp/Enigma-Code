import axios from 'axios';

export async function saveResume(data: {
  id?: string;
  title: string;
  template: string;
  personalInfo: any;
  experiences: any[];
  education: any[];
  skills: any[];
  languages: any[];
  projects: any[];
  certifications: any[];
}) {
  try {
    const response = await axios.post('/api/resumes/save', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data) {
      throw new Error('No data received from server');
    }
    
    return response.data;
  } catch (error) {
    console.error('Resume save error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to save resume');
  }
}

export async function loadResume(userId: string) {
  try {
    const response = await axios.get(`/api/resumes/load?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to load resume');
  }
} 