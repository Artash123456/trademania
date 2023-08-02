import { createSlice } from "@reduxjs/toolkit";
import { SignalState } from "types";
const initialState: SignalState = {};

export const signal = createSlice({
  name: "signal",
  initialState,
  reducers: {},
});
