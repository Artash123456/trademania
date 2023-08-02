import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const openNotifications = createAsyncThunk(
  "openNotifications",
  async () => await axios.post("/api/notifications/set-delivery-date")
);
