'use client';
import { useEffect } from 'react';
import { requestPermission } from './firebaseMessaging';

const useFirebaseMessaging = () => {
    useEffect(() => {
        requestPermission();
    }, []);
};

export default useFirebaseMessaging;
