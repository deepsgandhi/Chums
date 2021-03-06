import React from 'react'
import { View, Text } from 'react-native'
import { Container } from 'native-base'
import Ripple from 'react-native-material-ripple';
import { RouteProp } from '@react-navigation/native';
import { ScreenList } from './ScreenList'
import { Header, MemberList } from './Components'
import { screenNavigationProps, CachedData, VisitInterface, Styles } from "../Helpers"

type ProfileScreenRouteProp = RouteProp<ScreenList, 'Household'>;
interface Props { navigation: screenNavigationProps; route: ProfileScreenRouteProp; }

export const Household = (props: Props) => {
    const [pendingVisits, setPendingVisits] = React.useState<VisitInterface[]>([]);
    const init = () => { props.navigation.addListener('focus', () => { setPendingVisits([...CachedData.pendingVisits]); }); }
    const checkin = () => { props.navigation.navigate("CheckinComplete"); }
    const handleAddGuest = () => { props.navigation.navigate("AddGuest"); }

    React.useEffect(init, []);

    return (
        <Container>
            <View style={Styles.fullWidthContainer}>
                <Header />
                <View style={[Styles.blockButtons, { marginBottom: "3%" }]}>
                    <Ripple style={Styles.blockButton} onPress={handleAddGuest}><Text style={Styles.blockButtonText}>ADD GUEST</Text></Ripple>
                </View>
                <MemberList navigation={props.navigation} pendingVisits={pendingVisits} />
                <View style={[Styles.blockButtons]}>
                    <Ripple style={[Styles.blockButton]} onPress={checkin}><Text style={Styles.blockButtonText}>CHECKIN</Text></Ripple>
                </View>
            </View>
        </Container>
    )
}