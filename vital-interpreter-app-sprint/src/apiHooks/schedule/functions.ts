import { Platform } from "react-native";
import { useConfirmedSchedulesAPI } from "./useConfirmedSchedules";



export async function fetchSchedules(query: any,setSchedules:any, setLoading: any, loadScheduleData: any, get: any){
  setLoading(true);
    const result = await get(query);
    console.log('started length ', result.schedules.length)
    setLoading(false)
    if (result && !result.error) {
      setSchedules(result.schedules)
      loadScheduleData(result.schedules);
    } else {
      console.log('fetchSchedules error: ', result);
    }
    
}

export async function fetchPaginatedSchedules(loading:boolean, setLoading:any, addDays:any, setStart:any,end:any,setEnd:any,pageNumber:number,get:any, loadScheduleData:any,setPageNumber:any, schedules:any){
  if (loading) return;

  try {
    setLoading(true);
    let newstart = addDays(new Date(end), 1);
    let newend = addDays(new Date(end), 4);
    // console.log('newstart... ', newstart, ' newend ', newend, 'pageNumber ', pageNumber, 'Query ', QUERY);
    setStart(newstart);
    setEnd(newend);

    const query: Object = {
      recordsPerPage: 20,
      isActive: true,
      sortDirection: 'asc',
      pageNumber: pageNumber + 1,
      beginStartDt: newstart,
      endStartDt: newend,
    };

    // console.log('Quarry ', query)
    const result = await get({
      ...query,
      pageNumber: pageNumber + 1,
      beginStartDt: newstart,
      endStartDt: newend,
    });

    if (result && !result.error) {
      if(result.schedules.length === 0) return;
      loadScheduleData([...schedules, ...result.schedules]);
      setPageNumber(pageNumber + 1);
    }
  } catch (err) {
    console.log('error fetching more data...', err)
  }
  setLoading(false);
};


export async function fetchJobs(loading:boolean, setLoading:any, setErrorMsg:any,getPerms:any, availStart:any, availEnd:any,setStart:any, setEnd:any, getJobs:any,setJobsData:any,loadJobsData:any,setRefreshing:any){
  if (loading) return;
  setErrorMsg('');
  setLoading(true);
  const data = await getPerms();
  //Get the currrent time and make it a string, without the Z
  const datetime = new Date();
  const now = datetime.toISOString().replace('Z', '');

  //Get 30 days ahead  time without the Z
  const Sevendays = datetime.getTime() + 7 * 24 * 60 * 60 * 1000;
  const SEVEN = new Date(Sevendays);
  const SEVEN_DAYS = SEVEN.toISOString().replace('Z', '');
  availStart = now;
  availEnd = SEVEN_DAYS;
  setStart(now);
  setEnd(SEVEN_DAYS);
  console.log('Fetching...')

  if (Platform.OS == 'android') {
    console.log('jobs date is date ', now, 'SEVEN_DAYS ', SEVEN_DAYS);
  }
  const query: Object = {
    userId: data?.userId || '',
    ShowOnlyPremiums: false,
    availableStartDt: now,
    availableEndDt: SEVEN_DAYS,
    centerId: data.primaryCenterId,
    queueId: data.preferredQueueId,
    //  centerId:  91,
    // queueId:  1,
  };
  const result = await getJobs(query);
  if (result && !result.error) {
    setJobsData(result);
    loadJobsData(result);
    setErrorMsg('');
  } else {
    console.log('error: ', result);
    setErrorMsg(result.error);
  }
  if (result) setLoading(false);
  setRefreshing(false);
  // console.log('user results ', result);
};

export async function fetchJobsPagination(loading:boolean, setLoading:any, setErrorMsg:any,getPerms:any, availStart:any, availEnd:any, getJobs:any,loadJobsData:any, end:any, jobsData:any){
  if (loading) return;
  setErrorMsg('');
  try {
    setLoading(true);
    const data = await getPerms();
    let nextDay: Date | number | string = new Date(end);
    nextDay = nextDay.getTime() + 1 * 24 * 60 * 60 * 1000;
    let NEXT_DAY = new Date(nextDay);
    nextDay = NEXT_DAY.toISOString().replace('Z', '');

    //Get 7 days ahead  time without the Z
    let next_seven_days: Date | number | string = new Date(end);
    let sevendays = next_seven_days.getTime() + 7 * 24 * 60 * 60 * 1000;
    let SEVEN = new Date(sevendays);
    let NEXT_SEVEN_DAYS = SEVEN.toISOString().replace('Z', '');
    availStart = nextDay;
    availEnd = NEXT_SEVEN_DAYS;

    const query: Object = {
      userId: data?.userId || '',
      ShowOnlyPremiums: false,
      availableStartDt: nextDay,
      availableEndDt: NEXT_SEVEN_DAYS,
      centerId: data.primaryCenterId,
      queueId: data.preferredQueueId,
      //  centerId:  91,
      // queueId:  1,
    };
    const result = await getJobs(query);
    if (result && !result.error) {
      // setJobsData([...jobsData, ...result]);
      console.log('Tass')
      if (result.length == 0) {
        setErrorMsg('No more data...');
      } else {
        loadJobsData([...jobsData, ...result]);
      }
    } else {
      console.log('error: ', result);
      setErrorMsg(result.error);
    }
    // if (result) setLoading(false);
  } catch (error) {
    console.log('Error is ', error);
  }
  setLoading(false);
};
