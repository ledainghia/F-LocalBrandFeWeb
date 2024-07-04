'use client';
import { useState } from 'react';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/config/firebase/firebase';

export default function page() {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const file = e.target[0]?.files[0];
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setImgUrl(downloadURL);
                });
            }
        );
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="form">
                <input type="file" />
                <button type="submit">Upload</button>
            </form>
            {!imgUrl && (
                <div className="outerbar">
                    <div className="innerbar" style={{ width: `${progresspercent}%` }}>
                        {progresspercent}%
                    </div>
                </div>
            )}
            {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
        </div>
    );
}
