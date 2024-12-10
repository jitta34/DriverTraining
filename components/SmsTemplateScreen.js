import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,SafeAreaView,ScrollView, Alert ,Image, KeyboardAvoidingView, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const dynamicPlaceholders = [
  { label: 'Start Time', value: '{{startTime}}' },
  { label: 'Finish Time', value: '{{finishTime}}' },
  { label: 'Creator', value: '{{creator}}' },
  { label: 'Date', value: '{{date}}' },
];
// const isFoldable = height >= 1020;
const isFoldable = height >= 550 && height <= 790;

const SmsTemplateScreen = ({ navigation }) => {
  const [template, setTemplate] = useState('');

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const storedTemplateData = await AsyncStorage.getItem('smsTemplate');
        if (storedTemplateData) {
          const { template } = JSON.parse(storedTemplateData);
          setTemplate(template);
        } else {
          setTemplate(`Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via Appoint-Fix app)`);
        }
      } catch (error) {
        console.log('Failed to load SMS template from storage', error);
      }
    };
    loadTemplate();
  }, []);

  const handleSaveTemplate = async () => {
    try {
      const templateData = { template };
      await AsyncStorage.setItem('smsTemplate', JSON.stringify(templateData));

      // Update the customizableSmsTemplate as well
      await AsyncStorage.setItem('customizableSmsTemplate', JSON.stringify({
        body: template,
        timestamp: new Date().toISOString(),
      }));

      Alert.alert('Success', 'SMS template saved successfully!');
    } catch (error) {
      console.log('Failed to save SMS template', error);
    }
  };

  const insertPlaceholder = (placeholder) => {
    setTemplate(prevTemplate => prevTemplate + placeholder);
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // adjust as needed
  > 
  
        <ScrollView keyboardShouldPersistTaps='always' >
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Create SMS Template</Text>
      </View>
      <TextInput
        style={styles.input}
        value={template}
        onChangeText={setTemplate}
        multiline
      />
      <View style={styles.buttonsContainer}>
        {dynamicPlaceholders.map(({ label, value }) => (
          <TouchableOpacity
            key={value}
            style={styles.placeholderButton}
            onPress={() => insertPlaceholder(value)}
          >
            <Text style={styles.placeholderButtonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
        <Text style={styles.buttonText}>Save Template</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    
    </KeyboardAvoidingView>
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
    fontSize: isFoldable ? height * 0.032 :height * 0.022,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable ? width * 0.120: height * 0.042,
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
    fontSize: isFoldable ? width * 0.032:width * 0.042 ,
    color:'black'
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.02,
  },
  placeholderButton: {
    backgroundColor: '#007bff',
    paddingVertical: height * 0.010,
    paddingHorizontal: width * 0.05,
    marginRight: width * 0.030,
    marginBottom: height * 0.01,
    borderRadius: 8,
  },
  placeholderButtonText: {
    color: '#fff',
    fontSize:isFoldable ? height * 0.01700: height * 0.0130 ,
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
    fontSize:isFoldable ? width * 0.0240: width * 0.029 ,
    fontWeight: 'bold',
  },
});



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SmsTemplateScreen = ({ navigation }) => {
//   const [template, setTemplate] = useState('');

//   useEffect(() => {
//     const loadTemplate = async () => {
//       try {
//         const storedTemplateData = await AsyncStorage.getItem('smsTemplate');
//         if (storedTemplateData) {
//           const { template } = JSON.parse(storedTemplateData);
//           setTemplate(template);
//         } else {
//           setTemplate(`Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via Appoint-Fix app)`);
//         }
//       } catch (error) {
//         console.log('Failed to load SMS template from storage', error);
//       }
//     };
//     loadTemplate();
//   }, []);

//   const handleSaveTemplate = async () => {
//     try {
//       await AsyncStorage.setItem('smsTemplate', JSON.stringify({ template }));
//       Alert.alert('Success', 'SMS template saved successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.log('Failed to save SMS template', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create SMS Template</Text>
//       <TextInput
//         style={styles.input}
//         value={template}
//         onChangeText={setTemplate}
//         multiline
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
//         <Text style={styles.buttonText}>Save Template</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     height: 200,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 8,
//     marginBottom: 16,
//     textAlignVertical: 'top',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });




// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';


// const dynamicPlaceholders = [
//   { label: 'Start Time', value: '{{startTime}}' },
//   { label: 'Finish Time', value: '{{finishTime}}' },
//   { label: 'Creator', value: '{{creator}}' },
//   { label: 'Date', value: '{{date}}' }
// ];
// const SmsTemplateScreen = ({ navigation }) => {
//   const [template, setTemplate] = useState('');

//   useEffect(() => {
//     const loadTemplate = async () => {
//       try {
//         const storedTemplateData = await AsyncStorage.getItem('smsTemplate');
//         if (storedTemplateData) {
//           const { template } = JSON.parse(storedTemplateData);
//           setTemplate(template);
//         } else {
//           setTemplate(`Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via Appoint-Fix app)`);
//         }
//       } catch (error) {
//         console.log('Failed to load SMS template from storage', error);
//       }
//     };
//     loadTemplate();
//   }, []);

//   const handleSaveTemplate = async () => {
//     try {
//       await AsyncStorage.setItem('smsTemplate', JSON.stringify({ template }));
//       Alert.alert('Success', 'SMS template saved successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.log('Failed to save SMS template', error);
//     }
//   };

//   const insertPlaceholder = (placeholder) => {
//     setTemplate(prevTemplate => prevTemplate + placeholder);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create SMS Template</Text>
//       <TextInput
//         style={styles.input}
//         value={template}
//         onChangeText={setTemplate}
//         multiline
//       />
//       <View style={styles.buttonsContainer}>
//         {dynamicPlaceholders.map(({ label, value }) => (
//           <TouchableOpacity
//             key={value}
//             style={styles.placeholderButton}
//             onPress={() => insertPlaceholder(value)}
//           >
//             <Text style={styles.placeholderButtonText}>{label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
//         <Text style={styles.buttonText}>Save Template</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     flex: 1,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     padding: 12,
//     marginBottom: 20,
//     textAlignVertical: 'top',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 20,
//   },
//   placeholderButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     marginRight: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   placeholderButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#28a745',
//     padding: 15,
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });



  
  
// const dynamicPlaceholders = [
//     { label: 'Start Time', value: '{{startTime}}' },
//     { label: 'Finish Time', value: '{{finishTime}}' },
//     { label: 'Creator', value: '{{creator}}' },
//     { label: 'Date', value: '{{date}}' }
//   ];
  
//   const SmsTemplateScreen = ({ navigation }) => {
//     const [template, setTemplate] = useState('');
  
//     useEffect(() => {
//       const loadTemplate = async () => {
//         try {
//           const storedTemplateData = await AsyncStorage.getItem('smsTemplate');
//           if (storedTemplateData) {
//             const { template } = JSON.parse(storedTemplateData);
//             setTemplate(template);
//           } else {
//             setTemplate(`Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via Appoint-Fix app)`);
//           }
//         } catch (error) {
//           console.log('Failed to load SMS template from storage', error);
//         }
//       };
//       loadTemplate();
//     }, []);
  
//     const handleSaveTemplate = async () => {
//       try {
//         await AsyncStorage.setItem('smsTemplate', JSON.stringify({ template }));
//         Alert.alert('Success', 'SMS template saved successfully!');
//         navigation.goBack();
//       } catch (error) {
//         console.log('Failed to save SMS template', error);
//       }
//     };
  
//     const insertPlaceholder = (placeholder) => {
//       setTemplate(prevTemplate => prevTemplate + placeholder);
//     };
  
//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Create SMS Template</Text>
//         <TextInput
//           style={styles.input}
//           value={template}
//           onChangeText={setTemplate}
//           multiline
//         />
//         <View style={styles.buttonsContainer}>
//           {dynamicPlaceholders.map(({ label, value }) => (
//             <TouchableOpacity
//               key={value}
//               style={styles.placeholderButton}
//               onPress={() => insertPlaceholder(value)}
//             >
//               <Text style={styles.placeholderButtonText}>{label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
//           <Text style={styles.buttonText}>Save Template</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//       backgroundColor: '#f5f5f5',
//     },
//     header: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       marginBottom: 20,
//       color: '#333',
//     },
//     input: {
//       flex: 1,
//       borderColor: '#ddd',
//       borderWidth: 1,
//       padding: 12,
//       marginBottom: 20,
//       textAlignVertical: 'top',
//       borderRadius: 8,
//       backgroundColor: '#fff',
//       fontSize: 16,
//     },
//     buttonsContainer: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       marginBottom: 20,
//     },
//     placeholderButton: {
//       backgroundColor: '#007bff',
//       padding: 10,
//       marginRight: 10,
//       marginBottom: 10,
//       borderRadius: 8,
//     },
//     placeholderButtonText: {
//       color: '#fff',
//       fontSize: 16,
//     },
//     button: {
//       backgroundColor: '#28a745',
//       padding: 15,
//       alignItems: 'center',
//       borderRadius: 8,
//     },
//     buttonText: {
//       color: '#fff',
//       fontSize: 18,
//     },
//   });
  
// const SmsTemplateScreen = ({ navigation }) => {
//   const [template, setTemplate] = useState('');

//   useEffect(() => {
//     const loadTemplate = async () => {
//       try {
//         const storedTemplateData = await AsyncStorage.getItem('smsTemplate');
//         if (storedTemplateData) {
//           const { template } = JSON.parse(storedTemplateData);
//           setTemplate(template);
//         } else {
//           setTemplate(`Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via Appoint-Fix app)`);
//         }
//       } catch (error) {
//         console.log('Failed to load SMS template from storage', error);
//       }
//     };
//     loadTemplate();
//   }, []);

//   const handleSaveTemplate = async () => {
//     try {
//       await AsyncStorage.setItem('smsTemplate', JSON.stringify({ template }));
//       Alert.alert('Success', 'SMS template saved successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.log('Failed to save SMS template', error);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.header}>Create SMS Template</Text>
//         <TextInput
//           style={styles.input}
//           value={template}
//           onChangeText={setTemplate}
//           multiline
//           placeholder="Enter your SMS template here..."
//           placeholderTextColor="#888"
//         />
//         <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
//           <Text style={styles.buttonText}>Save Template</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 200,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     textAlignVertical: 'top',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });


export default SmsTemplateScreen;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SmsTemplateScreen = ({ navigation }) => {
//   const [template, setTemplate] = useState('');

//   useEffect(() => {
//     const loadTemplate = async () => {
//       try {
//         const storedTemplateData = await AsyncStorage.getItem('smsTemplate');
//         if (storedTemplateData) {
//           const { template } = JSON.parse(storedTemplateData);
//           setTemplate(template);
//         } else {
//           setTemplate(`Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via Appoint-Fix app)`);
//         }
//       } catch (error) {
//         console.log('Failed to load SMS template from storage', error);
//       }
//     };
//     loadTemplate();
//   }, []);

//   const handleSaveTemplate = async () => {
//     try {
//       await AsyncStorage.setItem('smsTemplate', JSON.stringify({ template }));
//       Alert.alert('Success', 'SMS template saved successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.log('Failed to save SMS template', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create SMS Template</Text>
//       <TextInput
//         style={styles.input}
//         value={template}
//         onChangeText={setTemplate}
//         multiline
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSaveTemplate}>
//         <Text style={styles.buttonText}>Save Template</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     height: 200,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 8,
//     marginBottom: 16,
//     textAlignVertical: 'top',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     alignItems: 'center',
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default SmsTemplateScreen;


// // import React, { useState } from 'react';
// // import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const SmsTemplateScreen = ({ navigation }) => {
// //   const [template, setTemplate] = useState('');

// //   const saveTemplate = async () => {
// //     if (!template.includes('{{startTime}}') || !template.includes('{{finishTime}}')) {
// //       Alert.alert('Error', 'Template must include placeholders for start time and finish time.');
// //       return;
// //     }

// //     try {
// //       await AsyncStorage.setItem('smsTemplate', JSON.stringify({ template }));
// //       Alert.alert('Success', 'SMS template saved successfully!');
// //       navigation.goBack();
// //     } catch (error) {
// //       console.error('Error saving template: ', error);
// //       Alert.alert('Error', 'Failed to save the template.');
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Enter SMS template"
// //         value={template}
// //         onChangeText={setTemplate}
// //         multiline
// //       />
// //       <Button title="Save Template" onPress={saveTemplate} />
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

// // export default SmsTemplateScreen;
