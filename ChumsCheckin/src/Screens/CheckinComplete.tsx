import React from 'react'
import { View, Text, NativeModules } from 'react-native'
import { Container } from 'native-base'
import { WebView } from "react-native-webview"
import { Header } from './Components'
import ViewShot, { captureRef } from "react-native-view-shot";
import { screenNavigationProps, CachedData, ApiHelper, LabelHelper, Styles } from "../Helpers"
import { CommonActions } from '@react-navigation/native';

interface Props { navigation: screenNavigationProps; }

export const CheckinComplete = (props: Props) => {
    const shotRef = React.useRef(null);
    const [html, setHtml] = React.useState("");


    const loadData = () => {
        const promises: Promise<any>[] = [];
        promises.push(checkin());
        if (CachedData.printerReady) promises.push(print());
        const action = CommonActions.reset({ index: 0, routes: [{ name: 'Lookup' }] });
        Promise.all(promises).then(() => {
            CachedData.existingVisits = [];
            CachedData.pendingVisits = [];
            props.navigation.dispatch(action);
        });
    }

    const print = async () => {
        return LabelHelper.getAllLabels().then(async (htmlLabels) => {
            console.log(htmlLabels.length);
            if (htmlLabels.length > 0) await printBitmaps(htmlLabels);
        });
    }

    const printBitmaps = async (htmlLabels: string[]) => {
        for (let i = 0; i < htmlLabels.length; i++) {
            const html = htmlLabels[i];
            await printBitmap(html)
        }
    }

    const printBitmap = async (html: string) => {
        setHtml(html);
        await timeout(1000);
        const result = await captureRef(shotRef, { format: "jpg", quality: 1 });
        NativeModules.PrinterHelper.printUris(result);
    }

    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const checkin = async () => {
        const url = "/visits/checkin?serviceId=" + CachedData.serviceId + "&householdId=" + CachedData.householdId;
        return ApiHelper.apiPost(url, CachedData.pendingVisits).then(data => {
            props.navigation.navigate("CheckinComplete")
        });
    }

    React.useEffect(loadData, []);

    return (
        <Container>
            <Header />
            <View style={[Styles.mainContainer]}>
                <Text style={Styles.H1}>Checkin Complete.</Text>
                <Text style={Styles.H1}>Printing</Text>
                <View style={{ flex: 1, }}>
                    <ViewShot ref={shotRef} style={Styles.viewShot} >
                        <WebView source={{ html: html }} style={Styles.webView} />
                    </ViewShot>
                </View>
            </View>
        </Container>
    )

}