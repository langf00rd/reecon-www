import {
  BookOpenText,
  FolderSymlink,
  HatGlasses,
  LifeBuoy,
  PieChart,
} from "lucide-react";

export const SIDEBAR_MENU = {
  secondaryNav: [
    {
      label: "Help & Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      label: "Documentation",
      url: "#",
      icon: BookOpenText,
    },
  ],
  main: [
    {
      label: "Overview",
      url: "#",
      icon: PieChart,
    },
    {
      label: "Reconciliation",
      url: "#",
      icon: FolderSymlink,
    },
    {
      label: "Fraud Detection",
      url: "#",
      icon: HatGlasses,
    },
  ],
};
