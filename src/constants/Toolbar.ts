import { capitalize } from "@/utils/Common";

export const TABS = ['Home', 'Insert', 'Table', 'Page', 'Export'] as const;
export type TTabKey = (typeof TABS)[number];

export const TOOLBAR_TYPES_ENUM = {
  CLASSIC: "classic",
  PROFESSIONAL: "professional",
  HIDE_TOOLBAR: "hide toolbar",
};

export const TOOLBAR_TYPES = {
  CLASSIC: {
    name: TOOLBAR_TYPES_ENUM.CLASSIC,
    label: capitalize(TOOLBAR_TYPES_ENUM.CLASSIC),
    height: 42,
  },
  PROFESSIONAL: {
    name: TOOLBAR_TYPES_ENUM.PROFESSIONAL,
    label: capitalize(TOOLBAR_TYPES_ENUM.PROFESSIONAL),
    height: 94,
  },
  NONE: {
    name: TOOLBAR_TYPES_ENUM.HIDE_TOOLBAR,
    label: capitalize(TOOLBAR_TYPES_ENUM.HIDE_TOOLBAR),
    height: 0,
  },
};

export const TOOLBAR_MENU_ITEMS = [
  {
    key: TOOLBAR_TYPES.CLASSIC.name,
    label: TOOLBAR_TYPES.CLASSIC.label,
  },
  {
    key: TOOLBAR_TYPES.PROFESSIONAL.name,
    label: TOOLBAR_TYPES.PROFESSIONAL.label,
  },
  {
    key: TOOLBAR_TYPES.NONE.name,
    label: TOOLBAR_TYPES.NONE.label,
  },
];
