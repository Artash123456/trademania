import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "redux/actions/other_actions";
import { PostFeedbackType } from "types";

export const postFeedback = createAsyncThunk(
  "postFeedback",
  async ({ values }: { values: PostFeedbackType }, { dispatch }) => {
    dispatch({
      type: "LOADING",
      payload: { post_feedback: true },
    });
    try {
      return await axios.post("/api/store-feedback", values).then((res) => {
        dispatch(openModal("copy_rate_user"));
        return res;
      });
    } finally {
      dispatch({
        type: "LOADING",
        payload: { post_feedback: false },
      });
    }
  }
);
