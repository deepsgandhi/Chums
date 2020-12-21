import React from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import { Container, Icon } from 'native-base'
import styles from '../myStyles'
import Ripple from 'react-native-material-ripple';
import * as Utility from '../Utility';
import { lightGrayColor } from '../Constant';
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native';
import * as constant from '../Constant'
import Header from '../Component/Header'

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'GuestList'>;



interface Props {

    navigation: Utility.screenNavigationProps;
    route: ProfileScreenRouteProp;

}


interface State {
    isLoading?: boolean,
    dataList: any,
    event: number,
    eventDetail: any,
    houseHoldId: any,
    serviceId: any,
    visitSession: any,
    newarray: any,
    sendArray: any,
    eventList: any,

}
export default class GuestList extends React.Component<Props, State>{
    constructor(Props: any) {
        super(Props),
            this.state = {
                isLoading: false,
                dataList: [],
                event: 0,
                houseHoldId: this.props.route.params.houseHoldId,
                eventDetail: this.props.route.params.serviceDetail,
                serviceId: this.props.route.params.serviceDetail[0].serviceId,
                visitSession: [],
                newarray: [],
                sendArray: [],
                eventList: [],
            }
        //  console.log("paramdetails",JSON.stringify(this.props.route.params.serviceDetail[0].groups))
        //  console.log("paramdetails",this.props.route.params.serviceDetail[0].serviceId)
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', () => {
            // console.log(this.props.route.params.listIndex)
            // console.log("state",this.state.sendArray)
            if (this.props.route.params.visitSession != '') {
                if (this.props.route.params.eventName == 'NONE') {

                    let addevent = this.state.newarray.findIndex((item: any) => {

                        return (item.personId == this.props.route.params.id)
                    })

                    if (this.state.newarray[addevent].visitSessions.length != 0) {
                        let addValue = this.state.newarray[addevent].visitSessions.findIndex((item: any) => {

                            return (item.session.serviceTimeId == this.props.route.params.visitSession.serviceTimeId)
                        })
                        if (addValue != -1) {

                            let arr = this.state.newarray[addevent].visitSessions

                            arr.splice(addValue, addValue + 1)

                            this.state.newarray[addevent].visitSessions = arr

                            this.setState({ newarray: this.state.newarray })
                        }
                    }




                } else {
                    console.log("passid", this.props.route.params.id)
                    let addevent = this.state.newarray.findIndex((item: any) => {
                        console.log("id", item.personId)
                        return (item.personId == this.props.route.params.id)
                    })
                    console.log("index", addevent)
                    if (this.state.newarray[addevent].visitSessions.length == 0) {
                        this.state.newarray[addevent].visitSessions.push({ session: this.props.route.params.visitSession })
                        this.setState({ newarray: this.state.newarray })
                    }
                    else {

                        let addValue = this.state.newarray[addevent].visitSessions.findIndex((item: any) => {

                            return (item.session.serviceTimeId == this.props.route.params.visitSession.serviceTimeId)
                        })

                        if (addValue != -1) {
                            this.state.newarray[addevent].visitSessions[addValue] = ({ session: this.props.route.params.visitSession })
                        }
                        else {
                            this.state.newarray[addevent].visitSessions.push({ session: this.props.route.params.visitSession })
                        }
                        console.log("newstate", this.state.newarray)
                        this.setState({ newarray: this.state.newarray })
                    }

                }
            }

            if (this.props.route.params.eventName == 'update') {
                this.GuestList()
            }
        });

        this.GuestList()

    }

    GuestList() {
        this.setState({ isLoading: false })
        Utility.getSearchDetail('people/household/', this.state.houseHoldId).then((response) => {
            if (response !== 'error') {

                this.setState({ dataList: response })
                this.eventList()

            }
            else {
                Utility.snackBar("Somethings went wrong")

            }
        })
    }

    eventList() {
     
        Utility.getApi('visits/checkin?serviceId=' + this.state.serviceId + '&householdId=' + this.state.houseHoldId + '&include=visitSessions', this.state.houseHoldId).then((response) => {
            if (response !== 'error') {

                this.setState({ eventList: response })
                this.sendArray()

            }
            else {
                Utility.snackBar("Somethings went wrong")

            }
        })
    }


    sendArray() {

        let newarray: any = []
        this.state.dataList.map((item: any, index: any) => {

            let newValue = this.state.eventList.findIndex((value: any) => {
            
                return (item.id == value.personId)

            })
          
            if (newValue != -1) {
                let visitArray: any = []
                this.state.eventList[newValue].visitSessions.map((item: any, indx: any) => {
                    visitArray[indx] = {
                        session: {
                            groupId: item.session.groupId,
                            serviceTimeId: item.session.serviceTimeId,
                        }
                    }

                })
                newarray[index] =
                {
                    personId: item.id,
                    serviceId: this.state.serviceId,
                    visitSessions: visitArray
                }


            }
            else {

                newarray[index] =
                {
                    personId: item.id,
                    serviceId: this.state.serviceId,
                    visitSessions: []
                }


            }


        })


   
        this.setState({ newarray: newarray, isLoading: true })
    }


    eventGuest(value: any) {
       
        if (this.state.event == value) {
            this.setState({ event: 0 })
        }
        else {
            this.setState({ event: value })
        }

    }

    checkin() {

        fetch(window.ApiRoot + "visits/checkin?serviceId=" + this.state.serviceId + "&householdId=" + this.state.houseHoldId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + global.userKey,
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.newarray)
        })

            .then((resjson) => {
                if (resjson.ok == true) {
                    this.props.navigation.navigate("CheckingComplete")
                }
                else {
                    Utility.snackBar("Somethings went wrong")
                }
                
            })
            .catch((error) => {
                // console.error(error);
                // return('error')
            });


    }


    event(id: any) {

        console.log("newarray", this.state.newarray)
        let newValue = this.state.newarray.findIndex((value: any) => {

            return (value.personId == id)

        })

        if (this.state.newarray[newValue].visitSessions.length == 0) {
            return (<Text>none</Text>)
        }
        else {
            this.state.newarray[newValue].visitSessions.map
        }


    }


    selectEvent(value: any, id: any) {


        let newValue = this.state.newarray.findIndex((value: any) => {

            return (value.personId == id)

        })
        
        if (this.state.newarray[newValue].visitSessions.length == 0) {
            return ('NONE')

            
        }
        else {

            let eventname = ''
            let count = 0
            this.state.newarray[newValue].visitSessions.map((item: any, index: any) => {

                let eventid = item.session.groupId
             
                let newevent = value.findIndex((value: any) => {
                    return (value.id == eventid)
                })
             
                if (newevent != -1) {
                   
                    count = count + 1
                    eventname = value[newevent].name

                }
                if (index == this.state.newarray[newValue].visitSessions.length - 1) {
                    if (count == 0) {
                        eventname = 'NONE'
                    }
                }
   
            })
            return (eventname)


        }


    }


    showEvent(key: any) {

        let neweventName: any = []
        let newobject = this.state.newarray.findIndex((item: any) => {
            return (item.personId == key)
        })
        if (this.state.newarray[newobject].visitSessions.length == 0) {
            return (neweventName)
        }
        else {

            this.state.newarray[newobject].visitSessions.map((val: any) => {

                let newEvent = this.state.eventDetail.findIndex((value: any) => {
                    return (val.session.serviceTimeId == value.id)
                })
                let newgroupname = this.state.eventDetail[newEvent].groups.find((groupvalue: any) => {

                    return (val.session.groupId == groupvalue.id)
                })

                neweventName.push(this.state.eventDetail[newEvent].name + "-" + newgroupname.name)

            })
            return (neweventName)
        }


    }
    render() {

        return (
            <Container>

                <View style={styles.guestListMainContainer}>
                    <Header />
                    <TouchableOpacity style={styles.addGuestButton} onPress={() => { this.props.navigation.navigate("GuestAdd", { householdId: this.props.route.params.houseHoldId, id: this.props.route.params.id }) }}>
                        <Text style={styles.addGuestButtonText}>
                            ADD GUEST
            </Text>
                    </TouchableOpacity>

                    {
                        (this.state.isLoading) ?
                            <FlatList
                                style={styles.guestListStyle}
                                data={this.state.dataList}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View>
                                            <Ripple style={styles.flatlistMainView} onPress={() => { this.eventGuest(item.id) }}  >
                                                <Icon name={(this.state.event === item.id) ? 'up' : 'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                                                <Image source={{ uri: window.BaseImageUrl + item.photo }} style={styles.dataImage} resizeMode="contain" />
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '5%' }} >
                                                    <Text style={[styles.dataText, { alignSelf: 'center' }]}>{item.name.display}</Text>

                                                    {

                                                        (this.state.event != item.id) ?
                                                            (this.showEvent(item.id).length == 0) ?
                                                                <Text>none</Text>
                                                                :
                                                                this.showEvent(item.id).map((values: any) => {
                                                                    return (
                                                                        <Text style={{ color: constant.greenColor }}>{values}</Text>
                                                                    )
                                                                })

                                                            :
                                                            null
                                                    }


                                                </View>

                                            </Ripple>





                                            {
                                                (this.state.event == item.id) ?

                                                    <View>
                                                        {
                                                            this.state.eventDetail.map((value: any, indx: any) =>

                                                                <View style={styles.hideView}>

                                                                    <Text style={styles.guestListText}>{value.name}</Text>
                                                                    <Ripple style={[styles.guestListButton, { backgroundColor: this.selectEvent(value.groups, item.id) == 'NONE' ? constant.blueColor : constant.greenColor }]} onPress={() => { this.props.navigation.navigate("ActivityGroup", { eventGroup: value.groups, serviceId: value.id, id: item.id }) }} >


                                                                        {
                                                                            <Text style={{ color: constant.whiteColor }}>{this.selectEvent(value.groups, item.id)}</Text>
                                                                        }
                                                                    </Ripple>


                                                                </View>


                                                            )}

                                                    </View>
                                                    :
                                                    null
                                            }


                                        </View>
                                    )
                                }}

                            />


                            :

                            <ActivityIndicator
                                size="large"
                                color={constant.baseColor1}

                                style={{ marginTop: '25%' }}
                            />

                    }

                    <Ripple style={[styles.checkingButton]} rippleColor={lightGrayColor}
                        onPress={() => this.checkin()}>
                        <Text style={styles.checkingButtonText}>
                            CHECKIN
            </Text>
                    </Ripple>
                </View>


            </Container>
        )
    }
}