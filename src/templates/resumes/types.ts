export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
  template: string;
}

export interface ResumeTemplateData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    title?: string;
    summary?: string;
    linkedin?: string;
    website?: string;
    github?: string;
  };
  experiences?: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  educations?: Array<{
    school: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    gpa?: string;
    achievements: string[];
  }>;
  skills?: Array<{
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    category: string;
  }>;
  projects?: Array<{
    title: string;
    description: string;
    technologies: string[];
    url?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    highlights: string[];
  }>;
  publications?: Array<{
    title: string;
    authors: string;
    journal: string;
    date: string;
    doi?: string;
  }>;
  skillsByCategory?: Record<string, string[]>;
} 