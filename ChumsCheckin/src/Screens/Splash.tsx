import React from 'react'
import { Image, View } from 'react-native'
import styles from '../myStyles'
import { Container } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import { screenNavigationProps, ApiHelper } from "../Helpers";

type Props = { navigation: screenNavigationProps; };

export const Splash = (props: Props) => {

    const loadData = () => { setTimeout(access, 1000); }

    const access = async () => {
        await AsyncStorage.multiGet(['@Login', '@UserData']).then(response => {
            var data = response[0][1]
            ApiHelper.amJwt = response[1][1] === null ? [] : JSON.parse(response[1][1]);
            ApiHelper.jwt = ApiHelper.amJwt;
            const screen = (data) ? "Services" : "Login";
            //const screen = "Login";
            props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: screen }] }));
        });
    }

    React.useEffect(loadData, []);

    return (
        <Container>
            <View style={styles.splashMaincontainer}>
                <Image source={require('../Images/logo1.png')} style={styles.headerImage} resizeMode="contain" />
            </View>
        </Container>
    )

}