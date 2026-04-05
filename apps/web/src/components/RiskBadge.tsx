import { RiskLevel } from '../types';

export function RiskBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  return <span className={`risk-badge badge-${riskLevel.toLowerCase()}`}>{riskLevel}</span>;
}
