import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from './stylesLanding';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function LandingPage() {
  const navigation = useNavigation();

  const onLogin = () => {
    navigation.navigate('LoginPage');
  };

  const onRegister = () => {
    navigation.navigate('RegistrationPage');
  };

  return (
    <ImageBackground
      source={require('./assets/locationBackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.welcome} >Welcome to LocShare!!</Text>
          </View>
          
        
        <View style={styles.container2}>
      
          
          <Text style={styles.peers}></Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          <TouchableOpacity onPress={onLogin} style={styles.customButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.register}>
          <Text style={styles.newHere}>New User?</Text>
          <TouchableOpacity onPress={onRegister} >
            <Text style={{textDecorationLine:'underline',color:'white',fontSize:20}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
