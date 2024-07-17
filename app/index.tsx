import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StackNavigation } from './StackNavigation';

export default function App() {
  return (
    <NativeBaseProvider>

        <StackNavigation />
 
    </NativeBaseProvider>
  );
}
