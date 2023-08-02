import { createAction } from '@reduxjs/toolkit';

export const openModal = createAction(
  'openModal',
  (modalType: string) => {
    return { payload: { type: 'openModal', data: modalType } };
  }
);
