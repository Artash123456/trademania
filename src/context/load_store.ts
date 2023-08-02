import EncriptionService from './EncryptionService';
import { refreshState } from './refresh_state';

export const loadStore = (stateName: string, initial: any) => {
  const secure_state = localStorage.getItem('state') || '';
  const decrypted_state = EncriptionService.decrypt(secure_state);
  if (decrypted_state && refreshState()) {
    const state = JSON.parse(decrypted_state);
    if (state) return state[stateName as keyof unknown];
  }
  return initial;
};
