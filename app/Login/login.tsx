import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, LogBox, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { store_username, store_email } from '../../Session'
import config from "../../backend/config/config";
import { useForm, Controller } from 'react-hook-form';
import { Input, Icon, useToast } from 'native-base';
import { Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export function Login() {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = React.useState(false);
  const toast = useToast()
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

  const { control, handleSubmit } = useForm();

  const { height } = Dimensions.get('window');

  const navigation = useNavigation<StackTypes>();

  const handleLogin = async () => {


    if (!email || !password) {

      toast.show({
        description: "Fill in all fields",
        duration: 3500,
        bg: 'danger.500',
        px: '2',
        py: '2',
        rounded: 10
      })
    } 

    try {
      const querryParams = new URLSearchParams({ email, password }).toString();

      let response = await fetch(config.urlRootRoute + `/users/FindOne?${querryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      let status = response.status

      let data = await response.json()

      if (status == 200) {

        store_username(data.username)
        store_email(data.email)
        navigation.navigate('Selection')

        toast.show({
          description: "Authenticated user",
          duration: 1500,
          bg: 'emerald.500',
          px: '2',
          py: '2',
          rounded: 10
        })


      } else if (status == 404) {
        toast.show({
          description: "User not found",
          duration: 3500,
          bg: 'danger.500',
          px: '2',
          py: '2',
          rounded: 10
        })


      } else {

        toast.show({
          description: `${JSON.parse(data)}`,
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


  };

  const handleSignup = async () => {

    navigation.navigate('SignUp')

  }

  const handlPassword = async () => {

    navigation.navigate('Change_password')

  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    container2: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
    },
    text_view: {
      marginTop: '15%',
      justifyContent: 'center',
      alignItems: 'center',

    },
    login_view: {
      backgroundColor: '#242424',
      marginTop: '21%',
      width: '88%',
      height: height * 0.56,
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
      marginTop: '6%',
      marginLeft: '5%'
    },
    link_view: {
      marginTop: '3%',
      marginLeft: '33%'
    },
    button_view: {
      marginTop: '3%',
    },
    signup_view: {
      flexDirection: 'row',
      marginLeft: '17%',
      position: 'relative',
      bottom: '7%'
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
    },
    text_link2: {
      color: '#7d12ff',
      fontSize: 14,
      fontFamily: "PixelifySans-Regular",
    }
  });

  return (

    <KeyboardAvoidingView behavior="padding" style={styles.container}>

      <ImageBackground style={styles.image}
        source={require('../../assets/images/Theme.gif')}>
        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.text_view}>
            <Text style={styles.text_login}>Login</Text>

          </View>

          <View style={styles.login_view}>

            <View style={styles.welcome_view} >
              <Text style={styles.text_welcome}>Welcome</Text>
              <Text style={styles.text_welcome}>Back!</Text>
            </View>



            <View style={styles.form_view}>

              <Controller
                control={control}
                name="email"
                render={({ }) => (

                  <Input
                    onChangeText={(text) => setEmail(text)}
                    fontSize={'md'}
                    fontFamily={'PixelifySans-Regular'}
                    color={'white'}
                    variant={'rounded'}
                    height={"21%"}
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
                    onChangeText={(text) => setPassword(text)}
                    fontSize={'md'}
                    fontFamily={'PixelifySans-Regular'}
                    color={'white'}
                    marginTop={"4%"}
                    variant={'rounded'}
                    height={"21%"}
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

              <View style={styles.link_view}>

                <Pressable onPress={handlPassword}>
                  {({ pressed }) => (
                    <Text style={{
                      color: '#67696A',
                      fontSize: 14,
                      fontFamily: "PixelifySans-Regular",
                      transform: [{ scale: pressed ? 0.93 : 1 }]
                    }}>Forgot your Password ?</Text>
                  )}
                </Pressable>

              </View>

              <View style={styles.button_view}>

                <Button title={"Login"}
                  onPress={handleLogin}
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
                ></Button>

              </View>

            </View>

            <View>

              <View style={styles.signup_view}>

                <Text style={styles.text_link}>Don't have an account?</Text>

                <Pressable onPress={handleSignup} >
                  {({ pressed }) => (
                    <Text style={{
                      color: '#7d12ff',
                      fontSize: 14,
                      fontFamily: "PixelifySans-Regular",
                      transform: [{ scale: pressed ? 0.93 : 1 }]
                    }}> Sign Up</Text>
                  )}
                </Pressable>

              </View>

            </View>

          </View>

        </ScrollView>

      </ImageBackground>

    </KeyboardAvoidingView>

  );
}


