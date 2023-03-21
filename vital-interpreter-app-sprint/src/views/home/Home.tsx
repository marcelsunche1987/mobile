import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import createStyles from '../authScreens/LoginStyles';


// Use stack navigation here to be able to create a navigation hierarchy

export const Home = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.headline}>
        <Text variant="headlineMedium" style={styles.headlineText}>{t('Messages And Alerts')}</Text>
      </View> */}
    </SafeAreaView>
  );
};
