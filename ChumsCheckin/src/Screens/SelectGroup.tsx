import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Container, Icon } from 'native-base'
import styles from '../myStyles'
import Ripple from 'react-native-material-ripple';
import { darkColor } from '../Constant';
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native';
import Header from './Components/Header'
import { screenNavigationProps, VisitHelper, VisitSessionHelper, CachedData } from "../Helpers"


type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'SelectGroup'>;

interface Props { navigation: screenNavigationProps; route: ProfileScreenRouteProp; }

export const SelectGroup = (props: Props) => {
    const [event, setEvent] = React.useState(-1);
    const [groupTree, setGroupTree] = React.useState<any[]>([]);

    const loadData = () => {
        var category = ''
        var gt = [...groupTree];

        props.route.params.serviceTime?.groups?.map((item: any, i: number) => {
            if (item.categoryName != category) {
                category = item.categoryName
                gt.push({ key: gt.length, name: category, SubCategory: [{ subName: item.name, groupId: item.id }] })
            }
            else gt[gt.length - 1].SubCategory.push({ subName: item.name, groupId: item.id })
        });
        console.log(gt.length);
        setGroupTree(gt);
    }

    React.useEffect(loadData, []);

    const eventGuest = (value: number) => {
        if (event == value) setEvent(-1);
        else setEvent(value);
    }


    const backScreen = (id: number, name: string) => {
        const personId = props.route.params.personId;
        var visit = VisitHelper.getByPersonId(CachedData.pendingVisits, personId);
        if (visit === null) {
            visit = { personId: personId, serviceId: CachedData.serviceId, visitSessions: [] };
            CachedData.pendingVisits.push(visit);
        }
        const vs = visit?.visitSessions || [];
        const serviceTimeId = props.route.params.serviceTime.id || 0;
        VisitSessionHelper.setValue(vs, serviceTimeId, id, name);
        props.navigation.goBack()
    }


    const getRow = (data: any) => {
        const item: any = data.item;
        return (
            <View>
                <Ripple style={styles.ActivityGroupRipple} onPress={(index) => { eventGuest(item.key) }}  >
                    <Icon name={(event === item.key) ? 'up' : 'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                    <Text style={[styles.activityText]}>{item.name}</Text>
                </Ripple>
                { getExpanded(event, item)}
            </View>
        )
    }

    const getExpanded = (event: any, item: any) => {
        if (event !== item.key) return null;
        else {
            return (
                item.SubCategory.map((item: any) =>
                    <View>
                        <Ripple style={styles.ActivityGroupRipple} onPress={() => backScreen(item.groupId, item.subName)}>
                            <Text style={[styles.activityText, { marginLeft: '10%' }]}>{item.subName}</Text>
                        </Ripple>
                    </View>
                ));
        }
    }


    return (
        <Container>
            <View style={styles.guestListMainContainer}>
                <Header />
                <FlatList style={{ marginTop: '3%' }} data={groupTree} renderItem={getRow} />
                <Ripple style={styles.noneButton} rippleColor={darkColor} onPress={() => backScreen(0, "NONE")}>
                    <Text style={styles.checkingButtonText}>NONE</Text>
                </Ripple>
            </View>
        </Container>
    )

}