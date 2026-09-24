import { ResumeData, ResumeVersion, AnalysisResult, UserProfile } from '../types/resume';
import { sampleResumes } from '../data/sampleResumes';

const RESUMES_KEY = 'careerscore_resumes_v1';
const VERSIONS_KEY = 'careerscore_versions_v1';
const REPORTS_KEY = 'careerscore_reports_v1';
const USER_KEY = 'careerscore_user_v1';

export function initializeStorage(): void {
  if (!localStorage.getItem(RESUMES_KEY)) {
    localStorage.setItem(RESUMES_KEY, JSON.stringify(sampleResumes));
  }

  if (!localStorage.getItem(USER_KEY)) {
    const defaultUser: UserProfile = {
      id: 'usr-1',
      name: 'Kritika Singh',
      email: 'kritika.singh@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      targetRole: 'Senior Frontend Engineer',
      membershipPlan: 'Pro',
      createdAt: '2025-01-15',
      savedResumesCount: sampleResumes.length,
      analysesCount: 4,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
  }

  // Pre-seed an initial version for the first sample
  if (!localStorage.getItem(VERSIONS_KEY)) {
    const initialVersions: ResumeVersion[] = [
      {
        id: 'ver-1',
        resumeId: sampleResumes[0].id,
        versionName: 'v1.0 - Initial Draft',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
        data: sampleResumes[0],
        score: 84,
        notes: 'Initial import before ATS keyword optimization',
      },
      {
        id: 'ver-2',
        resumeId: sampleResumes[0].id,
        versionName: 'v1.1 - Added Metric Quantifications',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        data: sampleResumes[0],
        score: 92,
        notes: 'Optimized bullet points with Google XYZ formula and added AWS certification',
      },
    ];
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(initialVersions));
  }
}

export function getResumes(): ResumeData[] {
  try {
    const data = localStorage.getItem(RESUMES_KEY);
    return data ? JSON.parse(data) : sampleResumes;
  } catch {
    return sampleResumes;
  }
}

export function saveResume(resume: ResumeData): void {
  const list = getResumes();
  const idx = list.findIndex(r => r.id === resume.id);
  const updated = { ...resume, updatedAt: new Date().toISOString() };

  if (idx >= 0) {
    list[idx] = updated;
  } else {
    list.unshift(updated);
  }

  localStorage.setItem(RESUMES_KEY, JSON.stringify(list));
}

export function deleteResume(id: string): void {
  const list = getResumes().filter(r => r.id !== id);
  localStorage.setItem(RESUMES_KEY, JSON.stringify(list));
}

export function getResumeVersions(resumeId: string): ResumeVersion[] {
  try {
    const data = localStorage.getItem(VERSIONS_KEY);
    const list: ResumeVersion[] = data ? JSON.parse(data) : [];
    return list.filter(v => v.resumeId === resumeId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch {
    return [];
  }
}

export function saveResumeVersion(resume: ResumeData, notes?: string, score?: number): ResumeVersion {
  const versions = getAllVersions();
  const count = versions.filter(v => v.resumeId === resume.id).length;
  const newVersion: ResumeVersion = {
    id: 'ver-' + Date.now(),
    resumeId: resume.id,
    versionName: `v1.${count + 1} - ${notes || 'Updated snapshot'}`,
    timestamp: new Date().toISOString(),
    data: JSON.parse(JSON.stringify(resume)),
    score,
    notes,
  };

  versions.unshift(newVersion);
  localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
  return newVersion;
}

function getAllVersions(): ResumeVersion[] {
  try {
    const data = localStorage.getItem(VERSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getSavedReports(): AnalysisResult[] {
  try {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAnalysisReport(report: AnalysisResult): void {
  const reports = getSavedReports();
  reports.unshift(report);
  if (reports.length > 20) reports.pop();
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function getUserProfile(): UserProfile {
  try {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      const parsed = JSON.parse(data) as UserProfile;
      if (parsed.name === 'Alex Rivera' || parsed.name === 'Alex') {
        return {
          ...parsed,
          name: 'Kritika Singh',
          email: 'kritika.singh@example.com',
        };
      }
      return parsed;
    }
  } catch {
    // fallback
  }
  return {
    id: 'usr-guest',
    name: 'Kritika Singh',
    email: 'kritika.singh@example.com',
    targetRole: 'Software Engineer',
    membershipPlan: 'Pro',
    createdAt: new Date().toISOString(),
    savedResumesCount: 1,
    analysesCount: 1,
  };
}

export function saveUserProfile(user: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
