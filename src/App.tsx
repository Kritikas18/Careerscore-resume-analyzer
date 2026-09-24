import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { ResumeAnalyzer } from './components/analyzer/ResumeAnalyzer';
import { ResumeBuilder } from './components/builder/ResumeBuilder';
import { TemplatesGallery } from './components/templates/TemplatesGallery';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { AuthModal } from './components/auth/AuthModal';
import { ResumeData, AnalysisResult, TemplateId, UserProfile } from './types/resume';
import {
  initializeStorage,
  getResumes,
  deleteResume,
  getSavedReports,
  getUserProfile,
  saveUserProfile
} from './services/storageService';
import { sampleResumes } from './data/sampleResumes';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [reports, setReports] = useState<AnalysisResult[]>([]);
  const [user, setUser] = useState<UserProfile>(getUserProfile());
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Active targets
  const [activeResumeForAnalyzer, setActiveResumeForAnalyzer] = useState<ResumeData | undefined>(undefined);
  const [activeResumeForBuilder, setActiveResumeForBuilder] = useState<ResumeData | undefined>(undefined);

  // Initialize storage once
  useEffect(() => {
    initializeStorage();
    const loadedResumes = getResumes();
    const profile = getUserProfile();
    const normalizedProfile = profile.name === 'Alex Rivera' || profile.name === 'Alex'
      ? { ...profile, name: 'Kritika Singh', email: 'kritika.singh@example.com' }
      : profile;

    saveUserProfile(normalizedProfile);
    setResumes(loadedResumes);
    const loadedReports = getSavedReports();
    setReports(loadedReports);
    setUser(normalizedProfile);
  }, []);

  const refreshData = () => {
    setResumes(getResumes());
    setReports(getSavedReports());
  };

  const handleOpenAnalyzer = (initialData?: ResumeData) => {
    setActiveResumeForAnalyzer(initialData);
    setCurrentView('analyzer');
  };

  const handleOpenBuilder = (initialData?: ResumeData) => {
    setActiveResumeForBuilder(initialData || sampleResumes[0]);
    setCurrentView('builder');
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    const base = sampleResumes[0];
    const modified: ResumeData = {
      ...base,
      id: 'res-' + Date.now(),
      templateId,
      updatedAt: new Date().toISOString(),
    };
    setActiveResumeForBuilder(modified);
    setCurrentView('builder');
  };

  const handleDeleteResume = (id: string) => {
    deleteResume(id);
    refreshData();
  };

  const isLanding = currentView === 'landing';

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 flex flex-col font-sans antialiased selection:bg-slate-300 selection:text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar (shown on all views except full landing hero if desired, or always accessible) */}
        {!isLanding && (
          <Sidebar
            currentView={currentView}
            onNavigate={(view) => {
              if (view === 'profile') {
                setAuthModalOpen(true);
              } else {
                setCurrentView(view);
              }
            }}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            savedResumesCount={resumes.length}
            reportsCount={reports.length}
          />
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 transition-all duration-300 min-w-0 bg-[#f4f7fb] ${
            !isLanding ? (sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64') : ''
          }`}
        >
          {currentView === 'landing' && (
            <LandingPage
              onAnalyzeResume={(initial) => handleOpenAnalyzer(initial)}
              onCreateResume={(initial) => handleOpenBuilder(initial)}
              onExploreTemplates={() => setCurrentView('templates')}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              resumes={resumes}
              reports={reports}
              onOpenBuilder={handleOpenBuilder}
              onOpenAnalyzer={handleOpenAnalyzer}
              onSelectTemplate={() => setCurrentView('templates')}
              onDeleteResume={handleDeleteResume}
            />
          )}

          {currentView === 'analyzer' && (
            <ResumeAnalyzer
              initialResume={activeResumeForAnalyzer}
              onOpenInBuilder={(data) => handleOpenBuilder(data)}
              onSaveReportNotification={refreshData}
              onBackToLanding={() => setCurrentView('landing')}
            />
          )}

          {currentView === 'builder' && (
            <ResumeBuilder
              initialData={activeResumeForBuilder}
              onNavigateToAnalyzer={(res) => handleOpenAnalyzer(res)}
            />
          )}

          {currentView === 'templates' && (
            <TemplatesGallery onSelectTemplate={handleSelectTemplate} />
          )}

          {currentView === 'reports' && (
            <ReportsView
              reports={reports}
              onOpenAnalyzer={handleOpenAnalyzer}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              user={user}
              onUpdateUser={(updated) => {
                setUser(updated);
                saveUserProfile(updated);
              }}
            />
          )}
        </main>
      </div>

      {/* Account & Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        onUserChange={(updated) => setUser(updated)}
      />

    </div>
  );
}
