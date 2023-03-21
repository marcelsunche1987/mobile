import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { Schedule, ScheduleDetails } from '../views';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import scheduleCompStyles from '../components/scheduleComps/ScheduleCompStyles';

const Stack = createNativeStackNavigator();
export const ScheduleNav = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = scheduleCompStyles(colors);

  return (
    <Stack.Navigator 
     >
      <Stack.Screen
        name="Schedule Home"
        component={Schedule}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: styles.screenBackground,
          },
        }}
      />
      <Stack.Screen
        name="ScheduleDetails"
        component={ScheduleDetails}
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: styles.screenBackground,
          },
        }}
      />
    </Stack.Navigator>
  );
};
