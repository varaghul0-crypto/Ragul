export type RouteId =
  | 'dashboard'
  | 'simulator'
  | 'scam-detector'
  | 'investments'
  | 'loans'
  | 'budget'
  | 'progress'
  | 'privacy';

export type DecisionType = 'SAFE' | 'SUSPICIOUS' | 'SCAM';

export interface Scenario {
  id: string;
  category: 'Phishing' | 'UPI Request' | 'Loan Trap' | 'Job Scam' | 'Legitimate';
  difficulty: 'Low' | 'Medium' | 'High';
  sender: string;
  senderHandle: string;
  message: string;
  amount?: string;
  urgency: 'Low' | 'Moderate' | 'Critical';
  link?: string;
  requestType: string;
  correctDecision: DecisionType;
  explanation: string;
  riskFlags: string[];
}

export interface Challenge {
  id: string;
  code: string;
  title: string;
  category: 'UPI' | 'Phishing' | 'Investments' | 'Loans' | 'Credentials';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  completed: boolean;
  scenario: Scenario;
}

export interface InvestmentOffer {
  id: string;
  title: string;
  pitch: string;
  offeredReturn: string;
  lockIn: string;
  riskFlags: {
    id: string;
    label: string;
    isCorrect: boolean;
    reason: string;
  }[];
  explanation: string;
}

export interface UserProgress {
  safetyScore: number;
  streakDays: number;
  quizAccuracy: number;
  totalAnswered: number;
  totalCorrect: number;
  completedScenarios: string[];
  completedChallenges: string[];
  weakAreas: {
    topic: string;
    status: 'Needs Review' | 'Practicing' | 'Mastered';
    accuracy: number;
  }[];
  activityLog: {
    id: string;
    title: string;
    category: string;
    timestamp: string;
    scoreChange: number;
    passed: boolean;
  }[];
}

export interface ScamSignal {
  id: string;
  name: string;
  detected: boolean;
  severity: 'low' | 'medium' | 'high';
  detail: string;
}

export interface ScamAnalysisReport {
  overallRisk: 'LOW RISK' | 'ELEVATED RISK' | 'HIGH RISK';
  riskScore: number; // 0 to 100
  signals: ScamSignal[];
  verdictSummary: string;
  educationalTakeaway: string;
}
