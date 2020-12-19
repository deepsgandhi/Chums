import React from 'react'
import { View, Text, TouchableOpacity, NativeModules } from 'react-native'
import { Container } from 'native-base'
import styles from '../myStyles'
import Header from '../Component/Header'

export default class DetailSearch extends React.Component {


    print() {
        NativeModules.PrinterHelper.init()

    }

    render() {

        return (
            <Container>

                <View style={styles.searchMainContainer}>
                    <Header />
                    <Text style={styles.checkingText}>Checkin Complete.</Text>
                    <View style={styles.printView}>
                        <TouchableOpacity style={styles.printButton} onPress={() => { this.print() }}>
                            <Text style={styles.buttonPrintText}>Print</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Container>
        )
    }


}