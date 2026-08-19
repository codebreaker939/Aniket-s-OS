import { REPOSITORY_LAB_MAPPINGS, GITHUB_USERNAME } from "./config";
import type {
  GitHubProfileData,
  GitHubRepoData,
  GitHubActivityItem,
  GitHubNormalizedData,
} from "./types";

/* ─── Raw GitHub API Interfaces ──────────────────────────── */

export type RawGitHubUserResponse = {
  login?: string;
  name?: string;
  avatar_url?: string;
  html_url?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  location?: string;
};

export type RawGitHubRepoItem = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  updated_at: string;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
};

/**
 * Normalizes raw GitHub API user and repository objects into clean application models.
 */
export function normalizeGitHubData(
  userJson: RawGitHubUserResponse | null,
  reposJson: RawGitHubRepoItem[] | null
): GitHubNormalizedData {
  if (!GITHUB_USERNAME) {
    return {
      status: "NOT_CONFIGURED",
      profile: null,
      repositories: [],
      recentActivity: [],
      error: "GitHub username is not configured.",
    };
  }

  if (!userJson || !reposJson || !Array.isArray(reposJson)) {
    return {
      status: "UNAVAILABLE",
      profile: null,
      repositories: [],
      recentActivity: [],
      error: "GitHub API data unavailable.",
    };
  }

  // 1. Profile Normalization
  const profile: GitHubProfileData = {
    name: userJson.name || userJson.login || GITHUB_USERNAME,
    username: userJson.login || GITHUB_USERNAME,
    avatarUrl: userJson.avatar_url || null,
    bio: userJson.bio || "B.Tech CSE student building full-stack applications & exploring AI/ML.",
    publicRepos: userJson.public_repos ?? reposJson.length,
    followers: userJson.followers ?? 0,
    following: userJson.following ?? 0,
    profileUrl: userJson.html_url || `https://github.com/${GITHUB_USERNAME}`,
    location: userJson.location || "Navi Mumbai, India",
  };

  // 2. Repository Normalization & Experiment Mapping
  const repositories: GitHubRepoData[] = reposJson.map((repo) => {
    const nameLower = repo.name.toLowerCase();
    const labId = REPOSITORY_LAB_MAPPINGS[nameLower];
    const category = labId
      ? "experiment"
      : repo.description?.toLowerCase().includes("project")
      ? "project"
      : "other";

    return {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || "Public GitHub repository.",
      htmlUrl: repo.html_url,
      language: repo.language || "TypeScript",
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      isFork: repo.fork || false,
      isArchived: repo.archived || false,
      labId,
      category,
    };
  });

  // Sort repos by updatedAt descending
  repositories.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // 3. Activity Log (derived from recent repo updates)
  const recentActivity: GitHubActivityItem[] = repositories.slice(0, 6).map((repo) => ({
    repoName: repo.name,
    updatedAt: repo.updatedAt,
    htmlUrl: repo.htmlUrl,
    language: repo.language,
    labId: repo.labId,
  }));

  return {
    status: "CONNECTED",
    profile,
    repositories,
    recentActivity,
  };
}
