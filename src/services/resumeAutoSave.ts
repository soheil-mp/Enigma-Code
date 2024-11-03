import { saveResume } from './resumeService';
import debounce from 'lodash/debounce';

export const autoSave = debounce(async (data: any) => {
  try {
    // Save to localStorage as backup
    localStorage.setItem('resume_draft', JSON.stringify(data));
    
    // Save to database
    await saveResume({
      title: `${data.personalInfo.firstName}'s Resume`,
      template: data.template || 'modern',
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