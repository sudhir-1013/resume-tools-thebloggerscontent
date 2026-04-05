export type AtsAnalysisResult = {
  identifiedTitle?: string;
  alternativeRoles?: string[];
  score?: number;
  analysis?: {
    essentialMissing?: string[];
    valuableMissing?: string[];
    strategicMissing?: string[];
  };
  layoutWarnings?: string[];
  criticalCritique?: string;
  improvementTips?: string[];
};

export type AtsApiSuccess = {
  result: AtsAnalysisResult;
  model: string;
};
