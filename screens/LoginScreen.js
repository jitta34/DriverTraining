import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app'



const LoginScreen = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  useEffect(() => {
    async function init() {
      const has = await GoogleSignin.hasPlayServices();
      if (has) {
        GoogleSignin.configure({
          offlineAccess: false,
          webClientId:
            '475497997671-a60e9qvb5bnqhtuo6kb3lt92bthc21l1.apps.googleusercontent.com',
        });
      }
    }
    init();
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Attempt to log in the user
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
  
      // Save login state in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', userCredential.user.email);
  
      // Navigate to the home screen
      Alert.alert('Success', 'Logged in successfully!');
      setLoading(false);
      navigation.navigate('Home'); // Replace 'Home' with your app's main screen
    } catch (error) {
      setLoading(false);
  
      // Handle different error codes
      let errorMessage = '';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email!';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password!';
      } else {
        errorMessage = error.message;
      }
  
      Alert.alert('Login Error', errorMessage);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to reset the password.');
      return;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Password Reset',
          'Password reset email sent! Check your inbox.'
        );
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };
//   const handleGoogleSignup = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//       await GoogleSignin.signOut();
//       const {user, idToken} = await GoogleSignin.signIn();
      
// console.log(user,idToken)
//       // const userDoc = await firestore()
//       //   .collection('users')
//       //   .where('email', '==', user.email)
//       //   .get();
// // console.log(userDoc)
//       const userCredential = await auth().signInWithCredential(
//         auth.GoogleAuthProvider.credential(idToken),
//       );
// console.log(userCredential)
//       // if (userDoc.empty) {
//       //   await firestore().collection('users').doc(userCredential.user.uid).set({
//       //     firstName: user.name,
//       //     email: user.email,
//       //     lastName: '',
//       //     signupDate: firestore.FieldValue.serverTimestamp(),
//       //   });
//       // }
//       await AsyncStorage.setItem('userLoggedIn', 'true');
//       navigation.navigate('Home');
//     } catch (error) {
//       console.log('Error during sign-in:', error);
//     }
//   };
const handleGoogleSignup = async () => {
  try {
    // Check if Google Play Services are available
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Log out any previously signed-in user
    await GoogleSignin.signOut();

    // Start the Google Sign-In process
    const { user, idToken } = await GoogleSignin.signIn();
    console.log('Google User:', user, 'ID Token:', idToken);

    // Authenticate with Firebase using the Google credentials
    const userCredential = await auth().signInWithCredential(
      auth.GoogleAuthProvider.credential(idToken)
    );
    console.log('Firebase User Credential:', userCredential);

    // Store login status in AsyncStorage
    await AsyncStorage.setItem('isLoggedIn', 'true');

    // Navigate to the Home screen
    Alert.alert('Success', 'Logged in successfully with Google!');
    navigation.navigate('Home');
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    Alert.alert('Google Sign-In Error', error.message || 'Something went wrong.');
  }
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Welcome to</Text>
        <Text style={styles.user}> Instructor Training </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.togglePassword}
          >
            <Text>{hidePassword ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
        <GoogleSigninButton onPress={handleGoogleSignup}></GoogleSigninButton>
        <View style={styles.footer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 16,
  },
  scrollContent: {
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  togglePassword: {
    marginLeft: -50,
  },
  forgotPassword: {
    color: '#007BFF',
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  user: {
    fontSize: 20,
    fontWeight: '600',
  }
});

export default LoginScreen;