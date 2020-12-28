import React from 'react'
import { View, Text, NativeModules } from 'react-native'
import { Container } from 'native-base'
import { CommonActions } from '@react-navigation/native';
import { WebView } from "react-native-webview"
import Ripple from 'react-native-material-ripple';
import { Header } from './Components'
import { screenNavigationProps, CachedData, Utilities, ApiHelper, LabelHelper, Styles } from "../Helpers"

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
            <View style={Styles.mainContainer}>
                <Text style={Styles.H1}>Checkin Complete.</Text>

                <Ripple style={Styles.bigButton} onPress={() => { print() }}>
                    <Text style={Styles.bigButtonText}>Print</Text>
                </Ripple>
                <WebView source={{ html: html }} style={[Styles.webView]} />
            </View>
        </Container>
    )
}