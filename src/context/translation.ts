import { store } from 'redux/reducers';
import { TranslationsState } from 'types';
export const translation = (word?: string) => {
  const { translation }: { translation: TranslationsState } = store.getState();
  if (!word || !translation) return '';
  if (typeof word === 'string') return translation[translation.language][word];
};
