import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper'; 
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { useAuth } from '../context/AuthenticatedContext';
import { Login, Home, Schedule, Work, Profile, ScheduleDetails } from '../views';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import useProfilePhotoNav from '../apiHooks/user/useProfilePhotoNav'; 
import FIcon from 'react-native-vector-icons/Ionicons'
import { ScheduleNav } from './ScheduleNav';
import CompanyAvailabilityNav from './CompanyAvailabilityNav';
const Tab = createBottomTabNavigator();

const createStyles = (theme: any) => {
  return StyleSheet.create({
    navigationStyle: {
      paddingTop: 10, 
      //marginHorizontal: 16,
      // shadowOpacity: 0.2,
      // shadowRadius: 10,
      // borderRadius: 10,
      borderTopColor: theme.surfaceVariant,
      minHeight: 124,
      width: '100%',
      position: 'absolute',
      justifyContent: 'center',
      paddingBottom: 50,
      paddingHorizontal: 10,
      backgroundColor: '#0F161A', 
    },
  });
};

export const Navigation = () => {
  const { authState } = useAuth();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [resultImage, userId] = useProfilePhotoNav();
  //let navigation = useNavigation() 
  const AuthenticatedView = () => {
    return (
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: true,
          tabBarStyle: styles.navigationStyle,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#0F161A',
            shadowColor: 'rgba(255, 255, 255, 0.3)',  
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 19,
            lineHeight: 24,
            marginLeft: 10,
            marginBottom: 5,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? 'white' : 'rgba(255, 255, 255, 0.6);',
                }}>
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => {
              return focused ? (
                <Icon
                  name="home-variant"
                  color={'rgba(255, 255, 255, 1);'}
                  size={35}
                />
              ) : (
                <Icon
                  name="home-variant-outline"
                  color={'rgba(255, 255, 255, 0.6);'}
                  size={35}
                />
              );
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'Inter-Medium',
            },
          }}
        />
        <Tab.Screen
          name="My Schedule"
          component={ScheduleNav}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? 'white' : 'rgba(255, 255, 255, 0.6);',
                }}>
                Schedule
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => {
              return focused ? (
                <Image
                source={require('../assets/images/scheduleFilledIcon.png')}
                style={{ width: 26, height: 26}}/>
               
               
              ) : (
                <Icon
                  name="calendar-blank-outline"
                  color={'rgba(255, 255, 255, 0.6)'}
                  size={35} />
              )

              
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'Inter-Medium',
            },
          }}
        />
        <Tab.Screen
          name="Available Jobs"
          component={CompanyAvailabilityNav}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? 'white' : 'rgba(255, 255, 255, 0.6);',
                }}>
                Jobs
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <FIcon
                name="search"
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.6);'}
                size={35}
              />
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'Inter-Medium',
            },
          }}
        />
        {/* <Tab.Screen
          name="Available Jobs"
          component={Work}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? 'white' : 'rgba(255, 255, 255, 0.6);',
                }}>
                Jobs
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <FIcon
                name="search"
                color={focused ? 'white' : 'rgba(255, 255, 255, 0.6);'}
                size={35}
              />
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'Inter-Medium',
            },
          }}
        /> */}
        <Tab.Screen
          name="My Profile"
          component={Profile}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? 'white' : 'rgba(255, 255, 255, 0.6);',
                }}>
                Profile
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <View>
                {resultImage ? (
                  <Image
                    // source={require('./assets/images/Avatar.png')}
                    source={{ uri: resultImage }}
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: colors.primary,
                      borderRadius: 13,
                    }}
                  />
                ) : (
                  <Icon
                    name="account-circle-outline"
                    color={focused ? 'white' : 'rgba(255, 255, 255, 0.6);'}
                    size={35}
                  />
                )}
              </View>
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              fontFamily: 'Inter-Medium',
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {authState.authentication?.authenticated ? (
        <AuthenticatedView />
      ) : (
        <Login />
      )}
    </NavigationContainer>
  );
};
