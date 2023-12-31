import {
  AffiliateIcon,
  BotTradingIcon,
  CopyTradingIcon,
  Dashboard,
  LaunchTradingIcon,
  LogOutIcon,
  ManualTradingIcon,
  ReportsIcon,
  SettingsIcon,
  SignalTradingIcon,
  SpotTradingIcon,
  SubAccountsIcon,
  ThemeModeIcon,
  WalletsIcon,
  Chart,
  Market,
  Portfolio,
  History,
  ArrowDown,
  Admin,
  Notification,
  BurgerIcon,
  Trade,
  Account,
} from 'assets/icons';
import { MdTapAndPlay } from 'react-icons/md';
export const icons: { [key: string]: JSX.Element } = {
  Manual: <ManualTradingIcon />,
  Spot: <SpotTradingIcon />,
  Bot: <BotTradingIcon />,
  Copy: <CopyTradingIcon />,
  Signal: <SignalTradingIcon />,
  Launch: <LaunchTradingIcon />,
  Settings: <SettingsIcon />,
  Subaccounts: <SubAccountsIcon />,
  Reports: <ReportsIcon />,
  Wallet: <WalletsIcon />,
  demo: <MdTapAndPlay />,
  mode: <ThemeModeIcon />,
  Admin: <Admin />,
  Affiliate: <AffiliateIcon />,
  Dashboard: <Dashboard />,
  Chart: <Chart />,
  Market: <Market />,
  Portfolio: <Portfolio />,
  History: <History />,
  ArrowDown: <ArrowDown />,
  Notification: <Notification />,
  'Log out': <LogOutIcon />,
  Burger: <BurgerIcon />,
  Trade: <Trade />,
  Account: <Account />,
};
