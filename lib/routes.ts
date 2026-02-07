import {
  BookOpenText,
  Database,
  FolderSearch,
  Footprints,
  Hash,
  LifeBuoy,
  PieChart,
  Settings2,
  ShieldAlert,
} from "lucide-react";
import { AppSidebarMenu } from "./types";

export const ROUTES = {
  index: "/",
  dataSource: "/data-sources",
  reportsAudit: "/reports",
  settings: "/settings",
  reconciliation: "/recon",
  exceptions: "/exceptions",
  support: "/support",
  docs: "/docs",
  overview: "/overview",
  reconciliationRule: "/recon/rules",
};

export const SIDEBAR_MENU: AppSidebarMenu = {
  secondary: [
    {
      label: "Help & Support",
      url: "mailto:langfordquarshie21@gmail.com",
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
      children: [
        {
          label: "Rules",
          url: ROUTES.reconciliationRule,
          icon: Hash,
          enabled: false,
        },
      ],
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
  ],
};
