import {
  addDays,
  addYears,
  setHours,
  getHours,
  getMinutes,
  setMinutes,
  format,
} from 'date-fns';

export const getFormattedDate = (date: Date): string => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return month + '/' + day + '/' + year;
};

export const isEndOfDST = (startDate: Date) => {
  // DST ends the 1st Sunday in November (between Nov 1-13).  Account for endDate falling on Nov 1
  if (
    (startDate?.getMonth() === 10 || startDate?.getMonth() === 9) &&
    (startDate?.getDay() < 14 || startDate?.getDay() > 29)
  )
    return true;
  return false;
};

export const isStartOfDST = (startDate: Date) => {
  // DST starts on the 2nd Sunday in March ( between March 7 - 14
  if (
    startDate.getMonth() === 2 &&
    startDate.getDay() > 6 &&
    startDate.getDay() < 15
  )
    return true;
  return false;
};

export const combineDateTime = (rawDate: Date, rawTime: Date) => {
  const hours = getHours(rawTime);
  const minutes = getMinutes(rawTime);
  const dateHours = setHours(rawDate, hours);
  return setMinutes(dateHours, minutes);
};

export const getDateToday = () => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
};

export const getPastDate = async (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const yearsInFuture = (years = 0) => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return addYears(today, years);
};

export const getDate6WeeksFromToday = () => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return addDays(today, 6 * 7);
};

export const getDateXDaysFromToday = (days: number) => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return addDays(today, days);
};

export const getTimeLengthLabel = (hours: number, minutes: number) => {
  const hourString = hours + (hours === 1 ? ' HR ' : ' HRS ');
  const minutesString = minutes + ' MINS';

  return (hours ? hourString : '') + (minutes ? minutesString : '');
};

export const convertHourDecToString = (hour: number) => {
  return hour
    ? Math.floor(hour) +
        ' Hr(s) ' +
        Math.floor((hour - Math.floor(hour)) * 60) +
        ' Mins'
    : '--';
};

export const convertDateToString = (
  date: Date | undefined,
  timeZoneCode?: string,
) => {
  const string = date
    ? date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    : '--:--';
  return timeZoneCode ? string + ' ' + timeZoneCode : string;
};

type dayFormatType = 'short' | 'long';

export const LONG_DAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const SHORT_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const convertDayToString = (day: number, dayFormat?: dayFormatType) => {
  if (day < 0 || day > 6) return '';
  return dayFormat === 'long' ? LONG_DAY[day] : SHORT_DAY[day];
};

export const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getMonthByIndex(index: number) {
  return MONTHS[index];
}

export function formatDateForAPI(date: Date | string) {
  return format(new Date(date), 'M/d/y');
}

export function formatDateTimeForAPI(date: Date | string) {
  return format(new Date(date), 'M/d/y HH:mm:ss');
}

export function formatTimeForAPI(date: Date | string) {
  return format(new Date(date), 'HH:mm:ss');
}

export function formatShortTime(date: Date | string | number | undefined) {
  if (date) return format(new Date(date), 'hh:mm aa');
}

export function formatNormalDate(date: Date | string | number | undefined) {
  if (date) return format(new Date(date), 'MMMM dd, yyyy');
}

export function stdTimezoneOffset(date: Date | string) {
  const dateObj = new Date(date);
  var jan = new Date(dateObj.getFullYear(), 0, 1);
  var jul = new Date(dateObj.getFullYear(), 6, 1);

  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

export function isDST(date: Date | string) {
  const dateObj = new Date(date);

  return dateObj.getTimezoneOffset() < stdTimezoneOffset(dateObj);
}

export const getPlaceHolder = (): string => {
  const currentLanguage: string | null = localStorage.getItem('i18nextLng');
  if (currentLanguage) {
    if (currentLanguage === 'en') return 'MM/DD/YYYY';
    else if (currentLanguage === 'spa') return 'DD/MM/YYYY';
  }
  return 'MM/DD/YYYY';
};

export const formatDateDifference = (start: Date, end: Date) => {
  // console.log('start and end supplied ', start, ' ', end);
  const diffDate = end.getTime() - start.getTime();
  let timediff = msToTime(diffDate);
  return timediff;
};
export const formatDateDifferenceToNumber = (start: Date, end: Date) => {
  // console.log('start and end supplied ', start, ' ', end);
  const diffDate = end.getTime() - start.getTime();
  let timediff = msToTime(diffDate);
  return parseInt(timediff);
};
export const msToTime = (duration: number) => {
  let milliseconds = Math.floor((duration % 1000) / 100);
  let seconds: number | string = Math.floor((duration / 1000) % 60);
  let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
  let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = hours == 0 ? '' : hours + 'h';
  minutes = minutes < 10 ? '0' + minutes : minutes;
  minutes = minutes == '00' ? '' : minutes + 'm';
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return hours + ' ' + minutes;
};
// eslint-disable-next-line import/no-anonymous-default-export
export function hasScheduleStarted(start: Date, end: Date) {
  //if (date) return format(new Date(date), 'MMMM dd, yyyy');
  //check if the date is today
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  let isToday = false;
  let hasStarted = false;
  let hasEnded = false;
  let today = new Date();
  const todaysDate = format(new Date(), 'MMMM dd, yyyy');
  let startDate = format(new Date(start), 'MMMM dd, yyyy');
  let startTime = start.getTime();
  let endTime = end.getTime();
  if (todaysDate == startDate) {
    isToday = true;
  }
  if (today.getTime() >= startTime) {
    hasStarted = true;
  }
  if (today.getTime() > endTime) {
    hasEnded = true;
  }
  //console.log('isToday ', isToday, ' hasStarted ', hasStarted, ' hasEnded ', hasEnded);
  if (isToday && hasStarted && !hasEnded) {
    // if (isToday ) {
    return true;
  } else {
    return false;
  }
}
export const isToday = (start: Date) => { 
  const todaysDate = format(new Date(), 'MMMM dd, yyyy');
  let startDate = format(new Date(start), 'MMMM dd, yyyy'); 
  if (todaysDate == startDate) {
    return true;
  } else return false;
};
export default {
  convertDateToString,
  convertHourDecToString,
  combineDateTime,
  getDateToday,
  getPastDate,
  getDate6WeeksFromToday,
  getTimeLengthLabel,
  yearsInFuture,
};
