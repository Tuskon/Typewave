import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ImageBackground, Pressable, LogBox, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { store_username, store_email } from '../../Session'
import config from "../../backend/config/config";
import { useForm, Controller } from 'react-hook-form';
import { Input, Icon, Alert, Image, HStack, VStack } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export function Settings() {
  const [email, setEmail] = useState<string>('Loading...');
  const [user, setUser] = useState<string>('Loading...');
  const [value_points, setPoints] = useState<string>('Loading...');

  useEffect(() => {
    async function fetchData() {

      const value_user = await AsyncStorage.getItem('username');
      const value_email = await AsyncStorage.getItem('email');



      if (value_user == null || value_email == null) {

        setEmail('')
        setUser('')

      } else {

        setEmail(value_email)
        setUser(value_user)

      }

    }

    fetchData();
  }, []);


  useEffect(() => {
    async function GetEmail() {

      const querryParams = new URLSearchParams({ email }).toString();

      let response = await fetch(config.urlRootRoute + `/users/FindPoints?${querryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      })

      let data = await response.json()

      setPoints(data.points)

    }

    GetEmail()

  }, [user]);


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

  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    word_view: {
      marginTop: '11%',
      alignItems: 'center',
      width: '100%'

    },
    settings_view: {
      backgroundColor: '#242424',
      marginTop: height * 0.05,
      width: '94%',
      height: height * 0.65,
      borderRadius: 20
    },
    welcome_view: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: '4%',
      marginLeft: '5%'
    },
    section_view: {
      marginTop: height * 0.05

    },
    image: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    text_word: {
      color: '#ab20fd',
      fontSize: 55,
      fontFamily: "PixelifySans-SemiBold",
      textShadowColor: 'blue',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1.5
    },
    text_user: {
      color: '#ab20fd',
      fontSize: 20,
      fontFamily: "PixelifySans-SemiBold",
      textShadowColor: 'blue',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1.5
    },
    text_button: {
      color: '#ab20fd',
      fontSize: 14,
      fontFamily: "PixelifySans-Regular",
    },
    text_section: {
      color: '#67696A',
      fontSize: 16,
      fontFamily: "PixelifySans-Regular",
      marginLeft: '4%',
      marginBottom: '2%'
    }
  });

  return (
    <SafeAreaView style={styles.container}>

      <ImageBackground style={styles.image}
        source={require('../../assets/images/Theme.gif')}>

        <View style={styles.word_view}>
          <Text style={styles.text_word}>Settings</Text>

        </View>

        <View style={styles.settings_view} >

          <HStack style={{
            marginTop: '2%',
            padding: '4%',
            borderColor: '#ab20fd',
            borderBottomWidth: 1
          }}>

            <View>

              <Image size={65}
                borderRadius={400}
                source={require('../../assets/images/head_icon.gif')}></Image>

            </View>

            <VStack style={{
              marginTop: '2%',
              marginLeft: '2%'
            }}>

              <Text style={styles.text_user}>Rider: {user}</Text>
              <Text style={styles.text_user}>Points: {value_points}</Text>

            </VStack>

          </HStack>

          <View style={styles.section_view}>

            <Text style={styles.text_section}>Account Configuration</Text>

            <VStack marginLeft={'2%'}
              space={3}
              w={'95%'}>

              <Button type="outline"
                radius={50}
                raised
                onPress={() => navigation.navigate('Change_password')}
                buttonStyle={{
                  backgroundColor: '#2c2c2d',
                  borderColor: '#ab20fd'
                }}>

                <MaterialIcons style={{ marginRight: '2%' }}
                  size={20}
                  name="password" />

                <Text style={styles.text_button}>Change your password</Text>

                <AntDesign style={{ marginLeft: '34%' }}
                  size={17}
                  name="right" />

              </Button >

              <Button type="outline"
                radius={50}
                onPress={() => navigation.navigate('Change_user')}
                buttonStyle={{
                  backgroundColor: '#2c2c2d',
                  borderColor: '#ab20fd'
                }} >

                <MaterialIcons style={{ marginRight: '2%' }}
                  size={20}
                  name="person" />

                <Text style={styles.text_button}>Change your nickname</Text>

                <AntDesign style={{ marginLeft: '34%' }}
                  size={17}
                  name="right" />

              </Button>

            </VStack>
          </View>

          <View>

            <View style={styles.section_view}></View>

            <Text style={styles.text_section}>Word Configuration</Text>

            <VStack space={3}
              marginLeft={'2%'}
              w={'95%'}>

              <Button type="outline"
                onPress={() => navigation.navigate('Add_word')}
                radius={50}
                raised
                buttonStyle={{
                  backgroundColor: '#2c2c2d',
                  borderColor: '#ab20fd'
                }}  >

                <MaterialIcons style={{ marginRight: '2%' }}
                  size={20}
                  name="add" />

                <Text style={styles.text_button}>Add more words</Text>

                <AntDesign style={{ marginLeft: '51%' }}
                  size={17}
                  name="right" />

              </Button>

              <Button type="outline"
                onPress={() => navigation.navigate('Change_word')}
                radius={50}
                raised
                buttonStyle={{
                  backgroundColor: '#2c2c2d',
                  borderColor: '#ab20fd'
                }} >

                <MaterialIcons style={{ marginRight: '2%' }}
                  size={20}
                  name="edit" />

                <Text style={styles.text_button}>Edit the words</Text>

                <AntDesign style={{ marginLeft: '55%' }}
                  size={17}
                  name="right" />

              </Button>

            </VStack>

          </View>

        </View>

      </ImageBackground>

    </SafeAreaView>
  );
}


