import React, { useState } from 'react';
import {
  History,
  X,
  RotateCcw,
  CheckCircle2,
  Clock,
  Plus,
  GitBranch,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ResumeData, ResumeVersion } from '../../types/resume';
import { getResumeVersions, saveResumeVersion } from '../../services/storageService';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onRestoreVersion: (versionData: ResumeData) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onRestoreVersion,
}) => {
  const [versions, setVersions] = useState<ResumeVersion[]>(() => getResumeVersions(resumeData.id));
  const [newVersionNote, setNewVersionNote] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCreateSnapshot = () => {
    if (!newVersionNote.trim()) return;
    setIsSaving(true);
    const newVer = saveResumeVersion(resumeData, newVersionNote.trim());
    setVersions(getResumeVersions(resumeData.id));
    setNewVersionNote('');
    setIsSaving(false);
  };

  const handleRestore = (ver: ResumeVersion) => {
    onRestoreVersion(ver.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#111827] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1020]/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Version History & Cloud Snapshots</h3>
              <p className="text-xs text-slate-400">Restore previous drafts, rollback changes, or fork for job roles.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Create Snapshot Input Bar */}
        <div className="p-4 bg-[#0B1020]/40 border-b border-white/10 flex items-center gap-3">
          <input
            type="text"
            value={newVersionNote}
            onChange={(e) => setNewVersionNote(e.target.value)}
            placeholder="e.g. Added Stripe & Docker experience, targeted for Google..."
            className="flex-1 px-3 py-2 rounded-lg bg-[#111827] border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleCreateSnapshot}
            disabled={!newVersionNote.trim() || isSaving}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Snapshot</span>
          </button>
        </div>

        {/* Versions List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {versions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No previous versions saved yet. Create a snapshot above to bookmark your progress!
            </div>
          ) : (
            versions.map((ver, idx) => (
              <div
                key={ver.id}
                className="p-4 rounded-xl bg-[#0B1020]/70 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{ver.versionName}</span>
                    {idx === 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        Latest
                      </span>
                    )}
                    {ver.score && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-mono">
                        ATS {ver.score}%
                      </span>
                    )}
                  </div>
                  {ver.notes && <p className="text-xs text-slate-300 italic">{ver.notes}</p>}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(ver.timestamp).toLocaleString()}</span>
                    <span>&bull;</span>
                    <span>Template: {ver.data.templateId.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleRestore(ver)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0B1020]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
