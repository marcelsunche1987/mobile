import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useEffect, useState } from 'react';
import { usePermissions } from '../selectorInfo/usePermissions';
import { useUserPhoto } from './useUserProfile';

const vitalToken = AsyncStorage.getItem('vitalToken');

export default function useProfilePhotoNav() {
    const [resultImage, setResultImage] = useState()
    const { getPhoto } = useUserPhoto(vitalToken);
    const [userId, setUserId] = useState()
    const perm = usePermissions();

    const getPerms = async () => {
        let data = await perm.get()
        setUserId(data?.userId) 
    }

    const fetchPhoto = async () => {
        const data = await getPerms()
        console.log("data gotten in useprofilephotonav ", data)
        if (userId) {
            const query: Object = { userId: userId || '' }
            const result = await getPhoto(query);
            if (result && !result.error) {
                setResultImage(result)
            } else {
                console.log('error: ', result)
            }
        }
    };

    useEffect(() => {
        getPerms() 
    }, []);
    useEffect(() => { 
        fetchPhoto();
    }, [userId,resultImage]);
    return [resultImage, userId];
}
