import { ResumeData } from '../types/resume';

export const sampleResumes: ResumeData[] = [
  {
    id: 'sample-frontend',
    title: 'Senior Frontend Engineer Resume',
    targetRole: 'Senior Frontend Engineer',
    updatedAt: new Date().toISOString(),
    templateId: 'modern',
    accentColor: '#4F46E5',
    personalInfo: {
      fullName: 'Kritika Singh',
      jobTitle: 'Senior Frontend Engineer',
      email: 'kritika.singh@example.com',
      phone: '+1 (555) 234-8901',
      location: 'San Francisco, CA (Open to Remote)',
      linkedin: 'linkedin.com/in/kritikasingh',
      github: 'github.com/kritika-singh',
      portfolio: 'kritikasingh.dev',
    },
    summary:
      'Product-driven Senior Frontend Engineer with 6+ years of experience architecting high-performance React & TypeScript applications for enterprise SaaS. Proven track record boosting core web vitals by 42% and driving 35% user engagement growth. Expert in design systems, state management, and real-time data visualization.',
    skills: [
      {
        category: 'Frontend & UI',
        skills: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Framer Motion', 'Vue.js'],
      },
      {
        category: 'Backend & Cloud',
        skills: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Docker', 'AWS (S3, CloudFront)'],
      },
      {
        category: 'Tools & Practices',
        skills: ['CI/CD (GitHub Actions)', 'Jest & React Testing Library', 'Webpack / Vite', 'Micro-frontends', 'Agile/Scrum'],
      },
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Vanguard Cloud Technologies',
        role: 'Senior Frontend Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-03',
        endDate: 'Present',
        current: true,
        bullets: [
          'Spearheaded the redesign and modular rebuild of core customer portal serving 450K+ daily active users, cutting initial bundle size by 38% and reducing Time-to-Interactive from 4.2s to 1.6s.',
          'Built an enterprise design system comprising 60+ accessible WCAG AA-compliant React components adopted across 8 engineering squads, saving an estimated 14 developer hours per sprint.',
          'Mentored 5 junior and mid-level engineers through bi-weekly architectural design reviews and structured code pair programming.',
          'Engineered WebSocket-backed telemetry dashboard rendering 10,000+ data points per second with zero UI frame drops using Canvas and Web Workers.',
        ],
      },
      {
        id: 'exp-2',
        company: 'Nova Metric Systems',
        role: 'Frontend Software Engineer',
        location: 'Austin, TX',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        bullets: [
          'Developed responsive analytical dashboards in React, TypeScript, and D3.js utilized by Fortune 500 client leadership teams.',
          'Integrated Stripe payment gateway and billing management, helping scale ARR from $2.1M to $8.4M within 18 months.',
          'Increased unit and integration test coverage from 44% to 89% via Jest and Cypress, preventing 30+ regressions in production releases.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2015-08',
        endDate: '2019-05',
        current: false,
        gpa: '3.82 / 4.0',
        achievements: 'Dean\'s Honor List (4 semesters), Lead Coordinator for CalHacks Hackathon',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'HyperGrid - High-Throughput Canvas Data Grid',
        tools: 'TypeScript, HTML5 Canvas, WebAssembly, React',
        liveUrl: 'https://hypergrid-demo.io',
        githubUrl: 'https://github.com/kritika-singh/hypergrid',
        description: 'Virtual scrolling grid component capable of smooth 60fps rendering with 1,000,000 active cells.',
        bullets: [
          'Implemented custom spatial indexing and offscreen canvas buffer for multi-threaded cell calculations.',
          'Earned 2,400+ GitHub stars and featured on Hacker News front page.',
        ],
      },
      {
        id: 'proj-2',
        title: 'DevPulse - Developer Productivity & Git Insights',
        tools: 'Next.js 14, Tailwind CSS, GraphQL, Prisma, PostgreSQL',
        liveUrl: 'https://devpulse-metrics.app',
        githubUrl: 'https://github.com/kritika-singh/devpulse',
        description: 'Team velocity tracking suite with GitHub webhooks integration and automated PR bottleneck analysis.',
        bullets: [
          'Engineered OAuth flow and automated digest generator delivering weekly engineering health metrics to Slack.',
          'Utilized by 120+ open source contributors across 30 repositories.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        date: '2023-08',
        url: 'https://aws.amazon.com/verification',
      },
      {
        id: 'cert-2',
        name: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Meta & Coursera',
        date: '2021-11',
      },
    ],
    achievements: [
      {
        id: 'ach-1',
        title: '1st Place Winner - Silicon Valley Fintech Hackathon',
        organization: 'SV Tech Summit',
        date: '2023-10',
        description: 'Constructed real-time fraud alert dashboard using streaming graph visualization within 36 hours.',
      },
      {
        id: 'ach-2',
        title: 'Outstanding Technical Contributor of the Year',
        organization: 'Vanguard Cloud Technologies',
        date: '2023-12',
        description: 'Awarded to top 1% engineers for foundational design system architecture and cross-team enablement.',
      },
    ],
    extracurriculars: [
      {
        id: 'extra-1',
        role: 'Open Source Maintainer & Speaker',
        organization: 'React SF Community',
        duration: '2021 - Present',
        description: 'Delivered 4 keynote talks on Modern Web Performance and conducted workshops for 300+ career transitioners.',
      },
    ],
  },
  {
    id: 'sample-mern',
    title: 'Full Stack MERN Developer Resume',
    targetRole: 'Full Stack / MERN Developer',
    updatedAt: new Date().toISOString(),
    templateId: 'ats',
    accentColor: '#10B981',
    personalInfo: {
      fullName: 'Priya Sharma',
      jobTitle: 'Full Stack MERN Developer',
      email: 'priya.sharma@techmail.io',
      phone: '+1 (555) 890-4321',
      location: 'Seattle, WA',
      linkedin: 'linkedin.com/in/priya-sharma-mern',
      github: 'github.com/priyasharma-code',
      portfolio: 'priyasharma.io',
    },
    summary:
      'Energetic and analytical Full Stack Developer with 3+ years experience engineering responsive web applications across MongoDB, Express.js, React.js, and Node.js. Passionate about RESTful API design, database query optimization, and clean microservices architecture.',
    skills: [
      {
        category: 'Full Stack Core',
        skills: ['JavaScript (ES6+)', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'RESTful APIs'],
      },
      {
        category: 'Frontend & UI',
        skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Bootstrap', 'Axios', 'Webpack'],
      },
      {
        category: 'Databases & Tools',
        skills: ['PostgreSQL', 'Redis', 'Git / GitHub', 'Postman', 'Docker basics', 'Jest', 'Heroku / Render'],
      },
    ],
    experience: [
      {
        id: 'exp-m1',
        company: 'Apex Digital Solutions',
        role: 'MERN Stack Developer',
        location: 'Seattle, WA',
        startDate: '2022-01',
        endDate: 'Present',
        current: true,
        bullets: [
          'Engineered full-stack e-commerce marketplace supporting 25,000+ monthly active shoppers with inventory tracking and secure JWT authentication.',
          'Refactored legacy MongoDB aggregation queries, improving API response times by 54% and reducing database CPU utilization.',
          'Built 15+ reusable React UI components with responsive layouts that increased mobile conversion rates by 22%.',
          'Configured Redis caching layer for product search endpoints, slashing latency from 320ms to 45ms under peak loads.',
        ],
      },
      {
        id: 'exp-m2',
        company: 'CodeBridge Innovations',
        role: 'Junior Web Developer Intern',
        location: 'Remote',
        startDate: '2021-03',
        endDate: '2021-12',
        current: false,
        bullets: [
          'Collaborated with senior engineers to implement customer onboarding workflows using React and Node.js.',
          'Resolved 40+ bug tickets related to cross-browser compatibility and responsive viewport resizing.',
          'Wrote unit tests using Jest covering 80% of critical authentication routes.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-m1',
        institution: 'University of Washington',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Informatics / Software Engineering',
        startDate: '2017-09',
        endDate: '2021-06',
        current: false,
        gpa: '3.75 / 4.0',
        achievements: 'Graduated Cum Laude, President of Women in Computing (2020-2021)',
      },
    ],
    projects: [
      {
        id: 'proj-m1',
        title: 'TaskFlow - Real-time Collaborative Project Kanban',
        tools: 'React, Node.js, Express, Socket.io, MongoDB, Tailwind CSS',
        liveUrl: 'https://taskflow-preview.app',
        githubUrl: 'https://github.com/priyasharma-code/taskflow',
        description: 'Multi-tenant project management platform with real-time drag-and-drop task updates and team chat.',
        bullets: [
          'Utilized Socket.io for instantaneous board synchronization across simultaneous browser sessions.',
          'Created automated email digest notifications using Nodemailer and SendGrid API.',
        ],
      },
      {
        id: 'proj-m2',
        title: 'FitTrack - Nutrition & Workout Planner',
        tools: 'MERN Stack, Chart.js, JWT, Bcrypt, AWS S3',
        liveUrl: 'https://fittrack-demo.io',
        githubUrl: 'https://github.com/priyasharma-code/fittrack',
        description: 'Health log app with calorie calculator, macro distribution charts, and image upload capabilities.',
        bullets: [
          'Secured user passwords with Bcrypt salt hashing and implemented role-based authorization guards.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-m1',
        name: 'MongoDB Certified Developer Associate',
        issuer: 'MongoDB University',
        date: '2022-09',
      },
    ],
    achievements: [
      {
        id: 'ach-m1',
        title: 'Finalist - Hack The Northwest',
        organization: 'Seattle Tech Coalition',
        date: '2021-04',
        description: 'Created an emergency food pantry routing map in 24 hours with Mapbox and React.',
      },
    ],
    extracurriculars: [
      {
        id: 'extra-m1',
        role: 'Volunteer Coding Instructor',
        organization: 'Girls Who Code Seattle',
        duration: '2022 - Present',
        description: 'Teaching fundamentals of web development and JavaScript to middle and high school students.',
      },
    ],
  },
  {
    id: 'sample-data',
    title: 'Data Analyst & BI Specialist Resume',
    targetRole: 'Data Analyst / Business Intelligence',
    updatedAt: new Date().toISOString(),
    templateId: 'corporate',
    accentColor: '#3B82F6',
    personalInfo: {
      fullName: 'Marcus Chen',
      jobTitle: 'Data Analyst & Business Intelligence Specialist',
      email: 'marcus.chen@analyticsnet.org',
      phone: '+1 (555) 777-9023',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/marcus-chen-data',
      github: 'github.com/marcuschen-analytics',
      portfolio: 'marcuschen.datafolio.com',
    },
    summary:
      'Results-oriented Data Analyst with 4+ years translating petabyte-scale datasets into strategic executive insights. Proficient in SQL, Python, Tableau, and Snowflake. Demonstrated success finding $1.4M in operational cost optimizations and building automated KPI executive dashboards.',
    skills: [
      {
        category: 'Data & Analytics',
        skills: ['SQL (Advanced, CTEs, Window Functions)', 'Python (Pandas, NumPy, Scikit-learn)', 'R', 'Statistical Modeling'],
      },
      {
        category: 'BI & Visualization',
        skills: ['Tableau', 'Power BI', 'Looker', 'Metabase', 'Excel (VBA, Power Query, Macros)'],
      },
      {
        category: 'Data Engineering & Cloud',
        skills: ['Snowflake', 'PostgreSQL', 'Google BigQuery', 'dbt', 'Airflow', 'AWS Redshift'],
      },
    ],
    experience: [
      {
        id: 'exp-d1',
        company: 'Stratos Financial Media',
        role: 'Senior Data Analyst',
        location: 'New York, NY',
        startDate: '2021-08',
        endDate: 'Present',
        current: true,
        bullets: [
          'Engineered executive Tableau dashboards consumed daily by C-suite executives, tracking $120M in subscription revenue and churn drivers.',
          'Formulated predictive churn classification model in Python (Random Forest) that identified at-risk customer cohorts with 84% accuracy, saving $680K in annual churn.',
          'Spearheaded automated dbt data modeling pipeline on Snowflake, decreasing daily report refresh latency by 65%.',
          'Conducted A/B testing statistical analyses for 24 product marketing experiments, increasing checkout conversion by 14.8%.',
        ],
      },
      {
        id: 'exp-d2',
        company: 'MetricForge Analytics',
        role: 'Business Intelligence Analyst',
        location: 'Boston, MA',
        startDate: '2019-07',
        endDate: '2021-07',
        current: false,
        bullets: [
          'Created automated weekly revenue reconciliation reports in SQL and Python, reducing manual accounting hours by 18 hours per week.',
          'Built customized Power BI sales funnel dashboards for a 45-person national sales team.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-d1',
        institution: 'Columbia University',
        degree: 'Master of Science',
        fieldOfStudy: 'Applied Analytics',
        startDate: '2018-09',
        endDate: '2019-05',
        current: false,
        gpa: '3.89 / 4.0',
      },
      {
        id: 'edu-d2',
        institution: 'Boston University',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Economics and Statistics',
        startDate: '2014-09',
        endDate: '2018-05',
        current: false,
        gpa: '3.70 / 4.0',
      },
    ],
    projects: [
      {
        id: 'proj-d1',
        title: 'E-commerce Customer Lifetime Value (CLV) Predictor',
        tools: 'Python, Scikit-learn, BigQuery, Streamlit',
        githubUrl: 'https://github.com/marcuschen-analytics/clv-predictor',
        description: 'End-to-end predictive analytics pipeline calculating customer cohorts future lifetime value and purchase frequency.',
        bullets: [
          'Processed 4.2 million transaction records using BigQuery and trained gradient-boosted regression algorithms.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-d1',
        name: 'Tableau Certified Data Analyst',
        issuer: 'Tableau Software',
        date: '2022-04',
      },
      {
        id: 'cert-d2',
        name: 'Snowflake SnowPro Core Certification',
        issuer: 'Snowflake',
        date: '2023-01',
      },
    ],
    achievements: [
      {
        id: 'ach-d1',
        title: 'Analytics Innovation Award',
        organization: 'Stratos Financial Media',
        date: '2023-11',
        description: 'Recognized for automated churn alerts that preserved $680,000 in enterprise ARR.',
      },
    ],
    extracurriculars: [
      {
        id: 'extra-d1',
        role: 'Data Mentor',
        organization: 'DataKind NYC',
        duration: '2020 - Present',
        description: 'Assisting non-profit organizations in structuring donor datasets and optimizing fundraising campaigns.',
      },
    ],
  },
];
