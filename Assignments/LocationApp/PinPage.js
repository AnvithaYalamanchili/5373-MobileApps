import React from 'react';
import { View, Text } from 'react-native';

const OtherPage = ({ route }) => {
  const { coordinates } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Coordinates Received:</Text>
      <Text>Latitude: {coordinates.latitude}</Text>
      <Text>Longitude: {coordinates.longitude}</Text>
    </View>
  );
};

export default OtherPage;
