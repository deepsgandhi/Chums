import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Container } from 'native-base'
import Ripple from 'react-native-material-ripple'
import { Header } from './Components'
import { ApiHelper, screenNavigationProps, CachedData, Styles, StyleConstants } from '../Helpers'

interface Props { navigation: screenNavigationProps }

export const Services = (props: Props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [services, setServices] = React.useState([]);

    const loadData = () => {
        ApiHelper.apiGet("/services").then(data => { setServices(data); setIsLoading(false); });
    }

    const selectService = (serviceId: number) => {
        setIsLoading(true);
        ApiHelper.apiGet("/servicetimes?serviceId=" + serviceId + "&include=groups").then(data => {
            setIsLoading(false);
            CachedData.serviceId = serviceId;
            CachedData.serviceTimes = data;
            props.navigation.navigate("Lookup");
        });
    }

    const getRow = (data: any) => {
        const item = data.item;
        return (
            <Ripple style={Styles.bigLinkButton} onPress={() => { selectService(item.id) }}>
                <Text style={Styles.bigLinkButtonText}>{item.campus.name} - {item.name}</Text>
            </Ripple>
        );
    }

    const getResults = () => {
        if (isLoading) return (<ActivityIndicator size="large" color={StyleConstants.baseColor1} animating={isLoading} style={{ marginTop: '25%' }} />)
        else return (<FlatList data={services} renderItem={getRow} keyExtractor={(item: any) => item.id.toString()} />);
    }

    React.useEffect(loadData, []);

    return (
        <Container>
            <Header />
            <View style={Styles.mainContainer} >
                <Text style={Styles.H1}>Select a service:</Text>
                {getResults()}
            </View>
        </Container>
    )
}
