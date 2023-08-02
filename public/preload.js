const { contextBridge, ipcRenderer } = require('electron');
process.once('loaded', () => {
  contextBridge.exposeInMainWorld('electron', {
    log_out: () => ipcRenderer.invoke('log_out'),
    get_auth_token: () => ipcRenderer.invoke('get_auth_token'),
    open_browser: (login_platform) => {
      if (login_platform) ipcRenderer.invoke('open-browser', login_platform);
    },
  });
});
