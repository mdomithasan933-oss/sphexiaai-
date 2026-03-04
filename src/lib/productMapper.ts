type AnyRow = Record<string, any>;

function pickNumber(...vals: any[]): number | null {
  for (const v of vals) {
    const n = typeof v === 'number' ? v : v != null ? Number(v) : NaN;
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function pickText(...vals: any[]): string | null {
  for (const v of vals) {
    if (typeof v === 'string' && v.trim() !== '') return v;
  }
  return null;
}

function pickBool(...vals: any[]): boolean | null {
  for (const v of vals) {
    if (typeof v === 'boolean') return v;
  }
  return null;
}

/**
 * DB row -> UI-friendly product object
 * This mapper is intentionally tolerant: it supports either column naming style.
 * So future DB/view changes won't break Results/Compare.
 */
export function mapProductFromDB(p: AnyRow) {
  return {
    // identity
    id: pickText(p.id) ?? null,
    slug: pickText(p.slug) ?? null,
    name: pickText(p.name) ?? null,
    brand: pickText(p.brand) ?? null,

    // price
    price_min: pickNumber(p.price_min) ?? null,
    price_max: pickNumber(p.price_max) ?? null,

    // trust / risk (support both column styles)
    risk_level: pickText(p.risk_level) ?? null,
    risk_badge: pickText(p.risk_badge, p.risk_level) ?? null,

    verification_score: pickNumber(p.verification_score) ?? null,
    last_verified: pickText(p.last_verified) ?? null,

    trust_score: pickNumber(p.trust_score) ?? null,
    trust_pct: pickNumber(p.trust_pct, p.trust_score) ?? null,

    // scores (support both column styles)
    score_overall: pickNumber(p.score_overall, p.final_score) ?? null,
    final_score: pickNumber(p.final_score, p.score_overall) ?? null,
    weighted_score: pickNumber(p.weighted_score) ?? null,

    score_perf: pickNumber(p.score_perf) ?? null,
    score_cam: pickNumber(p.score_cam) ?? null,
    score_batt: pickNumber(p.score_batt) ?? null,
    reliability_score: pickNumber(p.reliability_score, p.score_reliability) ?? null,
    score_reliability: pickNumber(p.score_reliability, p.reliability_score) ?? null,

    // reasons (for Decision Brief / cards)
    reason_1: pickText(p.reason_1) ?? null,
    reason_2: pickText(p.reason_2) ?? null,
    reason_3: pickText(p.reason_3) ?? null,

    evidence_summary: pickText(p.evidence_summary) ?? null,
    source_links: p.source_links ?? null,

    // issue flags (if you use them later)
    issue_green_line: pickBool(p.issue_green_line) ?? null,
    issue_heating: pickBool(p.issue_heating) ?? null,
    issue_battery_drain: pickBool(p.issue_battery_drain) ?? null,
    issue_network: pickBool(p.issue_network) ?? null,

    // specs (support both column styles)
    chipset: pickText(p.chipset) ?? null,
    antutu_score: pickNumber(p.antutu_score, p.antutu) ?? null,
    antutu: pickNumber(p.antutu, p.antutu_score) ?? null,

    main_camera_mp: pickNumber(p.main_camera_mp, p.camera_mp) ?? null,
    camera_mp: pickNumber(p.camera_mp, p.main_camera_mp) ?? null,

    battery_mah: pickNumber(p.battery_mah) ?? null,

    // IMPORTANT: your DB has `charge_w` (not charging_w)
    charge_w: pickNumber(p.charge_w) ?? null,
    charging_w: pickNumber(p.charging_w, p.charge_w) ?? null,

    display_hz: pickNumber(p.display_hz) ?? null,

    // optional metadata
    updated_at: pickText(p.updated_at) ?? null,
    created_at: pickText(p.created_at) ?? null,
  };
}