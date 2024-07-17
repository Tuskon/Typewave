import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ImageBackground, Pressable, SafeAreaView, LogBox, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Image } from 'expo-image';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { VStack } from 'native-base';
import { store_timer } from "../../Session";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export function Selection() {

    const [username, setName] = useState<string>('Loading...')

    useEffect(() => {
        async function fetchData() {

            const value = await AsyncStorage.getItem('username');

            if (value == null) {

                setName('')

            } else {

                setName(value)
            }
        }

        fetchData();
    }, []);

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

    const { height } = Dimensions.get('window');

    const handleSettings = async () => {

        navigation.navigate('Settings')

    }

    const handlePlay60 = async () => {

        store_timer('60')
        navigation.navigate('Play');

    }

    const handlePlay30 = async () => {

        store_timer('30')
        navigation.navigate('Play');

    }

    const handlePlay15 = async () => {

        store_timer('15')
        navigation.navigate('Play');

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
            justifyContent: 'center',
            alignItems: 'center',

        },
        selection_view: {
            alignItems: 'center',
            marginTop: height * 0.2,
        },
        setting_view: {
            alignItems: 'flex-end',
            width: '100%',
            marginRight: '3%',
            marginTop: height * 0.018,

        },
        image: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
        },
        text_welcome: {
            color: '#ab20fd',
            fontSize: 32,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'black',
            textShadowOffset: { width: 2.5, height: 2.5 },
            textShadowRadius: 1.5
        },
    });

    return (

        <SafeAreaView style={styles.safearea_container}>

            <View style={styles.container}>

                <ImageBackground style={styles.image}
                    source={require('../../assets/images/Theme.gif')}>

                    <View style={styles.setting_view}>

                        <Pressable onPress={handleSettings} >

                            {({ pressed }) => (
                                <Image style={{
                                    width: 35,
                                    height: 35,
                                    transform: [{ scale: pressed ? 0.83 : 1 }]
                                }} source={require('../../assets/images/settings_465270.png')}></Image>
                            )}

                        </Pressable>

                    </View>

                    <View style={styles.text_view}>

                        <Text style={styles.text_welcome}>Hellow</Text>
                        <Text style={styles.text_welcome}>{username}</Text>
                        <Text style={styles.text_welcome}>Let's Start Rider ? </Text>

                    </View>

                    <VStack style={styles.selection_view} space={4}>

                        <Button title={"Sweet Dreams - 60s"}
                            buttonStyle={{
                                borderColor: '#ab20fd',
                                borderWidth: 1.5,
                                backgroundColor: '#141414',
                                width: 330

                            }}
                            type='outline'
                            titleStyle={{
                                color: '#7d12ff',
                                fontSize: 30,
                                fontFamily: "PixelifySans-Regular"
                            }}
                            onPress={handlePlay60}></Button>

                        <Button title={"Midnight Rider - 30s"}
                            buttonStyle={{
                                borderColor: '#ab20fd',
                                borderWidth: 1.5,
                                backgroundColor: '#141414',
                                width: 330

                            }}
                            type='outline'
                            titleStyle={{
                                color: '#7d12ff',
                                fontSize: 30,
                                fontFamily: "PixelifySans-Regular"
                            }}
                            onPress={handlePlay30}></Button>

                        <Button title={"Are you Sure ? - 15s"}
                            buttonStyle={{
                                borderColor: '#ab20fd',
                                borderWidth: 1.5,
                                backgroundColor: '#141414',
                                width: 330

                            }}
                            type='outline'
                            titleStyle={{
                                color: '#7d12ff',
                                fontSize: 30,
                                fontFamily: "PixelifySans-Regular"
                            }}
                            onPress={handlePlay15}></Button>

                    </VStack>

                </ImageBackground>

            </View>

        </SafeAreaView>
    );
}


