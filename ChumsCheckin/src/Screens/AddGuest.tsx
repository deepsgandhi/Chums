import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Container, Content } from 'native-base'
import Ripple from 'react-native-material-ripple';
import { Header } from './Components'
import { ApiHelper, Utilities, screenNavigationProps, CachedData, Styles, StyleConstants, PersonInterface } from "../Helpers";

interface Props { navigation: screenNavigationProps }

export const AddGuest = (props: Props) => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    const addGuest = () => {
        if (firstName === '') Utilities.snackBar("Please enter first name")
        else if (lastName === '') Utilities.snackBar("Please enter last name")
        else getOrCreatePerson(firstName, lastName).then(person => {
            CachedData.householdMembers.push(person);
            props.navigation.navigate("Household");
        });
    }

    const getOrCreatePerson = async (firstName: string, lastName: string) => {
        const fullName = firstName + " " + lastName;
        var person: PersonInterface | null = await searchForGuest(fullName);
        if (person === null) {
            person = {
                householdId: CachedData.householdId,
                name: { display: fullName, first: firstName, last: lastName }
            };
            const data = await ApiHelper.apiPost("/people", [person]);
            person.id = data[0].id;
        }
        return person;
    }

    const searchForGuest = async (fullName: string) => {
        var result: PersonInterface | null = null;
        const url = "/people/search?term=" + escape(fullName);
        var people: PersonInterface[] = await ApiHelper.apiGet(url);;
        people.forEach(p => { if (p.membershipStatus !== "Member") result = p; });
        return (result === undefined) ? null : result;
    }

    const cancelGuest = () => { props.navigation.goBack() }

    return (
        <Container>
            <Header />
            <View style={Styles.mainContainer}>
                <Content>
                    <Text style={Styles.label}>First Name</Text>
                    <TextInput placeholder="First" onChangeText={(value) => { setFirstName(value) }} style={Styles.textInput} />
                    <Text style={Styles.label}>Last Name</Text>
                    <TextInput placeholder="Last" onChangeText={(value) => { setLastName(value) }} style={Styles.textInput} />
                </Content>
            </View>
            <View style={Styles.blockButtons}>
                <Ripple style={[Styles.blockButton, { backgroundColor: StyleConstants.yellowColor }]} onPress={cancelGuest} ><Text style={Styles.blockButtonText}>CANCEL</Text></Ripple>
                <Ripple style={[Styles.blockButton, { backgroundColor: StyleConstants.greenColor }]} onPress={addGuest} ><Text style={Styles.blockButtonText}>ADD</Text></Ripple>
            </View>
        </Container >
    )
}