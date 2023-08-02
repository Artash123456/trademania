export type SubaccountsState = {
  customers: {
    subaccounts: any[];
    my_credentials: {
      user: { first_name: string; last_name: string };
      api_key: string;
    };
  };
  market_id: number;
};
