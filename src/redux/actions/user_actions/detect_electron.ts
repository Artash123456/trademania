const userAgent = navigator.userAgent.toLowerCase();
const ios = /iphone|ipod|ipad/.test(userAgent);
const android = /android/.test(userAgent);
export const isElectron = () =>
  userAgent.indexOf('electron') >= 0 || android || ios;
