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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
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
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: crypto.randomUUID(),
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  });
  const [educations, setEducations] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState<Education>({
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
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: crypto.randomUUID(),
    name: '',
    level: 'Intermediate',
    category: 'Technical'
  });
  const [languages, setLanguages] = useState<Language[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false
  });
  const [loadingSection, setLoadingSection] = useState<number | null>(null);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [hasNoExperience, setHasNoExperience] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [isSaving, setIsSaving] = useState(false);
  // Add this state for managing tabs
  const [previewTab, setPreviewTab] = useState<'preview' | 'latex'>('preview');

  const steps = [
    { title: 'Templates', icon: '🎨' },     // Add Templates step
    { title: 'Personal Info', icon: '👤' },
    { title: 'Experience', icon: '💼' },
    { title: 'Education', icon: '🎓' },
    { title: 'Skills', icon: '⚡' },
    { title: 'Languages', icon: '🌐' },
    { title: 'Projects', icon: '🚀' },
    { title: 'Certifications', icon: '📜' },
  ]

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
        return currentEducation.school || currentEducation.degree;
      case 4:
        return currentSkill.name;
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
        educations,
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
      setEducations(draft.educations);
      setSkills(draft.skills);
      setLanguages(draft.languages);
      setCertifications(draft.certifications);
      setProjects(draft.projects);
    }
  }, []);

  useEffect(() => {
    if (isDirty) {
      autoSave({
        personalInfo,
        experiences,
        educations,
        skills,
        languages,
        certifications,
        projects
      });
    }
  }, [personalInfo, experiences, educations, skills, languages, certifications, projects, isDirty]);

  useEffect(() => {
    const loadExistingResume = async () => {
      if (session?.user?.id) {
        try {
          const existingResume = await loadResume(session.user.id);
          if (existingResume) {
            setSelectedTemplate(existingResume.template);
            setPersonalInfo(existingResume.personalInfo);
            setExperiences(existingResume.experiences);
            setEducations(existingResume.education);
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

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validate all sections
      const personalInfoValidation = validatePersonalInfo(personalInfo);
      const experiencesValid = experiences.every(exp => validateExperience(exp).isValid);
      const educationsValid = educations.every(edu => validateEducation(edu).isValid);
      const skillsValid = skills.length > 0;

      if (!personalInfoValidation.isValid || !experiencesValid || !educationsValid || !skillsValid) {
        throw new Error('Please complete all required fields');
      }

      // Save to database
      const savedResume = await saveResume({
        title: `${personalInfo.firstName}'s Resume`,
        template: selectedTemplate,
        personalInfo,
        experiences,
        education: educations,
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
  const handleAISuggestion = async (section: SectionType) => {
    setLoadingSection(activeStep);
    try {
      // TODO: Implement AI API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate AI suggestions
      const suggestions = {
        skills: ['Problem Solving', 'Team Leadership', 'Project Management'],
        experience: 'Led a team of 5 developers in implementing...',
        education: 'Relevant coursework: Data Structures, Algorithms...'
      };

      // Apply suggestions based on section
      switch (section) {
        case 'skills':
          setSkills(prev => [
            ...prev,
            ...suggestions.skills.map(skill => ({
              id: crypto.randomUUID(),
              name: skill,
              level: 'Intermediate' as const,
              category: 'Technical'
            }))
          ]);
          break;
        // Add other section handlers
      }

      setNotification({
        type: 'success',
        message: 'AI suggestions applied successfully!',
        isVisible: true
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to get AI suggestions',
        isVisible: true
      });
    } finally {
      setLoadingSection(null);
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

  const handleSave = async () => {
    if (!session?.user?.email) {
      setNotification({
        type: 'error',
        message: 'Please sign in to save your resume',
        isVisible: true
      });
      return;
    }

    setIsSaving(true);
    try {
      const resumeData = {
        title: `${personalInfo.firstName}'s Resume`,
        template: selectedTemplate,
        personalInfo,
        experiences,
        education: educations,
        skills,
        languages,
        projects,
        certifications
      };

      console.log('Saving resume:', resumeData); // Debug log

      const savedResume = await saveResume(resumeData);

      setNotification({
        type: 'success',
        message: 'Resume saved successfully!',
        isVisible: true
      });

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, 3000);

    } catch (error) {
      console.error('Save error:', error); // Debug log
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to save resume. Please try again.',
        isVisible: true
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Remove the local templates array and use the imported one
  const getTemplateContent = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    return template?.template || '';
  };

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      {/* Change max-w-7xl to max-w-[1600px] for a wider container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] p-8 shadow-sm mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">AI Resume Builder</h1>
              <p className="text-gray-600">Create a professional resume with AI assistance</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="bg-white rounded-[24px] p-6 mb-6">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                  index === activeStep ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-200 ${
                  index === activeStep ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  <span className="text-xl">{step.icon}</span>
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-[24px] p-8">
          {/* Templates step */}
          {activeStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Choose Your Template</h2>
                  <p className="text-gray-600 mt-1">Select a template that best represents your professional style</p>
                </div>
                <button
                  onClick={() => handleNext()}
                  disabled={!selectedTemplate}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue with Template
                </button>
              </div>

              {/* Template grid */}
              <div className="grid grid-cols-2 gap-6">
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
                    {/* Template Preview */}
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
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

          {/* All other steps get the two-column layout */}
          {activeStep > 0 && (
            <div className="grid grid-cols-[2fr,1fr] gap-8">
              {/* Left Column - Forms */}
              <div className="space-y-6">
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
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
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
                            className="bg-gray-50 rounded-xl p-6 space-y-6"
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

                            <FormField label="Description" required>
                              <textarea
                                value={experience.description}
                                onChange={(e) => {
                                  const newExperiences = [...experiences];
                                  newExperiences[index].description = e.target.value;
                                  setExperiences(newExperiences);
                                }}
                                rows={4}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none"
                                placeholder="Describe your role and responsibilities..."
                              />
                            </FormField>

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
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* AI Suggestions */}
                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">💡</span>
                        </div>
                        <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
                      </div>
                      <p className="text-sm text-indigo-700">
                        Need help describing your experience? Our AI can help you write compelling descriptions
                        and achievements that highlight your impact.
                      </p>
                      <button 
                        onClick={() => handleAISuggestion('experience')}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
                    </div>
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
                          setEducations([...educations, {
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
                      {educations.map((education, index) => (
                        <motion.div
                          key={education.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-xl p-6 border border-gray-200 relative group"
                        >
                          <button
                            onClick={() => setEducations(educations.filter(e => e.id !== education.id))}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-gray-400 hover:text-red-500">✕</span>
                          </button>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">School/University</label>
                              <input
                                type="text"
                                value={education.school}
                                onChange={(e) => {
                                  const newEducations = [...educations];
                                  newEducations[index].school = e.target.value;
                                  setEducations(newEducations);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Harvard University"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Degree</label>
                              <input
                                type="text"
                                value={education.degree}
                                onChange={(e) => {
                                  const newEducations = [...educations];
                                  newEducations[index].degree = e.target.value;
                                  setEducations(newEducations);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Bachelor of Science"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                              <input
                                type="text"
                                value={education.field}
                                onChange={(e) => {
                                  const newEducations = [...educations];
                                  newEducations[index].field = e.target.value;
                                  setEducations(newEducations);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Computer Science"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Location</label>
                              <input
                                type="text"
                                value={education.location}
                                onChange={(e) => {
                                  const newEducations = [...educations];
                                  newEducations[index].location = e.target.value;
                                  setEducations(newEducations);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Cambridge, MA"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Start Date</label>
                              <input
                                type="month"
                                value={education.startDate}
                                onChange={(e) => {
                                  const newEducations = [...educations];
                                  newEducations[index].startDate = e.target.value;
                                  setEducations(newEducations);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">End Date</label>
                              <div className="flex items-center gap-4">
                                <input
                                  type="month"
                                  value={education.endDate}
                                  onChange={(e) => {
                                    const newEducations = [...educations];
                                    newEducations[index].endDate = e.target.value;
                                    setEducations(newEducations);
                                  }}
                                  disabled={education.current}
                                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                                />
                                <label className="flex items-center gap-2 text-sm text-gray-600">
                                  <input
                                    type="checkbox"
                                    checked={education.current}
                                    onChange={(e) => {
                                      const newEducations = [...educations];
                                      newEducations[index].current = e.target.checked;
                                      if (e.target.checked) {
                                        newEducations[index].endDate = '';
                                      }
                                      setEducations(newEducations);
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
                                value={education.gpa}
                                onChange={(e) => {
                                  const newEducations = [...educations];
                                  newEducations[index].gpa = e.target.value;
                                  setEducations(newEducations);
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
                                    const newEducations = [...educations];
                                    newEducations[index].achievements.push('');
                                    setEducations(newEducations);
                                  }}
                                  className="text-sm text-indigo-600 hover:text-indigo-700"
                                >
                                  + Add Achievement
                                </button>
                              </div>
                              {education.achievements.map((achievement, achievementIndex) => (
                                <div key={achievementIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={achievement}
                                    onChange={(e) => {
                                      const newEducations = [...educations];
                                      newEducations[index].achievements[achievementIndex] = e.target.value;
                                      setEducations(newEducations);
                                    }}
                                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                    placeholder="Dean's List, Academic Awards, etc."
                                  />
                                  <button
                                    onClick={() => {
                                      const newEducations = [...educations];
                                      newEducations[index].achievements = education.achievements.filter(
                                        (_, i) => i !== achievementIndex
                                      );
                                      setEducations(newEducations);
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
                    <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">💡</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-indigo-900">AI Suggestions</h3>
                          <p className="text-sm text-indigo-700">
                            Pro tip: Include a mix of technical and soft skills relevant to your target role. The AI can analyze job descriptions and suggest skills you might want to add.
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAISuggestion('skills')}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
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
                            onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <span className="text-gray-400 hover:text-red-500">✕</span>
                          </button>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Certification Name</label>
                              <input
                                type="text"
                                value={cert.name}
                                onChange={(e) => {
                                  const newCertifications = [...certifications];
                                  newCertifications[index].name = e.target.value;
                                  setCertifications(newCertifications);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., AWS Solutions Architect"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Issuing Organization</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => {
                                  const newCertifications = [...certifications];
                                  newCertifications[index].issuer = e.target.value;
                                  setCertifications(newCertifications);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="e.g., AWS, Microsoft, Google"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                              <input
                                type="month"
                                value={cert.issueDate}
                                onChange={(e) => {
                                  const newCertifications = [...certifications];
                                  newCertifications[index].issueDate = e.target.value;
                                  setCertifications(newCertifications);
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
                                  const newCertifications = [...certifications];
                                  newCertifications[index].expiryDate = e.target.value;
                                  setCertifications(newCertifications);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Credential ID</label>
                              <input
                                type="text"
                                value={cert.credentialId}
                                onChange={(e) => {
                                  const newCertifications = [...certifications];
                                  newCertifications[index].credentialId = e.target.value;
                                  setCertifications(newCertifications);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="Enter credential ID"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700">Credential URL</label>
                              <input
                                type="url"
                                value={cert.url}
                                onChange={(e) => {
                                  const newCertifications = [...certifications];
                                  newCertifications[index].url = e.target.value;
                                  setCertifications(newCertifications);
                                }}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                                placeholder="https://..."
                              />
                            </div>

                            {/* Certification Status Indicator */}
                            <div className="col-span-2">
                              <div className="flex items-center gap-2 text-sm">
                                <span className={`w-2 h-2 rounded-full ${
                                  cert.expiryDate && new Date(cert.expiryDate) < new Date()
                                    ? 'bg-red-500'
                                    : 'bg-green-500'
                                }`}></span>
                                <span className="text-gray-600">
                                  {cert.expiryDate && new Date(cert.expiryDate) < new Date()
                                    ? 'Expired'
                                    : 'Active'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {certifications.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-12 bg-gray-50 rounded-xl"
                        >
                          <p className="text-gray-500">No certifications added yet. Click the Add Certification button to get started.</p>
                        </motion.div>
                      )}
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
                            Pro tip: Include certifications that are relevant to your target role. 
                            Keep them up-to-date and make sure to include verification links when available.
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAISuggestion('certifications')}
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        Get AI Suggestions →
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Preview */}
              <div className="border-l border-gray-200 pl-8">
                <div className="sticky top-8">
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

                  {/* Tab Content */}
                  {previewTab === 'preview' ? (
                    <div className="bg-gray-50 rounded-xl p-4 aspect-[1/1.4] flex items-center justify-center">
                      <p className="text-gray-500 text-sm">
                        Live preview of your resume will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        {/* Fixed height container with scrolling */}
                        <div className="h-[600px] overflow-y-auto rounded-lg bg-gray-50">
                          <pre className="p-4 text-xs text-gray-700 whitespace-pre">
                            <code>
                              {getTemplateContent(selectedTemplate)}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                className="px-6 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Previous
              </motion.button>
              {activeStep < 6 && ( // Changed from 7 to 6 since we removed one step
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveStep(Math.min(6, activeStep + 1))} // Changed from 7 to 6
                  className="px-6 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Next
                </motion.button>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isSaving}
              className={`px-6 py-2 rounded-xl text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
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
                'Save Resume'
              )}
            </motion.button>
          </div>
        </div>

        {/* AI Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">AI Assistant</h4>
              <p className="text-xs text-gray-500">Here to help with your resume</p>
            </div>
          </div>
          <button className="w-full mt-3 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100">
            Ask for help
          </button>
        </motion.div>

        {/* Add Notification component */}
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