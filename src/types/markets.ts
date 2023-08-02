export type MarketState = {
  markets: Array<MarketTypes>;
  storeMarkets: MarketTypes[];
  dailyPnl: {
    balance: number;
    percent: number;
  };
  isDemo: boolean;
};

export type MarketTypes = {
  additional: {};
  created_at?: string;
  has_credential?: { market_id: number };
  icon?: string;
  id: number;
  logo: string;
  name: string;
  priority: number;
  updated_at: string;
  margin: string;
  items: Array<{ cont: string }>;
  slug: string;
};

export interface MarketAsProps {
  market: { name: string; id: number; slug: string };
}
