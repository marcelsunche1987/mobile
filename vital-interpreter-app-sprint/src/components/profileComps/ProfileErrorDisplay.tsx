import { View } from 'react-native';
import React from 'react';
import { hth } from '../../constants/size';
import { useTranslation } from 'react-i18next';
import { useTheme, Text } from 'react-native-paper';
import profileCompStyles from './ProfileCompStyles';

const ProfileErrorDisplay = ({ errorMsg }:any) => {
  const { colors } = useTheme();
  const styles = profileCompStyles(colors);
  const { t } = useTranslation();
  return (
    <View
      style={styles.profileDataSectionContainer}> 
      <Text
        variant="bodyMedium"
        style={{
          ...styles.headlineText,
         ...styles.errorText
        }}>
        {t(`${errorMsg}`)} 
      </Text> 
    </View>
  );
};

export default ProfileErrorDisplay;
