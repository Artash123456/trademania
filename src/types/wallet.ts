export type WalletState = {
  navigation: Array<WalletNavigation>;
  savings_navigation: Array<WalletNavigation>;
  stacking_navigation: Array<WalletNavigation>;
  savings: Record<string, any>;
  stacking: Record<string, any>;
  liquid_swap: Record<string, any>;
  navigationActive: string;
  savings_navigationActive: string;
  stacking_navigationActive: string;
};
export type WalletNavigationNames =
  | 'navigation'
  | 'savings_navigation'
  | 'stacking_navigation';
export interface WalletNavigation {
  name: string;
  id: string;
  active: boolean;
}

export interface WalletsItemType {
  coin: string;
  free: number;
  total: number;
  market: string;
  icon: string;
  color: string;
  price?: string | number;
}
