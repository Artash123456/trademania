export type NavigationState = {
  menu: Menu[];
  menu_responsive: MenuResponsive[];
  settings: { name: string; path: string }[];
  admin: { name: string; path: string }[];
  spot: { name: string; path: string }[];
  is_open: boolean;
};
export interface Menu {
  name: string;
  children: Record<string, string>[];
  path?: string;
  ready?: string;
}

export interface MenuResponsive {
  name: string;
  icon: string;
  path?: string;
  children: Record<string, any>[];
}
