import {
  BookOpenText,
  Database,
  FolderSearch,
  Footprints,
  LifeBuoy,
  PieChart,
  Settings2,
  ShieldAlert,
} from "lucide-react";

export const ROUTES = {
  index: "/",
  dataSource: "/data-sources",
  reportsAudit: "/reports",
  settings: "/settings",
  reconciliation: "/reconciliation",
  exceptions: "/exceptions",
  support: "/support",
  docs: "/docs",
  overview: "/overview",
};

export const SIDEBAR_MENU = {
  secondaryNav: [
    {
      label: "Help & Support",
      url: "#",
      icon: LifeBuoy,
      enabled: false,
    },
    {
      label: "Documentation",
      url: "#",
      icon: BookOpenText,
      enabled: false,
    },
  ],
  main: [
    {
      label: "Overview",
      url: ROUTES.overview,
      icon: PieChart,
      enabled: true,
    },
    {
      label: "Data Sources",
      url: ROUTES.dataSource,
      icon: Database,
      enabled: false,
    },
    {
      label: "Reconciliation",
      url: ROUTES.reconciliation,
      icon: FolderSearch,
      enabled: true,
    },
    {
      label: "Exceptions",
      url: ROUTES.exceptions,
      icon: ShieldAlert,
      enabled: true,
    },
    {
      label: "Reports & Audit",
      url: ROUTES.reportsAudit,
      icon: Footprints,
      enabled: false,
    },
    {
      label: "Settings",
      url: ROUTES.settings,
      icon: Settings2,
      enabled: false,
    },
  ] as const,
};
