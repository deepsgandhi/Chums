
import Snackbar from 'react-native-snackbar'
import * as constant from './Constant'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../App'
export type screenNavigationProps = StackNavigationProp<RootStackParamList,"Login">


export const snackBar = (message:string) => {

    Snackbar.show({
      text: message,
      backgroundColor: constant.baseColor,
      duration: Snackbar.LENGTH_SHORT,
  
    });
  
  }

export const login = (apiName:string,value:object) => {
    // console.log(value)   
    return fetch(window.AccessApiRoot+apiName, {
    
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
      fetch(window.ApiRoot+apiName+param,{
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
      fetch(window.ApiRoot+apiName+apiParm,{
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
      fetch(window.ApiRoot+"servicetimes?serviceId="+serviceId+"&include=groups",{
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
    }))
    }
   

    export const addGuestApi = (apiName:string,apiParm:any) => {
console.log("apiParm",apiParm)
      return fetch(window.ApiRoot+apiName, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer "+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2h1cmNoSWQiOjEsImFwcE5hbWUiOiJDSFVNUyIsInBlcm1pc3Npb25zIjpbIkFkbWluX19FZGl0IFNldHRpbmdzIiwiQWRtaW5fX0ltcG9ydCIsIkF0dGVuZGFuY2VfX0VkaXQiLCJBdHRlbmRhbmNlX19WaWV3IiwiQXR0ZW5kYW5jZV9fVmlldyBTdW1tYXJ5IiwiRG9uYXRpb25zX19FZGl0IiwiRG9uYXRpb25zX19WaWV3IiwiRG9uYXRpb25zX19WaWV3IFN1bW1hcnkiLCJGb3Jtc19fRWRpdCIsIkZvcm1zX19WaWV3IiwiR3JvdXAgTWVtYmVyc19fRWRpdCIsIkdyb3VwIE1lbWJlcnNfX1ZpZXciLCJHcm91cHNfX0VkaXQiLCJHcm91cHNfX1ZpZXciLCJIb3VzZWhvbGRzX19FZGl0IiwiUGVvcGxlX19FZGl0IiwiUGVvcGxlX19FZGl0IE5vdGVzIiwiUGVvcGxlX19WaWV3IE5vdGVzIiwiUm9sZU1lbWJlcnNfX0VkaXQiLCJSb2xlTWVtYmVyc19fVmlldyIsIlJvbGVQZXJtaXNzaW9uc19fRWRpdCIsIlJvbGVQZXJtaXNzaW9uc19fVmlldyIsIlJvbGVzX19FZGl0IiwiUm9sZXNfX1ZpZXciLCJTZXJ2aWNlc19fRWRpdCIsIlNpdGVfX0FkbWluIl0sImlhdCI6MTYwNzY4NDgxMywiZXhwIjoxNjA3ODU3NjEzfQ.FWIKcfBcOolT0MnLOI_Iex_TwbLUjAw7R8gA0sGl0WA',
            'Accept' :'application/json'
          },
          body: JSON.stringify(apiParm)
        }).then((response) => response.json())
          .then((resjson) => {
           return resjson
       })
          .catch((error) => {
          console.error(error);
          return('error')
          });
       }
