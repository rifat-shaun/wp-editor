import { capitalize } from "@/utils/Common";

export const TABS = ['Home', 'Insert', 'Table', 'Page', 'Export'] as const;
export type TTabKey = (typeof TABS)[number];

export const TOOLBAR_TYPES_ENUM = {
  CLASSIC: "classic",
  PROFESSIONAL: "professional",
  HIDE_TOOLBAR: "hide toolbar",
};

export type TToolbarType = (typeof TOOLBAR_TYPES_ENUM)[keyof typeof TOOLBAR_TYPES_ENUM];

export const TOOLBAR_TYPES = {
  CLASSIC: {
    name: TOOLBAR_TYPES_ENUM.CLASSIC,
    label: capitalize(TOOLBAR_TYPES_ENUM.CLASSIC),
    height: 40,
  },
  PROFESSIONAL: {
    name: TOOLBAR_TYPES_ENUM.PROFESSIONAL,
    label: capitalize(TOOLBAR_TYPES_ENUM.PROFESSIONAL),
    height: 92,
  },
  NONE: {
    name: TOOLBAR_TYPES_ENUM.HIDE_TOOLBAR,
    label: capitalize(TOOLBAR_TYPES_ENUM.HIDE_TOOLBAR),
    height: 0,
  },
};
