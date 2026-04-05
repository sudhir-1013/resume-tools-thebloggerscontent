import type { ResumeThemeId } from "@/lib/resume-themes";

type ThemeMiniPreviewProps = {
  themeId: ResumeThemeId;
  accent: string;
};

export function ThemeMiniPreview({ themeId, accent }: ThemeMiniPreviewProps) {
  const line = (w: string) => (
    <div
      className="h-1 rounded-full bg-slate-200/90"
      style={{ width: w }}
      aria-hidden
    />
  );

  const paper = "flex h-[7.5rem] flex-col overflow-hidden rounded-md bg-white shadow-inner ring-1 ring-black/5";

  /* Executive two-column (reference: blue executive CV) */
  if (themeId === "midnight-executive") {
    return (
      <div className={paper}>
        <div className="flex shrink-0 flex-col items-center gap-1 px-2 py-1.5">
          {line("55%")}
          <div
            className="h-1.5 w-[70%] rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
          {line("40%")}
        </div>
        <div className="flex flex-1 gap-1.5 p-2">
          <div className="flex w-[58%] flex-col gap-1">
            {line("100%")}
            {line("92%")}
            {line("88%")}
          </div>
          <div
            className="flex w-[38%] flex-col gap-1 border-l border-slate-200 pl-2"
            aria-hidden
          >
            {line("75%")}
            {line("65%")}
            {line("80%")}
          </div>
        </div>
      </div>
    );
  }

  /* Classic serif: strong top rule + stacked sections */
  if (themeId === "slate-professional") {
    return (
      <div className={`${paper} p-2.5`}>
        <div className="flex flex-col gap-1">
          {line("50%")}
          {line("85%")}
        </div>
        <div className="my-1.5 h-px w-full bg-slate-900" aria-hidden />
        <div className="flex flex-col gap-1">
          <span className="font-serif text-[7px] font-bold text-slate-800">
            SECTION
          </span>
          {line("100%")}
          {line("70%")}
        </div>
        <div className="mt-1 h-px w-full bg-slate-900" aria-hidden />
      </div>
    );
  }

  /* Canvas ATS — single column, quiet header */
  if (themeId === "canvas-minimal") {
    return (
      <div className={`${paper} gap-2 p-3`}>
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
          {line("55%")}
          {line("40%")}
        </div>
        <div className="flex flex-col gap-1.5">
          {line("100%")}
          {line("100%")}
          {line("72%")}
        </div>
      </div>
    );
  }

  /* Centered minimal + footer bar */
  return (
    <div className={`${paper} relative`}>
      <div className="flex flex-1 flex-col items-center gap-1 px-2 py-2">
        <div className="h-1.5 w-[65%] rounded-full bg-slate-900" aria-hidden />
        {line("45%")}
        <div className="mt-1 h-px w-full bg-slate-300" aria-hidden />
        <div className="mt-1 grid w-full grid-cols-3 gap-0.5 px-1">
          <div className="flex flex-col gap-0.5">
            {line("90%")}
            {line("70%")}
          </div>
          <div className="flex flex-col gap-0.5">
            {line("85%")}
            {line("75%")}
          </div>
          <div className="flex flex-col gap-0.5">
            {line("80%")}
            {line("65%")}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-2 rounded-b-md"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
    </div>
  );
}
