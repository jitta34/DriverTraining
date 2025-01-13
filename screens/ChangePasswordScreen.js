import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,Image, Dimensions } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;


const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
 const navigation = useNavigation()
  const handleChangePassword = async () => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);
      setPasswordMatch(true);
      await user.updatePassword(newPassword);
      Alert.alert('Password changed successfully');
    } catch (error) {
      setPasswordMatch(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Change Password</Text> */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Change Password </Text>
      </View>
      <Text style={styles.intro}>Here you can change your password. Please enter your current password and your new password.</Text>
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder='Enter current password'
        placeholderTextColor='gray'
      />
      {passwordMatch === false && <Text style={styles.error}>Incorrect password</Text>}
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder='Enter new password'
        placeholderTextColor='gray'
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: width * 0.05,
  },
  title: {
    fontSize: isFoldable ? height * 0.039 :height * 0.033,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.018,
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: isFoldable ? height * 0.035 :height * 0.027,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable ? '20%' : '13%',
   
    color:'black'
   },
  intro: {
    fontSize: isFoldable ? height * 0.027 :height * 0.020,
    color: 'gray',
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
    alignSelf: 'center',
  },
  label: {
    fontSize: isFoldable ? height * 0.028 :height * 0.023,
    color: 'black',
    marginBottom: height * 0.01,
    fontWeight:'bold'
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#00008B',
    padding: 10,
    fontSize: isFoldable ? height * 0.022 :height * 0.018,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00008B',
    padding: 15,
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
    fontSize: isFoldable ? height * 0.029 :height * 0.020,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
});

export default ChangePasswordScreen;
