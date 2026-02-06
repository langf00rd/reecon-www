import { AppContext } from "@/components/providers/app";
import { useContext } from "react";

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
