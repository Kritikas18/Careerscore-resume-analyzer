import React, { useState, useEffect } from 'react';
import {
  User,
  FileText,
  GraduationCap,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  Compass,
  Sparkles,
  Download,
  Printer,
  History,
  CheckCircle2,
  Plus,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Palette,
  ExternalLink,
  ChevronRight,
  Eye,
  Edit3
} from 'lucide-react';
import { ResumeData, TemplateId, Experience, Education, Project, SkillCategory, Certification, Achievement, Extracurricular } from '../../types/resume';
import { ResumePreview } from './ResumePreview';
import { AIAssistantModal } from './AIAssistantModal';
import { VersionHistoryModal } from './VersionHistoryModal';
import { exportToPdf, exportToDocx, exportToJson } from '../../services/exportService';
import { saveResume, saveResumeVersion } from '../../services/storageService';

interface ResumeBuilderProps {
  initialData?: ResumeData;
  onNavigateToAnalyzer: (resume: ResumeData) => void;
}

const TEMPLATES: Array<{ id: TemplateId; name: string; tag: string }> = [
  { id: 'modern', name: 'Modern Professional', tag: 'Most Popular' },
  { id: 'ats', name: 'ATS-Friendly', tag: '100% Parsable' },
  { id: 'corporate', name: 'Corporate Executive', tag: 'Traditional' },
  { id: 'minimal', name: 'Minimal Swiss', tag: 'Clean & Modern' },
  { id: 'student', name: 'Student & Early Career', tag: 'Education First' },
];

const ACCENT_COLORS = [
  { label: 'Indigo', value: '#4F46E5' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Blue', value: '#2563EB' },
  { label: 'Purple', value: '#8B5CF6' },
  { label: 'Rose', value: '#E11D48' },
  { label: 'Slate', value: '#334155' },
];

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ initialData, onNavigateToAnalyzer }) => {
  const [resume, setResume] = useState<ResumeData>(() => initialData || {
    id: 'res-' + Date.now(),
    title: 'My Professional Resume',
    targetRole: 'Software Engineer',
    updatedAt: new Date().toISOString(),
    templateId: 'modern',
    accentColor: '#4F46E5',
    personalInfo: {
      fullName: 'Kritika Singh',
      jobTitle: 'Senior Frontend Engineer',
      email: 'kritika.singh@example.com',
      phone: '+1 (555) 234-8901',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/kritikasingh',
      github: 'github.com/kritika-singh',
      portfolio: 'kritikasingh.dev',
    },
    summary: 'Product-driven Senior Frontend Engineer with 6+ years experience architecting high-performance React & TypeScript applications for enterprise SaaS.',
    skills: [
      { category: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
      { category: 'Backend & Tools', skills: ['Node.js', 'PostgreSQL', 'Docker', 'Git'] },
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
          'Spearheaded core customer portal serving 450K+ daily active users, cutting initial bundle size by 38%.',
          'Built accessible WCAG AA-compliant React design system of 60+ components adopted across 8 engineering squads.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2015',
        endDate: '2019',
        current: false,
        gpa: '3.82',
        achievements: 'Dean\'s Honor List (4 semesters)',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'HyperGrid - Canvas Data Grid',
        tools: 'TypeScript, Canvas, React',
        liveUrl: 'https://hypergrid-demo.io',
        githubUrl: 'https://github.com/kritika-singh/hypergrid',
        description: 'Virtual scrolling grid component capable of smooth 60fps rendering with 1,000,000 cells.',
        bullets: ['Implemented spatial indexing buffer, earning 2,400+ GitHub stars.'],
      },
    ],
    certifications: [
      { id: 'cert-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
    ],
    achievements: [
      { id: 'ach-1', title: '1st Place Winner - SV Fintech Hackathon', organization: 'SV Tech Summit', date: '2023', description: 'Real-time fraud streaming dashboard' },
    ],
    extracurriculars: [
      { id: 'ext-1', role: 'Open Source Maintainer', organization: 'React SF Community', duration: '2021-Present', description: 'Conducted workshops for 300+ career transitioners' },
    ],
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.85);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('Saved');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  // Modals
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalMode, setAiModalMode] = useState<'summary' | 'bullet' | 'skills' | 'rewrite' | 'keywords'>('summary');
  const [historyModalOpen, setHistoryModalOpen] = useState<boolean>(false);

  // Auto-save on change
  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      saveResume(resume);
      setSaveStatus('Cloud Synced');
    }, 600);
    return () => clearTimeout(timer);
  }, [resume]);

  // Form field updaters
  const updatePersonalInfo = (field: keyof typeof resume.personalInfo, value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleApplyAI = (text: string | string[], mode: string) => {
    if (mode === 'summary' && typeof text === 'string') {
      setResume((prev) => ({ ...prev, summary: text }));
    } else if (mode === 'skills' && Array.isArray(text)) {
      setResume((prev) => ({
        ...prev,
        skills: [
          ...prev.skills,
          { category: 'Suggested Skills', skills: text.slice(0, 8) },
        ],
      }));
    } else if (mode === 'bullet' && typeof text === 'string') {
      // append to first experience
      if (resume.experience.length > 0) {
        const copy = [...resume.experience];
        copy[0].bullets.push(text);
        setResume((prev) => ({ ...prev, experience: copy }));
      }
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    await exportToPdf('resume-preview-sheet', `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    setIsExporting(false);
  };

  const handleExportDOCX = () => {
    exportToDocx(resume, `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.doc`);
  };

  const formSteps = [
    { id: 1, label: 'Personal Info', icon: User },
    { id: 2, label: 'Summary', icon: FileText },
    { id: 3, label: 'Education', icon: GraduationCap },
    { id: 4, label: 'Skills', icon: Wrench },
    { id: 5, label: 'Projects', icon: FolderGit2 },
    { id: 6, label: 'Experience', icon: Briefcase },
    { id: 7, label: 'Certifications', icon: Award },
    { id: 8, label: 'Achievements', icon: Trophy },
    { id: 9, label: 'Activities', icon: Compass },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e7dcff]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#201a2d] tracking-tight">
              Resume Builder & Live Staging
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#ebfaf3] text-[#1d8d5b] border border-[#cfeedd] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{saveStatus}</span>
            </span>
          </div>
          <p className="text-xs text-[#5c526d] mt-1">
            Real-time reactive editor with instant formatting and ATS engine compatibility.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Version History Button */}
          <button
            onClick={() => setHistoryModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#f5f0ff] border border-[#e5dcff] text-[#433a5c] hover:text-[#241d37] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-[#5d4ab2]" />
            <span>Versions</span>
          </button>

          {/* Test in Analyzer */}
          <button
            onClick={() => onNavigateToAnalyzer(resume)}
            className="px-3 py-1.5 rounded-lg bg-[#edfdf4] text-[#2d7c5a] border border-[#cfeedd] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit in Analyzer</span>
          </button>

          {/* Export Dropdown / Actions */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] hover:brightness-105 text-white font-semibold text-xs shadow-md shadow-violet-200/80 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={handleExportDOCX}
            className="px-3 py-1.5 rounded-lg bg-[#f4efff] hover:bg-[#ece4ff] text-[#433a5c] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Word (.doc)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-2.5 py-1.5 rounded-lg bg-[#f4efff] hover:bg-[#ece4ff] text-[#433a5c] text-xs transition-colors cursor-pointer"
            title="Print"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Template & Color Selector Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-[#e7dcff] bg-[#f9f5ff]/90">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-[#5f5675] font-semibold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#6d5bd8]" />
            <span>Template:</span>
          </span>
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setResume((prev) => ({ ...prev, templateId: tmpl.id }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                resume.templateId === tmpl.id
                  ? 'bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white shadow-sm'
                  : 'bg-white text-[#433a5c] hover:text-[#241d37] border border-[#e7dcff]'
              }`}
            >
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>

        {/* Accent Color Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accent:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {ACCENT_COLORS.map((col) => (
              <button
                key={col.value}
                onClick={() => setResume((prev) => ({ ...prev, accentColor: col.value }))}
                style={{ backgroundColor: col.value }}
                title={col.label}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  resume.accentColor === col.value ? 'ring-2 ring-white scale-110' : 'hover:scale-110 opacity-80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Toggle between Editor and Preview */}
      <div className="flex lg:hidden bg-[#f4efff] p-1 rounded-xl border border-[#e7dcff]">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === 'editor' ? 'bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white' : 'text-[#5d4ab2]'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === 'preview' ? 'bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white' : 'text-[#5d4ab2]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace (5 cols form, 7 cols live preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Step-by-Step Form Navigator (5 cols) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          
          {/* Step Navigator Tabs */}
          <div className="glass-panel p-2.5 rounded-xl flex items-center gap-1 overflow-x-auto border border-[#e7dcff] bg-[#f9f5ff]/90">
            {formSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] text-white shadow-sm'
                      : 'text-[#5f5675] hover:text-[#2a2542] hover:bg-[#f2ebff]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Cards */}
          <div className="glass-panel p-6 rounded-2xl space-y-5 border border-[#e7dcff] bg-[#f9f5ff]/90">
            
            {/* STEP 1: Personal Information */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#e7dcff] pb-3">
                  <h3 className="text-sm font-bold text-[#201a2d] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#5d4ab2]" />
                    <span>1. Personal Information</span>
                  </h3>
                  <span className="text-[11px] text-[#5c526d]">Step 1 of 9</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#4c4563] block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="Kritika Singh"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4c4563] block mb-1">Target Job Title</label>
                    <input
                      type="text"
                      value={resume.personalInfo.jobTitle}
                      onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                      placeholder="Senior Frontend Engineer"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4c4563] block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="kritika.singh@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4c4563] block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={resume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 (555) 234-8901"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-[#4c4563] block mb-1">Location</label>
                    <input
                      type="text"
                      value={resume.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      placeholder="San Francisco, CA (Open to Remote)"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4c4563] block mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={resume.personalInfo.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/kritikasingh"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4c4563] block mb-1">GitHub / Code Portfolio</label>
                    <input
                      type="text"
                      value={resume.personalInfo.github}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      placeholder="github.com/kritika-singh"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Professional Summary */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>2. Professional Summary</span>
                  </h3>
                  <button
                    onClick={() => {
                      setAiModalMode('summary');
                      setAiModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium hover:bg-indigo-600/40 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Summary Help</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400">
                  A strong 2-3 sentence overview highlighting your trajectory, key technologies, and quantifiable achievements.
                </p>

                <textarea
                  value={resume.summary}
                  onChange={(e) => setResume((prev) => ({ ...prev, summary: e.target.value }))}
                  rows={5}
                  placeholder="Enter your professional summary..."
                  className="w-full p-3 rounded-xl bg-[#0B1020] border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* STEP 3: Education */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span>3. Education</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newEdu: Education = {
                        id: 'edu-' + Date.now(),
                        institution: '',
                        degree: 'Bachelor of Science',
                        fieldOfStudy: '',
                        startDate: '',
                        endDate: '',
                        current: false,
                      };
                      setResume((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-[#0B1020]/80 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300">Degree #{idx + 1}</span>
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              education: prev.education.filter((e) => e.id !== edu.id),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const copy = [...resume.education];
                            copy[idx].institution = e.target.value;
                            setResume((prev) => ({ ...prev, education: copy }));
                          }}
                          placeholder="University / College"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const copy = [...resume.education];
                            copy[idx].degree = e.target.value;
                            setResume((prev) => ({ ...prev, education: copy }));
                          }}
                          placeholder="Degree (e.g. B.S., M.S.)"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => {
                            const copy = [...resume.education];
                            copy[idx].fieldOfStudy = e.target.value;
                            setResume((prev) => ({ ...prev, education: copy }));
                          }}
                          placeholder="Field of Study (e.g. Computer Science)"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={edu.gpa || ''}
                          onChange={(e) => {
                            const copy = [...resume.education];
                            copy[idx].gpa = e.target.value;
                            setResume((prev) => ({ ...prev, education: copy }));
                          }}
                          placeholder="GPA (e.g. 3.8 / 4.0)"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => {
                            const copy = [...resume.education];
                            copy[idx].startDate = e.target.value;
                            setResume((prev) => ({ ...prev, education: copy }));
                          }}
                          placeholder="Start Year"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => {
                            const copy = [...resume.education];
                            copy[idx].endDate = e.target.value;
                            setResume((prev) => ({ ...prev, education: copy }));
                          }}
                          placeholder="End Year / Expected"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Skills */}
            {activeStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-indigo-400" />
                    <span>4. Skills</span>
                  </h3>
                  <button
                    onClick={() => {
                      setAiModalMode('skills');
                      setAiModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium hover:bg-indigo-600/40 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggested Skills</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {resume.skills.map((cat, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0B1020]/70 border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => {
                            const copy = [...resume.skills];
                            copy[idx].category = e.target.value;
                            setResume((prev) => ({ ...prev, skills: copy }));
                          }}
                          className="font-bold text-xs bg-transparent text-indigo-300 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              skills: prev.skills.filter((_, i) => i !== idx),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={cat.skills.join(', ')}
                        onChange={(e) => {
                          const copy = [...resume.skills];
                          copy[idx].skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setResume((prev) => ({ ...prev, skills: copy }));
                        }}
                        placeholder="Comma separated skills (e.g. React, TypeScript, Node.js)"
                        className="w-full px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setResume((prev) => ({
                        ...prev,
                        skills: [...prev.skills, { category: 'Tools & Frameworks', skills: [] }],
                      }));
                    }}
                    className="w-full py-2 rounded-lg border border-dashed border-white/20 text-xs text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                  >
                    + Add Skill Category
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Projects */}
            {activeStep === 5 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-indigo-400" />
                    <span>5. Projects</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newProj: Project = {
                        id: 'proj-' + Date.now(),
                        title: 'New Technical Project',
                        tools: 'React, Node.js',
                        description: 'Brief overview of what this application accomplishes.',
                        bullets: ['Accomplished [X] by doing [Z], increasing performance by 30%.'],
                      };
                      setResume((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.projects.map((proj, idx) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-[#0B1020]/80 border border-white/10 space-y-2.5">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const copy = [...resume.projects];
                            copy[idx].title = e.target.value;
                            setResume((prev) => ({ ...prev, projects: copy }));
                          }}
                          placeholder="Project Title"
                          className="font-bold text-xs bg-transparent text-white focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              projects: prev.projects.filter((p) => p.id !== proj.id),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={proj.tools}
                          onChange={(e) => {
                            const copy = [...resume.projects];
                            copy[idx].tools = e.target.value;
                            setResume((prev) => ({ ...prev, projects: copy }));
                          }}
                          placeholder="Tech Stack (e.g. Next.js, GraphQL)"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={proj.liveUrl || ''}
                          onChange={(e) => {
                            const copy = [...resume.projects];
                            copy[idx].liveUrl = e.target.value;
                            setResume((prev) => ({ ...prev, projects: copy }));
                          }}
                          placeholder="Live URL / Demo"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                      </div>

                      <textarea
                        value={proj.description}
                        onChange={(e) => {
                          const copy = [...resume.projects];
                          copy[idx].description = e.target.value;
                          setResume((prev) => ({ ...prev, projects: copy }));
                        }}
                        rows={2}
                        placeholder="Short summary of architecture and impact"
                        className="w-full p-2.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Internships & Experience */}
            {activeStep === 6 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    <span>6. Experience & Internships</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setAiModalMode('bullet');
                        setAiModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium hover:bg-indigo-600/40 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Bullet Help</span>
                    </button>
                    <button
                      onClick={() => {
                        const newExp: Experience = {
                          id: 'exp-' + Date.now(),
                          company: 'Company Name',
                          role: 'Software Engineer',
                          location: 'Location',
                          startDate: '2023',
                          endDate: 'Present',
                          current: true,
                          bullets: ['Spearheaded development of core features...'],
                        };
                        setResume((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Role</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {resume.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-[#0B1020]/80 border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-300">Position #{idx + 1}</span>
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              experience: prev.experience.filter((e) => e.id !== exp.id),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const copy = [...resume.experience];
                            copy[idx].role = e.target.value;
                            setResume((prev) => ({ ...prev, experience: copy }));
                          }}
                          placeholder="Job Title"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const copy = [...resume.experience];
                            copy[idx].company = e.target.value;
                            setResume((prev) => ({ ...prev, experience: copy }));
                          }}
                          placeholder="Company Name"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const copy = [...resume.experience];
                            copy[idx].startDate = e.target.value;
                            setResume((prev) => ({ ...prev, experience: copy }));
                          }}
                          placeholder="Start Date (e.g. 2022-03)"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const copy = [...resume.experience];
                            copy[idx].endDate = e.target.value;
                            setResume((prev) => ({ ...prev, experience: copy }));
                          }}
                          placeholder="End Date (e.g. Present)"
                          className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white"
                        />
                      </div>

                      {/* Bullets */}
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">
                          Accomplishment Bullets (One per line):
                        </label>
                        <textarea
                          value={exp.bullets.join('\n')}
                          onChange={(e) => {
                            const copy = [...resume.experience];
                            copy[idx].bullets = e.target.value.split('\n').filter(Boolean);
                            setResume((prev) => ({ ...prev, experience: copy }));
                          }}
                          rows={4}
                          placeholder="• Spearheaded customer portal rebuild..."
                          className="w-full p-2.5 rounded-lg bg-[#111827] border border-white/10 text-xs text-white leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7: Certifications */}
            {activeStep === 7 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>7. Certifications</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newCert: Certification = {
                        id: 'cert-' + Date.now(),
                        name: 'AWS Solutions Architect',
                        issuer: 'Amazon Web Services',
                        date: '2024',
                      };
                      setResume((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {resume.certifications.map((c, idx) => (
                    <div key={c.id} className="p-3 rounded-xl bg-[#0B1020]/70 border border-white/10 grid grid-cols-3 gap-2 items-center">
                      <input
                        type="text"
                        value={c.name}
                        onChange={(e) => {
                          const copy = [...resume.certifications];
                          copy[idx].name = e.target.value;
                          setResume((prev) => ({ ...prev, certifications: copy }));
                        }}
                        placeholder="Certificate Title"
                        className="px-2 py-1 rounded bg-[#111827] text-xs text-white"
                      />
                      <input
                        type="text"
                        value={c.issuer}
                        onChange={(e) => {
                          const copy = [...resume.certifications];
                          copy[idx].issuer = e.target.value;
                          setResume((prev) => ({ ...prev, certifications: copy }));
                        }}
                        placeholder="Issuer (e.g. AWS, Meta)"
                        className="px-2 py-1 rounded bg-[#111827] text-xs text-white"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={c.date}
                          onChange={(e) => {
                            const copy = [...resume.certifications];
                            copy[idx].date = e.target.value;
                            setResume((prev) => ({ ...prev, certifications: copy }));
                          }}
                          placeholder="Date"
                          className="px-2 py-1 rounded bg-[#111827] text-xs text-white flex-1"
                        />
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              certifications: prev.certifications.filter((cert) => cert.id !== c.id),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Achievements */}
            {activeStep === 8 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-indigo-400" />
                    <span>8. Achievements & Awards</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newAch: Achievement = {
                        id: 'ach-' + Date.now(),
                        title: '1st Place Hackathon Winner',
                        organization: 'Tech Summit',
                        date: '2024',
                        description: 'Built winning prototype in 36 hours.',
                      };
                      setResume((prev) => ({ ...prev, achievements: [...prev.achievements, newAch] }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Honor</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {resume.achievements.map((a, idx) => (
                    <div key={a.id} className="p-3.5 rounded-xl bg-[#0B1020]/70 border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={a.title}
                          onChange={(e) => {
                            const copy = [...resume.achievements];
                            copy[idx].title = e.target.value;
                            setResume((prev) => ({ ...prev, achievements: copy }));
                          }}
                          placeholder="Award / Honor Title"
                          className="font-bold text-xs bg-transparent text-white focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              achievements: prev.achievements.filter((ach) => ach.id !== a.id),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        value={a.description}
                        onChange={(e) => {
                          const copy = [...resume.achievements];
                          copy[idx].description = e.target.value;
                          setResume((prev) => ({ ...prev, achievements: copy }));
                        }}
                        rows={2}
                        placeholder="Describe the significance and measurable impact"
                        className="w-full p-2 rounded bg-[#111827] text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 9: Extracurricular Activities */}
            {activeStep === 9 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <span>9. Extracurricular Activities & Leadership</span>
                  </h3>
                  <button
                    onClick={() => {
                      const newExt: Extracurricular = {
                        id: 'ext-' + Date.now(),
                        role: 'Community Mentor',
                        organization: 'Local Tech Hub',
                        duration: '2023-Present',
                        description: 'Organized monthly workshops on modern JavaScript.',
                      };
                      setResume((prev) => ({ ...prev, extracurriculars: [...prev.extracurriculars, newExt] }));
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Activity</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {resume.extracurriculars.map((ex, idx) => (
                    <div key={ex.id} className="p-3.5 rounded-xl bg-[#0B1020]/70 border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={ex.role}
                          onChange={(e) => {
                            const copy = [...resume.extracurriculars];
                            copy[idx].role = e.target.value;
                            setResume((prev) => ({ ...prev, extracurriculars: copy }));
                          }}
                          placeholder="Leadership Role"
                          className="font-bold text-xs bg-transparent text-white focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => {
                            setResume((prev) => ({
                              ...prev,
                              extracurriculars: prev.extracurriculars.filter((item) => item.id !== ex.id),
                            }));
                          }}
                          className="text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <textarea
                        value={ex.description}
                        onChange={(e) => {
                          const copy = [...resume.extracurriculars];
                          copy[idx].description = e.target.value;
                          setResume((prev) => ({ ...prev, extracurriculars: copy }));
                        }}
                        rows={2}
                        placeholder="Description of community leadership or initiatives"
                        className="w-full p-2 rounded bg-[#111827] text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step Next / Back Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                disabled={activeStep <= 1}
                onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs disabled:opacity-40 transition-colors"
              >
                Previous Step
              </button>

              <span className="text-xs text-slate-400">Step {activeStep} of 9</span>

              <button
                disabled={activeStep >= 9}
                onClick={() => setActiveStep((s) => Math.min(9, s + 1))}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Side: Live Resume Real-Time Preview (7 cols) */}
        <div className={`lg:col-span-7 space-y-3 ${mobileTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
          
          {/* Zoom and Preview Toolbar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">Live Real-Time Preview</span>
              <span className="text-[10px] text-slate-400 font-mono">
                Standard A4 &bull; {TEMPLATES.find((t) => t.id === resume.templateId)?.name}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-[#111827] px-2 py-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setScale((s) => Math.max(0.6, s - 0.05))}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 w-10 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(1.1, s + 0.05))}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setScale(0.85)}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Reset Fit"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sheet Canvas Container */}
          <div className="glass-panel p-2 rounded-2xl overflow-hidden min-h-[750px] flex justify-center bg-[#070B14] border border-white/10 shadow-inner">
            <ResumePreview data={resume} scale={scale} />
          </div>

        </div>

      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        targetRole={resume.targetRole || resume.personalInfo.jobTitle}
        initialMode={aiModalMode}
        onApplyResult={handleApplyAI}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        resumeData={resume}
        onRestoreVersion={(restored) => setResume(restored)}
      />

    </div>
  );
};
