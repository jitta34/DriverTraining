import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image,Redirect, backHandler, Dimensions, Linking, KeyboardAvoidingView, ActivityIndicator, BackHandler } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation,  useFocusEffect  } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import the screens
import CollectionScreen from './CollectionScreen';
import NotesScreen from './NotesScreen';
import MeetScreen from './MeetScreen';
import ScheduledMeetingsScreen from './ScheduledMeetingsScreen';
import CreateMeetingScreen from './CreateMeetingsScreen';
import WriteNoteScreen from './WriteNoteScreen';
import FormListScreen from './FormListScreen';
import FormListScreen2 from './FormListScreen2';
import FormListTabNavigator from './FormListTabNavigator';
import MeetingDetailsScreen from './MeetingDetailsScreen';
import InstructionScreen from './InstructionScreen';



// Get the screen's width and height
const { width, height } = Dimensions.get('window');

const isFoldable = height >= 550 && height <= 790;
console.log("Device height:", height);
console.log("Is foldable:", isFoldable);

const icons = {
  drawer: require('../assets/drawer3.png'),
  moreOptions: require('../assets/hometab.png'),
  newNotes: require('../assets/notes.png'),
  meet: require('../assets/appointment.png'),
  collection: require('../assets/collection.png'),
  driving: require('../assets/driving.png'),
  scheduleMeetings: require('../assets/calendar.png'),
  addButton: require('../assets/drawer.png'),
  search: require('../assets/search.png'), // assuming you have a search icon
  instruction: require('../assets/unity.png')
};

const cardItems = [
  { id: 4, title: 'Schedule Meetings', icon: icons.scheduleMeetings },
  { id: 3, title: 'Driving Test', icon: icons.driving },
 
  { id: 1, title: 'New Notes', icon: icons.newNotes },
  { id: 2, title: 'Instruction Diagram', icon: icons.instruction },
  
 
];

const Tab = createBottomTabNavigator();

const HomeScreenContent = () => {
  const [userDetails, setUserDetails] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const checkPaymentStatus = async () => {
  //       const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
  //       const paymentCompleted = await AsyncStorage.getItem('paymentCompleted');
  //       if (userLoggedIn === 'true' && paymentCompleted !== 'true') {
  //         navigation.navigate('PaymentScreen'); // Redirect to Payment Screen if payment is not completed
  //       }
  //     };

  //     checkPaymentStatus();

  //     const backAction = () => {
  //       BackHandler.exitApp(); // Exit app if back button is pressed
  //       return true;
  //     };
    
  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction
  //     );
    
  //     return () => backHandler.remove();
  //   }, [navigation])
  // );



  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit app if back button is pressed
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();
  }, []);
  

  const handleCardPress = (id) => {
    setSelectedCard(id);
    // Show loader
    setLoader(true);
    setTimeout(() => {
      if (id === 1) { // assuming the id of 'New Notes' card is 1
        navigation.navigate('WriteNote'); // navigate to 'WriteNote'
      } else if (id === 3) { // assuming the id of 'Collection' card is 3
        navigation.navigate('UserDetailsScreen'); // navigate to 'Collection'
      } else if (id === 2) { // assuming the id of 'Meet' card is 2
        navigation.navigate('Instruction'); // navigate to 'Collection'
      } else if (id === 4) { 
        navigation.navigate('Calendar');
      }
      // Hide loader
      setLoader(false);
    }, 5); // assuming the delay is 2 seconds
  };
  
  // useEffect(() => {
  //   const user = auth().currentUser;
  //   if (user) {
  //     firestore()
  //       .collection('users')
  //       .doc(user.uid)
  //       .onSnapshot(documentSnapshot => {
  //         if (documentSnapshot.exists) {
  //           const userData = documentSnapshot.data();
  //           setUserDetails(userData);
  //           if (userData.imageUri) {
  //             setUserImage({ uri: userData.imageUri });
  //           }
  //         }
  //       });
  //   }
  // }, []);


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              const userData = documentSnapshot.data();
              setUserDetails(userData);
              if (userData.imageUri) {
                setUserImage({ uri: userData.imageUri });
              }
            }
          });
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={icons.drawer} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HOME</Text>
      </View>
      {/* Welcome Text */}
      <Text  style={styles.welcomeText} > Welcome {userDetails.firstName}!</Text>
      {/* Cards */}
      <View style={styles.cardsContainer}>
      {cardItems.map((item) => (
  <TouchableOpacity
    key={item.id}
    style={[
      styles.card,
      { backgroundColor: selectedCard === item.id ? 'darkblue' : 'white' },
    ]}
    onPress={() => handleCardPress(item.id)}
  >
    {loader && selectedCard === item.id ? (
      <ActivityIndicator size="large" color="#FFFFFF" /> // blue color loader
    ) : (
      <>
        <Image
          source={item.icon}
          style={[
            styles.cardIcon,
            { tintColor: selectedCard === item.id ? 'white' : 'black' },
          ]}
        />
        <Text style={{ color: selectedCard === item.id ? 'white' : 'black' }}>
          {item.title}
        </Text>
      </>
    )}
  </TouchableOpacity>
))}
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const HomeScreen = () => {
  
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? icons.moreOptions : icons.moreOptions;
          } else if (route.name === 'Collection') {
            iconName = focused ? icons.collection : icons.collection;
          } else if (route.name === 'Test Submitted') {
            iconName = focused ? icons.newNotes : icons.newNotes;
          } else if (route.name === 'Instruction') {
            iconName = focused ? icons.meet : icons.instruction;
          } else if (route.name === 'Meetings') {
            iconName = focused ? icons.scheduleMeetings : icons.scheduleMeetings;
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{  width:  isFoldable ? height * 0.0250: height * 0.0230,
            height: isFoldable ? height * 0.0270: height * 0.0230, tintColor: color }} />;
        },
        tabBarActiveTintColor: 'darkblue',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ]
      })}
>
    <Tab.Screen name="Home" component={HomeScreenContent} />
    <Tab.Screen name="Collection" component={CollectionScreen} />
    <Tab.Screen name="Test Submitted" component={FormListScreen2} />
    <Tab.Screen name="Instruction" component={InstructionScreen} />
   
</Tab.Navigator>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: width * 0.05,
    marginBottom: height * 0.03,
    backgroundColor: '#FFF',
  },
  icon: {
    // width: width * 0.0380,
    // height: height * 0.0359,
    width:  isFoldable ? height * 0.0300: height * 0.0230,
    height: isFoldable ? height * 0.0300: height * 0.0230,
  },
  headerTitle: {
    fontSize: isFoldable ? height * 0.0300: height * 0.0250,
    // fontSize: width * 0.0350,
    alignSelf: 'center',
    marginLeft: width * 0.32,
    color: '#434343',
  },
  welcomeText: {
    // fontSize: width * 0.035,
    fontSize: isFoldable ? height * 0.0300: height * 0.0250,
    marginTop: height * 0.05,
    alignSelf: 'flex-start',
    marginLeft: width * 0.05,
    color: '#434343',
    fontWeight: '700',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '92%',
    marginTop: height * 0.05,
    alignSelf: 'center',
  },
  card: {
    width: width * 0.42,
    height: height * 0.18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.04,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    width:  isFoldable ? height * 0.0300: height * 0.0230,
    height: isFoldable ? height * 0.0300: height * 0.0230,
    marginBottom: height * 0.04,
  },
});


export default HomeScreen;