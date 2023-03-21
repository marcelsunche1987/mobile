import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import JobsDataSection from '../../components/jobComps/JobsDataSection';
import { usePermissions } from '../../apiHooks/selectorInfo/usePermissions';
import { useIsFocused } from '@react-navigation/native';
import createStyles from './WorkStyles'; 
const vitalToken = AsyncStorage.getItem('vitalToken');
export const Work = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors); 
  const JobsDataSectionMemo = React.memo(JobsDataSection);
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={styles.headline}></View>
      <View>
        <JobsDataSectionMemo/>
      </View>
      <View style={{ height: 70 }}></View>
    </SafeAreaView>
  );
};
