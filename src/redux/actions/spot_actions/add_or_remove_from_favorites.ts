import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addOrRemoveFromFavorites = createAsyncThunk(
  "addOrRemoveFromFavorites",
  async ({ base, market }: { base: string; market: string }) => {
    await axios.post("/api/add-to-favorites", { coin: base });
    return { base, market };
  }
);
