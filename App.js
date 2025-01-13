import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import HomeTab1 from './screens/HomeTab1';
import HomeTab2 from './screens/HomeTab2';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import Screen5 from './screens/Screen5';
import Screen6 from './screens/Screen6';
import PdfListScreen from './screens/PdfListScreen';
import HighwayCodeScreen from './screens/Screen3';
import SavedNoteScreen from './screens/SavedNoteScreen';
import WriteNoteScreen from './screens/Screen2';
import NotesScreen from './screens/NotesScreen';
import CollectionScreen from './screens/CollectionScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HelpScreen from './screens/HelpScreen';
import SettingsScreen from './screens/SettingScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import auth from '@react-native-firebase/auth';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Items
const drawerItems = [
 
  { name: 'Blog', icon: require('./assets/blog.jpeg'), target: 'Screen1' },
  { name: 'Note Pad', icon: require('./assets/notepad.jpeg'), target: 'Screen2' },
  { name: 'Q & A', icon: require('./assets/q&a.jpg'), target: 'Screen3' },
  { name: 'Video Tutorials', icon: require('./assets/video1.png'), target: 'Screen4' },
  {name: 'Help & Support',icon: require('./assets/helpme.png'),target: 'HelpScreen',},
  {name: 'Settings',icon: require('./assets/settings.jpg'),target: 'SettingsScreen',},
  {name: 'Settings',icon: require('./assets/settings.jpg'),target: 'RecipeDetailsScreen',},
  {name: 'Settings',icon: require('./assets/settings.jpg'),target: 'CartScreen',},
  {name: 'Settings',icon: require('./assets/settings.jpg'),target: 'CheckoutScreen',},
];


// Custom Drawer Content
const CustomDrawerContent = ({ navigation }) => {
  const [user, setUser]= useState(null)
  const handleLogOut = async () => {
    console.log('Clicked Logout');
    auth()
      .signOut()
      .then(async () => {
        console.log('User signed out!');
        await AsyncStorage.clear();
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Logout Error:', error.message);
      });
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image source={require('./assets/house.png')} style={styles.profileImage} />
        <Text style={styles.userName}>Welcome, {user?.displayName || user?.email || 'Guest'}</Text>
      </View>
      <View style={styles.drawerItems}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate(item.target)}
          >
            <Image source={item.icon} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>{item.name}</Text>
          </TouchableOpacity>
          
        ))}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};


const HomeNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={HomeTab1} options={{ headerShown: false }}  />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Null to show loading initially

  // Check login state from AsyncStorage
  useEffect(() => {
    const checkLoginState = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true'); // Set state based on login status
    };

    checkLoginState();
  }, []);

  // Show a loading screen while checking login state
  if (isLoggedIn === null) {
    return null; // Or show a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignupScreen}
          name="Signup"
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          component={HomeTab1}
          name="HomeTab1"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={HomeTab2}
          name="HomeTab2"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Screen1}
          name="Screen1"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Screen2}
          name="Screen2"
          options={{ headerShown: false }}
        />
         <Stack.Screen
          component={Screen3}
          name="Screen3"
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
        component={Screen4}
        name="Screen4"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={Screen5}
        name="Screen5"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={Screen6}
        name="Screen6"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={PdfListScreen}
        name="PdfListScreen"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={HighwayCodeScreen}
        name="HighwayCodeScreen"
        options={{ headerShown: false }}
      />
        <Stack.Screen
        component={SavedNoteScreen}
        name="SavedNoteScreen"
        options={{ headerShown: false }}
      />
        <Stack.Screen
        component={WriteNoteScreen}
        name="WriteNoteScreen"
        options={{ headerShown: false }}
      />
        <Stack.Screen
        component={NotesScreen}
        name="NotesScreen"
        options={{ headerShown: false }}
      /> 
       <Stack.Screen
        component={CollectionScreen}
        name="CollectionScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Home" 
      component={HomeNavigator} 
      options={{ headerShown: false }} 
      />
         <Stack.Screen 
      name="HelpScreen" 
      component={HelpScreen} 
      options={{ headerShown: false }} 
      />
          <Stack.Screen 
      name="SettingScreen" 
      component={SettingsScreen} 
      options={{ headerShown: false }} 
      />
            <Stack.Screen 
      name="ChangePasswordScreen" 
      component={ChangePasswordScreen} 
      options={{ headerShown: false }} 
      />
            <Stack.Screen 
      name="RecipeDetailsScreen" 
      component={RecipeDetailsScreen} 
      options={{ headerShown: false }} 
      />
             <Stack.Screen 
      name="CartScreen" 
      component={CartScreen} 
      options={{ headerShown: false }} 
      />
               <Stack.Screen 
      name="CheckoutScreen" 
      component={CheckoutScreen} 
      options={{ headerShown: false }} 
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  drawerHeader: {
    backgroundColor: '#007BFF',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItems: {
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  drawerIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  drawerText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    marginTop: 250,
    marginRight: 150,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;