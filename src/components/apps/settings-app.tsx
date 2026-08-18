import { Lock, Sliders } from "lucide-react";


export function SettingsApp() {
  const settings = [
    { title: "Reduced-Motion Aware Transitions", desc: "Respect system prefers-reduced-motion setting" },
    { title: "Keyboard Accessible Launch Targets", desc: "Full spatial and shortcut key support" },
    { title: "No Invented Credentials", desc: "Strict adherence to verified student records" },
    { title: "Client-Side Window Management", desc: "Native OS window state without route redirects" }
  ];

  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <Sliders className="h-3.5 w-3.5" />
          <span>System Preferences</span>
        </div>
        <h2 className="mt-1 text-lg font-bold tracking-tight text-white">SETTINGS</h2>
        <p className="mt-1 text-xs text-white/70">
          Aniket OS environment preferences and configuration parameters.
        </p>
      </div>

      <div className="space-y-2">
        {settings.map((s) => (
          <div key={s.title} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-xs text-white/85">
            <Lock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white/95">{s.title}</div>
              <div className="text-[0.68rem] text-white/55 mt-0.5">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
