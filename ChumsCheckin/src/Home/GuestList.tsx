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
var count=0
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
    houseHoldId:any,
    serviceId:any,
    visitSession:any,
    newarray:any,
    sendArray:any,
  
}
export default class GuestList extends React.Component<Props,State>{
    constructor(Props:any){
        super(Props),
        this.state={
            isLoading:false,
            dataList:[],
            event:0,
            houseHoldId:this.props.route.params.houseHoldId,
            eventDetail:this.props.route.params.serviceDetail,
            serviceId:this.props.route.params.serviceDetail[0].serviceId,
            visitSession:[],
            newarray:[],
            sendArray:[]
,        }
        // console.log("paramdetails",JSON.stringify(this.props.route.params.serviceDetail[0].groups))
        // console.log("paramdetails",this.props.route.params.serviceDetail[0].serviceId)
    }

    componentDidMount(){
    
        this.props.navigation.addListener('focus', () => {
            console.log(this.props.route.params.listIndex)
            // console.log("state",this.state.sendArray)
            if(this.props.route.params.visitSession!=''){
               this.state.sendArray[this.props.route.params.listIndex].visitSessions.push({session:this.props.route.params.visitSession})
                // this.state.visitSession.push({session:this.props.route.params.visitSession})
    this.setState({sendArray:this.state.sendArray})
            }
           if(this.props.route.params.listIndex!=-1){
            // console.log("grouop",this.props.route.params.itemIndex)
            // console.log("grouop",this.props.route.params.listIndex)
            let newarray = this.state.dataList
            newarray[this.props.route.params.listIndex].eventGroup[this.props.route.params.itemIndex].eventName=this.props.route.params.eventName

this.setState({dataList:newarray})
           }
            // this.GuestList()
          });
      this.GuestList()
    }

    GuestList(){
        this.setState({isLoading:false})
        Utility.getSearchDetail('people/household/',this.state.houseHoldId).then((response)=>{
            if(response!=='error'){
                  console.log("resp",response)
     let newarray= response
     let sendArray:any=[]
   response.map((item:any,index:any)=>{

    newarray[index]=({name:item.name.display,photo:item.photo,userId:item.id,eventGroup:[]})
    sendArray[index]=({persionId:item.id,serviceId:this.state.serviceId,visitSessions:[]})

    this.state.eventDetail.map((value:any)=>{
        newarray[index].eventGroup.push({eventName:"NONE",eventTime:value.name,groups:value.groups,id:value.id})
    })

    if(index===response.length-1){
      console.log("sendArray",sendArray)
        this.setState({dataList:newarray,isLoading:true,sendArray:sendArray})
    }
     })

   
               }
               else{
                   Utility.snackBar("Somethings went wrong")
    
               }   
           })
    }
    eventGuest(value:any){
       console.log("id",value)
        if(this.state.event == value)
        {
            this.setState({event:0})
        }
        else{
            this.setState({event:value})
        }

    }

  checkin(){

    
        // let data = [{personId:this.props.route.params.id,serviceId:this.state.serviceId,visitSessions:this.state.visitSession}]
   console.log("senddata",JSON.stringify(this.state.sendArray))
   console.log("household",this.state.houseHoldId)
              fetch(window.ApiRoot+"visits/checkin?serviceId="+this.state.serviceId+"&householdId="+this.state.houseHoldId, {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : "Bearer "+global.userKey,
                  'Accept' :'application/json'
                },
                 body: JSON.stringify(this.state.sendArray)
              })
              
                .then((resjson) => {
              if(resjson.ok==true){
this.props.navigation.navigate("CheckingComplete")
              }
              else{
                Utility.snackBar("Somethings went wrong")
              }
                console.log("res",resjson)
             })
                .catch((error) => {
                console.error(error);
                // return('error')
                });
    
     
  }


 event(item:any,index:any,length:any){
 
 if(item.eventName!='NONE')
        {
        count=count+1
        if(index==length-1){
            count=0
        }
     return(<Text style={{color:constant.greenColor}}>{item.eventTime+" - "+item.eventName}</Text>)
        } 
        else{
            if(item.eventName==='NONE'&&index==length-1){
                if (count==0){   
                    return( <Text>none</Text>)
                     }
              else{
                 
                  count=0
                 
              }
            }

        }

    
       
 }



    render() {
    console.log("newarray",this.state.dataList)
        return (
            <Container>
            
                <View style={styles.guestListMainContainer}>
          <Header/>
        <TouchableOpacity style={styles.addGuestButton} onPress={()=>{this.props.navigation.navigate("GuestAdd",{householdId:this.props.route.params.houseHoldId,id:this.props.route.params.id})}}>
            <Text style={styles.addGuestButtonText}>
                ADD GUEST
            </Text>
        </TouchableOpacity>

        {
                        (this.state.isLoading)?
                        <FlatList
style={styles.guestListStyle}
                        data={this.state.dataList}
                        renderItem={({item,index})=>{
                            return(
                                <View>
                                <Ripple style={styles.flatlistMainView} onPress={()=>{this.eventGuest(item.userId)}}  >
                                    <Icon name={(this.state.event===item.userId)?'up':'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                                    <Image source={{uri:window.BaseImageUrl+item.photo}} style={styles.dataImage} resizeMode="contain" />
                                    <View style={{justifyContent:'center',alignItems:'center',marginLeft:'5%'}} >
                                    <Text style={[styles.dataText,{alignSelf:'center'}]}>{item.name}</Text>
                                  
                                    {
                                        
                                        (this.state.event!=item.userId)?(
                                       
                                          
                                        
                                       item.eventGroup.map((value:any,indx:any)=>
                                     this.event(value,indx,item.eventGroup.length)   
                                          
                                       )
                                        )      
                                         
                                        :
                                        null
                                    }
                          
                        
                                    </View>
                                   
                                </Ripple>
                            {
                                (this.state.event == item.userId)?
                            
                            <View>
                                 {
                           item.eventGroup.map((item:any,indx:any)=>
                                
                                     <View style={styles.hideView}>
                                   
                                <Text style={styles.guestListText}>{item.eventTime}</Text>
                                   <Ripple style={[styles.guestListButton,{backgroundColor:(item.eventName=='NONE')?constant.baseColor1:constant.greenColor}]} onPress={()=>{this.props.navigation.navigate("ActivityGroup",{eventGroup:item.groups,serviceId:item.id,listIndex:index,itemIndex:indx,id:this.props.route.params.id})}} >
                                 <Text style={styles.guestListButtonText}>{item.eventName}</Text>
                                   </Ripple>
                                
                                  
                                            </View> 
                                    
                                
                            ) }
                                  
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
                  
                      style={{marginTop:'25%'}}
                      />

                    }

        <Ripple style={[styles.checkingButton]} rippleColor={lightGrayColor}
        onPress={()=>this.checkin()}>
            <Text style={styles.checkingButtonText}>
               CHECKIN
            </Text>
        </Ripple>
            </View>
            
         
            </Container>
        )}
}