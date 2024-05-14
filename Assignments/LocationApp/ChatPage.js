import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import EmojiSelector from 'react-native-emoji-selector';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiModal, setShowEmojiModal] = useState(false); 
  const navigation = useNavigation();

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { id: messages.length.toString(), text: message, sentByUser: true }]);
      setMessage('');
    }
  };

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji);
  };

  return (
    <ImageBackground source={require('./assets/chatBg.webp')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => handleNavigation('MapPage')} style={styles.menuButton}>
            <Ionicons name="location" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('CameraPage')} style={styles.menuButton}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('SearchPage')} style={styles.menuButton}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.sentByUser ? styles.sentMessage : styles.receivedMessage]}>
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShowEmojiModal(true)}>
            <Ionicons name="happy-outline" size={24} color="white" style={styles.smileyIcon} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { color: 'white' }]} 
            placeholder="Type a message..."
            placeholderTextColor="white"
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
        {/* Modal for displaying emojis */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showEmojiModal}
          onRequestClose={() => setShowEmojiModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <EmojiSelector onEmojiSelected={handleEmojiSelect} />
              <Button title="Close" onPress={() => setShowEmojiModal(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '105%',
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
  content: {
    marginTop: 50, // Adjusted marginTop to account for the menu bar
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#EEEEEE',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Background color with transparency
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 15, // Adjusted padding
  },
  input: {
    flex: 1,
    color: 'white',
    marginLeft: 10, // Adjusted margin
  },
  smileyIcon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});

export default ChatPage;
