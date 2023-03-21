import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme, Text } from 'react-native-paper';
import screenHeaderStyles from './screenHeaderStyles';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
interface Props {
  text: string | number | null;
  showBackArrow: boolean;
  showHeaderTitle: boolean
}
const ScreenHeader = ({ text, showBackArrow, showHeaderTitle }: Props) => {
  const { colors } = useTheme();
  const styles = screenHeaderStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F161A" />
      <View></View>
      {showBackArrow && (
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{ ...styles.image }}
            source={require('../../assets/images/chevron-left.png')}
          />
        </TouchableOpacity>
      )}
      {!showHeaderTitle && <Text style={{ ...styles.HeaderText }}>{t(text)}</Text>}
      {showHeaderTitle && <Text style={{ ...styles.HeaderTitle }}>{t(text)}</Text>}
    </View>
  );
};

export default ScreenHeader;
