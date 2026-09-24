import React, { useState } from 'react';
import {
  FileSpreadsheet,
  SearchCode,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AnalysisResult, ResumeData } from '../../types/resume';
import { sampleResumes } from '../../data/sampleResumes';

interface ReportsViewProps {
  reports: AnalysisResult[];
  onOpenAnalyzer: (initialData?: ResumeData) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ reports, onOpenAnalyzer }) => {
  const [selectedReport, setSelectedReport] = useState<AnalysisResult | null>(reports[0] || null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7dcff] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edfdf4] text-[#2d7c5a] border border-[#cfeedd] text-xs font-semibold mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Audit History & Benchmark Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#201a2d] tracking-tight">
            Saved Analysis Reports
          </h1>
          <p className="text-sm text-[#5c526d] mt-1">
            Review past resume evaluations, track score improvements over time, and compare role benchmarks.
          </p>
        </div>

        <button
          onClick={() => onOpenAnalyzer()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] hover:brightness-105 text-white font-semibold text-xs shadow-md shadow-violet-200/80 flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <SearchCode className="w-4 h-4" />
          <span>New Resume Scan</span>
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl max-w-lg mx-auto space-y-4 border border-[#e7dcff] bg-[#f9f5ff]/90">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#f3edff] text-[#6d5bd8] flex items-center justify-center">
            <SearchCode className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#201a2d]">No Reports Generated Yet</h3>
          <p className="text-xs text-[#5c526d]">
            Upload or paste a resume in the Resume Checker to generate your first ATS structure and score review.
          </p>
          <button
            onClick={() => onOpenAnalyzer()}
            className="px-4 py-2 rounded-xl bg-[#7c6ad9] text-white text-xs font-semibold"
          >
            Open Resume Checker
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Reports Table / List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider block">
              Historical Audits ({reports.length})
            </span>

            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`glass-panel p-4 rounded-xl transition-all cursor-pointer border ${
                  selectedReport?.id === report.id
                    ? 'border-[#bcaef7] bg-[#f3edff] shadow-lg'
                    : 'border-[#e8dcff] bg-white/90 hover:border-[#cfc0ff]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#201a2d] truncate max-w-[200px]">
                    {report.targetRole}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold text-[#1d8d5b] px-2 py-0.5 rounded bg-[#eafaf1] border border-[#cfeedd]">
                      {report.overallScore}/100
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f0ebff] text-[#5d4ab2] border border-[#e1d6ff]">
                      {report.scoreGrade}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#6a5f80]">
                  <span>Candidate: {report.candidateName}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Report Detailed View (7 cols) */}
          <div className="lg:col-span-7">
            {selectedReport ? (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border border-[#e8dcff] bg-[#f9f5ff]/90">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7dcff] pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#5d4ab2] uppercase tracking-widest block mb-1">
                      Audit Report Details
                    </span>
                    <h2 className="text-xl font-bold text-[#201a2d]">{selectedReport.targetRole}</h2>
                    <p className="text-xs text-[#5c526d]">
                      Evaluated for <strong>{selectedReport.candidateName}</strong> on {new Date(selectedReport.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center p-3 rounded-xl bg-white border border-[#e7dcff]">
                      <div className="text-2xl font-extrabold text-[#201a2d]">{selectedReport.overallScore}</div>
                      <div className="text-[10px] text-[#6a5f80] uppercase font-semibold">CareerScore</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white border border-[#e7dcff]">
                      <div className="text-2xl font-extrabold text-[#1d8d5b]">{selectedReport.atsScore}%</div>
                      <div className="text-[10px] text-[#6a5f80] uppercase font-semibold">ATS Match</div>
                    </div>
                  </div>
                </div>

                {/* Recruiter Impression */}
                <div className="p-4 rounded-xl bg-[#f4efff] border border-[#e5dcff] space-y-1.5">
                  <h3 className="text-xs font-semibold text-[#5d4ab2] uppercase tracking-wider">
                    Recruiter Assessment Verdict
                  </h3>
                  <p className="text-xs text-[#3f385a] leading-relaxed italic">
                    "{selectedReport.recruiterReview.overallImpression}"
                  </p>
                </div>

                {/* Strengths & Weaknesses quick summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#ebfaf3] border border-[#cfeedd] space-y-2">
                    <h4 className="text-xs font-bold text-[#1d8d5b] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Top Strengths ({selectedReport.strengths.length})</span>
                    </h4>
                    <ul className="text-xs text-[#3d3b4f] space-y-1 list-disc ml-4">
                      {selectedReport.strengths.slice(0, 3).map((s, i) => (
                        <li key={i}>{s.title}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#fff1f3] border border-[#fccfe1] space-y-2">
                    <h4 className="text-xs font-bold text-[#c43a5d] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Issues to Address ({selectedReport.issues.length})</span>
                    </h4>
                    <ul className="text-xs text-[#3d3b4f] space-y-1 list-disc ml-4">
                      {selectedReport.issues.slice(0, 3).map((iss, i) => (
                        <li key={i}>{iss.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Suggested Roles */}
                <div>
                  <h4 className="text-xs font-semibold text-[#5f5675] uppercase tracking-wider mb-2">
                    Top Role Alignment:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.suggestedRoles.slice(0, 3).map((r, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#e7dcff] text-xs text-[#2d2547]"
                      >
                        {r.title} &bull; <strong className="text-[#1d8d5b]">{r.matchPercentage}%</strong>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="glass-panel p-8 text-center text-[#5c526d] text-xs rounded-2xl border border-[#e7dcff] bg-[#f9f5ff]/90">
                Select a report from the left to view deep insights.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
