/* ─── GitHub Configuration & Experiment Mappings ─────────── */

export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "codebreaker939";

/**
 * Maps known GitHub repository names to Engineering Lab experiment IDs.
 */
export const REPOSITORY_LAB_MAPPINGS: Record<string, string> = {
  "locksync_sd": "LAB-002",
  "locksync": "LAB-002",
  "claimfast": "LAB-001",
  "v-pred": "LAB-003",
  "vehicle-maintenance-predictor": "LAB-003",
  "helixai": "LAB-004",
  "disastermanagement_automated": "LAB-005",
  "disasteralert-cloud": "LAB-005",
  "disasteralert": "LAB-005",
  "aniket-s-os": "LAB-006",
  "aniket-os": "LAB-006",
};

/**
 * Known portfolio project display names.
 */
export const KNOWN_PROJECT_NAMES: Record<string, string> = {
  "locksync_sd": "LockSync (Distributed Mutex)",
  "v-pred": "Vehicle Maintenance Predictor",
  "helixai": "HelixAI (Genomic Platform)",
  "disastermanagement_automated": "DisasterAlert Cloud",
  "aniket-s-os": "Aniket OS",
};
