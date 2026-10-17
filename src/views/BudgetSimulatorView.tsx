import React, { useState } from 'react';
import {
  PieChart,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';
import { BudgetAllocationBar } from '../components/BrutalistCharts';

export const BudgetSimulatorView: React.FC = () => {
  // Student monthly stipend
  const [monthlyIncome, setMonthlyIncome] = useState<number>(15000);

  // Allocations in INR
  const [needs, setNeeds] = useState<number>(7500); // 50%
  const [wants, setWants] = useState<number>(4500); // 30%
  const [savings, setSavings] = useState<number>(2000); // ~13%
  const [emergencyBuffer, setEmergencyBuffer] = useState<number>(1000); // ~7%

  // Stress test modal/message
  const [stressEvent, setStressEvent] = useState<{
    active: boolean;
    name: string;
    cost: number;
    passed: boolean;
    message: string;
  } | null>(null);

  const totalAllocated = needs + wants + savings + emergencyBuffer;
  const remaining = monthlyIncome - totalAllocated;

  const savingsRate = monthlyIncome > 0 ? ((savings + emergencyBuffer) / monthlyIncome) * 100 : 0;
  const needsPct = monthlyIncome > 0 ? (needs / monthlyIncome) * 100 : 0;

  // Status calculation
  let status: 'BALANCED' | 'NEEDS REVIEW' | 'OVER ALLOCATED' = 'BALANCED';
  let statusColor = 'bg-[#91E2B9]';
  let statusDesc = 'Well-structured budget aligned with 50/30/20 student resilience guidelines.';

  if (totalAllocated > monthlyIncome) {
    status = 'OVER ALLOCATED';
    statusColor = 'bg-[#ff6b6b]';
    statusDesc = `You have over-allocated ₹${Math.abs(remaining).toLocaleString()} beyond your stipend! Deficits lead to predatory borrowing.`;
  } else if (remaining > monthlyIncome * 0.15) {
    status = 'NEEDS REVIEW';
    statusColor = 'bg-[#FFF36A]';
    statusDesc = `₹${remaining.toLocaleString()} unassigned! Unbudgeted money evaporates easily. Assign it to Emergency Buffer or Savings.`;
  } else if (emergencyBuffer < monthlyIncome * 0.05) {
    status = 'NEEDS REVIEW';
    statusColor = 'bg-[#FFF36A]';
    statusDesc = 'Emergency Buffer is under 5%. Even a small surprise expense will force debt.';
  }

  // Preset 50/30/20 auto-balancer
  const applyRecommendedSplit = () => {
    setNeeds(Math.round(monthlyIncome * 0.5));
    setWants(Math.round(monthlyIncome * 0.3));
    setSavings(Math.round(monthlyIncome * 0.12));
    setEmergencyBuffer(Math.round(monthlyIncome * 0.08));
    setStressEvent(null);
  };

  const runStressTest = (type: 'phone' | 'exam' | 'medical') => {
    let cost = 3000;
    let name = 'Broken Phone Screen Repair';
    if (type === 'exam') {
      cost = 1800;
      name = 'Unexpected Special Lab & Fieldwork Materials';
    } else if (type === 'medical') {
      cost = 4500;
      name = 'Emergency Clinic & Prescription Fee';
    }

    const passed = emergencyBuffer >= cost;
    setStressEvent({
      active: true,
      name,
      cost,
      passed,
      message: passed
        ? `SUCCESS! Your Emergency Buffer (₹${emergencyBuffer.toLocaleString()}) absorbed the ₹${cost.toLocaleString()} surprise without touching needs or taking loans.`
        : `VULNERABILITY! Your Buffer (₹${emergencyBuffer.toLocaleString()}) fell short by ₹${(cost - emergencyBuffer).toLocaleString()}. Students in this gap often fall for predatory 7-day loan apps!`,
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="pb-4 border-b-[3.5px] border-[#050505]">
        <div className="flex items-center gap-2 mb-1">
          <BrutalBadge bg="bg-[#91E2B9]">PLAYFUL BUDGET ALLOCATOR</BrutalBadge>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            50 / 30 / 20 Student Framework
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
          BUDGET SIMULATOR.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
          Practice balancing living costs, social campus life, long-term reserves, and stress-testing surprise emergencies.
        </p>
      </div>

      {/* Main Income Setup Card */}
      <div className="border-[3.5px] border-[#050505] bg-[#FFF8E8] p-5 shadow-[6px_6px_0px_#050505] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold uppercase text-[#050505]/70">
            Monthly Student Inflow (Allowance / Stipend / Gig)
          </span>
          <div className="flex items-center gap-3">
            <span className="font-heading font-black text-3xl md:text-4xl text-[#050505] tabular-nums">
              ₹{monthlyIncome.toLocaleString()}
            </span>
            <button
              onClick={applyRecommendedSplit}
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#050505] bg-[#FFF36A] shadow-[2px_2px_0px_#050505] hover:bg-[#ffea40] active:translate-x-0.5 active:translate-y-0.5"
            >
              ⚡ Auto 50/30/20 Split
            </button>
          </div>
        </div>

        <div className="w-full md:w-72 space-y-1">
          <div className="flex justify-between font-mono text-xs font-bold">
            <span>Adjust Inflow:</span>
            <span>₹{monthlyIncome.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={5000}
            max={40000}
            step={500}
            value={monthlyIncome}
            onChange={e => {
              const val = Number(e.target.value);
              setMonthlyIncome(val);
            }}
            className="w-full accent-[#050505] cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[10px] text-[#050505]/70">
            <span>₹5,000</span>
            <span>₹20,000</span>
            <span>₹40,000</span>
          </div>
        </div>
      </div>

      {/* Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-5">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-xl text-[#050505] uppercase">
                Category Allocations.
              </span>
              <span className="font-mono text-xs font-bold bg-[#8FD5E8] px-2 py-0.5 border border-[#050505]">
                DRAG SLIDERS
              </span>
            </div>

            {/* Category 1: Needs */}
            <div className="border-2 border-[#050505] p-3.5 bg-white shadow-[3px_3px_0px_#050505] space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#050505]">
                  <span className="w-3 h-3 bg-[#8FD5E8] border border-[#050505]"></span>
                  NEEDS (Hostel, Mess, Transit, Books)
                </span>
                <span className="font-black bg-[#8FD5E8] px-2 py-0.5 border border-[#050505]">
                  ₹{needs.toLocaleString()} ({((needs / monthlyIncome) * 100).toFixed(0)}%)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={monthlyIncome}
                step={250}
                value={needs}
                onChange={e => setNeeds(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
            </div>

            {/* Category 2: Wants */}
            <div className="border-2 border-[#050505] p-3.5 bg-white shadow-[3px_3px_0px_#050505] space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#050505]">
                  <span className="w-3 h-3 bg-[#FFC39D] border border-[#050505]"></span>
                  WANTS (Cafes, Streaming, Outings, Gear)
                </span>
                <span className="font-black bg-[#FFC39D] px-2 py-0.5 border border-[#050505]">
                  ₹{wants.toLocaleString()} ({((wants / monthlyIncome) * 100).toFixed(0)}%)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={monthlyIncome}
                step={250}
                value={wants}
                onChange={e => setWants(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
            </div>

            {/* Category 3: Savings */}
            <div className="border-2 border-[#050505] p-3.5 bg-white shadow-[3px_3px_0px_#050505] space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#050505]">
                  <span className="w-3 h-3 bg-[#91E2B9] border border-[#050505]"></span>
                  SAVINGS (Certifications, Future Projects)
                </span>
                <span className="font-black bg-[#91E2B9] px-2 py-0.5 border border-[#050505]">
                  ₹{savings.toLocaleString()} ({((savings / monthlyIncome) * 100).toFixed(0)}%)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={monthlyIncome}
                step={250}
                value={savings}
                onChange={e => setSavings(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
            </div>

            {/* Category 4: Emergency Buffer */}
            <div className="border-2 border-[#050505] p-3.5 bg-white shadow-[3px_3px_0px_#050505] space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#050505]">
                  <span className="w-3 h-3 bg-[#FFF36A] border border-[#050505]"></span>
                  EMERGENCY BUFFER (Surprise Repairs, Meds)
                </span>
                <span className="font-black bg-[#FFF36A] px-2 py-0.5 border border-[#050505]">
                  ₹{emergencyBuffer.toLocaleString()} ({((emergencyBuffer / monthlyIncome) * 100).toFixed(0)}%)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={monthlyIncome}
                step={250}
                value={emergencyBuffer}
                onChange={e => setEmergencyBuffer(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
            </div>

            {/* Visual allocation bar */}
            <div className="pt-2">
              <div className="font-mono text-xs font-bold uppercase text-[#050505] mb-2">
                Allocation Proportions:
              </div>
              <BudgetAllocationBar
                needs={needs}
                wants={wants}
                savings={savings}
                buffer={emergencyBuffer}
                totalIncome={monthlyIncome}
              />
            </div>
          </BrutalCard>
        </div>

        {/* Dashboard Status & Stress Test Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Status Card */}
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-xl text-[#050505] uppercase">
                Budget Status.
              </span>
              <div
                className={`font-mono text-xs font-black uppercase px-2.5 py-1 border-2 border-[#050505] shadow-[2px_2px_0px_#050505] ${statusColor} text-[#050505]`}
              >
                {status}
              </div>
            </div>

            <p className="font-sans text-xs md:text-sm font-bold text-[#050505] leading-snug">
              {statusDesc}
            </p>

            {/* Summary Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="border-2 border-[#050505] bg-white p-3 shadow-[2.5px_2.5px_0px_#050505]">
                <div className="font-mono text-[10px] font-bold uppercase text-[#050505]/70">
                  Remaining Balance
                </div>
                <div
                  className={`font-heading font-black text-xl tabular-nums ${
                    remaining < 0 ? 'text-red-600' : 'text-[#050505]'
                  }`}
                >
                  ₹{remaining.toLocaleString()}
                </div>
              </div>

              <div className="border-2 border-[#050505] bg-white p-3 shadow-[2.5px_2.5px_0px_#050505]">
                <div className="font-mono text-[10px] font-bold uppercase text-[#050505]/70">
                  Total Reserve Rate
                </div>
                <div className="font-heading font-black text-xl text-[#050505] tabular-nums">
                  {savingsRate.toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Gamified Stress-Test Block */}
            <div className="border-[3px] border-[#050505] bg-[#FFF36A] p-4 shadow-[4px_4px_0px_#050505] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-black uppercase text-[#050505]">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#050505]" />
                  Simulate Surprise Shock:
                </span>
                <span className="text-[10px] bg-[#050505] text-[#FFF8E8] px-1.5 py-0.5">
                  STRESS TEST
                </span>
              </div>

              <p className="font-sans text-xs font-bold text-[#050505]">
                Will your Emergency Buffer protect you from falling into panic loans?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => runStressTest('phone')}
                  className="p-2 border-2 border-[#050505] bg-white font-mono text-[11px] font-bold shadow-[2px_2px_0px_#050505] hover:bg-[#8FD5E8] active:translate-x-0.5 active:translate-y-0.5"
                >
                  📱 Phone Fix (₹3k)
                </button>
                <button
                  onClick={() => runStressTest('exam')}
                  className="p-2 border-2 border-[#050505] bg-white font-mono text-[11px] font-bold shadow-[2px_2px_0px_#050505] hover:bg-[#8FD5E8] active:translate-x-0.5 active:translate-y-0.5"
                >
                  🔬 Lab Gear (₹1.8k)
                </button>
                <button
                  onClick={() => runStressTest('medical')}
                  className="p-2 border-2 border-[#050505] bg-white font-mono text-[11px] font-bold shadow-[2px_2px_0px_#050505] hover:bg-[#8FD5E8] active:translate-x-0.5 active:translate-y-0.5"
                >
                  🏥 Clinic Bill (₹4.5k)
                </button>
              </div>

              {/* Stress Test Outcome Callout */}
              {stressEvent && (
                <div
                  className={`p-3 border-2 border-[#050505] shadow-[3px_3px_0px_#050505] space-y-1 ${
                    stressEvent.passed ? 'bg-[#91E2B9]' : 'bg-[#ff6b6b]'
                  }`}
                >
                  <div className="font-mono text-xs font-black uppercase text-[#050505] flex items-center justify-between">
                    <span>{stressEvent.name}</span>
                    <span>Cost: ₹{stressEvent.cost.toLocaleString()}</span>
                  </div>
                  <p className="font-sans text-xs font-bold text-[#050505] leading-snug">
                    {stressEvent.message}
                  </p>
                </div>
              )}
            </div>
          </BrutalCard>
        </div>
      </div>
    </div>
  );
};
