import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Check,
  RefreshCw,
  Copy,
  Zap,
  Target,
  Flame,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { requestAIAssist } from '../../services/geminiService';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRole: string;
  onApplyResult: (text: string | string[], mode: string) => void;
  initialMode?: 'summary' | 'bullet' | 'skills' | 'rewrite' | 'keywords';
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  targetRole,
  onApplyResult,
  initialMode = 'summary',
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'bullet' | 'skills' | 'rewrite' | 'keywords'>(initialMode);
  const [contextInput, setContextInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<string[] | string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setResults(null);

    const actionMap: Record<string, any> = {
      summary: 'summary',
      bullet: 'enhance-bullet',
      skills: 'skills',
      rewrite: 'rewrite',
      keywords: 'ats-keywords',
    };

    const resp = await requestAIAssist({
      action: actionMap[activeTab],
      role: targetRole || 'Software Engineer',
      context: contextInput,
      skills: ['React', 'TypeScript', 'Node.js', 'System Architecture'],
    });

    setIsLoading(false);
    if (resp.success) {
      setResults(resp.result);
      if (Array.isArray(resp.result) && resp.result.length > 0) {
        setSelectedResult(resp.result[0]);
      } else if (typeof resp.result === 'string') {
        setSelectedResult(resp.result);
      }
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApply = (text: string) => {
    onApplyResult(text, activeTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#111827] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1020]/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Writing Helper</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {targetRole || 'Software Engineer'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">Get wording ideas, skill matches, and clearer bullet phrasing.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-white/10 overflow-x-auto">
          {[
            { id: 'summary', label: 'Summary Help' },
            { id: 'bullet', label: 'Bullet Ideas' },
            { id: 'skills', label: 'Skill Match' },
            { id: 'rewrite', label: 'Sentence Rewrite' },
            { id: 'keywords', label: 'Keyword Match' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setResults(null);
                setContextInput('');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-b-2 border-indigo-500 text-indigo-300 bg-white/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'summary' && (
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                Additional context or key specialties to highlight (Optional):
              </label>
              <textarea
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
                placeholder="e.g. 5 years building React SaaS, reduced latency by 40%, experience leading 4 engineers..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === 'bullet' && (
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                Draft a bullet point to strengthen with clearer impact wording:
              </label>
              <textarea
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
                placeholder="e.g. Built frontend features for users and fixed slow page load..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="text-xs text-slate-300">
              Click generate to receive the top 10 most indexed skills for <strong>{targetRole}</strong> in 2025 ATS filters.
            </div>
          )}

          {activeTab === 'rewrite' && (
            <div>
              <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                Paste any sentence or paragraph to polish:
              </label>
              <textarea
                value={contextInput}
                onChange={(e) => setContextInput(e.target.value)}
                placeholder="e.g. I was in charge of managing the company database and testing code..."
                rows={3}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {activeTab === 'keywords' && (
            <div className="text-xs text-slate-300">
              Review the keywords most often checked for {targetRole} roles and improve relevance.
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating suggestions...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>

          {/* Results Display */}
          {results && (
            <div className="mt-4 space-y-3 pt-3 border-t border-white/10">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Generated Options:
              </span>

              {Array.isArray(results) ? (
                <div className="space-y-2">
                  {results.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedResult(item)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs ${
                        selectedResult === item
                          ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
                          : 'bg-[#0B1020]/60 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="leading-relaxed flex-1">{item}</p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(item, idx);
                            }}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                            title="Copy to clipboard"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApply(item);
                            }}
                            className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px]"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 text-xs text-white">
                  <p className="leading-relaxed">{results}</p>
                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => handleCopy(results, 0)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs flex items-center gap-1"
                    >
                      {copiedIndex === 0 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => handleApply(results)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <span>Insert into Resume</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0B1020]/40 flex items-center justify-between text-xs text-slate-400">
          <span>Engineered with Google XYZ formula & ATS optimization</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
