import React from 'react';
import {
  Sparkles,
  SearchCode,
  FileEdit,
  ShieldCheck,
  Award,
  Download,
  Users,
  CheckCircle2,
  TrendingUp,
  Zap,
  ArrowRight,
  Briefcase,
  Layers,
  FileCheck
} from 'lucide-react';
import { sampleResumes } from '../data/sampleResumes';
import { ResumeData } from '../types/resume';

interface LandingPageProps {
  onAnalyzeResume: (initialData?: ResumeData) => void;
  onCreateResume: (initialData?: ResumeData) => void;
  onExploreTemplates: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onAnalyzeResume,
  onCreateResume,
  onExploreTemplates,
}) => {
  return (
    <div className="relative overflow-hidden min-h-screen pb-20">
      
      {/* Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-200/85 via-purple-100/80 to-emerald-100/80 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[400px] h-[400px] bg-emerald-200/70 blur-[140px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-20 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3edff] border border-[#e3d7ff] text-[#51426f] text-xs font-semibold mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#7a63d8]" />
          <span>Resume score and ATS checker</span>
        </div>

        {/* Large Logo Branding */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c6ad9] to-[#4ab382] shadow-sm flex items-center justify-center ring-1 ring-violet-100">
            <span className="font-extrabold text-2xl text-white">CS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            CareerScore
          </h2>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
          Turn Your Resume Into Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6d5bd8] via-[#8b7ae6] to-[#2ab779]">
            Strongest Asset
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Resume scoring, ATS structure checks, keyword review, and quick resume editing.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onAnalyzeResume()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#7c6ad9] to-[#6d5bd8] hover:from-[#6d5bd8] hover:to-[#5b4cc6] text-white shadow-xl shadow-violet-200/80 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <SearchCode className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Analyze Resume</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onCreateResume()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-[#edfdf4] text-[#1d5a40] border border-[#cfeedd] hover:bg-[#e3f9ee] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileEdit className="w-4 h-4 text-emerald-400" />
            <span>Create Resume</span>
          </button>
        </div>

        {/* Quick Sample Resume Testers */}
        <div className="mt-10 pt-6 border-t border-white/10 max-w-3xl mx-auto">
          <p className="text-xs text-slate-500 font-medium mb-3">
            Instant test with pre-built resumes:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {sampleResumes.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onAnalyzeResume(sample)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f4f0ff] border border-[#e0d4ff] text-xs text-[#52436e] hover:text-[#2a2542] hover:border-[#d3c4ff] hover:bg-[#efe8ff] transition-all cursor-pointer shadow-sm"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sample.accentColor }} />
                <span>{sample.targetRole}</span>
                <span className="text-[10px] text-[#726597]">({sample.personalInfo.fullName.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Score Demonstration Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl glass-panel p-6 sm:p-8 text-left relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Circular Score Mockup */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#cbd5e1"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    stroke="#4F46E5"
                    strokeWidth="8"
                    strokeDasharray={289}
                    strokeDashoffset={289 * (1 - 0.94)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center rounded-full bg-slate-100/90 px-3 py-2 shadow-sm ring-1 ring-slate-200">
                  <span className="text-3xl font-extrabold text-slate-800 tracking-tight">94</span>
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">A+ Grade</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ATS PASS: 96%
                  </span>
                  <span className="text-xs text-slate-400">Scan duration: 0.8s</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Full Stack Engineering Profile</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
                  12 quantified metrics detected, zero formatting conflicts, and 98% keyword overlap with tier-1 tech job requisitions.
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="w-full lg:w-72 space-y-2.5 bg-[#f7f4ff] p-4 rounded-xl border border-[#e8ddff]">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">ATS Parsability</span>
                <span className="text-emerald-600 font-mono font-semibold">98%</span>
              </div>
              <div className="w-full h-1.5 bg-[#ebf9f1] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }} />
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Action Verb Strength</span>
                <span className="text-[#6d5bd8] font-mono font-semibold">92%</span>
              </div>
              <div className="w-full h-1.5 bg-[#efeaff] rounded-full overflow-hidden">
                <div className="h-full bg-[#7c6ad9] rounded-full" style={{ width: '92%' }} />
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Quantified Impact</span>
                <span className="text-violet-600 font-mono font-semibold">94%</span>
              </div>
              <div className="w-full h-1.5 bg-[#edf7f1] rounded-full overflow-hidden">
                <div className="h-full bg-[#34b77b] rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 6 Feature Cards Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
            Engineered For Modern Hiring
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Everything You Need To Secure Elite Interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: ATS Analysis */}
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
              <SearchCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. ATS Analysis</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Real-time parsing simulation against enterprise ATS platforms (Workday, Greenhouse, Lever). Detects hidden parsing blocks, font mismatches, and keyword gaps.
            </p>
            <div className="text-xs text-indigo-400 font-medium flex items-center gap-1">
              <span>Parsability breakdown</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Confidence Score */}
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Confidence Score</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Comprehensive reliability gauge scoring verified credentials, project depth, metric integrity, and seniority alignment so you submit with absolute certainty.
            </p>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span>Algorithmic confidence rating</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Resume Health Check */}
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Resume Health Check</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Audits formatting length, contact completeness, bullet syntax, passive phrasing, and overused clichés with one-click automated fixes.
            </p>
            <div className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <span>Instant flaw detection</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Recruiter Feedback */}
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">4. Recruiter Feedback</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Simulates a 6-second scan review from Senior Technical Recruiters and Hiring Managers. Reveals candid pros, cons, and interview likelihood.
            </p>
            <div className="text-xs text-purple-400 font-medium flex items-center gap-1">
              <span>Hiring manager perspective</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Resume Builder */}
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
              <FileEdit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">5. Resume Builder</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              9-step reactive builder with live split-screen preview, Google XYZ formula enhancer, summary writer, and instant template switching.
            </p>
            <div className="text-xs text-blue-400 font-medium flex items-center gap-1">
              <span>Real-time instant rendering</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: PDF Download */}
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">6. PDF & DOCX Download</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Export ultra-crisp vector PDFs, Microsoft Word .doc documents, or print directly with standard A4 margins guaranteed never to clip in screening systems.
            </p>
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span>Zero formatting distortion</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 rounded-3xl bg-slate-900 border border-slate-200 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Upgrade Your Resume?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Join thousands of software engineers, product managers, and data analysts who elevated their interview callback rates with CareerScore.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onAnalyzeResume()}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm border border-slate-200 transition-transform hover:scale-105"
              >
                Scan My Resume Free
              </button>
              <button
                onClick={onExploreTemplates}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-transform hover:scale-105"
              >
                Browse 5 Resume Templates
              </button>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
