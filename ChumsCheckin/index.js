/**
 * @format
 */
import {BaseimageUrl,ApiRoot,AccessApiRoot} from '@env'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

window.ApiRoot = ApiRoot
window.AccessApiRoot = AccessApiRoot
window.BaseImageUrl= BaseimageUrl

 console.log("image",BaseimageUrl)
 console.log("image",ApiRoot)
 console.log("image",AccessApiRoot)
AppRegistry.registerComponent(appName, () => App);
