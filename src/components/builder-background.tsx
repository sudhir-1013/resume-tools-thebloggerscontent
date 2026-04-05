export function BuilderBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -top-32 left-1/2 h-[420px] w-[min(88vw,640px)] -translate-x-1/2 rounded-full bg-primary-glow blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 right-[-15%] h-[320px] w-[min(65vw,420px)] rounded-full bg-secondary-glow blur-[90px]"
        aria-hidden
      />
    </>
  );
}
