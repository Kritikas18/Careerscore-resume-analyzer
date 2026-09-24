import React, { useState } from 'react';
import {
  User,
  X,
  Mail,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  LogOut,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../../types/resume';
import { saveUserProfile } from '../../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUserChange: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [targetRole, setTargetRole] = useState<string>(user.targetRole);
  const [syncStatus, setSyncStatus] = useState<string>('Online');

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...user,
      name,
      email,
      targetRole,
    };
    onUserChange(updated);
    saveUserProfile(updated);
    setIsEditing(false);
  };

  const handleSimulateGoogleLogin = () => {
    const updated: UserProfile = {
      ...user,
      name: 'Kritika Singh',
      email: 'kritika.singh@example.com',
      membershipPlan: 'Pro',
    };
    onUserChange(updated);
    saveUserProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#111827] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B1020]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-[1.5px]">
              <div className="w-full h-full bg-[#111827] rounded-[10px] flex items-center justify-center text-white">
                <User className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Account & Cloud Storage</h3>
              <p className="text-[11px] text-slate-400">Authenticated Session & Version Control</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          
          {/* User Profile Card */}
          <div className="p-4 rounded-xl bg-[#0B1020]/80 border border-white/10 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-base font-bold text-white flex-shrink-0 shadow-md">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {user.membershipPlan}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
              <p className="text-[11px] text-indigo-300 font-medium mt-0.5">{user.targetRole}</p>
            </div>
          </div>

          {/* Cloud Storage & Backup Indicator */}
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cloud Storage Status</span>
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Synchronized</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every resume snapshot and ATS audit report is encrypted and backed up automatically to maintain complete version lineage.
            </p>
          </div>

          {/* Form edit fields */}
          {isEditing ? (
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/10 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#0B1020] border border-white/10 text-white text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-xs font-semibold text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <button
                onClick={() => setIsEditing(true)}
                className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                Edit Account Details
              </button>
              <button
                onClick={handleSimulateGoogleLogin}
                className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Switch Account</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0B1020]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
