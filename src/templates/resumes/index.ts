// Import templates as raw text
const modernTemplate = String.raw`\documentclass[10pt, letterpaper]{article}

% Packages:
\usepackage[
    ignoreheadfoot,
    top=2 cm,
    bottom=2 cm,
    left=2 cm,
    right=2 cm,
    footskip=1.0 cm,
]{geometry}
\usepackage{titlesec}
\usepackage{tabularx}
\usepackage{array}
\usepackage[dvipsnames]{xcolor}
\definecolor{primaryColor}{RGB}{0, 79, 144}
\usepackage{enumitem}
\usepackage{fontawesome5}
\usepackage{amsmath}
\usepackage[
    pdftitle={Resume},
    pdfauthor={},
    pdfcreator={LaTeX with RenderCV},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref}
\usepackage[pscoord]{eso-pic}
\usepackage{calc}
\usepackage{bookmark}
\usepackage{lastpage}
\usepackage{changepage}
\usepackage{paracol}
\usepackage{ifthen}
\usepackage{needspace}
\usepackage{iftex}

% ATS Readability
\ifPDFTeX
    \input{glyphtounicode}
    \pdfgentounicode=1
    \usepackage[utf8]{inputenc}
    \usepackage{lmodern}
\fi

% Settings
\AtBeginEnvironment{adjustwidth}{\\partopsep0pt}
\pagestyle{empty}
\setcounter{secnumdepth}{0}
\setlength{\\parindent}{0pt}
\setlength{\\topskip}{0pt}
\setlength{\\columnsep}{0cm}

% Custom footer
\makeatletter
\let\\ps@customFooterStyle\\ps@plain
\patchcmd{\\\ps@customFooterStyle}{\\\thepage}{
    \\\color{gray}\\\textit{\\\small {{firstName}} {{lastName}} - Page \\\thepage{} of \\\pageref*{LastPage}}
}{}{} 
\makeatother
\pagestyle{customFooterStyle}

% Section formatting
\titleformat{\\\section}{\\\needspace{4\\baselineskip}\\\bfseries\\\large}{}{0pt}{}[\\\vspace{1pt}\\\titlerule]
\titlespacing{\\\section}{-1pt}{0.3 cm}{0.2 cm}

% Custom environments
\renewcommand\\\labelitemi{$\\\circ$}

\newenvironment{highlights}{
    \begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=0.4 cm + 10pt
    ]
}{
    \end{itemize}
}

\newenvironment{highlightsforbulletentries}{
    \begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=10pt
    ]
}{
    \end{itemize}
}

\newenvironment{onecolentry}{
    \begin{adjustwidth}{0.2 cm + 0.00001 cm}{0.2 cm + 0.00001 cm}
}{
    \end{adjustwidth}
}

\newenvironment{twocolentry}[2][]{
    \onecolentry
    \def\\secondColumn{#2}
    \setcolumnwidth{\\\fill, 4.5 cm}
    \begin{paracol}{2}
}{
    \switchcolumn \\\\raggedleft \\\\secondColumn
    \end{paracol}
    \endonecolentry
}

\newenvironment{header}{
    \setlength{\\\topsep}{0pt}\\\par\\\kern\\\topsep\\\centering\\\linespread{1.5}
}{
    \\\par\\\kern\\\topsep
}

% Commands
\let\\hrefWithoutArrow\\href
\renewcommand{\\\href}[2]{\\\hrefWithoutArrow{#1}{\\\ifthenelse{\\\equal{#2}{}}{}{#2}\\\raisebox{.15ex}{\\\footnotesize \\faExternalLink*}}}

\begin{document}
    \newcommand{\\\AND}{\\\unskip
        \\\cleaders\\\copy\\\ANDbox\\\hskip\\\wd\\\ANDbox
        \\\ignorespaces
    }
    \newsavebox\\\ANDbox
    \sbox\\\ANDbox{}

    \begin{header}
        \\\textbf{\\\fontsize{24 pt}{24 pt}\\\selectfont {{firstName}} {{lastName}}}

        \\\vspace{0.3 cm}

        \\\normalsize
        \\\mbox{{\\\color{black}\\\footnotesize\\\faMapMarker*}\\\hspace*{0.13cm}{{location}}}%
        \\\kern 0.25 cm%
        \\\AND%
        \\\kern 0.25 cm%
        \\\mbox{\\\hrefWithoutArrow{mailto:{{email}}}{\\\color{black}{\\\footnotesize\\\faEnvelope[regular]}\\hspace*{0.13cm}{{email}}}}%
        \\\kern 0.25 cm%
        \\\AND%
        \\\kern 0.25 cm%
        \\\mbox{\\\hrefWithoutArrow{tel:{{phone}}}{\\\color{black}\\\footnotesize\\\faPhone*}\\hspace*{0.13cm}{{phone}}}}%
        {{#if website}}
        \\\kern 0.25 cm%
        \\\AND%
        \\\kern 0.25 cm%
        \\\mbox{\\\hrefWithoutArrow{{{website}}}{\\\color{black}\\\footnotesize\\\faLink\\hspace*{0.13cm}{{website}}}}%
        {{/if}}
        {{#if linkedin}}
        \\\kern 0.25 cm%
        \\\AND%
        \\\kern 0.25 cm%
        \\\mbox{\\\hrefWithoutArrow{{{linkedin}}}{\\\color{black}\\\footnotesize\\\faLinkedinIn\\hspace*{0.13cm}LinkedIn}}%
        {{/if}}
    \end{header}

    \\\vspace{0.3 cm}

    {{#if summary}}
    \\\section{Summary}
    \\\begin{onecolentry}
        {{summary}}
    \\\end{onecolentry}
    {{/if}}

    {{#if experiences.length}}
    \\\section{Experience}
    {{#each experiences}}
    \\\begin{twocolentry}{
    \\\textit{ {{location}} }    
    \\\textit{ {{startDate}} {{#if current}}– Present{{else}}– {{endDate}}{{/if}} }}
        \\\textbf{ {{title}} }
        \\\textit{ {{company}} }
    \\\end{twocolentry}

    \\\vspace{0.10 cm}
    \\\begin{onecolentry}
        \\\begin{highlights}
            \\\item {{description}}
            {{#each achievements}}
            \\\item {{this}}
            {{/each}}
        \\\end{highlights}
    \\\end{onecolentry}
    {{#unless @last}}\\\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if educations.length}}
    \\\section{Education}
    {{#each educations}}
    \\\begin{twocolentry}{
    \\\textit{ {{startDate}} {{#if current}}– Present{{else}}– {{endDate}}{{/if}} }}
        \\\textbf{ {{school}} }
        \\\textit{ {{degree}} in {{field}} }
    \\\end{twocolentry}

    \\\vspace{0.10 cm}
    \\\begin{onecolentry}
        \\\begin{highlights}
            {{#if gpa}}\\\item GPA: {{gpa}}{{/if}}
            {{#each achievements}}
            \\\item {{this}}
            {{/each}}
        \\\end{highlights}
    \\\end{onecolentry}
    {{#unless @last}}\\\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if skills.length}}
    \\\section{Skills}
    {{#each skillsByCategory}}
    \\\begin{onecolentry}
        \\\textbf{ {{category}} :} {{#each skills}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}
    \\\end{onecolentry}
    {{#unless @last}}\\\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if projects.length}}
    \\\section{Projects}
    {{#each projects}}
    \\\begin{twocolentry}{
    {{#if url}}\\\textit{\\\href{ {{url}} }{ {{url}} }}{{/if}}
    }
        \\\textbf{ {{title}} }
    \\\end{twocolentry}

    \\\vspace{0.10 cm}
    \\\begin{onecolentry}
        \\\begin{highlights}
            \\\item {{description}}
            {{#each highlights}}
            \\\item {{this}}
            {{/each}}
            {{#if technologies.length}}
            \\\item \\\textbf{Technologies:} {{technologies}}
            {{/if}}
        \\\end{highlights}
    \\\end{onecolentry}
    {{#unless @last}}\\\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

\end{document}`;

const professionalTemplate = String.raw`\documentclass[10pt, letterpaper]{article}

% Packages:
\usepackage[
    ignoreheadfoot,
    top=2 cm,
    bottom=2 cm,
    left=2 cm,
    right=2 cm,
    footskip=1.0 cm,
]{geometry}
\usepackage{titlesec}
\usepackage{tabularx}
\usepackage{array}
\usepackage[dvipsnames]{xcolor}
\definecolor{primaryColor}{RGB}{0, 79, 144}
\usepackage{enumitem}
\usepackage{fontawesome5}
\usepackage{amsmath}
\usepackage[
    pdftitle={ {{firstName}}'s CV},
    pdfauthor={ {{firstName}} {{lastName}} },
    pdfcreator={LaTeX with RenderCV},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref}
\usepackage[pscoord]{eso-pic}
\usepackage{calc}
\usepackage{bookmark}
\usepackage{lastpage}
\usepackage{changepage}
\usepackage{paracol}
\usepackage{ifthen}
\usepackage{needspace}
\usepackage{iftex}

% Ensure that generate pdf is machine readable/ATS parsable:
\ifPDFTeX
    \input{glyphtounicode}
    \pdfgentounicode=1
    \usepackage[utf8]{inputenc}
    \usepackage{lmodern}
\fi

% Some settings:
\AtBeginEnvironment{adjustwidth}{\partopsep0pt}
\pagestyle{empty}
\setcounter{secnumdepth}{0}
\setlength{\parindent}{0pt}
\setlength{\topskip}{0pt}
\setlength{\columnsep}{0cm}
\makeatletter
\let\ps@customFooterStyle\ps@plain
\patchcmd{\ps@customFooterStyle}{\thepage}{
    \color{gray}\textit{\small {{firstName}} {{lastName}} - Page \thepage{} of \pageref*{LastPage}}
}{}{}
\makeatother
\pagestyle{customFooterStyle}

\titleformat{\section}{\needspace{4\baselineskip}\bfseries\large}{}{0pt}{}[\vspace{1pt}\titlerule]

\titlespacing{\section}{
    -1pt
}{
    0.3 cm
}{
    0.2 cm
}

\renewcommand\labelitemi{$\circ$}
\newenvironment{highlights}{
    \begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=0.4 cm + 10pt
    ]
}{
    \end{itemize}
}

\newenvironment{highlightsforbulletentries}{
    \begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=10pt
    ]
}{
    \end{itemize}
}

\newenvironment{onecolentry}{
    \begin{adjustwidth}{
        0.2 cm + 0.00001 cm
    }{
        0.2 cm + 0.00001 cm
    }
}{
    \end{adjustwidth}
}

\newenvironment{twocolentry}[2][]{
    \onecolentry
    \def\secondColumn{#2}
    \setcolumnwidth{\fill, 4.5 cm}
    \begin{paracol}{2}
}{
    \switchcolumn \raggedleft \secondColumn
    \end{paracol}
    \endonecolentry
}

\newenvironment{header}{
    \setlength{\topsep}{0pt}\par\kern\topsep\centering\linespread{1.5}
}{
    \par\kern\topsep
}

\newcommand{\placelastupdatedtext}{%
  \AddToShipoutPictureFG*{%
    \put(
        \LenToUnit{\paperwidth-2 cm-0.2 cm+0.05cm},
        \LenToUnit{\paperheight-1.0 cm}
    ){\vtop{{\null}\makebox[0pt][c]{
        \small\color{gray}\textit{Last updated in {{currentDate}} }\hspace{\widthof{Last updated in {{currentDate}} }}
    }}}%
  }%
}%

\let\hrefWithoutArrow\href
\renewcommand{\href}[2]{\hrefWithoutArrow{#1}{\ifthenelse{\equal{#2}{}}{ }{#2 }\raisebox{.15ex}{\footnotesize \faExternalLink*}}}

\begin{document}
    \newcommand{\AND}{\unskip
        \cleaders\copy\ANDbox\hskip\wd\ANDbox
        \ignorespaces
    }
    \newsavebox\ANDbox
    \sbox\ANDbox{}

    \placelastupdatedtext
    \begin{header}
        \textbf{\fontsize{24 pt}{24 pt}\selectfont {{firstName}} {{lastName}}}

        \vspace{0.3 cm}

        \normalsize
        \mbox{{\color{black}\footnotesize\faMapMarker*}\hspace*{0.13cm}{{location}}}%
        \kern 0.25 cm%
        \AND%
        \kern 0.25 cm%
        \mbox{\hrefWithoutArrow{mailto:{{email}}}{\color{black}{\footnotesize\faEnvelope[regular]}\hspace*{0.13cm}{{email}}}}%
        \kern 0.25 cm%
        \AND%
        \kern 0.25 cm%
        \mbox{\hrefWithoutArrow{tel:{{phone}}}{\color{black}{\footnotesize\faPhone*}\hspace*{0.13cm}{{phone}}}}%
        {{#if website}}
        \kern 0.25 cm%
        \AND%
        \kern 0.25 cm%
        \mbox{\hrefWithoutArrow{ {{website}} }{\color{black}{\footnotesize\faLink}\hspace*{0.13cm}{{website}}}}%
        {{/if}}
        {{#if linkedin}}
        \kern 0.25 cm%
        \AND%
        \kern 0.25 cm%
        \mbox{\hrefWithoutArrow{ {{linkedin}} }{\color{black}{\footnotesize\faLinkedinIn}\hspace*{0.13cm}LinkedIn}}%
        {{/if}}
    \end{header}

    \vspace{0.3 cm}

    {{#if summary}}
    \section{Summary}
    \begin{onecolentry}
        {{summary}}
    \end{onecolentry}
    {{/if}}

    {{#if experiences.length}}
    \section{Experience}
    {{#each experiences}}
    \begin{twocolentry}{
    \textit{ {{location}} }    
    \textit{ {{startDate}} {{#if current}}– Present{{else}}– {{endDate}}{{/if}} }}
        \textbf{ {{title}} }
        \textit{ {{company}} }
    \end{twocolentry}

    \vspace{0.10 cm}
    \begin{onecolentry}
        \begin{highlights}
            \item {{description}}
            {{#each achievements}}
            \item {{this}}
            {{/each}}
        \end{highlights}
    \end{onecolentry}
    {{#unless @last}}\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if educations.length}}
    \section{Education}
    {{#each educations}}
    \begin{twocolentry}{
    \textit{ {{startDate}} {{#if current}}– Present{{else}}– {{endDate}}{{/if}} }}
        \textbf{ {{school}} }
        \textit{ {{degree}} in {{field}} }
    \end{twocolentry}

    \vspace{0.10 cm}
    \begin{onecolentry}
        \begin{highlights}
            {{#if gpa}}\item GPA: {{gpa}}{{/if}}
            {{#each achievements}}
            \item {{this}}
            {{/each}}
        \end{highlights}
    \end{onecolentry}
    {{#unless @last}}\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if skills.length}}
    \section{Skills}
    {{#each skillsByCategory}}
    \begin{onecolentry}
        \textbf{ {{category}} :} {{#each skills}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}
    \end{onecolentry}
    {{#unless @last}}\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if projects.length}}
    \section{Projects}
    {{#each projects}}
    \begin{twocolentry}{
    {{#if url}}\textit{\href{ {{url}} }{ {{url}} }}{{/if}}
    }
        \textbf{ {{title}} }
    \end{twocolentry}

    \vspace{0.10 cm}
    \begin{onecolentry}
        \begin{highlights}
            \item {{description}}
            {{#each highlights}}
            \item {{this}}
            {{/each}}
            {{#if technologies.length}}
            \item \textbf{Technologies:} {{technologies}}
            {{/if}}
        \end{highlights}
    \end{onecolentry}
    {{#unless @last}}\vspace{0.2 cm}{{/unless}}
    {{/each}}
    {{/if}}

\end{document}`;

const creativeTemplate = String.raw`\documentclass[10pt, letterpaper]{article}

\usepackage[
    ignoreheadfoot,
    top=2cm,
    bottom=2cm,
    left=2cm,
    right=2cm,
    footskip=1.0cm
]{geometry}
\usepackage{titlesec}
\usepackage{xcolor}
\usepackage{fontawesome5}
\usepackage{hyperref}
\usepackage{enumitem}

% Define colors
\definecolor{primary}{RGB}{139, 92, 246}
\definecolor{secondary}{RGB}{236, 72, 153}

% Section formatting
\titleformat{\section}
    {\Large\bfseries\color{primary}}
    {}{0em}
    {}[\vspace{0.5em}]

\begin{document}
    % Header with gradient-like effect
    \begin{center}
        {\color{primary}\Huge\bfseries {{firstName}} }{\color{secondary}\Huge\bfseries {{lastName}}}\\[0.5em]
        {\Large\color{primary} {{title}}}\\[0.5em]
        \small{
            \faEnvelope\ {{email}} |
            \faPhone\ {{phone}} |
            \faMapMarker*\ {{location}}
            {{#if linkedin}}
                | \faLinkedinIn\ \href{ {{linkedin}} }{LinkedIn}
            {{/if}}
            {{#if website}}
                | \faGlobe\ \href{ {{website}} }{Portfolio}
            {{/if}}
        }
    \end{center}

    {{#if summary}}
    % Summary
    \section*{\faUser\ About Me}
    {{summary}}
    {{/if}}

    {{#if experiences.length}}
    % Experience
    \section*{\faBriefcase\ Experience}
    {{#each experiences}}
        {\large\color{primary}\textbf{ {{title}} }}\\
        {\large\color{secondary}\textit{ {{company}} }}
        \hfill {{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}\\
        \textit{ {{location}} }\\[0.5em]
        \begin{itemize}[leftmargin=*]
            \item {{description}}
            {{#each achievements}}
                \item {{this}}
            {{/each}}
        \end{itemize}
        {{#unless @last}}\vspace{1em}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if educations.length}}
    % Education
    \section*{\faGraduationCap\ Education}
    {{#each educations}}
        {\large\color{primary}\textbf{ {{degree}} in {{field}} }}\\
        {\large\color{secondary}\textit{ {{school}} }}
        \hfill {{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}\\
        \textit{ {{location}} }
        {{#if gpa}}\\GPA: {{gpa}}{{/if}}
        {{#if achievements.length}}
            \begin{itemize}[leftmargin=*]
                {{#each achievements}}
                    \item {{this}}
                {{/each}}
            \end{itemize}
        {{/if}}
        {{#unless @last}}\vspace{1em}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if skills.length}}
    % Skills
    \section*{\faLightbulb\ Skills}
    {{#each skillsByCategory}}
        {\color{primary}\textbf{ {{category}} :}} {{#each skills}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}\\
    {{/each}}
    {{/if}}

    {{#if projects.length}}
    % Projects
    \section*{\faRocket\ Projects}
    {{#each projects}}
        {\large\color{primary}\textbf{ {{title}} }}
        {{#if url}}\href{ {{url}} }{[\faExternalLinkAlt]}{{/if}}\\
        \begin{itemize}[leftmargin=*]
            \item {{description}}
            {{#each highlights}}
                \item {{this}}
            {{/each}}
            {{#if technologies.length}}
                \item {\color{secondary}\textbf{Technologies:}} {{technologies}}
            {{/if}}
        \end{itemize}
        {{#unless @last}}\vspace{1em}{{/unless}}
    {{/each}}
    {{/if}}
\end{document}`;

const minimalTemplate = String.raw`\documentclass[10pt, letterpaper]{article}

\usepackage[
    ignoreheadfoot,
    top=2cm,
    bottom=2cm,
    left=2cm,
    right=2cm
]{geometry}
\usepackage{titlesec}
\usepackage{xcolor}
\usepackage{hyperref}
\usepackage{enumitem}

% Minimal styling
\pagestyle{empty}
\setlength{\parindent}{0pt}

% Section formatting
\titleformat{\section}
    {\Large\bfseries}
    {}{0em}
    {}[\vspace{0.2em}\hrule\vspace{0.5em}]

\begin{document}
    % Header
    \begin{center}
        {\Large\bfseries {{firstName}} {{lastName}}}\\[0.3em]
        {{title}}\\[0.3em]
        \small{
            {{email}} | {{phone}} | {{location}}
            {{#if linkedin}} | \href{ {{linkedin}} }{LinkedIn}{{/if}}
            {{#if website}} | \href{ {{website}} }{Website}{{/if}}
        }
    \end{center}

    {{#if summary}}
    % Summary
    \section*{Summary}
    {{summary}}
    {{/if}}

    {{#if experiences.length}}
    % Experience
    \section*{Experience}
    {{#each experiences}}
        \textbf{ {{title}} } \hfill {{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}\\
        \textit{ {{company}} } \hfill {{location}}\\[0.3em]
        \begin{itemize}[leftmargin=*,nosep]
            \item {{description}}
            {{#each achievements}}
                \item {{this}}
            {{/each}}
        \end{itemize}
        {{#unless @last}}\vspace{0.8em}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if educations.length}}
    % Education
    \section*{Education}
    {{#each educations}}
        \textbf{ {{degree}} in {{field}} } \hfill {{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}\\
        \textit{ {{school}} } \hfill {{location}}
        {{#if gpa}}\\GPA: {{gpa}}{{/if}}
        {{#if achievements.length}}
            \begin{itemize}[leftmargin=*,nosep]
                {{#each achievements}}
                    \item {{this}}
                {{/each}}
            \end{itemize}
        {{/if}}
        {{#unless @last}}\vspace{0.8em}{{/unless}}
    {{/each}}
    {{/if}}

    {{#if skills.length}}
    % Skills
    \section*{Skills}
    {{#each skillsByCategory}}
        \textbf{ {{category}} :} {{#each skills}}{{name}}{{#unless @last}}, {{/unless}}{{/each}}\\
    {{/each}}
    {{/if}}

    {{#if projects.length}}
    % Projects
    \section*{Projects}
    {{#each projects}}
        \textbf{ {{title}} }{{#if url}} \href{ {{url}} }{[Link]}{{/if}}\\
        \begin{itemize}[leftmargin=*,nosep]
            \item {{description}}
            {{#each highlights}}
                \item {{this}}
            {{/each}}
            {{#if technologies.length}}
                \item \textbf{Technologies:} {{technologies}}
            {{/if}}
        \end{itemize}
        {{#unless @last}}\vspace{0.8em}{{/unless}}
    {{/each}}
    {{/if}}
\end{document}`;

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