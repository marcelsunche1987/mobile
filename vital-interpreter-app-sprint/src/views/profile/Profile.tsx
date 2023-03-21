import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { useAuth } from '../../context/AuthenticatedContext';
import createStyles from './ProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileImageHolder from '../../components/profileComps/ProfileImageHolder';
import SignOutButton from '../../components/profileComps/SignOutButton';
import ProfileDataSection from '../../components/profileComps/ProfileDataSection'; 
import { usePermissions } from '../../apiHooks/selectorInfo/usePermissions';
import { useIsFocused } from '@react-navigation/native';
import { useUserProfile } from '../../apiHooks/user/useUserProfile'; 
import ProfileErrorDisplay from '../../components/profileComps/ProfileErrorDisplay';
import ScreenHeader from '../../components/common/screenHeader';
// vitaltoken
const vitalToken =  AsyncStorage.getItem('vitalToken');
export const Profile = () => {
  const { signOut } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const perm = usePermissions();
  const { getProfile } = useUserProfile(vitalToken); 
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState();
  const [errorMsg, setErrorMsg] = useState()
  const [userId, setUserId] = useState();
  const isFocused = useIsFocused(); 

  const getPerms = async ()=>{
    let data = await perm.get()
    return data
   } 

  const fetchProfile = async () => {
    setLoading(true); 
    const  data = await getPerms()
    setUserId(data?.userId)
    const query : Object ={ userId: data?.userId || ''}
    const result = await getProfile(query);
    if (result && !result.error) { 
      setUserData(result) 
      setErrorMsg('')
      //console.log("user results ", result)
    } else {
      console.log('error: ', result) 
      setErrorMsg(result.error)
    }
    if (result) setLoading(false);
  };

  useEffect(() => {
    if (isFocused){
      fetchProfile();
    } 
  }, [isFocused]);
  useEffect(()=>{
    getPerms() 
  },[])
  return (
    <View style={{...styles.container}}>
      <StatusBar barStyle="light-content" animated={true} backgroundColor="#6a51ae" />
      {/* <ScreenHeader text={'My Profile'} showBackArrow={false} showHeaderTitle={true}/> */}
      <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled showsVerticalScrollIndicator={false}> 
        <View style={styles.profileBody}>
          <ProfileImageHolder userId={userId} vitalToken={vitalToken} />
          {!!errorMsg && !userData && <ProfileErrorDisplay errorMsg={errorMsg?.toString()||''}/>}
          {userData && <ProfileDataSection userData={userData} />}
        </View> 
        <SignOutButton onPress={signOut} /> 
      </ScrollView>
    </View>
  );
};
