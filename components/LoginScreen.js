import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
  Vibration,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const {width, height} = Dimensions.get('window');

// const API_URL = 'https://04kz46j0-4002.inc1.devtunnels.ms';
const API_URL = 'http://54.79.225.162:4002';
const isFoldable = height >= 550 && height <= 720;
console.log('Device height:', height);
console.log('Is foldable:', isFoldable);
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '114347162559-c4j5r2v4cfs0qbhngp7h24p36vveu62k.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const {idToken, user} = await GoogleSignin.signIn();

      const userDoc = await firestore()
        .collection('users')
        .where('email', '==', user.email)
        .get();

      if (!userDoc.empty) {
        const firebaseUserCredential = await auth().signInWithCredential(
          auth.GoogleAuthProvider.credential(idToken),
        );

        const userData = userDoc.docs[0].data();
        const paymentCompleted = userData.paymentCompleted;

        await AsyncStorage.setItem('userLoggedIn', 'true');

        console.log(userData);

        navigation.navigate('Home');
      } else {
        const firebaseUserCredential = await auth().signInWithCredential(
          auth.GoogleAuthProvider.credential(idToken),
        );

        await firestore().collection('users').add({
          uid: firebaseUserCredential.user.uid,
          name: user.name,
          email: user.email,
          paymentCompleted: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        await AsyncStorage.setItem('userLoggedIn', 'true');

        navigation.navigate('SIGN UP');
      }
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  };

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert(
        'Fields Empty',
        'Please fill in the email and password fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      setLoading(true);
      try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in!');
        setLoading(false);
        await AsyncStorage.setItem('userLoggedIn', 'true');
        navigation.navigate('Home');
      } catch (error) {
        setLoading(false);
        let errorMessage = '';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email address!';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Wrong password!';
        } else {
          errorMessage = error.message;
        }
        Alert.alert(
          'Login Error',
          errorMessage,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    }
  };

  const handleForgotPassword = () => {
    if (email === '') {
      Alert.alert(
        'Field Empty',
        'Please fill in the email field',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            'Email Sent',
            'Check your email for a link to reset your password.',
            [{text: 'OK'}],
            {cancelable: false},
          );
        })
        .catch(error => {
          Alert.alert('Error', error.message, [{text: 'OK'}], {
            cancelable: false,
          });
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SIGN IN</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.intialContainer}>
            <Text style={styles.greeting}>Welcome to One2One App</Text>
            <Text style={styles.subheading}>
              Please sign in with your account
            </Text>
          </View>
          <Text style={styles.fieldTitle}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="gray"
            />
            <Image
              source={require('../assets/sms-tracking.png')}
              style={styles.icon}
            />
          </View>
          <Text style={styles.fieldTitle}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={hidePassword}
              placeholderTextColor="gray"
            />
            <Image source={require('../assets/lock.png')} style={styles.icon} />
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={styles.eyeIcon}>
              <Image source={require('../assets/eye-slash.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signInText}>Sign In s</Text>
          )}
        </TouchableOpacity>
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccount}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SIGN UP')}>
            <Text style={styles.createAccountLink}> Create Account e</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleGoogleSignup}
          style={styles.googleButton}>
          <View
            style={{
              marginLeft: isFoldable ? '19%' : '10%',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/google.png')}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: width * 0.02,

    backgroundColor: 'white',
  },

  header: {
    marginTop: 10,
    marginBottom: isFoldable ? height * 0.02 : height * 0.02, // Conditional margin for foldable devices
  },
  headerTitle: {
    fontSize: isFoldable ? width * 0.035 : width * 0.06,
    alignSelf: 'center',
    color: '#434343',
  },
  greeting: {
    fontSize: isFoldable ? width * 0.042 : width * 0.065,
    marginBottom: height * 0.015,
    marginTop: height * 0.025,
    fontWeight: 'bold',
    color: '#434343',
  },
  subheading: {
    fontSize: isFoldable ? width * 0.028 : width * 0.05,
    marginBottom: height * 0.02,
    color: '#727272',
  },
  fieldTitle: {
    fontSize: isFoldable ? width * 0.03 : width * 0.045,
    marginBottom: height * 0.015,
    fontWeight: 'bold',
    color: '#434343',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingLeft: width * 0.025,
    marginBottom: height * 0.01,
    height: height * 0.075,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingLeft: width * 0.075,
    zIndex: 0,
    color: 'black',
    fontSize: isFoldable ? height * 0.02 : height * 0.017,
  },
  icon: {
    position: 'absolute',
    left: width * 0.025,
    width: isFoldable ? width * 0.029 : width * 0.04,
    height: isFoldable ? height * 0.026 : height * 0.022,
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: width * 0.025,
    zIndex: 1,
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: height * 0.002,
    marginTop: height * 0.01,
    color: '#434343',
    fontSize: isFoldable ? width * 0.026 : width * 0.035,
  },
  signInButton: {
    backgroundColor: 'darkblue',
    padding: height * 0.0125,
    alignItems: 'center',
    marginBottom: height * 0.028,
    marginTop: height * 0.0002,
    borderRadius: 23,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: isFoldable ? width * 0.033 : width * 0.045,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  createAccount: {
    textAlign: 'center',
    color: '#7a7776',
    fontSize: isFoldable ? width * 0.027 : width * 0.035,
  },
  createAccountLink: {
    color: 'darkblue',
    fontSize: isFoldable ? width * 0.027 : width * 0.035,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: height * 0.04,
  },
  intialContainer: {
    marginBottom: height * 0.03375,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 0,
    elevation: 2.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    marginBottom: height * 0.055,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: 'center',
    marginLeft: 56,
  },
  googleText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: isFoldable ? height * 0.02 : height * 0.017,
  },
  or: {
    textAlign: 'center',
    fontSize: isFoldable ? width * 0.026 : width * 0.039,
    marginBottom: height * 0.03,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LoginScreen;
