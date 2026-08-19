"use client";

import Image from "next/image";
import type { GitHubProfileData } from "@/lib/github/types";
import { User, ExternalLink, MapPin, BookOpen, FolderGit2, Users } from "lucide-react";

type ProfileViewProps = {
  profile: GitHubProfileData | null;
};

export function ProfileView({ profile }: ProfileViewProps) {
  if (!profile) {
    return (
      <div className="rounded-lg border border-dashed border-white/10 p-6 text-center text-xs font-mono text-white/40">
        GitHub profile information unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-5 select-none font-sans">
      {/* Profile card */}
      <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5 space-y-4">
        <div className="flex items-start gap-4">
          {/* Live Avatar or Typographic Fallback */}
          <div className="relative shrink-0 flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-slate-950/60 overflow-hidden shadow-md">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={`${profile.name} GitHub avatar`}
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <div className="flex flex-col items-center justify-center font-mono text-accent text-lg font-bold">
                AR
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {profile.name}
            </h3>
            <p className="font-mono text-xs text-accent font-semibold">
              @{profile.username}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[0.68rem] text-white/50 font-mono">
              <span className="flex items-center gap-1">
                <FolderGit2 className="h-3 w-3 text-accent/70" />
                {profile.publicRepos} Public Repos
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3 text-accent/70" />
                {profile.followers} Followers
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-white/80 leading-relaxed pt-1 border-t border-white/8">
          {profile.bio}
        </p>

        {/* Meta details */}
        <div className="pt-2 border-t border-white/8 space-y-2 font-mono text-[0.68rem] text-white/60">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-accent/70" />
            <span>B.Tech Computer Science & Engineering</span>
          </div>
          {profile.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-accent/70" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Profile Button */}
      {profile.profileUrl && (
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 hover:bg-accent hover:text-slate-950 transition-all font-mono text-xs font-semibold text-accent"
        >
          <div className="flex items-center gap-2.5">
            <User className="h-4 w-4" />
            <span>OPEN GITHUB PROFILE</span>
            <span className="text-[0.65rem] opacity-75">(@{profile.username})</span>
          </div>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      {/* Direction summary */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40 block">
          ENGINEERING FOCUS
        </span>
        <div className="space-y-1.5 font-mono text-xs text-white/80">
          {[
            "Full-Stack Web Applications & REST Services",
            "Distributed Systems & Cloud Infrastructure",
            "Artificial Intelligence & Machine Learning Exploration",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
