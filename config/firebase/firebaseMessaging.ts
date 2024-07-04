import { toast } from 'react-toastify';
import { getToken, messaging } from './firebaseInit';

export const requestPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            toast.success('Notification permission granted.');
            const currentToken = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
            if (currentToken) {
                console.log('Current token:', currentToken);
                toast.success(`Current token: ${currentToken}`);
                // Gửi token đến server để lưu trữ nếu cần thiết
            } else {
                toast.error('No registration token available. Request permission to generate one.');
                console.log('No registration token available. Request permission to generate one.');
            }
        } else {
            toast.error('Unable to get permission to notify.');
            console.log('Unable to get permission to notify.');
        }
    } catch (error) {
        toast.error('An error occurred while retrieving token.');
        console.error('An error occurred while retrieving token. ', error);
    }
};
