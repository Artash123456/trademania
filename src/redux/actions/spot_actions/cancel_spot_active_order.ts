import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const cancelOrder = createAsyncThunk(
  "cancelOrder",
  async ({
    market,
    symbol,
    order_no,
  }: {
    market: number | string;
    symbol: string;
    order_no: string;
  }) => {
    await axios.post("/api/cancel-spot-order", {
      market,
      symbol,
      order_id: order_no,
    });
    return order_no;
  }
);
