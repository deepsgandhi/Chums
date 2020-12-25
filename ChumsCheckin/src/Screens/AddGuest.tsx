import React from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import styles from '../myStyles';
import * as constant from '../Constant'
import Header from './Components/Header'
import { ApiHelper, Utilities, screenNavigationProps, CachedData } from "../Helpers";


interface Props { navigation: screenNavigationProps }


export const AddGuest = (props: Props) => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");


    const addGuest = () => {
        if (firstName === '') Utilities.snackBar("Please enter first name")
        else if (lastName === '') Utilities.snackBar("Please enter last name")
        else {
            let arrParm = [{
                householdId: CachedData.householdId,
                name: { display: firstName + " " + lastName, first: firstName, last: lastName }
            }];

            ApiHelper.addGuestApi("/people", arrParm).then((res) => {
                props.navigation.navigate("Household");
                /*
                this.props.navigation.navigate("Household",
                    {
                        houseHoldId: 632,
                        serviceDetail: '',
                        visitSession: '',
                        eventName: 'update',

                        id: this.props.route.params.id,
                    })*/
            })
        }
    }

    const cancelGuest = () => { props.navigation.goBack() }


    return (
        <Container>
            <Content>
                <View style={{ height: constant.deviceHeight * 97.8 / 100, backgroundColor: constant.ghostWhite }}>
                    <Header />
                    <Text style={styles.guestAddText}>First Name</Text>
                    <TextInput placeholder="First" onChangeText={(value) => { setFirstName(value) }} style={styles.guestAddinput} />
                    <Text style={styles.guestAddText}>Last Name</Text>
                    <TextInput placeholder="Last" onChangeText={(value) => { setLastName(value) }} style={styles.guestAddinput} />
                    <View style={styles.guestAddButtonView}>
                        <TouchableOpacity style={[styles.guestAddButton, { backgroundColor: constant.yellowColor }]} onPress={cancelGuest} >
                            <Text style={styles.guestAddButtonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.guestAddButton, { backgroundColor: constant.greenColor }]} onPress={addGuest} >
                            <Text style={styles.guestAddButtonText}>ADD</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Content>
        </Container>
    )

}