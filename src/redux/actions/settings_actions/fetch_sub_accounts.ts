import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubAccounts = createAsyncThunk("getSubAccounts", async () => {
  const response = await axios("/api/sub-accounts");
  return response.data;
});
