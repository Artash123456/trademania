export const openDesktopApp = (token: string) => {
  const a = document.createElement('a');
  a.href = `trademania://access_token=${token}`;
  a.click();
};
