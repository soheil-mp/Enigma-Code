import { ResumeTemplate, ResumeTemplateData } from './types';
import { templates } from './index';
import { generatePDF } from '@/services/latexService';
import { TemplateError } from '@/utils/errors';
import { processTemplate } from '@/utils/latex';

export class TemplateManager {
  private templates: Map<string, ResumeTemplate>;

  constructor() {
    this.templates = new Map(templates.map(template => [template.id, template]));
  }

  public getTemplate(id: string): ResumeTemplate {
    const template = this.templates.get(id);
    if (!template) {
      throw new TemplateError(`Template with id '${id}' not found`);
    }
    return template;
  }

  public getAllTemplates(): ResumeTemplate[] {
    return Array.from(this.templates.values());
  }

  public async generatePDF(templateId: string, data: ResumeTemplateData): Promise<Blob> {
    try {
      // Get and process the template
      const template = this.getTemplate(templateId);
      
      // Process skills into categories if they exist
      if (data.skills?.length) {
        const skillsByCategory = data.skills.reduce((acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push(skill.name);
          return acc;
        }, {} as Record<string, string[]>);
        
        data = {
          ...data,
          skillsByCategory
        };
      }

      // Process the template with data
      const processedContent = processTemplate(template.template, data);

      // Generate PDF from the processed LaTeX content
      return await generatePDF(processedContent);
    } catch (error) {
      if (error instanceof Error) {
        throw new TemplateError(
          'Failed to generate PDF',
          error.message
        );
      }
      throw new TemplateError('Failed to generate PDF');
    }
  }

  public validateTemplateData(data: ResumeTemplateData): void {
    if (!data.personalInfo) {
      throw new TemplateError('Missing personal information');
    }

    const requiredFields = ['firstName', 'lastName', 'email'] as const;
    const missingFields = requiredFields.filter(field => !data.personalInfo[field]);
    
    if (missingFields.length > 0) {
      throw new TemplateError(
        'Missing required fields',
        `The following fields are required: ${missingFields.join(', ')}`
      );
    }
  }
}

// Create and export a singleton instance
export const templateManager = new TemplateManager();