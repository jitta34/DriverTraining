import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator,Alert, Image, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';


// Get the screen's width and height

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const UserDetailsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewNotes = () => {
    return navigation.navigate("WriteNote")
  }

  const handleSubmit = async () => {
    // Validation checks
    if (!name || !email || !phone) {
      Alert.alert('Please fill in all the details!', 'All fields are required.');
      return;
    }

    setLoading(true);
    console.log('UserDetailsScreen: ', name);

    try {
      // Save the user details in Firestore
      await firestore()
        .collection('formuser')
        .add({
          name: name,
          email: email,
          phone: phone,
        });
      
      setLoading(false);
      // Navigate to the DrivingTestScreen
      navigation.navigate('DrivingTest', { name: name, email: email });
    } catch (error) {
      console.error("Error saving user details: ", error);
      setLoading(false);
      Alert.alert('Error', 'Something went wrong while saving your details. Please try again.');
    }
  };

  return (
    
    <View style={styles.maincontainer}>
      <SafeAreaView>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Driving Test Forms</Text>
      </View>
      <View style={styles.header1}>

      
        <Text style={styles.headerTitle}>Enter below details to access Driving Forms</Text>
      </View>

      <View style={styles.centerview}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder='Enter Name' placeholderTextColor='gray' />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder='Enter Email' keyboardType='email-address' placeholderTextColor='gray'/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setPhone} value={phone} placeholder='Enter Phone Number' keyboardType='phone-pad' placeholderTextColor='gray' />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="darkblue" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNewNotes} disabled={loading}>
      <Text style={styles.buttonText}>New Notes</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    
    padding: 20,
    backgroundColor: '#fff',
  },

  container:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: isFoldable ? height * 0.032 :height * 0.028, 
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft:isFoldable? width * 0.19: width * 0.08,
    color:'black'
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: width * 0.04,
    marginBottom: height * 0.01,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: isFoldable ? height * 0.025 :height * 0.018, 
    alignSelf: 'center',
    fontWeight: "700",
    color: '#434343',
    marginLeft: isFoldable ? width * 0.10: width * 0.04,

  },
  inputContainer: {
    height: height * 0.056,
    borderColor: '#ddd',
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: isFoldable? height * 0.08: height * 0.07, 
    paddingLeft: 8,
    color: 'black',
    fontSize: isFoldable ? height * 0.020 :height * 0.016, 
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
    alignItems: 'center'
  },
  buttonText: {
    color: '#00008B',
    fontSize: isFoldable ? height * 0.024 :height * 0.019, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserDetailsScreen;


// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions} from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// // Get the screen's width and height
// const { width, height } = Dimensions.get('window');

// const UserDetailsScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//   setLoading(true);
//   console.log('UserDetailsScreen: ', name); // Add this line
//   // Save the user details in Firestore
//   await firestore()
//     .collection('formuser')
//     .add({
//       name: name,
//       email: email,
//       phone: phone,
//     })
//     .then(() => {
//       setLoading(false);
//       // Navigate to the DrivingTestScreen
//       navigation.navigate('DrivingTest', { name: name, email: email });
//     });
// };


//   return (
//     <View style={styles.container}>
// <View style={styles.header}>
//         <Text style={styles.headerTitle}>Enter below details to access Driving Forms</Text>
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} onChangeText={setName} value={name} placeholder='Enter Name' placeholderTextColor='gray'/>
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder='Enter Email' placeholderTextColor='gray' />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} onChangeText={setPhone} value={phone} placeholder='Enter Phone Number' placeholderTextColor='gray'/>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//         {loading ? (
//           <ActivityIndicator size="small" color="darkblue" /> // Show loader when loading
//         ) : (
//           <Text style={styles.buttonText}>Submit</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     padding: width * 0.04,
//     marginBottom: height * 0.01,
//     backgroundColor: '#FFF',
//   },
//   headerTitle: {
//     fontSize: width * 0.0414,
//     alignSelf:'center',
//    fontWeight:"700",
//     color:'#434343'
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#333',
//   },
//   inputContainer: {
//     height: 40,
//     borderColor: '#ddd',
    
//     marginBottom: 16,
//     borderRadius: 5,
//     backgroundColor: '#fff',
   
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   input: {
//     height: '100%',
//     paddingLeft: 8,
//     color:'black'
//   },
//   button: {
//     padding: height * 0.015,
//     borderRadius: 5,
//     marginBottom: height * 0.04,
//     borderWidth: 2,
//     borderColor: '#00008B',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: height * 0.002 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     alignItems:'center'
//   },
//   buttonText: {
//     color: '#00008B',
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default UserDetailsScreen;
