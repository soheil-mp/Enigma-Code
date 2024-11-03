# Enigma Code

An AI copilot tool for optimizing your job hunt.

## Introduction

Enigma Code is a comprehensive AI-powered platform designed to streamline your job search process. From building tailored resumes to automating job applications and preparing for interviews, Enigma Code is your ultimate job hunt assistant.

## Key Features

- **📝 Resume builder**: AI-based resume builder that includes templates to help you design a resume that is sure to check the boxes when it comes to applicant tracking systems.
- **🤖 Automated job application**: Automatically apply to major job listing websites such as LinkedIn and Indeed so you can save a lot of time doing more important things.
- **🎨 Resume customization**: Customize your resume for each job application to match their preference.
- **🎤 Interview Mock**: Practice your interview skills using AI interview.
- **🧑‍💻 Interview co-pilot**: Use AI tools to help you to answer to live interview questions.
- **📊 Job Market Insights**: Get real-time analytics and insights on job market trends to tailor your job search strategy effectively.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/enigma-code.git
   cd enigma-code
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the necessary environment variables.

## Usage

To start using Enigma Code, follow these steps:

1. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Access the Application**
   Open your browser and go to `http://localhost:3000`.


## Project Structure

```
src/                          # Source directory
├── components/               # React components
│   ├── common/               # Shared/reusable components
│   │   ├── LoadingSpinner    # Loading animation component
│   │   ├── Button            # Reusable button component
│   │   └── Modal             # Reusable modal component
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── resume-builder/   # Resume builder components
│   │   │   ├── ContentEditor     # Resume content editing interface
│   │   │   ├── ResumeBuilder     # Main resume builder component
│   │   │   ├── ResumePreview     # Live preview component
│   │   │   ├── Section           # Section management
│   │   │   └── TemplateSelector  # Resume template selection
│   │   ├── job-automation/   # Automated job application components
│   │   │   ├── AutoApplyButton   # Trigger for automated application
│   │   │   └── JobSitesSelect    # Selector for job listing sites (LinkedIn, Indeed, etc.)
│   │   ├── interview-prep/    # Interview preparation components
│   │   │   ├── InterviewMock      # Mock interview interface
│   │   │   ├── InterviewFeedback  # AI-generated feedback
│   │   │   ├── CoPilotPrompt      # Co-pilot assistance for real-time answers
│   │   │   └── LiveInterviewHelper # Live interview assistance interface
│   │   ├── insights/         # Job market insights components
│   │   │   ├── InsightsGraph     # Data visualization for insights
│   │   │   └── InsightsList      # List of insights
│   │   ├── ToolCard          # Dashboard tool card component
│   └── home/                 # Landing page components
│       ├── FAQ              # Frequently asked questions
│       ├── Features         # Feature showcase
│       ├── Hero             # Hero section
│       ├── HowItWorks       # Process explanation
│       ├── Navbar           # Navigation component
│       └── Testimonials     # User testimonials
│
├── config/                   # Application-wide configurations
│   ├── prisma.ts             # Prisma client setup and config
│   └── auth.ts               # NextAuth configuration
│
├── contexts/                 # React contexts
│   ├── AuthContext.tsx       # Authentication context
│   └── UserContext.tsx       # User-related context
│
├── hooks/                    # Custom React hooks
│   ├── useAI.ts              # AI integration hook
│   ├── useAuth.ts            # Authentication hook
│   ├── useAppSelector.ts     # Redux selector utility hook
│   ├── useResumeActions.ts   # Actions related to resume management
│   ├── useInterviewAI.ts     # AI hook for interview assistance
│   ├── useJobAutomation.ts   # Automated job application hook
│   └── useWindowDimensions.ts # Window dimensions utility hook
│
├── layouts/                  # Layout components
│   ├── DashboardLayout.tsx   # Layout for dashboard pages
│   └── MainLayout.tsx        # Layout for main (landing) pages
│
├── lib/                      # External libraries and utilities
│   ├── axios.ts              # Axios instance setup
│   ├── prisma/               # Prisma-related files
│   │   ├── client.ts         # Prisma client instance
│   └── pdfExport.ts          # PDF export utility function
│
├── middleware/               # Next.js middleware
│   └── auth.ts               # Authentication middleware
│
├── pages/                    # Next.js pages
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   │   └── [...nextauth].ts # NextAuth configuration
│   │   ├── resumes/          # Resume management endpoints
│   │   │   ├── create.ts     # Create resume endpoint
│   │   │   ├── update.ts     # Update resume endpoint
│   │   │   └── delete.ts     # Delete resume endpoint
│   │   ├── insights/         # Job market insights endpoints
│   │   ├── interviews/       # Interview assistance endpoints
│   │   │   ├── mock.ts       # Mock interview API endpoint
│   │   │   ├── copilot.ts    # Real-time interview co-pilot API endpoint
│   │   └── automation/       # Automated job application endpoints
│   │       └── apply.ts      # Job auto-application endpoint
│   ├── builder/              # Resume builder pages
│   ├── dashboard/            # Dashboard main page
│   ├── insights/             # Insights pages
│   ├── interviews/           # Interview preparation and co-pilot pages
│   └── tools/                # Tool pages
│       ├── InterviewHelper.tsx # Interview assistant page
│       └── JobAutoApply.tsx   # Automated job application page
│
├── public/                   # Static assets
│   ├── icons/                # SVG and icon files
│   └── images/               # Image assets
│
├── services/                 # Application services
│   ├── authService.ts        # Authentication logic
│   ├── resumeService.ts      # Business logic for resume actions
│   ├── insightsService.ts    # Service for handling job market insights
│   ├── interviewService.ts   # AI-powered interview assistance logic
│   └── jobAutomationService.ts # Service for automated job applications
│
├── store/                    # Redux store
│   ├── slices/               # Redux slices for state management
│   │   ├── authSlice.ts      # Authentication state
│   │   ├── resumeSlice.ts    # Resume state
│   │   ├── interviewSlice.ts # Interview preparation and co-pilot state
│   │   ├── jobAutomationSlice.ts # Job application automation state
│   └── index.ts              # Redux store setup
│
├── styles/                   # Global and component-specific styles
│   ├── globals.css           # Global CSS
│   ├── tailwind.css          # Tailwind configuration
│   └── components/           # Styles for individual components
│
├── types/                    # TypeScript type definitions
│   ├── api.ts                # Types for API responses
│   ├── models.ts             # Types for data models (e.g., User, Resume)
│   ├── pages.ts              # Types for Next.js pages and routing
│   └── redux.ts              # Types for Redux state and actions
│
└── utils/                    # Utility functions
    ├── dateUtils.ts         # Date formatting utilities
    ├── formatUtils.ts       # String and formatting utilities
    ├── validation.ts        # Validation functions for forms
    └── exportResume.ts      # PDF export functionality

```

## Tech Stack

- **Next.js** - Server-side rendering framework for building fast and SEO-friendly React applications
- **React** - Frontend library for building user interfaces
- **TypeScript** - Static typing for JavaScript, improving code quality and maintainability
- **Prisma** - ORM for PostgreSQL, simplifying database interactions and data modeling
- **Tailwind CSS** - Utility-first CSS framework for responsive, customizable, and clean design
- **Redux Toolkit** - Efficient state management, handling complex UI states and asynchronous data fetching
- **NextAuth.js** - Authentication library for managing user login and authentication flows
- **Heroicons** - Collection of free, MIT-licensed high-quality SVG icons for UI components
- **Next.js Image Optimization** - Efficient image loading, automatically serving optimized images for performance
- **PostgreSQL** - Relational database with JSON support, ideal for structured and semi-structured data
- **Redis** - In-memory data store for caching and improving response time for frequently accessed data
- **Docker** - Containerization tool for consistent development and deployment environments
- **Jest + React Testing Library** - Testing framework for unit and integration tests to ensure reliability
- **Stripe (or similar)** - For payment processing if the app offers premium subscriptions or features
- **SendGrid (or similar)** - Email service for notifications, account verification, and password reset emails
- **GitHub Actions** - CI/CD for automated testing, building, and deployment


## Components

The `components` directory organizes all React components used in the Enigma Code application. The components are modular, reusable, and organized by feature or usage context. Below is a breakdown of each key folder in the `components` directory.

### Directory Structure

components/
├── common/
├── dashboard/
├── home/
├── layout/
└── tools/

### 1. `common/`
Contains shared, reusable components that are used across various parts of the application. These components are designed to be highly generic and flexible, enabling easy reuse.

- **LoadingSpinner**: Displays a loading animation, commonly used during data fetching or processing.
- **Button**: A reusable button component that can be customized with props for different styling and functionality.
- **Modal**: A generic modal component for displaying content in a pop-up dialog.

### 2. `dashboard/`
This folder holds components specific to the user dashboard, where users can access tools and insights to optimize their job search. Each main feature of the dashboard has its own subfolder for better organization.

- **resume-builder/**: Components for the AI-powered resume builder feature.
  - **ContentEditor**: The main editing interface for resume content.
  - **ResumeBuilder**: The core component of the resume builder, managing overall layout and state.
  - **ResumePreview**: Displays a live preview of the resume as the user edits.
  - **Section**: A component for managing different sections of the resume, such as Experience, Skills, and Education.
  - **TemplateSelector**: Allows users to select from different resume templates.

- **job-automation/**: Components for the automated job application feature.
  - **AutoApplyButton**: A button that initiates the automated application process to selected job platforms.
  - **JobSitesSelect**: Dropdown or selection interface for choosing job sites (e.g., LinkedIn, Indeed) where applications will be auto-submitted.

- **interview-prep/**: Components for the interview preparation and co-pilot assistance features.
  - **InterviewMock**: Interface for practicing mock interviews with AI-provided questions and feedback.
  - **InterviewFeedback**: Displays AI-generated feedback on the user’s interview responses.
  - **CoPilotPrompt**: Prompts the AI co-pilot to provide real-time suggestions for live interview questions.
  - **LiveInterviewHelper**: Real-time assistant for live interviews, helping users respond to questions during actual interview sessions.

- **insights/**: Components related to job market insights, providing users with real-time data and trends in the job market.
  - **InsightsGraph**: Data visualization component that graphically represents job market trends and analytics.
  - **InsightsList**: A list view of insights, summarizing key findings and trends for easy access.

- **ToolCard**: A generic card component for each tool available on the dashboard, with a brief description and link to access the feature.

### 3. `home/`
Contains components specific to the landing page and marketing pages, providing users with an overview of the Enigma Code platform’s features and benefits.

- **FAQ**: Frequently asked questions about the platform and its features.
- **Features**: A showcase of the key features Enigma Code offers, including resume building, job automation, and interview assistance.
- **Hero**: The hero section at the top of the landing page, designed to capture attention and provide a brief introduction to the platform.
- **HowItWorks**: Explanation of the process and flow of using Enigma Code, guiding users through key steps.
- **Navbar**: The main navigation bar, containing links to different sections of the platform and an option to log in or sign up.
- **Testimonials**: Displays user testimonials and reviews, showcasing positive feedback and experiences from users.

### 4. `layout/`
Layout components define the structure and layout of different types of pages across the application. This helps maintain consistency in design and layout, reducing redundancy in code.

- **DashboardLayout**: Defines the layout for all pages within the user dashboard, including navigation, sidebars, and main content area.
- **MainLayout**: Used for main pages (e.g., landing page), setting up a general structure without dashboard-specific elements.

### 5. `tools/`
Contains individual components for specific tools accessible outside of the main dashboard flow, organized to keep tool-specific logic separate from general dashboard components.

- **CustomizedResumePreview**: A preview component for showing customized resume outputs based on user preferences.
- **JobDescriptionInput**: An input field component for users to paste job descriptions, which the platform then uses to help tailor resume content.
- **ResumeSelect**: Allows users to choose from previously created resumes when applying for jobs, enabling easy resume selection and customization.

### Component Conventions

- **Naming**: Components are named descriptively based on their functionality (e.g., `ResumeBuilder`, `InterviewMock`, `AutoApplyButton`).
- **Reusability**: Each component is designed with reusability in mind, especially those in the `common/` folder.
- **Styling**: Components primarily use Tailwind CSS for styling, maintaining a consistent and modern design language across the platform.
- **Modularity**: Components are organized by feature to keep related logic and presentation grouped together, making it easier to locate and manage code.

This structure promotes clarity and scalability, ensuring that components are modular, organized by feature, and easily reusable throughout the application.



## Getting Started

Follow these instructions to set up and run the Enigma Code application on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 14.x or later)
- **npm** or **yarn** (for package management)
- **PostgreSQL** (for the database)
- **Git** (optional, for version control)

### Installation

1. **Clone the Repository**
```bash
   git clone https://github.com/your-username/enigma-code.git
   cd enigma-code
```

2. **Install Dependencies**
   Use npm or yarn to install the required dependencies:
```bash
   npm install
   # or
   yarn install
```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following environment variables:
```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/enigma_code"
   NEXTAUTH_SECRET="your_nextauth_secret_key"
   NEXTAUTH_URL="http://localhost:3000"
```
4. **Set Up the Database**
   Use Prisma to initialize the PostgreSQL database and run migrations.

   npx prisma migrate dev --name init

   This command creates tables in your PostgreSQL database based on the Prisma schema and sets up the initial structure.

5. **Generate Prisma Client**
   Generate the Prisma client to interact with the database:
```bash
   npx prisma generate
```

6. **Run Development Server**
   Start the Next.js development server:
```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be running on `http://localhost:3000`.

### Project Structure

The application is structured as follows:

- `components/`: Contains React components organized by feature.
- `config/`: Configuration files for Prisma, NextAuth, and other services.
- `contexts/`: React contexts for global state management.
- `hooks/`: Custom hooks for AI integration, authentication, and Redux state management.
- `layouts/`: Layout components for the dashboard and main pages.
- `lib/`: Library configurations for Axios, Prisma client, and other utilities.
- `middleware/`: Next.js middleware for request handling and authentication.
- `pages/`: Next.js pages and API routes for the application.
- `public/`: Static assets such as images and icons.
- `services/`: Service files for business logic (e.g., authentication, resume management).
- `store/`: Redux store and slices for managing application state.
- `styles/`: Global and component-specific styles.
- `types/`: TypeScript type definitions for models, pages, and API responses.
- `utils/`: Utility functions for date formatting, validation, and other common tasks.

### Running Tests

To run the test suite, use the following command:
```bash
npm run test
# or
yarn test
```
Ensure that you write tests for all major components, services, and utilities to maintain code quality.

### Deployment

For production deployment:
1. Set up a production PostgreSQL database and update the `DATABASE_URL` in your `.env` file.
2. Run migrations for the production database.
3. Build the application:
```bash
   npm run build
   # or
   yarn build
```
4. Start the production server:
```bash
   npm run start
   # or
   yarn start
```

### Additional Notes

- **Prisma Studio**: To explore and interact with your data, you can use Prisma Studio:
  npx prisma studio

- **Environment Management**: Use `.env.local`, `.env.development`, and `.env.production` for different environments.

This setup will get Enigma Code running locally and ready for development. Happy coding!





## Database Design 

This document outlines the database schema for Enigma Code, an AI-powered platform for optimizing job searches. The database structure is designed to support features like resume building, automated job applications, interview practice, and real-time job market insights.

### 1. `Users` table
Stores information about the users of the platform.

SQL:
CREATE TABLE Users (
    user_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subscription_plan VARCHAR(50),
    last_login TIMESTAMP
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `user_id`         | UUID         | Unique identifier for each user.     |
| `name`            | VARCHAR      | Full name of the user.               |
| `email`           | VARCHAR      | Email address of the user (unique).  |
| `password_hash`   | VARCHAR      | Hashed password for security.        |
| `created_at`      | TIMESTAMP    | Date and time the account was created. |
| `subscription_plan` | VARCHAR    | Type of subscription (e.g., Free, Premium). |
| `last_login`      | TIMESTAMP    | Last login time.                     |

### 2. `Resumes` table
Stores resume-related information for each user.

SQL:
CREATE TABLE Resumes (
    resume_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    template VARCHAR(100),
    content JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `resume_id`       | UUID         | Unique identifier for each resume.   |
| `user_id`         | UUID         | Foreign key to `Users` table.        |
| `template`        | VARCHAR      | Template type or name used for resume. |
| `content`         | JSONB        | JSON or structured text for resume sections. |
| `created_at`      | TIMESTAMP    | Date and time the resume was created.|
| `last_updated`    | TIMESTAMP    | Last update time of the resume.      |

### 3. `Job_Applications` table
Manages job applications and their statuses.

SQL:
CREATE TABLE Job_Applications (
    application_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    resume_id UUID REFERENCES Resumes(resume_id),
    job_title VARCHAR(255),
    company_name VARCHAR(255),
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_status VARCHAR(50),
    job_listing_link VARCHAR(255),
    applied_through VARCHAR(50)
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `application_id`  | UUID         | Unique identifier for each application. |
| `user_id`         | UUID         | Foreign key to `Users` table.        |
| `resume_id`       | UUID         | Foreign key to `Resumes` table.      |
| `job_title`       | VARCHAR      | Title of the job applied to.         |
| `company_name`    | VARCHAR      | Name of the company.                 |
| `application_date` | TIMESTAMP   | Date of application.                 |
| `application_status` | VARCHAR   | Status of application (e.g., Applied, Interviewing, Offered, Rejected). |
| `job_listing_link` | VARCHAR     | Link to the job listing.             |
| `applied_through` | VARCHAR      | Platform used (LinkedIn, Indeed, etc.). |

### 4. `Interview_Sessions` table
Keeps track of interview practice sessions and results.

SQL:
CREATE TABLE Interview_Sessions (
    session_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    feedback TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    session_type VARCHAR(50)
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `session_id`      | UUID         | Unique identifier for each session.  |
| `user_id`         | UUID         | Foreign key to `Users` table.        |
| `date`            | TIMESTAMP    | Date and time of the session.        |
| `feedback`        | TEXT         | Feedback provided by AI on interview. |
| `rating`          | INT          | Performance rating given by AI.      |
| `session_type`    | VARCHAR      | Type of session (e.g., Mock, Real).  |

### 5. `Live_Interview_Assistance` table
Stores real-time feedback and assistance provided during live interviews.

SQL:
CREATE TABLE Live_Interview_Assistance (
    assistance_id UUID PRIMARY KEY,
    session_id UUID REFERENCES Interview_Sessions(session_id),
    user_id UUID REFERENCES Users(user_id),
    question TEXT,
    suggested_answer TEXT,
    response_time INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `assistance_id`   | UUID         | Unique identifier for each assistance session. |
| `session_id`      | UUID         | Foreign key to `Interview_Sessions` table. |
| `user_id`         | UUID         | Foreign key to `Users` table.        |
| `question`        | TEXT         | Interview question asked.            |
| `suggested_answer` | TEXT        | Suggested answer provided by AI.     |
| `response_time`   | INT          | Time taken to provide the response (in seconds). |
| `timestamp`       | TIMESTAMP    | Timestamp of the interaction.        |

### 6. `Job_Market_Insights` table
Captures real-time analytics and insights on job trends for each user.

SQL:
CREATE TABLE Job_Market_Insights (
    insight_id UUID PRIMARY KEY,
    user_id UUID REFERENCES Users(user_id),
    date_generated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    industry VARCHAR(100),
    job_trends JSONB,
    location VARCHAR(100),
    keywords VARCHAR(255)
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `insight_id`      | UUID         | Unique identifier for each insight record. |
| `user_id`         | UUID         | Foreign key to `Users` table.        |
| `date_generated`  | TIMESTAMP    | Date and time the insight was generated. |
| `industry`        | VARCHAR      | Industry category for the insight.   |
| `job_trends`      | JSONB        | JSON data with market trend insights.|
| `location`        | VARCHAR      | Location for which insights were generated. |
| `keywords`        | VARCHAR      | Relevant keywords for job search.    |

### 7. `Subscription_Plans` table
Defines the features available in each subscription plan.

SQL:
CREATE TABLE Subscription_Plans (
    plan_id UUID PRIMARY KEY,
    plan_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    features JSONB
);

| Field Name        | Type         | Description                          |
|-------------------|--------------|--------------------------------------|
| `plan_id`         | UUID         | Unique identifier for each plan.     |
| `plan_name`       | VARCHAR      | Name of the subscription plan.       |
| `description`     | TEXT         | Description of the plan features.    |
| `price`           | DECIMAL      | Monthly/annual price for the plan.   |
| `features`        | JSONB        | JSON array of features included.     |

### Relationships and Foreign Keys

- **Users → Resumes**: Each user can have multiple resumes, but each resume belongs to one user.
- **Users → Job_Applications**: A user can apply to multiple jobs, with each job application associated with a specific resume.
- **Users → Interview_Sessions**: Users may have multiple interview sessions tracked with feedback and ratings.
- **Interview_Sessions → Live_Interview_Assistance**: Each session can have multiple assistance entries for different questions.
- **Users → Job_Market_Insights**: Each user can generate multiple insights based on job market data and preferences.
  

