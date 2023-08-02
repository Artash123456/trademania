import { createAction } from "@reduxjs/toolkit";

export const storeSocketPrice = createAction(
  "storeSocketPrice",
  (price: string | number) => ({
    payload: price,
  })
);
