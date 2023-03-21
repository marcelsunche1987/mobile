import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';

export const ButtonComponent = ({name, styles, onPress }) => {
  return (<TouchableOpacity
    onPress={onPress}
    style={styles}>
    <Text style={{ color: 'white' }}>{name}</Text>
  </TouchableOpacity>)
};
