import React from 'react'
import { View, Text, } from 'react-native'
import { Container } from 'native-base'
import styles from '../myStyles'
import Header from '../Component/Header'

export default class DetailSearch extends React.Component {

    render() {

        return (
            <Container>

                <View style={styles.searchMainContainer}>
                    <Header />
                    <Text style={styles.checkingText}>Checkin Complete.</Text>
                </View>

            </Container>
        )
    }


}