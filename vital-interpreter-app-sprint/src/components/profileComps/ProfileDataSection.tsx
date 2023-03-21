import { View } from 'react-native';
import React from 'react';
import { hth } from '../../constants/size';
import { useTranslation } from 'react-i18next';
import { useTheme, Text } from 'react-native-paper';
import profileCompStyles from './ProfileCompStyles';

const ProfileDataSection = ({ userData }) => {
  const { colors } = useTheme();
  const styles = profileCompStyles(colors);
  const { t } = useTranslation();
  return (
    <View
      style={styles.profileDataSectionContainer}>
      <Text
        variant="headlineSmall" 
        style={{ ...styles.titleText,  }}>
        {userData?.firstName} {userData?.lastName} 
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          ...styles.headlineText,
         
        }}>
        {t('Company Email')}: <Text style={{
          ...styles.email
        }}> {userData?.companyEmail}</Text>
      </Text>
      <Text
        variant="bodyMedium"
        style={{ ...styles.headlineText }}>
        {t('Title')}: <Text style={{
         ...styles.email
        }}>{userData?.titleId?.replace(/[._-]/g," ") || " "}</Text>
      </Text>
      <Text
        variant="bodyMedium"
        style={{ ...styles.headlineText }}>
        {t('Manager')}: <Text style={{
         ...styles.email
        }}>{userData?.managerFirstName} {userData?.managerLastName}</Text>
      </Text>
      <Text
        variant="bodyMedium"
        style={{ ...styles.headlineText }}>
        {t('Employee ID')}: <Text style={{
          ...styles.email
        }}>{userData?.employeeNo || ''}</Text>
      </Text> 
    </View>
  );
};

export default ProfileDataSection;
