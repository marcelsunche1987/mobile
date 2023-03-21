import { StyleSheet, Platform } from 'react-native';
import { color } from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import { wth, hth } from '../../constants/size'; 

const { colors } = useTheme();


const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.background,
      padding: wth(7),
      paddingTop:0,
      paddingHorizontal:5,
     // paddingTop: hth(10), 
      flexGrow: wth(100),
    },
    scrollContainer: {
      paddingBottom: 100,
      width: wth(100),
      height: '86%',
      justifyContent: 'flex-start',  
      paddingTop: Platform.os == 'ios'? 25: 5 
    },
    headline: {
      justifyContent: 'space-between',
    },
    headlineText: {
      color: '#080F13',
      padding: '2%',
      textAlign: 'center',
    },
    headlineImage: {
      alignSelf: 'center',
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    bottomButton: {
      justifyContent: 'center',
      flex: 1,
    },
    logo: {
      alignSelf: 'center',
      maxWidth: '100%',
      height: 20,
      justifyContent: 'flex-end',
    },
    button: {
      width: wth(100),
      padding: 10, 
      borderRadius: 10, 
    },
    signOutImage: {
      width: 20, height: 20
    },
    logoutView: {
      marginLeft: 5, marginBottom: Platform.os == 'ios'? -4:0
    },
    buttonContainer: {
      width: Platform.os == 'ios'? wth(90): wth(86), 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor:colors.primary,
        alignSelf:'center',
        marginLeft:0
    },
    profileBody: { paddingHorizontal: 10, paddingVertical: 25, height: '100%' },
  });
};

export default createStyles;
