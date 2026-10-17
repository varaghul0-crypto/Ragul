import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  CreditCard,
  SearchCode,
  Calculator,
  PieChart,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Lock,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';
import { ScoreTrendChart } from '../components/BrutalistCharts';
import { RouteId, UserProgress } from '../types';

interface DashboardViewProps {
  onNavigate: (route: RouteId) => void;
  userProgress: UserProgress;
  onSelectScenario: (scenarioId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  userProgress,
  onSelectScenario,
}) => {
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [checklistAnswers, setChecklistAnswers] = useState<Record<number, boolean>>({});

  const toggleChecklist = (idx: number) => {
    setChecklistAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checklistQuestions = [
    {
      q: '1. Is this request asking for my UPI PIN or OTP to RECEIVE money?',
      rule: 'Golden Rule: UPI PIN is only needed to send money. Never enter PIN to get funds.',
    },
    {
      q: '2. Am I being pressured with urgent countdowns ("within 2 hours or blocked")?',
      rule: 'Attackers create panic so you bypass verification. Legitimate systems allow time.',
    },
    {
      q: '3. Does the domain or sender match the verified campus / bank portal?',
      rule: 'Check domain suffixes (.edu.in, .gov.in). Watch for typosquatting like .cfd, .xyz.',
    },
    {
      q: '4. Is a work-from-home or scholarship demanding an upfront fee?',
      rule: 'No genuine employer or scholarship ever requires an upfront "registration token".',
    },
    {
      q: '5. Am I downloading an APK directly or granting contact/photo permissions?',
      rule: 'Predatory loan apps harvest your contacts and blackmail you. Only install verified apps.',
    },
  ];

  const modules = [
    {
      id: 'simulator',
      title: 'UPI Safety.',
      desc: 'Practice identifying risky payment requests, malicious collect intents, and deceptive QR codes.',
      bg: 'bg-[#FFC39D]',
      tag: 'PAYMENT DEFENSE',
      icon: <CreditCard className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'scam-detector',
      title: 'Scam Detector.',
      desc: 'Analyze simulated messages and screenshots using our zero-PII educational heuristic rules engine.',
      bg: 'bg-[#8FD5E8]',
      tag: 'TEXT & EMAIL LAB',
      icon: <SearchCode className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'investments',
      title: 'Investment Reality.',
      desc: 'Identify red flags without financial advice: high guaranteed yields, Ponzi pyramids, and pump syndicates.',
      bg: 'bg-[#FFF36A]',
      tag: 'RISK LITERACY',
      icon: <TrendingUp className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'loans',
      title: 'Loan & EMI.',
      desc: 'Understand borrowing costs, hidden processing fees, and extortionate 1,000%+ instant loan app traps.',
      bg: 'bg-[#F29BB9]',
      tag: 'CREDIT MATH',
      icon: <Calculator className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'budget',
      title: 'Budget Simulator.',
      desc: 'Practice balancing needs, wants, savings, and emergency buffers with student monthly stipends.',
      bg: 'bg-[#91E2B9]',
      tag: 'ALLOCATION LAB',
      icon: <PieChart className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'checklist-toggle',
      title: 'Safety Checklist.',
      desc: 'Apply the five-question transaction safety check before tapping any payment confirmation.',
      bg: 'bg-[#A9DDF1]',
      tag: 'VERIFICATION TOOL',
      icon: <CheckCircle className="w-6 h-6 stroke-[2.5]" />,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Block */}
      <div className="border-[4px] border-[#050505] bg-[#FFF8E8] p-6 md:p-8 shadow-[10px_10px_0px_#050505]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BrutalBadge bg="bg-[#91E2B9]">STUDENT SAFETY SANDBOX</BrutalBadge>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505]/70">
                · Zero-PII Policy ·
              </span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#050505] uppercase leading-[0.95]">
              WELCOME TO FINSAFE.
            </h1>
            <p className="font-heading font-bold text-xl md:text-2xl text-[#050505] tracking-tight">
              “Learn before you pay.”
            </p>
            <p className="font-sans text-sm md:text-base text-[#050505]/80 max-w-2xl leading-relaxed pt-1">
              A safe educational sandbox where students master scam recognition, predatory loan traps,
              and budgeting mistakes through synthetic scenarios. Never requires real credentials or banking access.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
            <BrutalButton
              variant="primary"
              size="lg"
              onClick={() => {
                onSelectScenario('scen-01');
                onNavigate('simulator');
              }}
              className="flex items-center justify-center gap-2"
            >
              Start Simulator <ArrowRight className="w-4 h-4 stroke-[3]" />
            </BrutalButton>
            <BrutalButton
              variant="yellow"
              size="md"
              onClick={() => onNavigate('scam-detector')}
              className="flex items-center justify-center gap-1.5"
            >
              Analyze a Message
            </BrutalButton>
          </div>
        </div>
      </div>

      {/* Two Major Cards: Today's Safety Challenge & Safety Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Today's Safety Challenge */}
        <div className="lg:col-span-7">
          <BrutalCard bg="bg-[#FFF8E8]" className="h-full flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505] mb-4">
                <span className="font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-[#050505]">
                  <ShieldAlert className="w-4 h-4 text-[#050505]" />
                  TODAY’S SAFETY CHALLENGE
                </span>
                <span className="font-mono text-xs font-bold bg-[#ff6b6b] text-[#050505] px-2 py-0.5 border border-[#050505]">
                  DAILY SCENARIO
                </span>
              </div>

              <div className="border-[3px] border-[#050505] bg-white p-4 shadow-[4px_4px_0px_#050505] mb-4">
                <p className="font-sans text-base md:text-lg font-bold text-[#050505] leading-snug">
                  “You receive a message saying you’ve won a ₹5,000 scholarship. It asks you to scan a QR code and enter your UPI PIN.”
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#FFF36A] px-2 py-0.5 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
                  [SIMULATION]
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#8FD5E8] px-2 py-0.5 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
                  [Category: Phishing]
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider bg-[#FFC39D] px-2 py-0.5 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
                  [Difficulty: High]
                </span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#050505] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#050505]/70">
                Reward: +10 Resilience Points
              </span>
              <BrutalButton
                variant="primary"
                onClick={() => {
                  onSelectScenario('scen-01');
                  onNavigate('simulator');
                }}
                className="flex items-center gap-2"
              >
                Start Challenge <ArrowRight className="w-4 h-4 stroke-[3]" />
              </BrutalButton>
            </div>
          </BrutalCard>
        </div>

        {/* RIGHT: Safety Score Card */}
        <div className="lg:col-span-5">
          <BrutalCard bg="bg-[#FFF8E8]" className="h-full flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#050505]">
                  SAFETY SCORE
                </span>
                <span className="font-mono text-xs font-bold bg-[#91E2B9] text-[#050505] px-2 py-0.5 border border-[#050505]">
                  CAMPUS BENCHMARK
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-3 pb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-5xl md:text-6xl text-[#050505] tabular-nums">
                    {userProgress.safetyScore}
                  </span>
                  <span className="font-heading font-bold text-2xl text-[#050505]/50">
                    / 100
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-black text-[#050505] bg-[#91E2B9] px-2 py-1 border-2 border-[#050505] shadow-[2px_2px_0px_#050505] inline-block">
                    +12% this week
                  </span>
                </div>
              </div>

              {/* Hand-drawn / Brutalist SVG Trend Chart */}
              <div className="mt-2">
                <ScoreTrendChart score={userProgress.safetyScore} />
              </div>
            </div>

            <div className="pt-3 border-t-2 border-[#050505] flex items-center justify-between font-mono text-xs font-bold text-[#050505]">
              <span>Streak: {userProgress.streakDays} Days</span>
              <span>Accuracy: {userProgress.quizAccuracy}%</span>
            </div>
          </BrutalCard>
        </div>
      </div>

      {/* Your Learning Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-black text-2xl md:text-3xl tracking-tight text-[#050505] uppercase">
            Your Learning Modules.
          </h2>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505]/70">
            6 Specialized Sandboxes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map(mod => (
            <div
              key={mod.title}
              onClick={() => {
                if (mod.id === 'checklist-toggle') {
                  setChecklistOpen(!checklistOpen);
                } else {
                  onNavigate(mod.id as RouteId);
                }
              }}
              className={`border-[3.5px] border-[#050505] shadow-[8px_8px_0px_#050505] rounded-xl p-5 md:p-6 transition-all duration-150 cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[11px_11px_0px_#050505] flex flex-col justify-between ${mod.bg}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-black uppercase tracking-wider bg-[#FFF8E8] px-2 py-0.5 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
                    {mod.tag}
                  </span>
                  <div className="p-1.5 border-2 border-[#050505] bg-[#FFF8E8] shadow-[2px_2px_0px_#050505]">
                    {mod.icon}
                  </div>
                </div>

                <h3 className="font-heading font-black text-2xl tracking-tight text-[#050505] mb-2">
                  {mod.title}
                </h3>
                <p className="font-sans text-sm font-medium text-[#050505]/85 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-[#050505] flex items-center justify-between font-mono text-xs font-bold text-[#050505]">
                <span>Launch Module</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Checklist Expandable Interactive Card */}
      {checklistOpen && (
        <BrutalCard bg="bg-[#A9DDF1]" className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#050505]" />
              <h3 className="font-heading font-black text-xl text-[#050505] uppercase">
                The Five-Question Transaction Safety Checklist.
              </h3>
            </div>
            <button
              onClick={() => setChecklistOpen(false)}
              className="font-mono text-xs font-bold border-2 border-[#050505] bg-[#FFF8E8] px-2 py-1 shadow-[2px_2px_0px_#050505]"
            >
              Close
            </button>
          </div>

          <p className="font-sans text-sm text-[#050505]/90 font-medium">
            Run through these 5 questions whenever any unexpected payment prompt, QR code, or link arrives:
          </p>

          <div className="space-y-3">
            {checklistQuestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleChecklist(idx)}
                className={`p-3 border-2 border-[#050505] shadow-[3px_3px_0px_#050505] cursor-pointer transition-all ${
                  checklistAnswers[idx] ? 'bg-[#91E2B9]' : 'bg-[#FFF8E8]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 border-2 border-[#050505] shrink-0 mt-0.5 flex items-center justify-center font-mono font-bold text-xs ${
                      checklistAnswers[idx] ? 'bg-[#050505] text-[#FFF8E8]' : 'bg-white'
                    }`}
                  >
                    {checklistAnswers[idx] ? '✓' : ''}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm md:text-base text-[#050505]">
                      {item.q}
                    </div>
                    <div className="font-sans text-xs text-[#050505]/80 mt-0.5">
                      {item.rule}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BrutalCard>
      )}
    </div>
  );
};
