"use client";

import { ReconResultStatus } from "@/lib/enums";
import { ReconResult } from "@/lib/types";
import { createContext, ReactNode, useState } from "react";

export const AppContext = createContext<ReturnType<
  typeof useAppContextValue
> | null>(null);

const useAppContextValue = () => {
  const [reconResult, setReconResult] = useState<ReconResult[] | null>([]);

  function getGroupedReconResults() {
    const grouped = reconResult?.reduce(
      (acc, item) => {
        const key = item.status;
        if (!acc[key]) {
          acc[key] = [];
        }
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
  };
};

export function AppProvider({ children }: { children: ReactNode }) {
  const value = useAppContextValue();
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
