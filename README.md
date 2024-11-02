# Resume Builder

A modern resume builder application built with Next.js, featuring AI-powered tools for job search optimization.

## Project Structure

```
src/                          # Source directory
├── components/               # React components
│   ├── common/              # Shared/reusable components
│   │   └── LoadingSpinner   # Loading animation component
│   ├── dashboard/           # Dashboard-specific components
│   │   ├── resume-builder/  # Resume builder components
│   │   │   ├── ContentEditor     # Resume content editing interface
│   │   │   ├── ResumeBuilder     # Main resume builder component
│   │   │   ├── ResumePreview     # Live preview component
│   │   │   ├── Section           # Section management
│   │   │   └── TemplateSelector  # Resume template selection
│   │   └── ToolCard         # Dashboard tool card component
│   ├── home/                # Landing page components
│   │   ├── FAQ             # Frequently asked questions
│   │   ├── Features        # Feature showcase
│   │   ├── Hero            # Hero section
│   │   ├── HowItWorks      # Process explanation
│   │   ├── Navbar          # Navigation component
│   │   └── Testimonials    # User testimonials
│   ├── layout/             # Layout components
│   └── tools/              # Tool-specific components
│       ├── CustomizedResumePreview
│       ├── JobDescriptionInput
│       └── ResumeSelect
│
├── contexts/               # React contexts
│   └── UserContext        # User-related context
│
├── hooks/                 # Custom React hooks
│   ├── useAI             # AI integration hook
│   ├── useAppRedux       # Redux utility hook
│   └── useAuth           # Authentication hook
│
├── lib/                   # Library configurations
│   └── prisma            # Prisma client setup
│
├── middleware/            # Next.js middleware
│   └── auth              # Authentication middleware
│
├── pages/                 # Next.js pages
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── resumes/      # Resume management endpoints
│   │   └── user/         # User management endpoints
│   ├── builder/          # Resume builder pages
│   ├── dashboard/        # Dashboard pages
│   └── tools/            # Tool pages
│
├── store/                # Redux store
│   ├── authSlice        # Authentication state
│   ├── resumeSlice      # Resume state
│   └── userSlice        # User state
│
├── styles/               # Global styles
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
    └── exportResume     # PDF export functionality
```

## Tech Stack

- Next.js
- React
- TypeScript
- Prisma (Database ORM)
- Tailwind CSS
- Redux (State Management)
- NextAuth.js (Authentication)
- Heroicons
- Next.js Image Optimization

## Key Features

- AI-powered resume customization
- Resume builder with live preview
- Multiple template options
- Export to PDF
- User authentication
- Dashboard for managing resumes
- Responsive design
- Automated job application tools
- Interactive hero slider
- Job board integration (LinkedIn, Indeed)
- Smart keyword matching with job descriptions
- Modern UI with gradient designs
- Mobile-responsive interface

## Components

### Landing Page
- Hero section with dynamic background gradients
- Feature showcase with interactive cards
- Testimonials from successful users
- How It Works section
- FAQ section
- Responsive navigation with authentication state
- Animated hero slider with auto-rotation

### Dashboard
- Tool cards for different functionalities
- Resume management interface
- Quick access to resume builder
- Stats display for user activities

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check