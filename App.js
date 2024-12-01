import React, {useState, useEffect} from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import GetStartedScreen from './components/GetStartedScreen';
import HomeScreen from './components/HomeScreen'; // assuming HomeScreen.js is in the same directory
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import CreateMeetingScreen from './components/CreateMeetingsScreen';
import WriteNoteScreen from './components/WriteNoteScreen';
import CollectionScreen from './components/CollectionScreen';
import SubscriptionScreen from './components/SubscriptionScreen';
import {withIAPContext} from 'react-native-iap';
import RNIap from 'react-native-iap';
import AddCardScreen from './components/AddCardScreen';
import PaymentSuccessScreen from './components/PaymentSuccessScreen';
import MeetScreen from './components/MeetScreen';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import NoteScreen from './components/NotesScreen';
import AllUsersScreen from './components/AllUsersScreen';
import SavedNoteScreen from './components/SavedNoteScreen';
import UserScreen from './components/UserScreen';
import storage from '@react-native-firebase/storage';
import ScheduleMeetingScreen from './components/ScheduledMeetingsScreen';
import CalendarScreen from './components/CalendarScreen';
import DrivingTestScreen from './components/DrivingTestScreen';
import DrivingTestForm from './components/DrivingTestForm';
import ImportContactsScreen from './components/ImportContactsScreen';
import AddClientScreen from './components/AddClientScreen';
import NewClientScreen from './components/NewClientScreen';
import DriveForm2 from './components/DriveForm2';

import UserDetailsScreen from './components/UserDetailsScreen';
import FormListScreen from './components/FormListScreen';
import FormListScreen2 from './components/FormListScreen2';
import FormListScreen3 from './components/FormListScreen3';
import FormListTabNavigator from './components/FormListTabNavigator';
import DriveForm3 from './components/DriveForm3';
import SettingsScreen from './components/SettingsScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import PaymentScreen from './components/PaymentScreen';
import {SP_KEY} from '@env';
import Payment from './components/payment';
import PaymentSheet from './components/PaymentSheet';
import GpayScreen from './components/GpayScreen';
import InstructionScreen from './components/InstructionScreen';
import HelpScreen from './components/HelpScreen';
import MeetingDetails from './components/MeetingDetails';
import SendSmsScreen from './components/SendSmsScreen';
import EditSmsScreen from './components/EditSmsScreen';
import EditSmsTemplateScreen from './components/EditSmsTemplateScreen';
import SmsTemplateScreen from './components/SmsTemplateScreen';
import Paywall from './src/screen/paywall';
import RecipeDetail from './src/screen/RecipeDetail';
import ProgressReportScreen from './components/ProgressReportScreen';
import CreateProgressReportScreen from './components/CreateProgressReportScreen';
import ProgressDetailsScreen from './components/ProgressDetailsScreen';
import EditProgressReportScreen from './components/EditProgressReportScreen';

const {width, height} = Dimensions.get('window');

const isFoldable = height >= 550 && height <= 900;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const drawerItems = [
  {
    name: 'Schedule Meetings',
    icon: require('./assets/drawercad.png'),
    target: 'Calendar',
  },
  {name: 'Notes', icon: require('./assets/notes.png'), target: 'WriteNote'},
  {
    name: 'Instruction Diagram',
    icon: require('./assets/unity.png'),
    target: 'Instruction',
  },
  {
    name: 'Driving Test Forms',
    icon: require('./assets/subscribe.png'),
    target: 'UserDetailsScreen',
  },
  {
    name: 'Settings',
    icon: require('./assets/settingsdrawer.png'),
    target: 'SettingsScreen',
  },
  {
    name: 'Help & Support',
    icon: require('./assets/support.png'),
    target: 'HelpScreen',
  },
  {
    name: 'SMS template',
    icon: require('./assets/sms2.png'),
    target: 'SmsTemplateScreen',
  },
];

const CustomDrawerContent = props => {
  const [userDetails, setUserDetails] = useState({});
  const [userImage, setUserImage] = useState(
    require('./assets/defaultimg.png'),
  );

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
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              const userData = documentSnapshot.data();
              setUserDetails(userData);
              if (userData.imageUri) {
                setUserImage({uri: userData.imageUri});
              }
            }
          });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        console.log('User signed out!');
        await AsyncStorage.setItem('userLoggedIn', 'false');
        props.navigation.navigate('SIGN IN');
      });
  };

  // const handleLogout = async () => {
  //   const user = auth().currentUser;
  //   if (user) {
  //     auth()
  //       .signOut()
  //       .then(async () => {
  //         console.log('User signed out!');
  //         await AsyncStorage.setItem('userLoggedIn', 'false');
  //         props.navigation.navigate('SIGN IN');
  //       });
  //   } else {
  //     console.log('No user is currently signed in');
  //   }
  // };

  // const handleLogout = async () => {
  //   auth()
  //     .signOut()
  //     .then(async () => {
  //       console.log('User signed out!');
  //       await AsyncStorage.setItem('userLoggedIn', 'false');
  //       props.navigation.navigate('SIGN IN');
  //     });
  // };

  return (
    <View style={{flex: 1}}>
      {/* User Details */}
      {/* <TouchableOpacity onPress={() => props.navigation.navigate('UserScreen')}> */}
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
        {/* <Image source={userImage} style={{ width: 50, height: 50, borderRadius: 40 }} /> */}
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: isFoldable ? height * 0.025 : height * 0.022,
              color: '#0C0B32',
            }}>
            {userDetails.firstName} {userDetails.lastName}
          </Text>
          <Text
            style={{
              fontSize: isFoldable ? height * 0.02 : height * 0.016,
              color: 'gray',
            }}>
            {auth().currentUser ? auth().currentUser.email : ''}
          </Text>
        </View>
      </View>
      {/* </TouchableOpacity> */}
      {/* Drawer Items */}
      <View style={{marginVertical: 20}}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
              marginTop: 10,
            }}
            onPress={() => props.navigation.navigate(item.target)}>
            <Image
              source={item.icon}
              style={{width: 21, height: 21, marginRight: 15, marginLeft: 12}}
            />
            <Text
              style={{
                fontSize: isFoldable ? height * 0.02 : height * 0.018,
                color: '#434343',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: isFoldable ? '0%' : '8%',
          left: 0,
          right: 150,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          flexDirection: 'row',
        }}
        onPress={handleLogout}>
        <Image
          source={require('./assets/logout.png')}
          style={{
            width: isFoldable ? 17 : 20,
            height: isFoldable ? 15 : 18,
            marginRight: 5,
          }}
        />
        <Text
          style={{
            fontSize: isFoldable ? height * 0.02 : height * 0.018,
            color: '#434343',
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeDrawer"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');

      if (userLoggedIn === 'true') {
        setInitialRoute('Home');
      } else {
        setInitialRoute('SIGN IN');
      }
      setLoading(false);
    };

    checkUserStatus();
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    );
  }

  return (
    <StripeProvider publishableKey="pk_test_51P9pziDS51rv9vSETIN8B4jYyFlwGYUGygNrdFQPpq4PGkfn4wAQNVcQodzeymQbiEEGFGKaZTU1ivVLym3d8cZg00NTZl9KAu">
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="SIGN IN"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Paywall"
            component={Paywall}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Recipe-detail" component={RecipeDetail} />
          <Stack.Screen
            name="SIGN UP"
            component={SignupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCardScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SmsTemplateScreen"
            component={SmsTemplateScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditSmsTemplateScreen"
            component={EditSmsTemplateScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateMeetings"
            component={CreateMeetingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotesScreen"
            component={NoteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SavedNote"
            component={SavedNoteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddClient"
            component={AddClientScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SendSms"
            component={SendSmsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditSms"
            component={EditSmsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NewClient"
            component={NewClientScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScheduleMeeting"
            component={ScheduleMeetingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserScreen"
            component={UserScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AllUsers"
            component={AllUsersScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentSuccess"
            component={PaymentSuccessScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Meet"
            component={MeetScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GpayScreen"
            component={GpayScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentSheet"
            component={PaymentSheet}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FormListTabNavigator"
            component={FormListTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FormList3"
            component={FormListScreen3}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FormList2"
            component={FormListScreen2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="FormList"
            component={FormListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HelpScreen"
            component={HelpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserDetailsScreen"
            component={UserDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MeetingDetails"
            component={MeetingDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DriveForm2"
            component={DriveForm2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DriveForm3"
            component={DriveForm3}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DrivingTest"
            component={DrivingTestScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ImportContacts"
            component={ImportContactsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Instruction"
            component={InstructionScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CollectionScreen"
            component={CollectionScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Subscription"
            component={SubscriptionScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DrivingTestForm"
            component={DrivingTestForm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WriteNote"
            component={WriteNoteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetStartedScreen"
            component={GetStartedScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProgressReport"
            component={ProgressReportScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateProgressReport"
            component={CreateProgressReportScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProgressDetails"
            component={ProgressDetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProgressReport"
            component={EditProgressReportScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default withIAPContext(App);
