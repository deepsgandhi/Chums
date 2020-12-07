/**
 * @format
 */
import config from 'react-native-dotenv'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.log("image",config.BaseimageUrl)
AppRegistry.registerComponent(appName, () => App);
