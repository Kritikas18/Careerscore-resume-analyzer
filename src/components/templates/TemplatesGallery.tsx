import React from 'react';
import { LayoutTemplate, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { TemplateId, ResumeData } from '../../types/resume';
import { sampleResumes } from '../../data/sampleResumes';

interface TemplatesGalleryProps {
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({ onSelectTemplate }) => {
  const templates: Array<{
    id: TemplateId;
    title: string;
    subtitle: string;
    description: string;
    atsRating: string;
    bestFor: string;
    features: string[];
    accent: string;
  }> = [
    {
      id: 'modern',
      title: 'Modern Professional',
      subtitle: 'Contemporary tech & product design',
      description: 'Clean accent borders, balanced whitespace, and prominent skill tagging. Ideal for software engineers, product managers, and modern tech roles.',
      atsRating: '96% ATS Compatibility',
      bestFor: 'Software Engineers, Tech Leads, PMs',
      features: ['Accent border headers', 'Modular skills grouping', 'Quantified project blocks', 'High visual contrast'],
      accent: 'border-indigo-500/40 from-indigo-950/20',
    },
    {
      id: 'ats',
      title: 'ATS-Friendly (Single Column)',
      subtitle: 'Maximum algorithmic parsability',
      description: 'Engineered specifically to bypass archaic applicant tracking filters with 100% plain text flow, zero two-column layouts, and strict semantic ordering.',
      atsRating: '100% Guaranteed Parsable',
      bestFor: 'Fortune 500, Government, Enterprise Applications',
      features: ['Monochrome clean layout', 'Zero column collisions', 'Standard Workday headers', 'Strict chronologic flow'],
      accent: 'border-emerald-500/40 from-emerald-950/20',
    },
    {
      id: 'corporate',
      title: 'Corporate Executive',
      subtitle: 'Distinguished serif typography',
      description: 'Formal, sophisticated, and polished design with executive typography. Tailored for leadership, finance, consulting, and senior business managers.',
      atsRating: '95% ATS Compatibility',
      bestFor: 'Executives, Directors, Finance, Consulting',
      features: ['Classic serif header styling', 'Formal date dividers', 'Executive summary prominence', 'Conservative structure'],
      accent: 'border-blue-500/40 from-blue-950/20',
    },
    {
      id: 'minimal',
      title: 'Minimal Swiss',
      subtitle: 'Subtle elegance & typography forward',
      description: 'Inspired by modern Scandinavian and Swiss typography principles. Eliminates visual clutter to let your achievements and pedigree speak for themselves.',
      atsRating: '97% ATS Compatibility',
      bestFor: 'Design Engineers, Architects, Researchers',
      features: ['Understated hairline borders', 'High-density information layout', 'Crisp sans-serif text', 'Airy breathing room'],
      accent: 'border-purple-500/40 from-purple-950/20',
    },
    {
      id: 'student',
      title: 'Student & Early Career',
      subtitle: 'Academic honors & project forward',
      description: 'Prioritizes university degrees, coursework, hackathons, and personal projects above sparse employment history to highlight raw potential.',
      atsRating: '98% ATS Compatibility',
      bestFor: 'College Students, New Grads, Career Switchers',
      features: ['Education & GPA highlight', 'Prominent projects showcase', 'Extracurricular & leadership section', 'Skills forward'],
      accent: 'border-teal-500/40 from-teal-950/20',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edfdf4] text-[#2d7c5a] border border-[#cfeedd] text-xs font-semibold">
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Curated Templates</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#201a2d] tracking-tight">
          Recruiter-Tested Resume Templates
        </h1>
        <p className="text-sm text-[#5c526d]">
          Every template is crafted to pass applicant tracking systems while creating an unforgettable first impression in a 6-second recruiter glance.
        </p>
      </div>

      {/* Grid of 5 Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className={`glass-panel p-6 rounded-2xl border transition-all flex flex-col justify-between hover:scale-[1.02] bg-gradient-to-b ${tmpl.accent} border-[#e7dcff]`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f4efff] text-[#5d4ab2] border border-[#e2d8ff]">
                  {tmpl.atsRating}
                </span>
                <span className="text-xs text-[#6a5f80]">A4 Standard</span>
              </div>

              <h2 className="text-lg font-bold text-[#201a2d] mb-1">{tmpl.title}</h2>
              <p className="text-xs text-[#5d4ab2] font-medium mb-3">{tmpl.subtitle}</p>
              <p className="text-xs text-[#4d4764] leading-relaxed mb-4">{tmpl.description}</p>

              <div className="pt-3 border-t border-[#e7dcff] mb-4">
                <span className="text-[11px] font-semibold text-[#5f5675] uppercase tracking-wider block mb-2">
                  Best Suited For:
                </span>
                <p className="text-xs text-[#2d2547] font-medium">{tmpl.bestFor}</p>
              </div>

              <div className="space-y-1.5 mb-6">
                {tmpl.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#3f385a]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1d8d5b] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectTemplate(tmpl.id)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] hover:brightness-105 text-white font-semibold text-xs shadow-md shadow-violet-200/80 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Use This Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
