import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import { wth, hth } from '../../constants/size'; 

const createStyles = (theme: any) => {
  const { colors } = useTheme();
  return StyleSheet.create({
   
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.background,
      padding: wth(7),
      paddingTop:0,
      paddingHorizontal: 5,
      // paddingTop: hth(10),
      flexGrow: wth(100),
    },
    cardDetailsContainer: {
      paddingHorizontal: 20,
      paddingVertical:30
    },
    date: {
      color: 'white',
      opacity: 0.7,
      fontSize: 16,
   
    },
    card: {
      width: '95%',
      marginVertical: 5,
      //borderColor: 'rgba(255, 255, 255, 0.08)',
      margin: 10,
      borderRadius: 6,
      alignItems: 'flex-end',
    },
    cardDetailsTitle: {
      color: 'white',
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
      paddingRight: 10,
      paddingLeft:10
    },
    cardDetailsSubTitle: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 18,
      fontWeight: 'bold',
     
    },
    cardTime: {
      color: 'rgba(255, 255, 255, 0.6)',
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
      marginTop: 0,
    },

    cardTimeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      paddingVertical: 18,
      paddingHorizontal:10,
      borderRadius: 6,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      marginVertical: 15,
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.2)',
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
    }, 
    language: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 3,
      paddingRight:8,
      backgroundColor: 'rgba(255, 255, 255, 0.13)',
      borderRadius: 16,
      borderColor: '#fff',
    },
    workMode: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.13)',
      borderRadius: 16,
      borderColor: '#fff',
    },
    languageText: {
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: '600',
      fontSize:12
    },
    usRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    dolls: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingHorizontal: 12,
      color: 'rgba(255, 255, 255, 0.6)',
      backgroundColor: 'rgba(4, 8, 9, 0.88)',
      borderColor: 'rgba(255, 255, 255, 0.08)',
      borderWidth: 1,
      borderRadius: 16,
      marginRight: 10,
    },
    dollsText: {
      color: 'rgba(255, 255, 255, 0.6)',
      textAlign: 'center',
    },
    shiftRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    shiftTime: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shiftText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '500',
    },
    shiftTimeText: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 18,
      fontWeight: '400',
    },
    shiftContainer: {
      boxSizing: 'border-box',
      flexDirection: 'column',
      marginVertical: 40,
      padding: 15,
      // height: 134,
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 8,
    },
    shiftCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: 'gray',
      paddingVertical: 15,
      paddingHorizontal: 8,
      marginVertical: 20,
      borderColor: '#619bf0',
      borderWidth: 1
    },
    roundedDollar: {
      backgroundColor: '#619bf0',
      padding: 6,
      width: 40, height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20
    },
    dateBox: {
      color: 'white',
      textAlign: 'center',
      backgroundColor: 'gray',
      paddingHorizontal: 20,
      paddingVertical: 70,
      borderWidth: 1,
      borderColor: '#619bf0'
    },
    code: {
      color: 'white', backgroundColor: '#000', padding: 6, borderWidth: 1, borderColor: '#619bf0'
    },
    greenBox: {
      color: 'black', backgroundColor: '#5dea93', padding: 10
    },
    cancelButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rrgba(255, 255, 255, 0.03)',
      textAlign: 'center',
      color: 'rgba(255, 255, 255)',
      alignSelf: 'center',
      marginLeft: 0,
      width: wth(40),
      padding: 15,
      borderRadius: 10,
    },
    addButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      alignSelf: 'center',
      marginLeft: 0,
      width: wth(40),
      padding: 15,
      borderRadius: 10,
    },
    length: {
      color: '#29BFB2',
      paddingBottom: 3,
      paddingTop: 12,
      textAlign: 'center'
    },
    start: {
      color: 'white',
      paddingVertical: 5,
      textAlign: 'center'
    },
    grabText: {
      color: 'white'
    }
    ,
    checkboxContainer: {
      flexDirection: 'row',
      paddingVertical: 20, 
    },
    checkbox: {
      alignSelf: 'center',
      borderColor:'white' 
    },
    label: {
      margin: 8,
      color: 'white'
    },

    scrollContainer: {
      paddingBottom: 400,
      width: wth(100),
      //height: '100%',
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
      margin: 20,
      borderRadius: 10,
    },
    jobBody: { paddingHorizontal: 10, paddingVertical: 25, height: '100%' },

    jobText: { color: '#ffffff' },
  });
};

export default createStyles;
