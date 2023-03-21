import React, { useEffect, useState } from 'react';
import {   View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import ImageHolder from '../common/ImageHolder';
import { useTranslation } from 'react-i18next';
import profileCompStyles from './ProfileCompStyles';
import { useUserPhoto } from '../../apiHooks/user/useUserProfile'; 


 const ProfileImageHolder = ({userId, vitalToken}) => {
  const { colors } = useTheme();
  const styles = profileCompStyles(colors);
  const { t } = useTranslation();
  const { getPhoto } = useUserPhoto(vitalToken); 
  const [resultImage, setResultImage] = useState()


  const fetchPhoto = async () => {
    const query : Object ={ userId: userId || ''}
    const result = await getPhoto(query);
    if (result && !result.error) { 
      setResultImage(result)
    } else {
      console.log('error: ', result) 
    }

  };

  useEffect(() => {
      fetchPhoto(); 
  }, [userId]);

  return (
    <View style={styles.profileImageContainer}>
      <ImageHolder size={70} imagePhoto={resultImage} />
      {/* <View style={styles.availabilityIndicator}></View> */}
    </View>
  );
};
export default ProfileImageHolder