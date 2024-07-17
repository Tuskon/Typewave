import { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, LogBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Image } from 'expo-image';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Dimensions } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

export function Home() {
  const [fontsLoaded] = useFonts({
    'Play-Bold': require('../../assets/fonts/Play-Bold.ttf'),
    'Play-Regular': require('../../assets/fonts/Play-Regular.ttf'),
    'PixelifySans-Bold': require('../../assets/fonts/PixelifySans-Bold.ttf'),
    'PixelifySans-Medium': require('../../assets/fonts/PixelifySans-Medium.ttf'),
    'PixelifySans-Regular': require('../../assets/fonts/PixelifySans-Regular.ttf'),
    'PixelifySans-SemiBold': require('../../assets/fonts/PixelifySans-SemiBold.ttf'),
    'PixelifySans-VariableFont_wght': require('../../assets/fonts/PixelifySans-VariableFont_wght.ttf'),
    'VT323-Regular': require('../../assets/fonts/VT323-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const navigation = useNavigation<StackTypes>();

  const handleLogin = async () => {

    navigation.navigate('Login')

  };

  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text_view: {
      marginTop: height * 0.06,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button_view: {
      marginTop: height * 0.54,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#0553',
    },
    text_type: {
      color: '#ab20fd',
      fontSize: 55,
      fontFamily: "PixelifySans-SemiBold",
      textShadowColor: 'blue',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1.5
    },
    button: {
      borderColor: '#ab20fd',
      borderWidth: 1.5,
      backgroundColor: '#141414',
      width: width * 0.7,
    },
    buttonTitle: {
      color: '#7d12ff',
      fontSize: 20,
      fontFamily: "PixelifySans-Regular"
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../../assets/images/Theme.gif')}>
        <View style={styles.text_view}>
          <Text style={styles.text_type}>TypeWave</Text>
          <Text style={styles.text_type}>Mania</Text>
        </View>
        <View style={styles.button_view}>
          <Button
            title={"Let's Rock!"}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={handleLogin}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
