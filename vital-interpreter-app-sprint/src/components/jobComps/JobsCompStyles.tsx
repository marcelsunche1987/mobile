import { StyleSheet, Platform } from 'react-native';
import { hth, wth } from '../../constants/size';

const jobsCompStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.background,
      padding: wth(7),
      paddingHorizontal: 5,
      paddingTop: hth(10),
      flexGrow: wth(100),
    },
    containerView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    centerName: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      marginRight: 7,
    },
    sectionTitleContainer: {
      paddingVertical: Platform.OS == 'ios' ? 15 : 10,
      backgroundColor: theme.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    scrollContainer: {
      paddingBottom: 100,
      width: wth(100),
      height: '86%',
      justifyContent: 'flex-start',
      paddingTop: Platform.os == 'ios' ? 25 : 5
    },
    profileImageContainer: {
      paddingLeft: 10,
      position: 'relative',
      width: 80,
      justifyContent: 'center',
    },
    availabilityIndicator: {
      position: 'absolute',
      width: 20,
      height: 20,
      bottom: 6,
      right: -4,
      borderRadius: 10,
      backgroundColor: 'red',
      borderWidth: 1.5,
      borderColor: 'white',
    },
    jobDataSectionContainer: {
      width: wth(100),
      padding: 10,
      paddingTop: 0,
      height: '100%',
    },
    calendarText: {
      fontSize: 24,
      lineHeight: 32,
      color: 'white',
      padding: '2%',
      textAlign: 'center',
    },
    calendarRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dateText: {
      color: 'white',
      padding: '2%',
      textAlign: 'left',
      fontSize: 16,
      lineHeight: 18,
      fontWeight: 'bold',
    },
    timeText: {
      color: 'rgba(255, 255, 255, 0.4)',
      padding: '2%',
      textAlign: 'right',
      fontSize: 16,
      lineHeight: 18,
      flex: 1,
    },
    card: {
      color: 'white',
      width: '100%',
      marginVertical: 5,
      borderRadius: 10,
      paddingTop: 8,
      
      borderWidth: 1.2,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      backgroundColor: '#0F161A',
    },
    addButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.08)',
      backgroundColor: theme.background,
      paddingTop: 10, 
      paddingBottom:10 ,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
    
    },
    iconImage: {
      height: 10, width: 10
    },
    actionText:{
      color: '#fff', paddingHorizontal: 10, fontSize: 16 
    },
    imageOuterContainer: {
      position: 'relative'
    },
    imageInnerContainer: {
      position: 'absolute', bottom: 0, right: 0
    },
    cardText: {
      color: 'white',
      padding: '2%',
      textAlign: 'left',
      fontSize: 22,
      fontWeight: '600',
    },
    dollarText: {
      color: 'white',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      fontWeight: 600,
    },
    dollarView: {
      color: 'white',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    cardTime: {
      color: 'white',
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '600',
      marginVertical: 10,
      paddingVertical: hth(0.15),
    },
    cardView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
     
      borderBottomColor: '#080F13',
      paddingHorizontal: 12,
    },
    timer: {
      color: 'gray',

      paddingHorizontal: 10,
      fontSize: 16,
      marginVertical: 10,
    },
    titleText: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
    nextDateText: {
      color: 'gray',
      fontWeight: '600',
    },
    jobRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingTop: 8
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
      margin: 20,
      borderRadius: 12,
    },
    dolls: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingHorizontal: 12,
      color: 'rgba(255, 255, 255, 0.6)',
      backgroundColor: 'rgba(4, 8, 9, 0.88)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderRadius: 16,
      marginRight: 10,
    },
    dollsText: {
      color: 'rgba(255, 255, 255, 0.6)',
      textAlign: 'center',
    },
    titleSmall: {
      color: 'white',
      paddingLeft: 10,
      fontSize: 16,
      fontWeight: '600',
    },
    titleSmall2: {
      color: 'white', opacity: 0.7, fontSize: 16
    },
    date: {
      color: 'white',
      opacity: 0.7,
      fontSize: 16,
    },
    weekdayView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weekday: {
      opacity: 0.7,
      fontSize: 16,
      textAlign: 'right',
      marginLeft: 5,
      color: 'rgba(255, 255, 255, 0.4)',
    },
    titleTiny: {
      color: 'white',
      opacity: 0.7,
      fontSize: 16
    },
    language: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingHorizontal: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.13)',
      borderRadius: 16,
      borderColor: '#fff',
    },
    languageText: {
      color: '#ffffff',
      textAlign: 'center',
    },
  });
};

export default jobsCompStyles;
