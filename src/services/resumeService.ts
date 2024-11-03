import axios from 'axios';

export async function saveResume(data: {
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
    const response = await axios.post('/api/resumes/save', data);
    return response.data;
  } catch (error) {
    console.error('Resume save error:', error);
    throw new Error('Failed to save resume');
  }
}

export async function loadResume(userId: string) {
  try {
    const response = await axios.get(`/api/resumes/load`);
    return response.data;
  } catch (error) {
    console.error('Resume load error:', error);
    throw new Error('Failed to load resume');
  }
} 