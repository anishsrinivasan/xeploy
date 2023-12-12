import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  PlusCircledIcon,
  CircleBackslashIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "true",
    label: "Enabled",
    icon: PlusCircledIcon,
  },
  {
    value: "false",
    label: "Disabled",
    icon: CircleBackslashIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
