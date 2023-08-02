import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMyTraders } from 'redux/actions/copy_actions';
import { openModal } from '../other_actions';
export const unfollowTrader = createAsyncThunk(
  'unfollowTrader',
  async (
    {
      user_id,
      is_close,
      markets,
      isDemo,
      fee_to_system,
    }: {
      user_id: string;
      is_close: boolean;
      markets: string;
      isDemo?: boolean;
      fee_to_system?: number;
    },
    { dispatch }
  ) => {
    await axios.post('/api/unfollow-trade', {
      user_id,
      is_close,
      markets,
      is_demo: isDemo ? isDemo : undefined,
      fee_to_system: fee_to_system ? fee_to_system : 0,
    });
    dispatch(getMyTraders({ isDemo }));
    dispatch(openModal('copy_unfollow_warning'));
    return true;
  }
);
