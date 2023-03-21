import { useTheme, Text, Card } from 'react-native-paper';
import React, { useEffect, useState, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';
import scheduleCompStyles from './ScheduleCompStyles';
import { formatDateDifference } from '../../utils/dateUtil';
import { RAC, RBC } from '../../utils/colorUtil';
import { useNavigation } from '@react-navigation/native';
import { hasScheduleStarted, isToday } from '../../utils/dateUtil';
const ScheduleCard = (props: any) => {
  const [is_today, setIsToday] = useState(isToday(new Date(props.obj.startDt)));
  const [hasStarted, setHasStarted] = useState(false);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = scheduleCompStyles(colors);
  let startDate = new Date(props.obj.startDt);
  let endDate = new Date(props.obj.endDt);
  const timeDiff = formatDateDifference(startDate, endDate);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  //console.log('schedule data ', props);
  // console.log('hasScheduleStarted ', hasScheduleStarted(startDate, endDate));
  const hasBegun = () => {
    if (!is_today) return;
    //let a = hasScheduleStarted(startDate, endDate);
    //console.log('a is ', a);
    setHasStarted(hasScheduleStarted(startDate, endDate));
  };

  useEffect(() => {
    if (is_today) {
      const timerId = setInterval(() => {
        hasBegun();
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ScheduleDetails', { propsData: props });
      }}
      style={{
        ...styles.card,
        backgroundColor: RBC(props.obj.scope),
      }}>
      <View
        style={{
          ...styles.contentBlock,
          position: 'relative',
        }}>
        {hasStarted && (
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              backgroundColor: RBC(props.obj.scope),
              borderBottomRightRadius: 6,
              borderTopRightRadius: 6,
              opacity: 0.21,
            }}></View>
        )}
        <View style={styles.cardContentBlock}>
          <View style={{ ...styles.scheduleRow }}>
            <Text style={{ ...styles.cardTitle }}>{props.obj.scope}</Text>
            {hasStarted && (
              <View
                style={{
                  backgroundColor: RBC(props.obj.scope),
                  borderRadius: 20,
                  padding: 3,
                  paddingHorizontal: 10,
                  paddingBottom: -2,
                }}>
                <Text style={{ ...styles.cardTime, color: '#000000' }}>
                  Now
                </Text>
              </View>
            )}
          </View>
          <View style={{ ...styles.timeRow }}>
            {startDate && endDate && (
              // <Text
              //   variant="bodyMedium"
              //   style={{
              //     ...styles.cardTime,
              //   }}>
              //   {startDate.toLocaleTimeString('en-US', options).toLowerCase()}{' '}
              //   {'-'}{' '}
              //   {endDate.toLocaleTimeString('en-US', options).toLowerCase()}
              // </Text>
              <Text
                variant="bodyMedium"
                style={{
                  ...styles.cardTime,
                }}>
                {format(startDate, 'KK:mm aaa')} {'-'}{' '}
                {format(endDate, 'KK:mm aaa')} 
              </Text>
            )}
            {hasStarted ? (
              <Text
                style={{
                  ...styles.timer,
                  fontWeight: 'bold',
                  color: RBC(props.obj.scope),
                }}>
                {timeDiff}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.timer,
                }}>
                {timeDiff}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
