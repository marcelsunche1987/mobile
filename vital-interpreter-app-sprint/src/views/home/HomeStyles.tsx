import { StyleSheet } from "react-native";
import { color } from 'react-native-reanimated';
import { useTheme, } from "react-native-paper";

const createStyles = (theme: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme.background,
            padding: '7%',
            paddingTop: '10%',
        },
        headline: { flex: 1,
         justifyContent: 'space-between' 
        },
        headlineText: {
            color: 'white', padding: '2%' 
        },
        headlineImage: {
            alignSelf: 'center', 
        },
        bottomContainer:{
            flex: 1, justifyContent: 'center' 
        },
        bottomButton:{
            justifyContent: 'center', flex: 1
        },
        logo: {
            alignSelf: 'center', maxWidth: '100%', height: 20, justifyContent: 'flex-end'
        }
    })
}

export default createStyles;