import { Image, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { hth } from '../../constants/size';
import { useTranslation } from 'react-i18next';
import { useTheme, Text } from 'react-native-paper';
import jobsCompStyles from './JobsCompStyles';
import { formatDateDifference } from '../../utils/dateUtil';
import { RBC, RBC2 } from '../../utils/colorUtil'
import { AddIcon } from './addIconComp';
import format from 'date-fns/format';
const JobCard = ({ data }: any) => {
//console.log('job data passed ', data)
  const { colors } = useTheme();
  const styles = jobsCompStyles(colors);
  const { t } = useTranslation();
  let startDate = new Date(data.scheduleStartDt);
  let endDate = new Date(data.scheduleEndDt);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const timeDiff = formatDateDifference(startDate, endDate);
  return (
    <View
      style={{
        ...styles.card,
      }}>
      <View style={{ ...styles.jobRow }}>
        <View>
          <View
            style={{
              ...styles.containerView
            }}>
            <Image source={require('../../assets/images/rect.png')} style={{ tintColor: RBC2(data.centerName) }} />
            <Text> </Text>

            <Text
              style={{
                ...styles.centerName
              }}>
              {data.centerName}
            </Text>
            <TouchableHighlight
              style={{ ...styles.language }}
              underlayColor="#fff">
              <Text style={{ ...styles.languageText }}>{t('EN')}</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ ...styles.dolls }}>
          <TouchableHighlight underlayColor="#fff">
            <Text style={{ ...styles.dollsText }}>{t('+$2')}</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View
        style={{
          ...styles.cardView
        }}>
        <Text
          variant="bodyMedium"
          style={{
            ...styles.cardTime,
            
          }}>
          {format(startDate, 'KK:mm aaa')} {'-'}{' '}
          {format(endDate, 'KK:mm aaa')}
        </Text>
        <Text
          style={{
            ...styles.timer,
          }}>
          {timeDiff}
        </Text>
      </View>
      <AddIcon data={data} />
    </View>
  );
};

export default JobCard;
