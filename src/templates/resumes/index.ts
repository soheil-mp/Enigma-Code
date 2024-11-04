// Import templates as raw text
const modernTemplate = `% Modern Resume Template...`; // Copy content from modern/template.tex
const professionalTemplate = `% Professional Resume Template...`; // Copy content from professional/template.tex
const creativeTemplate = `% Creative Resume Template...`; // Copy content from creative/template.tex
const minimalTemplate = `% Minimal Resume Template...`; // Copy content from minimal/template.tex

export const templates = [
  { 
    id: 'modern', 
    name: 'Modern', 
    description: 'Clean and contemporary design',
    template: modernTemplate,
    preview: '/templates/modern-preview.png',
    fallbackPreview: 'https://via.placeholder.com/300x400?text=Modern+Template',
    features: ['Clean layout', 'Professional fonts', 'Minimalist design']
  },
  { 
    id: 'professional', 
    name: 'Professional', 
    description: 'Traditional and elegant layout',
    template: professionalTemplate,
    preview: '/templates/professional-preview.png',
    fallbackPreview: 'https://via.placeholder.com/300x400?text=Professional+Template',
    features: ['Classic style', 'ATS-friendly', 'Structured sections']
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    description: 'Unique and eye-catching design',
    template: creativeTemplate,
    preview: '/templates/creative-preview.png',
    fallbackPreview: 'https://via.placeholder.com/300x400?text=Creative+Template',
    features: ['Bold colors', 'Custom sections', 'Visual elements']
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    description: 'Simple and straightforward presentation',
    template: minimalTemplate,
    preview: '/templates/minimal-preview.png',
    fallbackPreview: 'https://via.placeholder.com/300x400?text=Minimal+Template',
    features: ['Space-efficient', 'Easy to read', 'Focus on content']
  }
];

export type Template = typeof templates[0]; 