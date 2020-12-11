import React from 'react'
import { TextInput,View,Text,TouchableOpacity,Image,FlatList } from  'react-native'
import {Container, Content} from 'native-base'
import styles from '../myStyles'
import Header from '../Component/Header'
import * as Utility from '../Utility';
import Ripple from 'react-native-material-ripple'

import {RootStackParamList} from '../../App'
import { RouteProp } from '@react-navigation/native';


type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ActivityLookup'>;

interface Props {

     navigation: Utility.screenNavigationProps;
     route: ProfileScreenRouteProp;

  }

interface State {
    isLoading?: boolean;
    dataList: any,
    phone:any,
    EventDetail:any
}



export default class DetailSearch extends React.Component<Props,State>{
    constructor(Props:any){
        super(Props),
        this.state={
            isLoading:false,
            dataList:[],
            phone:0,
            EventDetail:[],


        }
    }

  
    componentDidMount(){
          console.log("global",this.props.route.params.serviceId)

        Utility.getActivity(this.props.route.params.serviceId).then((response)=>{
            if(response!=='error'){
  this.setState({EventDetail:response})
console.log("response",response)
            }
            else{
                Utility.snackBar("Somethings went wrong")
 
            }
            

        })
    }
    validPhoneNumber(){
        var number = this.state.phone.length;
        if(number == 10)
        {
          return true
        }
        else{
          return false
        }
      }
    search(){
        if(this.state.phone=='')
        {
            Utility.snackBar("Please enter phone number")
        }
        // else if(!this.validPhoneNumber()){
        //     Utility.snackBar(" Invalid phone number")
        // }
       
        else{
            Utility.getSearchDetail('people/search/phone?number=',this.state.phone).then((response)=>{
                console.log("response",response)
                if(response.length==0){
                    Utility.snackBar("Record not found")
 
                 }
                else if(response!=='error'){
      this.setState({dataList:response,isLoading:true})
   
                }
                else{
                    Utility.snackBar("Somethings went wrong")
     
                }   
            })
        }
    }


onchange( value:any){
if(value.length===0){
    this.setState({dataList:[]})
}
else{
    Utility.getSearchDetail('people/search/phone?number=',value).then((response)=>{
        console.log("response",response)
        if(response.length==0){
           
            this.setState({dataList:[],phone:value})
            Utility.snackBar("Record not found")
         }
        else if(response!=='error'){
this.setState({dataList:response,isLoading:true,phone:value})

        }
        else{
            Utility.snackBar("Somethings went wrong")

        }   
    })
}
}

    render() {
    
        return (
            <Container>
                <View style={styles.searchMainContainer}>
            <Header/>
<Text style={styles.searchHeading}>Search by phone number:</Text>
<View style={styles.searchView} >
<TextInput 
placeholder='Enter mobile no'
onChangeText={(value)=>{this.onchange(value)}}
 keyboardType="numeric"   style={styles.searchTextInput} />
<TouchableOpacity style={styles.searchButton} onPress={()=>{this.search()}} >
    <Text style={styles.searchButtonText}>Search</Text>
</TouchableOpacity>

</View>
<Content contentContainerStyle={{flex:(!this.state.isLoading)? 1:0}}>

<View style={{marginTop:'3%'}}>
<FlatList

data={this.state.dataList}
renderItem={({item})=>{
    return(
        <Ripple style={styles.flatlistMainView} onPress={()=>{this.props.navigation.navigate("GuestList",{houseHoldId:item.householdId,serviceDetail:this.state.EventDetail,visitSession:'',eventName:'',listIndex:-1,itemIndex:-1,id:item.id})}} >
            <Image source={{uri:window.BaseImageUrl+item.photo}} style={styles.dataImage} resizeMode="contain" />
    <Text style={[styles.dataText,{ marginLeft:'7%'}]}>{item.name.display}</Text>
        </Ripple>
    )
}}

>

</FlatList>
</View>
</Content>
                  </View>
                 
            </Container>
        )
    }

    
}