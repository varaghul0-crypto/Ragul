import React, { useState } from 'react';
import { Search, Bell, Shield, User, Menu, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrutalBadge } from './BrutalistUI';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileMenu: () => void;
  unreadCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  unreadCount = 2,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'New Campus Phishing Pattern Reported',
      time: '10m ago',
      desc: 'Fake college sports fest merchandise link collecting UPI passwords.',
      type: 'warning',
    },
    {
      id: 'n2',
      title: 'Weekly Safety Streak Maintained!',
      time: '2h ago',
      desc: 'You completed 3 synthetic scenarios without entering simulated PINs.',
      type: 'success',
    },
    {
      id: 'n3',
      title: 'Sandbox Integrity Check Passed',
      time: 'Yesterday',
      desc: 'Zero real credentials ingested. Client-side local rules active.',
      type: 'info',
    },
  ];

  return (
    <header className="sticky top-0 z-20 bg-[#FFF8E8] border-b-[4px] border-[#050505] px-4 md:px-8 py-3.5 flex items-center justify-between gap-3 select-none">
      {/* Left: Mobile Menu Toggle & Sandbox Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 border-[2.5px] border-[#050505] bg-[#91E2B9] shadow-[3px_3px_0px_#050505] active:translate-x-0.5 active:translate-y-0.5"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Primary Educational Sandbox Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono font-black text-xs md:text-sm uppercase tracking-wider bg-[#FFF36A] text-[#050505] border-[2.5px] border-[#050505] shadow-[3.5px_3.5px_0px_#050505]">
            <Shield className="w-4 h-4 fill-[#050505]" />
            [ EDUCATIONAL SANDBOX v1.0 ]
          </span>

          <span className="hidden lg:inline-flex items-center px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider bg-[#8FD5E8] border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
            SIMULATION MODE
          </span>
        </div>
      </div>

      {/* Middle: Functional Search Bar */}
      <div className="flex-1 max-w-md hidden sm:block relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#050505]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search scenarios, traps, modules..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#FFF8E8] border-[2.5px] border-[#050505] shadow-[3px_3px_0px_#050505] font-mono text-xs md:text-sm text-[#050505] placeholder-[#050505]/50 focus:outline-none focus:shadow-[5px_5px_0px_#050505] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs font-bold px-1 text-[#050505] hover:bg-black/10"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-2.5 relative">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 border-[2.5px] border-[#050505] bg-[#FFC39D] shadow-[3px_3px_0px_#050505] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all relative"
            title="Educational Alerts & Dispatches"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4 text-[#050505] stroke-[2.5]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#ff6b6b] border-[1.5px] border-[#050505] text-[10px] font-mono font-bold flex items-center justify-center text-[#050505]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-[#FFF8E8] border-[3.5px] border-[#050505] shadow-[8px_8px_0px_#050505] p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[#050505] mb-2 font-mono text-xs font-bold uppercase">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#050505]" />
                  Simulated Safety Feed
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="hover:underline text-[10px]"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map(item => (
                  <div
                    key={item.id}
                    className="p-2 border-2 border-[#050505] bg-white text-left font-sans text-xs space-y-1 shadow-[2px_2px_0px_#050505]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs truncate">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] opacity-70">{item.time}</span>
                    </div>
                    <p className="font-sans text-[11px] text-[#050505]/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t-2 border-[#050505] text-center">
                <span className="font-mono text-[10px] font-bold text-[#050505]/70 uppercase">
                  Zero Real Data Ingested
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Student Avatar / Profile */}
        <div className="flex items-center gap-2 border-[2.5px] border-[#050505] bg-[#FFF8E8] px-2.5 py-1.5 shadow-[3px_3px_0px_#050505]">
          <div className="w-6 h-6 rounded-full bg-[#F29BB9] border-2 border-[#050505] flex items-center justify-center font-mono font-black text-xs">
            FS
          </div>
          <div className="hidden xl:block font-mono text-xs text-left">
            <div className="font-bold leading-none">Student Cadet</div>
            <div className="text-[10px] text-[#050505]/70 leading-none mt-0.5">Tier 2 Guard</div>
          </div>
        </div>
      </div>
    </header>
  );
};
