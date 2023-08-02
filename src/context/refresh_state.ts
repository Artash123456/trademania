import { version } from '../../package.json';
export const refreshState = () => {
  const last_version = localStorage.getItem('last_version');
  if (!last_version || last_version < version) {
    localStorage.removeItem('state');
    localStorage.setItem('last_version', version);
    window.location.reload();
  } else {
    return true;
  }
};
