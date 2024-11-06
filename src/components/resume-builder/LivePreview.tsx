import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone: string;
  location: string;
  summary?: string;
  linkedin?: string;
  website?: string;
}

interface Experience {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  achievements: string[];
}

interface Education {
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  achievements?: string[];
}

interface Skill {
  category: string;
  name: string;
  level: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Project {
  name: string;
  title: string;
  description?: string;
  url?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies?: string[];
  highlights?: string[];
}

interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

interface LivePreviewProps {
  latexContent: string;
  formData: {
    personalInfo: PersonalInfo;
    experiences?: Experience[];
    education?: Education[];
    skills?: Skill[];
    languages?: Language[];
    projects?: Project[];
    certifications?: Certification[];
  };
  onDownloadPDF: () => void;
}

export default function LivePreview({ formData, latexContent, onDownloadPDF }: LivePreviewProps) {
  const hasItems = (arr: any[] | undefined) => arr && arr.length > 0;

  return (
    <div className="h-[800px] bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[800px] mx-auto">
          {/* Personal Info Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}
            </h1>
            <p className="text-gray-700">{formData.personalInfo?.title}</p>
            
            {/* Contact, Location & Links */}
            <div className="flex justify-center gap-3 text-sm text-gray-600 mt-2">
              {formData.personalInfo?.email && (
                <span>{formData.personalInfo.email}</span>
              )}
              {formData.personalInfo?.phone && (
                <span>• {formData.personalInfo.phone}</span>
              )}
              {formData.personalInfo?.location && (
                <span>• {formData.personalInfo.location}</span>
              )}
            </div>
            <div className="flex justify-center gap-3 text-sm text-gray-600 mt-1">
              {formData.personalInfo?.linkedin && (
                <a href={formData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">LinkedIn</a>
              )}
              {formData.personalInfo?.website && (
                <span>• <a href={formData.personalInfo.website} target="_blank" rel="noopener noreferrer" 
                          className="text-blue-600 hover:underline">Portfolio</a></span>
              )}
            </div>

            {/* Professional Summary */}
            {formData.personalInfo?.summary && (
              <div className="mt-4 text-sm text-gray-700 text-left">
                <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Professional Summary</h2>
                <p className="whitespace-pre-wrap">{formData.personalInfo.summary}</p>
              </div>
            )}
          </div>

          {/* Experience Section */}
          {hasItems(formData.experiences) && (
            <div className="mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Experience</h2>
              {formData.experiences?.map((exp, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <strong>{exp.title}</strong>
                    <span className="text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside mt-1 text-sm">
                      {exp.achievements.map((achievement: string, i: number) => (
                        achievement && <li key={i} className="text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {hasItems(formData.skills) && (
            <div className="mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Skills</h2>
              {Object.entries(
                formData.skills?.reduce((acc: any, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {}) || {}
              ).map(([category, skills]: [string, any]) => (
                <div key={category} className="mb-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: any, index: number) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm"
                        title={`Proficiency: ${skill.level}`}
                      >
                        {skill.name}
                        <span className="w-2 h-2 rounded-full" 
                              style={{
                                backgroundColor: 
                                  skill.level === 'Expert' ? '#10B981' :
                                  skill.level === 'Advanced' ? '#3B82F6' :
                                  skill.level === 'Intermediate' ? '#F59E0B' :
                                  '#6B7280'
                              }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages Section */}
          {hasItems(formData.languages) && (
            <div className="mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {formData.languages?.map((lang, index) => (
                  <span key={index} className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md text-sm">
                    {lang.name}
                    <span className="text-xs text-gray-500">({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {hasItems(formData.projects) && (
            <div className="mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Projects</h2>
              {formData.projects?.map((project, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <strong>{project.title || project.name}</strong>
                    <span className="text-gray-600">{project.startDate} - {project.current ? 'Present' : project.endDate}</span>
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-blue-600 hover:underline">{project.url}</a>
                  )}
                  {project.description && (
                    <p className="text-gray-700 mt-1 text-sm">{project.description}</p>
                  )}
                  {hasItems(project.technologies) && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies!.map((tech: string, i: number) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {hasItems(project.highlights) && (
                    <ul className="list-disc list-inside mt-2 text-sm">
                      {project.highlights!.map((highlight: string, i: number) => (
                        highlight && <li key={i} className="text-gray-700">{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications Section */}
          {hasItems(formData.certifications) && (
            <div className="mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Certifications</h2>
              {formData.certifications?.map((cert, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <strong>{cert.name}</strong>
                    <span className="text-gray-600">
                      {cert.issueDate}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">{cert.issuer}</div>
                  {cert.credentialId && (
                    <div className="text-sm text-gray-600">
                      Credential ID: {cert.credentialId}
                    </div>
                  )}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-blue-600 hover:underline">View Certificate</a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {formData.education?.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold border-b border-gray-300 mb-2">Education</h2>
              {formData.education.map((edu: any, index: number) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <strong>{edu.degree} in {edu.field}</strong>
                    <span className="text-gray-600">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{edu.school}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                  {edu.achievements?.length > 0 && (
                    <ul className="list-disc list-inside mt-1 text-sm">
                      {edu.achievements.map((achievement: string, i: number) => (
                        achievement && <li key={i} className="text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer with Download Button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={onDownloadPDF}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
} 