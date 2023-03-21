import { StyleSheet } from "react-native";
import { hth, wth } from "../../constants/size";

const profileCompStyles = (theme: any) => {
    return StyleSheet.create({
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
            bottom: 2,
            right: 2,
            borderRadius: 10,
            backgroundColor: 'red',
            borderWidth: 1.5,
            borderColor: 'white',
        },
        profileDataSectionContainer: {
            width: wth(100),
            height:'100%',
            alignItems: 'flex-start',
            padding: 5, 
            flexWrap: 'wrap',  
        },
        titleText: {
            fontSize: 24, lineHeight: 32,color: 'white', padding: '2%',  fontWeight: 'bold', textAlign:'left'
        },
        headlineText: {
            color: 'white', padding: '2%', fontSize: 16, lineHeight: 16, paddingVertical: hth(0.15),
            marginTop: 10, textAlign:'left'
        },
        errorText: {
            paddingVertical: hth(0.15),
            marginTop: 10,
            color:'red',
            opacity:0.7
        },
        headlineSubText: {
            paddingVertical: hth(0.15), textAlign:'left' 
        },
        email: {
            color: 'gray'
        },
        headlineImage: {
            alignSelf: 'center',
        },
        bottomContainer: {
            flex: 1, justifyContent: 'center'
        },
        bottomButton: {
            justifyContent: 'center', flex: 1
        },
        logo: {
            alignSelf: 'center', maxWidth: '100%', height: 20, justifyContent: 'flex-end'
        },
        button: {
            width: wth(100), margin: 20, borderRadius: 12
        }
    })
}

export default profileCompStyles;