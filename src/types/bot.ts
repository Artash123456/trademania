import { MarketTypes } from 'types';
import { PairTypes } from './trading';

export type BotState = {
  my_bots: MyBotsItemType[];
  bots: BotTypes[];
  revenue: { sum: number; count: number };
  revenueData: Record<string, { sum: number; percent: number }>;
  balance: Record<string, string | number>;
  pairs: PairTypes[];
  botInfoModal: BotInfoModal;
  my_grid_bots: any[];
  tableHead: Array<{
    name: string;
    id: string;
    active: boolean;
    text: string;
  }>;
};

export type MyBotsItemType = {
  amount: string;
  investment: number | string;
  bot: {
    [key: string]: string | number;
    id: number;
    name_en: string;
    name_de: string;
  };
  bot_id: string | number;
  created_at: string;
  deleted_at: null | string;
  id: string | number;
  market: { id: number | string; name: string };
  market_id: string | number;
  pair: { id: number | string; base: string };
  pair_id: number | string;
  position_data: {
    size: number | string;
    realised_pnl: string | number;
    unrealised_pnl: string | number;
    difference: string | number;
  };
  reinvest: number | boolean;
  updated_at: string | number;
  user_id: number | string;
};

export type BotTypes = {
  attributes: null | string;
  created_at: string;
  description_de: string;
  description_en: string;
  id: number;
  name_de: string;
  name_en: string;
  updated_at?: string;
  price_scale?: string;
  safety_orders?: string;
  take_profit_ratio?: string;
  volumne_scale?: string;
};

export type BotModalStepValues = {
  market?: MarketTypes | null;
  bot?: BotTypes | { id: null };
  pair: PairTypes;
  capital: {
    balance: string;
    capital: string;
    reinvest: boolean;
    lower_price: string;
    grids: string;
    upper_price: string;
    investment: string;
    trigger_price: string;
    stop_loss: string;
    take_profit: string;
    income_percent: string;
  };
};

export interface BotInfoModal {
  [key: string]: any;
  id: number;
  bot_id: number;
  market_id: number;
  user_id: number;
  pair_id: number;
  reinvest: number;
  amount: string | number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}
