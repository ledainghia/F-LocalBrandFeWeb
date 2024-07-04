// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyAI8Atyoeq210fonUGv01xawW2-uO8Ps-A',
    authDomain: 'f-localbrand.firebaseapp.com',
    projectId: 'f-localbrand',
    storageBucket: 'f-localbrand.appspot.com',
    messagingSenderId: '585901900513',
    appId: '1:585901900513:web:d03a4d975eb39741b0eda0',
    measurementId: 'G-8KDZ4W7QME',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
