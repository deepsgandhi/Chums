import React from 'react'
import { View, Image, StatusBar, Text, NativeModules, TouchableOpacity, NativeEventEmitter, EventSubscription } from 'react-native'
import styles from '../../myStyles'

const Header = () => {
    const [status, setStatus] = React.useState("");
    var eventEmitter: NativeEventEmitter;

    const handleClick = () => {
        NativeModules.PrinterHelper.configure();
    }

    const receiveNativeStatus = (receivedStatus: string) => {
        setStatus(receivedStatus);
    }

    const init = () => {
        NativeModules.PrinterHelper.bind(receiveNativeStatus);

        eventEmitter = new NativeEventEmitter(NativeModules.PrinterHelper);
        eventEmitter.addListener('StatusUpdated', (event) => { setStatus(event.status); });
    }

    React.useEffect(init, []);


    console.log(status);
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