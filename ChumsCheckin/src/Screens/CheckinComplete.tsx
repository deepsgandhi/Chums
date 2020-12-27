import React from 'react'
import { View, Text, TouchableOpacity, NativeModules } from 'react-native'
import { Container } from 'native-base'
import styles from '../myStyles'
import Header from './Components/Header'
import { screenNavigationProps, CachedData, Utilities, ApiHelper } from "../Helpers"
import { CommonActions } from '@react-navigation/native';
import { WebView } from "react-native-webview"
import { LabelHelper } from '../Helpers/LabelHelper'

//type ProfileScreenRouteProp = RouteProp<RootStackParamList, "CheckinComplete">;
interface Props { navigation: screenNavigationProps; }


export const CheckinComplete = (props: Props) => {

    const [html, setHtml] = React.useState("Hello world");

    const loadData = () => {
        LabelHelper.getAllLabels().then(labels => {
            if (labels.length > 0) setHtml(labels[0]);
        });
    }

    const print = () => {
        NativeModules.PrinterHelper.init();
        //NativeModules.PrinterHelper.configure();
        checkin();
        props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Lookup" }] }));
    }


    const checkin = () => {
        ApiHelper.apiPost("/visits/checkin?serviceId=" + CachedData.serviceId + "&householdId=" + CachedData.householdId, CachedData.pendingVisits).then(data => {
            if (data !== "error") props.navigation.navigate("CheckinComplete")
            else Utilities.snackBar("Something went wrong")
        }).catch((error) => {
            // console.error(error);
            // return('error')
            setHtml("error");
        });
    }

    React.useEffect(loadData, []);

    return (
        <Container>
            <Header />
            <View style={styles.mainContainer}>

                <Text style={styles.checkingText}>Checkin Complete.</Text>
                <View style={styles.printView}>
                    <TouchableOpacity style={styles.printButton} onPress={() => { print() }}>
                        <Text style={styles.buttonPrintText}>Print</Text>
                    </TouchableOpacity>
                </View>
                <WebView source={{ html: html }} style={[styles.webView]} />
            </View>

        </Container>
    )


}