import React from 'react';

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bg?: string; // hex or tailwind class
  className?: string;
  hoverable?: boolean;
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  bg = 'bg-[#FFF8E8]',
  className = '',
  hoverable = true,
  ...props
}) => {
  return (
    <div
      className={`border-[3.5px] border-[#050505] shadow-[8px_8px_0px_#050505] rounded-xl p-5 md:p-6 transition-all duration-150 ${
        hoverable ? 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0px_#050505]' : ''
      } ${bg} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'peach' | 'cyan' | 'mint' | 'pink' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#050505] text-[#FFF8E8] hover:bg-[#1f1f1f]',
    secondary: 'bg-[#FFF8E8] text-[#050505] hover:bg-[#f2ece0]',
    yellow: 'bg-[#FFF36A] text-[#050505] hover:bg-[#faee52]',
    peach: 'bg-[#FFC39D] text-[#050505] hover:bg-[#f7b489]',
    cyan: 'bg-[#8FD5E8] text-[#050505] hover:bg-[#7ac7db]',
    mint: 'bg-[#91E2B9] text-[#050505] hover:bg-[#7ddba8]',
    pink: 'bg-[#F29BB9] text-[#050505] hover:bg-[#ec84a7]',
    danger: 'bg-[#ff6b6b] text-[#050505] hover:bg-[#fa5555]',
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }[size];

  return (
    <button
      disabled={disabled}
      className={`border-[3px] border-[#050505] shadow-[5px_5px_0px_#050505] font-mono font-bold uppercase tracking-wider transition-all duration-120 active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_#050505] ${
        disabled
          ? 'opacity-50 cursor-not-allowed shadow-[2px_2px_0px_#050505]'
          : 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_#050505]'
      } ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const BrutalBadge: React.FC<{
  children: React.ReactNode;
  bg?: string;
  className?: string;
}> = ({ children, bg = 'bg-[#FFF36A]', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wide border-2 border-[#050505] shadow-[2.5px_2.5px_0px_#050505] text-[#050505] ${bg} ${className}`}
    >
      {children}
    </span>
  );
};

export const RiskStamp: React.FC<{
  risk: 'HIGH RISK' | 'ELEVATED RISK' | 'LOW RISK';
}> = ({ risk }) => {
  if (risk === 'HIGH RISK') {
    return (
      <div className="inline-block border-[4px] border-[#050505] bg-[#ff6b6b] px-4 py-2 font-mono font-black text-sm md:text-base uppercase tracking-widest text-[#050505] shadow-[6px_6px_0px_#050505] rotate-[-1.5deg]">
        [ HIGH EDUCATIONAL RISK — DETECTED ]
      </div>
    );
  }
  if (risk === 'ELEVATED RISK') {
    return (
      <div className="inline-block border-[4px] border-[#050505] bg-[#FFF36A] px-4 py-2 font-mono font-black text-sm md:text-base uppercase tracking-widest text-[#050505] shadow-[6px_6px_0px_#050505] rotate-[1deg]">
        [ CAUTION — ELEVATED SUSPICION ]
      </div>
    );
  }
  return (
    <div className="inline-block border-[4px] border-[#050505] bg-[#91E2B9] px-4 py-2 font-mono font-black text-sm md:text-base uppercase tracking-widest text-[#050505] shadow-[6px_6px_0px_#050505] rotate-[-0.5deg]">
      [ LOW RISK — VERIFIED PATTERN ]
    </div>
  );
};
