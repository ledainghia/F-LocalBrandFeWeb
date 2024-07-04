// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyAI8Atyoeq210fonUGv01xawW2-uO8Ps-A',
    authDomain: 'f-localbrand.firebaseapp.com',
    projectId: 'f-localbrand',
    storageBucket: 'f-localbrand.appspot.com',
    messagingSenderId: '585901900513',
    appId: '1:585901900513:web:d03a4d975eb39741b0eda0',
    measurementId: 'G-8KDZ4W7QME',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
