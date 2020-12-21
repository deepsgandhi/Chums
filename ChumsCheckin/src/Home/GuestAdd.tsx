import React from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import * as Utility from '../Utility';
import styles from '../myStyles';
import * as constant from '../Constant'
import Header from '../Component/Header'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native';


type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'GuestAdd'>;



interface Props {

    navigation: Utility.screenNavigationProps;
    route: ProfileScreenRouteProp;

}

interface Props {
    navigation: Utility.screenNavigationProps
}

interface State {

    firstName: string,
    lastName: string,
}
export default class GuestAdd extends React.Component<Props, State>{

    constructor(props: any) {
        super(props),
            this.state = {
                firstName: '',
                lastName: ''
            }
    }

    addGuest() {

        if (this.state.firstName === '') {
            Utility.snackBar("Please enter first name")
        }
        else if (this.state.lastName === '') {
            Utility.snackBar("Please enter last name")
        }
        else {
           

            let arrParm = [{
                householdId: this.props.route.params.householdId,
                name: { display: this.state.firstName + " " + this.state.lastName, first: this.state.firstName, last: this.state.lastName }
            }]

            console.log(JSON.stringify(arrParm))
            Utility.addGuestApi("people", arrParm).then((res) => {
                console.log("res", res)
                this.props.navigation.navigate("GuestList",
                    {
                        houseHoldId: 632,
                        serviceDetail: '',
                        visitSession: '',
                        eventName: 'update',

                        id: this.props.route.params.id,
                    })
            })
        }
    }

    cancelGuest() {

        this.props.navigation.goBack()

    }
    render() {
        return (
            <Container>
                <Content>
                    <View style={{ height: constant.deviceHeight * 97.8 / 100, backgroundColor: constant.ghostWhite }}>
                        <Header />
                        <Text style={styles.guestAddText}>First Name</Text>
                        <TextInput
                            placeholder="First"
                            onChangeText={(value) => { this.setState({ firstName: value }) }}
                            style={styles.guestAddinput}
                        />
                        <Text style={styles.guestAddText}>Last Name</Text>
                        <TextInput
                            placeholder="Last"
                            onChangeText={(value) => { this.setState({ lastName: value }) }}
                            style={styles.guestAddinput}
                        />
                        <View style={styles.guestAddButtonView}>
                            <TouchableOpacity
                                style={[styles.guestAddButton, { backgroundColor: constant.yellowColor }]}
                                onPress={() => { this.cancelGuest() }}
                            >
                                <Text style={styles.guestAddButtonText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.guestAddButton, { backgroundColor: constant.greenColor }]}
                                onPress={() => { this.addGuest() }}
                            >
                                <Text style={styles.guestAddButtonText}>ADD</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Content>
            </Container>
        )
    }
}