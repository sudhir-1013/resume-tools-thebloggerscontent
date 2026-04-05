export function MarketingPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -top-40 left-1/2 h-[520px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-primary-glow blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 right-[-20%] h-[380px] w-[min(70vw,480px)] rounded-full bg-secondary-glow blur-[100px]"
        aria-hidden
      />
      {children}
    </div>
  );
}
