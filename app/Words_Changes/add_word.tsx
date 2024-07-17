import React, { useState} from "react";
import { View, Text, StyleSheet, LogBox, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import config from "../../backend/config/config";
import { Input, useToast } from 'native-base';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export function Add_word() {
    const [word, setWord] = useState('')
    const toast = useToast()

    const handleAdd = async () => {

        if (!word) {

            toast.show({
                description: "Fill in all fields",
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
            })

        } else {

            try {

                let response = await fetch(config.urlRootRoute + '/words/WordRegister', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        word: word
                    })

                })

                let status = response.status

                if (status == 200 || status == 201) {

                    toast.show({
                        description: "Word already registred",
                        duration: 3500,
                        bg: 'danger.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                } else if (status == 404) {

                    toast.show({
                        description: "Word registred",
                        duration: 2500,
                        bg: 'emerald.500',
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        view: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#242424',
            width: '100%'
        },
        word_view: {
            marginTop: '15%',
            alignItems: 'center',
            width: '100%'

        },
        inputs_view: {
            marginTop: '34%',
            alignItems: 'center',
            width: '90%',
        },
        button_view: {
            width: '75%',
            height: '80%',
            marginTop: '20%'
        },
        space: {
            marginTop: '20%'
        },
        text_info: {
            color: '#ab20fd',
            fontSize: 18,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'red',
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 0.5
        },
        text_word: {
            color: '#ab20fd',
            fontSize: 33,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'blue',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1.5
        },
        text_button: {
            fontFamily: 'PixelifySans-Regular',
            color: 'white',
            fontSize: 20
        },
        input_data: {

            backgroundColor: '#3D3D3D',
            borderRadius: 10,
            fontFamily: 'PixelifySans-Regular',
            color: 'white'

        }
    });

    return (
        <KeyboardAvoidingView style={styles.container}>

            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                <View style={styles.view}>

                    <View style={styles.word_view}>
                        <Text style={styles.text_word}>Add a word</Text>

                    </View>

                    <View style={styles.inputs_view}>

                        <Text style={styles.text_info}>Suggestion: We recommend you add at least 10 words</Text>

                        <View style={styles.space}></View>
                        <Input onChangeText={(text) => setWord(text)}
                            borderColor={'#242424'}
                            placeholder="word"
                            style={styles.input_data}></Input>


                    </View>

                    <View style={styles.button_view}>
                        <Button
                            onPress={handleAdd}
                            buttonStyle={{
                                backgroundColor: '#ab20fd',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 20,
                                height: '30%'
                            }}>

                            <Text style={styles.text_button}>Add</Text>

                        </Button>
                    </View>

                </View>

            </ScrollView>

        </KeyboardAvoidingView >
    );
}


