
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchRankedProducts } from "@/lib/productsApi";

import RiskBadge from "@/components/RiskBadge";
import VerificationBadge from "@/components/VerificationBadge";
import TrustBadgeFinal from "@/components/TrustBadgeFinal";

type IssueItem =
  | string
  | {
      issue: string;
      severity?: "low" | "medium" | "high" | string;
    };

type RankedProduct = {
  slug: string;
  name: string;
  brand?: string | null;

  price_min?: number | null;
  price_max?: number | null;

  risk_level?: string | null;
  risk_badge?: string | null;
  verification_score?: number | null;
  trust_score?: number | null;
  trust_pct?: number | null;

  score_overall?: number | null;
  final_score?: number | null;
  weighted_score?: number | null;

  score_perf?: number | null;
  score_cam?: number | null;
  score_batt?: number | null;
  reliability_score?: number | null;
  score_reliability?: number | null;

  reason_1?: string | null;
  reason_2?: string | null;
  reason_3?: string | null;

  chipset?: string | null;
  antutu_score?: number | null;
  main_camera_mp?: number | null;
  battery_mah?: number | null;
  charge_w?: number | null;
  display_hz?: number | null;

  issues?: IssueItem[] | null;
};

function safeNum(n: any): number | null {
  const v = typeof n === "number" ? n : n != null ? Number(n) : NaN;
  return Number.isFinite(v) ? v : null;
}

function fmtMoney(n: number | null | undefined) {
  const v = safeNum(n);
  if (v === null) return "—";
  return `₹${v.toLocaleString()}`;
}

function fmtTrust(p: RankedProduct) {
  const t = safeNum(p.trust_score ?? p.trust_pct);
  return t === null ? "—" : `${t.toFixed(0)}%`;
}

function bestOverall(p: RankedProduct) {
  return (
    safeNum(p.final_score) ??
    safeNum(p.score_overall) ??
    safeNum(p.weighted_score) ??
    0
  );
}

function normalizeIssues(p: RankedProduct): { issue: string; severity?: string }[] {
  const raw = p.issues;
  if (!raw || !Array.isArray(raw)) return [];

  const out: { issue: string; severity?: string }[] = [];
  for (const it of raw) {
    if (!it) continue;

    if (typeof it === "string") {
      const s = it.trim();
      if (s) out.push({ issue: s });
      continue;
    }

    if (typeof it === "object") {
      const issue = typeof (it as any).issue === "string" ? (it as any).issue.trim() : "";
      const severity =
        typeof (it as any).severity === "string" ? (it as any).severity.trim() : undefined;
      if (issue) out.push({ issue, severity });
    }
  }
  return out;
}

function severityKey(s?: string) {
  const v = (s ?? "").toLowerCase();
  if (v === "high" || v === "critical") return "high";
  if (v === "low" || v === "minor") return "low";
  return "medium";
}

function IssuesRadar({ issues }: { issues: { issue: string; severity?: string }[] }) {
  if (!issues || issues.length === 0) return null;

  const counts = issues.reduce(
    (acc, it) => {
      const k = severityKey(it.severity);
      acc[k] += 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <span className="text-[11px] text-muted-foreground font-medium">Issues Radar:</span>

      <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[11px] text-red-300">
        High: {counts.high}
      </span>
      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
        Medium: {counts.medium}
      </span>
      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
        Low: {counts.low}
      </span>
    </div>
  );
}

export default function Results() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const budget = useMemo(() => {
    const v = params.get("budget");
    const n = v ? Number(v) : 0;
    return Number.isFinite(n) ? n : 0;
  }, [params]);

  const priority = useMemo(() => params.get("priority") ?? "balanced", [params]);
  const brand = useMemo(() => params.get("brand") ?? "all", [params]);
  const trust = useMemo(() => params.get("trust") ?? "all", [params]);

  const [products, setProducts] = useState<RankedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 2) return [prev[1], slug];
      return [...prev, slug];
    });
  };

  const reload = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const data = await fetchRankedProducts({
        budget,
        priority,
        brand,
        trust,
      });

      setProducts(Array.isArray(data) ? (data as RankedProduct[]) : []);
    } catch (err: any) {
      console.error("Results load failed:", err);
      setErrorMsg(err?.message ?? "Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, [budget, priority, brand, trust]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full glass-card rounded-xl p-6 space-y-4">
          <div className="text-lg font-semibold">Failed to load results</div>
          <div className="text-sm text-muted-foreground break-words">{errorMsg}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Top Recommendations</h1>

      {products.map((p, i) => {
        const issues = normalizeIssues(p);

        return (
          <div key={p.slug} className="glass-card rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">
                  #{i + 1} {p.name}
                </h2>

                <div className="text-xs text-muted-foreground">
                  {p.brand ?? "—"} · {fmtMoney(p.price_min)} – {fmtMoney(p.price_max)}
                </div>

                <div className="flex gap-2 flex-wrap pt-1">
                  <RiskBadge label={(p.risk_badge ?? p.risk_level ?? "Medium Risk") as any} />
                  <VerificationBadge score={safeNum(p.verification_score) ?? 0} />
                  <TrustBadgeFinal pct={safeNum(p.trust_score ?? p.trust_pct) ?? 0} />
                </div>

                {issues.length > 0 && (
                  <>
                    <IssuesRadar issues={issues} />

                    <div className="text-xs text-red-300 mt-2">
                      <span className="font-medium">⚠ Known Issues:</span>

                      <ul className="mt-1 space-y-1 text-red-200/90">
                        {issues.slice(0, 2).map((it, idx) => (
                          <li key={idx}>• {it.issue}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleSelect(p.slug)}
                  className="border rounded px-3 py-2 text-xs"
                >
                  Select
                </button>

                <button
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="border rounded px-3 py-2 text-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
