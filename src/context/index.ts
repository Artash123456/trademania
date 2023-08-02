export { useClickOutside } from './useClickOutside';
export { translation } from './translation';
export { BinaneSocketPrice } from './BinaneSocketPrice';
export { PhemexSocketPrice } from './PhemexSocketPrice';
export { BybitSocketPrice } from './BybitSocketPrice';
export { MarketSocketPrice } from './MarketSocketPrice';
export { downloadImage } from './downloadImage';
export { token } from './firebase';
export { detectMarketById } from './detect_market_by_id';
export { copy } from './copy';
export { customizeDate } from './customizeDate';
export { deepCopy } from './jsonDeepCopy';
export { getImage } from './getCriptoImages';
export { DateC } from './date';
export { loadStore } from './load_store';
export { useAppDispatch, useAppSelector } from './redux.hooks';
export { KrakenSocketPrice } from './KrakenSocketPrice';
export { BitgetSocketPrice } from './BitgetSocketPrice';
export { usePagination } from './usePagination';
export { OkxSocketPrice } from './OkxSocketPrice';
export { refreshState } from './refresh_state';
export { useContextMenu } from './useContextMenu';
export { AuthContext, AuthProvider } from 'context/AuthContext';
export { default as EncriptionService } from './EncryptionService';
export const disabled_navigations = (name?: string) =>
  name === 'Spot Trading' ||
  name === 'Manual Trading' ||
  name === 'Affiliate' ||
  name === 'Wallet' ||
  name === 'Bot Trading' ||
  (name === 'Copy Trading' &&
    import.meta.env.VITE_DEPLOY_MODE === 'development');

export const disabled_routes = (url?: string) =>
  url === '/manual' ||
  url === '/spot/dashboard' ||
  url === '/spot/marketplace' ||
  url === '/wallets' ||
  (url === '/copy' && import.meta.env.VITE_DEPLOY_MODE === 'development') ||
  url === '/affiliate' ||
  url === '/bot-trading' ||
  (url === '/settings/copy-trading' &&
    import.meta.env.VITE_DEPLOY_MODE === 'development');
