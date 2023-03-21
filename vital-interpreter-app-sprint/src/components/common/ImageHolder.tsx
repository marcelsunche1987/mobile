import { View, Text } from 'react-native'
import React from 'react' 
import { Avatar } from 'react-native-paper';  
import { ImageHolderProps } from './types';
const ImageHolder = ({size, image, imagePhoto }: ImageHolderProps) => {
  return (
    <View>
       <Avatar.Image size={size || 100} source={{uri: imagePhoto}} />
       {/* <Avatar.Image size={size || 100} source={require('../../assets/images/Avatar.png')} /> */}
    </View>
  )
}

export default ImageHolder