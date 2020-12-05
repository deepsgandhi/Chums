import React from 'react'
import {View,Image,StatusBar} from 'react-native'
import styles from '../myStyles'

const Header=()=>{

    return(
        <View style={styles.loginImageView}>
            <StatusBar backgroundColor="#08A1CD"></StatusBar>
        <Image source={require('../Images/logo1.png')} style={styles.loginImage} resizeMode="contain"/>
        </View>
    )
}
export default Header