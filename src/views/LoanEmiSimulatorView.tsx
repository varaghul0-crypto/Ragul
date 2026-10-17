import React, { useState } from 'react';
import {
  Calculator,
  AlertTriangle,
  Info,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { BrutalCard, BrutalButton, BrutalBadge } from '../components/BrutalistUI';
import { LoanBreakdownBar } from '../components/BrutalistCharts';

export const LoanEmiSimulatorView: React.FC = () => {
  // Simulator inputs
  const [principal, setPrincipal] = useState<number>(25000);
  const [annualRate, setAnnualRate] = useState<number>(14);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [processingFeePct, setProcessingFeePct] = useState<number>(3);

  // Quick Preset Scenarios
  const loadPreset = (type: 'laptop' | 'college' | 'predatory') => {
    if (type === 'laptop') {
      setPrincipal(45000);
      setAnnualRate(12);
      setTenureMonths(18);
      setProcessingFeePct(2);
    } else if (type === 'college') {
      setPrincipal(80000);
      setAnnualRate(9.5);
      setTenureMonths(24);
      setProcessingFeePct(1);
    } else if (type === 'predatory') {
      // 7-day instant cash app model
      setPrincipal(3000);
      setAnnualRate(48); // stated nominal
      setTenureMonths(1); // 1 month or fraction
      setProcessingFeePct(18); // ₹540 fee on ₹3000
    }
  };

  // Standard Reducing EMI Formula:
  // EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
  const monthlyRate = annualRate / (12 * 100);
  let emi = 0;
  if (monthlyRate > 0) {
    emi = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1)
    );
  } else {
    emi = Math.round(principal / tenureMonths);
  }

  const totalRepaymentRaw = emi * tenureMonths;
  const totalInterest = Math.max(0, totalRepaymentRaw - principal);
  const processingFeeAmount = Math.round((principal * processingFeePct) / 100);
  const totalCostOfBorrowing = totalInterest + processingFeeAmount;
  const grandTotal = principal + totalCostOfBorrowing;

  // Effective APR calculation
  const totalFeeAndInterestPct = ((totalCostOfBorrowing) / principal) * (12 / tenureMonths) * 100;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="pb-4 border-b-[3.5px] border-[#050505]">
        <div className="flex items-center gap-2 mb-1">
          <BrutalBadge bg="bg-[#F29BB9]">BORROWING MATH LAB</BrutalBadge>
          <span className="font-mono text-xs font-bold text-[#050505]/70">
            Real Cost & Fee Calculator
          </span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#050505] uppercase">
          LOAN & EMI SIMULATOR.
        </h1>
        <p className="font-sans text-sm md:text-base text-[#050505]/80 font-medium">
          Understand monthly EMIs, compound borrowing costs, hidden administrative deductions, and the lethal trap of micro-tenure instant loans.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs font-bold uppercase text-[#050505]">
          Simulate Student Case:
        </span>
        <button
          onClick={() => loadPreset('laptop')}
          className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#050505] bg-white shadow-[2px_2px_0px_#050505] hover:bg-[#FFF36A] active:translate-x-0.5 active:translate-y-0.5"
        >
          💻 Laptop Purchase (₹45k / 18 mo)
        </button>
        <button
          onClick={() => loadPreset('college')}
          className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-[#050505] bg-white shadow-[2px_2px_0px_#050505] hover:bg-[#FFF36A] active:translate-x-0.5 active:translate-y-0.5"
        >
          🎓 Semester Fee Bridge (₹80k / 24 mo)
        </button>
        <button
          onClick={() => loadPreset('predatory')}
          className="font-mono text-xs font-black px-3 py-1.5 border-2 border-[#050505] bg-[#ff6b6b] shadow-[2px_2px_0px_#050505] hover:bg-[#fa5252] active:translate-x-0.5 active:translate-y-0.5"
        >
          ⚠️ Predatory Instant App (₹3k Trap)
        </button>
      </div>

      {/* Interactive Two-Column Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-xl text-[#050505] uppercase">
                Loan Parameters.
              </span>
              <span className="font-mono text-xs font-bold bg-[#8FD5E8] px-2 py-0.5 border border-[#050505]">
                INTERACTIVE CONTROLS
              </span>
            </div>

            {/* Slider 1: Principal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-[#050505] uppercase">Principal Amount:</span>
                <span className="bg-white px-2 py-0.5 border-2 border-[#050505] font-black text-sm">
                  ₹{principal.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={150000}
                step={1000}
                value={principal}
                onChange={e => setPrincipal(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#050505]/70">
                <span>₹1,000</span>
                <span>₹75,000</span>
                <span>₹1,50,000</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-[#050505] uppercase">Annual Interest Rate (% p.a.):</span>
                <span className="bg-white px-2 py-0.5 border-2 border-[#050505] font-black text-sm">
                  {annualRate}%
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={48}
                step={0.5}
                value={annualRate}
                onChange={e => setAnnualRate(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#050505]/70">
                <span>1% (Subsidized)</span>
                <span>14% (Bank/NBFC)</span>
                <span>48% (High-Risk Card/Fintech)</span>
              </div>
            </div>

            {/* Slider 3: Tenure Months */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-[#050505] uppercase">Repayment Tenure (Months):</span>
                <span className="bg-white px-2 py-0.5 border-2 border-[#050505] font-black text-sm">
                  {tenureMonths} Months
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={36}
                step={1}
                value={tenureMonths}
                onChange={e => setTenureMonths(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#050505]/70">
                <span>1 Month</span>
                <span>12 Months</span>
                <span>36 Months</span>
              </div>
            </div>

            {/* Slider 4: Processing Fee */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold">
                <span className="text-[#050505] uppercase">Upfront Processing Fee:</span>
                <span className="bg-white px-2 py-0.5 border-2 border-[#050505] font-black text-sm">
                  {processingFeePct}% (₹{processingFeeAmount.toLocaleString()})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={processingFeePct}
                onChange={e => setProcessingFeePct(Number(e.target.value))}
                className="w-full accent-[#050505] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#050505]/70">
                <span>0%</span>
                <span>3% (Standard)</span>
                <span>20% (Predatory deduction)</span>
              </div>
            </div>
          </BrutalCard>
        </div>

        {/* Output & Breakdown Column */}
        <div className="lg:col-span-6 space-y-5">
          <BrutalCard bg="bg-[#FFF8E8]" className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#050505]">
              <span className="font-heading font-black text-xl text-[#050505] uppercase">
                Calculation Output.
              </span>
              <span className="font-mono text-xs font-bold bg-[#91E2B9] px-2 py-0.5 border border-[#050505]">
                LIVE REPAYMENT TOTALS
              </span>
            </div>

            {/* Primary Big Metric: Monthly EMI */}
            <div className="border-[3.5px] border-[#050505] bg-[#91E2B9] p-5 shadow-[6px_6px_0px_#050505]">
              <div className="font-mono text-xs font-black uppercase tracking-wider text-[#050505]">
                Estimated Monthly EMI
              </div>
              <div className="font-heading font-black text-4xl md:text-5xl text-[#050505] tabular-nums mt-1">
                ₹{emi.toLocaleString()}
                <span className="text-sm font-mono font-bold opacity-75"> / month</span>
              </div>
            </div>

            {/* Detailed Totals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="border-2 border-[#050505] bg-white p-3 shadow-[3px_3px_0px_#050505]">
                <div className="font-mono text-[10px] font-bold uppercase text-[#050505]/70">
                  Total Interest
                </div>
                <div className="font-heading font-black text-xl text-[#050505] tabular-nums mt-0.5">
                  ₹{totalInterest.toLocaleString()}
                </div>
              </div>

              <div className="border-2 border-[#050505] bg-white p-3 shadow-[3px_3px_0px_#050505]">
                <div className="font-mono text-[10px] font-bold uppercase text-[#050505]/70">
                  Processing Fee
                </div>
                <div className="font-heading font-black text-xl text-[#050505] tabular-nums mt-0.5">
                  ₹{processingFeeAmount.toLocaleString()}
                </div>
              </div>

              <div className="border-2 border-[#050505] bg-white p-3 shadow-[3px_3px_0px_#050505] col-span-2 sm:col-span-1">
                <div className="font-mono text-[10px] font-bold uppercase text-[#050505]/70">
                  Total Repaid
                </div>
                <div className="font-heading font-black text-xl text-[#050505] tabular-nums mt-0.5">
                  ₹{grandTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Visual Breakdown Bar Chart */}
            <div className="space-y-2 pt-2">
              <div className="font-mono text-xs font-black uppercase text-[#050505]">
                Where Does Your Repayment Go?
              </div>
              <LoanBreakdownBar
                principal={principal}
                interest={totalInterest}
                fees={processingFeeAmount}
              />
            </div>

            {/* Educational Insight as requested in prompt */}
            <div className="border-[3px] border-[#050505] bg-[#FFC39D] p-4 shadow-[4px_4px_0px_#050505] space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-xs font-black uppercase text-[#050505]">
                <Info className="w-4 h-4 text-[#050505]" />
                Tenure & Cost Paradox:
              </div>
              <p className="font-sans text-xs md:text-sm font-bold text-[#050505] leading-relaxed">
                “Longer tenure can reduce the monthly payment while dramatically increasing total interest paid over time.”
              </p>
              <p className="font-sans text-xs text-[#050505]/85 font-medium pt-1">
                For example, stretching this loan from 12 to 36 months lowers monthly burden but multiplies cumulative interest payments!
              </p>
            </div>
          </BrutalCard>
        </div>
      </div>
    </div>
  );
};
