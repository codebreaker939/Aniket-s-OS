"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { DesktopAppId } from "@/types";
import {
  credentialsData,
  categoryFilters,
  type CredentialItem,
  type CredentialCategory,
} from "@/lib/credentials-data";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import {
  ShieldCheck,
  Search,
  ExternalLink,
  CheckCircle2,
  Clock,
  Wrench,
  ArrowLeft,
  Info,
  Layers,
  FileCheck,
} from "lucide-react";

export function CertificationsApp() {
  const windowManager = useOptionalWindowManager();
  const openApp = (id: DesktopAppId) => {
    windowManager?.openApp(id);
  };
  const [selectedCategory, setSelectedCategory] = useState<CredentialCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCredId, setSelectedCredId] = useState<string>(credentialsData[0].id);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // Filtering
  const filteredCredentials = credentialsData.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedCredential =
    filteredCredentials.find((c) => c.id === selectedCredId) ||
    filteredCredentials[0] ||
    null;

  const handleSelectCredential = (id: string) => {
    setSelectedCredId(id);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white select-none">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              CREDENTIALS
            </h2>
            <p className="text-[0.68rem] text-white/60">
              Certifications / Verified Learning
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <Layers className="h-3 w-3 text-accent" />
          <span>{credentialsData.length} RECORDED TRACKS</span>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[15.5rem_1fr] gap-4 min-h-[28rem]">
        {/* Left Panel: Category Filter + Search + Credential List */}
        <div
          className={`flex flex-col gap-3 border-r border-white/10 pr-0 md:pr-4 ${
            showMobileDetail ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Category Tabs */}
          <div className="space-y-1">
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/35 block mb-1">
              Category
            </span>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
              {categoryFilters.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative w-full text-left rounded-lg px-2.5 py-2 font-mono text-[0.64rem] font-bold uppercase tracking-wider transition-all ${
                      isSelected
                        ? "bg-accent/15 border border-accent/40 text-accent"
                        : "bg-white/[0.02] border border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="cred-cat-indicator"
                        className="absolute left-0 top-1 bottom-1 w-[2px] bg-accent rounded-full hidden md:block"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-8 pr-3 py-1.5 font-mono text-[0.7rem] text-white placeholder:text-white/30 outline-none focus:border-accent/40"
              aria-label="Search credentials"
            />
          </div>

          {/* List of Credential Items */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 no-scrollbar min-h-[14rem]">
            {filteredCredentials.length === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-xs font-mono text-white/40">
                No matching records.
              </div>
            ) : (
              filteredCredentials.map((cred) => {
                const isSelected = selectedCredential?.id === cred.id;
                return (
                  <button
                    key={cred.id}
                    type="button"
                    onClick={() => handleSelectCredential(cred.id)}
                    className={`w-full text-left rounded-lg border p-3 transition-all ${
                      isSelected
                        ? "border-accent/50 bg-accent/10 shadow-sm"
                        : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <StatusBadge status={cred.status} />
                      <span className="font-mono text-[0.55rem] text-white/35 uppercase">
                        {cred.issuedAt}
                      </span>
                    </div>

                    <h4 className="font-semibold text-xs text-white line-clamp-1">
                      {cred.name}
                    </h4>

                    <p className="text-[0.68rem] text-white/60 truncate mt-0.5">
                      {cred.issuer}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Selected Credential Detail & Verification */}
        <div
          className={`flex flex-col min-h-0 overflow-y-auto pr-1 no-scrollbar ${
            showMobileDetail ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back Button */}
          {showMobileDetail && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileDetail(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Credentials List</span>
              </button>
            </div>
          )}

          {selectedCredential ? (
            <div className="space-y-4">
              {/* Card Header */}
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <StatusBadge status={selectedCredential.status} size="lg" />

                  <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/40 uppercase">
                    <span>Category:</span>
                    <span className="text-accent font-bold">{selectedCredential.category}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {selectedCredential.name}
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    Issued by <span className="text-white font-medium">{selectedCredential.issuer}</span> · {selectedCredential.issuedAt}
                  </p>
                </div>

                {selectedCredential.credentialId && (
                  <div className="font-mono text-[0.65rem] text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded w-fit flex items-center gap-2">
                    <span className="uppercase text-white/35">Credential ID:</span>
                    <span className="text-accent font-semibold">{selectedCredential.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
                <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                  CREDENTIAL DESCRIPTION
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  {selectedCredential.description}
                </p>
              </div>

              {/* Skills Associated */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                    ASSOCIATED SKILLS & TECHNOLOGIES
                  </h4>
                  <button
                    type="button"
                    onClick={() => openApp("toolbox")}
                    className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-accent hover:underline uppercase tracking-wider"
                  >
                    <Wrench className="h-3 w-3" />
                    <span>View in Toolbox</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedCredential.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[0.62rem] text-white/80 bg-slate-950/40 border border-white/10 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Action Block */}
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <FileCheck className="h-4 w-4 text-accent shrink-0" />
                  <span>
                    {selectedCredential.status === "verified"
                      ? "Verified record active in system database."
                      : selectedCredential.status === "in_progress"
                      ? "Degree track actively in progress."
                      : "Documented technical research trajectory."}
                  </span>
                </div>

                {selectedCredential.verificationUrl ? (
                  <a
                    href={selectedCredential.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/20 border border-accent/40 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="font-mono text-[0.62rem] text-accent/80 bg-accent/10 border border-accent/20 px-3 py-1.5 rounded uppercase font-semibold">
                    Verification Record Active
                  </span>
                )}
              </div>

              {/* Dignified Archive Notice for External Certificates */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3">
                <Info className="h-4 w-4 text-white/40 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-mono text-[0.62rem] font-bold text-white/60 uppercase tracking-wider">
                    EXTERNAL CERTIFICATE ARCHIVE NOTICE
                  </p>
                  <p className="text-[0.7rem] text-white/50 leading-relaxed">
                    Third-party external certificates (e.g., AWS, Coursera, vendor certifications) will be appended here as formal physical or digital certificates are issued. Unverified credentials are intentionally omitted.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ─── Status Badge Helper ────────────────────────────────── */

function StatusBadge({
  status,
  size = "sm",
}: {
  status: CredentialItem["status"];
  size?: "sm" | "lg";
}) {
  if (status === "verified") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border border-emerald-400/30 bg-emerald-400/10 font-mono font-bold text-emerald-400 uppercase tracking-wider ${
          size === "lg" ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[0.55rem]"
        }`}
      >
        <ShieldCheck className={size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} />
        <span>Verified</span>
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border border-amber-400/30 bg-amber-400/10 font-mono font-bold text-amber-400 uppercase tracking-wider ${
          size === "lg" ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[0.55rem]"
        }`}
      >
        <Clock className={size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} />
        <span>In Progress</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border border-blue-400/30 bg-blue-400/10 font-mono font-bold text-blue-400 uppercase tracking-wider ${
        size === "lg" ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[0.55rem]"
      }`}
    >
      <CheckCircle2 className={size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} />
      <span>Documented</span>
    </span>
  );
}
