import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "@/lib/github/config";
import { normalizeGitHubData } from "@/lib/github/mapper";
import type { GitHubNormalizedData } from "@/lib/github/types";

export const revalidate = 3600; // Cache for 1 hour server-side

export async function GET(): Promise<NextResponse<GitHubNormalizedData>> {
  if (!GITHUB_USERNAME) {
    return NextResponse.json({
      status: "NOT_CONFIGURED",
      profile: null,
      repositories: [],
      recentActivity: [],
      error: "GitHub username is not configured.",
    });
  }

  try {
    const headers = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Aniket-OS-Portfolio-Workstation",
    };

    // Parallel server-side fetch to GitHub API
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({
        status: "UNAVAILABLE",
        profile: null,
        repositories: [],
        recentActivity: [],
        error: `GitHub API error: ${userRes.status} / ${reposRes.status}`,
      });
    }

    const userJson = await userRes.json();
    const reposJson = await reposRes.json();

    const normalized = normalizeGitHubData(userJson, reposJson);
    return NextResponse.json(normalized);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error fetching GitHub data.";
    return NextResponse.json({
      status: "UNAVAILABLE",
      profile: null,
      repositories: [],
      recentActivity: [],
      error: errorMessage,
    });
  }
}
