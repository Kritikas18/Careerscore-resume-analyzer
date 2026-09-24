import { AnalysisResult, AnalysisStrength, AnalysisIssue, ResumeData, SuggestedRole } from '../types/resume';

const STRONG_ACTION_VERBS = [
  'Spearheaded', 'Architected', 'Engineered', 'Orchestrated', 'Optimized',
  'Accelerated', 'Delivered', 'Pioneered', 'Streamlined', 'Overhauled',
  'Implemented', 'Negotiated', 'Maximized', 'Automated', 'Revitalized',
  'Formulated', 'Instituted', 'Devised', 'Surpassed', 'Synthesized'
];

const WEAK_WORDS = [
  'worked on', 'helped with', 'responsible for', 'assisted', 'handled',
  'tried to', 'participated in', 'duties included', 'was part of', 'familiar with'
];

const ROLE_SKILL_BENCHMARKS: Record<string, { required: string[]; optional: string[]; relatedTitles: string[] }> = {
  'frontend': {
    required: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Git', 'Responsive Design'],
    optional: ['Next.js', 'Tailwind CSS', 'Redux', 'GraphQL', 'Testing', 'Webpack', 'CI/CD'],
    relatedTitles: ['Senior Frontend Developer', 'Fullstack Engineer', 'UI/UX Engineer', 'Web Applications Architect']
  },
  'fullstack': {
    required: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Database (SQL/MongoDB)', 'REST APIs', 'Git'],
    optional: ['Express', 'Docker', 'AWS', 'Next.js', 'PostgreSQL', 'Redis', 'CI/CD', 'Microservices'],
    relatedTitles: ['Full Stack Engineer', 'MERN Stack Developer', 'Backend & Cloud Engineer', 'Software Engineer']
  },
  'software': {
    required: ['Data Structures', 'Algorithms', 'Git', 'Object-Oriented Programming', 'Testing', 'System Design'],
    optional: ['Java', 'Python', 'C++', 'Go', 'Docker', 'Kubernetes', 'Microservices', 'Cloud Architecture'],
    relatedTitles: ['Software Development Engineer (SDE II)', 'Backend Engineer', 'Systems Engineer', 'Cloud Infrastructure Engineer']
  },
  'data': {
    required: ['SQL', 'Python', 'Data Analysis', 'Data Visualization', 'Excel', 'Statistics'],
    optional: ['Tableau', 'Power BI', 'Pandas', 'Snowflake', 'BigQuery', 'Machine Learning', 'dbt'],
    relatedTitles: ['Senior Data Analyst', 'Business Intelligence Engineer', 'Analytics Consultant', 'Data Scientist']
  },
  'product': {
    required: ['Product Strategy', 'Roadmapping', 'Agile/Scrum', 'User Research', 'A/B Testing', 'Stakeholder Management'],
    optional: ['Jira', 'SQL', 'Product Analytics', 'Figma', 'Go-To-Market', 'Metrics & KPIs'],
    relatedTitles: ['Senior Product Manager', 'Technical Product Manager', 'Growth Product Lead', 'Product Owner']
  }
};

export function analyzeResumeText(rawText: string, targetRoleInput?: string): AnalysisResult {
  const text = rawText || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const words = text.toLowerCase().match(/\b[a-z0-9+#.-]+\b/g) || [];
  const wordCount = words.length;

  const targetRole = targetRoleInput?.trim() || detectProbableRole(text);

  // 1. Metric Detection (numbers, %, $, timeframes)
  const metricMatches = text.match(/\b\d+(\.\d+)?%|\$\d+([kmb])?|\b\d+\s*(hours|days|weeks|months|years|x|fold|users|clients|engineers)\b/gi) || [];
  const metricCount = metricMatches.length;

  // 2. Action Verb Check
  let actionVerbCount = 0;
  STRONG_ACTION_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(text)) actionVerbCount++;
  });

  // 3. Weak words detection
  const weakWordsFound: string[] = [];
  WEAK_WORDS.forEach(weak => {
    if (text.toLowerCase().includes(weak)) {
      weakWordsFound.push(weak);
    }
  });

  // 4. Contact info completeness
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasLinkedin = /linkedin\.com\/in\//i.test(text);
  const hasGithubOrPortfolio = /github\.com|portfolio|\.dev|\.io|\.com\//i.test(text);

  // 5. Section detection
  const sections = {
    summary: /summary|profile|about me|objective/i.test(text),
    experience: /experience|employment|work history|career/i.test(text),
    education: /education|academic|university|degree/i.test(text),
    skills: /skills|technologies|competencies|tech stack/i.test(text),
    projects: /projects|portfolio|personal projects/i.test(text),
  };

  // 6. Skill extraction
  const detectedSkills = extractSkillsFromText(text);

  // 7. Calculate scores
  // Metric score: 0 to 100 based on quantifiable evidence
  const impactAndMetrics = Math.min(100, Math.max(25, metricCount * 14 + 20));
  
  // Brevity & length: ideal 350 - 750 words
  let brevityAndLength = 85;
  if (wordCount < 150) brevityAndLength = 40;
  else if (wordCount < 300) brevityAndLength = 70;
  else if (wordCount > 1000) brevityAndLength = 65;
  else brevityAndLength = 95;

  // ATS Parsability: presence of standard headers, contact info, lack of weird chars
  let atsParsability = 45;
  if (hasEmail) atsParsability += 15;
  if (hasPhone) atsParsability += 10;
  if (sections.experience) atsParsability += 10;
  if (sections.skills) atsParsability += 10;
  if (sections.education) atsParsability += 10;
  atsParsability = Math.min(100, atsParsability);

  // Action verbs score
  const actionVerbScore = Math.min(100, Math.max(30, actionVerbCount * 12 + 25));

  // Skills density
  const skillsDensity = Math.min(100, Math.max(30, detectedSkills.technical.length * 7 + 25));

  // Overall Score Calculation (Weighted blend)
  const overallScore = Math.round(
    atsParsability * 0.3 +
    impactAndMetrics * 0.25 +
    actionVerbScore * 0.2 +
    skillsDensity * 0.15 +
    brevityAndLength * 0.1
  );

  const atsScore = Math.round(atsParsability * 0.6 + skillsDensity * 0.25 + (hasLinkedin ? 15 : 5));
  const confidenceScore = Math.min(98, Math.max(68, Math.round((overallScore + atsScore) / 2 + 5)));

  // Score Grade
  let scoreGrade = 'B';
  if (overallScore >= 92) scoreGrade = 'A+';
  else if (overallScore >= 85) scoreGrade = 'A';
  else if (overallScore >= 78) scoreGrade = 'B+';
  else if (overallScore >= 70) scoreGrade = 'B';
  else if (overallScore >= 60) scoreGrade = 'C+';
  else scoreGrade = 'C';

  // Extract candidate name if available
  const candidateName = extractCandidateName(lines);

  // Generate Strengths
  const strengths: AnalysisStrength[] = [];

  if (metricCount >= 3) {
    strengths.push({
      title: 'High Quantifiable Impact',
      description: `Identified ${metricCount} quantified metrics (${metricMatches.slice(0, 3).join(', ')}). Recruiters prioritize results backed by hard data.`,
      category: 'impact',
      evidence: metricMatches.slice(0, 3).join(' • '),
    });
  }

  if (actionVerbCount >= 4) {
    strengths.push({
      title: 'Strong Leadership & Action-Oriented Language',
      description: 'Your bullet points start with commanding active verbs that demonstrate ownership rather than passive participation.',
      category: 'leadership',
    });
  }

  if (detectedSkills.technical.length >= 6) {
    strengths.push({
      title: 'Competitive Technical Keyword Density',
      description: `Found ${detectedSkills.technical.length} high-value technical keywords that ATS engines index favorably.`,
      category: 'skills',
      evidence: detectedSkills.technical.slice(0, 6).join(', '),
    });
  }

  if (sections.projects && (text.includes('github') || text.includes('http') || text.includes('.com') || text.includes('.io'))) {
    strengths.push({
      title: 'Verifiable Proof of Work & Projects',
      description: 'Contains project references with links/repositories, significantly improving credibility for hiring managers.',
      category: 'projects',
    });
  }

  if (hasEmail && hasPhone && hasLinkedin) {
    strengths.push({
      title: 'Complete Professional Contact Header',
      description: 'Phone, email, and professional social profiles are clear and easily indexable by applicant tracking systems.',
      category: 'structure',
    });
  }

  // Generate Issues & Fixes
  const issues: AnalysisIssue[] = [];

  if (weakWordsFound.length > 0) {
    issues.push({
      id: 'issue-weak-words',
      title: 'Passive & Diluted Phrasing Detected',
      description: `Found weak phrases like "${weakWordsFound.slice(0, 2).join('", "')}". These diminish the perceived value of your contributions.`,
      severity: 'warning',
      category: 'descriptions',
      suggestion: 'Replace with decisive verbs like "Spearheaded", "Engineered", "Executed", or "Revitalized".',
      exampleFix: `Change "${weakWordsFound[0]} project" to "Architected and delivered project ahead of schedule"`,
    });
  }

  if (metricCount < 3) {
    issues.push({
      id: 'issue-metrics',
      title: 'Under-Quantified Achievements',
      description: 'Too few numeric metrics (percentages, dollar amounts, performance gains, team size) were found in your experience bullets.',
      severity: 'critical',
      category: 'descriptions',
      suggestion: 'Apply the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".',
      exampleFix: 'Instead of "Improved website performance", write "Accelerated page load speed by 42%, boosting checkout conversions by 15%".',
    });
  }

  if (!hasLinkedin) {
    issues.push({
      id: 'issue-linkedin',
      title: 'Missing LinkedIn Profile URL',
      description: 'Over 87% of technical recruiters check LinkedIn during initial screening. Missing links lower candidate response rates.',
      severity: 'warning',
      category: 'contact',
      suggestion: 'Include your customized LinkedIn vanity URL (e.g. linkedin.com/in/yourname) in the contact header.',
    });
  }

  if (detectedSkills.missingForTarget.length > 0) {
    issues.push({
      id: 'issue-missing-keywords',
      title: 'Missing High-Demand ATS Keywords',
      description: `For the target role of "${targetRole}", standard ATS filters search for keywords currently absent from your resume.`,
      severity: 'critical',
      category: 'keywords',
      suggestion: `Consider integrating relevant keywords you possess: ${detectedSkills.missingForTarget.slice(0, 4).join(', ')}.`,
    });
  }

  if (wordCount > 900) {
    issues.push({
      id: 'issue-length',
      title: 'Resume Length Exceeds Optimal 1-Page Density',
      description: 'Your resume contains over 900 words. Recruiter scan studies show average time spent is 6-8 seconds.',
      severity: 'info',
      category: 'formatting',
      suggestion: 'Prune older experience or combine redundant bullet points to focus on your top 3 career highlights.',
    });
  }

  // Recruiter Simulation
  const recruiterPros = strengths.map(s => s.title);
  const recruiterCons = issues.map(i => i.title);

  const recruiterReview = {
    headline: overallScore >= 80 ? 'Strong Candidate: High Interview Probability' : 'Promising Foundation: Needs Quantifiable Impact',
    overallImpression: overallScore >= 80
      ? 'Clear trajectory, well-organized technical competencies, and good contextual evidence. With minor bullet tightening, this will consistently clear ATS thresholds.'
      : 'The foundational background is visible, but the impact is largely task-oriented rather than outcome-oriented. Needs more concrete metrics and higher keyword density.',
    interviewReadiness: Math.round(overallScore * 0.95 + 4),
    hiringPotential: overallScore >= 85 ? ('High' as const) : overallScore >= 72 ? ('Promising' as const) : ('Moderate' as const),
    firstImpressionSeconds: 6,
    pros: recruiterPros.length > 0 ? recruiterPros : ['Clean general structure', 'Clear role progression'],
    cons: recruiterCons.length > 0 ? recruiterCons : ['Could benefit from additional project metrics'],
    likelyQuestions: [
      `"Can you walk me through the architectural decisions behind your most complex project?"`,
      `"How specifically did you measure the success and trade-offs of your contributions?"`,
      `"What challenges arose when collaborating across engineering and product teams?"`
    ]
  };

  // Recommendations
  const bulletImprovements = generateBulletImprovements(lines);

  // Suggested matching roles
  const suggestedRoles = getSuggestedRoles(detectedSkills.technical, targetRole);

  return {
    id: 'analysis-' + Date.now(),
    timestamp: new Date().toISOString(),
    candidateName,
    targetRole,
    overallScore,
    scoreGrade,
    atsScore,
    confidenceScore,
    metricBreakdown: {
      impactAndMetrics,
      brevityAndLength,
      atsParsability,
      actionVerbs: actionVerbScore,
      skillsDensity,
    },
    strengths,
    issues,
    skillAnalysis: detectedSkills,
    recruiterReview,
    recommendations: {
      actionVerbsToUse: STRONG_ACTION_VERBS.slice(0, 10),
      bulletImprovements,
      strategicAdvice: [
        'Place your strongest accomplishment in the very first bullet under each job title.',
        'Ensure every technical skill listed in your skills section is demonstrated at least once in your experience bullets.',
        'Use standard header names ("Work Experience", "Education", "Skills") so ATS parsers don\'t drop sections.',
      ],
    },
    suggestedRoles,
    rawTextPreview: text.slice(0, 500) + (text.length > 500 ? '...' : ''),
  };
}

export function analyzeResumeData(resume: ResumeData): AnalysisResult {
  // Convert ResumeData into plain text for uniform deep scanning
  const parts: string[] = [
    resume.personalInfo.fullName,
    resume.personalInfo.jobTitle,
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.linkedin,
    resume.personalInfo.github,
    resume.personalInfo.portfolio,
    '\nSummary:',
    resume.summary,
    '\nExperience:',
    ...resume.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.bullets.join('\n')}`),
    '\nEducation:',
    ...resume.education.map(ed => `${ed.degree} in ${ed.fieldOfStudy}, ${ed.institution} (${ed.gpa || ''})`),
    '\nSkills:',
    ...resume.skills.map(s => `${s.category}: ${s.skills.join(', ')}`),
    '\nProjects:',
    ...resume.projects.map(p => `${p.title} (${p.tools}): ${p.description}\n${p.bullets.join('\n')}`),
    '\nCertifications:',
    ...resume.certifications.map(c => `${c.name} - ${c.issuer}`),
    '\nAchievements:',
    ...resume.achievements.map(a => `${a.title}: ${a.description}`),
  ];

  const fullText = parts.filter(Boolean).join('\n');
  return analyzeResumeText(fullText, resume.targetRole || resume.personalInfo.jobTitle);
}

function detectProbableRole(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('react') || lower.includes('frontend') || lower.includes('vue') || lower.includes('css')) {
    return 'Frontend Developer';
  }
  if (lower.includes('node') && lower.includes('mongo')) {
    return 'Full Stack MERN Developer';
  }
  if (lower.includes('sql') && (lower.includes('tableau') || lower.includes('analytics') || lower.includes('python'))) {
    return 'Data Analyst';
  }
  if (lower.includes('product manager') || lower.includes('roadmap') || lower.includes('scrum')) {
    return 'Product Manager';
  }
  return 'Software Engineer';
}

function extractCandidateName(lines: string[]): string {
  for (const line of lines.slice(0, 5)) {
    const clean = line.replace(/[^a-zA-Z\s]/g, '').trim();
    const words = clean.split(/\s+/);
    if (words.length >= 2 && words.length <= 4 && !line.includes('@') && !line.includes('http')) {
      return clean;
    }
  }
  return 'Applicant';
}

function extractSkillsFromText(text: string): { technical: string[]; soft: string[]; missingForTarget: string[]; inDemandKeywords: string[] } {
  const commonTech = [
    'React', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'Express',
    'HTML', 'CSS', 'Tailwind CSS', 'Next.js', 'Redux', 'Vue.js', 'Angular',
    'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'CI/CD', 'GraphQL', 'REST APIs',
    'Jest', 'Cypress', 'Java', 'C++', 'Go', 'Tableau', 'Power BI', 'Snowflake',
    'BigQuery', 'Pandas', 'NumPy', 'Scikit-learn', 'Figma', 'Linux'
  ];

  const commonSoft = [
    'Cross-functional Leadership', 'Agile / Scrum', 'Mentorship', 'Problem Solving',
    'Communication', 'Stakeholder Management', 'Critical Thinking', 'Adaptability',
    'Project Management', 'Time Management', 'Collaboration'
  ];

  const lower = text.toLowerCase();

  const foundTech = commonTech.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(lower);
  });

  const foundSoft = commonSoft.filter(skill => {
    const words = skill.toLowerCase().split(/\s+/);
    return words.some(w => w.length > 4 && lower.includes(w));
  });

  // Calculate missing in-demand skills based on context
  let benchmarkKey = 'software';
  if (lower.includes('react') || lower.includes('frontend')) benchmarkKey = 'frontend';
  else if (lower.includes('mern') || lower.includes('fullstack') || lower.includes('full stack')) benchmarkKey = 'fullstack';
  else if (lower.includes('data') || lower.includes('analyst')) benchmarkKey = 'data';
  else if (lower.includes('product') || lower.includes('owner')) benchmarkKey = 'product';

  const benchmark = ROLE_SKILL_BENCHMARKS[benchmarkKey] || ROLE_SKILL_BENCHMARKS['software'];
  const missingForTarget = benchmark.required.filter(req => !foundTech.map(t => t.toLowerCase()).includes(req.toLowerCase()));

  return {
    technical: foundTech.length > 0 ? foundTech : ['JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs'],
    soft: foundSoft.length > 0 ? foundSoft : ['Cross-functional Collaboration', 'Problem Solving', 'Agile Methodology'],
    missingForTarget: missingForTarget.length > 0 ? missingForTarget : ['Docker', 'CI/CD', 'Automated Testing'],
    inDemandKeywords: benchmark.optional,
  };
}

function generateBulletImprovements(lines: string[]): Array<{ original: string; improved: string; formula: string; reason: string }> {
  const candidateBullets = lines.filter(l => l.length > 25 && l.length < 200 && !l.includes('@') && !l.includes(':'));
  
  if (candidateBullets.length === 0) {
    return [
      {
        original: 'Worked on front end features for the company web app.',
        improved: 'Spearheaded development of 12+ customer-facing React components, boosting user session duration by 24%.',
        formula: 'Action Verb + Scope + Quantifiable Metric',
        reason: 'Replaces passive "worked on" with proactive leadership verb and adds measurable business value.',
      },
      {
        original: 'Responsible for database queries and bug fixing.',
        improved: 'Refactored 40+ high-traffic SQL queries, cutting median endpoint latency from 450ms to 110ms.',
        formula: 'Action Verb + Technical Specifics + Latency Reduction Metric',
        reason: 'Demonstrates tangible performance optimization rather than basic routine responsibility.',
      }
    ];
  }

  const selected = candidateBullets.slice(0, 3);
  return selected.map((original) => {
    let improved = original;
    // enhance with action verbs if needed
    if (!/^[A-Z][a-z]+ed\b/.test(original)) {
      improved = `Architected and deployed solution that ${original.charAt(0).toLowerCase() + original.slice(1)}, accelerating team delivery velocity by 28%.`;
    } else if (!/\d+%|\$\d+/.test(original)) {
      improved = `${original.replace(/\.$/, '')}, yielding a 35% efficiency improvement across core workflows.`;
    }

    return {
      original,
      improved,
      formula: 'Google XYZ: Accomplished [X] as measured by [Y], by doing [Z]',
      reason: 'Adds decisive action verbs and quantifiable outcome metrics that ATS and hiring managers seek.',
    };
  });
}

function getSuggestedRoles(technicalSkills: string[], currentTarget: string): SuggestedRole[] {
  const lowerSkills = technicalSkills.map(s => s.toLowerCase());

  const roles: SuggestedRole[] = [
    {
      title: 'Frontend Developer',
      matchPercentage: lowerSkills.some(s => ['react', 'vue', 'angular', 'javascript', 'typescript'].includes(s)) ? 94 : 72,
      seniority: 'Mid - Senior',
      marketDemand: 'Very High',
      keyMatchingSkills: ['React', 'TypeScript', 'Responsive Design', 'Tailwind CSS'],
    },
    {
      title: 'Full Stack MERN Developer',
      matchPercentage: lowerSkills.some(s => ['node.js', 'express', 'mongodb'].includes(s)) ? 91 : 78,
      seniority: 'Mid-Level',
      marketDemand: 'Very High',
      keyMatchingSkills: ['MongoDB', 'Express', 'React', 'Node.js', 'REST APIs'],
    },
    {
      title: 'Software Engineer',
      matchPercentage: 88,
      seniority: 'Junior - Mid',
      marketDemand: 'High',
      keyMatchingSkills: ['Git', 'System Design', 'Algorithms', 'Testing'],
    },
    {
      title: 'Data Analyst',
      matchPercentage: lowerSkills.some(s => ['sql', 'python', 'tableau', 'excel'].includes(s)) ? 89 : 64,
      seniority: 'Mid-Level',
      marketDemand: 'High',
      keyMatchingSkills: ['SQL', 'Data Visualization', 'Python', 'Reporting'],
    },
    {
      title: 'Product / Technical Solutions Engineer',
      matchPercentage: 82,
      seniority: 'Mid-Level',
      marketDemand: 'Medium',
      keyMatchingSkills: ['Cross-functional Alignment', 'APIs', 'Customer Facing'],
    },
  ];

  return roles.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
