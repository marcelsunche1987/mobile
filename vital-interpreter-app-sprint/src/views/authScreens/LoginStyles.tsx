import { Platform, StyleSheet } from "react-native";
import { color } from 'react-native-reanimated';
import { useTheme, } from "react-native-paper";
import { wth, hth } from "../../constants/size";

const createStyles = (theme: any) => {
    const { colors } = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.background ,
            padding: wth(2),
            paddingTop: hth(1),  
        },
        headline: { flex: 1,
         justifyContent: 'space-between' 
        },
        // headlineText: {
        //     color: 'white', padding: '2%', textAlign: 'center'
        // },
        headlineText: {
            color: '#080F13',
            padding: '2%',
            textAlign: 'center',
          },
        headlineImage: {
            alignSelf: 'center', 
        },
        bottomContainer:{
            flex: 1, justifyContent: 'center', alignItems:"center" 
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
        logoutView: {
            marginLeft: 5, marginBottom: Platform.os == 'ios'? -4:0
          },
          button: {
            width: wth(100),
            padding: 10, 
            borderRadius: 10, 
          },
        bottomButton:{
            justifyContent: 'center', flex: 1
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
        logo: {
            alignSelf: 'center', maxWidth: '100%', height: 20, justifyContent: 'flex-end'
        },
        button:{
            width: wth(100), padding:10,  borderRadius: 12
        }
    })
}

export default createStyles;