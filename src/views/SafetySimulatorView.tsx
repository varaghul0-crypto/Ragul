import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Lock,
  UserCheck,
  Zap,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';
import { DecisionType, Scenario } from '../types';

interface SafetySimulatorViewProps {
  scenarios: Scenario[];
  selectedScenarioId?: string;
  onAnswerScenario: (scenarioId: string, decision: DecisionType, isCorrect: boolean) => void;
  onNextScenario?: () => void;
}

export const SafetySimulatorView: React.FC<SafetySimulatorViewProps> = ({
  scenarios,
  selectedScenarioId,
  onAnswerScenario,
}) => {
  const [activeIdx, setActiveIdx] = useState(() => {
    if (selectedScenarioId) {
      const idx = scenarios.findIndex(s => s.id === selectedScenarioId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [userDecision, setUserDecision] = useState<DecisionType | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const scenario = scenarios[activeIdx] || scenarios[0];

  const handleDecision = (decision: DecisionType) => {
    if (hasEvaluated) return;
    setUserDecision(decision);
    setHasEvaluated(true);

    const isCorrect = decision === scenario.correctDecision;
    onAnswerScenario(scenario.id, decision, isCorrect);
  };

  const handleNext = () => {
    setUserDecision(null);
    setHasEvaluated(false);
    setActiveIdx((activeIdx + 1) % scenarios.length);
  };

  const handleResetCurrent = () => {
    setUserDecision(null);
    setHasEvaluated(false);
  };

  const isCorrect = userDecision === scenario.correctDecision;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-[3.5px] border-[#050505]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BrutalBadge bg="bg-[#91E2B9]">INTERACTIVE ENGINE</BrutalBadge>
            <span className="font-mono text-xs font-bold text-[#050505]/70">
              Scenario {activeIdx + 1} of {scenarios.length}
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
            SAFETY SIMULATOR.
          </h1>
          <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
            Analyze fictional messages, inspect technical metadata, and decide: Safe, Suspicious, or Scam?
          </p>
        </div>

        {/* Quick Scenario Jumper */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {scenarios.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveIdx(i);
                setUserDecision(null);
                setHasEvaluated(false);
              }}
              className={`w-8 h-8 font-mono text-xs font-bold border-2 border-[#050505] shadow-[2px_2px_0px_#050505] transition-all ${
                i === activeIdx
                  ? 'bg-[#050505] text-[#FFF8E8]'
                  : 'bg-[#FFF8E8] text-[#050505] hover:bg-[#FFF36A]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Zero PII Notice */}
      <div className="bg-[#FFF36A] border-[3px] border-[#050505] p-3 shadow-[4px_4px_0px_#050505] flex items-center justify-between font-mono text-xs font-bold text-[#050505]">
        <span className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          SIMULATION ENVIRONMENT: NO REAL FINANCIAL CREDENTIALS EVER REQUIRED.
        </span>
        <span className="hidden sm:inline-block uppercase tracking-wider text-[10px] bg-[#050505] text-[#FFF8E8] px-2 py-0.5">
          SYNTHETIC TEST
        </span>
      </div>

      {/* Main Simulation Stage Card */}
      <div className="border-[4px] border-[#050505] bg-[#FFF8E8] shadow-[10px_10px_0px_#050505] rounded-xl overflow-hidden">
        {/* Scenario Metadata Bar */}
        <div className="bg-[#FFC39D] p-4 border-b-[3.5px] border-[#050505] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black uppercase tracking-wider bg-[#FFF8E8] px-2.5 py-1 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
              {scenario.category}
            </span>
            <span className="font-mono text-xs font-bold text-[#050505]">
              Difficulty: <span className="font-black underline">{scenario.difficulty}</span>
            </span>
          </div>

          <div className="font-mono text-xs font-bold text-[#050505] flex items-center gap-2">
            <span>Amount at Stake:</span>
            <span className="bg-[#FFF8E8] px-2 py-0.5 border-2 border-[#050505] font-black">
              {scenario.amount || 'N/A'}
            </span>
          </div>
        </div>

        {/* Simulated Incident Card Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Fictional Sender Box */}
          <div className="border-[3px] border-[#050505] bg-white p-4 shadow-[4px_4px_0px_#050505] space-y-1">
            <div className="flex items-center justify-between font-mono text-xs text-[#050505]/70">
              <span className="font-bold uppercase flex items-center gap-1.5 text-[#050505]">
                <UserCheck className="w-4 h-4 text-[#050505]" />
                Sender Identity
              </span>
              <span className="bg-[#8FD5E8] text-[#050505] px-1.5 py-0.5 border border-[#050505] font-bold">
                FICTIONAL DISPATCH
              </span>
            </div>
            <div className="font-heading font-black text-lg md:text-xl text-[#050505]">
              {scenario.sender}
            </div>
            <div className="font-mono text-xs font-medium text-[#050505]/80 break-all">
              Handle / Address: <span className="font-bold">{scenario.senderHandle}</span>
            </div>
          </div>

          {/* Fictional Message Body */}
          <div className="border-[3px] border-[#050505] bg-[#FFF8E8] p-5 shadow-[5px_5px_0px_#050505] space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505] flex items-center justify-between">
              <span>Incoming Simulated Message</span>
              <span className="text-[10px] bg-[#ff6b6b] text-[#050505] px-2 py-0.5 border border-[#050505]">
                URGENCY: {scenario.urgency.toUpperCase()}
              </span>
            </div>

            <p className="font-sans text-base md:text-lg font-bold text-[#050505] leading-relaxed select-text">
              “{scenario.message}”
            </p>

            {/* Simulated Technical Metadata Signals */}
            <div className="pt-3 border-t-2 border-[#050505] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#050505]">
                <Zap className="w-3.5 h-3.5 text-[#050505]" />
                <span className="font-bold">Request Type:</span>
                <span className="bg-white px-1.5 py-0.5 border border-[#050505] font-black truncate">
                  {scenario.requestType}
                </span>
              </div>

              {scenario.link && (
                <div className="flex items-center gap-1.5 text-[#050505]">
                  <ExternalLink className="w-3.5 h-3.5 text-[#050505]" />
                  <span className="font-bold">Link Target:</span>
                  <span className="bg-white px-1.5 py-0.5 border border-[#050505] font-black truncate max-w-[200px]">
                    {scenario.link}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Decision Buttons (Before or After Evaluation) */}
          <div className="space-y-3 pt-2">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505]">
              Make Your Student Safety Decision:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                disabled={hasEvaluated}
                onClick={() => handleDecision('SAFE')}
                className={`py-3.5 px-4 font-mono font-black text-sm uppercase tracking-wider border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] transition-all ${
                  userDecision === 'SAFE'
                    ? 'bg-[#91E2B9] translate-x-1 translate-y-1 shadow-[2px_2px_0px_#050505]'
                    : hasEvaluated
                    ? 'opacity-60 bg-[#FFF8E8]'
                    : 'bg-[#91E2B9] hover:bg-[#7edaa7] active:translate-x-1 active:translate-y-1'
                }`}
              >
                [ SAFE ]
              </button>

              <button
                disabled={hasEvaluated}
                onClick={() => handleDecision('SUSPICIOUS')}
                className={`py-3.5 px-4 font-mono font-black text-sm uppercase tracking-wider border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] transition-all ${
                  userDecision === 'SUSPICIOUS'
                    ? 'bg-[#FFF36A] translate-x-1 translate-y-1 shadow-[2px_2px_0px_#050505]'
                    : hasEvaluated
                    ? 'opacity-60 bg-[#FFF8E8]'
                    : 'bg-[#FFF36A] hover:bg-[#f6ea58] active:translate-x-1 active:translate-y-1'
                }`}
              >
                [ SUSPICIOUS ]
              </button>

              <button
                disabled={hasEvaluated}
                onClick={() => handleDecision('SCAM')}
                className={`py-3.5 px-4 font-mono font-black text-sm uppercase tracking-wider border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] transition-all ${
                  userDecision === 'SCAM'
                    ? 'bg-[#ff6b6b] translate-x-1 translate-y-1 shadow-[2px_2px_0px_#050505]'
                    : hasEvaluated
                    ? 'opacity-60 bg-[#FFF8E8]'
                    : 'bg-[#ff6b6b] hover:bg-[#fa5757] active:translate-x-1 active:translate-y-1'
                }`}
              >
                [ DEFINITELY A SCAM ]
              </button>
            </div>
          </div>

          {/* Educational Feedback Panel (Revealed upon decision) */}
          {hasEvaluated && (
            <div
              className={`border-[3.5px] border-[#050505] p-6 shadow-[6px_6px_0px_#050505] space-y-4 animate-in fade-in duration-200 ${
                isCorrect ? 'bg-[#91E2B9]' : 'bg-[#FFC39D]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 stroke-[3] text-[#050505]" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 stroke-[3] text-[#050505]" />
                  )}
                  <span className="font-heading font-black text-xl text-[#050505] uppercase">
                    {isCorrect ? 'Correct Decision.' : 'Analysis Required.'}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs font-bold">
                  {isCorrect ? (
                    <span className="bg-[#050505] text-[#FFF8E8] px-2.5 py-1 border border-[#050505]">
                      +10 Safety Score
                    </span>
                  ) : (
                    <span className="bg-[#050505] text-[#FFF8E8] px-2.5 py-1 border border-[#050505]">
                      0 Pts (Review Flag)
                    </span>
                  )}
                  <span className="bg-[#FFF8E8] text-[#050505] px-2 py-1 border border-[#050505]">
                    +1 Scenario Logged
                  </span>
                </div>
              </div>

              {/* Detailed Educational Explanation */}
              <div>
                <div className="font-mono text-xs font-bold uppercase text-[#050505] mb-1">
                  Educational Takeaway:
                </div>
                <p className="font-sans text-sm md:text-base font-bold text-[#050505] leading-relaxed">
                  {scenario.explanation}
                </p>
              </div>

              {/* Detected Risk Indicators */}
              <div className="space-y-2 pt-2 border-t-2 border-[#050505]">
                <div className="font-mono text-xs font-black uppercase text-[#050505]">
                  Risk Indicators Detected:
                </div>
                <ul className="space-y-1.5">
                  {scenario.riskFlags.map((flag, idx) => (
                    <li
                      key={idx}
                      className="font-mono text-xs font-bold text-[#050505] flex items-start gap-2 bg-white/70 p-2 border border-[#050505]"
                    >
                      <span className="inline-block w-2 h-2 bg-[#050505] mt-1 shrink-0"></span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next / Reset Controls */}
              <div className="pt-3 border-t-2 border-[#050505] flex items-center justify-between">
                <button
                  onClick={handleResetCurrent}
                  className="font-mono text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#050505] bg-[#FFF8E8] shadow-[2px_2px_0px_#050505] hover:bg-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-test Scenario
                </button>

                <BrutalButton
                  variant="primary"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next Scenario <ArrowRight className="w-4 h-4 stroke-[3]" />
                </BrutalButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
