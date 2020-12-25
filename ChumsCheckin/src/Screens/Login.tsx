import React from 'react'
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, } from 'react-native'
import styles from '../myStyles'
import { Container, Content } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native';
import Header from './Components/Header'
import { ApiHelper, Utilities, screenNavigationProps, EnvironmentHelper } from "../Helpers";

interface Props { navigation: screenNavigationProps }

export const Login = (props: Props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const validateEmail = (value2: any) => {
        let value = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = value.test(value2.trim())
        return (isValid)
    }

    const moveNextScreen = () => {
        if (email === '') Utilities.snackBar("Please enter your email address");
        else if (!validateEmail(email)) Utilities.snackBar("Please enter valid email");
        else if (password === '') Utilities.snackBar("Please enter your password");
        else {
            setIsLoading(true);
            ApiHelper.apiPostAnonymous(EnvironmentHelper.AccessManagementApiUrl + "/users/login", { email: email, password: password }).then(data => {
                setIsLoading(false);
                if (JSON.stringify(data).length === 2) Utilities.snackBar("Invalid email id and password")
                else {
                    ApiHelper.jwt = data.token;
                    ApiHelper.amJwt = data.token;
                    AsyncStorage.multiSet([['@Login', 'true'], ['@UserData', JSON.stringify(data.token)]]);
                    setEmail("");
                    setPassword("");
                    Utilities.snackBar("Login successfull")
                    props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Services' }] }));
                }
            });


        }
    }

    return (
        <Container>


            <Header />
            <Content contentContainerStyle={styles.mainContainer} >
                <Text style={styles.H1}>Welcome.  Please Log in.</Text>
                <TextInput placeholder="Email" value={email} style={styles.textInput} autoCompleteType="email" onChangeText={(value) => setEmail(value)} />
                <View style={{ marginTop: "5%" }}>
                    <TextInput placeholder="Password" value={password} secureTextEntry={true} autoCompleteType="password" style={styles.textInput} onChangeText={(value) => { setPassword(value) }} />
                </View>

                <TouchableOpacity style={styles.bigButton} onPress={moveNextScreen}>
                    <ActivityIndicator size="small" color="#FFFFFF" animating={isLoading} style={{ display: (isLoading) ? "flex" : "none" }} />
                    <Text style={[styles.bigButtonText, { display: (isLoading) ? "none" : "flex" }]} >LOGIN</Text>
                </TouchableOpacity>
            </Content>

        </Container>
    )
}