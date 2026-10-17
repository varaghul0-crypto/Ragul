import React from 'react';

interface ScoreTrendChartProps {
  score: number;
}

export const ScoreTrendChart: React.FC<ScoreTrendChartProps> = ({ score }) => {
  // 6 historical simulated points ending with the current score
  const points = [62, 68, 71, 74, 78, score];
  const width = 360;
  const height = 110;
  const paddingX = 24;
  const paddingY = 16;

  const minVal = 50;
  const maxVal = 100;

  const getCoordinates = (val: number, idx: number) => {
    const x = paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y };
  };

  const coords = points.map((p, idx) => getCoordinates(p, idx));

  // Build SVG path
  const pathD = coords.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    return `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Fill area under path
  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;

  return (
    <div className="w-full">
      <div className="border-[3px] border-[#050505] bg-[#FFF8E8] p-3 shadow-[4px_4px_0px_#050505]">
        <div className="flex items-center justify-between mb-2 pb-1 border-b-2 border-[#050505]">
          <span className="font-mono text-xs font-bold uppercase text-[#050505]">6-Week Resilience Trend</span>
          <span className="font-mono text-xs font-bold text-[#050505] bg-[#91E2B9] px-2 py-0.5 border border-[#050505]">
            +12% Gain
          </span>
        </div>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-24 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#050505"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.3"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#050505"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.3"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#050505"
            strokeWidth="2"
          />

          {/* Shaded Area */}
          <path d={areaD} fill="#8FD5E8" fillOpacity="0.45" />

          {/* Upward Line */}
          <path
            d={pathD}
            stroke="#050505"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {coords.map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y} r={i === coords.length - 1 ? 6 : 4.5} fill="#FFF36A" stroke="#050505" strokeWidth="2.5" />
              {i === coords.length - 1 && (
                <text
                  x={c.x}
                  y={c.y - 10}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-bold fill-[#050505]"
                >
                  {score}
                </text>
              )}
            </g>
          ))}
        </svg>
        <div className="flex justify-between font-mono text-[10px] text-[#050505] font-bold mt-1 px-2 opacity-80">
          <span>Wk 1</span>
          <span>Wk 2</span>
          <span>Wk 3</span>
          <span>Wk 4</span>
          <span>Wk 5</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
};

interface LoanBreakdownBarProps {
  principal: number;
  interest: number;
  fees: number;
}

export const LoanBreakdownBar: React.FC<LoanBreakdownBarProps> = ({ principal, interest, fees }) => {
  const total = principal + interest + fees;
  const pPct = total > 0 ? (principal / total) * 100 : 0;
  const iPct = total > 0 ? (interest / total) * 100 : 0;
  const fPct = total > 0 ? (fees / total) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="h-9 w-full border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] flex overflow-hidden bg-[#FFF8E8]">
        {pPct > 0 && (
          <div
            style={{ width: `${pPct}%` }}
            className="bg-[#91E2B9] h-full flex items-center justify-center border-r-[2px] border-[#050505] transition-all duration-200"
            title={`Principal: ${pPct.toFixed(1)}%`}
          >
            {pPct > 15 && (
              <span className="font-mono text-xs font-black text-[#050505] truncate px-1">
                {pPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
        {iPct > 0 && (
          <div
            style={{ width: `${iPct}%` }}
            className="bg-[#FFC39D] h-full flex items-center justify-center border-r-[2px] border-[#050505] transition-all duration-200"
            title={`Interest: ${iPct.toFixed(1)}%`}
          >
            {iPct > 12 && (
              <span className="font-mono text-xs font-black text-[#050505] truncate px-1">
                {iPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
        {fPct > 0 && (
          <div
            style={{ width: `${fPct}%` }}
            className="bg-[#F29BB9] h-full flex items-center justify-center transition-all duration-200"
            title={`Fees: ${fPct.toFixed(1)}%`}
          >
            {fPct > 10 && (
              <span className="font-mono text-xs font-black text-[#050505] truncate px-1">
                {fPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 font-mono text-xs font-bold">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#91E2B9] border-2 border-[#050505] inline-block shrink-0"></span>
          <span className="truncate">Principal: ₹{principal.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#FFC39D] border-2 border-[#050505] inline-block shrink-0"></span>
          <span className="truncate">Interest: ₹{interest.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#F29BB9] border-2 border-[#050505] inline-block shrink-0"></span>
          <span className="truncate">Fees: ₹{fees.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

interface BudgetAllocationBarProps {
  needs: number;
  wants: number;
  savings: number;
  buffer: number;
  totalIncome: number;
}

export const BudgetAllocationBar: React.FC<BudgetAllocationBarProps> = ({
  needs,
  wants,
  savings,
  buffer,
  totalIncome,
}) => {
  const allocated = needs + wants + savings + buffer;
  const base = Math.max(allocated, totalIncome, 1);

  const nPct = (needs / base) * 100;
  const wPct = (wants / base) * 100;
  const sPct = (savings / base) * 100;
  const bPct = (buffer / base) * 100;

  return (
    <div className="space-y-3">
      <div className="h-9 w-full border-[3px] border-[#050505] shadow-[4px_4px_0px_#050505] flex overflow-hidden bg-[#FFF8E8]">
        {nPct > 0 && (
          <div
            style={{ width: `${nPct}%` }}
            className="bg-[#8FD5E8] h-full flex items-center justify-center border-r-[2px] border-[#050505] transition-all duration-200"
            title="Needs"
          >
            {nPct > 12 && (
              <span className="font-mono text-xs font-black text-[#050505]">
                {nPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
        {wPct > 0 && (
          <div
            style={{ width: `${wPct}%` }}
            className="bg-[#FFC39D] h-full flex items-center justify-center border-r-[2px] border-[#050505] transition-all duration-200"
            title="Wants"
          >
            {wPct > 12 && (
              <span className="font-mono text-xs font-black text-[#050505]">
                {wPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
        {sPct > 0 && (
          <div
            style={{ width: `${sPct}%` }}
            className="bg-[#91E2B9] h-full flex items-center justify-center border-r-[2px] border-[#050505] transition-all duration-200"
            title="Savings"
          >
            {sPct > 10 && (
              <span className="font-mono text-xs font-black text-[#050505]">
                {sPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
        {bPct > 0 && (
          <div
            style={{ width: `${bPct}%` }}
            className="bg-[#FFF36A] h-full flex items-center justify-center transition-all duration-200"
            title="Emergency Buffer"
          >
            {bPct > 8 && (
              <span className="font-mono text-xs font-black text-[#050505]">
                {bPct.toFixed(0)}%
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs font-bold">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#8FD5E8] border-2 border-[#050505] inline-block"></span>
          <span>Needs (₹{needs.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#FFC39D] border-2 border-[#050505] inline-block"></span>
          <span>Wants (₹{wants.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#91E2B9] border-2 border-[#050505] inline-block"></span>
          <span>Savings (₹{savings.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#FFF36A] border-2 border-[#050505] inline-block"></span>
          <span>Buffer (₹{buffer.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
};
