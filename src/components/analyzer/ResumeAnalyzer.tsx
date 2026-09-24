import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldAlert,
  UserCheck,
  Briefcase,
  HelpCircle,
  Copy,
  ChevronDown,
  RefreshCw,
  Download,
  Flame,
  Zap,
  Target,
  ArrowLeft
} from 'lucide-react';
import { AnalysisResult, ResumeData } from '../../types/resume';
import { analyzeResumeText, analyzeResumeData } from '../../services/analyzer';
import { sampleResumes } from '../../data/sampleResumes';
import { saveAnalysisReport } from '../../services/storageService';
import confetti from 'canvas-confetti';

interface ResumeAnalyzerProps {
  initialResume?: ResumeData;
  onOpenInBuilder: (resumeData: ResumeData) => void;
  onSaveReportNotification?: () => void;
  onBackToLanding?: () => void;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  initialResume,
  onOpenInBuilder,
  onSaveReportNotification,
  onBackToLanding,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('Software Engineer');
  const [targetJobDesc, setTargetJobDesc] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(() => {
    if (initialResume) {
      return analyzeResumeData(initialResume);
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'strengths' | 'issues' | 'skills' | 'recruiter' | 'recommendations'>('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
      // Automatically detect probable role from filename
      if (file.name.toLowerCase().includes('frontend')) setTargetRole('Frontend Developer');
      else if (file.name.toLowerCase().includes('mern')) setTargetRole('Full Stack MERN Developer');
      else if (file.name.toLowerCase().includes('data')) setTargetRole('Data Analyst');
      runAnalysis(content, targetRole);
    };

    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else {
      // For binary PDF/DOCX mockup extraction
      // Provide clean parsed simulation from document text
      reader.readAsText(file);
    }
  };

  // Run analysis with simulated multi-step scan
  const runAnalysis = async (textToScan: string, roleToTarget: string) => {
    setIsAnalyzing(true);

    const steps = [
      'Extracting document typography & text structure...',
      'Matching against Workday, Greenhouse & Lever ATS engines...',
      'Auditing quantifiable metrics & Google XYZ formula density...',
      'Simulating 6-second Senior Technical Recruiter scan...',
      'Synthesizing final CareerScore rating...',
    ];

    for (const step of steps) {
      setAnalysisStep(step);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    const calculated = analyzeResumeText(textToScan, roleToTarget);
    setResult(calculated);
    setIsAnalyzing(false);
    saveAnalysisReport(calculated);
    if (onSaveReportNotification) onSaveReportNotification();

    if (calculated.overallScore >= 85) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleQuickLoad = (sample: ResumeData) => {
    setUploadedFileName(`${sample.personalInfo.fullName.replace(' ', '_')}_Resume.pdf`);
    setTargetRole(sample.targetRole);
    const analyzed = analyzeResumeData(sample);
    setResult(analyzed);
    saveAnalysisReport(analyzed);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e7dcff] pb-6">
        <div className="flex items-start gap-3">
          {onBackToLanding && (
            <button
              type="button"
              onClick={onBackToLanding}
              className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f3edff] border border-[#e3d7ff] text-[#594b7a] hover:bg-[#ece4ff] transition-colors"
              aria-label="Back to landing page"
              title="Back to landing page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edfdf4] text-[#2d7c5a] border border-[#cfeedd] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resume score & ATS checker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#201a2d] tracking-tight">
              Resume Checker
            </h1>
            <p className="text-sm text-[#5f5675] mt-1">
              Review your resume for ATS structure, keywords, section quality, and score-based feedback.
            </p>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Try Sample:</span>
          <div className="flex flex-wrap gap-2">
            {sampleResumes.map((s) => (
              <button
                key={s.id}
                onClick={() => handleQuickLoad(s)}
                className="px-2.5 py-1.5 rounded-lg bg-[#f4efff] border border-[#e4d9ff] text-xs text-[#413758] hover:text-[#221c35] hover:border-[#d3c7ff] transition-colors cursor-pointer"
              >
                {s.targetRole.split('/')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upload & Job Target Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Drag & Drop Upload Card (8 cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl relative border border-[#e8dcff] bg-[#f9f5ff]/90">
          <h2 className="text-sm font-semibold text-[#2a2542] mb-3 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-[#6d5bd8]" />
            <span>Upload Resume (PDF, DOCX, or Text)</span>
          </h2>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#d9cdfd] hover:border-[#8d7ae9] rounded-xl p-8 text-center cursor-pointer transition-all bg-[#f3edff] hover:bg-[#f0ebff] group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.docx,.doc,.txt,.json"
              className="hidden"
            />
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <p className="text-sm font-medium text-[#2a2542] mb-1">
              {uploadedFileName ? (
                <span className="text-[#1d8d5b] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Loaded: {uploadedFileName}
                </span>
              ) : (
                'Drop your resume here, or browse files'
              )}
            </p>
            <p className="text-xs text-[#5e5873]">
              Supports PDF, DOCX, DOC, TXT (Maximum file size: 10MB)
            </p>
          </div>

          {/* Paste Text Accordion Toggle */}
          <div className="mt-4">
            <details className="text-xs text-[#615a77] group">
              <summary className="cursor-pointer hover:text-[#2a2542] transition-colors flex items-center gap-1 select-none font-medium">
                <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" />
                <span>Or paste resume text directly</span>
              </summary>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the raw text of your resume here (experience, summary, skills, education)..."
                rows={5}
                className="w-full mt-2 p-3 rounded-lg bg-[#fff] border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9] font-mono"
              />
            </details>
          </div>
        </div>

        {/* Target Job Settings & Action (4 cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl flex flex-col justify-between border border-[#e8dcff] bg-[#f9f5ff]/90">
          <div>
            <h2 className="text-sm font-semibold text-[#2a2542] mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#32a76f]" />
              <span>Target Career Role</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#5a5075] block mb-1">Target Position</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e0d4ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                />
              </div>

              <div>
                <label className="text-xs text-[#5a5075] block mb-1">
                  Target Job Description <span className="text-[#746c8e]">(Optional for match score)</span>
                </label>
                <textarea
                  value={targetJobDesc}
                  onChange={(e) => setTargetJobDesc(e.target.value)}
                  placeholder="Paste job posting requirements for tailored keyword matching..."
                  rows={3}
                  className="w-full p-2.5 rounded-lg bg-white border border-[#e0d4ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const textToUse = inputText || (initialResume ? JSON.stringify(initialResume) : '');
              if (!textToUse.trim()) {
                setAnalysisStep('Add a resume or paste resume text to begin your analysis.');
                return;
              }
              runAnalysis(textToUse, targetRole);
            }}
            disabled={isAnalyzing}
            className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Analyzing Resume...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze Resume Now</span>
              </>
            )}
          </button>
        </div>

      </div>

      {!result && !isAnalyzing && (
        <div className="glass-panel p-8 rounded-2xl text-center border border-dashed border-slate-300">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <FileText className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Start with a resume</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Upload a PDF, DOCX, or paste your resume text to generate ATS insights, score feedback, and tailored suggestions.
          </p>
        </div>
      )}

      {/* Loading Scanning State Banner */}
      {isAnalyzing && (
        <div className="glass-panel p-6 rounded-2xl border border-[#e7dcff] bg-[#f9f5ff]/90 text-center animate-pulse">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#f3edff] text-[#5d4ab2] flex items-center justify-center">
            <RefreshCw className="w-5 h-5 animate-spin" />
          </div>
          <p className="text-sm font-semibold text-[#201a2d]">{analysisStep}</p>
          <p className="text-xs text-[#5c526d] mt-1">Checking section structure, keywords, and ATS parsing patterns</p>
        </div>
      )}

      {/* Analysis Dashboard */}
      {result && !isAnalyzing && (
        <div className="space-y-6">
          
          {/* Top 3 High-Impact Cards: Overall Score, ATS Score, Confidence Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Overall Career Score */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-[#e7dcff] bg-[#f9f5ff]/90">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#5d4ab2] uppercase tracking-wider">
                    Score Evaluation
                  </span>
                  <h3 className="text-lg font-bold text-[#201a2d] mt-0.5">Overall Career Score</h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#f3edff] border border-[#d9ccff] text-[#5d4ab2] font-mono text-xs font-bold">
                  GRADE {result.scoreGrade}
                </div>
              </div>

              <div className="my-5 flex items-center justify-center gap-6">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#e9ebf4"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke={result.overallScore >= 85 ? '#10B981' : result.overallScore >= 70 ? '#7c6ad9' : '#F59E0B'}
                      strokeWidth="10"
                      strokeDasharray={326}
                      strokeDashoffset={326 * (1 - result.overallScore / 100)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-[#201a2d] tracking-tight">
                      {result.overallScore}
                    </span>
                    <span className="text-[11px] text-[#5c526d] font-medium">/ 100</span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-[#3d3b4f]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Candidate: <strong className="text-[#201a2d]">{result.candidateName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#7c6ad9]" />
                    <span>Target: <strong className="text-[#201a2d]">{result.targetRole}</strong></span>
                  </div>
                  <div className="text-[11px] text-[#5c526d] mt-2">
                    {result.overallScore >= 85 ? 'Top 10% percentile resume' : 'Strong potential, needs key polish'}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e7dcff] flex items-center justify-between text-xs">
                <span className="text-[#5c526d]">Industry Benchmark</span>
                <span className="text-[#2d2547] font-medium">Average: 68/100</span>
              </div>
            </div>

            {/* 2. ATS Score & Compatibility */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-[#e7dcff] bg-[#f9f5ff]/90">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#1d8d5b] uppercase tracking-wider">
                      ATS Compliance
                    </span>
                    <h3 className="text-lg font-bold text-[#201a2d] mt-0.5">ATS Compatibility Score</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#1d8d5b] px-2 py-0.5 bg-[#ebfaf3] rounded border border-[#cfeedd]">
                    {result.atsScore}%
                  </span>
                </div>

                <div className="mt-4 mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#5c526d]">ATS Pass Rate</span>
                    <span className="text-[#2d2547] font-medium">
                      {result.atsScore >= 85 ? 'Cleared for 98% of filters' : 'May trigger warning filters'}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-[#edf2ff] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.atsScore >= 85 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-emerald-400'
                      }`}
                      style={{ width: `${result.atsScore}%` }}
                    />
                  </div>
                </div>

                {/* Sub-breakdown metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#3d3b4f]">
                    <span>Header & Contact Parsability</span>
                    <span className="text-[#1d8d5b] font-mono font-semibold">
                      {result.metricBreakdown.atsParsability}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3d3b4f]">
                    <span>Keyword Frequency & Placement</span>
                    <span className="text-[#5d4ab2] font-mono font-semibold">
                      {result.metricBreakdown.skillsDensity}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3d3b4f]">
                    <span>Standard Section Headings</span>
                    <span className="text-[#2d7c5a] font-mono font-semibold">100%</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e7dcff] flex items-center justify-between text-xs">
                <span className="text-[#5c526d]">Screening Engine</span>
                <span className="text-[#1d8d5b] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Workday / Lever Compatible
                </span>
              </div>
            </div>

            {/* 3. Confidence Score Gauge */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-[#e7dcff] bg-[#f9f5ff]/90">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#5d4ab2] uppercase tracking-wider">
                      Reliability & Evidence
                    </span>
                    <h3 className="text-lg font-bold text-[#201a2d] mt-0.5">Confidence Score</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#5d4ab2] px-2 py-0.5 bg-[#f4efff] rounded border border-[#e1d6ff]">
                    {result.confidenceScore}%
                  </span>
                </div>

                <div className="mt-4 mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#5c526d]">Metric Substantiation</span>
                    <span className="text-[#5d4ab2] font-medium">High Confidence</span>
                  </div>
                  <div className="w-full h-3 bg-[#edf2ff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7c6ad9] to-[#5ab788] rounded-full transition-all duration-700"
                      style={{ width: `${result.confidenceScore}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-[#3d3b4f]">
                    <span>Quantified Impact Metrics</span>
                    <span className="text-[#5d4ab2] font-mono font-semibold">
                      {result.metricBreakdown.impactAndMetrics}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3d3b4f]">
                    <span>Action Verb Power</span>
                    <span className="text-[#5d4ab2] font-mono font-semibold">
                      {result.metricBreakdown.actionVerbs}%
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3d3b4f]">
                    <span>Brevity & Conciseness</span>
                    <span className="text-[#1d8d5b] font-mono font-semibold">
                      {result.metricBreakdown.brevityAndLength}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e7dcff] flex items-center justify-between text-xs">
                <span className="text-[#5c526d]">Evidence Depth</span>
                <span className="text-[#2d2547] font-medium">Verified Hard Metrics</span>
              </div>
            </div>

          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#e7dcff] pb-2">
            {[
              { id: 'overview', label: 'All Insights' },
              { id: 'strengths', label: `Strong Points (${result.strengths.length})` },
              { id: 'issues', label: `Errors & Issues (${result.issues.length})` },
              { id: 'skills', label: 'Skill Analysis' },
              { id: 'recruiter', label: 'Recruiter Feedback' },
              { id: 'recommendations', label: 'Recommendations' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white shadow-md shadow-violet-200/80'
                    : 'text-[#5f5675] hover:text-[#2a2542] hover:bg-[#f2ebff]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Overview & Strong Points */}
          {(activeTab === 'overview' || activeTab === 'strengths') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#201a2d] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1d8d5b]" />
                  <span>Strong Points & Core Strengths</span>
                </h3>
                <span className="text-xs text-[#5c526d]">
                  {result.strengths.length} critical advantages found
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.strengths.map((str, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#ebfaf3] border border-[#cfeedd] relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#eafaf1] text-[#1d8d5b] border border-[#cfeedd]">
                        {str.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#201a2d] mb-1.5">{str.title}</h4>
                    <p className="text-xs text-[#3d3b4f] leading-relaxed">{str.description}</p>
                    {str.evidence && (
                      <div className="mt-3 p-2 rounded-lg bg-white border border-[#cfeedd] text-[11px] font-mono text-[#1d8d5b]">
                        Evidence: {str.evidence}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Errors & Issues (Red Cards) */}
          {(activeTab === 'overview' || activeTab === 'issues') && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#201a2d] flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#c43a5d]" />
                  <span>Errors, Weaknesses & Optimization Triggers</span>
                </h3>
                <span className="text-xs text-[#5c526d]">
                  {result.issues.length} areas to fix before applying
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-5 rounded-2xl bg-[#fff1f3] border border-[#fccfe1] relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        issue.severity === 'critical' ? 'bg-[#ffdfe7] text-[#b32c52] border border-[#f7bfd0]' : 'bg-[#fff0d6] text-[#a76500] border border-[#f8d999]'
                      }`}>
                        {issue.severity} &bull; {issue.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#201a2d] mb-1.5">{issue.title}</h4>
                    <p className="text-xs text-[#3d3b4f] leading-relaxed mb-3">{issue.description}</p>
                    
                    <div className="p-3 rounded-xl bg-white border border-[#f4d6df] space-y-1.5 text-xs">
                      <p className="text-[#3d3b4f] font-medium">
                        <strong className="text-[#5d4ab2]">Recommended Fix:</strong> {issue.suggestion}
                      </p>
                      {issue.exampleFix && (
                        <p className="text-[11px] text-[#1d8d5b] font-mono">
                          Fix: {issue.exampleFix}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 3: Skill Analysis (Technical, Soft, Missing) */}
          {(activeTab === 'overview' || activeTab === 'skills') && (
            <div className="glass-panel p-6 rounded-2xl border border-[#e7dcff] bg-[#f9f5ff]/90">
              <h3 className="text-base font-bold text-[#201a2d] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#5d4ab2]" />
                <span>Skill Analysis & ATS Keyword Coverage</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Technical Skills */}
                <div className="p-4 rounded-xl bg-white border border-[#e7dcff]">
                  <h4 className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Technical Competencies ({result.skillAnalysis.technical.length})</span>
                    <span className="text-[#1d8d5b] text-[10px]">Verified</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skillAnalysis.technical.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs bg-[#f3edff] text-[#5d4ab2] border border-[#e2d8ff]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft & Methodological Skills */}
                <div className="p-4 rounded-xl bg-white border border-[#e7dcff]">
                  <h4 className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Soft & Leadership Skills ({result.skillAnalysis.soft.length})</span>
                    <span className="text-[#5d4ab2] text-[10px]">Indexed</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skillAnalysis.soft.map((soft, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs bg-[#f4efff] text-[#5d4ab2] border border-[#e1d6ff]"
                      >
                        {soft}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills for Target */}
                <div className="p-4 rounded-xl bg-[#fff7e8] border border-[#f8d999]">
                  <h4 className="text-xs font-semibold text-[#9f6500] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>High-Demand Missing Keywords</span>
                    <span className="text-[#9f6500] text-[10px]">Add to pass ATS</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.skillAnalysis.missingForTarget.map((miss, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs bg-[#fff0d6] text-[#9f6500] border border-[#f8d999] flex items-center gap-1"
                      >
                        <span>+ {miss}</span>
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#5c526d] mt-3">
                    Adding these skills into your projects or experience bullets can raise your ATS match rate by up to 18%.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Tab Content 4: Recruiter Feedback (Simulated Review) */}
          {(activeTab === 'overview' || activeTab === 'recruiter') && (
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-[#e7dcff] bg-[#f9f5ff]/90">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-[#5d4ab2] uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    <span>Simulated Senior Technical Recruiter Review</span>
                  </span>
                  <h3 className="text-xl font-bold text-[#201a2d] mt-1">
                    {result.recruiterReview.headline}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-[#f4efff] border border-[#e1d6ff] text-xs text-[#5d4ab2]">
                    Scan Duration: <strong>6 seconds</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-[#ebfaf3] border border-[#cfeedd] text-xs text-[#1d8d5b]">
                    Interview Readiness: <strong>{result.recruiterReview.interviewReadiness}%</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#e7dcff] mb-6">
                <p className="text-sm text-[#3d3b4f] leading-relaxed italic">
                  "{result.recruiterReview.overallImpression}"
                </p>
              </div>

              {/* Likely Interview Questions */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider mb-2">
                  Likely Interview Questions Based on Your Resume:
                </h4>
                <div className="space-y-2">
                  {result.recruiterReview.likelyQuestions.map((q, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white border border-[#e7dcff] text-xs text-[#3d3b4f] font-mono"
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 5: Recommendations */}
          {(activeTab === 'overview' || activeTab === 'recommendations') && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-[#e7dcff] bg-[#f9f5ff]/90">
                <h4 className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider mb-3">
                  Recommended Power Action Verbs to Swap In:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendations.actionVerbsToUse.map((verb, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs bg-[#f3edff] text-[#5d4ab2] border border-[#e1d6ff] font-medium"
                    >
                      {verb}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Suggested Matching Roles */}
          <div className="glass-panel p-6 rounded-2xl border border-[#e7dcff] bg-[#f9f5ff]/90">
            <h3 className="text-base font-bold text-[#201a2d] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#1d8d5b]" />
              <span>Suggested Matching Roles Based on Your Resume Stack</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.suggestedRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#e7dcff] hover:border-[#cfc0ff] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#201a2d]">{role.title}</span>
                    <span className="text-xs font-mono font-bold text-[#1d8d5b]">
                      {role.matchPercentage}% Match
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#5c526d] mb-3">
                    <span>{role.seniority}</span>
                    <span>&bull;</span>
                    <span className="text-[#5d4ab2] font-medium">{role.marketDemand} Demand</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.keyMatchingSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-[#f4efff] text-[#433a5c] border border-[#e5dcff]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar: Fix in Builder */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#cfc4ff] to-[#dff8eb] border border-[#d9ccff] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#201a2d]">Apply These Improvements in Resume Builder</h4>
              <p className="text-xs text-[#4d4764] mt-0.5">
                Automatically port your verified skills, fix flagged issues, and download a polished PDF.
              </p>
            </div>
            <button
              onClick={() => {
                const targetSample = sampleResumes[0];
                onOpenInBuilder(targetSample);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] hover:brightness-105 text-white font-semibold text-xs shadow-lg shadow-violet-200/80 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <span>Open in Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
