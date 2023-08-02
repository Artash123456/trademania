export type Theme = 'light_mode' | 'dark_mode';
export type StylesState = {
  light_mode: Record<string, string>;
  dark_mode: Record<string, string>;
  [theme: string]: any;
  windowWidth: string | number;
  downloadImage: Record<string, any> | null;
};
