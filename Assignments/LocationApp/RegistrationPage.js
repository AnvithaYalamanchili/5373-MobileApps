import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegistrationPage = () => {
  const navigation = useNavigation();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSignUp = async () => {
    if (!first_name || !last_name || !email || !password || !mobile) {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address in the format "firstnamelastname@gmail.com".');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('http://137.184.121.175:8085/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          mobile
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully');
        navigation.navigate('LandingPage');
      } else {
        Alert.alert('Registration Failed', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('./assets/registration.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('./assets/icons8-registration-64.png')} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.firstname}
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
          value={first_name}
        />
        <TextInput
          style={styles.firstname}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
          value={last_name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email (firstnamelastname@gmail.com)"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.firstname}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.firstname}
          placeholder="Mobile"
          onChangeText={text => setMobile(text)}
          value={mobile}
          keyboardType="phone-pad"
        />
        <Button title="Sign Up" onPress={handleSignUp}>
          <Icon name="arrow-right" size={20} color="#fff" />
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 20,
  },
  firstname:{
width:300,
borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10
  }
});

export default RegistrationPage;
