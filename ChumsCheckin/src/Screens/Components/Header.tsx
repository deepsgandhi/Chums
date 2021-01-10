import React from 'react'
import { View, Image, StatusBar, Text, NativeModules, NativeEventEmitter } from 'react-native'
import Ripple from 'react-native-material-ripple';
import { CachedData, Styles } from '../../Helpers'

export const Header = () => {
    const [status, setStatus] = React.useState("");
    var eventEmitter: NativeEventEmitter;

    const handleClick = () => { NativeModules.PrinterHelper.configure(); }
    const receiveNativeStatus = (receivedStatus: string) => { setStatus(receivedStatus); }

    const init = () => {
        NativeModules.PrinterHelper.bind(receiveNativeStatus);
        eventEmitter = new NativeEventEmitter(NativeModules.PrinterHelper);
        eventEmitter.addListener('StatusUpdated', (event) => {
            if (event.status.indexOf("ready") > -1) CachedData.printerReady = true;
            setStatus(event.status);
        });
    }

    React.useEffect(init, []);

    return (
        <View style={Styles.headerImageView}>
            <StatusBar backgroundColor="#08A1CD"></StatusBar>
            <Ripple style={Styles.printerStatus} onPress={() => { handleClick() }} >
                <Text style={{ backgroundColor: "#09A1CD", color: "#FFF" }} >{status} - Configure Printer</Text>
            </Ripple>
            <Image source={require('../../Images/logo1.png')} style={Styles.headerImage} resizeMode="contain" />
        </View>
    )
}
