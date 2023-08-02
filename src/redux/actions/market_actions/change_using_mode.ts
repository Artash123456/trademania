import { createAction } from '@reduxjs/toolkit';
import { MarketTypes } from 'types';
export const changeUsingMode = createAction(
  'changeUsingMode',
  (isDemo: boolean, storeMarkets: MarketTypes[]) => {
    const demo = storeMarkets.filter((item) => item.name === 'demo');
    const no_demo = storeMarkets.filter((item) => item.name !== 'demo');
    return { payload: { isDemo: !isDemo, markets: isDemo ? no_demo : demo } };
  }
);
