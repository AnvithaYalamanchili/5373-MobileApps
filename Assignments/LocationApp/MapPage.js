import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const userLocations = [
  { id: 1, latitude: 37.7749, longitude: -122.4194, timestamp: new Date() },
  { id: 2, latitude: 34.0522, longitude: -118.2437, timestamp: new Date() },
  { id: 3, latitude: 40.7128, longitude: -74.0060, timestamp: new Date() },
  { id: 4, latitude: 33.9137, longitude: -98.4934, timestamp: new Date() },
  { id: 5, latitude: 51.5074, longitude: -0.1278, timestamp: new Date() },
];

const users = [
  { id: 1, firstName: 'Anvitha', lastName: 'Yalamanchili' },
  { id: 2, firstName: 'SaiTejaswi', lastName: 'Kondapally' },
  { id: 3, firstName: 'Poojitha', lastName: 'Mutyala' },
  { id: 4, firstName: 'Ravi', lastName: 'Teja' },
  { id: 5, firstName: 'Rahul', lastName: 'Kumar' },
];

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    })();
  }, []);

  const navigateToChatPage = () => {
    navigation.navigate('ChatPage');
  };

  const navigateToSearchPage = () => {
    navigation.navigate('SearchPage');
  };

  const navigateToCameraPage = () => {
    navigation.navigate('CameraPage');
  };

  const navigateToUserProfile = (user) => {
    // Navigate to the user profile page with the user information
    // For example:
    // navigation.navigate('UserProfilePage', { userId: user.id });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.9137,
          longitude: -98.4934,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="Your Location"
            pinColor="blue" // Change pin color to differentiate from other markers
          />
        )}

        {userLocations.map(location => {
          const user = users.find(user => user.id === location.id);
          return (
            <Marker
              key={location.id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={`${user.firstName} ${user.lastName}`}
              onPress={() => navigateToUserProfile(user)}
            >
              <Callout>
                <View>
                  <Text>{user.firstName} {user.lastName}</Text>
                  <Text>Timestamp: {location.timestamp.toString()}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToSearchPage}>
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.menuText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToChatPage}>
          <Ionicons name="chatbubble" size={24} color="white" />
          <Text style={styles.menuText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToCameraPage}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.menuText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default MapPage;
