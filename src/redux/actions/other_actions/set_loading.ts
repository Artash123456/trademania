import { createAction } from '@reduxjs/toolkit';
export const setLoading = createAction('SET_LOADING', (bool: boolean) => ({
  payload: bool,
}));
