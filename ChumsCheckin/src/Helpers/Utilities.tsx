
import Snackbar from 'react-native-snackbar'
import * as constant from '../Constant'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../App'


export type screenNavigationProps = StackNavigationProp<RootStackParamList, "Login">

export class Utilities {
  public static snackBar(message: string) {
    Snackbar.show({
      text: message,
      backgroundColor: constant.baseColor,
      duration: Snackbar.LENGTH_SHORT,

    });
  }

  public static getById(list: any[], id: number): any {
    var result = null;
    list.forEach(item => { if (item.id === id) result = item; });
    return result;
  }

}


