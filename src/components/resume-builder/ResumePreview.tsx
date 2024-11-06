import { motion } from 'framer-motion';

interface Language {
  name: string;
  proficiency: string;
}

interface Project {
  name: string;
  description?: string;
  url?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies?: string[];
}

interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  url?: string;
}

interface ResumePreviewProps {
  data: {
    personalInfo?: {
      firstName?: string;
      lastName?: string;
      title?: string;
      email?: string;
      phone?: string;
      linkedin?: string;
      website?: string;
      summary?: string;
    };
    experiences?: Array<{
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description?: string;
      achievements?: string[];
    }>;
    education?: Array<{
      school: string;
      degree: string;
      field: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      gpa?: string;
      achievements?: string[];
    }>;
    skills?: Array<{
      name: string;
      level: string;
      category: string;
    }>;
    languages?: Language[];
    projects?: Project[];
    certifications?: Certification[];
  };
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  // Helper function to check if a section has valid data
  const hasValidData = (section: any[] | undefined): boolean => {
    return Array.isArray(section) && section.length > 0;
  };

  // Add template switching preview
  const TemplatePreview = ({ template, data }) => {
    return (
      <div className="relative">
        {/* Add quick template switcher */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="p-2 bg-white rounded-lg shadow hover:bg-gray-50">
            Previous Template
          </button>
          <button className="p-2 bg-white rounded-lg shadow hover:bg-gray-50">
            Next Template
          </button>
        </div>
        {/* Existing preview content */}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-24 right-6 w-[400px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Live Preview</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="text-sm">⤢</span>
        </button>
      </div>
      
      <div className="p-4 space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto">
        {/* Personal Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {data.personalInfo?.firstName} {data.personalInfo?.lastName}
          </h2>
          <p className="text-lg text-gray-600">{data.personalInfo?.title}</p>
          
          {/* Contact & Links */}
          <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2">
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
          </div>
          <div className="flex justify-center gap-4 text-sm text-gray-600 mt-1">
            {data.personalInfo?.linkedin && (
              <a href={data.personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
            )}
            {data.personalInfo?.website && (
              <span>• <a href={data.personalInfo.website} className="text-blue-600 hover:underline">Portfolio</a></span>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.personalInfo?.summary && (
          <p className="text-sm text-gray-700">{data.personalInfo.summary}</p>
        )}

        {/* Experience */}
        {hasValidData(data.experiences) && (
          <div>
            <h3 className="font-medium mb-2">Experience</h3>
            {data.experiences!.map((exp, index) => (
              <div key={index} className="text-sm mb-3">
                <div className="flex justify-between">
                  <div className="font-medium">{exp.title}</div>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                )}
                {hasValidData(exp.achievements) && (
                  <ul className="list-disc list-inside mt-1">
                    {exp.achievements!.map((achievement, i) => (
                      achievement && <li key={i} className="text-gray-700">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {hasValidData(data.skills) && (
          <div>
            <h3 className="font-medium mb-2">Skills</h3>
            {Object.entries(
              data.skills!.reduce((acc: any, skill) => {
                if (!acc[skill.category]) {
                  acc[skill.category] = [];
                }
                acc[skill.category].push(skill);
                return acc;
              }, {})
            ).map(([category, skills]: [string, any]) => (
              <div key={category} className="mb-2">
                <div className="text-sm font-medium text-gray-600 mb-1">{category}</div>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill: any, index: number) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs"
                      title={`Level: ${skill.level}`}
                    >
                      {skill.name}
                      <span 
                        className="w-1.5 h-1.5 rounded-full"
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

        {/* Languages */}
        {hasValidData(data.languages) && (
          <div>
            <h3 className="font-medium mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {data.languages!.map((lang, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                  {lang.name}
                  <span className="text-gray-500">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasValidData(data.projects) && (
          <div>
            <h3 className="font-medium mb-2">Projects</h3>
            {data.projects!.map((project, index) => (
              <div key={index} className="text-sm mb-3">
                <div className="flex justify-between">
                  <div className="font-medium">{project.name}</div>
                  <span className="text-gray-600">
                    {project.startDate} - {project.current ? 'Present' : project.endDate}
                  </span>
                </div>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline text-xs">{project.url}</a>
                )}
                {project.description && (
                  <p className="text-gray-700 mt-1">{project.description}</p>
                )}
                {hasValidData(project.technologies) && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies!.map((tech, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {hasValidData(data.certifications) && (
          <div>
            <h3 className="font-medium mb-2">Certifications</h3>
            {data.certifications!.map((cert, index) => (
              <div key={index} className="text-sm mb-2">
                <div className="flex justify-between">
                  <div className="font-medium">{cert.name}</div>
                  <span className="text-gray-600">{cert.issueDate}</span>
                </div>
                <div className="text-gray-600">{cert.issuer}</div>
                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline text-xs">View Certificate</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
} 