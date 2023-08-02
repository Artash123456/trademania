import { MarketTypes } from './markets';

export type AdminState = {
  users: Response;
  bots: Response;
  affiliates: Response;
  open_traders: OpenTradersResponse;
  positions: Response;
  orders: Response;
  user_balance: Response;
  affiliate_users_drop_down: Response;
  statistics: {
    [key: string]: number | any;
    income_and_turnover_per_day: {
      date: string;
      turnover: number;
      income: number;
    }[];
  };
  top_traders: TopTraders[];
  filters: {
    [key: string]: any;
  };
  repeat_request: number;
  request_body: any;
  markets: Markets[];
  reports: Record<string, { label: string; value: string }[]>;
  logged_in_as: boolean;
  back_token: string;
  admin_id?: string;
};

interface Response {
  data: Record<string, string | number | null>[];
  current_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  last_page: number;
  statistics?: Record<string, any>;
}

export interface AdminComponentProps {
  search_query: string;
  sort_type: string;
  market: string;
  start_date: string;
  end_date: string;
  order: string;
}

export interface OpenTradersResponse extends Response {
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  total: number;
}

interface Markets extends MarketTypes {
  spot_fee: number;
  leverage_fee: number;
  user_count: number;
}

interface TopTraders {
  affiliate_accepted_at: string | null;
  created_at: string | null;
  daily_pnl_avg_pnl_percent: number;
  deleted_at: string | null;
  email: string;
  email_verified_at: string | null;
  facebook_id: string | null;
  first_name: string | null;
  google_id: string | null;
  id: number | string;
  last_name: string | null;
  master_id: string | number | null;
  open_for_subscription_at: string | null;
  picture: string | null;
  refer_bonus_rate: number | null;
  referred_by: number | null;
  role_id: number;
  two_factor_confirmed_at: string;
  two_factor_recovery_codes: string | null;
  two_factor_secret: string | null;
  updated_at: string | null;
}
