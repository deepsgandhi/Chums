import React from 'react'
import { View, Text } from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../../myStyles'
import { CachedData, PersonInterface, screenNavigationProps, ServiceTimeInterface, VisitHelper, VisitSessionHelper, VisitSessionInterface, VisitInterface } from "../../Helpers";
import * as constant from '../../Constant'


interface Props { person: PersonInterface, selectedMemberId: number, navigation: screenNavigationProps, pendingVisits: VisitInterface[] }

export const MemberServiceTimes = (props: Props) => {

    const handleServiceTimeClick = (serviceTime: ServiceTimeInterface, person: PersonInterface) => {
        props.navigation.navigate("SelectGroup", { personId: person.id || 0, serviceTime: serviceTime })
    }

    const getExpandedRows = (person: PersonInterface, visitSessions: VisitSessionInterface[]) => {
        const result: JSX.Element[] = [];
        CachedData.serviceTimes.forEach(st => {
            var buttonStyle = { backgroundColor: constant.blueColor };
            var selectedGroupName = "NONE";

            const stSessions = VisitSessionHelper.getByServiceTimeId(visitSessions, st.id || 0);
            if (stSessions.length > 0) {
                selectedGroupName = stSessions[0].session?.displayName || "";
                buttonStyle = { backgroundColor: constant.greenColor };
            }

            result.push(<View style={styles.expandedRow}>
                <Text style={styles.serviceTimeText}>{st.name}</Text>
                <Ripple style={[styles.serviceTimeButton, buttonStyle]} onPress={() => { handleServiceTimeClick(st, person) }} >
                    <Text style={styles.serviceTimeButtonText}>{selectedGroupName}</Text>
                </Ripple>
            </View>);
        });
        return result;
    }

    if (props.selectedMemberId !== props.person.id) return null;
    else {
        const visit = VisitHelper.getByPersonId(props.pendingVisits, props.person.id);
        const visitSessions = visit?.visitSessions || [];
        return (<View>{getExpandedRows(props.person, visitSessions)}</View>);
    }
}