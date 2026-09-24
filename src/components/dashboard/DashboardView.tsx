import React from 'react';
import {
  FileText,
  SearchCode,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Download
} from 'lucide-react';
import { ResumeData, AnalysisResult } from '../../types/resume';
import { sampleResumes } from '../../data/sampleResumes';

interface DashboardViewProps {
  resumes: ResumeData[];
  reports: AnalysisResult[];
  onOpenBuilder: (resume?: ResumeData) => void;
  onOpenAnalyzer: (resume?: ResumeData) => void;
  onSelectTemplate: () => void;
  onDeleteResume: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  resumes,
  reports,
  onOpenBuilder,
  onOpenAnalyzer,
  onSelectTemplate,
  onDeleteResume,
}) => {
  const avgAtsScore = reports.length > 0
    ? Math.round(reports.reduce((acc, r) => acc + r.atsScore, 0) / reports.length)
    : 92;

  const topGrade = reports.length > 0 ? reports[0].scoreGrade : 'A+';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-[#e7dcff] bg-[#f9f5ff]/90">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edfdf4] text-[#2d7c5a] border border-[#cfeedd] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career optimization dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#201a2d] tracking-tight">
            Welcome to CareerScore
          </h1>
          <p className="text-sm text-[#5c526d] max-w-xl leading-relaxed">
            Your centralized hub for resume audits, automated ATS keyword compliance, and one-click professional document exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAnalyzer()}
            className="px-4 py-2.5 rounded-xl bg-[#f4efff] hover:bg-[#ece4ff] text-[#413758] font-medium text-xs border border-[#e2d8ff] transition-all flex items-center gap-2 cursor-pointer"
          >
            <SearchCode className="w-4 h-4 text-[#2d7c5a]" />
            <span>Analyze Resume</span>
          </button>
          <button
            onClick={() => onOpenBuilder()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] hover:brightness-105 text-white font-semibold text-xs shadow-md shadow-violet-200/80 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Resume</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-[#edf0ff] bg-white/80">
          <div className="flex items-center justify-between text-xs text-[#615a77]">
            <span>Average ATS Score</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-[#1d8d5b]">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#201a2d]">{avgAtsScore}%</span>
            <span className="text-xs text-[#1d8d5b] font-semibold">+14% vs avg</span>
          </div>
          <div className="w-full h-1.5 bg-[#eef3ff] rounded-full overflow-hidden">
            <div className="h-full bg-[#2ab67d] rounded-full" style={{ width: `${avgAtsScore}%` }} />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-[#edf0ff] bg-white/80">
          <div className="flex items-center justify-between text-xs text-[#615a77]">
            <span>Top Profile Grade</span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-[#5d4ab2]">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#201a2d]">{topGrade}</span>
            <span className="text-xs text-[#57489f] font-semibold">Tier-1 Qualified</span>
          </div>
          <p className="text-[11px] text-[#6a5f80]">Top 8% percentile of applicant pool</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-[#edf0ff] bg-white/80">
          <div className="flex items-center justify-between text-xs text-[#615a77]">
            <span>Resumes Managed</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-[#7a5ae7]">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#201a2d]">{resumes.length}</span>
            <span className="text-xs text-[#6a4bd9] font-semibold">Cloud Backed</span>
          </div>
          <p className="text-[11px] text-[#6a5f80]">Instant multi-template rendering</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-2 border border-[#edf0ff] bg-white/80">
          <div className="flex items-center justify-between text-xs text-[#615a77]">
            <span>Audit Reports</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-[#2b67da]">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#201a2d]">{reports.length}</span>
            <span className="text-xs text-[#2b67da] font-semibold">Historical Scans</span>
          </div>
          <p className="text-[11px] text-[#6a5f80]">Continuous version tracking</p>
        </div>

      </div>

      {/* Main Grid: Saved Resumes & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Saved Resumes List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#201a2d] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#6d5bd8]" />
              <span>Your Resumes</span>
            </h2>
            <button
              onClick={() => onOpenBuilder()}
              className="text-xs font-semibold text-[#5d4ab2] hover:text-[#41358a] flex items-center gap-1 cursor-pointer"
            >
              <span>+ New Resume</span>
            </button>
          </div>

          <div className="space-y-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="glass-panel p-5 rounded-2xl hover:border-indigo-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group border border-[#ece5ff] bg-white/85"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: resume.accentColor || '#4F46E5' }}
                    />
                    <h3 className="text-sm font-bold text-[#201a2d] group-hover:text-[#41358a] transition-colors">
                      {resume.title || resume.personalInfo.fullName}
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#f5f0ff] text-[#5d4ab2] border border-[#e7dcff]">
                      {resume.templateId}
                    </span>
                  </div>

                  <p className="text-xs text-[#584f6f]">
                    {resume.personalInfo.jobTitle} &bull; {resume.personalInfo.email}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-[#6a5f80] pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                    </span>
                    <span>&bull;</span>
                    <span>{resume.experience.length} roles</span>
                    <span>&bull;</span>
                    <span>{resume.projects.length} projects</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onOpenAnalyzer(resume)}
                    className="px-3 py-1.5 rounded-lg bg-[#eafaf1] hover:bg-[#def5e8] text-[#1d8d5b] border border-[#cfeedd] text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <SearchCode className="w-3.5 h-3.5" />
                    <span>Audit ATS</span>
                  </button>

                  <button
                    onClick={() => onOpenBuilder(resume)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white text-xs font-semibold shadow transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {resumes.length > 1 && (
                    <button
                      onClick={() => onDeleteResume(resume.id)}
                      className="p-1.5 rounded-lg text-[#7a718d] hover:text-rose-500 hover:bg-rose-100 transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Launch & Templates (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 border border-[#ece5ff] bg-white/85">
            <h3 className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider">
              Quick Shortcuts
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onOpenAnalyzer()}
                className="w-full p-3 rounded-xl bg-[#f5f1ff] border border-[#e5dcff] hover:border-[#a68ef4] text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300">Run New ATS Scan</p>
                  <p className="text-[11px] text-slate-400">Score against 200+ industry criteria</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button
                onClick={onSelectTemplate}
                className="w-full p-3 rounded-xl bg-[#0B1020]/60 border border-white/10 hover:border-indigo-500/40 text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-indigo-300">Browse 5 Templates</p>
                  <p className="text-[11px] text-slate-400">Modern, ATS-friendly, Executive</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </button>
            </div>
          </div>

          {/* Hiring Insights Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-3 bg-gradient-to-b from-indigo-950/30 to-[#0B1020] border border-indigo-500/25">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Pro Recruiter Tip</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Candidates who incorporate 3 or more quantified metrics (e.g. 38% latency decrease, 450K DAU) in their first 2 experience bullets receive 3.2x more first-round interview calls."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
