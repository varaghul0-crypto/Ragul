import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  SearchCode,
  TrendingUp,
  Calculator,
  PieChart,
  Trophy,
  BarChart2,
  LockKeyhole,
  Flame,
  ShieldCheck,
  X,
} from 'lucide-react';
import { RouteId, UserProgress } from '../types';

interface SidebarProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  userProgress: UserProgress;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onNavigate,
  userProgress,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems: { id: RouteId; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'simulator', label: 'Safety Simulator', icon: <ShieldAlert className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'scam-detector', label: 'Scam Detector', icon: <SearchCode className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'investments', label: 'Investment Risks', icon: <TrendingUp className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'loans', label: 'Loan & EMI', icon: <Calculator className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'budget', label: 'Budget Simulator', icon: <PieChart className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'progress', label: 'Resilience Score', icon: <BarChart2 className="w-5 h-5 stroke-[2.5]" /> },
    { id: 'privacy', label: 'Privacy Mode', icon: <LockKeyhole className="w-5 h-5 stroke-[2.5]" /> },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#91E2B9] text-[#050505] p-5 justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b-[3.5px] border-[#050505] mb-6">
          <div
            onClick={() => {
              onNavigate('dashboard');
              onCloseMobile();
            }}
            className="cursor-pointer group"
          >
            <div className="font-heading font-black text-2xl tracking-tighter leading-none text-[#050505]">
              FINSAFE
            </div>
            <div className="font-heading font-black text-2xl tracking-tighter leading-none text-[#050505] flex items-center gap-1.5">
              CAMPUS
              <span className="inline-block w-2.5 h-2.5 bg-[#050505] ml-0.5"></span>
            </div>
            <div className="font-mono text-[10px] font-bold tracking-wider uppercase mt-1 text-[#050505] opacity-80">
              LEARN BEFORE YOU PAY
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 border-2 border-[#050505] bg-[#FFF8E8] shadow-[2px_2px_0px_#050505] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-2">
          {navItems.map(item => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full text-left flex items-center gap-3 px-3.5 py-2.5 font-mono text-sm font-bold tracking-tight transition-all duration-120 border-[3px] border-[#050505] ${
                  isActive
                    ? 'bg-[#050505] text-[#FFF8E8] shadow-[5px_5px_0px_#050505] translate-x-1'
                    : 'bg-transparent text-[#050505] shadow-[3px_3px_0px_#050505] hover:bg-[#80d4a9] hover:translate-x-0.5'
                }`}
              >
                <span className={isActive ? 'text-[#FFF36A]' : 'text-[#050505]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Stats / Badges */}
      <div className="pt-4 border-t-[3.5px] border-[#050505] space-y-2.5 mt-6">
        {/* Safety Score Widget */}
        <div
          onClick={() => {
            onNavigate('progress');
            onCloseMobile();
          }}
          className="border-[3px] border-[#050505] bg-[#FFF8E8] p-2.5 shadow-[4px_4px_0px_#050505] cursor-pointer hover:bg-white transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-[#050505] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Safety Score
            </span>
            <span className="font-heading font-black text-sm text-[#050505]">
              {userProgress.safetyScore}/100
            </span>
          </div>
          <div className="w-full bg-[#050505]/10 h-2 border border-[#050505] mt-1.5 overflow-hidden">
            <div
              className="bg-[#050505] h-full"
              style={{ width: `${userProgress.safetyScore}%` }}
            ></div>
          </div>
        </div>

        {/* Streak & Privacy Badges */}
        <div className="grid grid-cols-2 gap-2">
          <div className="border-[2.5px] border-[#050505] bg-[#FFF36A] p-1.5 shadow-[3px_3px_0px_#050505] flex items-center justify-center gap-1 font-mono text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-[#050505]" />
            <span>{userProgress.streakDays}d Streak</span>
          </div>

          <div
            onClick={() => {
              onNavigate('privacy');
              onCloseMobile();
            }}
            className="border-[2.5px] border-[#050505] bg-[#8FD5E8] p-1.5 shadow-[3px_3px_0px_#050505] flex items-center justify-center gap-1 font-mono text-xs font-bold cursor-pointer hover:bg-[#7bc8dc]"
          >
            <LockKeyhole className="w-3 h-3" />
            <span>Zero-PII</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Navigation (Stays fixed throughout, never scrolls with the right content) */}
      <aside className="hidden md:block w-64 lg:w-72 shrink-0 border-r-[4px] border-[#050505] h-screen sticky top-0 overflow-y-auto select-none z-30">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 transform transition-transform duration-200 border-r-[4px] border-[#050505] shadow-[10px_0px_0px_#050505] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </div>
    </>
  );
};
