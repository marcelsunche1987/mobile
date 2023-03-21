import { useTheme, Text, Card, ActivityIndicator } from 'react-native-paper';
import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  View,
  Platform,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ScheduleCard from './ScheduleCard';
import { format, compareAsc, addDays } from 'date-fns';
import scheduleCompStyles from './ScheduleCompStyles';
import { useIsFocused } from '@react-navigation/native';
import { useConfirmedSchedulesAPI } from '../../apiHooks/schedule/useConfirmedSchedules';
import NoSchedule from './NoSchedule';
import { fetchPaginatedSchedules, fetchSchedules } from '../../apiHooks/schedule/functions';


const ScheduleList = () => {
  const [today, setToday] = useState(new Date());
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [scheduleList, setScheduleList] = useState<any[] | null>();
  const [schedules, setSchedules] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(addDays(new Date(), 3));
  const styles = scheduleCompStyles(colors);



  const isFocused = useIsFocused();
  const { get, abort } = useConfirmedSchedulesAPI();



  let QUERY = {
    recordsPerPage: 20,
    pageNumber: 1,
    isActive: true,
    sortDirection: 'asc',
    beginStartDt: new Date(),
    endStartDt: addDays(new Date(), 3),
  };


  useEffect(() => {
    fetchSchedules(QUERY,setSchedules,  setLoading, loadScheduleData, get);
  }, []);


  

  const loadScheduleData = (sdata: object[]) => {
    let list: any = {};
    if(sdata.length === 0 || !Array.isArray(sdata)) return;
    console.log('number of scheduless... ', sdata.length || 0);

    for (let i = 0; i < sdata.length; i++) {
      let rawDate = new Date(sdata[i].startDt);
      let currentDate = format(rawDate, 'MMM dd');
      if (!list[currentDate]) {
        list[currentDate] = {
          title: rawDate,
          data: [],
        };
      }
      list[currentDate].data.push(sdata[i]);
    }
    setRefreshing(false);
    setScheduleList(list);
  };


  useEffect(() => {
    const timerId = setInterval(() => {
      setToday(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const renderFooter = () => {
    return loading ? (
      <View style={{ paddingTop: 20 }}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;
  };

  return (
    <View style={{ flex: 1, paddingBottom: 100 }}>
      {scheduleList ? (
        <SectionList
          sections={Object.values(scheduleList)}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ScheduleCard obj={item} />}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchSchedules(QUERY,setSchedules,  setLoading, loadScheduleData, get)
              }
              tintColor="gray"
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchPaginatedSchedules(loading, setLoading, addDays, setStart, end, setEnd, pageNumber, get, loadScheduleData,setPageNumber,schedules)}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <View style={styles.sectionTitleContainer}>
                <View>
                  <Text
                    variant="titleSmall"
                    style={{
                      ...styles.dateOptions,
                    }}>
                    {format(title, 'MMM dd')}{' '}
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
      ) : <NoSchedule />}
      {renderFooter()}
    </View>
  );
};

export default ScheduleList;
