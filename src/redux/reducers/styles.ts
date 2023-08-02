import { StylesState } from 'types';
import { createSlice } from '@reduxjs/toolkit';
import { loadStore } from 'context';
const initialState = {
  light_mode: {
    font_white: '#DEE2E6',
    font_light_gray: '#343A40',
    light_gray: '#868E96',
    font_gray: '#495057',
    font_blue: '#707070',
    background_color: '#ffffff',
    dark_input: '#F1F3F5',
    brands_background: '#f2f2f2',
    submit_button_background: '#18D690',
    body_color: '#ffffff',
    perc_background: '#ececec',
    box_shadow: '0px 3px 6px #00000029',
    error_red: '#FA5252',
  },
  dark_mode: {
    font_white: '#222C44',
    font_light_gray: '#FFFFFF',
    font_gray: '#8695BC',
    font_blue: '#A2ADC3',
    light_gray: '#BAC8ED',
    background_color: '#222C44',
    dark_input: '#2D3750',
    brands_background: '#141723',
    submit_button_background: '#18D690',
    body_color: '#161C2F',
    perc_background: '#141723',
    box_shadow: '0px 3px 6px #b9c8dc80',
    error_red: '#FA5252',
  },
  theme: 'light_mode',
  downloadImage: null,
  browser_OS: 'desktop',
};

const initial: StylesState = loadStore('styles', initialState);
export const styles = createSlice({
  name: 'styles',
  initialState: initial,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === 'light_mode' ? 'dark_mode' : 'light_mode';
    },
    downloadPosition: (state, action) => {
      state.downloadImage = action.payload;
    },
  },
});
export const { changeTheme, downloadPosition } = styles.actions;
