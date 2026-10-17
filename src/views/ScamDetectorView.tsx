import React, { useState } from 'react';
import {
  SearchCode,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Copy,
  Sparkles,
  Info,
  Clock,
  Link,
  KeyRound,
  Gift,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge, RiskStamp } from '../components/BrutalistUI';
import { SAMPLE_SCAM_MESSAGES } from '../data/mockData';
import { analyzeMessageSafety } from '../utils/scamAnalyzer';
import { ScamAnalysisReport } from '../types';

interface ScamDetectorViewProps {
  onAnalysisComplete?: (report: ScamAnalysisReport) => void;
}

export const ScamDetectorView: React.FC<ScamDetectorViewProps> = ({ onAnalysisComplete }) => {
  const [inputText, setInputText] = useState(SAMPLE_SCAM_MESSAGES[0].text);
  const [report, setReport] = useState<ScamAnalysisReport>(() => analyzeMessageSafety(SAMPLE_SCAM_MESSAGES[0].text));
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeMessageSafety(inputText);
      setReport(res);
      setIsAnalyzing(false);
      if (onAnalysisComplete) onAnalysisComplete(res);
    }, 200);
  };

  const handleSelectSample = (sampleText: string) => {
    setInputText(sampleText);
    const res = analyzeMessageSafety(sampleText);
    setReport(res);
  };

  const getSignalIcon = (id: string) => {
    switch (id) {
      case 'sig-urgency':
        return <Clock className="w-4 h-4" />;
      case 'sig-link':
        return <Link className="w-4 h-4" />;
      case 'sig-credential':
        return <KeyRound className="w-4 h-4" />;
      case 'sig-reward':
        return <Gift className="w-4 h-4" />;
      case 'sig-impersonation':
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="pb-4 border-b-[3.5px] border-[#050505]">
        <div className="flex items-center gap-2 mb-1">
          <BrutalBadge bg="bg-[#8FD5E8]">HEURISTIC RULES LAB</BrutalBadge>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            Natural Language Pattern Inspector
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
          MESSAGE SAFETY LAB.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
          Submit simulated messages, SMS broadcasts, or emails to inspect credential solicitation, urgency manipulation, and deceptive URLs.
        </p>
      </div>

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL: Submit a simulated message */}
        <div className="lg:col-span-6 space-y-5">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-lg md:text-xl text-[#050505] uppercase">
                Submit a simulated message.
              </span>
              <span className="font-mono text-xs font-bold bg-[#FFF36A] px-2 py-0.5 border border-[#050505]">
                INPUT LAB
              </span>
            </div>

            {/* Quick Sample Message Buttons */}
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505] mb-2">
                Load Educational Sample:
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_SCAM_MESSAGES.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(sample.text)}
                    className="font-mono text-xs font-bold px-2.5 py-1.5 border-2 border-[#050505] bg-white shadow-[2px_2px_0px_#050505] hover:bg-[#FFF36A] active:translate-x-0.5 active:translate-y-0.5 transition-all text-left"
                  >
                    {sample.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Large Dashed Drop/Paste Area & Textarea */}
            <div className="border-[3px] border-dashed border-[#050505] bg-white p-3 space-y-2">
              <label
                htmlFor="message-input"
                className="font-mono text-xs font-bold uppercase text-[#050505] flex items-center justify-between"
              >
                <span>Paste Simulated Text:</span>
                <span className="text-[10px] text-[#050505]/60 font-mono">
                  {inputText.length} characters
                </span>
              </label>
              <textarea
                id="message-input"
                rows={7}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Paste or type synthetic SMS, WhatsApp text, Telegram job offer, or email draft here..."
                className="w-full p-3 font-sans text-sm md:text-base text-[#050505] bg-[#FFF8E8] border-2 border-[#050505] shadow-[3px_3px_0px_#050505] focus:outline-none focus:shadow-[5px_5px_0px_#050505] transition-all resize-y"
              />
            </div>

            {/* Mandatory Strict Warning Box */}
            <div className="border-[3px] border-[#050505] bg-[#FFF36A] p-4 shadow-[4px_4px_0px_#050505] space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs font-black uppercase text-[#050505]">
                <ShieldCheck className="w-4 h-4 text-[#050505]" />
                Zero-PII Privacy Notice:
              </div>
              <p className="font-sans text-xs md:text-sm font-bold text-[#050505] leading-relaxed">
                “Use synthetic or educational examples only. Never enter real OTPs, PINs, passwords or financial credentials.”
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setInputText('')}
                className="font-mono text-xs font-bold text-[#050505] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Input
              </button>

              <BrutalButton
                variant="primary"
                size="md"
                disabled={!inputText.trim() || isAnalyzing}
                onClick={handleAnalyze}
                className="flex items-center gap-2"
              >
                {isAnalyzing ? 'Analyzing...' : '[ Analyze Message ]'}
              </BrutalButton>
            </div>
          </BrutalCard>
        </div>

        {/* RIGHT PANEL: Risk Analysis */}
        <div className="lg:col-span-6 space-y-5">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-lg md:text-xl text-[#050505] uppercase">
                Risk Analysis.
              </span>
              <span className="font-mono text-xs font-bold bg-[#8FD5E8] px-2 py-0.5 border border-[#050505]">
                HEURISTIC REPORT
              </span>
            </div>

            {/* Large Visual Stamp as requested */}
            <div className="py-2 text-center">
              <RiskStamp risk={report.overallRisk} />
              <div className="font-mono text-xs font-bold text-[#050505] mt-2">
                Simulated Deception Score: <span className="font-black text-sm">{report.riskScore} / 100</span>
              </div>
            </div>

            {/* Verdict Summary Box */}
            <div className="border-[3px] border-[#050505] bg-white p-4 shadow-[4px_4px_0px_#050505] space-y-1">
              <div className="font-mono text-xs font-black uppercase text-[#050505]">
                Summary Diagnosis:
              </div>
              <p className="font-sans text-sm md:text-base font-bold text-[#050505] leading-snug">
                {report.verdictSummary}
              </p>
            </div>

            {/* Individual Signal Breakdown */}
            <div className="space-y-3">
              <div className="font-mono text-xs font-black uppercase tracking-wider text-[#050505] flex items-center justify-between">
                <span>Signal Telemetry Matrix:</span>
                <span className="text-[10px] opacity-70">5 Educational Vectors</span>
              </div>

              <div className="space-y-2.5">
                {report.signals.map(sig => {
                  const isDetected = sig.detected;
                  const isHigh = sig.severity === 'high';
                  const isMed = sig.severity === 'medium';

                  return (
                    <div
                      key={sig.id}
                      className={`border-2 border-[#050505] p-3 shadow-[3px_3px_0px_#050505] transition-all ${
                        isDetected
                          ? isHigh
                            ? 'bg-[#ffc0c0]'
                            : isMed
                            ? 'bg-[#FFF36A]'
                            : 'bg-[#91E2B9]'
                          : 'bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-mono text-xs font-black text-[#050505]">
                          {getSignalIcon(sig.id)}
                          <span>{sig.name}</span>
                        </div>

                        <div>
                          {isDetected ? (
                            <span
                              className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 border border-[#050505] ${
                                isHigh
                                  ? 'bg-[#ff6b6b] text-[#050505]'
                                  : isMed
                                  ? 'bg-[#050505] text-[#FFF8E8]'
                                  : 'bg-[#91E2B9] text-[#050505]'
                              }`}
                            >
                              {sig.severity.toUpperCase()} SIGNAL
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] font-bold text-[#050505]/70 bg-white px-2 py-0.5 border border-[#050505]">
                              CLEAR / NOT DETECTED
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="font-sans text-xs text-[#050505] mt-1.5 leading-relaxed font-medium">
                        {sig.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Educational Takeaway Callout */}
            <div className="border-[3px] border-[#050505] bg-[#91E2B9] p-4 shadow-[4px_4px_0px_#050505] space-y-1">
              <div className="font-mono text-xs font-black uppercase text-[#050505]">
                Classroom Takeaway:
              </div>
              <p className="font-sans text-xs md:text-sm font-bold text-[#050505] leading-relaxed">
                {report.educationalTakeaway}
              </p>
            </div>

            {/* Legal Educational Disclaimer */}
            <div className="pt-2 text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]/60">
                Educational rules engine only · Not a commercial guarantee · Synthetic heuristic model
              </span>
            </div>
          </BrutalCard>
        </div>
      </div>
    </div>
  );
};
