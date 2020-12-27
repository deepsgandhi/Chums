import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { CheckinComplete } from './src/Screens/CheckinComplete'
import { Splash, Lookup, Services, Login, Household, SelectGroup, AddGuest } from './src/Screens'
import { ServiceTimeInterface } from './src/Helpers'

// const stack= createStackNavigator()
export type RootStackParamList = {
    Login: undefined,
    Splash: undefined,
    Lookup: undefined,
    Services: undefined,
    AddGuest: undefined,
    Household: undefined, //{ houseHoldId: number, visitSession: any, eventName: any, id: any }
    CheckinComplete: undefined,
    SelectGroup: { serviceTime: ServiceTimeInterface, personId: number },
}





const stack = createStackNavigator<RootStackParamList>();
const createNavigation = () => {

    return (
        <NavigationContainer>
            <stack.Navigator screenOptions={{ headerShown: false }} >
                <stack.Screen name='Splash' component={Splash} />
                <stack.Screen name='Login' component={Login} />
                <stack.Screen name='Services' component={Services} />
                <stack.Screen name='Lookup' component={Lookup} />
                <stack.Screen name='Household' component={Household} />
                <stack.Screen name='AddGuest' component={AddGuest} />
                <stack.Screen name='CheckinComplete' component={CheckinComplete} />
                <stack.Screen name='SelectGroup' component={SelectGroup} />
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default createNavigation