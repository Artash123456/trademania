import { GridDragDropOptions, PairTypes, TableHead } from 'types';

export type DashboardState = {
  grid: GridDragDropOptions;
  layouts: any;
  layout: any;
  containers: any[];
  default_containers: string;
  default_items_to_add: string;
  items_to_add: any[];
  categories: any[];
  editable: string;
  zoomed: string;
  images: {
    [key: string]: string;
  };
  tableHead: TableHeadItem[];
  pairs: PairTypes[];
  totalIncomeData: any;
  activeCategory: string;
  pnl: {};
};

export interface TableHeadItem {
  name: string;
  id: string;
  active: boolean;
  text: string;
}

export type DashboardElement = {
  market_id: number;
  type?: string;
  name?: string;
  id: string | number;
  head: string;
  data?: Record<string, unknown> | null;
  symbol?: string;
  market?: string;
  grid?: {
    h: number;
    w?: number;
    minW?: string;
    minH?: string;
    static?: boolean;
    isResizable?: boolean;
  };
  static?: boolean;
  is_spot?: number | boolean;
  logo: string;
  slug: string;
};

export type DashboardTableProps = {
  market_id?: number;
  has_credential?: boolean;
  refresh?: number;
  is_spot?: boolean | number;
  pair: PairTypes;
  tableHead?: TableHead;
  is_all?: boolean;
};

export type PnlBody = {
  balance: number;
  balance_usd: number;
  daily: { sum_coin: number; sum_usd: number; percent: number };
  markPrice: number;
  monthly: { sum_coin: number; sum_usd: number; percent: number };
  total_percent: number;
  total_pnl: number;
  total_pnl_btc: number;
  total_pnl_usd: number;
};
