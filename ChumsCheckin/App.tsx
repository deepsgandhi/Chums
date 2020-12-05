import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Splash from './src/Splash/Splash'
import Login from './src/Login/Login'
import ActivityLookup from './src/Home/ActivityLookup'
import ActivityServices from './src/Home/ActivityServices'
import GuestAdd from './src/Home/GuestAdd'
import CheckingComplete from './src/Home/CheckinComplete'
import ActivityGroup from './src/Home/ActivityGroup'


import GuestList from './src/Home/GuestList' 
// const stack= createStackNavigator()
export type RootStackParamList = {
    Login: undefined,
    Splash: undefined,
    ActivityLookup:{serviceId:number},
    ActivityServices: undefined,
    GuestAdd:undefined,
    GuestList:{houseHoldId:number,serviceDetail:any},
    CheckingComplete :undefined,
    ActivityGroup:{eventGroup:any},
  
}

const stack = createStackNavigator<RootStackParamList>();
const createNavigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator
                screenOptions={
                    {
                        headerShown: false
                    }
                }
            >
                <stack.Screen name='Splash' component={Splash} />
                <stack.Screen name='Login' component={Login} />
                <stack.Screen name='ActivityLookup' component={ActivityLookup} />
                <stack.Screen name='ActivityServices' component={ActivityServices} />
                <stack.Screen name='GuestAdd' component={GuestAdd} />
                <stack.Screen name='GuestList' component={GuestList} />
                <stack.Screen name='CheckingComplete' component={CheckingComplete} />
                <stack.Screen name='ActivityGroup' component={ActivityGroup} />
               
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default createNavigation