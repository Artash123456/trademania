import { FormikValues } from 'formik';
import { MarketTypes } from './markets';
export type SettingsState = {
  header: headerItems[];
  inputs: Record<string, SettingsInputs[]>;
  qr_svg: string;
  deviceSessions: DevicesSession[];
  open_for_subscription: number;
  tradeAccountInitialValues: Record<string, any>;
  showInModal: SettingsApiModalItem;
  avatars: any[];
  customers: {
    subaccounts: any[];
    my_credentials: {
      user: { first_name: string; last_name: string };
      api_key: string;
    };
  };
};
export type SettingsApiModalItem = {
  id: number;
  market_id: number;
  user_id: number;
  api_key: string;
  private_key: string;
  status: number;
  created_at: string;
  updated_at: string;
  market: MarketTypes;
  passphrase?: string;
};
interface headerItems {
  active: boolean;
  path: string;
  name: string;
  id: string;
}
export interface SettingsInputs {
  name: string;
  labels: [string, string] | string;
  type: string;
  placeholder?: string;
}

interface DevicesSession {
  agent: string;
  ip_address: string;
  is_current_device: boolean;
  last_active: string;
}

export interface CopyMainProps {
  values: FormikValues;
  touched?: { [key: string]: boolean };
  errors?: { [key: string]: string };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setErrors: (value: Record<string, string | undefined>) => void;
}
