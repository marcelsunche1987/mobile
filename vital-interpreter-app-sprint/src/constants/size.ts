import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const wth = (percent : number)=>{
    return percent /100 * width
}

export const hth = (percent : number)=>{
    return percent /100 * height
}

