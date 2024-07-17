import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, LogBox, Dimensions, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Input, VStack, HStack, useToast} from 'native-base';
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import config from "../../backend/config/config";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export function Play() {

    const [word, setWord] = useState<string>('Loading...')
    const [isPlaying, setIsPlaying] = React.useState(true)
    const [isCorrect, setIsCorrect] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [input, setInput] = useState('')
    let [value_time, setTime] = React.useState(0)
    let [value_points, setPoint] = React.useState(0)
    const toast = useToast()


    async function Getime() {

        const value = await AsyncStorage.getItem('timer')


        if (value == null) {

            setTime(0)

        } else {
            let interger_value = parseInt(value)
            setTime(interger_value)
        }
    }


    async function GetWord() {

        let response = await fetch(config.urlRootRoute + '/words/WordFindOne', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })

        let status = response.status

        let data_word = await response.json()

        if (status == 200) {
            
            setWord(data_word)


        } else if (status == 404) {

            toast.show({
                description: "No words available",
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
              })

        } else {

            toast.show({
                description: `Error: ${status}`,
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
              })

        }

        setIsCorrect(false)
    }

    async function Validation() {

        if (isPlaying == true) {

            if (input == word) {

                setIsCorrect(true)

                let actual_points = value_points + 1
                setPoint(actual_points)
                setInput('')
                return
            }
        }

    }

    async function Finish() {

        let email = await AsyncStorage.getItem('email')

        if (email == null) {
            email = 'None'
        }

        const querryParams = new URLSearchParams({ email }).toString();

        let response = await fetch(config.urlRootRoute + `/users/FindPoints?${querryParams}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })

        let data = await response.json()

        let data_obj = data.points

        if (data_obj==null){

            data_obj=0
        }

        let data_points = parseInt(data_obj)

        let points = data_points + value_points

        let response2 = await fetch(config.urlRootRoute + '/users/UserUpdatePoints', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                points: points,
                email: email
            })
        })

        let status2 = response2.status
        
        if (status2 == 201 || status2 == 200) {
            
            setModalVisible(true)
            setIsPlaying(false)

        } else if (status2 == 404) {

            toast.show({
                description: `Error: ${response2.json}`,
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
              })
            
        } else {

            toast.show({
                description: `Error: ${response2.status}`,
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
              })

        }
        
    }


    useEffect(() => {
        Getime();
    }, []); // Chamar apenas uma vez quando o componente for montado

    useEffect(() => {
        GetWord();
    }, [isCorrect]); // Chamar GetWord quando isCorrect mudar

    useEffect(() => {
        Validation();
    }, [input, isPlaying, word]); // Chamar Validation quando input, isPlaying ou word mudarem

    //Validation()

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

    const navigation = useNavigation<StackTypes>();

    const {height} = Dimensions.get('window');

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
            marginTop: height * 0.23,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#ab20fd',
            borderWidth: 1.5,
            backgroundColor: '#141414',
            width: '90%',
            height: '14%'

        },
        login_view: {
            alignItems: 'center',
            marginTop: '20%',
        },
        timer_view: {
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginRight: '2%',
            marginTop: '3%',
            backgroundColor: 'red'

        },
        points_view: {

            borderColor: '#ab20fd',
            borderWidth: 1.5,
            backgroundColor: '#141414',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginRight: '2%',
            marginTop: '3%',
            padding: '1%'

        },
        centered_view: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#242424'
            
        },
        modal_view: {
            width: '90%',
            backgroundColor: '#323232',
            height: '40%',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        header_view: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        headerText_view: {
            flex: 1,
            alignSelf: 'center',
            
        },
        content_view: {
            width: '100%',
            marginTop: '15%'       
        },
        image: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            
        },
        text_font: {
            color: '#ab20fd',
            fontSize: 34,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'blue',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1.5
        },
        text_points: {
            color: '#ab20fd',
            fontSize: 16,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'blue',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1.5
        },
        text_punctuation: {
            color: '#00ff00',
            fontSize: 16,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'blue',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1.5
        },
        text_input: {
            color: '#ab20fd',
            fontSize: 34,
            fontFamily: "PixelifySans-SemiBold",
            backgroundColor: 'black'
        },
        text_headerText: {
            fontFamily: 'PixelifySans-SemiBold',
            color: 'white',
            fontSize: 20,
            alignSelf: 'center'
        },
        button_closeButton: {
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button_form: {
            flex: 1,
            backgroundColor: '#ab20fd',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        },
        text_buttonText: {
            fontFamily: 'PixelifySans-SemiBold',
            color: 'white',
            fontSize: 20
        },
    });

    return (

        <SafeAreaView style={styles.safearea_container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <ImageBackground style={styles.image}
                    source={require('../../assets/images/Theme.gif')}>




                    <HStack alignItems={'center'} space={'23%'} marginTop={"3%"} >

                        <View style={styles.points_view}>
                            <Text style={styles.text_points}>Words typed correctly</Text>
                            <Text style={styles.text_punctuation}>{value_points}</Text>
                        </View>



                        <CountdownCircleTimer
                            isPlaying={isPlaying}
                            duration={value_time}
                            size={60}
                            strokeWidth={5}
                            trailStrokeWidth={5}
                            colors={"#00FA75"}
                            onComplete={() => { Finish()}}>
                            {({ remainingTime, color }) => (
                                <Text style={{ color, fontSize: 25, fontFamily: "PixelifySans-SemiBold", textShadowColor: '#b967ff', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1.5 }}>
                                    {remainingTime}
                                </Text>
                            )}
                        </CountdownCircleTimer>


                    </HStack>

                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>

                        <View style={styles.text_view}>
                            <Text style={styles.text_font}>{word}</Text>
                        </View>

                        <View style={styles.login_view} >

                            <Input style={styles.text_input} w={"90%"} onChangeText={(text) => setInput(text)}></Input>


                        </View>
                    </ScrollView>

                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centered_view}>

                            <View style={styles.modal_view}>

                                <View style={styles.header_view}>

                                    <View style={styles.headerText_view}>
                                        <Text style={styles.text_headerText}>Wanna try again ?</Text>
                                        <Text style={styles.text_headerText}>Score: {value_points}</Text>
                                    </View>

                                </View>


                                <View style={styles.content_view}>

                                    <VStack>

                                        <Button
                                            buttonStyle={{
                                                backgroundColor: '#ab20fd',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 20,
                                                
                                                height: '48%'
                                            }}
                                            onPress={() => navigation.replace('Play')} style={styles.button_form}>
                                            <Text style={styles.text_buttonText}>Let's try again</Text>
                                        </Button>

                                        <Button
                                            buttonStyle={{
                                                backgroundColor: '#ab20fd',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 20,
                                                height: '48%'
                                            }}
                                            onPress={() => navigation.navigate('Selection')} style={styles.button_form}>
                                            <Text style={styles.text_buttonText}>I need a break</Text>
                                        </Button>
                                        
                                    </VStack>

                                </View>

                            </View>

                        </View>
                    </Modal>

                </ImageBackground>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}


