"use client";

import type { GitHubProfile } from "@/lib/github-data";
import { User, ExternalLink, MapPin, BookOpen, Sparkles } from "lucide-react";

type ProfileViewProps = {
  profile: GitHubProfile;
};

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-5">
      {/* Profile card */}
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-start gap-4">
          {/* Avatar placeholder */}
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-accent shrink-0">
            <User className="h-7 w-7" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white tracking-tight">
              {profile.name}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
              <span className="font-mono text-[0.66rem] text-accent font-semibold uppercase tracking-wider">
                {profile.title}
              </span>
              <span className="w-[1px] h-3 bg-white/15 hidden sm:block" />
              <span className="font-mono text-[0.62rem] text-white/45 flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                {profile.focus}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-[0.78rem] text-white/60 leading-relaxed">
          {profile.bio}
        </p>

        {/* Meta */}
        <div className="mt-4 pt-3 border-t border-white/8 space-y-2">
          <div className="flex items-center gap-2 text-[0.68rem] text-white/45">
            <BookOpen className="h-3 w-3 text-white/30" />
            <span>B.Tech Computer Science & Engineering</span>
          </div>
          <div className="flex items-center gap-2 text-[0.68rem] text-white/45">
            <MapPin className="h-3 w-3 text-white/30" />
            <span>India</span>
          </div>
        </div>
      </div>

      {/* GitHub link */}
      {profile.profileUrl && (
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-accent/30 hover:bg-accent/[0.04] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40 group-hover:text-accent/60 transition-colors">
              GitHub
            </span>
            <span className="text-[0.74rem] text-white/70 group-hover:text-white transition-colors">
              @{profile.username}
            </span>
          </div>
          <ExternalLink className="h-3 w-3 text-white/25 group-hover:text-accent transition-colors" />
        </a>
      )}

      {/* Direction summary */}
      <div className="rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3.5">
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30 mb-2">
          Current Direction
        </p>
        <div className="space-y-1.5">
          {[
            "Full-Stack Web Applications",
            "Distributed Systems & Cloud Infrastructure",
            "AI / ML Exploration",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-[0.72rem] text-white/55"
            >
              <span className="h-1 w-1 rounded-full bg-accent/50 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
