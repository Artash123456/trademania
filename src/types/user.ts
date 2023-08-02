export type UserState = {
  is_authenticated: boolean;
  data: Record<string, any>;
  access_token: string | null;
};
export type LoginValues = {
  email: string;
  password: string;
  remember_me?: boolean;
};
export type RegisterValues = {
  email: string;
  password: string;
  password_confirmation: string;
  terms_accepted: boolean;
};

export type ResetPasswordValues = {
  password: string;
  password_confirmation: string;
};

export type AlternativeAuthProps = {
  token?: string;
  affiliate_token?: string | null;
  login?: boolean;
  password?: string;
  password_confirmation?: string;
  return_back?: boolean;
};
