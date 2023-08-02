import { createAction } from "@reduxjs/toolkit";

export const orderSuccess = createAction("orderSuccess", (bool) => ({
  payload: bool,
}));
