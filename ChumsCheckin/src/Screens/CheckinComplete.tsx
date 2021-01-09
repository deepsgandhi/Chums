import React from 'react'
import { View, Text, NativeModules, Modal, Image } from 'react-native'
import { Container, Icon } from 'native-base'
import { CommonActions } from '@react-navigation/native';
import { WebView } from "react-native-webview"
import Ripple from 'react-native-material-ripple';
import { Header } from './Components'
import ViewShot, { captureRef } from "react-native-view-shot";
import { screenNavigationProps, CachedData, Utilities, ApiHelper, LabelHelper, Styles, StyleConstants } from "../Helpers"

interface Props { navigation: screenNavigationProps; }



export const CheckinComplete = (props: Props) => {

    const shotRef = React.useRef(null);
    var [printImageUri, setPrintImageUri] = React.useState('')
    const [modelVisible, setModelVisible] = React.useState(false)
    const [html, setHtml] = React.useState("Hello world,how are you");

    const loadData = () => {
        LabelHelper.getAllLabels().then(labels => {
            if (labels.length > 0) setHtml(labels[0]);
        });
    }

    const print = () => {
        NativeModules.PrinterHelper.init();
        //NativeModules.PrinterHelper.configure();
        checkin();
        captureRef(shotRef, { format: "jpg", quality: 1 }).then(uri => {
            console.log(uri);
            NativeModules.PrinterHelper.printUri(uri);


        })
        // props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Lookup" }] }));
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

    const goBack = () => {
        props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Lookup" }] }));
        setModelVisible(false)
    }
    /*
    const onCapture = () => {
        captureRef(shotRef, { format: "jpg", quality: 1 })
            .then((uri) => { setPrintImageUri(uri); setModelVisible(true) })
            .catch((err) => { Utilities.snackBar("Something went wrong") })

    }*/

    React.useEffect(loadData, []);

    return (
        <Container>
            <Header />

            <View style={[Styles.mainContainer]}>
                <Text style={Styles.H1}>Checkin Complete.</Text>

                <Ripple style={Styles.bigButton} onPress={() => { print() }}>
                    <Text style={Styles.bigButtonText}>Print</Text>
                </Ripple>



                <View style={{ flex: 1, }}>

                    <ViewShot ref={shotRef} style={Styles.viewShot} >
                        <WebView source={{ html: html }} style={[Styles.webView, { backgroundColor: "#00FF00" }]} />
                    </ViewShot>
                </View>


                <Modal visible={modelVisible}  >

                    <View style={Styles.modelView}>
                        <Icon name="arrowleft" type="AntDesign" onPress={goBack} style={Styles.backIcon} />
                        {
                            (printImageUri !== '') ? <Image source={{ uri: printImageUri }} style={Styles.printImage} resizeMode="cover" /> : null
                        }
                    </View>


                </Modal>
            </View>

        </Container>
    )
}