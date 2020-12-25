import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Container, Content } from 'native-base'
import styles from '../myStyles'
import * as constant from '../Constant'
import Header from './Components/Header'
import Ripple from 'react-native-material-ripple'
import { ApiHelper, screenNavigationProps, CachedData } from '../Helpers'

interface Props { navigation: screenNavigationProps }

export const Services = (props: Props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [services, setServices] = React.useState([]);

    const selectService = (serviceId: number) => {
        ApiHelper.apiGet("/servicetimes?serviceId=" + serviceId + "&include=groups").then(data => {
            CachedData.serviceId = serviceId;
            CachedData.serviceTimes = data;
            props.navigation.navigate("Lookup");
        });
    }

    const loadData = () => {
        ApiHelper.apiGet("/services").then(data => { setIsLoading(false); setServices(data); });
    }

    const getRow = (data: any) => {
        const item = data.item;
        return (
            <View>
                <Ripple style={styles.bigLinkButton} onPress={() => { selectService(item.id) }}>
                    <Text style={styles.bigLinkButtonText}>{item.campus.name} - {item.name}</Text>
                </Ripple>
            </View>
        );
    }

    const getResults = () => {
        if (isLoading) return (<ActivityIndicator size="large" color={constant.baseColor1} animating={isLoading} style={{ marginTop: '25%' }} />)
        else return (<FlatList data={services} renderItem={getRow} keyExtractor={(item: any) => item.id.toString()} />);
    }

    React.useEffect(loadData, []);

    return (
        <Container>
            <Header />
            <Content contentContainerStyle={styles.mainContainer} >
                <Text style={styles.H1}>Select a service:</Text>
                {getResults()}
            </Content>
        </Container>
    )
}
