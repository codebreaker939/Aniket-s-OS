export function DesktopWallpaper() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="desktop-wallpaper-base absolute inset-0" />
      <div className="desktop-aurora-field desktop-aurora-field-primary absolute inset-0" />
      <div className="desktop-aurora-field desktop-aurora-field-secondary absolute inset-0" />
      <div className="desktop-warm-horizon absolute inset-0" />
      <div className="desktop-material-depth absolute inset-0" />
      <div className="desktop-vignette absolute inset-0" />
      <div className="desktop-grain absolute inset-0" />
    </div>
  );
}
