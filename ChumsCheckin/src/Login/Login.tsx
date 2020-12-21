import React from 'react'
import {
    View,
    Text,
    
    TouchableOpacity,
   TextInput,
    ActivityIndicator,
} from 'react-native'
import styles from '../myStyles'
import {Container,Content} from 'native-base'
import * as Utility from '../Utility'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {CommonActions } from '@react-navigation/native';
import Header from '../Component/Header'

interface Props {
    navigation:Utility.screenNavigationProps
}



interface State {
    isLoading?: boolean,
    email:any,
  password:any,
}

export default class Login extends React.Component<Props,State>{
constructor(Props:Props){
    super(Props),
    this.state={
        isLoading:false,
        email:'',
        password:'',

    }
}

emailValidation (value2:any){

    let value = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = value.test(value2.trim())
    return (isValid)
}

 moveNextScreen(){
    if(this.state.email==='')
    {
        Utility.snackBar("Please enter your email address")
    }
    else if(!this.emailValidation(this.state.email)){
        Utility.snackBar("Please enter valid email")
    }
    else if(this.state.password===''){
        Utility.snackBar("Please enter your password")
    }
    else{
        this.setState({isLoading:true})
     var data:object={
         email:this.state.email,
         password:this.state.password
        }
        Utility.login('login',data).then((resjson) =>{ 

            if(JSON.stringify(resjson).length===2){
                this.setState({isLoading:false})
                Utility.snackBar("Invalid email id and password")

            }
            else{
        global.userKey=resjson.token
        
              AsyncStorage.multiSet([['@Login','true'],['@UserData',JSON.stringify(resjson.token)]]);
            this.setState({isLoading:false,email:'',password:''})
            Utility.snackBar("Login successfull")
            this.props.navigation.dispatch(CommonActions.reset({
                index:0,
                routes:[{name:'ActivityServices'}]
              
              }))
            
            }

        })

    }
    
 }

  
render(){
    return(
    <Container>
        
        <Content>
            <View style={styles.loginMainContainer}>
           <Header />
          <Text style={styles.loginHeading}>Welcome.  Please Log in.</Text>
        <TextInput
         placeholder="Email"
         value={this.state.email}
          style={styles.loginTextInput}
          onChangeText={(value)=>{this.setState({email:value})}}
          />
        <TextInput 
        placeholder="Password" 
        value={this.state.password}
         secureTextEntry={true}
         style={[styles.loginTextInput,{marginTop:'5%'}]}
         onChangeText={(value)=>{this.setState({password:value})}}

         />
                  <TouchableOpacity style={styles.loginButton} onPress={()=>{this.moveNextScreen()}} >
           <ActivityIndicator 
           size="small"
           color="#FFFFFF"
            animating={this.state.isLoading}
            style={{marginHorizontal:'5%'}}
             />
               <Text style={styles.loginButtonText}>LOGIN</Text>
               <ActivityIndicator size="small" color="#FFFFFF" animating={false}  style={{marginHorizontal:'5%'}} />
               </TouchableOpacity>   
         </View>
         </Content>
         </Container>
    )
}

}