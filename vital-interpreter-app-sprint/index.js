/**
 * @format
 */

import i18n from './src/localization/init';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

i18n.init();
AppRegistry.registerComponent(appName, () => App);
