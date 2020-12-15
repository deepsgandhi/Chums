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
    newarray:any
  
}
export default class GuestList extends React.Component<Props,State>{
    constructor(Props:any){
        super(Props),
        this.state={
            isLoading:false,
            dataList:this.props.route.params.eventGroup,
            event:-1,
            newarray:[]
        }
    }

  
    componentDidMount(){
        var category=''
        
        var index:any=0
      
 this.props.route.params.eventGroup.map((item:any,i:number)=>{

if(item.categoryName!=category){

    category=item.categoryName
    console.log(category)
  
    index=(i===0)?0:index+1
    console.log(index)
    this.state.newarray[index]=({key:index,name:category,SubCategory:[{subName:item.name,groupId:item.id}]})
    this.setState({newarray:this.state.newarray})

}
else{
   
      this.state.newarray[index].SubCategory.push({subName:item.name,groupId:item.id})
     this.setState({newarray:this.state.newarray})
    
}

        })

console.log(this.state.newarray)

    }

    eventGuest(value:number){
        console.log("itemkey",value)
        if(this.state.event == value)
        {
            this.setState({event:-1})
        }
        else{
            this.setState({event:value})
        }

    }

 backScreen(value:any,event:any){
    // this.props.navigation.goBack()
    console.log("value",value)
    console.log(this.props.route.params.serviceId)
    // {session:{"groupId":value,"serviceTimeId":this.props.route.params.serviceId}}
this.props.navigation.navigate("GuestList",
{
    houseHoldId:632,
    serviceDetail:this.props.route.params.eventGroup,
    visitSession:{groupId:value,serviceTimeId:this.props.route.params.serviceId},
    eventName:event,
    
    id:this.props.route.params.id,    
})
 

 }

 backNoneScreen(value:any,event:any){
 
this.props.navigation.navigate("GuestList",
{
    houseHoldId:632,
    serviceDetail:this.props.route.params.eventGroup,
    visitSession:{groupId:0,serviceTimeId:this.props.route.params.serviceId},
    eventName:'NONE',
    
    id:this.props.route.params.id,    
})
 

 }

    render() {
    
        return (
            <Container>
            
                <View style={styles.guestListMainContainer}>
                <Header/>
       
                <FlatList
                           style={{marginTop:'3%'}}
                        data={this.state.newarray}
                        renderItem={({item,index})=>{
                            return(
                                <View>
                                <Ripple style={styles.ActivityGroupRipple} onPress={(index)=>{this.eventGuest(item.key)}}  >
                                    <Icon name={(this.state.event===item.key)?'up':'down'} type="AntDesign" style={styles.flatlistDropIcon} />
                                  
                                    <Text style={[styles.activityText]}>{item.name}</Text>
                                 
                                </Ripple>
                            {
                                (this.state.event== item.key )?
                                item.SubCategory.map((item:any)=>
                                
                                <View>
                                 
                                <Ripple style={styles.ActivityGroupRipple} onPress={()=>this.backScreen(item.groupId,item.subName)}>
                                   
                                <Text style={[styles.activityText,{marginLeft:'10%'}]}>{item.subName}</Text>
                         
                           </Ripple>
                                  
                                    </View>
                                )
                            
                                    
                                    :
                                   null   
                        }
                                </View>
                            )
                        }}
                         />


        <Ripple style={styles.noneButton} rippleColor={darkColor} onPress={()=>this.backNoneScreen(234,"NONE")}>
            <Text style={styles.checkingButtonText}>
              NONE
            </Text>
        </Ripple>
            </View>
            
         
            </Container>
        )}
}