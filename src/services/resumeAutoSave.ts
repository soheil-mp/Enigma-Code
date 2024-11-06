import { saveResume } from './resumeService';
import debounce from 'lodash/debounce';

interface ResumeData {
  personalInfo?: {
    firstName?: string;
    [key: string]: any;
  };
  template?: string;
  [key: string]: any;
}

export const autoSave = debounce(async (data: ResumeData) => {
  try {
    // Save to localStorage as backup
    localStorage.setItem('resume_draft', JSON.stringify(data));
    
    // Create a default title if firstName is not available
    const title = data?.personalInfo?.firstName 
      ? `${data.personalInfo.firstName}'s Resume`
      : 'My Resume';
    
    // Save to database
    await saveResume({
      title,
      template: data?.template || 'modern',
      ...data
    });
    
    console.log('Auto-saved:', data);
  } catch (error) {
    console.error('Auto-save failed:', error);
    // Keep data in localStorage even if database save fails
  }
}, 1000);

export const loadDraft = () => {
  try {
    const draft = localStorage.getItem('resume_draft');
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}; 