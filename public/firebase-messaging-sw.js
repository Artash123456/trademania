importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyBEq25VVLOPpXcJUT0mPk_XeL-0bR3-43s',
  authDomain: 'moon-notification.firebaseapp.com',
  projectId: 'moon-notification',
  storageBucket: 'moon-notification.appspot.com',
  messagingSenderId: '485560684898',
  appId: '1:485560684898:web:1e1e97e89931d4c3d81c3b',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
