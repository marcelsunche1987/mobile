import { StyleSheet, Platform } from 'react-native';
import { hth, wth } from '../../constants/size';

const screenHeaderStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#0F161A',
      padding: 20,
      paddingBottom: 20, 
      paddingTop:70,
      width: wth(100),  
      position: 'relative',
      borderBottomWidth: 1, 
      borderBottomColor: 'rgba(255, 255, 255, 0.2)',  
      flexDirection:'column',
      marginBottom:30
    },
    image: {
      height: 28,
      width: 28,
    },
    HeaderText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
    },
    arrowContainer: {
      position: 'absolute',
      left: 10,
      bottom: 18,
    },
    HeaderTitle: {
        fontSize: 24, lineHeight: 32,color: 'white', padding: '2%',  fontWeight: 'bold', textAlign:'left'
      },
  });
};

export default screenHeaderStyles;
