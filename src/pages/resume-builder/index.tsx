import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useFormValidation } from '@/hooks/useFormValidation';
import { useResumeShortcuts } from '@/hooks/useResumeShortcuts';
import { autoSave, loadDraft } from '@/services/resumeAutoSave';
import FormField from '@/components/common/FormField';
import AISuggestions from '@/components/resume-builder/AISuggestions';
import ResumePreview from '@/components/resume-builder/ResumePreview';
import Image from 'next/image'
import { saveResume } from '@/services/resumeService';
import Notification from '@/components/common/Notification';
import { loadResume } from '@/services/resumeService';
import { templates } from '@/templates/resumes';
import LivePreview from '@/components/resume-builder/LivePreview';
import { generatePDF, downloadPDF } from '@/services/latexService';
import LoadingSpinner from '@/components/LoadingSpinner';
import AIFeedback from '@/components/resume-builder/AIFeedback';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  linkedin?: string;
  website?: string;
  address: string;
  city: string;
  country: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  achievements: string[];
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Native';
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
}

interface ValidationError {
  field: string;
  message: string;
}

interface SectionValidation {
  errors: ValidationError[];
  isValid: boolean;
}

// Add this type for language proficiency levels
type LanguageProficiency = 'Basic' | 'Conversational' | 'Professional' | 'Native';

// Add this helper object for proficiency level details
const proficiencyLevels: Record<LanguageProficiency, { color: string, description: string, percentage: number }> = {
  'Basic': {
    color: 'bg-blue-100 text-blue-600',
    description: 'Can understand and use basic phrases',
    percentage: 25
  },
  'Conversational': {
    color: 'bg-green-100 text-green-600',
    description: 'Can handle simple conversations',
    percentage: 50
  },
  'Professional': {
    color: 'bg-purple-100 text-purple-600',
    description: 'Can work professionally in this language',
    percentage: 75
  },
  'Native': {
    color: 'bg-orange-100 text-orange-600',
    description: 'Native or bilingual proficiency',
    percentage: 100
  }
};

// Add this type
type SectionType = 'skills' | 'experience' | 'education' | 'languages' | 'projects' | 'certifications';

export default function ResumeBuilder() {
  // Session and router
  const { data: session, status } = useSession();
  const router = useRouter();

  // Basic states
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isSaving, setIsSaving] = useState(false);
  const [loadingSection, setLoadingSection] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasNoExperience, setHasNoExperience] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [previewTab, setPreviewTab] = useState<'preview' | 'latex'>('preview');
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: crypto.randomUUID(),
    name: '',
    level: 'Intermediate',
    category: 'Technical'
  });

  // Initialize personalInfo with default values
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: session?.user?.email || '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    website: '',
    address: '',
    city: '',
    country: ''
  });

  // Initialize arrays with empty arrays instead of undefined
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Notification state
  const [notification, setNotification] = useState({
    type: 'info' as 'success' | 'error' | 'info',
    message: '',
    isVisible: false
  });

  // Add state for latex content
  const [latexContent, setLatexContent] = useState<string>('');

  // Add more robust auto-save with status indicator
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saving' | 'saved' | 'error' | null>(null);

  // Load resume data on component mount
  useEffect(() => {
    if (session?.user?.id) {
      loadResumeData();
    }
  }, [session]);

  const loadResumeData = async () => {
    try {
      const data = await loadResume(session?.user?.id as string);
      if (data) {
        setPersonalInfo(data.content?.personalInfo || personalInfo);
        setExperiences(data.content?.experiences || []);
        setEducation(data.content?.education || []);
        setSkills(data.content?.skills || []);
        setLanguages(data.content?.languages || []);
        setProjects(data.content?.projects || []);
        setCertifications(data.content?.certifications || []);
        setSelectedTemplate(data.template || 'modern');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      setNotification({
        type: 'error',
        message: 'Failed to load resume data',
        isVisible: true
      });
    }
  };

  // Add effect to track changes and set isDirty
  useEffect(() => {
    setIsDirty(true);
  }, [personalInfo, experiences, education, skills, languages, projects, certifications]);

  // Update the form state setters to mark as dirty
  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
  };

  const updateExperiences = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    setIsDirty(true);
  };

  const updateEducation = (newEducation: Education[]) => {
    setEducation(newEducation);
    setIsDirty(true);
  };

  // Save handler
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveResume({
        title: `${personalInfo.firstName}'s Resume`,
        template: selectedTemplate,
        personalInfo,
        experiences,
        education,
        skills,
        languages,
        projects,
        certifications
      });
      
      setNotification({
        type: 'success',
        message: 'Resume saved successfully!',
        isVisible: true
      });
      setIsDirty(false);  // Reset isDirty after successful save
    } catch (error) {
      console.error('Save error:', error);
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to save resume',
        isVisible: true
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Update the steps array at the beginning of your component
  const steps = [
    { 
      title: 'Templates', 
      icon: '📄',
      description: 'Choose your resume template'
    },
    { 
      title: 'Personal Info', 
      icon: '👤',
      description: 'Add your contact details'
    },
    { 
      title: 'Experience', 
      icon: '💼',
      description: 'List your work history'
    },
    { 
      title: 'Education', 
      icon: '🎓',
      description: 'Add your academic background'
    },
    { 
      title: 'Skills', 
      icon: '⚡',
      description: 'Highlight your expertise'
    },
    { 
      title: 'Languages', 
      icon: '🌐',
      description: 'Add language proficiencies'
    },
    { 
      title: 'Projects', 
      icon: '🚀',
      description: 'Showcase your projects'
    },
    { 
      title: 'Certifications', 
      icon: '📜',
      description: 'List your certifications'
    },
    { 
      title: 'AI Review', 
      icon: '🤖',
      description: 'Get AI-powered feedback'
    }
  ];

  const skillCategories = [
    'Technical',
    'Soft Skills',
    'Languages',
    'Tools',
    'Frameworks',
    'Other'
  ];

  const validatePersonalInfo = (info: PersonalInfo): { errors: ValidationError[]; isValid: boolean } => {
    const errors: ValidationError[] = [];
    
    // Add null checks before trim()
    if (!info?.firstName?.trim()) {
      errors.push({ field: 'firstName', message: 'First name is required' });
    }
    if (!info?.lastName?.trim()) {
      errors.push({ field: 'lastName', message: 'Last name is required' });
    }
    if (!info?.email?.trim()) {
      errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(info.email)) {
      errors.push({ field: 'email', message: 'Invalid email format' });
    }
    
    // Optional fields should only be validated if they exist
    if (info?.phone && !isValidPhone(info.phone)) {
      errors.push({ field: 'phone', message: 'Invalid phone number format' });
    }
    if (info?.website && !isValidUrl(info.website)) {
      errors.push({ field: 'website', message: 'Invalid website URL' });
    }

    return {
      errors,
      isValid: errors.length === 0
    };
  };

  // Helper functions
  const isValidPhone = (phone: string) => {
    // Add your phone validation logic here
    return phone.trim().length > 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateExperience = (exp: Experience): SectionValidation => {
    const errors: ValidationError[] = [];

    if (!exp.title.trim()) {
      errors.push({ field: 'title', message: 'Job title is required' });
    }
    if (!exp.company.trim()) {
      errors.push({ field: 'company', message: 'Company name is required' });
    }
    if (!exp.startDate) {
      errors.push({ field: 'startDate', message: 'Start date is required' });
    }
    if (!exp.current && !exp.endDate) {
      errors.push({ field: 'endDate', message: 'End date is required when not current position' });
    }
    if (!exp.description.trim()) {
      errors.push({ field: 'description', message: 'Job description is required' });
    }

    return {
      errors,
      isValid: errors.length === 0
    };
  };

  const validateEducation = (edu: Education): SectionValidation => {
    const errors: ValidationError[] = [];

    if (!edu.school.trim()) {
      errors.push({ field: 'school', message: 'School name is required' });
    }
    if (!edu.degree.trim()) {
      errors.push({ field: 'degree', message: 'Degree is required' });
    }
    if (!edu.field.trim()) {
      errors.push({ field: 'field', message: 'Field of study is required' });
    }
    if (!edu.startDate) {
      errors.push({ field: 'startDate', message: 'Start date is required' });
    }
    if (!edu.current && !edu.endDate) {
      errors.push({ field: 'endDate', message: 'End date is required when not current' });
    }

    return {
      errors,
      isValid: errors.length === 0
    };
  };

  const validateSkill = (skill: Skill): SectionValidation => {
    const errors: ValidationError[] = [];

    if (!skill.name.trim()) {
      errors.push({ field: 'name', message: 'Skill name is required' });
    }
    if (!skill.category) {
      errors.push({ field: 'category', message: 'Category is required' });
    }

    return {
      errors,
      isValid: errors.length === 0
    };
  };

  const handleNext = () => {
    setActiveStep(Math.min(steps.length - 1, activeStep + 1));
  };

  const validateCurrentSection = () => {
    switch (activeStep) {
      case 1: {
        const validation = validatePersonalInfo(personalInfo);
        return validation.isValid;
      }
      case 2:
        return experiences.length > 0;
      case 3:
        return education.length > 0;
      case 4:
        return skills.length > 0;
      default:
        return true;
    }
  };

  const ValidationErrors = ({ errors }: { errors: ValidationError[] }) => {
    if (errors.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200"
      >
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <h4 className="text-sm font-medium text-red-800">Please fix the following errors:</h4>
        </div>
        <ul className="list-disc list-inside space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="text-sm text-red-700">
              {error.message}
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

  const { errors: personalInfoErrors, isValid: isPersonalInfoValid } = useFormValidation(
    personalInfo,
    validatePersonalInfo
  );

  useResumeShortcuts({
    onSave: () => {
      autoSave({
        personalInfo,
        experiences,
        education,
        skills,
        languages,
        certifications,
        projects
      });
      setIsDirty(false);
    },
    onPreview: () => setShowPreview(!showPreview),
    onAIHelp: () => {
      // Implement AI help functionality
    }
  });

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      // Populate state with draft data
      setPersonalInfo(draft.personalInfo);
      setExperiences(draft.experiences);
      setEducation(draft.education);
      setSkills(draft.skills);
      setLanguages(draft.languages);
      setCertifications(draft.certifications);
      setProjects(draft.projects);
    }
  }, []);

  // Update the autosave effect
  useEffect(() => {
    const autoSaveTimer = setTimeout(async () => {
      if (isDirty) {
        try {
          setAutoSaveStatus('saving');
          await handleSave();
          setAutoSaveStatus('saved');
        } catch (error) {
          setAutoSaveStatus('error');
        }
      }
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [personalInfo, experiences, education, skills, languages, projects, certifications]);

  useEffect(() => {
    const loadExistingResume = async () => {
      if (session?.user?.id) {
        try {
          const existingResume = await loadResume(session.user.id);
          if (existingResume) {
            setSelectedTemplate(existingResume.template);
            setPersonalInfo(existingResume.personalInfo);
            setExperiences(existingResume.experiences);
            setEducation(existingResume.education);
            setSkills(existingResume.skills);
            setLanguages(existingResume.languages);
            setProjects(existingResume.projects);
            setCertifications(existingResume.certifications);
          }
        } catch (error) {
          console.error('Failed to load resume:', error);
        }
      }
    };

    loadExistingResume();
  }, [session?.user?.id]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validate all sections
      const personalInfoValidation = validatePersonalInfo(personalInfo);
      const experiencesValid = experiences.every(exp => validateExperience(exp).isValid);
      const educationValid = education.every(edu => validateEducation(edu).isValid);
      const skillsValid = skills.length > 0;

      if (!personalInfoValidation.isValid || !experiencesValid || !educationValid || !skillsValid) {
        throw new Error('Please complete all required fields');
      }

      // Save to database
      const savedResume = await saveResume({
        title: `${personalInfo.firstName}'s Resume`,
        template: selectedTemplate,
        personalInfo,
        experiences,
        education,
        skills,
        languages,
        projects,
        certifications
      });

      setNotification({
        type: 'success',
        message: 'Resume saved successfully!',
        isVisible: true
      });

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);

      // Clear draft from localStorage after successful save
      localStorage.removeItem('resume_draft');

    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred while saving',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add real-time validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? '' 
          : 'Please enter a valid email address';
      case 'phone':
        return /^\+?[\d\s-]{10,}$/.test(value)
          ? ''
          : 'Please enter a valid phone number';
      case 'url':
        try {
          new URL(value);
          return '';
        } catch {
          return 'Please enter a valid URL';
        }
      default:
        return value.trim() ? '' : 'This field is required';
    }
  };

  // Add AI suggestion handling
  const handleAISuggestion = async (type: string) => {
    try {
      setNotification({
        type: 'info',
        message: 'Getting AI suggestions...',
        isVisible: true
      });

      // The suggestions will be handled by the AISuggestions component
      
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to get AI suggestions',
        isVisible: true
      });
    }
  };

  const checkSectionCompletion = (sectionIndex: number) => {
    switch (sectionIndex) {
      case 1: // Personal Info
        if (personalInfo.firstName && personalInfo.lastName && personalInfo.email) {
          if (!completedSections.includes(sectionIndex)) {
            setCompletedSections([...completedSections, sectionIndex]);
          }
        }
        break;
      case 2: // Experience
        if (experiences.length > 0) {
          if (!completedSections.includes(sectionIndex)) {
            setCompletedSections([...completedSections, sectionIndex]);
          }
        }
        break;
      // Add similar checks for other sections
    }
  };

  const createNewProject = () => {
    return {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      highlights: ['']
    };
  };

  // Update the getTemplateContent function
  const getTemplateContent = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) {
      console.error('Template not found:', templateId);
      return '';
    }

    let content = template.template;
    
    // Helper function to safely escape LaTeX special characters
    const escapeLatex = (str: string = '') => {
      return str.toString()
        .replace(/[&$%#_{}~^\\]/g, '\\$&')
        .replace(/\n/g, '\\\\');  // Handle newlines
    };

    // Create a formatted data object that matches the template variables
    const formattedData = {
      personalInfo: {
        ...personalInfo,
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      },
      experiences: experiences.map(exp => ({
        ...exp,
        endDate: exp.current ? 'Present' : exp.endDate,
      })),
      education: education.map(edu => ({
        ...edu,
        endDate: edu.current ? 'Present' : edu.endDate,
      })),
      skills: skills.map(skill => ({
        ...skill,
        items: skill.name // Map the skill name to items for template compatibility
      })),
      languages: languages.length > 0 ? languages : null,
      projects: projects.length > 0 ? projects : null,
      certifications: certifications.length > 0 ? certifications : null,
    };

    // Process arrays (FOREACH loops)
    content = content.replace(
      /\\FOREACH{([^}]+)}(.*?)\\ENDFOREACH/gs,
      (match: string, array: string, body: string) => {
        const items = array.split('.').reduce(
          (obj: any, key: string) => obj?.[key],
          formattedData
        );
        
        if (!Array.isArray(items)) return '';
        return items.map(item => {
          let itemContent = body;
          itemContent = itemContent.replace(
            /\\VAR{([^}]+)}/g,
            (m: string, path: string) => {
              const value = path.split('.').reduce(
                (o: any, k: string) => o?.[k],
                item
              );
              return escapeLatex(value || '');
            }
          );
          return itemContent;
        }).join('\n');
      }
    );

    // Replace remaining VAR tags
    content = content.replace(
      /\\VAR{([^}]+)}/g,
      (match: string, path: string) => {
        const value = path.split('.').reduce(
          (obj: any, key: string) => obj?.[key],
          formattedData
        );
        return escapeLatex(value || '');
      }
    );

    return content;
  };

  // Update the useEffect for latex generation
  useEffect(() => {
    const generateLatex = () => {
      try {
        // Helper function to safely check array length
        const hasItems = (arr: any[] | undefined) => arr && arr.length > 0;

        // Basic LaTeX template with null checks
        const latex = `
\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}

\\begin{document}

% Personal Information
\\begin{center}
\\textbf{\\Large ${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}}\\\\[0.3em]
${personalInfo?.title || ''}\\\\[0.3em]
${personalInfo?.email || ''} ${personalInfo?.phone ? `• ${personalInfo.phone}` : ''} ${personalInfo?.location ? `• ${personalInfo.location}` : ''}\\\\[0.2em]
${personalInfo?.linkedin ? `\\href{${personalInfo.linkedin}}{LinkedIn}` : ''} 
${personalInfo?.website ? `• \\href{${personalInfo.website}}{Portfolio}` : ''}
\\end{center}

% Summary
${personalInfo?.summary ? `
\\section*{Professional Summary}
${personalInfo.summary}
` : ''}

% Experience
${hasItems(experiences) ? `
\\section*{Experience}
${experiences?.map(exp => `
\\noindent\\textbf{${exp.title}} \\hfill ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\\\\
\\textit{${exp.company}, ${exp.location}}\\\\
${exp.description ? `${exp.description}\\\\` : ''}
${hasItems(exp.achievements) ? `\\begin{itemize}
${exp.achievements.map(achievement => achievement ? `\\item ${achievement}` : '').join('\n')}
\\end{itemize}` : ''}
`).join('\n')}` : ''}

% Education
${hasItems(education) ? `
\\section*{Education}
${education?.map(edu => `
\\noindent\\textbf{${edu.degree} in ${edu.field}} \\hfill ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}\\\\
\\textit{${edu.school}, ${edu.location}}\\\\
${edu.gpa ? `GPA: ${edu.gpa}\\\\` : ''}
${hasItems(edu.achievements) ? `\\begin{itemize}
${edu.achievements.map(achievement => achievement ? `\\item ${achievement}` : '').join('\n')}
\\end{itemize}` : ''}
`).join('\n')}` : ''}

% Skills
${hasItems(skills) ? `
\\section*{Skills}
${Object.entries(skills.reduce((acc: any, skill) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {})).map(([category, skills]: [string, any]) => `
\\textbf{${category}:} ${skills.map((skill: any) => skill.name).join(', ')}\\\\
`).join('\n')}` : ''}

% Languages
${hasItems(languages) ? `
\\section*{Languages}
${languages?.map(lang => `${lang.name} (${lang.proficiency})`).join(' • ')}` : ''}

% Projects
${hasItems(projects) ? `
\\section*{Projects}
${projects?.map(project => `
\\noindent\\textbf{${project.title}} \\hfill ${project.startDate} - ${project.current ? 'Present' : project.endDate}\\\\
${project.url ? `\\href{${project.url}}{${project.url}}\\\\` : ''}
${project.description ? `${project.description}\\\\` : ''}
${hasItems(project.technologies) ? `Technologies: ${project.technologies.join(', ')}\\\\` : ''}
${hasItems(project.highlights) ? `\\begin{itemize}
${project.highlights.map(highlight => highlight ? `\\item ${highlight}` : '').join('\n')}
\\end{itemize}` : ''}
`).join('\n')}` : ''}

% Certifications
${hasItems(certifications) ? `
\\section*{Certifications}
${certifications?.map(cert => `
\\noindent\\textbf{${cert.name}} \\hfill ${cert.issueDate}${cert.expiryDate ? ` - ${cert.expiryDate}` : ''}\\\\
\\textit{${cert.issuer}}\\\\
${cert.credentialId ? `Credential ID: ${cert.credentialId}\\\\` : ''}
${cert.url ? `\\href{${cert.url}}{View Certificate}\\\\` : ''}
`).join('\n')}` : ''}

\\end{document}
`;

        setLatexContent(latex);
      } catch (error) {
        console.error('Error generating LaTeX:', error);
        setNotification({
          type: 'error',
          message: 'Failed to generate LaTeX content',
          isVisible: true
        });
      }
    };

    generateLatex();
  }, [personalInfo, experiences, education, skills, languages, projects, certifications]);

  // Add keyboard shortcuts for common actions
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setShowPreview(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Add section completion tracking
  const calculateProgress = () => {
    const sections = {
      personalInfo: validatePersonalInfo(personalInfo).isValid,
      experience: experiences.length > 0,
      education: education.length > 0,
      skills: skills.length > 0,
      // Add other sections
    };

    const completedSections = Object.values(sections).filter(Boolean).length;
    return (completedSections / Object.keys(sections).length) * 100;
  };

  const handleApplyFeedback = (section: string, suggestion: string) => {
    switch (section) {
      case 'summary':
        setPersonalInfo(prev => ({ ...prev, summary: suggestion }));
        break;
      case 'experience':
        if (experiences.length > 0) {
          const updatedExperiences = [...experiences];
          // Update the achievements array instead of description
          updatedExperiences[0] = {
            ...updatedExperiences[0],
            achievements: [suggestion, ...updatedExperiences[0].achievements]
          };
          setExperiences(updatedExperiences);
        }
        break;
      case 'skills':
        // Create a new skill with the suggestion
        const newSkill: Skill = {
          id: crypto.randomUUID(),
          name: suggestion,
          level: 'Intermediate',
          category: 'Technical'
        };
        setSkills(prev => [...prev, newSkill]);
        break;
      case 'education':
        if (education.length > 0) {
          const updatedEducation = [...education];
          // Update the achievements array instead of trying to set description
          updatedEducation[0] = {
            ...updatedEducation[0],
            achievements: [suggestion, ...updatedEducation[0].achievements]
          };
          setEducation(updatedEducation);
        }
        break;
      case 'projects':
        if (projects.length > 0) {
          const updatedProjects = [...projects];
          updatedProjects[0] = {
            ...updatedProjects[0],
            description: suggestion
          };
          setProjects(updatedProjects);
        }
        break;
      case 'language':
        // For language improvements, find and replace the text in experience descriptions
        setExperiences(prev => prev.map(exp => ({
          ...exp,
          achievements: exp.achievements.map(achievement => 
            achievement === suggestion.text ? suggestion : achievement
          )
        })));
        break;
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="w-[90%] mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-[#7C3AED] rounded-[32px] p-8 shadow-lg mb-8"
        >
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">AI Resume Builder</h1>
                <p className="text-white/80 mt-1">Create a professional resume with AI assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-white/90 text-sm">Auto-saving</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-4 py-2 bg-white text-[#7C3AED] rounded-xl font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Progress
              </motion.button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Overall Progress</span>
              <span className="text-sm font-medium text-white">{Math.round((activeStep / (steps.length - 1)) * 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                className="h-full bg-white rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Update the sections bar with a cleaner design */}
        <div className="bg-[#1E1B2C] rounded-[32px] p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl text-white">Resume Sections</h3>
              <p className="text-gray-400 text-sm mt-1">Complete each section to create your perfect resume</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-[#282433] rounded-lg text-sm text-gray-300">
                {activeStep + 1} of {steps.length}
              </div>
              <div className="h-8 w-8 rounded-lg bg-[#7C3AED] flex items-center justify-center">
                <span className="text-white text-sm">{Math.round((activeStep / (steps.length - 1)) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Steps grid with improved styling */}
          <div className="grid grid-cols-9 gap-3">
            {steps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setActiveStep(index)}
                className="relative group"
              >
                <div className={`
                  relative w-full rounded-2xl p-4 transition-all duration-200
                  ${index === activeStep 
                    ? 'bg-[#7C3AED]' 
                    : index < activeStep
                    ? 'bg-[#10B981]'
                    : 'bg-[#282433]'
                  }
                `}>
                  {/* Completion indicator */}
                  {index < activeStep && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-lg mb-2 text-center text-white">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <div className={`text-[11px] font-medium text-center ${
                    index === activeStep || index < activeStep
                      ? 'text-white' 
                      : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>

                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-3">
                      <div className="h-[2px] w-full bg-[#282433]">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            index < activeStep ? 'bg-[#10B981]' : ''
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Bottom section with status and next button */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981]"/>
                <span className="text-gray-400">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#7C3AED]"/>
                <span className="text-gray-400">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#282433]"/>
                <span className="text-gray-400">Pending</span>
              </div>
            </div>
            
            <button 
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              className="text-[#7C3AED] text-sm font-medium flex items-center gap-1"
            >
              Next Section
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Add these styles to your global CSS */}
        <style jsx global>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 6s ease infinite;
          }
        `}</style>

        {/* Main Content Area */}
        <div className="bg-white rounded-[24px] p-4 sm:p-8 md:p-12">
          {/* Templates step */}
          {activeStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Choose Your Template</h2>
                  <p className="text-gray-600 mt-1">Select a template that best represents your professional style</p>
                </div>
                <button
                  onClick={() => handleNext()}
                  disabled={!selectedTemplate}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue with Template
                </button>
              </div>

              {/* Template grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedTemplate === template.id 
                        ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-200' 
                        : 'border-gray-200 hover:border-indigo-300 bg-white'
                    }`}
                  >
                    {/* Template Preview - Made taller */}
                    <div className="relative h-72 mb-4 rounded-lg overflow-hidden bg-gray-100"> {/* Changed h-48 to h-72 */}
                      {template.preview ? (
                        <Image
                          src={template.preview}
                          alt={template.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          Preview not available
                        </div>
                      )}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                      <p className="text-gray-500 text-sm">{template.description}</p>
                      
                      {/* Template Features */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className={`mt-4 flex items-center gap-2 ${
                      selectedTemplate === template.id ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-4 h-4 rounded-full border ${
                        selectedTemplate === template.id 
                          ? 'border-indigo-600 bg-indigo-600' 
                          : 'border-gray-300'
                      }`}>
                        {selectedTemplate === template.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <span className="text-white text-xs">✓</span>
                          </motion.div>
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        {selectedTemplate === template.id ? 'Selected' : 'Select template'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All other steps get the responsive layout */}
          {activeStep > 0 && (
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Forms */}
              <div className="space-y-8">
                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                    {/* Rest of the personal info form */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          value={personalInfo?.firstName || ''}
                          onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="First Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="Last Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          value={personalInfo.phone}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          value={personalInfo.location}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="New York, NY"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                        <input
                          type="text"
                          value={personalInfo.title}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="Software Engineer"
                        />
                      </div>

                      <div className="col-span-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                          <span className="text-xs text-gray-500">
                            {(personalInfo.summary || '').length}/400 characters
                          </span>
                        </div>
                        <textarea
                          value={personalInfo.summary}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                          maxLength={400}
                          rows={4}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none"
                          placeholder="Write a brief summary of your professional background and key strengths..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={personalInfo.linkedin}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="https://linkedin.com/in/johndoe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Personal Website</label>
                        <input
                          type="url"
                          value={personalInfo.website}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          placeholder="https://johndoe.com"
                        />
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">💡</span>
                        </div>
                        <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
                      </div>
                      <p className="text-sm text-indigo-700">
                        Pro tip: Your professional summary should highlight your most relevant achievements and skills. 
                        Need help? Click the AI Assistant button for personalized suggestions.
                      </p>
                      <button 
                        onClick={() => {
                          // TODO: Implement AI suggestions
                        }}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {activeStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={hasNoExperience}
                            onChange={(e) => {
                              setHasNoExperience(e.target.checked);
                              if (e.target.checked) {
                                setExperiences([]);
                              }
                            }}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          I have no work experience
                        </label>
                        {!hasNoExperience && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setExperiences([...experiences, {
                                id: crypto.randomUUID(),
                                title: '',
                                company: '',
                                location: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                description: '',
                                achievements: ['']
                              }]);
                            }}
                            className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                          >
                            + Add Experience
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {hasNoExperience ? (
                      <div className="bg-gray-50 rounded-xl p-6 text-center">
                        <p className="text-gray-600">
                          Don't worry! You can still create a great resume focusing on your education, skills, and projects.
                        </p>
                        <button
                          onClick={() => setHasNoExperience(false)}
                          className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                        >
                          Add work experience later
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {experiences.map((experience, index) => (
                          <motion.div
                            key={experience.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl border border-gray-200"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-medium text-gray-900">Position {index + 1}</h3>
                              <button
                                onClick={() => {
                                  setExperiences(experiences.filter((_, i) => i !== index));
                                }}
                                className="text-gray-400 hover:text-red-500"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <FormField label="Job Title" required>
                                <input
                                  type="text"
                                  value={experience.title}
                                  onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].title = e.target.value;
                                    setExperiences(newExperiences);
                                  }}
                                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                  placeholder="Software Engineer"
                                />
                              </FormField>

                              <FormField label="Company" required>
                                <input
                                  type="text"
                                  value={experience.company}
                                  onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].company = e.target.value;
                                    setExperiences(newExperiences);
                                  }}
                                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                  placeholder="Company Name"
                                />
                              </FormField>

                              <FormField label="Location">
                                <input
                                  type="text"
                                  value={experience.location}
                                  onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].location = e.target.value;
                                    setExperiences(newExperiences);
                                  }}
                                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                  placeholder="City, Country"
                                />
                              </FormField>

                              <div className="grid grid-cols-2 gap-4">
                                <FormField label="Start Date" required>
                                  <input
                                    type="month"
                                    value={experience.startDate}
                                    max={new Date().toISOString().slice(0, 7)}
                                    onChange={(e) => {
                                      const newExperiences = [...experiences];
                                      newExperiences[index].startDate = e.target.value;
                                      setExperiences(newExperiences);
                                    }}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                  />
                                </FormField>

                                <FormField label="End Date" required={!experience.current}>
                                  <div className="space-y-2">
                                    <input
                                      type="month"
                                      value={experience.endDate}
                                      max={new Date().toISOString().slice(0, 7)}
                                      disabled={experience.current}
                                      onChange={(e) => {
                                        const newExperiences = [...experiences];
                                        newExperiences[index].endDate = e.target.value;
                                        setExperiences(newExperiences);
                                      }}
                                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 disabled:bg-gray-100"
                                    />
                                    <label className="flex items-center gap-2 text-sm text-gray-600">
                                      <input
                                        type="checkbox"
                                        checked={experience.current}
                                        onChange={(e) => {
                                          const newExperiences = [...experiences];
                                          newExperiences[index].current = e.target.checked;
                                          if (e.target.checked) {
                                            newExperiences[index].endDate = '';
                                          }
                                          setExperiences(newExperiences);
                                        }}
                                        className="rounded text-indigo-600 focus:ring-indigo-500"
                                      />
                                      Current
                                    </label>
                                  </div>
                                </FormField>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                                <button
                                  onClick={() => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].achievements.push('');
                                    setExperiences(newExperiences);
                                  }}
                                  className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                  + Add Achievement
                                </button>
                              </div>
                              {experience.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={achievement}
                                    onChange={(e) => {
                                      const newExperiences = [...experiences];
                                      newExperiences[index].achievements[achievementIndex] = e.target.value;
                                      setExperiences(newExperiences);
                                    }}
                                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                    placeholder="Describe a key achievement..."
                                  />
                                  <button
                                    onClick={() => {
                                      const newExperiences = [...experiences];
                                      newExperiences[index].achievements = newExperiences[index].achievements.filter(
                                        (_, i) => i !== achievementIndex
                                      );
                                      setExperiences(newExperiences);
                                    }}
                                    className="text-gray-400 hover:text-red-500 px-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>

                            {/* Description field with AI suggestions */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <textarea
                                  value={experience.description}
                                  onChange={(e) => {
                                    const newExperiences = [...experiences];
                                    newExperiences[index].description = e.target.value;
                                    setExperiences(newExperiences);
                                  }}
                                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                  rows={4}
                                  placeholder="Describe your role and responsibilities"
                                />
                              </div>

                              {/* AI Suggestions Component */}
                              <AISuggestions
                                type="description"
                                context={{
                                  role: experience.title,
                                  company: experience.company
                                }}
                                onApplySuggestion={(suggestion) => {
                                  const newExperiences = [...experiences];
                                  newExperiences[index].description = suggestion;
                                  setExperiences(newExperiences);
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
                
                {activeStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setEducation([...education, {
                            id: crypto.randomUUID(),
                            school: '',
                            degree: '',
                            field: '',
                            location: '',
                            startDate: '',
                            endDate: '',
                            current: false,
                            gpa: '',
                            achievements: ['']
                          }]);
                        }}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                      >
                        + Add Education
                      </motion.button>
                    </div>

                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <motion.div
                          key={edu.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl p-6 border border-gray-200 relative group"
                        >
                          <button
                            onClick={() => setEducation(prevEducation => prevEducation.filter(e => e.id !== edu.id))}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-gray-400 hover:text-red-500">✕</span>
                          </button>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">School/University</label>
                              <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => {
                                  setEducation(prevEducation => {
                                    const newEducations = [...prevEducation];
                                    newEducations[index].school = e.target.value;
                                    return newEducations;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Harvard University"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  setEducation(prevEducation => {
                                    const newEducations = [...prevEducation];
                                    newEducations[index].degree = e.target.value;
                                    return newEducations;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Bachelor of Science"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                              <input
                                type="text"
                                value={edu.field}
                                onChange={(e) => {
                                  setEducation(prevEducation => {
                                    const newEducations = [...prevEducation];
                                    newEducations[index].field = e.target.value;
                                    return newEducations;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Computer Science"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Location</label>
                              <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => {
                                  setEducation(prevEducation => {
                                    const newEducations = [...prevEducation];
                                    newEducations[index].location = e.target.value;
                                    return newEducations;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Cambridge, MA"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Start Date</label>
                              <input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => {
                                  setEducation(prevEducation => {
                                    const newEducations = [...prevEducation];
                                    newEducations[index].startDate = e.target.value;
                                    return newEducations;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">End Date</label>
                              <div className="flex items-center gap-4">
                                <input
                                  type="month"
                                  value={edu.endDate}
                                  onChange={(e) => {
                                    setEducation(prevEducation => {
                                      const newEducations = [...prevEducation];
                                      newEducations[index].endDate = e.target.value;
                                      return newEducations;
                                    });
                                  }}
                                  disabled={edu.current}
                                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                  <input
                                    type="checkbox"
                                    checked={edu.current}
                                    onChange={(e) => {
                                      setEducation(prevEducation => {
                                        const newEducations = [...prevEducation];
                                        newEducations[index].current = e.target.checked;
                                        if (e.target.checked) {
                                          newEducations[index].endDate = '';
                                        }
                                        return newEducations;
                                      });
                                    }}
                                    className="rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  Current
                                </label>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">GPA (Optional)</label>
                              <input
                                type="text"
                                value={edu.gpa}
                                onChange={(e) => {
                                  setEducation(prevEducation => {
                                    const newEducations = [...prevEducation];
                                    newEducations[index].gpa = e.target.value;
                                    return newEducations;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="3.8/4.0"
                              />
                            </div>

                            <div className="col-span-2 space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">Academic Achievements</label>
                                <button
                                  onClick={() => {
                                    setEducation(prevEducation => {
                                      const newEducations = [...prevEducation];
                                      newEducations[index].achievements.push('');
                                      return newEducations;
                                    });
                                  }}
                                  className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                  + Add Achievement
                                </button>
                              </div>
                              {edu.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={achievement}
                                    onChange={(e) => {
                                      setEducation(prevEducation => {
                                        const newEducations = [...prevEducation];
                                        newEducations[index].achievements[achievementIndex] = e.target.value;
                                        return newEducations;
                                      });
                                    }}
                                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                    placeholder="Dean's List, Academic Awards, etc."
                                  />
                                  <button
                                    onClick={() => {
                                      setEducation(prevEducation => {
                                        const newEducations = [...prevEducation];
                                        newEducations[index].achievements = edu.achievements.filter(
                                          (_, i) => i !== achievementIndex
                                        );
                                        return newEducations;
                                      });
                                    }}
                                    className="text-gray-400 hover:text-red-500 px-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">💡</span>
                        </div>
                        <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
                      </div>
                      <p className="text-sm text-indigo-700">
                        Pro tip: Include relevant coursework, academic achievements, and extracurricular activities that showcase your skills.
                        Need help highlighting your academic accomplishments? Click the AI Assistant button for suggestions.
                      </p>
                      <button 
                        onClick={() => handleAISuggestion('education')}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {activeStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (currentSkill.name.trim()) {
                            setSkills([...skills, currentSkill]);
                            setCurrentSkill({
                              id: crypto.randomUUID(),
                              name: '',
                              level: 'Intermediate',
                              category: currentSkill.category
                            });
                          }
                        }}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                      >
                        + Add Skill
                      </motion.button>
                    </div>

                    {/* Add New Skill Form */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                          <input
                            type="text"
                            value={currentSkill.name}
                            onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                            placeholder="e.g., ReactJS, Project Management"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            value={currentSkill.category}
                            onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          >
                            <option value="Technical">Technical</option>
                            <option value="Soft Skills">Soft Skills</option>
                            <option value="Languages">Languages</option>
                            <option value="Tools">Tools</option>
                            <option value="Frameworks">Frameworks</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                          <select
                            value={currentSkill.level}
                            onChange={(e) => setCurrentSkill({ 
                              ...currentSkill, 
                              level: e.target.value as Skill['level']
                            })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {skills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between group hover:border-indigo-200 transition-all duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`px-3 py-1 rounded-full text-sm ${
                              {
                                'Beginner': 'bg-blue-50 text-blue-600',
                                'Intermediate': 'bg-green-50 text-green-600',
                                'Advanced': 'bg-purple-50 text-purple-600',
                                'Expert': 'bg-orange-50 text-orange-600'
                              }[skill.level]
                            }`}>
                              {skill.level}
                            </div>
                            <span className="text-gray-900">{skill.name}</span>
                            <span className="text-gray-500 text-sm">{skill.category}</span>
                          </div>
                          <button
                            onClick={() => setSkills(skills.filter(s => s.id !== skill.id))}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200"
                          >
                            ✕
                          </button>
                        </motion.div>
                      ))}
                    </div>

                    {/* AI Suggestions */}
                    <div className="mt-4">
                      <AISuggestions
                        type="skills"
                        context={{
                          jobTitle: personalInfo?.title || '',
                          existingSkills: skills.map(skill => skill.name) // Pass existing skills
                        }}
                        onApplySuggestion={(suggestion) => {
                          if (Array.isArray(suggestion)) {
                            setSkills(prev => [...prev, {
                              id: crypto.randomUUID(),
                              name: suggestion[0], // Take first item since we know it's a single skill
                              level: 'Intermediate',
                              category: 'Technical'
                            }]);
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                )}
                
                {activeStep === 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setLanguages([...languages, {
                            id: crypto.randomUUID(),
                            name: '',
                            proficiency: 'Professional'
                          }]);
                        }}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                      >
                        + Add Language
                      </motion.button>
                    </div>

                    {/* Language List */}
                    <div className="space-y-4">
                      {languages.map((language, index) => (
                        <motion.div
                          key={language.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl p-6 border border-gray-200 relative group hover:border-indigo-200 transition-all duration-200"
                        >
                          <button
                            onClick={() => setLanguages(languages.filter(l => l.id !== language.id))}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-gray-400 hover:text-red-500">✕</span>
                          </button>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Language</label>
                              <input
                                type="text"
                                value={language.name}
                                onChange={(e) => {
                                  const newLanguages = [...languages];
                                  newLanguages[index].name = e.target.value;
                                  setLanguages(newLanguages);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., English, Spanish"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Proficiency Level</label>
                              <select
                                value={language.proficiency}
                                onChange={(e) => {
                                  const newLanguages = [...languages];
                                  newLanguages[index].proficiency = e.target.value as LanguageProficiency;
                                  setLanguages(newLanguages);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                              >
                                {Object.keys(proficiencyLevels).map((level) => (
                                  <option key={level} value={level}>{level}</option>
                                ))}
                              </select>
                            </div>

                            {/* Proficiency Visualization */}
                            <div className="col-span-2">
                              <div className="flex items-center gap-4">
                                <div className={`px-3 py-1 rounded-full text-sm ${proficiencyLevels[language.proficiency].color}`}>
                                  {language.proficiency}
                                </div>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${proficiencyLevels[language.proficiency].percentage}%` }}
                                    transition={{ duration: 0.5 }}
                                    className={`h-full ${proficiencyLevels[language.proficiency].color.replace('text', 'bg')}`}
                                  />
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                {proficiencyLevels[language.proficiency].description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {languages.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12 bg-gray-50 rounded-xl"
                        >
                          <p className="text-gray-500">No languages added yet. Click the button above to add one.</p>
                        </motion.div>
                      )}
                    </div>

                    {/* Common Languages Suggestions */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Add Common Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: 'English', proficiency: 'Professional' },
                          { name: 'Spanish', proficiency: 'Conversational' },
                          { name: 'French', proficiency: 'Basic' },
                          { name: 'German', proficiency: 'Basic' },
                          { name: 'Mandarin', proficiency: 'Basic' }
                        ].map((suggestion) => (
                          <button
                            key={suggestion.name}
                            onClick={() => {
                              if (!languages.some(lang => lang.name === suggestion.name)) {
                                setLanguages([...languages, {
                                  id: crypto.randomUUID(),
                                  name: suggestion.name,
                                  proficiency: suggestion.proficiency as LanguageProficiency
                                }]);
                              }
                            }}
                            className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200"
                          >
                            {suggestion.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">💡</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
                          <p className="text-sm text-indigo-700">
                            Pro tip: Including language proficiencies can make your resume stand out, especially for international roles.
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAISuggestion('languages')}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {activeStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setProjects([...projects, createNewProject()]);
                        }}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                      >
                        + Add Project
                      </motion.button>
                    </div>

                    {/* Projects List */}
                    <div className="space-y-6">
                      {projects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl p-6 border border-gray-200 relative group"
                        >
                          <button
                            onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-gray-400 hover:text-red-500">✕</span>
                          </button>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Project Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[index].title = e.target.value;
                                  setProjects(newProjects);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., E-commerce Platform"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Project URL</label>
                              <input
                                type="url"
                                value={project.url}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[index].url = e.target.value;
                                  setProjects(newProjects);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="https://..."
                              />
                            </div>

                            <div className="col-span-2 space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                value={project.description}
                                onChange={(e) => {
                                  const newProjects = [...projects];
                                  newProjects[index].description = e.target.value;
                                  setProjects(newProjects);
                                }}
                                rows={3}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none"
                                placeholder="Describe your project, its objectives, and your contributions..."
                              />
                            </div>

                            <div className="col-span-2 space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Technologies Used</label>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <div
                                    key={techIndex}
                                    className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                  >
                                    {tech}
                                    <button
                                      onClick={() => {
                                        const newProjects = [...projects];
                                        newProjects[index].technologies = project.technologies.filter((_, i) => i !== techIndex);
                                        setProjects(newProjects);
                                      }}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                                <input
                                  type="text"
                                  placeholder="Add technology..."
                                  className="px-3 py-1 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-indigo-500"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.currentTarget.value) {
                                      const newProjects = [...projects];
                                      newProjects[index].technologies.push(e.currentTarget.value);
                                      setProjects(newProjects);
                                      e.currentTarget.value = '';
                                    }
                                  }}
                                />
                              </div>
                            </div>

                            <div className="col-span-2 space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700">Key Highlights</label>
                                <button
                                  onClick={() => {
                                    const newProjects = [...projects];
                                    newProjects[index].highlights.push('');
                                    setProjects(newProjects);
                                  }}
                                  className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                  + Add Highlight
                                </button>
                              </div>
                              {project.highlights.map((highlight, highlightIndex) => (
                                <div key={highlightIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={highlight}
                                    onChange={(e) => {
                                      const newProjects = [...projects];
                                      newProjects[index].highlights[highlightIndex] = e.target.value;
                                      setProjects(newProjects);
                                    }}
                                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                    placeholder="e.g., Implemented feature X that improved Y by Z%"
                                  />
                                  <button
                                    onClick={() => {
                                      const newProjects = [...projects];
                                      newProjects[index].highlights = project.highlights.filter(
                                        (_, i) => i !== highlightIndex
                                      );
                                      setProjects(newProjects);
                                    }}
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* AI Suggestions */}
                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">💡</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
                          <p className="text-sm text-indigo-700">
                            Pro tip: Focus on quantifiable achievements and the impact of your projects. 
                            Let AI help you highlight your contributions effectively.
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAISuggestion('projects')}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {activeStep === 7 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCertifications([...certifications, {
                            id: crypto.randomUUID(),
                            name: '',
                            issuer: '',
                            issueDate: '',
                            credentialId: '',
                            url: ''
                          }]);
                        }}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                      >
                        + Add Certification
                      </motion.button>
                    </div>

                    {/* Certifications List */}
                    <div className="space-y-6">
                      {certifications.map((cert, index) => (
                        <motion.div
                          key={cert.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl p-6 border border-gray-200 relative group"
                        >
                          <button
                            onClick={() => setCertifications(prevCertifications => prevCertifications.filter(c => c.id !== cert.id))}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-gray-400 hover:text-red-500">✕</span>
                          </button>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Name</label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => {
                                  setCertifications(prevCertifications => {
                                    const newCertifications = [...prevCertifications];
                                    newCertifications[index].name = e.target.value;
                                    return newCertifications;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., AWS Certified Developer"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Issuer</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => {
                                  setCertifications(prevCertifications => {
                                    const newCertifications = [...prevCertifications];
                                    newCertifications[index].issuer = e.target.value;
                                    return newCertifications;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., Amazon Web Services"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                              <input
                                type="month"
                                value={cert.issueDate}
                                onChange={(e) => {
                                  setCertifications(prevCertifications => {
                                    const newCertifications = [...prevCertifications];
                                    newCertifications[index].issueDate = e.target.value;
                                    return newCertifications;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
                              <input
                                type="month"
                                value={cert.expiryDate}
                                onChange={(e) => {
                                  setCertifications(prevCertifications => {
                                    const newCertifications = [...prevCertifications];
                                    newCertifications[index].expiryDate = e.target.value;
                                    return newCertifications;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Credential ID (Optional)</label>
                              <input
                                type="text"
                                value={cert.credentialId}
                                onChange={(e) => {
                                  setCertifications(prevCertifications => {
                                    const newCertifications = [...prevCertifications];
                                    newCertifications[index].credentialId = e.target.value;
                                    return newCertifications;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., 1234567890"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">URL (Optional)</label>
                              <input
                                type="url"
                                value={cert.url}
                                onChange={(e) => {
                                  setCertifications(prevCertifications => {
                                    const newCertifications = [...prevCertifications];
                                    newCertifications[index].url = e.target.value;
                                    return newCertifications;
                                  });
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="https://..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeStep === 8 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Resume Analyzer</h2>
                      <p className="text-gray-600 mb-6">Get intelligent feedback and suggestions to improve your resume</p>
                      
                      <AIFeedback
                        resumeData={{
                          personalInfo,
                          experiences,
                          education,
                          skills,
                          projects,
                          certifications,
                          languages
                        }}
                        onApplyFeedback={handleApplyFeedback}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Preview */}
              <div className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-8 lg:pt-0 lg:border-l-0 lg:pl-12 mt-8 lg:mt-0">
                <div className="lg:sticky lg:top-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
                    
                    {/* Tabs */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPreviewTab('preview')}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          previewTab === 'preview'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        Live Preview
                      </button>
                      <button
                        onClick={() => setPreviewTab('latex')}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                          previewTab === 'latex'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        LaTeX
                      </button>
                    </div>
                  </div>

                  {/* Preview Container */}
                  <div className="h-[800px] bg-gray-50 rounded-xl overflow-hidden">
                    {previewTab === 'preview' ? (
                      <LivePreview
                        latexContent={latexContent}
                        formData={{
                          personalInfo,
                          experiences,
                          education,
                          skills,
                          languages,
                          projects,
                          certifications
                        }}
                        onDownloadPDF={async () => {
                          try {
                            const pdfBlob = await generatePDF(latexContent);
                            downloadPDF(pdfBlob, `${personalInfo.firstName}-${personalInfo.lastName}-Resume.pdf`);
                            
                            setNotification({
                              type: 'success',
                              message: 'PDF generated successfully!',
                              isVisible: true
                            });
                          } catch (error) {
                            setNotification({
                              type: 'error',
                              message: 'Failed to generate PDF. Please try again.',
                              isVisible: true
                            });
                          }
                        }}
                      />
                    ) : (
                      <div className="h-full p-4">
                        <div className="h-full bg-white rounded-lg p-4 shadow-sm">
                          <div className="h-full overflow-y-auto rounded-lg bg-gray-50">
                            <pre className="p-4 text-xs text-gray-700 whitespace-pre-wrap break-all">
                              <code className="block max-w-[400px]">
                                {latexContent}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation and Action Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg z-50">
            <div className="w-[90%] mx-auto py-4 px-6 flex items-center justify-between">
              {/* Left side - Navigation */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </motion.button>
                
                {activeStep < steps.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </div>

              {/* Center - Progress Indicator */}
              <div className="hidden sm:flex items-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeStep 
                        ? 'w-8 bg-indigo-600' 
                        : index < activeStep
                        ? 'bg-indigo-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Right side - Save Action */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Resume
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Add padding at the bottom to account for fixed buttons */}
          <div className="h-24" />
        </div>

        {/* Notification component */}
        <Notification
          type={notification.type}
          message={notification.message}
          isVisible={notification.isVisible}
          onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </DashboardLayout>
  )
} 