import React from 'react'
import { View,Text,FlatList } from  'react-native'
import {Container, Icon} from 'native-base'
import styles from '../myStyles'
import Ripple from 'react-native-material-ripple';
import * as Utility from '../Utility';
import { darkColor } from '../Constant';
import {RootStackParamList} from '../../App'
import { RouteProp } from '@react-navigation/native';
import Header from '../Component/Header'


type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ActivityGroup'>;

interface Props {

     navigation: Utility.screenNavigationProps;
     route: ProfileScreenRouteProp;

  }
interface State {
    isLoading?: boolean,
    dataList:any,
    event?:number,
  
}
export default class GuestList extends React.Component<Props,State>{
    constructor(Props:any){
        super(Props),
        this.state={
            isLoading:false,
            dataList:this.props.route.params.eventGroup,
            event:0,
        }
    }

  

    eventGuest(value:number){
        if(this.state.event == value)
        {
            this.setState({event:0})
        }
        else{
            this.setState({event:value})
        }

    }
    render() {
    
        return (
            <Container>
            
                <View style={styles.guestListMainContainer}>
                <Header/>
       
                <FlatList
                           style={{marginTop:'3%'}}
                        data={this.state.dataList}
                        renderItem={({item,index})=>{
                            return(
                                <View>
                                <Ripple style={styles.ActivityGroupRipple} onPress={(index)=>{this.eventGuest(item.id)}}  >
                                    <Icon name={(this.state.event===item.id)?'up':'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                                  
                                    <Text style={[styles.activityText]}>{item.categoryName}</Text>
                                 
                        
                                   
                                   
                                </Ripple>
                            {
                                (this.state.event== item.id )?
                            <View>
                                <Ripple style={styles.ActivityGroupRipple}>
                                   
                            <Text style={[styles.activityText,{marginLeft:'10%'}]}>{item.name}</Text>
                         
                           </Ripple>
                                  
                                    </View>
                                    
                                    :
                                   null   
                        }
                                </View>
                            )
                        }}
                         />


        <Ripple style={styles.noneButton} rippleColor={darkColor} onPress={()=>{this.props.navigation.goBack()}}>
            <Text style={styles.checkingButtonText}>
              NONE
            </Text>
        </Ripple>
            </View>
            
         
            </Container>
        )}
}