const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
let mainWindow;
const domain = 'https://app.trademania.io';
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      devTools: false,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
    hasShadow: 0.4,
    roundedCorners: false,
    autoHideMenuBar: true,
    frame: true,
    icon: __dirname + '/logo.ico',
  });
  mainWindow.setBackgroundColor('#FFFFFF');
  mainWindow.loadURL(domain);
}

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    'file',
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error('Failed to register protocol');
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  mainWindow = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
const allowedNavigationDestinations = domain;
app.on('web-contents-created', (_, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

//this is a code for google/facebook login
//sending token from browser to electron and launching app
//on mac OS have javascript exeption error, get_auth_token

// app.setAsDefaultProtocolClient('trademania');

// app.on('open-url', function (event, url) {
//   event.preventDefault();
//   if (url) {
//     const access_token = url.slice(url.indexOf('=') + 1);
//     token = access_token?.replace('%7C', '|');
//   }

//   if (mainWindow) {
//     if (mainWindow.isMinimized()) mainWindow.restore();
//     mainWindow.focus();
//     mainWindow.webContents.reloadIgnoringCache();
//   }
// });

// const gotTheLock = app.requestSingleInstanceLock();

// if (!gotTheLock) {
//   app.quit();
// } else {
//   app.on('second-instance', (e, argv) => {
//     if (process.platform !== 'darwin') {
//       const token_item_in_array = argv.find((item) =>
//         item.includes('access_token')
//       );
//       if (token_item_in_array) {
//         const access_token = token_item_in_array.slice(
//           token_item_in_array.indexOf('=') + 1,
//           -1
//         );
//         token = access_token?.replace('%7C', '|');
//       }
//     }

//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore();
//       mainWindow.focus();
//       mainWindow.webContents.reloadIgnoringCache();
//     }
//   });
// }
// function logEverywhere(s) {
//   console.log(s);
//   if (mainWindow && mainWindow.webContents) {
//     mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
//   }
// }
