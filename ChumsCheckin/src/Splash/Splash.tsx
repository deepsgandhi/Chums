import React from 'react'
import {
    Image, View
 } from 'react-native'
import styles from '../myStyles'
import { Container } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {CommonActions } from '@react-navigation/native';
import * as Utility from '../Utility';


declare global{
    var  userKey:any
    var ApiRoot:any
    var AccessApiRoot:any
    var BaseImageUrl:any
  
}

type Props = {
  navigation: Utility.screenNavigationProps;
};

export default class Splash extends React.Component<Props> {
   
       componentDidMount=async()=>{
            
            setTimeout(()=>{  
               
                 this.access()  
        
                }, 1000);  
        }

        access=async()=>{
            
            await AsyncStorage.multiGet(['@Login','@UserData'])
            .then(response=>{
            var data = response[0][1]
             global.userKey = response[1][1]===null?[]:JSON.parse(response[1][1])
            this.props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name: (data)?'ActivityServices':'Login'}]
              
              }))
           })
           
          
        }

    render() {
    
        return (
            <Container>
                <View style={styles.splashMaincontainer}>
                   
                    <Image source={require('../Images/logo1.png')} style={styles.loginImage} resizeMode="contain" />

                </View>
            </Container>
        )
    }
}