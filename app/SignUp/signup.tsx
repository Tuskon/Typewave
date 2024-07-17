import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, SafeAreaView, LogBox, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import config from '../../backend/config/config'
import { store_username, store_email } from "../../Session"
import { useForm, Controller } from 'react-hook-form';
import { Input, Icon, useToast } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export function SignUp() {

    const [show, setShow] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [username, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword1] = useState('');
    const toast = useToast()
    const [confirmpassword, setPassword2] = useState('');

    const [fontsLoaded] = useFonts({
        'Play-Bold': require('../../assets/fonts/Play-Bold.ttf'),
        'Play-Regular': require('../../assets/fonts/Play-Regular.ttf'),
        'PixelifySans-Bold': require('../../assets/fonts/PixelifySans-Bold.ttf'),
        'PixelifySans-Medium': require('../../assets/fonts/PixelifySans-Medium.ttf'),
        'PixelifySans-Regular': require('../../assets/fonts/PixelifySans-Regular.ttf'),
        'PixelifySans-SemiBold': require('../../assets/fonts/PixelifySans-SemiBold.ttf'),
        'PixelifySans-VariableFont_wght': require('../../assets/fonts/PixelifySans-VariableFont_wght.ttf'),
        'VT323-Regular': require('../../assets/fonts/VT323-Regular.ttf'),
    })

    if (!fontsLoaded) {

        return undefined;

    }

    const { control } = useForm();

    const navigation = useNavigation<StackTypes>();

    const { height } = Dimensions.get('window');

    const handleLogin = async () => {

        navigation.navigate('Login');

    }

    const handleSignup = async () => {

        if (!username || !email || !password || !confirmpassword) {

            toast.show({
                description: "Fill in all fields",
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
            })

        } else if (password !== confirmpassword) {

            toast.show({
                description: "Divergent passwords",
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
            })

        } else {

            try {

                let response = await fetch(config.urlRootRoute + '/users/UserRegister', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password
                    })
                })

                let status = response.status

                if (status == 201) {

                    store_username(username)
                    store_email(email)
                    navigation.navigate('Selection')
                    toast.show({
                        description: "Registered user",
                        duration: 1500,
                        bg: 'emerald.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                } else if (status == 404) {

                    toast.show({
                        description: "User already exist",
                        duration: 3500,
                        bg: 'danger.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                } else {

                    toast.show({
                        description: 'An error has occurred',
                        duration: 3500,
                        bg: 'danger.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                }

            } catch (error) {

                toast.show({
                    description: `Requesition error ${error}`,
                    duration: 3500,
                    bg: 'danger.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })

            }

        }
    }

    const styles = StyleSheet.create({

        safearea_container: {
            flex: 1
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        text_view: {
            marginTop: '15%',
            justifyContent: 'center',
            alignItems: 'center',

        },
        login_view: {
            backgroundColor: '#242424',
            marginTop: height * 0.05,
            width: '90%',
            height: height * 0.69,
            borderRadius: 20
        },
        welcome_view: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '4%',
            marginLeft: '5%'
        },
        form_view: {
            flexDirection: 'column',
            marginTop: '4%',
            marginLeft: '5%'
        },
        link_view: {
            flexDirection: 'row',
            marginTop: '5%',
            alignItems: 'center'
        },
        check_view: {
            marginLeft: '25%',
        },
        signup_view: {
            flexDirection: 'row',
            marginLeft: '17%',
            position: 'relative',
            bottom: '11%'
        },
        image: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
        },
        text_login: {
            color: '#ab20fd',
            fontSize: 55,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'blue',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1.5
        },
        text_welcome: {
            color: '#FFFFFF',
            fontSize: 39,
            fontFamily: "PixelifySans-SemiBold",
        },
        text_link: {
            color: '#67696A',
            fontSize: 14,
            fontFamily: "PixelifySans-Regular",

        }
    });

    return (

        <SafeAreaView style={styles.safearea_container}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <ImageBackground style={styles.image}
                    source={require('../../assets/images/Theme.gif')}>

                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>

                        <View style={styles.text_view}>

                            <Text style={styles.text_login}>Sign Up</Text>

                        </View>

                        <View style={styles.login_view}>

                            <View style={styles.welcome_view} >

                                <Text style={styles.text_welcome}>Create</Text>
                                <Text style={styles.text_welcome}>an account</Text>

                            </View>

                            <View style={styles.form_view}>

                                <Controller
                                    control={control}
                                    name="Username"
                                    render={({ }) => (

                                        <Input
                                            onChangeText={(text) => setUser(text)}
                                            fontSize={12}
                                            fontFamily={'PixelifySans-Regular'}
                                            color={'white'}
                                            variant={'rounded'}
                                            height={"14%"}
                                            w={{
                                                base: "92%",
                                                md: "25%"
                                            }} InputRightElement={<Icon as={<MaterialIcons name="person" />}
                                                size={5}
                                                mr="2"
                                                color="muted.400" />}
                                            placeholder="Nickname" />

                                    )} />

                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ }) => (

                                        <Input
                                            onChangeText={(text) => setEmail(text)}
                                            fontSize={12}
                                            marginTop={"4%"}
                                            fontFamily={'PixelifySans-Regular'}
                                            color={'white'}
                                            variant={'rounded'}
                                            height={"14%"}
                                            w={{
                                                base: "92%",
                                                md: "25%"
                                            }} InputRightElement={<Icon as={<MaterialIcons name="mail" />}
                                                size={5}
                                                mr="2"
                                                color="muted.400" />}
                                            placeholder="E-mail" />

                                    )} />

                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ }) => (

                                        <Input
                                            onChangeText={(text) => setPassword1(text)}
                                            fontSize={12}
                                            fontFamily={'PixelifySans-Regular'}
                                            color={'white'}
                                            marginTop={"4%"}
                                            variant={'rounded'}
                                            height={"14%"}
                                            w={{
                                                base: "92%",
                                                md: "25%"
                                            }} type={show ? "text" : "password"}
                                            InputRightElement={<Pressable onPress={() => setShow(!show)}>
                                                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
                                                    size={5}
                                                    mr="2"
                                                    color="muted.400" />
                                            </Pressable>} placeholder="Password" />

                                    )} />

                                <Controller
                                    control={control}
                                    name="confirm password"
                                    render={({ }) => (

                                        <Input
                                            onChangeText={(text) => setPassword2(text)}
                                            fontSize={12}
                                            fontFamily={'PixelifySans-Regular'}
                                            color={'white'}
                                            marginTop={"4%"}
                                            variant={'rounded'}
                                            height={"14%"}
                                            w={{
                                                base: "92%",
                                                md: "25%"
                                            }} type={show2 ? "text" : "password"}
                                            InputRightElement={<Pressable onPress={() => setShow2(!show2)}>
                                                <Icon as={<MaterialIcons name={show2 ? "visibility" : "visibility-off"} />}
                                                    size={5}
                                                    mr="2"
                                                    color="muted.400" />
                                            </Pressable>} placeholder="Confirm password" />

                                    )} />

                                <View style={styles.link_view}>

                                    <Button title={"Sign Up"}
                                        buttonStyle={{
                                            borderColor: '#7d12ff',
                                            borderWidth: 1.5,
                                            backgroundColor: '#7d12ff',
                                            borderRadius: 30,
                                            width: 100

                                        }}

                                        titleStyle={{
                                            color: 'white',
                                            fontSize: 15,
                                            fontFamily: "PixelifySans-Regular"
                                        }}
                                        onPress={handleSignup}
                                    ></Button>

                                </View>

                            </View>

                            <View>

                                <View style={styles.signup_view}>

                                    <Text style={styles.text_link}>Don't have an account?</Text>

                                    <Pressable onPress={handleLogin}>
                                        {({ pressed }) => (
                                            <Text style={{
                                                color: '#7d12ff',
                                                fontSize: 14,
                                                fontFamily: "PixelifySans-Regular",
                                                transform: [{ scale: pressed ? 0.93 : 1 }]
                                            }}> Login</Text>
                                        )}
                                    </Pressable>

                                </View>

                            </View>

                        </View>

                    </ScrollView>

                </ImageBackground>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}


