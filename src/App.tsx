/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RouteId, UserProgress, Scenario, DecisionType } from './types';
import {
  INITIAL_SCENARIOS,
  INITIAL_USER_PROGRESS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './views/DashboardView';
import { SafetySimulatorView } from './views/SafetySimulatorView';
import { ScamDetectorView } from './views/ScamDetectorView';
import { InvestmentRiskView } from './views/InvestmentRiskView';
import { LoanEmiSimulatorView } from './views/LoanEmiSimulatorView';
import { BudgetSimulatorView } from './views/BudgetSimulatorView';
import { GamifiedProgressView } from './views/GamifiedProgressView';
import { PrivacyArchitectureView } from './views/PrivacyArchitectureView';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scen-01');

  // Harmless local session progress persistence
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('finsafe_progress_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Local storage disabled or private mode
    }
    return INITIAL_USER_PROGRESS;
  });

  const scenarios = INITIAL_SCENARIOS;

  // Sync route with URL hash for browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validRoutes: RouteId[] = [
        'dashboard',
        'simulator',
        'scam-detector',
        'investments',
        'loans',
        'budget',
        'progress',
        'privacy',
      ];
      if (validRoutes.includes(hash as RouteId)) {
        setCurrentRoute(hash as RouteId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const mainScrollRef = React.useRef<HTMLDivElement>(null);

  const navigateTo = (route: RouteId) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route === 'dashboard' ? '' : route}`;
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    navigateTo('simulator');
  };

  // Answer scenario handler
  const handleAnswerScenario = (scenarioId: string, decision: DecisionType, isCorrect: boolean) => {
    setUserProgress(prev => {
      const newScore = isCorrect ? Math.min(100, prev.safetyScore + 3) : Math.max(40, prev.safetyScore - 2);
      const totalAnswered = prev.totalAnswered + 1;
      const totalCorrect = prev.totalCorrect + (isCorrect ? 1 : 0);
      const quizAccuracy = Math.round((totalCorrect / totalAnswered) * 100);
      const completedScenarios = prev.completedScenarios.includes(scenarioId)
        ? prev.completedScenarios
        : [...prev.completedScenarios, scenarioId];

      const scenario = scenarios.find(s => s.id === scenarioId);
      const title = scenario ? `Scenario: ${scenario.sender}` : 'Simulation Test';

      const newLog = [
        {
          id: `act-${Date.now()}`,
          title,
          category: scenario?.category || 'General',
          timestamp: 'Just now',
          scoreChange: isCorrect ? +10 : -5,
          passed: isCorrect,
        },
        ...prev.activityLog.slice(0, 5),
      ];

      const updated: UserProgress = {
        ...prev,
        safetyScore: newScore,
        totalAnswered,
        totalCorrect,
        quizAccuracy,
        completedScenarios,
        activityLog: newLog,
      };

      try {
        localStorage.setItem('finsafe_progress_v1', JSON.stringify(updated));
      } catch (e) {}

      return updated;
    });
  };

  const handleScoreGain = (points: number) => {
    setUserProgress(prev => {
      const newScore = Math.min(100, prev.safetyScore + Math.round(points / 5));
      const updated = { ...prev, safetyScore: newScore };
      try {
        localStorage.setItem('finsafe_progress_v1', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleResetProgress = () => {
    setUserProgress(INITIAL_USER_PROGRESS);
    try {
      localStorage.removeItem('finsafe_progress_v1');
    } catch (e) {}
  };

  // Search matches
  const searchResults = searchQuery.trim()
    ? scenarios
        .filter(
          s =>
            s.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(s => ({
          type: 'Scenario' as const,
          id: s.id,
          title: s.sender,
          snippet: s.message,
          category: s.category,
          action: () => {
            handleSelectScenario(s.id);
            setSearchQuery('');
          },
        }))
    : [];

  return (
    <div className="relative h-screen w-screen bg-[#FFF8E8] text-[#050505] flex overflow-hidden selection:bg-[#FFF36A]">
      {/* Huge Diagonal Pastel Bands behind the interface */}
      <div className="poster-diagonal-stripes" aria-hidden="true" />

      {/* Left Navigation (Stays fixed throughout the entire presentation) */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        userProgress={userProgress}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Canvas Area - Only the right side scrolls */}
      <div
        ref={mainScrollRef}
        className="flex-1 flex flex-col min-w-0 z-10 relative h-screen overflow-y-auto overflow-x-hidden"
      >
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          unreadCount={2}
        />

        {/* Global Search Results Dropdown Overlay */}
        {searchQuery.trim() && (
          <div className="sticky top-[65px] z-30 mx-4 md:mx-8 my-2 border-[3.5px] border-[#050505] bg-[#FFF8E8] p-4 shadow-[8px_8px_0px_#050505] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#050505]">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-[#050505] flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#050505]" />
                Search Matches ({searchResults.length})
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="font-mono text-xs font-bold px-2 py-0.5 border border-[#050505] bg-white hover:bg-black hover:text-white"
              >
                Close Search
              </button>
            </div>

            {searchResults.length === 0 ? (
              <p className="font-mono text-xs text-[#050505]/70 py-2">
                No matching scenarios found for "{searchQuery}". Try searching "QR", "hostel", "scholarship", or "loan".
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={res.action}
                    className="p-2.5 border-2 border-[#050505] bg-white shadow-[2px_2px_0px_#050505] hover:bg-[#FFF36A] cursor-pointer transition-all flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-mono text-[10px] font-bold text-[#050505]/70 uppercase">
                        [{res.type}] · {res.category}
                      </div>
                      <div className="font-heading font-black text-sm text-[#050505] truncate">
                        {res.title}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#050505]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Body Canvas */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {currentRoute === 'dashboard' && (
            <DashboardView
              onNavigate={navigateTo}
              userProgress={userProgress}
              onSelectScenario={handleSelectScenario}
            />
          )}

          {currentRoute === 'simulator' && (
            <SafetySimulatorView
              scenarios={scenarios}
              selectedScenarioId={selectedScenarioId}
              onAnswerScenario={handleAnswerScenario}
            />
          )}

          {currentRoute === 'scam-detector' && (
            <ScamDetectorView
              onAnalysisComplete={() => {
                handleScoreGain(10);
              }}
            />
          )}

          {currentRoute === 'investments' && (
            <InvestmentRiskView onScoreGain={handleScoreGain} />
          )}

          {currentRoute === 'loans' && <LoanEmiSimulatorView />}

          {currentRoute === 'budget' && <BudgetSimulatorView />}

          {currentRoute === 'progress' && (
            <GamifiedProgressView
              userProgress={userProgress}
              onResetProgress={handleResetProgress}
            />
          )}

          {currentRoute === 'privacy' && <PrivacyArchitectureView />}
        </main>

        {/* Brutalist Physical Poster Footer */}
        <footer className="mt-auto border-t-[4px] border-[#050505] bg-[#FFF8E8] px-4 md:px-8 py-6 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="font-heading font-black text-lg text-[#050505]">
                FINSAFE CAMPUS
              </div>
              <span className="font-mono text-xs font-bold text-[#050505]/70">
                · Educational Sandbox v1.0 ·
              </span>
            </div>

            <div className="font-mono text-xs font-bold text-[#050505] text-center md:text-right">
              <span className="bg-[#91E2B9] px-2 py-0.5 border border-[#050505] mr-2 inline-block">
                Zero Financial Credentials Ingested
              </span>
              <span>All Scenarios Purely Synthetic</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
