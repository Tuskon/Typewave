import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './home/home';
import { Settings } from './SettingsPaste/settings';
import { Login } from './Login/login';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignUp } from './SignUp/signup';
import { Selection } from './Selection/selection';
import { Play } from './Play/play';
import { Change_user } from './Account_Changes/change_user';
import { Change_password } from './Account_Changes/change_password';
import { Add_word } from './Words_Changes/add_word';
import { Change_word } from './Words_Changes/change_word';

const Stack = createStackNavigator();

type StackNavigation = { 

  Home: undefined;
  Login: undefined;
  Settings: undefined;
  SignUp: undefined;
  Selection: undefined;
  Play: undefined;
  Change_user: undefined;
  Change_password: undefined;
  Add_word: undefined;
  Change_word: undefined;
  

};

export type StackTypes = NativeStackNavigationProp<StackNavigation>

export function StackNavigation() {
  return (
  
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
      <Stack.Screen options={{ headerShown: false }} name="Settings" component={Settings} />
      <Stack.Screen options={{ headerShown: false }} name="Selection" component={Selection} />
      <Stack.Screen options={{ headerShown: false }} name="Play" component={Play} />
      <Stack.Screen options={{ headerShown: false }} name="Change_user" component={Change_user} />
      <Stack.Screen options={{ headerShown: false }} name="Change_password" component={Change_password} />
      <Stack.Screen options={{ headerShown: false }} name="Add_word" component={Add_word} />
      <Stack.Screen options={{ headerShown: false }} name="Change_word" component={Change_word} />
    </Stack.Navigator>
  
  );
}
