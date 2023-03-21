import { Image, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { hth } from '../../constants/size';
import { useTranslation } from 'react-i18next';
import { useTheme, Text } from 'react-native-paper';
import jobsCompStyles from './JobsCompStyles'; 
import { useNavigation } from '@react-navigation/native';


export const AddIcon = ({data}:any) => {
  const navigation = useNavigation(); 
  const { colors } = useTheme();
  const styles = jobsCompStyles(colors); 
  return (
    <TouchableOpacity  onPress={() => navigation.navigate('Job Modal', {
      screen: 'Job Details',
      params: data,
    })}
    >
    <View style={styles.addButton}>
      <View style={{...styles.imageOuterContainer }}>
        <Image source={require('../../assets/images/time.png')} />
        <View style={{...styles.imageInnerContainer}}>
          <Image
            style={{ ...styles.iconImage }}
            source={require('../../assets/images/mediumAddIcon.png')}
          />
        </View>
      </View>
      <Text style={{...styles.actionText}}>
        Add Now
      </Text>
    </View>
    </TouchableOpacity>
  );
};
