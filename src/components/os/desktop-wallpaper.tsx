export function DesktopWallpaper() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="desktop-wallpaper-canvas absolute inset-0" />
      <div className="desktop-wallpaper-grid absolute inset-0" />
      <div className="desktop-vignette absolute inset-0" />
      <div className="desktop-grain absolute inset-0" />
    </div>
  );
}

