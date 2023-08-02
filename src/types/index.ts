import { store } from 'redux/reducers';
export type Dispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppState = typeof store.getState;

export type { AdminState, AdminComponentProps } from './admin';
export type { ErrorState } from './error';
export type { ManualState, ManualOrderType } from './manual';
export type {
  DashboardState,
  DashboardElement,
  DashboardTableProps,
  PnlBody,
  TableHeadItem,
} from './dashboard';

export type {
  BotState,
  MyBotsItemType,
  BotTypes,
  BotModalStepValues,
} from './bot';
export type {
  CopyState,
  PostFeedbackType,
  CopyModalStepValues,
  CopyModalStepErrors,
  CopyPositionTable,
  CopyEditUserTypes,
  EditTraderData,
  TraderFollowers,
} from './copy';
export type { LoadingState } from './loading';
export type { ModalState } from './modal';
export type { SettingsState, SettingsInputs, CopyMainProps } from './settings';
export type { SignalState } from './signal';
export type {
  SpotState,
  SpotMarket,
  SpotLimitValues,
  SpotListItemType,
  BalanceChartDataItemType,
  ActiveOrderItemType,
  OverviewType,
  WalletItemType,
} from './spot';
export type { StylesState, Theme } from './styles';
export type { SubaccountsState } from './subaccounts';
export type { SuccessState } from './success';
export type { TranslationsState } from './translations';
export type { WarningsState } from './warnings';
export type { FetchOrderProps, PairTypes } from './trading';
export type {
  LoginValues,
  RegisterValues,
  ResetPasswordValues,
  UserState,
  AlternativeAuthProps,
} from './user';
export type { NotificationState, NotificationsItem } from './notifications';
export type TableHead = Array<{
  name: string;
  id: string;
  active?: boolean;
  text?: string;
}>;
export type { NavigationState, MenuResponsive, Menu } from './navigation';
export type {
  WalletState,
  WalletNavigation,
  WalletNavigationNames,
  WalletsItemType,
} from './wallet';
export type { MarketState, MarketTypes, MarketAsProps } from './markets';
export type { AffiliateState } from './affiliate';
interface TableAllHaveTypes {
  side: 'Sell' | 'Buy';
  size: number;
  symbol: string;
  currency: string;
  entry_price: string | number;
  trade_type: string;
  market: 'Bybit' | 'Binance' | 'Phemex' | 'Demo';
  order_type: string;
}

export interface OpenPositionData extends TableAllHaveTypes {
  leverage: string | number;
  liquidation_price: string;
  margin_type: string;
  market_id: string | number;
  market_price: string | number;
  position_margin: string | number;
  realize_pnl: string | number;
  stop_loss: string | number;
  take_profit: string | number;
  unrealize_pnl: string | number;
}

export interface ClosedPositionData extends TableAllHaveTypes {
  close_time: string;
  closed_pnl: number | string;
  exchange_fee: number;
  exit_price: number;
  funding_fee: number;
  open_time: string;
  realized_pnl: number;
  roi: number | string;
}

export interface ActiveOrdersData extends TableAllHaveTypes {
  close_order_id: string;
  filled: string;
  market_id: number | string;
  order_no: string;
  price: string;
  tpsl: string;
  tp: Record<string, number>;
  sl: Record<string, number>;
  displaySymbol: string;
  size: number;
  status: string;
  trade_type: string;
  value: number;
}

export interface FilledOrderData extends TableAllHaveTypes {
  exec_price: number;
  exec_qty: string;
  fee: string | number;
  order_id: string;
  pnl: string | number;
  price: string | number;
  order_no: string;
}

export interface OrderHistoryData extends TableAllHaveTypes {
  filled: string;
  price: string;
  status: string;
}

export interface ConditionalOrderData extends TableAllHaveTypes {
  displaySymbol: string;
  price: string | number;
  trigger_price: string;
  trigger: string;
  trade_type: string;
  order_no: string;
  close_order_id: string;
  status: string;
  time: string;
  plan_type?: string;
}

export type TablesNavigation =
  | 'open_positions'
  | 'closed_positions'
  | 'active_orders'
  | 'conditional_orders'
  | 'fills'
  | 'order_history';

export type GridDragDropOptions = {
  [key: string]: {
    x: number;
    y: number;
    w: number;
    h: number;
    isResizable?: boolean;
    maxW?: number;
    minW?: number;
    minH?: number;
    maxH?: number;
    moved?: boolean;
    static?: boolean;
    i?: string | number;
  };
};

export enum AcitveTradingMenu {
  LIMIT = 'Limit',
  MARKET = 'Market',
  CONDITIONAL = 'Conditional',
}

export enum OrderSource {
  c0 = 'Direct',
  c1 = 'Copy',
  c2 = 'Bot',
  c3 = 'Subaccount',
}

export const retSource = (source: string) =>
  OrderSource[`c${source as keyof unknown}`];

export interface OrderBookType {
  price?: number;
  quantity?: number | string;
  sell?: boolean;
}

declare global {
  interface Window {
    electron: Record<string, (() => Promise<string>) | undefined>;
  }
}
