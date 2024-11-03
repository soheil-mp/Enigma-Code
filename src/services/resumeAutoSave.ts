import debounce from 'lodash/debounce';

export const autoSave = debounce(async (data: any) => {
  try {
    // TODO: Implement API call to save data
    localStorage.setItem('resume_draft', JSON.stringify(data));
    console.log('Auto-saved:', data);
  } catch (error) {
    console.error('Auto-save failed:', error);
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