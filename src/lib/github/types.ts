/* ─── GitHub Normalized Data Types ─────────────────────── */

export type GitHubConnectionStatus = "CONNECTED" | "UNAVAILABLE" | "NOT_CONFIGURED";

export type GitHubProfileData = {
  name: string;
  username: string;
  avatarUrl: string | null;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  profileUrl: string;
  location: string | null;
};

export type GitHubRepoData = {
  id: number | string;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  language: string;
  topics: string[];
  updatedAt: string;
  createdAt: string;
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  labId?: string;
  category: "project" | "experiment" | "other";
};

export type GitHubActivityItem = {
  repoName: string;
  updatedAt: string;
  htmlUrl: string;
  language: string;
  labId?: string;
};

export type GitHubNormalizedData = {
  status: GitHubConnectionStatus;
  profile: GitHubProfileData | null;
  repositories: GitHubRepoData[];
  recentActivity: GitHubActivityItem[];
  error?: string;
};
