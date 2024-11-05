export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  experience: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects?: {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
}

export type TemplateId = 'professional';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  template: string;
  features: string[];
} 