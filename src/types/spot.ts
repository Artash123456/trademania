import { Layouts } from 'react-grid-layout';
import { GridDragDropOptions, PairTypes, MarketTypes } from 'types';

export type SpotAction = {
  type: string;
  payload: any;
};
export type SpotState = {
  spot_overview: OverviewType;
  spot_list: { [key: string]: SpotListItemType[] };
  activeMarket: { name: string; id: number };
  markets: Array<{ name: string; id: number | string; icon?: string }> | [];
  pie_chart_data: Array<{
    value: number;
    title: string;
    color?: string;
  }>;
  wallets: { [key: string]: Array<WalletItemType> };
  pairs: Array<PairTypes>;
  pending: boolean;
  storeMarkets: Array<MarketTypes> | [];
  totalBalance: number;
  total_pnl: number;
  pairsTable: Record<
    string,
    { market: { name: string; icon: string }; value: string }[]
  >;
  balance_chart_data: Array<BalanceChartDataItemType> | [];
  balance_chart_default: Array<BalanceChartDataItemType> | [];
  active_orders: ActiveOrderItemType[] | [];
  menu: Menu[];
  side: Side[];
  activeMenu: 'Limit' | 'Market';
  activeSide: string;
  symbol: PairTypes;
  balance: { coin: number; usd: number; price: number | string };
  grid: GridDragDropOptions;
  default_containers: any;
  default_items_to_add: any;
  containers: any[];
  editable: boolean;
  items_to_add: any[];
  portfolio_change: Record<string, number>;
  trading_chart_info: { market: string; symbol: string };
  socket_price: number | string;
  layouts: Layouts;
  chart_filter: Chart[];
  isDemo: boolean;
};

export type OverviewType = Array<{
  market: number;
  total: number | string;
  wallets: WalletItemType[];
  trades: any[];
}>;

interface Menu {
  name: string;
  active: boolean;
}

interface Side {
  name: string;
  active: boolean;
}

interface Chart {
  name: string;
  active: boolean;
}

export type SpotMarket = {
  id: number | string;
  icon?: string;
  name: string;
  slug?: string;
};

export type SpotLimitValues = {
  qty: string;
  price: string;
  order_type: any;
  side: any;
  time_in_force: string;
  market: number | string;
  symbol: any;
  currency: any;
};

export type SpotListItemType = {
  symbol: string;
  last_price: string;
  market_cap: string;
  change_24h: number | string;
  displaySymbol: string;
  base: string;
  market: string;
  market_id: number | string;
  balance: number | string;
  isFavorite: boolean;
  kline_week: Array<{ value: string }>;
  isStableCoin?: boolean;
  holdings_btc?: string;
  total_balance?: number | string;
};

export interface BalanceChartDataItemType {
  id: number | string;
  total: number;
  date: string;
  time: string;
  date_time: string;
}

export interface ActiveOrderItemType {
  symbol: string;
  displaySymbol: string;
  side: string;
  size: string;
  price: string;
  value: string;
  filled: string;
  order_type: string;
  status: string;
  order_no: string;
  orderLinkId: string;
  tpsl: string;
  trade_type: string;
}

export interface WalletItemType {
  coin: string;
  free: number;
  total: number;
  market: string;
  icon: string;
  color: string;
  price?: string | number;
  pnl?: number;
}
