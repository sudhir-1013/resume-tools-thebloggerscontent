"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import {
  clearDraftFromStorage,
  defaultDraft,
  loadDraftFromStorage,
  normalizeDraft,
  type ResumeDraft,
  saveDraftToStorage,
} from "@/lib/resume-draft";

export function useResumeDraft() {
  const [draft, setDraft] = useState<ResumeDraft>(() => defaultDraft());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    startTransition(() => {
      const loaded = loadDraftFromStorage();
      if (loaded) {
        setDraft(normalizeDraft(loaded));
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveDraftToStorage(draft);
  }, [draft, hydrated]);

  const updateDraft = useCallback(
    (patch: Partial<ResumeDraft> | ((prev: ResumeDraft) => ResumeDraft)) => {
      setDraft((prev) => {
        const next = typeof patch === "function" ? patch(prev) : { ...prev, ...patch };
        return normalizeDraft(next);
      });
    },
    [],
  );

  const resetDraft = useCallback(() => {
    clearDraftFromStorage();
    setDraft(defaultDraft());
  }, []);

  return { draft, updateDraft, hydrated, resetDraft };
}
