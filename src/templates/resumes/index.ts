import { TemplateConfig } from './types';
import professionalTemplate from './professional/template.tex';

export const templates: TemplateConfig[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean and professional template suitable for most industries',
    preview: '/images/templates/professional.png',
    template: professionalTemplate,
    features: ['ATS-Friendly', 'Clean Design', 'Professional Layout']
  }
];

export const getTemplate = (templateId: string): TemplateConfig => {
  const template = templates.find(t => t.id === templateId);
  if (!template) {
    throw new Error(`Template ${templateId} not found`);
  }
  return template;
}; 