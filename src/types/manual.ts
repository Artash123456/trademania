import {
  ActiveOrdersData,
  ClosedPositionData,
  ConditionalOrderData,
  FilledOrderData,
  OpenPositionData,
  OrderHistoryData,
  PairTypes,
  TableHead,
  WalletsItemType,
} from 'types';

export type ManualState = {
  leverage: number | string;
  pairs: Array<PairTypes>;
  symbol: PairTypes;
  balance: {
    coin: string | number;
    usd: string | number;
    price: string;
  };
  timeInForce: TimeInForce[];
  timeInForceBinance: TimeInForceBinane[];
  menu: Menu[];
  socket_price: string | number;
  byTypeLabels: ByTypeLabels[];
  stopLossLabels: StopLossLabels[];
  takeProfitLabels: TakeProfitLabels[];
  take_profit_modal_drop_down: {
    [key: string]: any[];
  };
  limitMarketModal: limitMarketModal;

  marketLimitLabels: marketLimitLabels[];
  activeMenu: 'Limit' | 'Market';
  refresh: number;
  footer: TableHead;
  activeFooter: string;
  table: {
    openTbody: OpenPositionData[];
    closedTbody: ClosedPositionData[];
    activeTbody: ActiveOrdersData[];
    conditionalTbody: ConditionalOrderData[];
    filledTbody: FilledOrderData[];
    orderHistoryTbody: OrderHistoryData[];
  };
  orderCount: {
    name: string;
    count: number;
  };
  wallets: Record<string, WalletsItemType[]>;
  takeProfit: {
    trailing_stop: any;
    new_trailing_active: any;
    tp_trigger_by: number;
    sl_trigger_by: number;
  };
  totalBalance: number;
};

interface limitMarketModal {
  type: any;
  data: any;
}
interface marketLimitLabels {
  label: string;
  value: string;
  name: string;
  isActive: boolean;
}
interface Menu {
  name: 'Limit' | 'Market' | 'Conditional';
  active: boolean;
}

interface ByTypeLabels {
  label: 'ByMarkPrice' | 'ByLastPrice';
  value: 'ByMarkPrice' | 'ByLastPrice';
  name: 'trigger_by';
}

interface TimeInForce {
  label: 'GoodTillCancel' | 'ImmediateOrCancel' | 'FillOrKill';
  value: 'GoodTillCancel' | 'ImmediateOrCancel' | 'FillOrKill';
}
interface TimeInForceBinane {
  label: 'GTC' | 'IOC' | 'FOK';
  value: 'GTC' | 'IOC' | 'FOK';
}
interface StopLossLabels {
  label: 'Last' | 'Mark';
  value: 'ByLastPrice' | 'ByMarkPrice';
  name: 'slTrigger';
}
interface TakeProfitLabels {
  label: 'Last' | 'Mark';
  value: 'ByLastPrice' | 'ByMarkPrice';
  name: 'tpTrigger';
}
export type ManualAction = {
  type: string;
  payload: any;
};

export type ManualOrderType = {
  order_type: 'Limit' | 'Market';
  symbol: string;
  currency: string;
  quote: string;
  market: string | number;
  qty: string | number;
  price: string | number;
  stop_px?: string | number;
  side: string;
  post_only?: boolean;
  reduce_only?: boolean;
  close_on_trigger?: boolean;
  time_in_force?: string;
  trigger_by?: string;
  stop_loss?: string;
  take_profit?: string;
  slTrigger?: string;
  tpTrigger?: string | number;
  leverage?: string | number;
  trigger_type?: string;
  closeOnTrigger?: string;
};
