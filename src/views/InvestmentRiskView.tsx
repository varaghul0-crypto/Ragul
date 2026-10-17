import React, { useState } from 'react';
import {
  TrendingUp,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Info,
  Scale,
  Award,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';
import { INVESTMENT_OFFERS } from '../data/mockData';

interface InvestmentRiskViewProps {
  onScoreGain?: (points: number) => void;
}

export const InvestmentRiskView: React.FC<InvestmentRiskViewProps> = ({ onScoreGain }) => {
  const [activeOfferIdx, setActiveOfferIdx] = useState(0);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [completedOffers, setCompletedOffers] = useState<string[]>([]);

  const offer = INVESTMENT_OFFERS[activeOfferIdx];

  const toggleFlag = (flagId: string) => {
    if (hasEvaluated) return;
    setSelectedFlags(prev =>
      prev.includes(flagId) ? prev.filter(f => f !== flagId) : [...prev, flagId]
    );
  };

  const handleEvaluate = () => {
    if (hasEvaluated) return;
    setHasEvaluated(true);
    if (!completedOffers.includes(offer.id)) {
      setCompletedOffers(prev => [...prev, offer.id]);
      if (onScoreGain) onScoreGain(15);
    }
  };

  const handleNextOffer = () => {
    setHasEvaluated(false);
    setSelectedFlags([]);
    setActiveOfferIdx((activeOfferIdx + 1) % INVESTMENT_OFFERS.length);
  };

  const handleResetOffer = () => {
    setHasEvaluated(false);
    setSelectedFlags([]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="pb-4 border-b-[3.5px] border-[#050505]">
        <div className="flex items-center gap-2 mb-1">
          <BrutalBadge bg="bg-[#FFF36A]">LITERACY SANDBOX</BrutalBadge>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            Case {activeOfferIdx + 1} of {INVESTMENT_OFFERS.length}
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
          INVESTMENT RISK LAB.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
          Deconstruct deceptive financial pitches, identify predatory return promises, and learn the unbreakable laws of risk and reward.
        </p>
      </div>

      {/* Mandatory Regulatory & Educational Disclaimer */}
      <div className="border-[3px] border-[#050505] bg-[#8FD5E8] p-3.5 shadow-[4px_4px_0px_#050505] flex items-center justify-between font-mono text-xs font-bold text-[#050505]">
        <span className="flex items-center gap-2">
          <Scale className="w-4 h-4 shrink-0" />
          EDUCATIONAL SIMULATION ONLY: ZERO FINANCIAL ADVICE. ALL CONTENT FRAMED FOR GENERAL CONSUMER AWARENESS.
        </span>
      </div>

      {/* Offer Pitch Container */}
      <div className="border-[4px] border-[#050505] bg-[#FFF8E8] shadow-[10px_10px_0px_#050505] rounded-xl overflow-hidden">
        {/* Pitch Header */}
        <div className="bg-[#FFF36A] p-4 border-b-[3.5px] border-[#050505] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black uppercase tracking-wider bg-[#FFF8E8] px-2.5 py-1 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
              SYNTHETIC PITCH
            </span>
            <span className="font-mono text-xs font-bold text-[#050505]">
              Lock-in: <span className="font-black">{offer.lockIn}</span>
            </span>
          </div>

          <div className="font-mono text-xs font-bold bg-[#ff6b6b] text-[#050505] px-2.5 py-1 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
            CLAIMED RETURN: {offer.offeredReturn}
          </div>
        </div>

        {/* Pitch Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading font-black text-2xl md:text-3xl text-[#050505]">
              {offer.title}
            </h2>
            <div className="border-[3px] border-[#050505] bg-white p-5 shadow-[4px_4px_0px_#050505]">
              <p className="font-sans text-base md:text-lg font-bold text-[#050505] leading-relaxed">
                “{offer.pitch}”
              </p>
            </div>
          </div>

          {/* Question: What warning signs do you notice? */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-lg md:text-xl text-[#050505] uppercase">
                What warning signs do you notice?
              </span>
              <span className="font-mono text-xs font-bold text-[#050505]/70">
                Multi-select all that apply
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {offer.riskFlags.map(flag => {
                const isSelected = selectedFlags.includes(flag.id);
                return (
                  <div
                    key={flag.id}
                    onClick={() => toggleFlag(flag.id)}
                    className={`border-[3px] border-[#050505] p-3.5 shadow-[4px_4px_0px_#050505] cursor-pointer transition-all duration-120 ${
                      isSelected
                        ? 'bg-[#91E2B9] translate-x-1 translate-y-1 shadow-[2px_2px_0px_#050505]'
                        : 'bg-[#FFF8E8] hover:bg-white active:translate-x-0.5 active:translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 border-2 border-[#050505] flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                          isSelected ? 'bg-[#050505] text-[#FFF8E8]' : 'bg-white'
                        }`}
                      >
                        {isSelected ? '✓' : ''}
                      </div>
                      <span className="font-mono text-xs md:text-sm font-bold text-[#050505]">
                        {flag.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {!hasEvaluated && (
              <div className="pt-3 flex justify-end">
                <BrutalButton
                  variant="primary"
                  size="md"
                  disabled={selectedFlags.length === 0}
                  onClick={handleEvaluate}
                  className="flex items-center gap-2"
                >
                  [ Reveal Risk Breakdown ] <ArrowRight className="w-4 h-4 stroke-[3]" />
                </BrutalButton>
              </div>
            )}
          </div>

          {/* Evaluated Detailed Explanation */}
          {hasEvaluated && (
            <div className="border-[3.5px] border-[#050505] bg-[#FFF8E8] p-6 shadow-[6px_6px_0px_#050505] space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-6 h-6 text-[#050505]" />
                  <span className="font-heading font-black text-xl text-[#050505] uppercase">
                    Risk Breakdown & Audit Findings.
                  </span>
                </div>
                <span className="font-mono text-xs font-bold bg-[#91E2B9] px-2.5 py-1 border border-[#050505]">
                  +15 Resilience Points Logged
                </span>
              </div>

              {/* Explanations for each flag */}
              <div className="space-y-2.5">
                {offer.riskFlags.map(flag => {
                  const userGotIt = selectedFlags.includes(flag.id);
                  return (
                    <div
                      key={flag.id}
                      className={`p-3 border-2 border-[#050505] shadow-[2.5px_2.5px_0px_#050505] ${
                        flag.isCorrect
                          ? 'bg-[#FFF36A]/60'
                          : 'bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs font-bold text-[#050505] mb-1">
                        <span className="flex items-center gap-1.5">
                          {flag.isCorrect ? (
                            <span className="text-[10px] bg-[#ff6b6b] px-1.5 py-0.5 border border-[#050505] font-black">
                              CRITICAL RED FLAG
                            </span>
                          ) : (
                            <span className="text-[10px] bg-[#91E2B9] px-1.5 py-0.5 border border-[#050505] font-black">
                              NOT A WARNING SIGN
                            </span>
                          )}
                          <span className="font-black">{flag.label}</span>
                        </span>

                        <span className="text-[10px] font-mono">
                          {userGotIt ? (
                            <span className="bg-[#050505] text-[#FFF8E8] px-1.5 py-0.5">
                              You Selected
                            </span>
                          ) : flag.isCorrect ? (
                            <span className="text-red-700 font-bold">Missed Flag</span>
                          ) : (
                            <span className="opacity-60">Correctly Unchecked</span>
                          )}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#050505]/85 leading-relaxed font-medium">
                        {flag.reason}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Takeaway Box */}
              <div className="border-[3px] border-[#050505] bg-[#91E2B9] p-4 shadow-[3px_3px_0px_#050505] space-y-1">
                <div className="font-mono text-xs font-black uppercase text-[#050505]">
                  The Golden Rule of Student Wealth:
                </div>
                <p className="font-sans text-sm font-bold text-[#050505] leading-relaxed">
                  {offer.explanation}
                </p>
              </div>

              {/* Action Controls */}
              <div className="pt-3 border-t-2 border-[#050505] flex items-center justify-between">
                <button
                  onClick={handleResetOffer}
                  className="font-mono text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#050505] bg-[#FFF8E8] shadow-[2px_2px_0px_#050505] hover:bg-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-attempt Case
                </button>

                <BrutalButton
                  variant="primary"
                  onClick={handleNextOffer}
                  className="flex items-center gap-2"
                >
                  Next Case Study <ArrowRight className="w-4 h-4 stroke-[3]" />
                </BrutalButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
