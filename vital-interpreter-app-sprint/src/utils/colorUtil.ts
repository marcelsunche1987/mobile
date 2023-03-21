 import { hasScheduleStarted } from "./dateUtil";
 //retrieve left border color function
  export const RBC = (title: string) => {
    if (title.includes('VRS')){ 
      return '#609BF0';
    }
    else if (title.includes('VRI')) {
      return '#FFCF87';
    }else{
      return '#F39BDF';
    }
  };
  export const RBC2 = (title: string) => {
  
      return '#609BF0';
     
  };
//retrieve active schedule background color function
  export const RAC = (title: string, start: Date, end: Date) => {
    if ( !hasScheduleStarted(start, end)){ 
      return  '#080F13';
    }
    else if (title.includes('VRS') && hasScheduleStarted(start, end)){ 
      return 'rgba(96, 155, 240, 0.05);';
    }
    else if (title.includes('VRI') && hasScheduleStarted(start, end)) {
      return '#FFCF87';
    }else{
      return '#F39BDF';
    }
  };