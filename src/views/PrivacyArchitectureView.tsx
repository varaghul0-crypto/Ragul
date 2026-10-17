import React from 'react';
import {
  Lock,
  ShieldCheck,
  Server,
  Database,
  ArrowRight,
  CheckCircle,
  FileCheck2,
  XCircle,
  Cpu,
  Layers,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';

export const PrivacyArchitectureView: React.FC = () => {
  const commitments = [
    {
      title: 'No Real Banking Credentials',
      desc: 'No passwords, netbanking IDs, or debit card tokens are ever prompted, accepted, or stored.',
    },
    {
      title: 'No Real OTP / Secret Ingestion',
      desc: 'The app never provides an input for real two-factor SMS or authenticator codes.',
    },
    {
      title: 'Zero PIN Collection',
      desc: 'UPI PINs and ATM PINs are strictly prohibited in code and simulated inputs.',
    },
    {
      title: 'No Live Banking API Dependency',
      desc: 'Operates completely decoupled from actual payment rails, Open Banking APIs, or aggregators.',
    },
    {
      title: '100% Synthetic Scenarios',
      desc: 'All cases, senders, amounts, and account numbers are fictional educational constructs.',
    },
    {
      title: 'Local Progress Storage Only',
      desc: 'Only score tallies and completed scenario checkmarks are stored locally in the student browser session.',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="pb-4 border-b-[3.5px] border-[#050505]">
        <div className="flex items-center gap-2 mb-1">
          <BrutalBadge bg="bg-[#8FD5E8]">SYSTEM ARCHITECTURE SPECIFICATION</BrutalBadge>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            Audit Document v1.0
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
          THE PRIVACY-FIRST ARCHITECTURE.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
          A blueprint designed from the ground up to eliminate personal financial exposure and prevent data harvesting.
        </p>
      </div>

      {/* Massive Brutalist Hero Manifesto Poster */}
      <div className="border-[4px] border-[#050505] bg-[#FFF36A] p-6 md:p-10 shadow-[10px_10px_0px_#050505] text-center space-y-3">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-widest bg-[#050505] text-[#FFF8E8] px-3 py-1">
          <Lock className="w-3.5 h-3.5" /> GUARANTEED INVARIANT
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#050505] uppercase tracking-tight leading-none">
          ZERO PERSONAL FINANCIAL DATA RETENTION. BY DESIGN.
        </h2>

        <p className="font-sans text-sm md:text-lg font-bold text-[#050505] max-w-3xl mx-auto leading-relaxed pt-2">
          FinSafe Campus is not a financial aggregator or banking app. It has no pipes to payment gateways,
          stores zero account balances, and evaluates inputs solely through client-side educational heuristics.
        </p>
      </div>

      {/* Technical Architecture Flow: Frontend -> Engine -> Database */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-black uppercase tracking-wider text-[#050505]">
            DATA PIPELINE SPECIFICATION
          </span>
          <span className="font-mono text-xs font-bold bg-[#91E2B9] px-2 py-0.5 border border-[#050505]">
            ISOLATED SANDBOX
          </span>
        </div>

        {/* 3 Massive Cards with Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Card 1: FRONTEND */}
          <div className="border-[3.5px] border-[#050505] bg-[#8FD5E8] p-6 shadow-[8px_8px_0px_#050505] rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505] mb-3">
                <span className="font-mono text-xs font-black uppercase text-[#050505]">
                  TIER 01 / CLIENT
                </span>
                <span className="w-6 h-6 rounded-full bg-[#050505] text-[#FFF8E8] flex items-center justify-center font-mono text-xs font-bold">
                  1
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl text-[#050505] mb-1">
                FRONTEND
              </h3>
              <div className="font-mono text-xs font-bold uppercase text-[#050505] mb-3">
                Stateless Simulator UI.
              </div>

              <p className="font-sans text-sm text-[#050505]/90 font-medium leading-relaxed">
                Renders mock phishing messages, interactive budget sliders, and scenario cards.
                Never requests bank credentials, OTP tokens, or real UPI handles.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-[#050505] font-mono text-xs font-bold text-[#050505] flex items-center justify-between">
              <span>Execution: Browser Sandbox</span>
              <ArrowRight className="w-4 h-4 stroke-[3] md:hidden" />
            </div>
          </div>

          {/* Card 2: ENGINE */}
          <div className="border-[3.5px] border-[#050505] bg-[#FFC39D] p-6 shadow-[8px_8px_0px_#050505] rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505] mb-3">
                <span className="font-mono text-xs font-black uppercase text-[#050505]">
                  TIER 02 / LOGIC
                </span>
                <span className="w-6 h-6 rounded-full bg-[#050505] text-[#FFF8E8] flex items-center justify-center font-mono text-xs font-bold">
                  2
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl text-[#050505] mb-1">
                ENGINE
              </h3>
              <div className="font-mono text-xs font-bold uppercase text-[#050505] mb-3">
                Educational Ruleset.
              </div>

              <p className="font-sans text-sm text-[#050505]/90 font-medium leading-relaxed">
                Evaluates message text for known scam signatures: urgency pressure, fake domains,
                and fee extortion. Zero data leaves your browser tab during heuristic scans.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-[#050505] font-mono text-xs font-bold text-[#050505] flex items-center justify-between">
              <span>Rule Engine: In-Memory / Heuristic</span>
              <ArrowRight className="w-4 h-4 stroke-[3] md:hidden" />
            </div>
          </div>

          {/* Card 3: DATABASE */}
          <div className="border-[3.5px] border-[#050505] bg-[#91E2B9] p-6 shadow-[8px_8px_0px_#050505] rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505] mb-3">
                <span className="font-mono text-xs font-black uppercase text-[#050505]">
                  TIER 03 / STORAGE
                </span>
                <span className="w-6 h-6 rounded-full bg-[#050505] text-[#FFF8E8] flex items-center justify-center font-mono text-xs font-bold">
                  3
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl text-[#050505] mb-1">
                DATABASE
              </h3>
              <div className="font-mono text-xs font-bold uppercase text-[#050505] mb-3">
                Progress Storage Only.
              </div>

              <p className="font-sans text-sm text-[#050505]/90 font-medium leading-relaxed">
                Retains purely benign gamification telemetry: quiz accuracy, milestone achievements,
                and safety score. Absolutely zero PII or financial history.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-[#050505] font-mono text-xs font-bold text-[#050505]">
              <span>Storage: Harmless Session Cache</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Explicit Security & Privacy Commitments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-black text-2xl md:text-3xl text-[#050505] uppercase">
            6 Immutable Privacy Invariants.
          </h3>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            Security Checklist
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {commitments.map((c, i) => (
            <div
              key={i}
              className="border-[3px] border-[#050505] bg-[#FFF8E8] p-5 shadow-[5px_5px_0px_#050505] space-y-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#050505] shrink-0" />
                <span className="font-heading font-black text-base text-[#050505]">
                  {c.title}
                </span>
              </div>
              <p className="font-sans text-xs md:text-sm text-[#050505]/85 font-medium leading-relaxed">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
