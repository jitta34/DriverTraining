import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet,Dimensions,  PermissionsAndroid, Image } from 'react-native';
import Contacts from 'react-native-contacts';
import {useRoute, useNavigation } from '@react-navigation/native'; 
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-input';

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;
const NewClientScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [importedContacts, setImportedContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const route = useRoute();
  const startTime = route.params?.startTime;
  const date = route.params?.date;


  const phoneRef = useRef(null);

  const handleSave = async () => {
    try {
      // Get the current user
      const user = auth().currentUser;

      // Save the new client to Firestore
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Clients')
        .add({
          name: name,
          mobile: mobile,
        });

      console.log('Client added!', { name, mobile });

      // Navigate back to CreateMeetings screen with the added client
      navigation.navigate('CreateMeetings',{ startTime, date }, { newClient: { name, mobile } });
    } catch (error) {
      console.error('Error adding client: ', error);
      Alert.alert('Error adding client', error.message);
    }
  };

  const importContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const contacts = await Contacts.getAll();
        setImportedContacts(contacts);
        setModalVisible(true);
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatPhoneNumber = (number) => {
    number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    if (!number.startsWith('+44')) {
      number = '+44' + number;
    }
    return number;
  };

  return (
    <View style={styles.container}>
    
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateMeetings')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}>New Client</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile phone number"
        onChangeText={(number) => setMobile(formatPhoneNumber(number))}
        value={mobile}
        placeholderTextColor='gray'
      />


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor='gray'
              onChangeText={(text) => setSearchText(text)}
            />
           
          </View>
        </View>
      </Modal>
    </View>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
   
    marginBottom: 7
  },
  header: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable ?'39%': '23%',
    color:'black'
   
  },
  


  headerText: {
    fontSize: height * 0.024,
    color: '#000',
    fontWeight: 'bold',
  },
  searchInput: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color:'black'
  },

  saveButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 15,
    width: '22%',
    alignItems:'center',
    marginLeft:'17%'
  },

  saveButtonText: {
    fontSize: height * 0.018,
    color: '#fff',
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color:'black'
  },

  importButton: {
    
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,

  },

  importButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  label: {
    margin: 8,
    color:'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contactContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default NewClientScreen;
