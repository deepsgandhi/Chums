import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Container } from 'native-base'
import styles from '../myStyles'
import Ripple from 'react-native-material-ripple';
import { lightGrayColor } from '../Constant';
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native';
import Header from './Components/Header'
import { screenNavigationProps, CachedData, VisitInterface } from "../Helpers"
import { MemberList } from './Components/MemberList';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Household'>;
interface Props { navigation: screenNavigationProps; route: ProfileScreenRouteProp; }

export const Household = (props: Props) => {

    const [pendingVisits, setPendingVisits] = React.useState<VisitInterface[]>([]);

    const init = () => {
        props.navigation.addListener('focus', () => { setPendingVisits([...CachedData.pendingVisits]); });
    }

    const checkin = () => {
        props.navigation.navigate("CheckinComplete");
    }

    React.useEffect(init, []);

    return (
        <Container>
            <View style={styles.guestListMainContainer}>
                <Header />
                <TouchableOpacity style={styles.addGuestButton} onPress={() => { props.navigation.navigate("AddGuest") }}>
                    <Text style={styles.addGuestButtonText}>ADD GUEST</Text>
                </TouchableOpacity>
                <MemberList navigation={props.navigation} pendingVisits={pendingVisits} />
                <Ripple style={[styles.checkingButton]} rippleColor={lightGrayColor} onPress={() => checkin()}>
                    <Text style={styles.checkingButtonText}>CHECKIN</Text>
                </Ripple>
            </View>
        </Container>
    )

}