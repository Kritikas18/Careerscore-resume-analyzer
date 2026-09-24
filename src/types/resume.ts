export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  achievements?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  tools: string;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Extracurricular {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export type TemplateId = 'modern' | 'ats' | 'corporate' | 'minimal' | 'student';

export interface ResumeData {
  id: string;
  title: string;
  targetRole: string;
  updatedAt: string;
  templateId: TemplateId;
  accentColor: string;
  personalInfo: PersonalInfo;
  summary: string;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  extracurriculars: Extracurricular[];
}

export interface ResumeVersion {
  id: string;
  resumeId: string;
  versionName: string;
  timestamp: string;
  data: ResumeData;
  score?: number;
  notes?: string;
}

export interface AnalysisStrength {
  title: string;
  description: string;
  category: 'skills' | 'projects' | 'leadership' | 'impact' | 'structure';
  evidence?: string;
}

export interface AnalysisIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'grammar' | 'keywords' | 'formatting' | 'descriptions' | 'contact';
  suggestion: string;
  exampleFix?: string;
}

export interface SkillAnalysis {
  technical: string[];
  soft: string[];
  missingForTarget: string[];
  inDemandKeywords: string[];
}

export interface RecruiterReview {
  headline: string;
  overallImpression: string;
  interviewReadiness: number; // 0-100
  hiringPotential: 'High' | 'Promising' | 'Moderate' | 'Needs Work';
  firstImpressionSeconds: number; // e.g. 6-second scan verdict
  pros: string[];
  cons: string[];
  likelyQuestions: string[];
}

export interface BulletImprovement {
  original: string;
  improved: string;
  formula: string; // e.g. "Action Verb + Task + Quantifiable Impact"
  reason: string;
}

export interface SuggestedRole {
  title: string;
  matchPercentage: number;
  seniority: string;
  marketDemand: 'High' | 'Very High' | 'Medium';
  keyMatchingSkills: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  candidateName: string;
  targetRole: string;
  overallScore: number; // 0 - 100
  scoreGrade: string; // A+, A, B+, B, C
  atsScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  metricBreakdown: {
    impactAndMetrics: number; // 0 - 100
    brevityAndLength: number; // 0 - 100
    atsParsability: number; // 0 - 100
    actionVerbs: number; // 0 - 100
    skillsDensity: number; // 0 - 100
  };
  strengths: AnalysisStrength[];
  issues: AnalysisIssue[];
  skillAnalysis: SkillAnalysis;
  recruiterReview: RecruiterReview;
  recommendations: {
    actionVerbsToUse: string[];
    bulletImprovements: BulletImprovement[];
    strategicAdvice: string[];
  };
  suggestedRoles: SuggestedRole[];
  rawTextPreview?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  targetRole: string;
  membershipPlan: 'Free' | 'Pro' | 'Enterprise';
  createdAt: string;
  savedResumesCount: number;
  analysesCount: number;
}
