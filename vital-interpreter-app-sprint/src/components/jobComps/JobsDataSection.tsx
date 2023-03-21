import { View, SectionList, RefreshControl, Platform, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAvailableJobs } from '../../apiHooks/jobs/useAvailableJobs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hth } from '../../constants/size';
import { useTranslation } from 'react-i18next';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import jobsCompStyles from './JobsCompStyles';
import JobCard from './JobCard';
import { format, compareAsc } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { usePermissions } from '../../apiHooks/selectorInfo/usePermissions';
import { fetchJobs, fetchJobsPagination } from '../../apiHooks/schedule/functions';
const vitalToken = AsyncStorage.getItem('vitalToken');
const JobsDataSection = ({ navigation }: any) => {
  // const { getJobs } = useAvailableJobs(vitalToken);
  const perm = usePermissions();
  const { colors } = useTheme();
  const styles = jobsCompStyles(colors);
  const { t } = useTranslation();
  const [jobList, setJobList] = useState<any[] | null>();
  const [refreshing, setRefreshing] = useState(true);
  const [jobsData, setJobsData] = useState<any[] | null>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [start, setStart] = useState<any>();
  const [end, setEnd] = useState<any>();
  const [today, setToday] = useState(new Date());




  const { getJobs } = useAvailableJobs(vitalToken);
  let availStart: Date | number | string = '';
  let availEnd: Date | number | string = '';
  let permsData: object | null = null;
  const getPerms = async () => {
    let data = await perm.get();
    permsData = data;
    return data;
  };



  // const fetchJobs = async () => {
  //   if (loading) return;
  //   setErrorMsg('');
  //   setLoading(true);
  //   const data = await getPerms();
  //   //Get the currrent time and make it a string, without the Z
  //   const datetime = new Date();
  //   const now = datetime.toISOString().replace('Z', '');

  //   //Get 30 days ahead  time without the Z
  //   const Sevendays = datetime.getTime() + 7 * 24 * 60 * 60 * 1000;
  //   const SEVEN = new Date(Sevendays);
  //   const SEVEN_DAYS = SEVEN.toISOString().replace('Z', '');
  //   availStart = now;
  //   availEnd = SEVEN_DAYS;
  //   setStart(now);
  //   setEnd(SEVEN_DAYS);

  //   if (Platform.OS == 'android') {
  //     console.log('jobs date is date ', now, 'SEVEN_DAYS ', SEVEN_DAYS);
  //   }
  //   const query: Object = {
  //     userId: data?.userId || '',
  //     ShowOnlyPremiums: false,
  //     availableStartDt: now,
  //     availableEndDt: SEVEN_DAYS,
  //     centerId: data.primaryCenterId,
  //     queueId: data.preferredQueueId,
  //     //  centerId:  91,
  //     // queueId:  1,
  //   };
  //   const result = await getJobs(query);
  //   if (result && !result.error) {
  //     setJobsData(result);
  //     loadJobsData(result);
  //     setErrorMsg('');
  //   } else {
  //     console.log('error: ', result);
  //     setErrorMsg(result.error);
  //   }
  //   if (result) setLoading(false);
  //   setRefreshing(false);
  //   // console.log('user results ', result);
  // };
  
  // const fetchJobs = async () => {
  //   if (loading) return;
  //   setErrorMsg('');
  //   setLoading(true);
  //   const data = await getPerms();
  //   //Get the currrent time and make it a string, without the Z
  //   const datetime = new Date();
  //   const now = datetime.toISOString().replace('Z', '');

  //   //Get 30 days ahead  time without the Z
  //   const Sevendays = datetime.getTime() + 7 * 24 * 60 * 60 * 1000;
  //   const SEVEN = new Date(Sevendays);
  //   const SEVEN_DAYS = SEVEN.toISOString().replace('Z', '');
  //   availStart = now;
  //   availEnd = SEVEN_DAYS;
  //   setStart(now);
  //   setEnd(SEVEN_DAYS);

  //   if (Platform.OS == 'android') {
  //     console.log('jobs date is date ', now, 'SEVEN_DAYS ', SEVEN_DAYS);
  //   }
  //   const query: Object = {
  //     userId: data?.userId || '',
  //     ShowOnlyPremiums: false,
  //     availableStartDt: now,
  //     availableEndDt: SEVEN_DAYS,
  //     centerId: data.primaryCenterId,
  //     queueId: data.preferredQueueId,
  //     //  centerId:  91,
  //     // queueId:  1,
  //   };
  //   const result = await getJobs(query);
  //   if (result && !result.error) {
  //     setJobsData(result);
  //     loadJobsData(result);
  //     setErrorMsg('');
  //   } else {
  //     console.log('error: ', result);
  //     setErrorMsg(result.error);
  //   }
  //   if (result) setLoading(false);
  //   setRefreshing(false);
  //   // console.log('user results ', result);
  // };

  const dateOptions = {
    month: 'short',
    day: 'numeric',
  };

  

  const renderFooter = () => {
    return loading ? (
      <View style={{ paddingTop: 20 }}>
        {errorMsg ? <Text style={{ color: 'white' }}>{errorMsg}</Text> : <ActivityIndicator size="small" />}
      </View>
    ) : null;
  };

  const loadJobsData = (jobs: object[] | null) => {
    console.log('number of jobs... ', jobs.length || 0);
    let list: any = {};
    if (!Array.isArray(jobs)) return;
    jobs.forEach(item => {
      let rawDate = new Date(item.dateOfWork);
      let currentDate = rawDate.toLocaleString('en-US', dateOptions);
      // console.log('currentDate is ', currentDate);
      if (!list[currentDate]) {
        list[currentDate] = {
          title: rawDate,
          data: [],
        };
      }
      list[currentDate].data.push(item);
    });
    setJobList(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(loading,setLoading, setErrorMsg,getPerms, availStart, availEnd,setStart, setEnd, getJobs,setJobsData,loadJobsData,setRefreshing);
  }, []);
  return (
    <View style={styles.jobDataSectionContainer}>
      {jobList ? (
        <SectionList
          sections={Object.values(jobList)}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <JobCard data={item} navigation={navigation} />
          )}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchJobs(loading,setLoading, setErrorMsg,getPerms, availStart, availEnd,setStart, setEnd, getJobs,setJobsData,loadJobsData,setRefreshing)}
              tintColor="gray"
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchJobsPagination(loading, setLoading, setErrorMsg,getPerms, availStart, availEnd, getJobs,loadJobsData, end, jobsData)}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <View style={styles.sectionTitleContainer}>
                <View>
                  <Text
                    variant="titleSmall"
                    style={{
                      ...styles.titleSmall,
                    }}>
                    {/* {format(title, pattern, { timeZone: 'Europe/Berlin' })} */}
                    {format(title, 'MMM dd')}
                    {/* {title.toLocaleString('en-US', dateOptions)}{" "} */}
                    <Text> </Text>

                    <Text variant="titleSmall" style={{ ...styles.date }}>
                      {format(today, 'MMM dd') == format(title, 'MMM dd')
                        ? 'Today'
                        : `${format(title, 'EEEE')}`}
                    </Text>
                  </Text>
                </View>
                {format(today, 'MMM dd') == format(title, 'MMM dd') ? (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginRight: 15,
                      marginBottom: -5,
                    }}>
                    <View style={{ ...styles.weekdayView }}>
                      <Image
                        source={require('../../assets/images/clock.png')}
                        style={{ width: 16, height: 16 }}
                      />
                      <Text
                        variant="titleSmall"
                        numberOfLines={1}
                        style={{ ...styles.weekday }}>
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
                      </Text>
                    </View>
                  </View>
                ) : null}

              </View>

            );
          }}
        />
      ) : null}
      {renderFooter()}
      <View style={{ height: 100 }}></View>
    </View>
  );
};

export default JobsDataSection;
