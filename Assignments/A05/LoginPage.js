import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {useTailwind} from 'tailwind-rn';

const LoginPage = () => {
  const tailwind = useTailwind();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    // Example POST request to your FastAPI backend
    fetch('https://137.184.121.175/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      <TextInput
        style={tailwind('border border-gray-300 p-2 rounded mb-4')}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={tailwind('border border-gray-300 p-2 rounded mb-4')}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

export default LoginPage;
