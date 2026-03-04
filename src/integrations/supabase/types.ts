export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      automation_runs: {
        Row: {
          dataset_path: string
          error_code: string | null
          error_message: string | null
          id: number
          notes: string | null
          promote_ok: boolean
          rows_in_dataset: number
          rows_upserted: number
          run_at: string
          source: string
          status: string | null
        }
        Insert: {
          dataset_path: string
          error_code?: string | null
          error_message?: string | null
          id?: number
          notes?: string | null
          promote_ok?: boolean
          rows_in_dataset: number
          rows_upserted: number
          run_at?: string
          source?: string
          status?: string | null
        }
        Update: {
          dataset_path?: string
          error_code?: string | null
          error_message?: string | null
          id?: number
          notes?: string | null
          promote_ok?: boolean
          rows_in_dataset?: number
          rows_upserted?: number
          run_at?: string
          source?: string
          status?: string | null
        }
        Relationships: []
      }
      ingestion_runs: {
        Row: {
          id: string
          notes: string | null
          run_date: string | null
          total_approved: number | null
          total_processed: number | null
          total_rejected: number | null
        }
        Insert: {
          id?: string
          notes?: string | null
          run_date?: string | null
          total_approved?: number | null
          total_processed?: number | null
          total_rejected?: number | null
        }
        Update: {
          id?: string
          notes?: string | null
          run_date?: string | null
          total_approved?: number | null
          total_processed?: number | null
          total_rejected?: number | null
        }
        Relationships: []
      }
      product_rank_history: {
        Row: {
          canonical_score: number | null
          confidence_index: number | null
          created_at: string
          evidence_depth_score: number | null
          global_rank: number | null
          id: number
          percentile_rank: number | null
          price_max: number | null
          price_mid: number | null
          price_min: number | null
          product_id: string
          ranking_explain: string | null
          segment: string | null
          segment_rank: number | null
          snapshot_at: string
          verification_score: number | null
          verification_status: string | null
        }
        Insert: {
          canonical_score?: number | null
          confidence_index?: number | null
          created_at?: string
          evidence_depth_score?: number | null
          global_rank?: number | null
          id?: number
          percentile_rank?: number | null
          price_max?: number | null
          price_mid?: number | null
          price_min?: number | null
          product_id: string
          ranking_explain?: string | null
          segment?: string | null
          segment_rank?: number | null
          snapshot_at?: string
          verification_score?: number | null
          verification_status?: string | null
        }
        Update: {
          canonical_score?: number | null
          confidence_index?: number | null
          created_at?: string
          evidence_depth_score?: number | null
          global_rank?: number | null
          id?: number
          percentile_rank?: number | null
          price_max?: number | null
          price_mid?: number | null
          price_min?: number | null
          product_id?: string
          ranking_explain?: string | null
          segment?: string | null
          segment_rank?: number | null
          snapshot_at?: string
          verification_score?: number | null
          verification_status?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          confidence_index: number | null
          created_at: string | null
          evidence_depth_score: number | null
          evidence_summary: string | null
          final_score: number | null
          global_rank: number | null
          id: string
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          last_reviewed: string | null
          last_verified: string | null
          name: string | null
          percentile_rank: number | null
          performance_score: number | null
          price_max: number | null
          price_min: number | null
          ranking_explain: string | null
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number
          score_batt: number
          score_cam: number
          score_overall: number | null
          score_perf: number
          score_reliability: number | null
          segment_rank: number | null
          slug: string
          source_links: Json | null
          source_note: string | null
          trust_score: number | null
          updated_at: string | null
          verification_score: number | null
          verification_status: string | null
          weighted_score: number | null
        }
        Insert: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          confidence_index?: number | null
          created_at?: string | null
          evidence_depth_score?: number | null
          evidence_summary?: string | null
          final_score?: number | null
          global_rank?: number | null
          id?: string
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          percentile_rank?: number | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          ranking_explain?: string | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number
          score_batt?: number
          score_cam?: number
          score_overall?: number | null
          score_perf?: number
          score_reliability?: number | null
          segment_rank?: number | null
          slug: string
          source_links?: Json | null
          source_note?: string | null
          trust_score?: number | null
          updated_at?: string | null
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Update: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          confidence_index?: number | null
          created_at?: string | null
          evidence_depth_score?: number | null
          evidence_summary?: string | null
          final_score?: number | null
          global_rank?: number | null
          id?: string
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          percentile_rank?: number | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          ranking_explain?: string | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number
          score_batt?: number
          score_cam?: number
          score_overall?: number | null
          score_perf?: number
          score_reliability?: number | null
          segment_rank?: number | null
          slug?: string
          source_links?: Json | null
          source_note?: string | null
          trust_score?: number | null
          updated_at?: string | null
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Relationships: []
      }
      products_staging: {
        Row: {
          brand: string
          confidence_index: number | null
          created_at: string | null
          evidence_summary: string | null
          id: string
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          last_reviewed: string | null
          last_verified: string | null
          name: string
          price_max: number
          price_min: number
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number | null
          score_batt: number | null
          score_cam: number | null
          score_perf: number | null
          slug: string
          source_links: Json | null
          source_note: string | null
          validation_note: string | null
          validation_status: string | null
          verification_score: number | null
        }
        Insert: {
          brand: string
          confidence_index?: number | null
          created_at?: string | null
          evidence_summary?: string | null
          id?: string
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name: string
          price_max: number
          price_min: number
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_perf?: number | null
          slug: string
          source_links?: Json | null
          source_note?: string | null
          validation_note?: string | null
          validation_status?: string | null
          verification_score?: number | null
        }
        Update: {
          brand?: string
          confidence_index?: number | null
          created_at?: string | null
          evidence_summary?: string | null
          id?: string
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string
          price_max?: number
          price_min?: number
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_perf?: number | null
          slug?: string
          source_links?: Json | null
          source_note?: string | null
          validation_note?: string | null
          validation_status?: string | null
          verification_score?: number | null
        }
        Relationships: []
      }
      rank_history: {
        Row: {
          captured_at: string
          confidence_index: number | null
          evidence_depth_score: number | null
          evidence_score: number | null
          freshness_factor: number | null
          global_rank: number | null
          id: number
          product_id: string
          stability_label: string | null
          trust_badge: string | null
          weighted_score: number | null
        }
        Insert: {
          captured_at?: string
          confidence_index?: number | null
          evidence_depth_score?: number | null
          evidence_score?: number | null
          freshness_factor?: number | null
          global_rank?: number | null
          id?: number
          product_id: string
          stability_label?: string | null
          trust_badge?: string | null
          weighted_score?: number | null
        }
        Update: {
          captured_at?: string
          confidence_index?: number | null
          evidence_depth_score?: number | null
          evidence_score?: number | null
          freshness_factor?: number | null
          global_rank?: number | null
          id?: number
          product_id?: string
          stability_label?: string | null
          trust_badge?: string | null
          weighted_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products_ranked_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_authority_final"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_authority_scoring"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_authority_with_tier"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_confidence_dynamic"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_global_authority_engine"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_personalized_scores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products_canonical"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_products_ranked"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_rank_anomaly_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_rank_change_explanations"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_top_products_with_recent_rank_change"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_explain"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_worldclass"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_worldclass_final"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_worldclass_v2"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_worldclass_v3"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_worldclass_v4"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "rank_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_trust_badge_worldclass_v5"
            referencedColumns: ["product_id"]
          },
        ]
      }
      usage_profiles: {
        Row: {
          created_at: string
          key: string
          label: string
          penalty_issue: number
          penalty_low_confidence: number
          w_batt: number
          w_cam: number
          w_perf: number
          w_rel: number
        }
        Insert: {
          created_at?: string
          key: string
          label: string
          penalty_issue: number
          penalty_low_confidence: number
          w_batt: number
          w_cam: number
          w_perf: number
          w_rel: number
        }
        Update: {
          created_at?: string
          key?: string
          label?: string
          penalty_issue?: number
          penalty_low_confidence?: number
          w_batt?: number
          w_cam?: number
          w_perf?: number
          w_rel?: number
        }
        Relationships: []
      }
    }
    Views: {
      authority_integrity_check: {
        Row: {
          confidence_index: number | null
          integrity_status: string | null
          score_overall: number | null
          slug: string | null
          verification_score: number | null
          weighted_score: number | null
        }
        Insert: {
          confidence_index?: number | null
          integrity_status?: never
          score_overall?: number | null
          slug?: string | null
          verification_score?: number | null
          weighted_score?: number | null
        }
        Update: {
          confidence_index?: number | null
          integrity_status?: never
          score_overall?: number | null
          slug?: string | null
          verification_score?: number | null
          weighted_score?: number | null
        }
        Relationships: []
      }
      products_ranked_view: {
        Row: {
          canonical_score: number | null
          confidence_index: number | null
          evidence_depth_score: number | null
          global_rank: number | null
          id: string | null
          last_verified: string | null
          percentile_rank: number | null
          price_max: number | null
          price_mid: number | null
          price_min: number | null
          rank_score: number | null
          segment: string | null
          segment_rank: number | null
          slug: string | null
          trust_score: number | null
          updated_at: string | null
          verification_score: number | null
          verification_status: string | null
        }
        Relationships: []
      }
      rank_anomaly_detector: {
        Row: {
          anomaly_status: string | null
          global_rank: number | null
          percentile_rank: number | null
          segment_rank: number | null
          slug: string | null
        }
        Insert: {
          anomaly_status?: never
          global_rank?: number | null
          percentile_rank?: number | null
          segment_rank?: number | null
          slug?: string | null
        }
        Update: {
          anomaly_status?: never
          global_rank?: number | null
          percentile_rank?: number | null
          segment_rank?: number | null
          slug?: string | null
        }
        Relationships: []
      }
      v_authority_final: {
        Row: {
          base_authority_score: number | null
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          confidence_index: number | null
          created_at: string | null
          evidence_depth_score: number | null
          evidence_summary: string | null
          final_score: number | null
          global_rank: number | null
          id: string | null
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          issue_penalty: number | null
          last_reviewed: string | null
          last_verified: string | null
          name: string | null
          percentile_rank: number | null
          performance_score: number | null
          price_max: number | null
          price_min: number | null
          ranking_explain: string | null
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number | null
          score_batt: number | null
          score_cam: number | null
          score_overall: number | null
          score_perf: number | null
          score_reliability: number | null
          segment_rank: number | null
          slug: string | null
          source_links: Json | null
          source_note: string | null
          trust_score: number | null
          updated_at: string | null
          verification_score: number | null
          verification_status: string | null
          weighted_score: number | null
        }
        Insert: {
          base_authority_score?: never
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          confidence_index?: number | null
          created_at?: string | null
          evidence_depth_score?: number | null
          evidence_summary?: string | null
          final_score?: number | null
          global_rank?: number | null
          id?: string | null
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          issue_penalty?: never
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          percentile_rank?: number | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          ranking_explain?: string | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_overall?: number | null
          score_perf?: number | null
          score_reliability?: number | null
          segment_rank?: number | null
          slug?: string | null
          source_links?: Json | null
          source_note?: string | null
          trust_score?: number | null
          updated_at?: string | null
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Update: {
          base_authority_score?: never
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          confidence_index?: number | null
          created_at?: string | null
          evidence_depth_score?: number | null
          evidence_summary?: string | null
          final_score?: number | null
          global_rank?: number | null
          id?: string | null
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          issue_penalty?: never
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          percentile_rank?: number | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          ranking_explain?: string | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_overall?: number | null
          score_perf?: number | null
          score_reliability?: number | null
          segment_rank?: number | null
          slug?: string | null
          source_links?: Json | null
          source_note?: string | null
          trust_score?: number | null
          updated_at?: string | null
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Relationships: []
      }
      v_authority_integrity_summary: {
        Row: {
          integrity_status: string | null
          total_rows: number | null
        }
        Relationships: []
      }
      v_authority_scoring: {
        Row: {
          authority_integrity: string | null
          confidence_index: number | null
          evidence_depth_score: number | null
          final_authority_score: number | null
          id: string | null
          name: string | null
          slug: string | null
          trust_score: number | null
          verification_score: number | null
          weighted_score: number | null
        }
        Insert: {
          authority_integrity?: never
          confidence_index?: number | null
          evidence_depth_score?: number | null
          final_authority_score?: never
          id?: string | null
          name?: string | null
          slug?: string | null
          trust_score?: number | null
          verification_score?: number | null
          weighted_score?: number | null
        }
        Update: {
          authority_integrity?: never
          confidence_index?: number | null
          evidence_depth_score?: number | null
          final_authority_score?: never
          id?: string | null
          name?: string | null
          slug?: string | null
          trust_score?: number | null
          verification_score?: number | null
          weighted_score?: number | null
        }
        Relationships: []
      }
      v_authority_with_tier: {
        Row: {
          authority_tier: string | null
          base_authority_score: number | null
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          confidence_index: number | null
          created_at: string | null
          evidence_depth_score: number | null
          evidence_summary: string | null
          final_authority_score: number | null
          final_score: number | null
          global_authority_rank: number | null
          global_rank: number | null
          id: string | null
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          issue_penalty: number | null
          last_reviewed: string | null
          last_verified: string | null
          name: string | null
          percentile_rank: number | null
          performance_score: number | null
          price_max: number | null
          price_min: number | null
          ranking_explain: string | null
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number | null
          score_batt: number | null
          score_cam: number | null
          score_overall: number | null
          score_perf: number | null
          score_reliability: number | null
          segment_rank: number | null
          slug: string | null
          source_links: Json | null
          source_note: string | null
          trust_score: number | null
          updated_at: string | null
          verification_score: number | null
          verification_status: string | null
          weighted_score: number | null
        }
        Relationships: []
      }
      v_confidence_dynamic: {
        Row: {
          days_since_review: number | null
          freshness_factor: number | null
          global_rank: number | null
          last_reviewed: string | null
          product_id: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
        }
        Relationships: []
      }
      v_final_recommendations: {
        Row: {
          confidence_index: number | null
          issue_penalty: number | null
          name: string | null
          personalized_score: number | null
          price_max: number | null
          price_min: number | null
          slug: string | null
          usage_key: string | null
        }
        Relationships: []
      }
      v_global_authority_engine: {
        Row: {
          base_authority_score: number | null
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          confidence_index: number | null
          created_at: string | null
          evidence_depth_score: number | null
          evidence_summary: string | null
          final_authority_score: number | null
          final_score: number | null
          global_authority_rank: number | null
          global_rank: number | null
          id: string | null
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          issue_penalty: number | null
          last_reviewed: string | null
          last_verified: string | null
          name: string | null
          percentile_rank: number | null
          performance_score: number | null
          price_max: number | null
          price_min: number | null
          ranking_explain: string | null
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number | null
          score_batt: number | null
          score_cam: number | null
          score_overall: number | null
          score_perf: number | null
          score_reliability: number | null
          segment_rank: number | null
          slug: string | null
          source_links: Json | null
          source_note: string | null
          trust_score: number | null
          updated_at: string | null
          verification_score: number | null
          verification_status: string | null
          weighted_score: number | null
        }
        Relationships: []
      }
      v_personalized_scores: {
        Row: {
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          confidence_index: number | null
          id: string | null
          issue_penalty: number | null
          low_conf_penalty: number | null
          name: string | null
          performance_score: number | null
          personalized_score: number | null
          price_max: number | null
          price_min: number | null
          reliability_score: number | null
          slug: string | null
          usage_key: string | null
          usage_label: string | null
        }
        Relationships: []
      }
      v_priority_camera: {
        Row: {
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          name: string | null
          performance_score: number | null
          reliability_score: number | null
          risk_level: string | null
          slug: string | null
          updated_at: string | null
          verification_score: number | null
        }
        Insert: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          name?: string | null
          performance_score?: number | null
          reliability_score?: number | null
          risk_level?: string | null
          slug?: string | null
          updated_at?: string | null
          verification_score?: number | null
        }
        Update: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          name?: string | null
          performance_score?: number | null
          reliability_score?: number | null
          risk_level?: string | null
          slug?: string | null
          updated_at?: string | null
          verification_score?: number | null
        }
        Relationships: []
      }
      v_product_rank_movement: {
        Row: {
          current_rank: number | null
          previous_rank: number | null
          product_id: string | null
          rank_change: number | null
        }
        Relationships: []
      }
      v_products_canonical: {
        Row: {
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          canonical_batt: number | null
          canonical_cam: number | null
          canonical_perf: number | null
          canonical_reliability: number | null
          canonical_score: number | null
          confidence_index: number | null
          created_at: string | null
          evidence_summary: string | null
          id: string | null
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          last_reviewed: string | null
          last_verified: string | null
          name: string | null
          performance_score: number | null
          price_max: number | null
          price_min: number | null
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number | null
          score_batt: number | null
          score_cam: number | null
          score_overall: number | null
          score_perf: number | null
          score_reliability: number | null
          slug: string | null
          source_links: Json | null
          source_note: string | null
          trust_score: number | null
          updated_at: string | null
          verification_badge: string | null
          verification_score: number | null
          verification_status: string | null
          weighted_score: number | null
        }
        Insert: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          canonical_batt?: never
          canonical_cam?: never
          canonical_perf?: never
          canonical_reliability?: never
          canonical_score?: never
          confidence_index?: number | null
          created_at?: string | null
          evidence_summary?: string | null
          id?: string | null
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_overall?: number | null
          score_perf?: number | null
          score_reliability?: number | null
          slug?: string | null
          source_links?: Json | null
          source_note?: string | null
          trust_score?: never
          updated_at?: string | null
          verification_badge?: never
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Update: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          canonical_batt?: never
          canonical_cam?: never
          canonical_perf?: never
          canonical_reliability?: never
          canonical_score?: never
          confidence_index?: number | null
          created_at?: string | null
          evidence_summary?: string | null
          id?: string | null
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_overall?: number | null
          score_perf?: number | null
          score_reliability?: number | null
          slug?: string | null
          source_links?: Json | null
          source_note?: string | null
          trust_score?: never
          updated_at?: string | null
          verification_badge?: never
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Relationships: []
      }
      v_products_ranked: {
        Row: {
          battery_score: number | null
          brand: string | null
          camera_score: number | null
          canonical_batt: number | null
          canonical_cam: number | null
          canonical_perf: number | null
          canonical_reliability: number | null
          canonical_score: number | null
          confidence_index: number | null
          created_at: string | null
          evidence_summary: string | null
          id: string | null
          issue_battery_drain: boolean | null
          issue_green_line: boolean | null
          issue_heating: boolean | null
          issue_network: boolean | null
          last_reviewed: string | null
          last_verified: string | null
          name: string | null
          performance_score: number | null
          price_max: number | null
          price_min: number | null
          reason_1: string | null
          reason_2: string | null
          reason_3: string | null
          reliability_score: number | null
          risk_level: string | null
          score: number | null
          score_base: number | null
          score_batt: number | null
          score_cam: number | null
          score_overall: number | null
          score_perf: number | null
          score_reliability: number | null
          slug: string | null
          source_links: Json | null
          source_note: string | null
          trust_score: number | null
          updated_at: string | null
          verification_badge: string | null
          verification_score: number | null
          verification_status: string | null
          weighted_score: number | null
        }
        Insert: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          canonical_batt?: never
          canonical_cam?: never
          canonical_perf?: never
          canonical_reliability?: never
          canonical_score?: never
          confidence_index?: number | null
          created_at?: string | null
          evidence_summary?: string | null
          id?: string | null
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_overall?: number | null
          score_perf?: number | null
          score_reliability?: number | null
          slug?: string | null
          source_links?: Json | null
          source_note?: string | null
          trust_score?: never
          updated_at?: string | null
          verification_badge?: never
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Update: {
          battery_score?: number | null
          brand?: string | null
          camera_score?: number | null
          canonical_batt?: never
          canonical_cam?: never
          canonical_perf?: never
          canonical_reliability?: never
          canonical_score?: never
          confidence_index?: number | null
          created_at?: string | null
          evidence_summary?: string | null
          id?: string | null
          issue_battery_drain?: boolean | null
          issue_green_line?: boolean | null
          issue_heating?: boolean | null
          issue_network?: boolean | null
          last_reviewed?: string | null
          last_verified?: string | null
          name?: string | null
          performance_score?: number | null
          price_max?: number | null
          price_min?: number | null
          reason_1?: string | null
          reason_2?: string | null
          reason_3?: string | null
          reliability_score?: number | null
          risk_level?: string | null
          score?: number | null
          score_base?: number | null
          score_batt?: number | null
          score_cam?: number | null
          score_overall?: number | null
          score_perf?: number | null
          score_reliability?: number | null
          slug?: string | null
          source_links?: Json | null
          source_note?: string | null
          trust_score?: never
          updated_at?: string | null
          verification_badge?: never
          verification_score?: number | null
          verification_status?: string | null
          weighted_score?: number | null
        }
        Relationships: []
      }
      v_rank_anomaly_details: {
        Row: {
          diff: number | null
          expected_percentile: number | null
          global_rank: number | null
          id: string | null
          percentile_rank: number | null
          slug: string | null
        }
        Relationships: []
      }
      v_rank_anomaly_summary: {
        Row: {
          anomaly_status: string | null
          total: number | null
        }
        Relationships: []
      }
      v_rank_change_7d: {
        Row: {
          avg_rank_change_7d: number | null
          max_rank: number | null
          min_rank: number | null
          product_id: string | null
          snapshots_7d: number | null
        }
        Relationships: []
      }
      v_rank_change_explanations: {
        Row: {
          confidence_delta: number | null
          current_rank: number | null
          evidence_delta: number | null
          explanation: string | null
          freshness_delta: number | null
          name: string | null
          previous_rank: number | null
          product_id: string | null
          rank_change: number | null
          score_delta: number | null
          trust_badge: string | null
        }
        Relationships: []
      }
      v_rank_health_summary: {
        Row: {
          health_status: string | null
          mismatch_products: number | null
          ranked_products: number | null
        }
        Relationships: []
      }
      v_rank_stability_7d: {
        Row: {
          avg_rank_change_7d: number | null
          product_id: string | null
          snapshots: number | null
          stability_label: string | null
        }
        Relationships: []
      }
      v_recommendation_strength: {
        Row: {
          recommendation_strength: string | null
          score_gap: number | null
          second_slug: string | null
          top_slug: string | null
        }
        Relationships: []
      }
      v_top_movers_7d: {
        Row: {
          first_rank: number | null
          last_rank: number | null
          movement_label: string | null
          product_id: string | null
          rank_change_7d: number | null
        }
        Relationships: []
      }
      v_top_products_with_recent_rank_change: {
        Row: {
          authority_signal: string | null
          global_rank: number | null
          id: string | null
          name: string | null
          rank_change: number | null
          trend: string | null
          trust_badge: string | null
        }
        Relationships: []
      }
      v_trust_badge: {
        Row: {
          confidence_index: number | null
          evidence_depth_score: number | null
          global_rank: number | null
          product_id: string | null
          trust_badge: string | null
          verification_status: string | null
        }
        Relationships: []
      }
      v_trust_badge_explain: {
        Row: {
          confidence_index: number | null
          evidence_depth_score: number | null
          global_rank: number | null
          product_id: string | null
          trust_badge: string | null
          trust_reason: string | null
          verification_status: string | null
        }
        Relationships: []
      }
      v_trust_badge_worldclass: {
        Row: {
          product_id: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
        }
        Relationships: []
      }
      v_trust_badge_worldclass_final: {
        Row: {
          global_rank: number | null
          product_id: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
        }
        Relationships: []
      }
      v_trust_badge_worldclass_v2: {
        Row: {
          avg_rank_change_7d: number | null
          confidence_index: number | null
          evidence_depth_score: number | null
          global_rank: number | null
          product_id: string | null
          snapshots_7d: number | null
          stability_label: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
          verification_status: string | null
        }
        Relationships: []
      }
      v_trust_badge_worldclass_v3: {
        Row: {
          global_rank: number | null
          product_id: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
        }
        Relationships: []
      }
      v_trust_badge_worldclass_v4: {
        Row: {
          global_rank: number | null
          product_id: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
        }
        Relationships: []
      }
      v_trust_badge_worldclass_v5: {
        Row: {
          global_rank: number | null
          product_id: string | null
          trust_badge_final: string | null
          trust_reason_final: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      capture_rank_snapshot: { Args: never; Returns: undefined }
      get_best_phones: {
        Args: {
          p_budget_max: number
          p_budget_min: number
          p_limit?: number
          p_usage_key: string
        }
        Returns: {
          confidence_index: number
          issue_penalty: number
          name: string
          personalized_score: number
          price_max: number
          price_min: number
          slug: string
          usage_key: string
        }[]
      }
      get_priority_ranking: {
        Args: { p_priority: string }
        Returns: {
          brand: string
          name: string
          primary_score: number
          risk_level: string
          slug: string
          updated_at: string
          verification_score: number
        }[]
      }
      get_priority_ranking_v2: {
        Args: { p_priority: string }
        Returns: {
          brand: string
          name: string
          primary_score: number
          risk_level: string
          slug: string
          updated_at: string
          verification_score: number
          weighted_score: number
        }[]
      }
      get_priority_winner_gap: {
        Args: {
          p_brand?: string
          p_budget?: number
          p_priority: string
          p_trust?: string
        }
        Returns: {
          recommendation_strength: string
          score_gap: number
          second_slug: string
          top_slug: string
        }[]
      }
      get_ranked_products_final: {
        Args: {
          p_brand?: string
          p_budget?: number
          p_priority: string
          p_trust?: string
        }
        Returns: {
          brand: string
          name: string
          price_max: number
          price_min: number
          primary_score: number
          risk_level: string
          slug: string
          updated_at: string
          verification_score: number
          weighted_score: number
        }[]
      }
      get_recommendation_pack_v1: {
        Args: {
          p_budget_max: number
          p_budget_min: number
          p_usage_key: string
        }
        Returns: Json
      }
      promote_products: { Args: never; Returns: undefined }
      promote_products_staging: { Args: never; Returns: undefined }
      refresh_verification_status: { Args: never; Returns: undefined }
      run_trust_rank_pipeline: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
