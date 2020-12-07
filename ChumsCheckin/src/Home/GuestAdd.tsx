import React from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base'
import * as Utility from '../Utility';
import styles from '../myStyles';
import * as constant from '../Constant'
import Header from '../Component/Header'


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

addGuest(){

    // if(this.state.firstName===''){
    //     Utility.snackBar("Please enter first name")
    // }
    // else if(this.state.lastName===''){
    //     Utility.snackBar("Please enter last name")
    // }
    // else{
        Utility.getApi('people/search?term=',this.state.firstName+" "+this.state.lastName).then((res)=>{
            console.log("res"+res.length)

        })
    // }
}

cancelGuest(){

}
    render() {
        return (
            <Container>
                <Content>
                    <View style={{ height: constant.deviceHeight*97.8/100, backgroundColor: constant.ghostWhite }}>
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
                            onPress={()=>{this.cancelGuest()}}
                            >
                                <Text style={styles.guestAddButtonText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={[styles.guestAddButton, { backgroundColor: constant.greenColor }]}
                            onPress={()=>{this.addGuest()}}
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