import { motion } from 'framer-motion';

interface ResumePreviewProps {
  data: any;
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
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
      
      <div className="p-4 space-y-4">
        {/* Personal Info */}
        <div className="text-center">
          <h2 className="text-xl font-bold">{data.personalInfo?.firstName} {data.personalInfo?.lastName}</h2>
          <p className="text-gray-600">{data.personalInfo?.title}</p>
        </div>

        {/* Contact */}
        <div className="text-sm text-gray-600 flex justify-center gap-4">
          <span>{data.personalInfo?.email}</span>
          <span>{data.personalInfo?.phone}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-700">{data.personalInfo?.summary}</p>

        {/* Experience */}
        {data.experiences?.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Experience</h3>
            {data.experiences.map((exp: any, index: number) => (
              <div key={index} className="text-sm mb-2">
                <div className="font-medium">{exp.title}</div>
                <div className="text-gray-600">{exp.company}</div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.educations?.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Education</h3>
            {data.educations.map((edu: any, index: number) => (
              <div key={index} className="text-sm mb-2">
                <div className="font-medium">{edu.degree}</div>
                <div className="text-gray-600">{edu.school}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
} 