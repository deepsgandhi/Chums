import React from 'react'
import { View,Text,TouchableOpacity,Image,FlatList,ActivityIndicator } from  'react-native'
import {Container, Icon} from 'native-base'
import styles from '../myStyles'
import Ripple from 'react-native-material-ripple';
import * as Utility from '../Utility';
import { lightGrayColor } from '../Constant';
import {RootStackParamList} from '../../App'
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
    dataList:any,
    event:number,
    eventDetail:any,
  
}
export default class GuestList extends React.Component<Props,State>{
    constructor(Props:any){
        super(Props),
        this.state={
            isLoading:false,
            dataList:[],
            event:0,
            eventDetail:this.props.route.params.serviceDetail
        }
    }

    componentDidMount(){
    
        Utility.getSearchDetail('people/household/',this.props.route.params.houseHoldId).then((response)=>{
         if(response!=='error'){
  this.setState({dataList:response,isLoading:true})

            }
            else{
                Utility.snackBar("Somethings went wrong")
 
            }   
        })
    }

    eventGuest(value:any){
       
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
        <TouchableOpacity style={styles.addGuestButton} onPress={()=>{this.props.navigation.navigate("GuestAdd")}}>
            <Text style={styles.addGuestButtonText}>
                ADD GUEST
            </Text>
        </TouchableOpacity>

        {
                        (this.state.isLoading)?
                        <FlatList
style={styles.guestListStyle}
                        data={this.state.dataList}
                        renderItem={({item})=>{
                            return(
                                <View>
                                <Ripple style={styles.flatlistMainView} onPress={()=>{this.eventGuest(item.id)}}  >
                                    <Icon name={(this.state.event===item.id)?'up':'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                                    <Image source={{uri:Utility.BaseimageUrl+item.photo}} style={styles.dataImage} resizeMode="contain" />
                                    <View >
                                    <Text style={[styles.dataText,{alignSelf:'center'}]}>{item.name.display}</Text>
                                    <Text style={styles.dataText2}>none</Text>
                        
                                    </View>
                                   
                                </Ripple>
                            {
                                (this.state.event == item.id)?
                            
                            <View>
                                 {
                                this.state.eventDetail.map((item:any)=>
                                
                                     <View style={styles.hideView}>
                                   
                                <Text style={styles.guestListText}>{item.name}</Text>
                                   <Ripple style={styles.guestListButton} onPress={()=>{this.props.navigation.navigate("ActivityGroup",{eventGroup:item.groups})}} >
                                       <Text style={styles.guestListButtonText}>NONE</Text>
                                   </Ripple>
                                
                                  
                                            </View> 
                                    
                                )
                              }
                                  
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
                    //  animating={this.state.isLoading}
                      style={{marginTop:'25%'}}
                      />

                    }

        <Ripple style={[styles.checkingButton]} rippleColor={lightGrayColor}
        onPress={()=>{this.props.navigation.navigate("CheckingComplete")}}>
            <Text style={styles.checkingButtonText}>
               CHECKIN
            </Text>
        </Ripple>
            </View>
            
         
            </Container>
        )}
}