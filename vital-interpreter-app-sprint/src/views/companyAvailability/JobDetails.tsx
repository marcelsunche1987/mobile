import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePermissions } from '../../apiHooks/selectorInfo/usePermissions';
import {
  Alert,
  Button,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme, Text, Checkbox } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import createStyles from './WorkStyles';
import {
  formatDateDifference,
  formatShortTime,
} from '../../utils/dateUtil';

import { format, compareAsc } from 'date-fns'
import { hth } from '../../constants/size';
import jobsCompStyles from '../../components/jobComps/JobsCompStyles';
import DatePicker from 'react-native-date-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ButtonComponent } from '../../components/common/ButtonComponent/ButtonComponent';
import { useJobDetails, useCancelCodes } from '../../apiHooks/jobs/useAvailableJobs';



const vitalToken = AsyncStorage.getItem('vitalToken');
console.log('VT is ', vitalToken)
export const JobDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = createStyles(colors);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [checked, setChecked] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [initialShiftStart, setInitialShiftStart] = useState('');
  const [initialShiftEnd, setInitialShiftEnd] = useState('');
  const [shiftStart, setShiftStart] = useState('');
  const [shiftEnd, setShiftEnd] = useState('');
  const [lunchStart, setLunchStart] = useState('');
  const [lunchEnd, setLunchEnd] = useState('');
  const [lunchValid, setLunchValid] = useState(true);
  const [timeBlock, setTimeBlock] = useState('');
  const [jobsDetailData, setJobsDetailData] = useState('')
  const [errorMsg, setErrorMsg] = useState('') 

  const { acceptJob } = useJobDetails(vitalToken);
  const { getCancelCodes} = useCancelCodes(vitalToken)
  const perm = usePermissions();


  // const [tDiff, setTimeDiff] = useState('---');
  let maxDate = new Date(route.params.scheduleEndDt);
  let MAX_DATE = maxDate.getTime() + 5 * 60 * 1000;
  let MAXIMUM_DATE = new Date(MAX_DATE);

  const showDatePicker = (type: string) => {
    setDatePickerVisibility(true);
    setTimeBlock(type);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const cancelJob = () =>
    Alert.alert('Cancel Shift', 'Are you sure you want to cancel this job?', [
      {
        text: 'No',
        onPress: () => console.log('No Cancel'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => console.log('Cancel Pressed') },
    ]);

  const handleConfirmShift = (time: any) => {
    if (time.getTime() > MAX_DATE) return;
    //Convert all the date strings to date objects
    //so they can be compared
    let LS = new Date(lunchStart);
    let SS = new Date(shiftStart);
    let SE = new Date(shiftEnd);
    let LE = new Date(lunchEnd);
    //setTimeDiff(formatDateDifference(LS, LE));
    if (timeBlock === 'shiftStart') {
      if (time >= SE || time >= LS || time >= LE) {
        Alert.alert('Shift Start invalid');
        return;
      } else {
        setShiftStart(time);
      }
    }
    if (timeBlock === 'shiftEnd') {
      if (time <= SS || time <= LS || time <= LE) {
        Alert.alert('Shift End invalid');
        return;
      } else {
        setShiftEnd(time);
      }
    }
    if (timeBlock === 'lunchStart') {
      if (time <= SS || time >= LE || time >= SE) {
        Alert.alert('Lunch Start invalid');
        return;
      } else {
        setLunchStart(time);
      }
    }
    if (timeBlock === 'lunchEnd') {
      if (time <= SS || time <= LS || time > SE) {
        Alert.alert('Lunch End invalid');
        return;
      } else {
        setLunchEnd(time);
      }
    }

    hideDatePicker();
  };
  const dateOptions = {
    month: 'short',
    day: 'numeric',
  };

  let startDate = new Date(route.params.scheduleStartDt);
  let endDate = new Date(route.params.scheduleEndDt);

  let lunchStartDate = new Date();
  let lunchEndDate = new Date();

  const timeDiff = formatDateDifference(startDate, endDate);
  const timeDiff2 = timeDiff.split(' ');
  const extractedHr = timeDiff2[0].substring(0, timeDiff2[0].length - 1);

  const extractedMin = timeDiff2[1].substring(0, timeDiff2[1].length - 1);
  const HrMin = Number(extractedHr) * 60 + Number(extractedMin);

  // const options = {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // };

  const getPerms = async () => {
    let data = await perm.get(); 
    console.log("data frok permisiins ", data)
    return data;
  };

  const submitJobDetails = async () => {
    const data = await getPerms(); 
    try{
      // const query: Object = {
      //   // userId: data?.userId || '',
      //   // ShowOnlyPremiums: false,
      //   // availableStartDt: now,
      //   // availableEndDt: THIRTY_DAYS,
      //   // centerId: data.primaryCenterId,
      //   // queueId: data.preferredQueueId,
      //   //  centerId:  91,
      //   // queueId:  1,
      //   centerId: data?.primaryCenterId,
      //   userId: data?.userId || '',
      //   queueId: data?.preferredQueueId,
      //   startDt: format(startDate, 'M/d/yyyy HH:mm'),
      //   endDt: format(endDate, 'M/d/yyyy HH:mm'),
      //   lunchStartDt: format(lunchStart, 'M/d/yyyy HH:mm'),
      //   lunchEndDt: format(lunchEnd, 'M/d/yyyy HH:mm'),
      //   scheduleSourceID: 4
      // };
      console.log("format(startDate, 'M/d/yyyy HH:mm') ", format(startDate, 'M/d/yyyy HH:mm'), ' timeDiff ', timeDiff)
     // console.log("query to be sent is ", query)
      // const result = await acceptJob(query);
      // if (result && !result.error) {
      //   setJobsDetailData(result);
      //   setErrorMsg('');
      // } else {
      //   setErrorMsg(result.error);
      // }
      //if (result) setLoading(false);
    }catch(err){
      console.log("error in submitJobDetails", err)
    }
   
  }; 
  useEffect(() => {
    setShiftStart(route.params.scheduleStartDt);
    setShiftEnd(route.params.scheduleEndDt);
    setInitialShiftStart(route.params.scheduleStartDt);
    setInitialShiftEnd(route.params.scheduleEndDt);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ ...styles.container }}>
        <View style={{ ...styles.cardDetailsContainer }}>
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
              paddingVertical: 20,
              textAlign: 'center',
            }}>
            * Premium hours may not match available hours exactly
          </Text>
          <Text variant="titleSmall" style={{ ...styles.cardDetailsSubTitle }}>
            <Text variant="titleSmall" style={{ ...styles.date }}>
              {t(
                `${format(startDate, 'EEEE')}`
              )},{' '}

              {t(
                `${format(startDate, 'MMMM dd')}`,
              )}
              {/* {t(
                `${startDate.toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  weekday: 'long',
                })}`,
              )} */}
            </Text>
          </Text>
          <View
            style={{
              ...styles.card,
            }}></View>
          <View style={{ ...styles.cardTimeRow }}>
            <View style={{ ...styles.logoRow }}>
              <Text style={{ ...styles.cardDetailsTitle, marginBottom: 5 }}>
                {route?.params?.centerName || ''}
              </Text>
              <TouchableHighlight
                style={{ ...styles.language }}
                underlayColor="#fff">
                <View style={{ ...styles.usRow }}>
                  <Image
                    style={{ height: 12, width: 12 }}
                    source={require('../../assets/images/usicon.png')}
                  />
                  <Text style={{ ...styles.languageText }}>
                    {'  '}
                    {t('EN')}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{ ...styles.dolls }}>
              <TouchableHighlight underlayColor="#fff">
                <Text style={{ ...styles.dollsText }}>{t('+$2')}</Text>
              </TouchableHighlight>
            </View>
          </View> 
          <View style={{ ...styles.shiftContainer }}>
            <View style={{ ...styles.shiftRow }}>
              <Text style={{ ...styles.shiftText }}>{t('Shift Start')}</Text>
              <TouchableOpacity onPress={() => showDatePicker('shiftStart')}>
                <View style={{ ...styles.shiftTime }}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      ...styles.cardTime,
                      paddingVertical: hth(0.15),
                    }}>
                    {formatShortTime(shiftStart)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.shiftRow }}>
              <Text style={{ ...styles.shiftText }}>{t('Shift End')}</Text>
              <TouchableOpacity onPress={() => showDatePicker('shiftEnd')}>
                <View style={{ ...styles.shiftTime }}>
                  {lunchStartDate && lunchEndDate ? (
                    <Text
                      variant="bodyMedium"
                      style={{
                        ...styles.cardTime,
                        paddingVertical: hth(0.15),
                      }}>
                      {formatShortTime(shiftEnd)}
                    </Text>
                  ) : (
                    'No Break'
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.shiftRow }}>
              <Text style={{ ...styles.shiftText, opacity: 0.3 }}>
                {t('Shift Length')}
              </Text>

              <View style={{ ...styles.shiftTime }}>
                {lunchStartDate && lunchEndDate ? (
                  <Text
                    variant="bodyMedium"
                    style={{
                      ...styles.cardTime,
                      opacity: 0.3,
                      paddingVertical: hth(0.15),
                    }}>
                    {timeDiff}
                  </Text>
                ) : (
                  'No Break'
                )}
              </View>
            </View>
            {HrMin > 60 && (
              <View>
                <View style={{ ...styles.shiftRow }}>
                  <Text style={{ ...styles.shiftText }}>
                    {t('Lunch Start')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => showDatePicker('lunchStart')}>
                    <View style={{ ...styles.shiftTime }}>
                      {lunchStartDate && lunchEndDate ? (
                        <Text
                          variant="bodyMedium"
                          style={{
                            ...styles.cardTime,
                            paddingVertical: hth(0.15),
                          }}>
                          {formatShortTime(lunchStart) || '---'}
                        </Text>
                      ) : (
                        'No Break'
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ ...styles.shiftRow }}>
                  <Text style={{ ...styles.shiftText }}>{t('Lunch End')}</Text>
                  <TouchableOpacity onPress={() => showDatePicker('lunchEnd')}>
                    <View style={{ ...styles.shiftTime }}>
                      {lunchStartDate && lunchEndDate ? (
                        <Text
                          variant="bodyMedium"
                          style={{
                            ...styles.cardTime,
                            paddingVertical: hth(0.15),
                          }}>
                          {formatShortTime(lunchEnd) || '---'}
                        </Text>
                      ) : (
                        'No Break'
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={styles.label}>Grab entire shift</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>

          <ButtonComponent name='Add Shift' styles={styles.addButton} onPress={() => submitJobDetails()} />
          <ButtonComponent name='Cancel' styles={styles.cancelButton} onPress={() => navigation.goBack()} />
        </View>
        {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
        {Platform.OS === 'android' ? <View style={{ height: 120 }}></View> : <View></View>}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirmShift}
          onCancel={hideDatePicker}
          minimumDate={new Date(initialShiftStart)}
          maximumDate={MAXIMUM_DATE}
          minuteInterval={15}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
