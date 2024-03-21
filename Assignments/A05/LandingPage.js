import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const LandingPage = ({navigation}) => {
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PaperApp!</Text>
      <Button icon="login" mode="contained" onPress={handleLoginPress}>
        Login
      </Button>
      <Button
        icon="account-plus"
        mode="contained"
        onPress={() => console.log('Register')}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LandingPage;
