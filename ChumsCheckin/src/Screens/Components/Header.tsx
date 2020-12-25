import React from 'react'
import { View, Image, StatusBar, Text, NativeModules, TouchableOpacity } from 'react-native'
import styles from '../../myStyles'

const Header = () => {

    const status = NativeModules.PrinterHelper.Status;

    const handleClick = () => {
        NativeModules.PrinterHelper.configure();
    }

    return (
        <View style={styles.headerImageView}>
            <StatusBar backgroundColor="#08A1CD"></StatusBar>
            <TouchableOpacity style={styles.printerStatus} onPress={() => { handleClick() }} >
                <Text style={{ backgroundColor: "#09A1CD", color: "#FFF" }} >{status} - Configure Printer</Text>
            </TouchableOpacity>
            <Image source={require('../../Images/logo1.png')} style={styles.headerImage} resizeMode="contain" />
        </View>
    )
}
export default Header