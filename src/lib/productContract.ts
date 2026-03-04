export interface Product {
  id: string;
  slug: string | null;
  name: string | null;
  brand: string | null;
  price_min: number | null;
  price_max: number | null;
  risk_level: string | null;
  score: number | null;
  performance_score: number | null;
  camera_score: number | null;
  battery_score: number | null;
  reliability_score: number | null;
  score_base: number | null;
  score_perf: number | null;
  score_cam: number | null;
  score_batt: number | null;
  weighted_score: number | null;

  reason_1: string | null;
  reason_2: string | null;
  reason_3: string | null;
  issue_green_line: boolean | null;
  issue_heating: boolean | null;
  issue_battery_drain: boolean | null;
  issue_network: boolean | null;
  source_note: string | null;
  last_reviewed: string | null;
  created_at: string | null;

  // Verification & evidence fields (from v_products_ranked)
  verification_score: number | null;
  verification_badge: string | null;
  evidence_summary: string | null;
  source_links: unknown | null;
  last_verified: string | null;

  // Trust badge fields (from v_trust_badge_worldclass_final)
  trust_badge_final: string | null;
  trust_reason_final: string | null;
}

export type Priority = 'balanced' | 'performance' | 'camera' | 'battery' | 'reliability';
export type RiskLevel = 'low' | 'medium' | 'high';
export type VerificationFilter = 'all' | 'verified' | 'verified_plus';

export function safeText(value: string | null | undefined): string {
  return value ?? '—';
}

export function safeNumber(value: number | null | undefined): number {
  return value ?? 0;
}

export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

export function optionalScoreLabel(value: number | null | undefined): string | null {
  return isValidNumber(value) ? String(value) : null;
}

export function normalizeRisk(level: string | null | undefined): RiskLevel {
  const l = (level ?? '').toLowerCase();
  if (l === 'low' || l === 'medium' || l === 'high') return l;
  return 'medium';
}

export function getPriorityScore(product: Product, priority: Priority): number {
  const base = safeNumber(product.score_base);
  const perf = safeNumber(product.score_perf);
  const cam = safeNumber(product.score_cam);
  const batt = safeNumber(product.score_batt);

  switch (priority) {
    case 'performance':
      return Math.round(perf * 0.5 + base * 0.2 + cam * 0.15 + batt * 0.15);
    case 'camera':
      return Math.round(cam * 0.5 + base * 0.2 + perf * 0.15 + batt * 0.15);
    case 'battery':
      return Math.round(batt * 0.5 + base * 0.2 + perf * 0.15 + cam * 0.15);
    case 'reliability':
      return safeNumber(product.reliability_score ?? base);
    case 'balanced':
    default:
      return safeNumber(product.weighted_score ?? base);
  }
}

export function getReasons(product: Product): string[] {
  return [product.reason_1, product.reason_2, product.reason_3]
    .filter((r): r is string => r != null && r.trim() !== '');
}

export function getIssues(product: Product): string[] {
  const issues: string[] = [];
  if (product.issue_green_line) issues.push('Green Line');
  if (product.issue_heating) issues.push('Heating');
  if (product.issue_battery_drain) issues.push('Battery Drain');
  if (product.issue_network) issues.push('Network Issues');
  return issues;
}

export function getVerificationLabel(badge: string | null | undefined): string {
  switch (badge) {
    case 'verified_plus': return 'Verified+';
    case 'verified': return 'Verified';
    default: return 'Unverified';
  }
}

/** Map raw trust_badge_final to a clean human-friendly reason line */
export function humanTrustReason(badge: string | null | undefined): string | null {
  if (!badge) return null;
  const b = badge.trim().toLowerCase();
  if (b.includes('platinum')) return 'Top 10% ranked. Highly stable. Strong verified data.';
  if (b.includes('gold')) return 'High overall score. Stable ranking. Strong evidence.';
  if (b.includes('silver')) return 'Good overall score. Verified data.';
  if (b.includes('standard') || b.includes('bronze')) return 'Meets basic trust criteria.';
  return null;
}

export function getConfidenceLabel(score: number | null | undefined): string {
  const s = score ?? 1;
  if (s >= 3) return 'High Confidence';
  if (s >= 2) return 'Verified';
  return 'Unverified';
}

export function getSourceLinks(links: unknown): string[] {
  if (!links) return [];
  if (Array.isArray(links)) return links.filter((l): l is string => typeof l === 'string');
  return [];
}

export function formatVerifiedDate(date: string | null | undefined): string {
  if (!date) return 'Not verified yet';
  try {
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return 'Not verified yet';
  }
}
