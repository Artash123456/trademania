import { CopyModalStepValues } from 'types';
import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { getMyTraders } from 'redux/actions/copy_actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deepCopy } from 'context';

export const followTrader = createAsyncThunk(
  'followTrader',
  async (
    {
      values,
      user_id,
      resetForm,
      isDemo
    }: {
      values: CopyModalStepValues;
      user_id: number | string;
      resetForm: Function;
      isDemo?:boolean
    },
    { dispatch }
  ) => {
    const data = deepCopy(values);
    const market_pairs = [];
    for (let item of Object.keys(values.market_pairs)) {
      for (let elem of data.market_pairs[item]) {
        let obj = {
          parent_market_id: '',
          parent_pair_id: '',
          has_position: elem.has_position ? 1 : 0,
        };
        obj['parent_market_id'] = item;
        obj['parent_pair_id'] = elem.id.toString();
        market_pairs.push(obj);
      }
    }

    data.market_pairs = market_pairs;
    data.user_id = user_id;
    data.amount_remains = data.initial_investment;
    try {
      return await axios.post('/api/follow-trade', data).then(() => {
        dispatch(getMyTraders({ isDemo }));
        resetForm();
        return user_id;
      });
    } finally {
      dispatch(openModal('copy_follow'));
    }
  }
);
