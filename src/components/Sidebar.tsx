import React from 'react';
import {
  LayoutDashboard,
  SearchCode,
  FileEdit,
  LayoutTemplate,
  FileSpreadsheet,
  Settings,
  User,
  History,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  savedResumesCount: number;
  reportsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  savedResumesCount,
  reportsCount,
}) => {
  const navItems: Array<{
    id: string;
    label: string;
    icon: typeof LayoutDashboard;
    badge?: string;
    badgeColor?: string;
  }> = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      id: 'analyzer',
      label: 'Resume Checker',
      icon: SearchCode,
      badge: undefined,
    },
    {
      id: 'builder',
      label: 'Resume Builder',
      icon: FileEdit,
      badge: savedResumesCount > 0 ? String(savedResumesCount) : undefined,
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: LayoutTemplate,
      badge: '5 Modern',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileSpreadsheet,
      badge: reportsCount > 0 ? String(reportsCount) : undefined,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-30 bg-[#f6f1ff]/95 border-r border-[#e5dcff] backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Navigation Items */}
      <div className="p-3 space-y-1">
        <div className="flex items-center justify-between px-2 mb-2">
          {!collapsed && (
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Workspace
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1 rounded-lg text-[#5b4d7c] hover:text-[#2a2542] hover:bg-[#ece4ff] transition-colors mx-auto"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#7c6ad9] to-[#5ab788] text-white shadow-lg shadow-violet-200/80'
                  : 'text-[#514a63] hover:text-[#2a2542] hover:bg-[#ece4ff]'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-[#665f7d] group-hover:text-[#6d5bd8]'
                }`}
              />

              {!collapsed && (
                <div className="flex items-center justify-between w-full min-w-0">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full border font-mono font-medium ${
                        item.badgeColor || (isActive ? 'bg-white/20 text-white border-white/30' : 'bg-[#ece4ff] text-[#5d4d8a] border-[#d9ccff]')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Active edge highlight */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Pro / Version Status Card */}
      {!collapsed ? (
        <div className="p-3 m-3 rounded-xl bg-gradient-to-b from-[#f4eeff] to-[#edfdf4] border border-[#dcd3ff] text-xs shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-md bg-[#dff8eb] text-[#2a9d68]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-[#2a2542]">Cloud Sync Active</p>
              <p className="text-[10px] text-[#5d4d8a]">Version History Enabled</p>
            </div>
          </div>
          <p className="text-[11px] text-[#584d73] leading-relaxed mb-3">
            Real-time ATS parsing and automatic snapshot backups for every edit.
          </p>
          <button
            onClick={() => onNavigate('analyzer')}
            className="w-full py-1.5 rounded-lg bg-gradient-to-r from-[#7c6ad9] to-[#4bb77a] hover:brightness-105 border border-[#cfc0ff] text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test ATS Compatibility</span>
          </button>
        </div>
      ) : (
        <div className="p-2 mb-3 flex justify-center">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400" title="Cloud Sync Active">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      )}
    </aside>
  );
};
