import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { refreshTable } from 'redux/reducers/manual';
type TpSlValues = any;
export const postTakeProfit = createAsyncThunk(
  'postTakeProfit',
  async ({ values }: { values: TpSlValues }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { stop_loss: true } });
    try {
      const formData: FormData = new FormData();
      for (let i of Object.keys(values)) {
        formData.append(i, values[i]);
      }
      return await axios.post('/api/update-position', values).then((res) => {
        dispatch(openModal('take_profit_stop_loss'));
        dispatch(refreshTable());
        return res;
      });
    } finally {
      dispatch({ type: 'LOADING', payload: { stop_loss: false } });
    }
  }
);
