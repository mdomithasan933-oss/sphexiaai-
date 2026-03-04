import { supabase } from "@/integrations/supabase/client";
import { mapProductFromDB } from "@/lib/productMapper";

export type RankParams = {
  budget: number;
  priority: string;
  brand: string;
  trust: string;
};

type AnyRow = Record<string, any>;

const PRODUCT_SELECT = [
  "id",
  "slug",
  "name",
  "brand",
  "price_min",
  "price_max",

  "risk_level",
  "risk_badge",
  "verification_score",
  "last_verified",
  "trust_score",
  "trust_pct",

  "score_overall",
  "final_score",
  "weighted_score",
  "score_perf",
  "score_cam",
  "score_batt",
  "reliability_score",
  "score_reliability",

  "reason_1",
  "reason_2",
  "reason_3",
  "evidence_summary",
  "source_links",

  "issue_green_line",
  "issue_heating",
  "issue_battery_drain",
  "issue_network",

  "chipset",
  "antutu",
  "antutu_score",
  "camera_mp",
  "main_camera_mp",
  "battery_mah",
  "charge_w",
  "display_hz",

  "updated_at",
  "created_at",
].join(",");

/**
 * Fetch phone issues for slugs
 */
export async function fetchPhoneIssues(slugs: string[]) {
  if (!slugs || slugs.length === 0) return {};

  const { data, error } = await supabase
    .from("phone_issues")
    .select("slug, issue, severity")
    .in("slug", slugs);

  if (error) {
    console.error("fetchPhoneIssues failed:", error.message);
    return {};
  }

  const map: Record<string, any[]> = {};

  for (const row of data ?? []) {
    if (!map[row.slug]) map[row.slug] = [];
    map[row.slug].push(row);
  }

  return map;
}

/**
 * Results page fetcher
 */
export async function fetchRankedProducts(params: RankParams) {
  const budget = Number(params?.budget ?? 0);
  const priority = params?.priority ?? "balanced";
  const brand = params?.brand ?? "all";
  const trust = params?.trust ?? "all";

  let q = supabase.from("products").select(PRODUCT_SELECT);

  if (Number.isFinite(budget) && budget > 0) {
    q = q.lte("price_min", budget);
  }

  if (brand && brand !== "all") {
    q = q.eq("brand", brand);
  }

  if (trust === "verified_plus") {
    q = q.gte("verification_score", 3);
  } else if (trust === "verified") {
    q = q.gte("verification_score", 2);
  }

  q = q
    .order("score_overall", { ascending: false, nullsFirst: false })
    .order("final_score", { ascending: false, nullsFirst: false })
    .order("trust_score", { ascending: false, nullsFirst: false })
    .order("verification_score", { ascending: false, nullsFirst: false });

  const { data, error } = await q;

  if (error) {
    console.error("fetchRankedProducts failed:", error.message);
    throw new Error(error.message);
  }

  const mapped = (data ?? []).map((row: AnyRow) => mapProductFromDB(row));

  const scoreForPriority = (p: any) => {
    switch (priority) {
      case "performance":
        return Number(p.score_perf ?? 0);
      case "camera":
        return Number(p.score_cam ?? 0);
      case "battery":
        return Number(p.score_batt ?? 0);
      case "reliability":
        return Number(p.reliability_score ?? p.score_reliability ?? 0);
      default:
        return Number(p.score_overall ?? p.final_score ?? p.weighted_score ?? 0);
    }
  };

  mapped.sort((a: any, b: any) => {
    const da = scoreForPriority(a);
    const db = scoreForPriority(b);

    if (db !== da) return db - da;

    const ta = Number(a.trust_score ?? a.trust_pct ?? 0);
    const tb = Number(b.trust_score ?? b.trust_pct ?? 0);

    if (tb !== ta) return tb - ta;

    const va = Number(a.verification_score ?? 0);
    const vb = Number(b.verification_score ?? 0);

    return vb - va;
  });

  const slugs = mapped.map((p: any) => p.slug);

  const issuesMap = await fetchPhoneIssues(slugs);

  const enriched = mapped.map((p: any) => ({
    ...p,
    issues: issuesMap[p.slug] ?? [],
  }));

  return enriched;
}

/**
 * Product detail fetcher
 */
export async function fetchProductBySlug(slug: string) {
  const clean = (slug ?? "").trim();

  if (!clean) return null;

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", clean)
    .maybeSingle();

  if (error) {
    console.error("fetchProductBySlug failed:", error.message);
    throw new Error(error.message);
  }

  const mapped = data ? mapProductFromDB(data as AnyRow) : null;

  if (!mapped) return null;

  const issuesMap = await fetchPhoneIssues([mapped.slug]);

  return {
    ...mapped,
    issues: issuesMap[mapped.slug] ?? [],
  };
}