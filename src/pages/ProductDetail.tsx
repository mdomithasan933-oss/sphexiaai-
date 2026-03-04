import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductBySlug } from "../lib/productsApi";

// safest: default imports (works if components are default-export)
import RiskBadge from "../components/RiskBadge";
import VerificationBadge from "../components/VerificationBadge";
import TrustBadgeFinal from "../components/TrustBadgeFinal";

type ProductDetailType = {
  slug: string;
  name: string;
  brand?: string | null;

  price_min?: number | null;
  price_max?: number | null;

  risk_badge?: string | null;
  verification_score?: number | null;
  trust_pct?: number | null;

  score_perf?: number | null;
  score_cam?: number | null;
  score_batt?: number | null;
  reliability_score?: number | null;

  // reasons
  reason_1?: string | null;
  reason_2?: string | null;
  reason_3?: string | null;

  // specs
  chipset?: string | null;
  antutu?: number | null;
  camera_mp?: number | null;
  battery_mah?: number | null;
  charge_w?: number | null;
  display_hz?: number | null;
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetailType | null>(null);

  useEffect(() => {
    if (!slug) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const p = await fetchProductBySlug(slug);
        if (!alive) return;

        setProduct((p as any) ?? null);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Failed to load product detail.");
        setProduct(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  const priceText = useMemo(() => {
    if (!product) return "";
    const min = product.price_min ?? null;
    const max = product.price_max ?? null;
    if (min == null && max == null) return "";
    if (min != null && max != null)
      return `৳${min.toLocaleString()} – ৳${max.toLocaleString()}`;
    if (min != null) return `৳${min.toLocaleString()}+`;
    return `Up to ৳${(max as number).toLocaleString()}`;
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (err || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="text-sm text-red-400">
          {err ?? "Failed to load product detail."}
        </div>
        <button
          className="px-4 py-2 rounded bg-secondary text-sm"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    );
  }

  const perf = product.score_perf ?? 0;
  const cam = product.score_cam ?? 0;
  const batt = product.score_batt ?? 0;
  const rel = product.reliability_score ?? 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button
        className="text-sm text-muted-foreground hover:text-foreground mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="rounded-2xl bg-card/60 border border-white/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold">{product.name}</div>
            <div className="text-sm text-muted-foreground">
              {product.brand ?? ""}
            </div>
            {priceText && <div className="mt-1 text-sm">{priceText}</div>}
          </div>

          <div className="flex items-center gap-2">
            <RiskBadge label={product.risk_badge ?? "Low Risk"} />
          </div>
        </div>

        {/* TRUST & EVIDENCE */}
        <div className="mt-6 rounded-xl border border-white/10 bg-background/30 p-4">
          <div className="text-xs tracking-wider text-muted-foreground font-semibold">
            TRUST & EVIDENCE
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <VerificationBadge score={product.verification_score ?? 0} />
            <TrustBadgeFinal pct={product.trust_pct ?? null} />
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            {product.verification_score != null && product.verification_score >= 2
              ? "This product has meaningful verification signals."
              : "This product is not yet independently verified."}
          </div>
        </div>

        {/* WHY THIS PRODUCT */}
        <div className="mt-4 rounded-xl border border-white/10 bg-background/30 p-4">
          <div className="text-xs tracking-wider text-muted-foreground font-semibold">
            WHY THIS PRODUCT
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {(product.reason_1 ? [product.reason_1] : [])
              .concat(product.reason_2 ? [product.reason_2] : [])
              .concat(product.reason_3 ? [product.reason_3] : [])
              .filter(Boolean)
              .slice(0, 5)
              .map((r, idx) => (
                <li key={idx} className="text-muted-foreground">
                  • {r}
                </li>
              ))}
          </ul>
        </div>

        {/* SCORE BREAKDOWN */}
        <div className="mt-4 rounded-xl border border-white/10 bg-background/30 p-4">
          <div className="text-xs tracking-wider text-muted-foreground font-semibold">
            SCORE BREAKDOWN
          </div>

          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            <ScoreTile label="Performance" value={perf} />
            <ScoreTile label="Camera" value={cam} />
            <ScoreTile label="Battery" value={batt} />
            <ScoreTile label="Reliability" value={rel} />
          </div>
        </div>

        {/* SPECS */}
        <div className="mt-4 rounded-xl border border-white/10 bg-background/30 p-4">
          <div className="text-xs tracking-wider text-muted-foreground font-semibold">
            SPECS SNAPSHOT
          </div>

          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <Spec label="Chipset" value={product.chipset ?? "—"} />
            <Spec
              label="AnTuTu"
              value={
                product.antutu != null ? product.antutu.toLocaleString() : "—"
              }
            />
            <Spec
              label="Camera"
              value={product.camera_mp != null ? `${product.camera_mp}MP` : "—"}
            />
            <Spec
              label="Battery"
              value={
                product.battery_mah != null
                  ? `${product.battery_mah}mAh`
                  : "—"
              }
            />
            <Spec
              label="Charging"
              value={product.charge_w != null ? `${product.charge_w}W` : "—"}
            />
            <Spec
              label="Display"
              value={product.display_hz != null ? `${product.display_hz}Hz` : "—"}
            />
          </div>
        </div>

        {/* KNOWN ISSUES */}
        <div className="mt-4 rounded-xl border border-white/10 bg-background/30 p-4">
          <div className="text-xs tracking-wider text-muted-foreground font-semibold">
            KNOWN ISSUES
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            No major issues flagged.
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-card/50 border border-white/10 p-4 text-center">
      <div className="text-2xl font-semibold">{Math.round(value)}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-card/40 px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm mt-1">{value}</div>
    </div>
  );
}