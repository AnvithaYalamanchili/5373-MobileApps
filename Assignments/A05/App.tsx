import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import {Provider as PaperProvider} from 'react-native-paper';
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Registration">
          <Stack.Screen name="Registration" component={LandingPage} />
          <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
