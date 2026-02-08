"use client";

import { ReconResultStatus } from "@/lib/enums";
import { CanonicalTransaction, ReconResult, ReconRule } from "@/lib/types";
import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext<ReturnType<
  typeof useAppContextValue
> | null>(null);

interface FileContent {
  data: Record<string, unknown>[];
  fileName: string;
}

const useAppContextValue = () => {
  const [reconRules, setReconRules] = useState<ReconRule[]>([]);
  const [reconResult, setReconResult] = useState<ReconResult[] | null>([]);
  const [filesContent, setFilesContent] = useState({
    internal: {} as FileContent,
    provider: {} as FileContent,
  });
  const [normalizedData, setNormalizedData] = useState({
    internal: [] as CanonicalTransaction[],
    provider: [] as CanonicalTransaction[],
  });
  const [isNormalizationDialogOpen, setIsNormalizationDialogOpen] = useState({
    internal: false,
    provider: false,
  });

  const allFilesSelected =
    !!filesContent.internal.fileName && !!filesContent.provider.fileName;

  function getGroupedReconResults() {
    const grouped = reconResult?.reduce(
      (acc, item) => {
        const key = item.status;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      },
      {} as Record<ReconResultStatus, ReconResult[]>,
    );
    return grouped;
  }

  return {
    reconResult,
    setReconResult,
    groupedReconResults: getGroupedReconResults(),
    reconRules,
    enabledReconRules: reconRules.filter((rule) => rule.enabled),
    setReconRules,
    normalizedData,
    setNormalizedData,
    isNormalizationDialogOpen,
    setIsNormalizationDialogOpen,
    allFilesSelected,
    setFilesContent,
    filesContent,
  };
};

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useAppContextValue();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
