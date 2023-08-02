export type AffiliateState = {
  my_affiliates: Response;
  my_affiliate_orders: Response;
  filters: {
    [key: string]: any;
  };
  request_body: any;
  statistics: Record<string, number>;
  referrer_link: string;
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
}
