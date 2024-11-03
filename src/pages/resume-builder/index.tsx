import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DashboardLayout from '@/layouts/DashboardLayout'
import { motion } from 'framer-motion'
import { useState } from 'react'

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
    website: ''
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

  const steps = [
    { title: 'Choose Template', icon: '🎨' },
    { title: 'Personal Info', icon: '👤' },
    { title: 'Experience', icon: '💼' },
    { title: 'Education', icon: '🎓' },
    { title: 'Skills', icon: '⚡' },
  ]

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'professional', name: 'Professional', description: 'Traditional and elegant layout' },
    { id: 'creative', name: 'Creative', description: 'Unique and eye-catching design' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and straightforward presentation' },
  ]

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
                className={`flex flex-col items-center ${
                  index === activeStep ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
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
          {activeStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Template</h2>
              <div className="grid grid-cols-2 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -4 }}
                    className="p-6 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-500 transition-all duration-200"
                  >
                    <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <p className="text-gray-500 text-sm">{template.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    placeholder="John"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    placeholder="Doe"
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
                      {personalInfo.summary.length}/400 characters
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
              </div>
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setExperiences([...experiences, currentExperience]);
                    setCurrentExperience({
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
                  }}
                  className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                >
                  + Add Experience
                </motion.button>
              </div>

              {/* Experience List */}
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-xl p-6 group relative"
                  >
                    <button
                      onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-gray-400 hover:text-red-500">✕</span>
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <span className="text-2xl">💼</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </motion.div>
                ))}

                {/* Current Experience Form */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Job Title</label>
                      <input
                        type="text"
                        value={currentExperience.title}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        value={currentExperience.company}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={currentExperience.location}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="month"
                        value={currentExperience.startDate}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, startDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="month"
                          value={currentExperience.endDate}
                          onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                          disabled={currentExperience.current}
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={currentExperience.current}
                            onChange={(e) => setCurrentExperience({ ...currentExperience, current: e.target.checked })}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          Current
                        </label>
                      </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={currentExperience.description}
                        onChange={(e) => setCurrentExperience({ ...currentExperience, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none"
                        placeholder="Describe your role and responsibilities..."
                      />
                    </div>

                    {/* Achievements */}
                    <div className="col-span-2 space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                      {currentExperience.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => {
                              const newAchievements = [...currentExperience.achievements];
                              newAchievements[index] = e.target.value;
                              setCurrentExperience({ ...currentExperience, achievements: newAchievements });
                            }}
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                            placeholder="Describe a key achievement..."
                          />
                          <button
                            onClick={() => {
                              const newAchievements = currentExperience.achievements.filter((_, i) => i !== index);
                              setCurrentExperience({ ...currentExperience, achievements: newAchievements });
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setCurrentExperience({
                          ...currentExperience,
                          achievements: [...currentExperience.achievements, '']
                        })}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        + Add Achievement
                      </button>
                    </div>
                  </div>
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
                  Pro tip: Use action verbs and quantify your achievements where possible. 
                  Need help crafting impactful descriptions? Click the AI Assistant button for suggestions.
                </p>
              </div>
            </motion.div>
          )}

          {activeStep === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setEducations([...educations, currentEducation]);
                    setCurrentEducation({
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
                  }}
                  className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-100"
                >
                  + Add Education
                </motion.button>
              </div>

              {/* Education List */}
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-xl p-6 group relative"
                  >
                    <button
                      onClick={() => setEducations(educations.filter(e => e.id !== edu.id))}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-gray-400 hover:text-red-500">✕</span>
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <span className="text-2xl">🎓</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{edu.school}</h3>
                        <p className="text-sm text-gray-600">{edu.degree} in {edu.field}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{edu.location}</p>
                  </motion.div>
                ))}

                {/* Current Education Form */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">School/University</label>
                      <input
                        type="text"
                        value={currentEducation.school}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, school: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="Harvard University"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Degree</label>
                      <input
                        type="text"
                        value={currentEducation.degree}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="Bachelor of Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                      <input
                        type="text"
                        value={currentEducation.field}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, field: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={currentEducation.location}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="Cambridge, MA"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="month"
                        value={currentEducation.startDate}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, startDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="month"
                          value={currentEducation.endDate}
                          onChange={(e) => setCurrentEducation({ ...currentEducation, endDate: e.target.value })}
                          disabled={currentEducation.current}
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={currentEducation.current}
                            onChange={(e) => setCurrentEducation({ ...currentEducation, current: e.target.checked })}
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
                        value={currentEducation.gpa}
                        onChange={(e) => setCurrentEducation({ ...currentEducation, gpa: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        placeholder="3.8/4.0"
                      />
                    </div>

                    {/* Achievements */}
                    <div className="col-span-2 space-y-4">
                      <label className="block text-sm font-medium text-gray-700">Academic Achievements</label>
                      {currentEducation.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => {
                              const newAchievements = [...currentEducation.achievements];
                              newAchievements[index] = e.target.value;
                              setCurrentEducation({ ...currentEducation, achievements: newAchievements });
                            }}
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                            placeholder="Dean's List, Academic Awards, etc."
                          />
                          <button
                            onClick={() => {
                              const newAchievements = currentEducation.achievements.filter((_, i) => i !== index);
                              setCurrentEducation({ ...currentEducation, achievements: newAchievements });
                            }}
                            className="text-gray-400 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setCurrentEducation({
                          ...currentEducation,
                          achievements: [...currentEducation.achievements, '']
                        })}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        + Add Achievement
                      </button>
                    </div>
                  </div>
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
                  Pro tip: Include relevant coursework, academic achievements, and extracurricular activities that showcase your skills.
                  Need help highlighting your academic accomplishments? Click the AI Assistant button for suggestions.
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              className={`px-6 py-2 rounded-xl text-sm font-medium ${
                activeStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              disabled={activeStep === 0}
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700"
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
      </div>
    </DashboardLayout>
  )
} 