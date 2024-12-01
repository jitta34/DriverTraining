import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import {
  PlatformPayButton,
  PlatformPay,
  StripeProvider,
  usePlatformPay,
  isPlatformPaySupported,
} from '@stripe/stripe-react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {CardField, useStripe} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const API_URL = 'http://54.79.225.162:4002';

const isFoldable = height >= 550 && height <= 720;

const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [loading, setLoading] = useState(false);

  const {isPlatformPaySupported, confirmPlatformPayPayment} = usePlatformPay();

  const [isApplePaySupported, setIsApplePaySupported] = useState(false);

  useEffect(() => {
    (async function () {
      setIsApplePaySupported(await isPlatformPaySupported());
    })();
  }, [isPlatformPaySupported]);

  const createSubscription = async () => {
    const response = await fetch(`${API_URL}/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const {subscription, client_secret} = await response.json();

    return {subscription, client_secret};
  };

  const pay = async () => {
    try {
      const {subscription, client_secret} = await createSubscription();
      if (!subscription || !client_secret) {
        console.error('No subscription or client secret returned');
        return;
      }

      const {error, setupIntent: confirmedSetupIntent} =
        await confirmPlatformPayPayment(client_secret, {
          applePay: {
            cartItems: [
              {
                label: 'One2one Subscription',
                amount: '0.00', // Charge 0 GBP at this stage
                paymentType: PlatformPay.PaymentType.Immediate,
              },
              {
                label: 'Total',
                amount: '0.00', // Charge 0 GBP at this stage
                paymentType: PlatformPay.PaymentType.Immediate,
              },
            ],
            merchantCountryCode: 'GB',
            currencyCode: 'GBP',
            requiredShippingAddressFields: [
              PlatformPay.ContactField.PostalAddress,
            ],
            requiredBillingContactFields: [
              PlatformPay.ContactField.PhoneNumber,
            ],
          },
        });

      if (error) {
        console.error(error);
      } else {
        Alert.alert('Success', 'Check the logs for setup intent details.');
        console.log(JSON.stringify(confirmedSetupIntent, null, 2));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  let cardDetails = {};

  const handleCardChange = details => {
    console.log('cardDetails', details);
    cardDetails = details;
  };

  const {stripe} = useStripe();
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '114347162559-c4j5r2v4cfs0qbhngp7h24p36vveu62k.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      console.log('User account created & signed in with Google!');

      // Save login status and payment status
      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('paymentCompleted', 'false');

      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IN');
      const formattedPhoneNumber = parsedPhoneNumber
        ? parsedPhoneNumber.formatInternational()
        : '';

      const response = await fetch(`${API_URL}/create-customer`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: userCredential.user.email}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      let customerId;
      try {
        const json = JSON.parse(data);
        customerId = json.customerId;
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        return;
      }

      if (!customerId) {
        throw new Error('No customer ID returned');
      }

      await AsyncStorage.setItem('customerId', customerId);

      await firestore().collection('users').doc(userCredential.user.uid).set({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: formattedPhoneNumber,
        signupDate: firebase.firestore.FieldValue.serverTimestamp(),
        customerId: customerId,
      });

      console.log('User added to Firestore');

      navigation.reset({
        index: 0,
        routes: [{name: 'Paywall'}],
      });
    } catch (error) {
      setLoading(false);
      let errorMessage = '';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else {
        errorMessage = error.message;
      }
      Alert.alert(
        'Signup Error',
        errorMessage,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User account created & signed in!');
      setLoading(false);

      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('paymentCompleted', 'false'); // Set initial payment status

      const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IN');
      const formattedPhoneNumber = parsedPhoneNumber
        ? parsedPhoneNumber.formatInternational()
        : '';

      // const response = await fetch(`${API_URL}/create-customer`, {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({email: email}),
      // });

      // if (!response.ok) throw new Error('Network response was not ok');

      // const data = await response.text();
      // let customerId;
      // try {
      //   const json = JSON.parse(data);
      //   customerId = json.customerId;
      // } catch (err) {
      //   console.error('Failed to parse JSON:', err);
      //   return;
      // }

      // if (!customerId) throw new Error('No customer ID returned');

      // await AsyncStorage.setItem('customerId', customerId);
      await firestore().collection('users').doc(userCredential.user.uid).set({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: formattedPhoneNumber,
        signupDate: firebase.firestore.FieldValue.serverTimestamp(),
        // customerId: customerId,
      });

      console.log('User added to Firestore');
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      setLoading(false);
      let errorMessage = '';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else {
        errorMessage = error.message;
      }
      Alert.alert(
        'Signup Error',
        errorMessage,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{margin: 10}}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SIGN UP</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.greeting}>Welcome to One2One App</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/email.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSignup}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.partition}>
        <View style={styles.line} />
        <View>
          <Text
            style={{
              width: 50,
              textAlign: 'center',
              color: '#434343',
            }}>
            OR
          </Text>
        </View>
        <View style={styles.line} />
      </View>

      {/* Google Signup Button */}
      {/* <Text style={styles.or}>Or</Text> */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignup}>
        <View
          style={{
            marginLeft: isFoldable ? '17%' : '10%',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../assets/google.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.02,
    paddingVertical: width * 0.04,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: isFoldable ? height * 0.04 : height * 0.05,
  },
  headerTitle: {
    fontSize: isFoldable ? width * 0.032 : width * 0.05,
    alignSelf: 'center',
    color: '#434343',
  },
  contentContainer: {marginHorizontal: 10},
  greeting: {
    fontSize: isFoldable ? width * 0.045 : width * 0.06,
    marginBottom: height * 0.025,
    marginTop: height * 0.025,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: '#434343',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingLeft: width * 0.025,
    marginBottom: height * 0.03,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  icon: {
    width: isFoldable ? width * 0.028 : width * 0.045,
    height: isFoldable ? height * 0.025 : height * 0.024,
    marginRight: width * 0.025,
  },
  input: {
    flex: 1,
    height: height * 0.063,
    paddingLeft: width * 0.025,
    color: 'black',
    fontSize: isFoldable ? width * 0.024 : width * 0.036,
  },
  submitButton: {
    backgroundColor: 'darkblue',
    padding: height * 0.0125,
    alignItems: 'center',
    marginBottom: height * 0.01,
    borderRadius: 23,
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitText: {
    color: 'white',
    fontSize: isFoldable ? width * 0.035 : width * 0.045,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#434343',
  },
  partition: {
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  terms: {
    fontSize: isFoldable ? width * 0.025 : width * 0.035,
    color: 'black',
    textAlign: 'center',
    marginBottom: height * 0.016,
    marginTop: isFoldable ? height * 0.00105 : height * 0.00545,
    marginLeft: width * 0.0105,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.05,
    marginTop: height * 0.09,
    alignSelf: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 12,
    marginBottom: height * 0.05,
    width: '80%',
    alignSelf: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    color: '#000',
    fontWeight: '600',
    fontSize: isFoldable ? height * 0.02 : height * 0.018,
  },
  or: {
    textAlign: 'center',
    fontSize: isFoldable ? width * 0.033 : width * 0.039,
    marginBottom: height * 0.03,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SignupScreen;
