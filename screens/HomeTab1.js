import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert, ScrollView, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import{launchImageLibrary} from 'react-native-image-picker'

const HomeTab1 = ({ navigation }) => {
  const[profileImage, setProfileImage]=useState(null)
const selectImage = () => {
  launchImageLibrary(
  {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 300,
  quality: 0.7,
  },
  (response) => {
  if (response.didCancel) {
  Alert.alert('Cancelled', 'Image selection was cancelled');
  } else if (response.errorMessage) {
  Alert.alert('Error', response.errorMessage);
  } else {
  const { uri } = response.assets[0];
  setProfileImage(uri);
  }
  }
  );
 };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        navigation.navigate('Login'); // Navigate to Login if no session is found
      } else {
        firebase.auth().onAuthStateChanged((user) => {
          setUser(user);
          console.log('User email: ', user?.email);
        });
      }
    };

    checkUserSession();
  }, [navigation]);

  // const handleLogOut = async () => {
  //   console.log('Clicked Logout');
  //   auth()
  //     .signOut()
  //     .then(async () => {
  //       console.log('User signed out!');
  //       await AsyncStorage.clear();
  //       navigation.navigate('Login');
  //     })
  //     .catch((error) => {
  //       console.error('Logout Error:', error.message);
  //     });
  // };

  return (
  
    <View style={styles.container}>
       <TouchableOpacity onPress={selectImage}>
  <Image source={profileImage? {uri:profileImage}:require('../assets/defaultimage.png')} style={styles.carstyle}/> 
  </TouchableOpacity>
  <View style={styles.textContainer}>

  </View>
      <Text style={styles.title}>Welcome, {user?.displayName || user?.email || 'Guest'}</Text>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/drawer.png')} style={styles.drawerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Screen1')}>
          <Image source={require('../assets/blog.jpeg')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>blog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Screen2')}>
          <Image source={require('../assets/notepad.jpeg')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>Note Pad</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PdfListScreen')}>
          <Image source={require('../assets/highway_code.jpeg')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>highway Code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Screen4')}>
          <Image source={require('../assets/video1.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>Video Tutorials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PdfListScreen')}>
          <Image source={require('../assets/q&a.jpg')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>Q & A</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Screen6')}>
          <Image source={require('../assets/core.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>           Core Compentencies</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007BFF',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    width: '40%',
    alignItems: 'center',
    elevation: 15, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginTop: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carstyle: {
    resizeMode: 'center',
    width: 350,
    height: 150
  },
});

export default HomeTab1;