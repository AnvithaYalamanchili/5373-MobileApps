import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage'; 
import RegistrationPage from './RegistrationPage';
import MapPage from './MapPage';
import SearchPage from './SearchPage';
import ChatPage from './ChatPage';
import CameraPage from './CameraPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage}/>
        <Stack.Screen name="MapPage" component={MapPage}/>
        <Stack.Screen name="SearchPage" component={SearchPage}/>
        <Stack.Screen name="ChatPage" component={ChatPage}/>
        <Stack.Screen name="CameraPage" component={CameraPage}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
  
}