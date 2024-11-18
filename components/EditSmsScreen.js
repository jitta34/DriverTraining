import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
// const { width, height } = Dimensions.get('window');


const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const EditSmsScreen = ({ route, navigation }) => {
  const { initialSms, onSaveSmsBody } = route.params;
  const [smsBody, setSmsBody] = useState(initialSms);


  const saveEditedSms = () => {
    onSaveSmsBody(smsBody);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack('SendSms')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Edit SMS </Text>
      </View>
      {/* <Text style={styles.header}>Edit SMS</Text> */}
      <TextInput
        style={styles.input}
        value={smsBody}
        onChangeText={setSmsBody}
        multiline
       
      />
      <TouchableOpacity style={styles.button} onPress={saveEditedSms}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: isFoldable ? height * 0.027: height * 0.025,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable ? width * 0.30:width * 0.24,
    color:'black'
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    textAlignVertical: 'top',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: isFoldable ? height * 0.025: height * 0.018,
    color:'black'
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.3,
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: isFoldable ? height * 0.025: height * 0.018,
    fontWeight: 'bold',
  },
});



export default EditSmsScreen;


// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';

// const EditSmsScreen = ({ route, navigation }) => {
//   const { initialSms, onSaveSmsBody } = route.params;
//   const [smsBody, setSmsBody] = useState(initialSms);

//   const saveEditedSms = () => {
//     onSaveSmsBody(smsBody);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={smsBody}
//         onChangeText={setSmsBody}
//         multiline
//       />
//       <Button title="Save" onPress={saveEditedSms} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: 'white',
//   },
//   input: {
//     height: 200,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     padding: 8,
//     textAlignVertical: 'top',
//   },
// });

// export default EditSmsScreen;


// // import React, { useState } from 'react';
// // import { View, TextInput, Button, StyleSheet } from 'react-native';

// // const EditSmsScreen = ({ route, navigation }) => {
// //   const { initialSms, onSaveSmsBody } = route.params;
// //   const [smsBody, setSmsBody] = useState(initialSms);

// //   const saveEditedSms = () => {
// //     onSaveSmsBody(smsBody);
// //     navigation.goBack();
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={styles.input}
// //         value={smsBody}
// //         onChangeText={setSmsBody}
// //         multiline
// //       />
// //       <Button title="Save" onPress={saveEditedSms} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: 'white',
// //   },
// //   input: {
// //     height: 200,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     marginBottom: 16,
// //     padding: 8,
// //     textAlignVertical: 'top',
// //   },
// // });

// // export default EditSmsScreen;

// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, TextInput, TouchableOpacity, Image,StyleSheet, Dimensions } from 'react-native';
// // // import { useNavigation, useRoute } from '@react-navigation/native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';



// // // const { width, height } = Dimensions.get('window');

// // // const EditSmsScreen = ({ route, navigation }) => {
// // //   const { onSaveSmsBody } = route.params;
// // //   const [smsBody, setSmsBody] = useState('');

// // //   useEffect(() => {
// // //     const loadCustomizableSmsTemplate = async () => {
// // //       try {
// // //         const storedSmsData = await AsyncStorage.getItem('customizableSmsTemplate');
// // //         if (storedSmsData) {
// // //           const { body } = JSON.parse(storedSmsData);
// // //           setSmsBody(body);
// // //         }
// // //       } catch (error) {
// // //         console.log('Failed to load customizable SMS template from storage', error);
// // //       }
// // //     };
// // //     loadCustomizableSmsTemplate();
// // //   }, []);

// // //   const handleSaveSms = async () => {
// // //     try {
// // //       await AsyncStorage.setItem('customizableSmsTemplate', JSON.stringify({
// // //         body: smsBody,
// // //         timestamp: new Date().toISOString(),
// // //       }));
// // //       if (typeof onSaveSmsBody === 'function') {
// // //         onSaveSmsBody(smsBody);
// // //       }
// // //       navigation.goBack();
// // //     } catch (error) {
// // //       console.log('Failed to save customizable SMS template', error);
// // //     }
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <SafeAreaView>
// // //         <Text style={styles.header}>Edit Customizable SMS Template</Text>
// // //         <TextInput
// // //           value={smsBody}
// // //           onChangeText={setSmsBody}
// // //           multiline
// // //           style={styles.textInput}
// // //         />
// // //         <TouchableOpacity style={styles.saveButton} onPress={handleSaveSms}>
// // //           <Text style={styles.buttonText}>Save</Text>
// // //         </TouchableOpacity>
// // //       </SafeAreaView>
// // //     </View>
// // //   );
// // // };

 


// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: width * 0.05,
// // //     backgroundColor: '#f5f5f5',
// // //   },
// // //   headerContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     padding: 16,
// // //   },
// // //   header: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     alignSelf:'center',
// // //     marginLeft: '20%',
// // //     color:'black'
// // //   },
// // //   // header: {
// // //   //   fontSize: width * 0.06,
// // //   //   fontWeight: 'bold',
// // //   //   marginBottom: height * 0.02,
// // //   //   textAlign: 'center',
// // //   //   color: 'black',
// // //   // },
// // //   textInput: {
// // //     height: height * 0.2,
// // //     borderColor: 'gray',
// // //     borderWidth: 1,
// // //     borderRadius: 10,
// // //     padding: width * 0.04,
// // //     fontSize: width * 0.04,
// // //     color: '#333',
// // //     backgroundColor: 'white',
// // //   },
// // //   saveButton: {
// // //     marginTop: height * 0.02,
// // //     backgroundColor: 'blue',
// // //     padding: width * 0.04,
// // //     borderRadius: 10,
// // //     alignSelf: 'center',
// // //   },
// // //   buttonText: {
// // //     color: 'white',
// // //     textAlign: 'center',
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default EditSmsScreen;