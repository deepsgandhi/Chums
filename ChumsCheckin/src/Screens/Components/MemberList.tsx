import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import Ripple from 'react-native-material-ripple';
import { Icon } from 'native-base'
import styles from '../../myStyles'
import { CachedData, EnvironmentHelper, PersonInterface, screenNavigationProps, ServiceTimeInterface, Utilities, VisitHelper, VisitInterface, VisitSessionInterface } from "../../Helpers";
import * as constant from '../../Constant'
import { MemberServiceTimes } from './MemberServiceTimes';

interface Props { navigation: screenNavigationProps, pendingVisits: VisitInterface[] }

export const MemberList = (props: Props) => {

    const [selectedMemberId, setSelectedMemberId] = React.useState(0);

    const getCondensedGroupList = (person: PersonInterface) => {
        if (selectedMemberId == person.id) return null;
        else {
            const visit = VisitHelper.getByPersonId(props.pendingVisits, person.id || 0);
            if (visit?.visitSessions?.length === 0) return (null);
            else {
                return (visit?.visitSessions?.map((vs: VisitSessionInterface) => {
                    var name: string = vs.session?.displayName || "none";
                    const st: ServiceTimeInterface | null = Utilities.getById(CachedData.serviceTimes, vs.session?.serviceTimeId || 0);
                    if (st != null) name = (st.name || "") + " - " + name;
                    return (<Text style={{ color: constant.greenColor }}>{name}</Text>);
                }));
            }
        }
    }

    const handleMemberClick = (id: number) => {
        if (selectedMemberId === id) setSelectedMemberId(0);
        else setSelectedMemberId(id);
    }

    const getMemberRow = (data: any) => {
        const person: PersonInterface = data.item;
        return (
            <View>
                <Ripple style={styles.flatlistMainView} onPress={() => { handleMemberClick(person.id || 0) }}  >
                    <Icon name={(selectedMemberId === person.id) ? 'up' : 'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                    <Image source={{ uri: EnvironmentHelper.ImageBaseUrl + person.photo }} style={styles.personPhoto} resizeMode="contain" />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '5%' }} >
                        <Text style={[styles.personName, { alignSelf: 'center' }]}>{person.name.display}</Text>
                        {getCondensedGroupList(person)}
                    </View>
                </Ripple>
                <MemberServiceTimes person={person} navigation={props.navigation} selectedMemberId={selectedMemberId} key={person.id?.toString()} pendingVisits={props.pendingVisits} />
            </View>
        )
    }

    return (<FlatList style={styles.expandableList} data={CachedData.householdMembers} renderItem={getMemberRow} />)
}