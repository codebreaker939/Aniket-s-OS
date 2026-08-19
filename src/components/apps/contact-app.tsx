"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { contactConfig, type ContactMessageForm } from "@/lib/contact-data";
import { validateContactForm } from "@/lib/contact-validation";
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
  Send,
  Sparkles,
  AlertCircle,
  MapPin,
  Briefcase,
  RotateCcw,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function ContactApp() {
  const c = contactConfig;

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Partial<Record<keyof ContactMessageForm, string>>>({});
  const [isCopiedEmail, setIsCopiedEmail] = useState(false);
  const [isCopiedMessage, setIsCopiedMessage] = useState(false);
  const [preparedMailto, setPreparedMailto] = useState<{
    mailtoUrl: string;
    bodyText: string;
    subject: string;
  } | null>(null);

  // Copy Email to Clipboard
  const handleCopyEmail = () => {
    if (c.email) {
      navigator.clipboard.writeText(c.email);
      setIsCopiedEmail(true);
      setTimeout(() => setIsCopiedEmail(false), 2000);
    }
  };

  // Form Submission (Option B: Prepare Mailto & Local Demo Confirmation)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: ContactMessageForm = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    const formattedBody = `Hello Aniket,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`;
    const mailtoUrl = `mailto:${c.email || ""}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formattedBody)}`;

    setPreparedMailto({
      mailtoUrl,
      bodyText: formattedBody,
      subject: formData.subject,
    });
  };

  // Copy Prepared Message Text
  const handleCopyPreparedMessage = () => {
    if (preparedMailto) {
      navigator.clipboard.writeText(
        `Subject: ${preparedMailto.subject}\n\n${preparedMailto.bodyText}`
      );
      setIsCopiedMessage(true);
      setTimeout(() => setIsCopiedMessage(false), 2000);
    }
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
    setPreparedMailto(null);
  };

  return (
    <div className="flex flex-col space-y-4 text-white select-none font-sans">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              CONTACT
            </h2>
            <p className="text-[0.68rem] text-white/60">
              Open a Connection / Direct Communication Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[0.62rem] text-emerald-400 font-semibold uppercase tracking-wider border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{c.status}</span>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[28rem]">
        {/* Left Side: Communication Profile & Direct Channels */}
        <div className="space-y-4">
          {/* Identity Card */}
          <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5 space-y-2">
            <span className="font-mono text-[0.58rem] font-bold text-accent uppercase tracking-[0.2em] block">
              OPEN A CONNECTION
            </span>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {c.name}
            </h3>

            <p className="font-mono text-xs text-accent font-medium">
              {c.role}
            </p>

            <div className="flex items-center gap-2 text-xs text-white/60 font-mono pt-1 border-t border-white/8">
              <span>{c.title}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-white/40" />
                {c.location}
              </span>
            </div>

            <p className="text-xs text-white/75 leading-relaxed pt-1">
              Open to conversations around software engineering internships, full-stack development, applied machine learning projects, and technical collaborations.
            </p>
          </div>

          {/* Direct Communication Channels */}
          <div className="space-y-2.5">
            <span className="font-mono text-[0.58rem] font-bold text-white/40 uppercase tracking-[0.16em] block">
              DIRECT CHANNELS
            </span>

            {/* Email Channel */}
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-mono text-xs font-semibold text-white">EMAIL</span>
                </div>
                <span className="font-mono text-[0.58rem] text-white/35 uppercase">Primary Channel</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-white/5">
                <span className="font-mono text-xs text-white/90 truncate">
                  {c.email || "NOT CONFIGURED"}
                </span>

                {c.email && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[0.62rem] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                    >
                      {isCopiedEmail ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${c.email}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent/20 border border-accent/40 font-mono text-[0.62rem] font-semibold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
                    >
                      <Send className="h-3 w-3" />
                      <span>Send</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* LinkedIn & GitHub Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* LinkedIn */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-accent shrink-0" />
                    <span className="font-mono text-xs font-semibold text-white">LINKEDIN</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] text-white/40">
                    {c.linkedin ? "Professional Profile" : "NOT CONFIGURED"}
                  </span>
                  {c.linkedin ? (
                    <a
                      href={c.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[0.62rem] font-semibold text-accent hover:underline"
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-[0.6rem] text-white/25">Disabled</span>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-accent shrink-0" />
                    <span className="font-mono text-xs font-semibold text-white">GITHUB</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] text-white/40">
                    {c.github ? "Source Control" : "NOT CONFIGURED"}
                  </span>
                  {c.github ? (
                    <a
                      href={c.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[0.62rem] font-semibold text-accent hover:underline"
                    >
                      <span>Open</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-[0.6rem] text-white/25">Disabled</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Currently Open To */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6rem] font-bold text-white/40 uppercase tracking-[0.16em]">
                CURRENTLY OPEN TO
              </span>
              <Briefcase className="h-3.5 w-3.5 text-emerald-400/70" />
            </div>

            <ul className="space-y-1.5 pt-1">
              {c.opportunities.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Message Console / Form */}
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {preparedMailto ? (
              /* Honest Preparation Confirmation Screen */
              <motion.div
                key="prepared"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="rounded-xl border border-accent/30 bg-accent/[0.04] p-5 space-y-4 text-center font-sans h-full flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15 text-accent mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>

                  <div>
                    <span className="font-mono text-[0.62rem] font-bold text-accent uppercase tracking-[0.2em] px-2.5 py-0.5 rounded border border-accent/30 bg-accent/10">
                      DISPATCH READY
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight mt-2">
                      MESSAGE PREPARED
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed max-w-sm mx-auto mt-1">
                      Your message has been formatted. Click below to launch your email client with your pre-filled inquiry.
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-slate-950/40 p-3 text-left space-y-1.5 font-mono text-[0.65rem] text-white/60">
                    <div className="flex items-center justify-between text-accent border-b border-white/5 pb-1">
                      <span className="font-semibold uppercase">PRE-FILLED INQUIRY SUMMARY</span>
                      <span>{preparedMailto.subject}</span>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed italic text-white/70 line-clamp-4 pt-1">
                      {preparedMailto.bodyText}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {c.email && (
                      <a
                        href={preparedMailto.mailtoUrl}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-bold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Open Email Client</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={handleCopyPreparedMessage}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-white/20 transition-all uppercase tracking-wider"
                    >
                      {isCopiedMessage ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center gap-1 font-mono text-[0.62rem] text-white/40 hover:text-white transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Prepare Another Message</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Message Form */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4 font-sans flex flex-col justify-between h-full"
              >
                <div className="space-y-3.5">
                  <div className="border-b border-white/10 pb-2.5">
                    <span className="font-mono text-[0.6rem] font-bold text-accent uppercase tracking-[0.18em] block">
                      MESSAGE CONSOLE
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      PREPARE AN INQUIRY
                    </h3>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
                      NAME <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50"
                    />
                    {errors.name && (
                      <p className="font-mono text-[0.62rem] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
                      EMAIL ADDRESS <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50"
                    />
                    {errors.email && (
                      <p className="font-mono text-[0.62rem] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label htmlFor="contact-subject" className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
                      SUBJECT <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g., Internship Inquiry / Software Collaboration"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                      }}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50"
                    />
                    {errors.subject && (
                      <p className="font-mono text-[0.62rem] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
                        MESSAGE <span className="text-accent">*</span>
                      </label>
                      <span className="font-mono text-[0.58rem] text-white/35">
                        {message.length} / 500
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50 leading-relaxed resize-none"
                    />
                    {errors.message && (
                      <p className="font-mono text-[0.62rem] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Privacy & Action */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[0.65rem] text-white/40 font-mono">
                    <Lock className="h-3 w-3 text-accent shrink-0" />
                    <span>Direct dispatch via local mailto client. No server logs.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-5 py-2.5 font-mono text-xs font-bold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Prepare Message</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
