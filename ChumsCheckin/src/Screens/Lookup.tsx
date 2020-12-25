import React from 'react'
import { TextInput, View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { Container, Content } from 'native-base'
import styles from '../myStyles'
import Header from './Components/Header'
import Ripple from 'react-native-material-ripple'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native';
import { EnvironmentHelper, ApiHelper, Utilities, screenNavigationProps, PersonInterface, CachedData } from "../Helpers";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Lookup'>;
interface Props { navigation: screenNavigationProps; route: ProfileScreenRouteProp; }

export const Lookup = (props: Props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [people, setPeople] = React.useState([]);
    const [phone, setPhone] = React.useState("");

    const selectPerson = (person: PersonInterface) => {
        setIsLoading(true);
        CachedData.householdId = person.householdId || 0;
        let promises: Promise<any>[] = [];
        promises.push(loadHouseholdMembers());
        promises.push(loadExistingVisits());
        Promise.all(promises).then(() => {
            setIsLoading(false);
            props.navigation.navigate("Household")
        });
    }

    const loadHouseholdMembers = async () => {
        return ApiHelper.apiGet('/people/household/' + CachedData.householdId).then(data => { CachedData.householdMembers = data });
    }

    const loadExistingVisits = async () => {
        ApiHelper.apiGet('/visits/checkin?serviceId=' + CachedData.serviceId + '&householdId=' + CachedData.householdId + '&include=visitSessions').then(data => {
            CachedData.existingVisits = [...data];
            CachedData.pendingVisits = [...data];
        });
    }


    const handleSearch = () => {
        if (phone === '') Utilities.snackBar("Please enter phone number")
        else {
            ApiHelper.apiGet('/people/search/phone?number=' + phone).then(data => {
                setIsLoading(false);
                if (data.length == 0) Utilities.snackBar("Record not found")
                else if (data !== 'error') setPeople(data)
                else Utilities.snackBar("Something went wrong")
            });
        }
    }

    const getRow = (data: any) => {
        const person: PersonInterface = data.item;
        return (
            <Ripple style={styles.flatlistMainView} onPress={() => { selectPerson(person) }} >
                <Image source={{ uri: EnvironmentHelper.ImageBaseUrl + person.photo }} style={styles.personPhoto} resizeMode="contain" />
                <Text style={[styles.personName, { marginLeft: '7%' }]}>{person.name.display}</Text>
            </Ripple>
        )
    }

    const getResults = () => {
        return (<Content contentContainerStyle={{ flex: (!isLoading) ? 1 : 0 }}>
            <View style={{ marginTop: '3%' }}>
                <FlatList data={people} renderItem={getRow} />
            </View>
        </Content>);
    }

    return (
        <Container>
            <Header />
            <View style={styles.mainContainer}>
                <Text style={styles.H1}>Search by phone number:</Text>
                <View style={styles.searchView} >
                    <TextInput placeholder='Enter mobile no' onChangeText={(value) => { setPhone(value) }} keyboardType="numeric" style={styles.searchTextInput} />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch} >
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>
                {getResults()}
            </View>
        </Container>
    )
}