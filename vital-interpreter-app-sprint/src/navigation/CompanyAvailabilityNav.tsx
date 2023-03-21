import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { Work, JobDetails } from '../views';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import scheduleCompStyles from '../components/scheduleComps/ScheduleCompStyles';

const Stack = createNativeStackNavigator();

  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = scheduleCompStyles(colors); 
  const RootStack = createNativeStackNavigator()
  const ModalStack = createNativeStackNavigator()

  const ModalStackView = () => (
    <ModalStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ModalStack.Screen
        name="Job Details"
        component={JobDetails}
        options={{
          headerShown: false,
          presentation: 'modal',

        }}
      />

    </ModalStack.Navigator>
  )

  const CompanyAvailabilityNav = () => (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Job Home" component={Work} />
      <RootStack.Screen
        name="Job Modal"
        component={ModalStackView}
        options={{
          headerShown: false,
          presentation: 'modal',

        }}
      />
    </RootStack.Navigator>
  )
  export default CompanyAvailabilityNav



  // return (
  //   <Stack.Navigator 
  //    >
  //     <Stack.Screen 
  //       name="Job Home"
  //       component={Work}
  //       options={{
  //         headerShown: false,
  //         contentStyle: {
  //           backgroundColor: styles.screenBackground,
  //         },
  //       }}
  //     />
  //     <Stack.Screen
  //       name="JobDetails"
  //       component={JobDetails}
  //       options={{
  //         headerShown: false,
  //         contentStyle: {
  //           backgroundColor: styles.screenBackground,
  //         },
  //       }}
  //     />
  //   </Stack.Navigator>
  // );
