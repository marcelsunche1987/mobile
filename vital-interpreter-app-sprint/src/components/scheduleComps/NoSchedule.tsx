import { useTheme, Text, Card } from 'react-native-paper';
import React from 'react'; 
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import scheduleCompStyles from './ScheduleCompStyles'; 
import { ScrollView } from 'react-native-gesture-handler';
const NoSchedule = (props: any) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = scheduleCompStyles(colors);

  return (
    <ScrollView>
    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
      <View style={{ ...styles.imageView }}>
        <Image
          source={require('../../assets/images/scheduleImage.png')}
          style={{...styles.noScheduleImg}}
        />
      </View>
      </View>
     
      <View style={{ ...styles.titleRow }}>
        <Text style={{ ...styles.titleText }}>
          {t('There are no confirmed jobs scheduled')}
        </Text>
      </View>
      
      <View style={{ ...styles.titleRow }}>
        <Text style={{ ...styles.subtitleText }}>
        {t('You can request jobs by clicking')}
          {'\n'} {t('`Jobs` in the navigation below.')} 
        </Text>
      </View>
      <View style={{height:300}}></View>
    </ScrollView>
  );
};

export default NoSchedule;
