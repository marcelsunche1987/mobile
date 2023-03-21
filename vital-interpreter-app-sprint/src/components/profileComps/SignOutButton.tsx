import { View, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
//import { Button } from 'react-native-paper';
import { useTheme, Text } from 'react-native-paper';
import createStyles from '../../views/profile/ProfileStyles';
import { wth } from '../../constants/size';
export default function SignOutButton({ onPress }: any) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(); 
  return (
    <TouchableOpacity
      //mode="contained"
      style={{
        ...styles.button,
       ...styles.buttonContainer
      }}   
      onPress={() => onPress()}>
      <Image
        style={{ ...styles.signOutImage }}
        source={require('../../assets/images/logout.png')}
      />
      <View style={{...styles.logoutView }}>
        <Text variant="bodyLarge" style={{ ...styles.headlineText }}>
          {t('Logout')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

