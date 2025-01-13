import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Dimensions, Modal, Alert, TextInput } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const SettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editUsernameVisible, setEditUsernameVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const openEditUsernameModal = () => {
    setEditUsernameVisible(true);
  };

  const closeEditUsernameModal = () => {
    setEditUsernameVisible(false);
  };

  const handlePasswordChange = () => {
    // Navigate to the Change Password screen
    navigation.navigate('ChangePassword');
  };
  
  const handleAccountDeletion = async () => {
    const user = auth().currentUser;
    if (!user) {
      console.error('No user is currently logged in.');
      Alert.alert('Error', 'No user is currently logged in.');
      return;
    }
  
    try {
      const userId = user.uid;
  
      // Delete user account
      await user.delete();
  
      // Delete user data from Firestore
      await firestore().collection('users').doc(userId).delete();
      console.log('User account deleted from Firestore!');
  
      // Clear AsyncStorage
      await AsyncStorage.removeItem('userLoggedIn');
      await AsyncStorage.removeItem('customerId');
  
      console.log('User account completely deleted!');
      navigation.navigate('SIGN IN');
    } catch (error) {
      console.error('Error deleting user account: ', error);
      if (error.code === 'auth/user-not-found') {
        console.error('User account not found.');
        Alert.alert('Error', 'User account not found.');
      } else {
        Alert.alert('Error', 'There was an error deleting your account. Please try again.');
      }
    }
  };
  
  
  
  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleUpdateUsername = async () => {
    const user = auth().currentUser;
    if (!user) {
      console.error('No user is currently logged in.');
      Alert.alert('Error', 'No user is currently logged in.');
      return;
    }

    try {
      const userId = user.uid;
      await firestore().collection('users').doc(userId).update({
        firstName: firstName,
        lastName: lastName,
      });
      console.log('Username updated in Firestore!');
      Alert.alert('Success', 'Your username has been updated.');
      closeEditUsernameModal();
    } catch (error) {
      console.error('Error updating username: ', error);
      Alert.alert('Error', 'There was an error updating your username. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
          <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}> Settings</Text>
      </View>
      {/* <Text style={styles.title}>Settings</Text> */}
      <Text style={styles.intro}>Manage your account settings</Text>
      <Text style={styles.description}>Here you can change your password or delete your account. Please note that deleting your account is irreversible and will result in the loss of all your data.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openEditUsernameModal}>
        <Text style={styles.buttonText}>Edit Username</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your account? This action cannot be undone.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleAccountDeletion}>
                <Text style={styles.textStyle}>Yes, Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={closeModal}>
                <Text style={styles.textStyle}>No, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editUsernameVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEditUsernameVisible(!editUsernameVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Username</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="black"
              onChangeText={setFirstName}
              value={firstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="black"
              onChangeText={setLastName}
              value={lastName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleUpdateUsername}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={closeEditUsernameModal}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: width * 0.05,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: isFoldable ? height * 0.039 :height * 0.033,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable ? '30%' : '20%',
    color:'black'
  },
  title: {
    fontSize: isFoldable ? height * 0.030 :height * 0.020,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.018,
    alignSelf: 'center',
  },
  intro: {
    fontSize: isFoldable ? height * 0.030 :height * 0.022,
    color: 'black',
    marginBottom: height * 0.05,
    alignSelf: 'center',
  },
  description: {
    fontSize: isFoldable ? height * 0.024 :height * 0.018,
    color: 'gray',
    marginBottom: height * 0.05,
    alignSelf: 'center',
  },
  button: {
    padding: height * 0.015,
    borderRadius: 5,
    marginBottom: height * 0.04,
    borderWidth: 2,
    borderColor: '#00008B',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#00008B',
    fontSize: isFoldable ? height * 0.028 :height * 0.022,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'black',
    fontSize: 17,
    fontWeight:'bold'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonClose: {
    backgroundColor: "white",
    width: '45%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    color:'black'
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default SettingsScreen;
