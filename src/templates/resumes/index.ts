import { ResumeTemplate, ResumeTemplateData } from './types';
import { TemplateError } from '@/utils/errors';
import { processTemplate } from '@/utils/latex';

export const templates: ResumeTemplate[] = [
    {
        id: 'modern',
        name: 'Modern',
        description: 'A clean and professional template with a modern design',
        preview: '/images/templates/modern-preview.png',
        features: ['ATS-Friendly', 'Clean Layout', 'Professional', 'Easy to Read'],
        template: String.raw`\documentclass[10pt, letterpaper]{article}
            \usepackage[margin=1in]{geometry}
            \usepackage{hyperref}
            \usepackage{fontawesome5}
            \usepackage{titlesec}
            \usepackage{enumitem}
            
            % Modern styling
            \pagestyle{empty}
            \titleformat{\section}{\Large\bfseries}{\thesection}{1em}{}[\titlerule]
            \titlespacing{\section}{0pt}{12pt}{6pt}
            
            \begin{document}
            % Header
            {\Large\bfseries {{personalInfo.firstName}} {{personalInfo.lastName}}}\\[0.5em]
            
            % Contact info
            \begin{center}\small
            {{#if personalInfo.location}}{{personalInfo.location}}{{/if}}
            {{#if personalInfo.email}} • \href{mailto:{{personalInfo.email}}}{{{personalInfo.email}}}{{/if}}
            {{#if personalInfo.phone}} • {{personalInfo.phone}}{{/if}}
            {{#if personalInfo.website}} • \href{{{personalInfo.website}}}{{{personalInfo.website}}}{{/if}}
            \end{center}
            
            % Summary
            {{#if personalInfo.summary}}
            \section*{Summary}
            {{personalInfo.summary}}
            {{/if}}
            
            % Experience
            {{#if experiences.length}}
            \section*{Experience}
            {{#each experiences}}
            \textbf{{{title}}} \hfill {{startDate}}{{#if current}} -- Present{{else}} -- {{endDate}}{{/if}}\\
            \textit{{{company}}} \hfill {{location}}
            {{#if description}}
            \begin{itemize}[leftmargin=*, nosep]
            \item {{description}}
            {{#each achievements}}
            \item {{this}}
            {{/each}}
            \end{itemize}
            {{/if}}
            \vspace{0.5em}
            {{/each}}
            {{/if}}
            
            % Education
            {{#if educations.length}}
            \section*{Education}
            {{#each educations}}
            \textbf{{{school}}} \hfill {{startDate}}{{#if current}} -- Present{{else}} -- {{endDate}}{{/if}}\\
            {{degree}} in {{field}} \hfill {{location}}
            {{#if gpa}} • GPA: {{gpa}}{{/if}}
            {{#if achievements.length}}
            \begin{itemize}[leftmargin=*, nosep]
            {{#each achievements}}
            \item {{this}}
            {{/each}}
            \end{itemize}
            {{/if}}
            \vspace{0.5em}
            {{/each}}
            {{/if}}
            
            % Skills
            {{#if skills.length}}
            \section*{Skills}
            {{#each skillsByCategory}}
            \textbf{{{@key}}}: {{#each this}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}\\
            {{/each}}
            {{/if}}
            
            \end{document}`
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'A unique template that helps you stand out',
        preview: '/images/templates/creative-preview.png',
        features: ['Eye-catching', 'Unique Design', 'Color Accents', 'Modern Layout'],
        template: String.raw`\documentclass[10pt, letterpaper]{article}
            % Creative template content...
            \begin{document}
            % Document content...
            \end{document}
        `
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'A traditional template perfect for corporate roles',
        preview: '/images/templates/professional-preview.png',
        features: ['Traditional', 'Corporate', 'Structured', 'Detailed'],
        template: String.raw`\documentclass[10pt, letterpaper]{article}
        % Required packages
        \usepackage[margin=1in]{geometry}
        \usepackage{hyperref}
        \usepackage{fontawesome5}
        \usepackage{titlesec}
        \usepackage{enumitem}
        
        % Custom styling
        \pagestyle{empty}
        \titleformat{\section}{\bfseries\large}{\thesection}{0em}{}[\titlerule]
        \titlespacing{\section}{0pt}{12pt}{6pt}
        
        % Custom commands for icons
        \newcommand{\locationIcon}{\faMapMarker*}
        \newcommand{\emailIcon}{\faEnvelope}
        \newcommand{\phoneIcon}{\faPhone*}
        \newcommand{\websiteIcon}{\faGlobe}
        \newcommand{\githubIcon}{\faGithub}
        
        % Bullet customization
        \renewcommand{\labelitemi}{$\circ$}
        
        \begin{document}
        
        % Header
        {\Large\bfseries {{firstName}} {{lastName}}}
        
        % Contact info line with icons
        \vspace{0.5em}
        \begin{center}
        \small
        {{#if location}}\locationIcon~{{location}}{{/if}}
        {{#if email}} \emailIcon~\href{mailto:{{email}}}{{{email}}}{{/if}}
        {{#if phone}} \phoneIcon~\href{tel:{{phone}}}{{{phone}}}{{/if}}
        {{#if website}} \websiteIcon~\href{{{website}}}{{{website}}}{{/if}}
        {{#if github}} \githubIcon~\href{{{github}}}{{{github}}}{{/if}}
        \end{center}
        
        % Last updated date
        \begin{flushright}
        \small\textit{Last updated in {{currentDate}}}
        \end{flushright}
        
        % Welcome section (if needed)
        {{#if summary}}
        \section*{Welcome to RenderCV!}
        {{summary}}
        {{/if}}
        
        % Quick Guide section
        \section*{Quick Guide}
        \begin{itemize}[leftmargin=*]
        \item Each section title is arbitrary and each section contains a list of entries.
        \item There are 7 unique entry types: BulletEntry, TextEntry, EducationEntry, ExperienceEntry, NormalEntry, PublicationEntry, and ProjectEntry.
        \item Select a section title, pick an entry type, and start writing your section!
        \end{itemize}
        
        % Education section
        \section*{Education}
        {{#each educations}}
        \textbf{University of {{school}}} \hfill {{startDate}} -- {{#if current}}Present{{else}}{{endDate}}{{/if}}\\
        {{degree}} in {{field}} \hfill {{location}}\\
        {{#if gpa}}
        \textbullet~GPA: {{gpa}}
        {{/if}}
        {{#if achievements.length}}
        \begin{itemize}[leftmargin=*, itemsep=0pt]
        \item Coursework: {{achievements.[0]}}
        {{#each achievements}}
        {{#unless @first}}
        \item {{this}}
        {{/unless}}
        {{/each}}
        \end{itemize}
        {{/if}}
        \vspace{0.5em}
        {{/each}}
        
        % Experience section
        \section*{Experience}
        {{#each experiences}}
        \textbf{{{title}}} \hfill {{location}}\\
        \textit{{{company}}} \hfill {{startDate}} -- {{#if current}}Present{{else}}{{endDate}}{{/if}}
        {{#if description}}
        \begin{itemize}[leftmargin=*, itemsep=0pt]
        \item {{description}}
        {{#each achievements}}
        \item {{this}}
        {{/each}}
        \end{itemize}
        {{/if}}
        \vspace{0.5em}
        {{/each}}
        
        % Publications section (if exists in data)
        {{#if publications.length}}
        \section*{Publications}
        {{#each publications}}
        \textbf{{{title}}} \hfill {{date}}\\
        {{authors}}\\
        \textit{{{journal}}}
        {{#if doi}}
        \href{https://doi.org/{{doi}}}{[DOI: {{doi}}]}
        {{/if}}
        \vspace{0.5em}
        {{/each}}
        {{/if}}
        
        % Projects section
        {{#if projects.length}}
        \section*{Projects}
        {{#each projects}}
        \textbf{{{title}}} {{#if url}}\href{{{url}}}{\small[Link]}{{/if}}\\
        {{description}}
        {{#if highlights.length}}
        \begin{itemize}[leftmargin=*, itemsep=0pt]
        {{#each highlights}}
        \item {{this}}
        {{/each}}
        \end{itemize}
        {{/if}}
        \vspace{0.5em}
        {{/each}}
        {{/if}}
        
        \end{document}
        `
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'A clean and minimalist design that focuses on content',
        preview: '/images/templates/minimal-preview.png',
        features: ['Minimalist', 'Space-Efficient', 'Content-Focused', 'Elegant'],
        template: String.raw`\documentclass[10pt, letterpaper]{article}
            \usepackage[margin=1in]{geometry}
            \usepackage{hyperref}
            \usepackage{fontawesome5}
            \usepackage{titlesec}
            
            % Minimal styling
            \pagestyle{empty}
            \titleformat{\section}{\Large\bfseries}{\thesection}{1em}{}[\titlerule]
            \titlespacing{\section}{0pt}{12pt}{6pt}
            
            \begin{document}
            % Header
            \begin{center}
                {\Huge\textbf{ {{firstName}} {{lastName}} }}\\[6pt]
                {\large {{title}} }\\[6pt]
                \href{mailto:{{email}}}{ {{email}} } $\cdot$
                \href{tel:{{phone}}}{ {{phone}} } $\cdot$
                {{location}}
                {{#if linkedin}}
                $\cdot$ \href{ {{linkedin}} }{\faLinkedin}
                {{/if}}
                {{#if website}}
                $\cdot$ \href{ {{website}} }{\faGlobe}
                {{/if}}
            \end{center}

            % Summary
            {{#if summary}}
            \section*{Summary}
            {{summary}}
            {{/if}}

            % Experience
            {{#if experiences.length}}
            \section*{Experience}
            {{#each experiences}}
            \textbf{ {{title}} } $\cdot$ \textit{ {{company}} }\\
            {{location}} $\cdot$ {{startDate}}{{#if current}} -- Present{{else}} -- {{endDate}}{{/if}}
            \begin{itemize}
                \item {{description}}
                {{#each achievements}}
                \item {{this}}
                {{/each}}
            \end{itemize}
            {{/each}}
            {{/if}}

            % Education
            {{#if educations.length}}
            \section*{Education}
            {{#each educations}}
            \textbf{ {{school}} } $\cdot$ {{location}}\\
            {{degree}} in {{field}}{{#if gpa}} $\cdot$ GPA: {{gpa}}{{/if}}\\
            {{startDate}}{{#if current}} -- Present{{else}} -- {{endDate}}{{/if}}
            {{#if achievements.length}}
            \begin{itemize}
                {{#each achievements}}
                \item {{this}}
                {{/each}}
            \end{itemize}
            {{/if}}
            {{/each}}
            {{/if}}

            % Skills
            {{#if skills.length}}
            \section*{Skills}
            {{#each skillsByCategory}}
            \textbf{ {{@key}} }: {{#each this}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}\\
            {{/each}}
            {{/if}}

            \end{document}
        `
    }
];

export function getTemplate(id: string): ResumeTemplate {
    const template = templates.find(t => t.id === id);
    if (!template) {
        throw new TemplateError(`Template with id '${id}' not found`);
    }
    return template;
}

export function processResumeTemplate(templateId: string, data: ResumeTemplateData): string {
    try {
        const template = getTemplate(templateId);
        
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

        return processTemplate(template.template, data);
    } catch (error) {
        if (error instanceof TemplateError) {
            throw error;
        }
        throw new TemplateError(
            'Failed to process resume template',
            error instanceof Error ? error.message : undefined
        );
    }
}

export function validateTemplateData(data: ResumeTemplateData): void {
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

export function getAllTemplates(): ResumeTemplate[] {
    return templates;
}

export function getTemplatePreview(templateId: string): string {
    const template = getTemplate(templateId);
    return template.preview;
}

export function getTemplateFeatures(templateId: string): string[] {
    const template = getTemplate(templateId);
    return template.features;
}

export async function generateResume(templateId: string, data: ResumeTemplateData): Promise<string> {
    try {
        // Validate the data first
        validateTemplateData(data);

        // Process the template with the data
        const processedTemplate = processResumeTemplate(templateId, data);

        // Return the processed LaTeX content
        return processedTemplate;
    } catch (error) {
        if (error instanceof TemplateError) {
            throw error;
        }
        throw new TemplateError(
            'Failed to generate resume',
            error instanceof Error ? error.message : undefined
        );
    }
}