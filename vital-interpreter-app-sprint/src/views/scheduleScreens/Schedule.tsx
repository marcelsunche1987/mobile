import React from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import createStyles from '../authScreens/LoginStyles';
import ScheduleList from '../../components/scheduleComps/ScheduleList';

// Use stack navigation here to be able to create a navigation hierarchy

export const Schedule = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const ScheduleListMemo = React.memo(ScheduleList);


  return (
    <SafeAreaView style={styles.container}>
        <ScheduleListMemo   />
    </SafeAreaView>
  );
};
