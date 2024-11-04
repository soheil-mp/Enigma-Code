export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  template: string; // LaTeX template content
  preview: string; // Path to preview image
  features: string[];
}

export interface ResumeTemplateData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    linkedin?: string;
    website?: string;
  };
  experiences: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  // ... rest of the data structure
} 