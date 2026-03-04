import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import RiskBadge from "@/components/RiskBadge";
import VerificationBadge from "@/components/VerificationBadge";
import TrustBadgeFinal from "@/components/TrustBadgeFinal";

import { supabase } from "@/integrations/supabase/client";

type Product = {
  slug: string;
  name: string;
  brand?: string | null;

  price_min?: number | null;
  price_max?: number | null;

  // badges / trust (REAL DB columns)
  risk_level?: string | null;
  verification_score?: number | null;
  trust_score?: number | null;

  // scores
  score_perf?: number | null;
  score_cam?: number | null;
  score_batt?: number | null;
  reliability_score?: number | null;

  // overall candidates
  final_score?: number | null;
  weighted_score?: number | null;
  score_overall?: number | null;
  score?: number | null;

  // specs
  chipset?: string | null;
  antutu_score?: number | null;
  main_camera_mp?: number | null;
  battery_mah?: number | null;
  charge_w?: number | null; // ✅ DB column is charge_w (NOT charging_w)
  display_hz?: number | null;
};

function safeNum(n: any): number | null {
  const v = Number(n);
  return Number.isFinite(v) ? v : null;
}

function fmtMoney(n: number | null | undefined) {
  const v = safeNum(n);
  if (v === null) return "—";
  return `₹${v.toLocaleString()}`;
}

function fmtNum(n: number | null | undefined) {
  const v = safeNum(n);
  if (v === null) return "—";
  return v.toLocaleString();
}

function scoreOr0(n: number | null | undefined) {
  const v = safeNum(n);
  return v === null ? 0 : v;
}

function overallScore(p: Product | null) {
  if (!p) return null;

  const final = safeNum(p.final_score);
  if (final !== null) return final;

  const weighted = safeNum(p.weighted_score);
  if (weighted !== null) return weighted;

  const overall = safeNum(p.score_overall);
  if (overall !== null) return overall;

  const score = safeNum(p.score);
  if (score !== null) return score;

  const vals = [
    safeNum(p.score_perf),
    safeNum(p.score_cam),
    safeNum(p.score_batt),
    safeNum(p.reliability_score),
  ].filter((x) => x !== null) as number[];

  if (vals.length === 0) return null;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(avg * 10) / 10;
}

function WinnerPill({ label }: { label: "Winner" | "Tie" | "—" }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border";
  if (label === "Winner") {
    return (
      <span className={`${base} border-emerald-400/40 text-emerald-200`}>
        🏆 Winner
      </span>
    );
  }
  if (label === "Tie") {
    return (
      <span className={`${base} border-blue-400/40 text-blue-200`}>🤝 Tie</span>
    );
  }
  return (
    <span className={`${base} border-white/10 text-muted-foreground`}>—</span>
  );
}

export default function Compare() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const aSlug = useMemo(() => params.get("a") ?? "", [params]);
  const bSlug = useMemo(() => params.get("b") ?? "", [params]);

  const [a, setA] = useState<Product | null>(null);
  const [b, setB] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canLoad = useMemo(() => Boolean(aSlug && bSlug), [aSlug, bSlug]);

  const fetchOne = async (slug: string): Promise<Product | null> => {
    // ✅ Select ONLY columns that exist
    const selectCols = [
      "slug",
      "name",
      "brand",
      "price_min",
      "price_max",
      "risk_level",
      "verification_score",
      "trust_score",
      "score_perf",
      "score_cam",
      "score_batt",
      "reliability_score",
      "chipset",
      "antutu_score",
      "main_camera_mp",
      "battery_mah",
      "charge_w", // ✅ FIXED
      "display_hz",
      "final_score",
      "weighted_score",
      "score_overall",
      "score",
    ].join(",");

    const { data, error } = await supabase
      .from("products")
      .select(selectCols)
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return (data as any) ?? null;
  };

  const load = async () => {
    if (!canLoad) return;
    try {
      setLoading(true);
      setErrorMsg(null);

      const [pa, pb] = await Promise.all([fetchOne(aSlug), fetchOne(bSlug)]);
      setA(pa);
      setB(pb);

      if (!pa || !pb) {
        setErrorMsg(
          "One or both products not found. Check the compare URL params (a, b)."
        );
      }
    } catch (err: any) {
      console.error("Compare load failed:", err);
      const msg =
        err?.message ||
        err?.error?.message ||
        (typeof err === "string" ? err : null) ||
        "Failed to load compare data.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aSlug, bSlug]);

  const aOverall = useMemo(() => overallScore(a), [a]);
  const bOverall = useMemo(() => overallScore(b), [b]);

  const aWinner = useMemo(() => {
    if (aOverall === null || bOverall === null) return "—" as const;
    if (aOverall === bOverall) return "Tie" as const;
    return aOverall > bOverall ? ("Winner" as const) : ("—" as const);
  }, [aOverall, bOverall]);

  const bWinner = useMemo(() => {
    if (aOverall === null || bOverall === null) return "—" as const;
    if (aOverall === bOverall) return "Tie" as const;
    return bOverall > aOverall ? ("Winner" as const) : ("—" as const);
  }, [aOverall, bOverall]);

  if (!canLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full glass-card rounded-xl p-6 space-y-3">
          <div className="text-lg font-semibold">Compare needs 2 products</div>
          <div className="text-sm text-muted-foreground">
            Use URL like:{" "}
            <span className="font-mono">/compare?a=slug1&b=slug2</span>
          </div>
          <button
            className="border rounded px-4 py-2"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Loading compare...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg w-full glass-card rounded-xl p-6 space-y-4">
          <div className="text-lg font-semibold">Failed to load compare</div>
          <div className="text-sm text-muted-foreground break-words">
            {errorMsg}
          </div>

          <div className="flex gap-2">
            <button
              className="border rounded px-4 py-2"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button className="border rounded px-4 py-2" onClick={load}>
              Retry
            </button>
          </div>

          <div className="text-xs text-muted-foreground">
            Open DevTools → Console/Network to see the real error log.
          </div>
        </div>
      </div>
    );
  }

  const Left = a!;
  const Right = b!;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground"
        >
          ← Back
        </button>

        <div className="text-sm text-muted-foreground">
          Compare: <span className="font-medium">{Left.name}</span> vs{" "}
          <span className="font-medium">{Right.name}</span>
        </div>
      </div>

      <h1 className="text-2xl font-semibold">Side-by-side Compare</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* LEFT */}
        <div className="glass-card rounded-xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-semibold truncate">{Left.name}</div>
              <div className="text-sm text-muted-foreground">
                {Left.brand ?? ""}
              </div>
              <div className="text-sm">
                {fmtMoney(Left.price_min)} – {fmtMoney(Left.price_max)}
              </div>
            </div>
            <div className="shrink-0">
              <WinnerPill label={aWinner} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <RiskBadge label={Left.risk_level ?? "Medium Risk"} />
            <VerificationBadge score={scoreOr0(Left.verification_score)} />
            <TrustBadgeFinal pct={scoreOr0(Left.trust_score)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Overall</div>
              <div className="text-lg font-semibold">{fmtNum(aOverall)}</div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Reliability</div>
              <div className="text-lg font-semibold">
                {fmtNum(Left.reliability_score)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Performance</div>
              <div className="text-lg font-semibold">
                {fmtNum(Left.score_perf)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Camera</div>
              <div className="text-lg font-semibold">
                {fmtNum(Left.score_cam)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Battery</div>
              <div className="text-lg font-semibold">
                {fmtNum(Left.score_batt)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Verification</div>
              <div className="text-lg font-semibold">
                {fmtNum(Left.verification_score)}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 p-4 space-y-2">
            <div className="text-sm font-semibold">Specs</div>

            <div className="text-sm text-muted-foreground">
              Chipset:{" "}
              <span className="text-foreground">{Left.chipset ?? "—"}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              AnTuTu:{" "}
              <span className="text-foreground">
                {fmtNum(Left.antutu_score)}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Camera:{" "}
              <span className="text-foreground">
                {Left.main_camera_mp
                  ? `${fmtNum(Left.main_camera_mp)} MP`
                  : "—"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Battery:{" "}
              <span className="text-foreground">
                {Left.battery_mah ? `${fmtNum(Left.battery_mah)} mAh` : "—"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Charging:{" "}
              <span className="text-foreground">
                {Left.charge_w ? `${fmtNum(Left.charge_w)} W` : "—"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Display:{" "}
              <span className="text-foreground">
                {Left.display_hz ? `${fmtNum(Left.display_hz)} Hz` : "—"}
              </span>
            </div>
          </div>

          <button
            className="w-full border rounded py-2"
            onClick={() => navigate(`/product/${Left.slug}`)}
          >
            View {Left.name}
          </button>
        </div>

        {/* RIGHT */}
        <div className="glass-card rounded-xl p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-semibold truncate">{Right.name}</div>
              <div className="text-sm text-muted-foreground">
                {Right.brand ?? ""}
              </div>
              <div className="text-sm">
                {fmtMoney(Right.price_min)} – {fmtMoney(Right.price_max)}
              </div>
            </div>
            <div className="shrink-0">
              <WinnerPill label={bWinner} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <RiskBadge label={Right.risk_level ?? "Medium Risk"} />
            <VerificationBadge score={scoreOr0(Right.verification_score)} />
            <TrustBadgeFinal pct={scoreOr0(Right.trust_score)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Overall</div>
              <div className="text-lg font-semibold">{fmtNum(bOverall)}</div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Reliability</div>
              <div className="text-lg font-semibold">
                {fmtNum(Right.reliability_score)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Performance</div>
              <div className="text-lg font-semibold">
                {fmtNum(Right.score_perf)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Camera</div>
              <div className="text-lg font-semibold">
                {fmtNum(Right.score_cam)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Battery</div>
              <div className="text-lg font-semibold">
                {fmtNum(Right.score_batt)}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-xs text-muted-foreground">Verification</div>
              <div className="text-lg font-semibold">
                {fmtNum(Right.verification_score)}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 p-4 space-y-2">
            <div className="text-sm font-semibold">Specs</div>

            <div className="text-sm text-muted-foreground">
              Chipset:{" "}
              <span className="text-foreground">{Right.chipset ?? "—"}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              AnTuTu:{" "}
              <span className="text-foreground">
                {fmtNum(Right.antutu_score)}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Camera:{" "}
              <span className="text-foreground">
                {Right.main_camera_mp
                  ? `${fmtNum(Right.main_camera_mp)} MP`
                  : "—"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Battery:{" "}
              <span className="text-foreground">
                {Right.battery_mah ? `${fmtNum(Right.battery_mah)} mAh` : "—"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Charging:{" "}
              <span className="text-foreground">
                {Right.charge_w ? `${fmtNum(Right.charge_w)} W` : "—"}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Display:{" "}
              <span className="text-foreground">
                {Right.display_hz ? `${fmtNum(Right.display_hz)} Hz` : "—"}
              </span>
            </div>
          </div>

          <button
            className="w-full border rounded py-2"
            onClick={() => navigate(`/product/${Right.slug}`)}
          >
            View {Right.name}
          </button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Tip: open compare with{" "}
        <span className="font-mono">/compare?a=samsung-a34&b=google-pixel-6a</span>
      </div>
    </div>
  );
}