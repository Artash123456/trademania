import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Props {
  current_page?: number;
  per_page?: number;
  keyword?: string;
  favorites?: boolean;
  search?: string;
}
export const fetchSpotPagePairs = createAsyncThunk(
  'fetchSpotPagePairs',
  async ({
    current_page = 0,
    per_page = 40,
    keyword = '',
    favorites = false,
    search,
  }: Props) => {
    const { data } = await axios('/api/spot-page-pairs', {
      params: {
        current_page,
        per_page,
        keyword,
        favorites,
      },
    });
    return { data: data?.data, search, favorites };
  }
);
