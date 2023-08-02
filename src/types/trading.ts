export type FetchOrderProps = {
  market: string | number;
  symbol: string;
  is_spot?: number | boolean;
};

export type PairTypes = {
  base: string;
  id: string | number;
  is_spot: number | boolean;
  label: string;
  market_id: string | number;
  name: string;
  order: string | number;
  quote: string;
  status: string | number;
  value: string;
  value_charts: string;
  has_position?: 1 | 0;
  currency: string;
  chart?: string;
};
