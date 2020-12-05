
import Snackbar from 'react-native-snackbar'
import * as constant from './Constant'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../App'
export const BaseimageUrl='https://app.staging.chums.org'
export type screenNavigationProps = StackNavigationProp<RootStackParamList,"Login">
const AccessApiRoot='https://api.staging.livecs.org/users/'
const ApiRoot = "https://api.staging.chums.org/"

export const snackBar = (message:string) => {

    Snackbar.show({
      text: message,
      backgroundColor: constant.baseColor,
      duration: Snackbar.LENGTH_SHORT,
  
    });
  
  }

export const login = (apiName:string,value:object) => {
    // console.log(value)   
    return fetch(AccessApiRoot+apiName, {
    
        method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
    
        .then((response) => response.json())
    
        .then((resjson) => {
          // console.log(resjson)
          return resjson
     }
    
        )
        .catch((error) => {
          console.error(error);
        return('error')
        });
    
      
    }
     export const getApi=(apiName:string,param:string)=>{
  
     return(
      fetch(ApiRoot+apiName+param,{
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ global.userKey,
        'Accept' :'application/json'
        },
      }).then((response) => response.json()).then((resjson) => {
       
        return resjson;
    }).catch((error) => {
        console.error(error);
        return('error')
    })
      )
    }

    export const getSearchDetail=(apiName:string,apiParm:number)=>{
  

      return(
      fetch(ApiRoot+apiName+apiParm,{
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ global.userKey,
        'Accept' :'application/json'
        },
      }).then((response) => response.json()).then((resjson) => {
       
        return resjson;
    }).catch((error) => {
        console.error(error);
        return('error')
    })
      )
    }
    export const getActivity=(serviceId:number)=>{
  

      return(
      fetch(ApiRoot+"servicetimes?serviceId="+serviceId+"&include=groups",{
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ global.userKey,
        'Accept' :'application/json'
        },
      }).then((response) => response.json()).then((resjson) => {
       
        return resjson;
    }).catch((error) => {
        console.error(error);
        return('error')
    })
      )
    }