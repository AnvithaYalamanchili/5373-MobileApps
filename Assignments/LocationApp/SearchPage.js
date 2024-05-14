import React, { useState } from 'react';
import { View, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState(null);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newRegion = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(newRegion);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      source={require('./assets/Map.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={region} 
        >
          {region && (
            <Marker coordinate={region} title="Searched Location" />
          )}
        </MapView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            
            value={location}
            onChangeText={setLocation}
            color="black"
          />
          <Button style={styles.searchButton} title="Search" onPress={handleSearch} />
        </View>
        <View style={styles.menuBar}>
          
          <TouchableOpacity onPress={() => handleNavigation('MapPage')} style={styles.menuButton}>
            <Ionicons name="location" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('ChatPage')} style={styles.menuButton}>
            <Ionicons name="chatbubbles" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('CameraPage')} style={styles.menuButton}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  
  searchContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '70%', // Adjust width as needed
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20, // Adjust border radius as needed
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    color: 'black', // Text color
    fontSize: 16, // Font size
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').height - 50, // Adjust for search input height
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SearchPage;
