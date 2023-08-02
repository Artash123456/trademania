import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const uploadProfileImage = createAsyncThunk(
  "uploadProfileImage",
  async (data: FormData) => {
    await axios.post("/api/add-profile-picture", data);
  }
);
