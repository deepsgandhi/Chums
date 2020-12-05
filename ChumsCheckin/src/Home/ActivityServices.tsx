import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Container, Content } from 'native-base'
import styles from '../myStyles'
import  * as constant from '../Constant'
import Header from '../Component/Header'
import * as Utility from '../Utility';
import Ripple from 'react-native-material-ripple'


interface Props {
    navigation: Utility.screenNavigationProps
}

interface State {
    isLoading?: boolean;
    dataList: any
}


export default class ActivityServices extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            isLoading: false,
            dataList:[] 
        }

    }
    componentDidMount(){
        //  console.log("global",global.userKey)
        Utility.getApi('services',"").then((response)=>{
            if(response!=='error'){
  this.setState({dataList:response,isLoading:true})
console.log("response",response)
            }
            else{
                Utility.snackBar("Somethings went wrong")
 
            }
            

        })
    }
    render() {
        return (
            <Container>
               

                    <Header />
                    <Content contentContainerStyle={styles.serviceContentStyle} >

                    <Text style={styles.servicesHeading}>Select a service:</Text>

                    {
                        (this.state.isLoading)?
                        <FlatList
                        data={this.state.dataList}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Ripple style={styles.serviceButton} onPress={() => {
                                        this.props.navigation.navigate("ActivityLookup",{serviceId:item.id})
                                    }}>
                                        <Text style={styles.serviceButtonText}>{item.campus.name} - {item.name}</Text>
                                    </Ripple>
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
                 
                    </Content>
               
               
            </Container>
        )
    }
}