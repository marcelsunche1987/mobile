import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Text } from 'react-native-paper';
import scheduleCompStyles from '../../components/scheduleComps/ScheduleCompStyles';
import { formatDateDifference } from '../../utils/dateUtil';
import { format, compareAsc } from 'date-fns';
import { hth } from '../../constants/size';
import CancelButton from '../../components/scheduleComps/CancelButton';
import ScreenHeader from '../../components/common/screenHeader';
export const ScheduleDetails = ({ route }: any) => {
  const { colors } = useTheme();
  const [today, setToday] = useState(new Date());
  const styles = scheduleCompStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const cancelAlert = () =>
    Alert.alert('Cancel Shift', 'Are you sure you want to cancel this shift?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => cancelShiftNext() },
    ]);
  const cancelShiftNext = () =>
    Alert.alert('Cancel Shift', 'Your shift has been cancelled', [
      { text: 'Return to My Schedules', onPress: () => navigation.goBack() },
    ]);

  const dateOptions = {
    month: 'short',
    day: 'numeric',
  };

  const { propsData } = route.params;
  console.log('Pdata ', propsData);
  let startDate = new Date(propsData.obj.startDt);
  let endDate = new Date(propsData.obj.endDt);
  let lunchStartDate = new Date(propsData.obj.lunchStartDt);
  let lunchEndDate = new Date(propsData.obj.lunchEndDt);
  const timeDiff = formatDateDifference(startDate, endDate);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <ScrollView style={{ ...styles.container }}>
      {/* <ScreenHeader text={'Shift Details'} showBackArrow={true}/> */}
      <View style={{ ...styles.cardDetailsContainer }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ ...styles.cardDetailsTitle, marginBottom: 5 }}>
            {propsData.obj.scope}
          </Text>
          <TouchableHighlight
            style={{ ...styles.language }}
            underlayColor="#fff">
            <View style={{ ...styles.usRow }}>
              <Image
                style={{ ...styles.usImage }}
                source={require('../../assets/images/usicon.png')}
              />
              <Text style={{ ...styles.languageText }}>
                {'  '}
                {t('EN')}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <Text variant="titleSmall" style={{ ...styles.cardDetailsSubTitle }}>
          <Text variant="titleSmall" style={{ ...styles.date }}>
            {t(`${format(startDate, 'EEEE')}`)},{' '}
            {t(`${format(startDate, 'MMMM dd')}`)}
            {/* {t(
              `${startDate.toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
              })}`,
            )} */}
          </Text>
        </Text>
        <View style={{ ...styles.cardTimeRow }}>
          <View style={{ ...styles.logoRow, marginVertical: 10 }}>
            <View style={{ marginRight: 10 }}>
              <Image
                style={{ ...styles.logoImage }}
                source={require('../../assets/images/logo.png')}
              />
            </View>

            <Text
              variant="bodyMedium"
              style={{
                ...styles.cardDetailsLocation,
              }}>
              {t(`${propsData?.obj?.centerName || ''}`)}
            </Text>
          </View>

          <TouchableHighlight
            style={{ ...styles.workMode, ...styles.coloredLanguage }}
            underlayColor="#fff">
            <Text
              style={{ ...styles.languageText, ...styles.coloredLanguageText }}>
              {t('On-site')}
            </Text>
          </TouchableHighlight>
        </View>
        <TouchableOpacity style={{ ...styles.buttonContainer }} disabled>
          <Image
            style={{ ...styles.checkImage }}
            source={require('../../assets/images/checkCircle.png')}
          />
          <Text style={styles.text}>
            {'  '}
            {t('Confirmed')}
          </Text>
        </TouchableOpacity>
        <View style={{ ...styles.logoRow }}>
          <Image
            style={{ ...styles.clockImage }}
            source={require('../../assets/images/clock2.png')}
          />
          <Text
            variant="bodyMedium"
            style={{
              ...styles.timeZone,
            }}>
            {'  '}
            {/* {t('Central Standard Time')} */}
            {Platform.OS == 'android'
              ? format(today, 'p O')
              : today
                  .toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZoneName: 'short',
                  })
                  .toString()}

            {/* {t(`${startDate.toLocaleString('en-US', { timeZoneName: 'long' }).toString()}`)}   */}
          </Text>
        </View>
        <View style={{ ...styles.shiftContainer }}>
          <View style={{ ...styles.shiftRow }}>
            <Text style={{ ...styles.shiftText }}>{t('Shift')}</Text>
            <View style={{ ...styles.shiftTime }}>
              {startDate && endDate && (
                <Text
                  variant="bodyMedium"
                  style={{
                    ...styles.cardTime,
                    paddingVertical: hth(0.15),
                  }}>
                  {t`(${startDate
                    .toLocaleTimeString('en-US', options)
                    .toLowerCase()})`}{' '}
                  {'-'}{' '}
                  {endDate.toLocaleTimeString('en-US', options).toLowerCase()}
                </Text>
              )}
              {/* <Image
                style={{ ...styles.arrowImage }}
                source={require('../../assets/images/zArrow.png')}
              /> */}
            </View>
          </View>
          <View style={{ ...styles.shiftRow }}>
            <Text style={{ ...styles.shiftText }}>{t('Break')}</Text>
            <View style={{ ...styles.shiftTime }}>
              {lunchStartDate && lunchEndDate ? (
                <Text
                  variant="bodyMedium"
                  style={{
                    ...styles.cardTime,
                    paddingVertical: hth(0.15),
                  }}>
                  {lunchStartDate
                    .toLocaleTimeString('en-US', options)
                    .toLowerCase()}{' '}
                  {'-'}{' '}
                  {lunchEndDate
                    .toLocaleTimeString('en-US', options)
                    .toLowerCase()}
                </Text>
              ) : (
                'No Break'
              )}
              {/* <Text style={{ ...styles.shiftTimeText }}>{t('No Break')}{" "}</Text> */}
              {/* <Image
                style={{ ...styles.arrowImage }}
                source={require('../../assets/images/zArrow.png')}
              /> */}
            </View>
          </View>
        </View>
      </View>
      <CancelButton onPress={cancelAlert} text={'Cancel Shift'} />
      <View style={{ height: 150 }}></View>
    </ScrollView>
  );
};
