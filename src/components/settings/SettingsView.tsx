import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, HardDrive, Bell, CheckCircle2, RefreshCw } from 'lucide-react';
import { UserProfile } from '../../types/resume';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [atsStrictness, setAtsStrictness] = useState<string>('balanced');
  const [targetIndustry, setTargetIndustry] = useState<string>('tech');
  const [paperFormat, setPaperFormat] = useState<string>('a4');
  const [autoSaveSnapshots, setAutoSaveSnapshots] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearCache = () => {
    if (confirm('Clear local resume cache and reload defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#e7dcff] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edfdf4] text-[#2d7c5a] border border-[#cfeedd] text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#201a2d] tracking-tight">
          Application Settings
        </h1>
        <p className="text-sm text-[#5c526d] mt-1">
          Configure ATS algorithm calibration, document layout targets, and cloud synchronization.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* ATS Calibration */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-[#e7dcff] bg-[#f9f5ff]/90">
          <h2 className="text-sm font-bold text-[#201a2d] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1d8d5b]" />
            <span>ATS Engine Rigor Calibration</span>
          </h2>
          <p className="text-xs text-[#5c526d]">
            Select the enterprise screening engine model against which your resume is scored.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'conservative', label: 'Conservative (Strict)', desc: 'Flags any multi-column layout, demanding strict chronologic flow.' },
              { id: 'balanced', label: 'Balanced (Standard)', desc: 'Workday & Greenhouse standard, balanced keyword weighting.' },
              { id: 'modern', label: 'Modern Tech (Flexible)', desc: 'Lever & Ashby style, emphasizes GitHub, projects, and impact.' },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setAtsStrictness(opt.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  atsStrictness === opt.id
                    ? 'border-[#bcaef7] bg-[#f3edff] text-[#201a2d]'
                    : 'border-[#e8dcff] bg-white text-[#5c526d] hover:border-[#d9ccff]'
                }`}
              >
                <div className="font-semibold text-xs mb-1 text-[#201a2d]">{opt.label}</div>
                <div className="text-[11px] leading-relaxed text-[#5c526d]">{opt.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Industry & Document Standard */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-[#e7dcff] bg-[#f9f5ff]/90">
          <h2 className="text-sm font-bold text-[#201a2d] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#5d4ab2]" />
            <span>Target Industry & Paper Format</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#4c4563] block mb-1.5 font-medium">Primary Industry</label>
              <select
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
              >
                <option value="tech">Software, Cloud & AI Engineering</option>
                <option value="product">Product Management & Design</option>
                <option value="data">Data Science & Business Intelligence</option>
                <option value="finance">Finance, Banking & Fintech</option>
                <option value="consulting">Management Consulting & Strategy</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#4c4563] block mb-1.5 font-medium">Export Page Format</label>
              <select
                value={paperFormat}
                onChange={(e) => setPaperFormat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#e1d6ff] text-[#2d2547] text-xs focus:outline-none focus:border-[#7c6ad9]"
              >
                <option value="a4">Standard A4 (International Standard)</option>
                <option value="letter">US Letter (8.5 x 11 inches)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cloud Sync & Version Snapshotting */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 border border-[#e7dcff] bg-[#f9f5ff]/90">
          <h2 className="text-sm font-bold text-[#201a2d] flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#7a5ae7]" />
            <span>Cloud Storage & Version Histories</span>
          </h2>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#e7dcff]">
            <div>
              <p className="text-xs font-semibold text-[#201a2d]">Automatic Version History Snapshots</p>
              <p className="text-[11px] text-[#5c526d]">Save a timestamped backup copy on every major resume edit.</p>
            </div>
            <input
              type="checkbox"
              checked={autoSaveSnapshots}
              onChange={(e) => setAutoSaveSnapshots(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleClearCache}
              className="text-xs text-rose-500 hover:text-rose-600 underline cursor-pointer"
            >
              Clear Local Storage Cache & Reset
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7c6ad9] to-[#46b67b] hover:brightness-105 text-white font-semibold text-xs shadow-md shadow-violet-200/80 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Preferences Saved!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
