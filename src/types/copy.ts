import { BalanceChartDataItemType } from 'types';
import { PairTypes } from './trading';

export type CopyState = {
  copy_ratings: OpenTraderItem[];
  balance: Record<string, string>;
  copy_accepted: boolean;
  user_data: Record<string, any>;
  my_traders: any[];
  user_feedbacks: any[];
  rate_trader: CopyEditUserTypes;
  become_public_data: Record<string, any>;
  edit_follow_details: {
    initialStep: number;
    initialValues: CopyEditUserTypes;
  };
  view_trader_positions: Record<string, any>;
  tableHead: Array<{
    name: string;
    id: string;
    active: boolean;
    text: string;
  }>;
  unfollow_info: any;
  revenue: Record<string, number>;
  pnl: Record<string, Record<string, number>>;
};

export type PostFeedbackType = {
  rate: number;
  text: string;
  receiver_id?: string | number | boolean;
};
export type CopyModalStepValues = {
  trade_type: string;
  market_pairs: Record<string | number, Array<PairTypes>>;
  initial_investment: string;
  per_trade_amount: string;
  amount_remains?: string | number;
  user_id?: number | string;
  my_markets: Array<number>;
  my_market_pairs?: Record<string | number, Array<PairTypes>>;
};

type ErrorMP = {
  market?: string;
  pairs: string;
};

export type CopyPositionTable = {
  created_at: string;
  currency: string;
  entry_price: number;
  id: number;
  leverage: number;
  liquidation_price: number;
  market: string;
  market_id: number;
  market_price: number;
  pair_id: number;
  position_margin: number;
  publisher_id: number;
  realize_pnl: number;
  side: string;
  size: number;
  stop_loss: number;
  symbol: string;
  take_profit: number;
  unrealize_pnl: number;
  updated_at: string;
  user_id: number;
};
export type CopyModalStepErrors = CopyModalStepValues & ErrorMP;

export interface CopyEditUserTypes extends CopyModalStepValues {
  nickname?: string;
  user_id?: number;
  trade_type: string;
  description?: string;
  market_pairs: Record<number, PairTypes[]>;
  my_markets: number[];
  open_trader?: Record<string, string | number | boolean>;
  initial_investment: string;
  per_trade_amount: string;
  my_market_pairs: Record<number, PairTypes[]>;
}

export interface EditTraderData extends CopyEditUserTypes {
  open_trader: Record<string, string | number>;
}

export interface OpenTraderItem {
  picture: string | null;
  pnl_daily: number;
  pnl_daily_percent: number;
  pnl_total: number;
  pnl_total_percent: number;
  rate: number;
  last_name: string;
  open_days: number;
  email: string;
  first_name: string;
  followers: number;
  followers_equity: number;
  id: number;
  kline_week: BalanceChartDataItemType[];
  open_trader: Record<string, string | number>;
  base?: string;
  created_at?: string;
}

export interface TraderFollowers {
  amount_remains: number;
  created_at: string;
  deleted_at: null | string;
  id: number;
  initial_investment: number;
  per_trade_amount: number;
  publisher_id: number;
  subscriber: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    picture: null | string;
  };
  subscriber_id: number;
  trade_type: string;
  updated_at: string;
}
