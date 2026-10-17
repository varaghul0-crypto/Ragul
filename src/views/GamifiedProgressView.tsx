import React from 'react';
import {
  BarChart2,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Award,
  ShieldCheck,
  TrendingUp,
  Target,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';
import { ScoreTrendChart } from '../components/BrutalistCharts';
import { UserProgress } from '../types';

interface GamifiedProgressViewProps {
  userProgress: UserProgress;
  onResetProgress: () => void;
}

export const GamifiedProgressView: React.FC<GamifiedProgressViewProps> = ({
  userProgress,
  onResetProgress,
}) => {
  const milestones = [
    {
      id: 'm1',
      title: 'QR & UPI Guardian',
      desc: 'Avoided entering UPI PIN for receiving funds.',
      achieved: true,
      color: 'bg-[#91E2B9]',
    },
    {
      id: 'm2',
      title: 'Predatory Loan Breaker',
      desc: 'Identified extortionate 1,000%+ APR in 7-day cash apps.',
      achieved: userProgress.completedScenarios.includes('scen-06') || true,
      color: 'bg-[#FFF36A]',
    },
    {
      id: 'm3',
      title: 'Ponzi Yield Spotter',
      desc: 'Unmasked guaranteed 30% monthly forex arbitrage claim.',
      achieved: true,
      color: 'bg-[#8FD5E8]',
    },
    {
      id: 'm4',
      title: 'Zero-PII Defender',
      desc: 'Completed all exercises without submitting sensitive credentials.',
      achieved: true,
      color: 'bg-[#FFC39D]',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="pb-4 border-b-[3.5px] border-[#050505]">
        <div className="flex items-center gap-2 mb-1">
          <BrutalBadge bg="bg-[#91E2B9]">RESILIENCE METRICS</BrutalBadge>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            [ Educational Simulation Telemetry — Sample Demo Data ]
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
          TRACKING GAMIFIED RESILIENCE.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
          The FinSafe Safety Score Engine synthesizes decision accuracy, threat detection reflexes, and budgeting discipline.
        </p>
      </div>

      {/* Major Engine Hero Block */}
      <div className="border-[4px] border-[#050505] bg-[#FFF8E8] p-6 md:p-8 shadow-[10px_10px_0px_#050505] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#050505]">
          <div>
            <span className="font-mono text-xs font-black uppercase tracking-wider text-[#050505]">
              CENTRAL CONCEPT
            </span>
            <h2 className="font-heading font-black text-2xl md:text-4xl text-[#050505] uppercase tracking-tight">
              SAFETY SCORE ENGINE.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold bg-[#FFF36A] px-2.5 py-1 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
              HEURISTIC ENGINE v1.0
            </span>
            <button
              onClick={onResetProgress}
              className="font-mono text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#050505] bg-[#FFF8E8] shadow-[2px_2px_0px_#050505] hover:bg-[#ff6b6b] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              title="Reset simulation progress to default benchmark"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Stats
            </button>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Safety Score */}
          <div className="border-[3px] border-[#050505] bg-[#91E2B9] p-4 shadow-[5px_5px_0px_#050505] space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#050505]">
              SAFETY SCORE.
            </div>
            <div className="font-heading font-black text-4xl text-[#050505] tabular-nums">
              {userProgress.safetyScore}
              <span className="text-xl font-bold opacity-60"> / 100</span>
            </div>
            <div className="font-mono text-[11px] font-bold text-[#050505]">
              Resilience rating: High Guard
            </div>
          </div>

          {/* Card 2: Learning Streak */}
          <div className="border-[3px] border-[#050505] bg-[#FFF36A] p-4 shadow-[5px_5px_0px_#050505] space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#050505] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-[#050505]" />
              LEARNING STREAK.
            </div>
            <div className="font-heading font-black text-4xl text-[#050505] tabular-nums">
              {userProgress.streakDays}
              <span className="text-xl font-bold opacity-60"> Days</span>
            </div>
            <div className="font-mono text-[11px] font-bold text-[#050505]">
              14 Days Active streak
            </div>
          </div>

          {/* Card 3: Quiz Accuracy */}
          <div className="border-[3px] border-[#050505] bg-[#8FD5E8] p-4 shadow-[5px_5px_0px_#050505] space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#050505]">
              QUIZ ACCURACY.
            </div>
            <div className="font-heading font-black text-4xl text-[#050505] tabular-nums">
              {userProgress.quizAccuracy}%
            </div>
            <div className="font-mono text-[11px] font-bold text-[#050505]">
              {userProgress.totalCorrect} of {userProgress.totalAnswered} scenarios correct
            </div>
          </div>

          {/* Card 4: Completed Modules */}
          <div className="border-[3px] border-[#050505] bg-[#FFC39D] p-4 shadow-[5px_5px_0px_#050505] space-y-2">
            <div className="font-mono text-xs font-black uppercase text-[#050505]">
              COMPLETED MODULES.
            </div>
            <div className="font-heading font-black text-4xl text-[#050505] tabular-nums">
              {userProgress.completedScenarios.length}
              <span className="text-xl font-bold opacity-60"> / 6</span>
            </div>
            <div className="font-mono text-[11px] font-bold text-[#050505]">
              5 Modules in progress
            </div>
          </div>
        </div>

        {/* Trend Graph */}
        <div className="space-y-2 pt-2">
          <div className="font-mono text-xs font-bold uppercase text-[#050505]">
            Temporal Score Trajectory:
          </div>
          <ScoreTrendChart score={userProgress.safetyScore} />
        </div>
      </div>

      {/* Weak Areas & Milestones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* WEAK AREAS IDENTIFIED */}
        <div className="lg:col-span-6 space-y-4">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-xl text-[#050505] uppercase">
                WEAK AREAS IDENTIFIED.
              </span>
              <span className="font-mono text-xs font-bold bg-[#ff6b6b] text-[#050505] px-2 py-0.5 border border-[#050505]">
                REINFORCEMENT
              </span>
            </div>

            <p className="font-sans text-xs text-[#050505]/80 font-bold">
              Specific threat archetypes flagged for practice:
            </p>

            <div className="space-y-3">
              {userProgress.weakAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="border-2 border-[#050505] p-3.5 bg-white shadow-[3px_3px_0px_#050505] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#050505]">
                      {area.topic}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-[#050505] ${
                        area.status === 'Needs Review'
                          ? 'bg-[#ff6b6b] text-[#050505]'
                          : area.status === 'Practicing'
                          ? 'bg-[#FFF36A] text-[#050505]'
                          : 'bg-[#91E2B9] text-[#050505]'
                      }`}
                    >
                      {area.status}
                    </span>
                  </div>

                  <div className="w-full bg-[#050505]/10 h-2 border border-[#050505] overflow-hidden">
                    <div
                      className={`h-full ${
                        area.accuracy < 70 ? 'bg-[#ff6b6b]' : area.accuracy < 85 ? 'bg-[#FFF36A]' : 'bg-[#91E2B9]'
                      }`}
                      style={{ width: `${area.accuracy}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between font-mono text-[10px] font-bold text-[#050505]/70">
                    <span>Accuracy: {area.accuracy}%</span>
                    <span>Target: 95%</span>
                  </div>
                </div>
              ))}
            </div>
          </BrutalCard>
        </div>

        {/* Milestone Stamps & Activity Log */}
        <div className="lg:col-span-6 space-y-4">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-xl text-[#050505] uppercase">
                Milestone Stamps.
              </span>
              <span className="font-mono text-xs font-bold bg-[#91E2B9] px-2 py-0.5 border border-[#050505]">
                CAMPUS HONORS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {milestones.map(m => (
                <div
                  key={m.id}
                  className={`border-[2.5px] border-[#050505] p-3 shadow-[3px_3px_0px_#050505] space-y-1 ${m.color}`}
                >
                  <div className="flex items-center justify-between font-mono text-xs font-black text-[#050505]">
                    <span>{m.title}</span>
                    <span>✓</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#050505]/85 font-medium leading-snug">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity Log */}
            <div className="pt-2 border-t-2 border-[#050505] space-y-2">
              <div className="font-mono text-xs font-black uppercase text-[#050505]">
                Recent Simulation Log:
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                {userProgress.activityLog.map(act => (
                  <div
                    key={act.id}
                    className="p-2 border border-[#050505] bg-white flex items-center justify-between shadow-[1.5px_1.5px_0px_#050505]"
                  >
                    <div>
                      <div className="font-bold text-[#050505] truncate max-w-[200px]">
                        {act.title}
                      </div>
                      <div className="text-[10px] text-[#050505]/70">{act.timestamp}</div>
                    </div>
                    <div
                      className={`font-black px-2 py-0.5 border border-[#050505] ${
                        act.passed ? 'bg-[#91E2B9]' : 'bg-[#ff6b6b]'
                      }`}
                    >
                      {act.scoreChange > 0 ? `+${act.scoreChange}` : act.scoreChange} PTS
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BrutalCard>
        </div>
      </div>
    </div>
  );
};
