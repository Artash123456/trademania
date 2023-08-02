import { PairTypes } from 'types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { deepCopy } from 'context';

export const becomeOpenTrader = createAsyncThunk(
  'becomeOpenTrader',
  async ({
    values,
    setErrors,
  }: {
    values: Record<string, string>;
    setErrors: Function;
  }) => {
    const data = deepCopy(values);

    if (!Boolean(data.market_pairs)) {
      setErrors({ market: 'Please select market' });
      return;
    }

    for (let item in data.market_pairs) {
      let pairs = data.market_pairs[item];
      if (!pairs?.length) {
        setErrors({ pairs: 'Please select pair' });
        return;
      } else {
        if (typeof pairs?.[0] !== 'number') {
          pairs = data.market_pairs[item].map((elem: PairTypes) => elem.id);
          data.market_pairs[item] = pairs;
        }
      }
    }
    return await axios.post('/api/become-open-trader', data);
  }
);
