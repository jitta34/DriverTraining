import { View, Text } from 'react-native'
import React from 'react'

const CollectionScreen = () => {
  return (
    <View>
      <Text>CollectionScreen</Text>
    </View>
  )
}

export default CollectionScreen



// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Button, BackHandler } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Buffer } from 'buffer';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Get the screen's width and height
// const { width, height } = Dimensions.get('window');
// // const isFoldable = height >= 1020;
// const isFoldable = height >= 550 && height <= 790;
// const CollectionScreen = () => {
//   const icons = {
//     search: require('../assets/search.png'), // assuming you have a search icon
//   };
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [notes, setNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedDeleteIcon, setSelectedDeleteIcon] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [datePickerVisible, setDatePickerVisible] = useState(false);
//   const [isDateFiltered, setIsDateFiltered] = useState(false);
//   const [selectedShareIcon, setSelectedShareIcon] = useState(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
//           <Image source={backIcon} style={{ width: 25, height: 25 }} />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   const handleSharePress = async (noteTitle, noteSubtitle, noteText) => {
//     try {
//       const path = RNFS.DocumentDirectoryPath + '/note.txt';
//       const plainTextContent = noteText.replace(/<[^>]*>?/gm, '');
//       const formattedNoteContent = `Title: ${noteTitle}\nSubtitle: ${noteSubtitle}\nContent: ${plainTextContent}`;
//       await RNFS.writeFile(path, formattedNoteContent, 'utf8');
//       const shareOptions = {
//         url: 'file://' + path,
//         type: 'text/plain',
//       };
//       await Share.open(shareOptions);
//     } catch (error) {
//       console.log('Error =>', error);
//     }
//   };

//   const handleCardPress = (note) => {
//     setSelectedCard(note.key);
//     setSelectedDeleteIcon(note.key);
//     setSelectedShareIcon(note.key);
//     navigation.navigate('NotesScreen', { note: note });
//   };

//   useEffect(() => {
//     const userId = auth().currentUser.uid;

//     const subscriber = firestore()
//       .collection('users')
//       .doc(userId)
//       .collection('notes')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(querySnapshot => {
//         const notes = [];

//         querySnapshot.forEach(documentSnapshot => {
//           const note = {
//             ...documentSnapshot.data(),
//             key: documentSnapshot.id,
//           };

//           if (note.createdAt) {
//             const noteDate = note.createdAt.toDate();
//             if (!isDateFiltered || (noteDate.getFullYear() === selectedDate.getFullYear() &&
//               noteDate.getMonth() === selectedDate.getMonth() &&
//               noteDate.getDate() === selectedDate.getDate())) {
//               notes.push(note);
//             }
//           }
//         });

//         setNotes(notes);
//         setIsLoading(false);
//       });

//     return () => subscriber();
//   }, [selectedDate, isDateFiltered]);

//   const handleDeletePress = (noteKey) => {
//     const userId = auth().currentUser.uid;
//     firestore()
//       .collection('users')
//       .doc(userId)
//       .collection('notes')
//       .doc(noteKey)
//       .delete()
//       .then(() => {
//         firestore()
//           .collection('users')
//           .doc(userId)
//           .collection('notes')
//           .get()
//           .then((querySnapshot) => {
//             if (querySnapshot.empty) {
//               setIsDateFiltered(false);
//             }
//           });
//       })
//       .catch((error) => {
//         console.error("Error removing note: ", error);
//       });
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         navigation.navigate('Home'); // Navigate explicitly to Home screen
//         return true; // Prevent default behavior (going back)
//       };

//       const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         backHandler.remove(); // Clean up the event listener
//       };
//     }, [navigation]) // Ensure navigation is in the dependency array
//   );

  

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <Text style={styles.header}>COLLECTION</Text> */}
  
//       {/* <View style={styles.headerContainer}>
       
//         <Text style={styles.header}>COLLECTION</Text>
//       </View> */}
//         <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
//         </TouchableOpacity>
//         <Text style={styles.header}>COLLECTION</Text>
//       </View>
     
//       <TouchableOpacity 
//   style={styles.filterButton} 
//   onPress={() => setDatePickerVisible(true)}
// >
//   <Text style={styles.filterButtonText}>Filter by date</Text>
// </TouchableOpacity>

//       {datePickerVisible && (
//         <DateTimePicker
//         value={selectedDate}
//         mode="date"
//         display="default"
//         onChange={(event, date) => {
//           setSelectedDate(date || selectedDate);
//           setDatePickerVisible(false);  // Hide the date picker after a date is selected
//           setIsDateFiltered(true);  // Set isDateFiltered to true
//         }}
//       />
      

 
// )}
//       <ScrollView>
//       <View style={styles.cardsContainer}>
//       {isLoading ? (
//         <Text>Notes are Loading...</Text>
//       ) : notes.length > 0 ? (
//         notes.map((note) => (
//           <View key={note.key} style={styles.noteCardContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.noteCard,
//                 selectedCard === note.key ? styles.selectedCard : null,
//               ]}
//               onPress={() => handleCardPress(note)}
//             >
//               <View>
//                 <Text style={[styles.noteTitle, selectedCard === note.key ? styles.selectedCardText : styles.unselectedCardText]} numberOfLines={2}>{note.title}</Text>
//                 <Text style={[styles.noteSubtitle, selectedCard === note.key ? styles.selectedCardText : styles.unselectedCardText]} numberOfLines={2}>{note.subtitle}</Text>
//                 <Text style={[styles.noteContent, selectedCard === note.key ? styles.selectedCardText : styles.unselectedCardText]} numberOfLines={7}>
//                   {note.text.replace(/<[^>]*>?/gm, '')} 
//                 </Text>
//               </View>
//               <Text style={[styles.noteDate, selectedCard === note.key ? styles.selectedCardText : null]}>{note.createdAt.toDate().toLocaleDateString('en-GB')}</Text>
//             </TouchableOpacity>

         
//     <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeletePress(note.key)}>
//       <Image source={selectedDeleteIcon === note.key ? require('../assets/delete_white.png') : require('../assets/deleteico.png')} /> 
//     </TouchableOpacity>
  
//     <TouchableOpacity style={styles.shareIcon} onPress={() => handleSharePress(note.title, note.subtitle, note.text)}>
//   <Image source={selectedShareIcon === note.key ? require('../assets/share_white.png') : require('../assets/share1.png')} /> 
// </TouchableOpacity>

 

//           </View>
//         ))
//       ) : (
//         <View style={styles.emptyNotes}>
//           <Text style={styles.emptyNotesText}>{isDateFiltered ? 'No saved notes found for this date.' : 'Nothing to show for now, please create a note and save it to see the collection.'}</Text>
//         </View>
//       )}
//       </View>
//       </ScrollView>
     
//     </SafeAreaView>
//   );
  
// };




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: width * 0.05,
//     backgroundColor: '#fff',
//   },
//   // headerContainer: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   padding: width * 0.04,
//   // },
//   // header: {
//   //   fontSize: width * 0.06,
//   //   fontWeight: 'bold',
//   //   alignSelf: 'center',
//   //   marginLeft: width * 0.23,
//   //   color: 'black',
//   // },
    
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   header: {
//     fontSize: isFoldable ? height * 0.029: height * 0.020,
//     fontWeight: 'bold',
//     alignSelf:'center',
//     marginLeft:isFoldable? width * 0.22: width * 0.20,
//     color:'black'
//   },
//   filterButton: {
//     backgroundColor: 'darkblue',
//     padding: height * 0.01,
//     borderRadius: width * 0.05,
//     marginBottom: height * 0.02,
//     marginTop: height * 0.02,
//     alignItems: 'center',
//     width: width * 0.30,
//     height: height * 0.05,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   filterButtonText: {
//     color: 'white',
//     fontSize: isFoldable ? height * 0.022: height * 0.0170,
//     fontWeight: 'bold',
//   },
//   cardsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   noteCard: {
//     width: width * 0.43,
//     height: height * 0.3,
//     padding: width * 0.025,
//     borderRadius: width * 0.025,
//     marginBottom: height * 0.02,
//     backgroundColor: 'white',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   noteTitle: {
//     fontSize: isFoldable ? height * 0.022: height * 0.0180,
//     fontWeight: '700',
//     color: 'black',
//   },
//   noteSubtitle: {
//     fontSize: isFoldable ? height * 0.018: height * 0.0160,
//     color: 'gray',
//   },
//   noteContent: {
//     fontSize: isFoldable ? height * 0.018: height * 0.0160,
//     color: 'black',
//   },
//   noteCardContainer: {
//     position: 'relative',
//   },
//   deleteIcon: {
//     position: 'absolute',
//     top: height * 0.015,
//     right: width * 0.015,
//     width: width * 0.05,
//     height: height * 0.03,
//   },
//   shareIcon: {
//     position: 'absolute',
//     bottom: height * 0.035,
//     right: width * 0.015,
//     width: width * 0.05,
//     height: height * 0.03,
//   },
//   noteDate: {
//     marginBottom: height * 0.01,
//     color: '#7a7776',
//     fontSize: isFoldable ? height * 0.018: height * 0.0160,
//   },
//   emptyNotes: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyNotesText: {
//     fontWeight: 'bold',
//     fontSize: isFoldable ? height * 0.025: height * 0.020,
//     textAlign: 'center',
//     color: '#7a7776',
//   },
//   icon: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
// });



// export default CollectionScreen;

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Button, } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import firestore from '@react-native-firebase/firestore';
// // import auth from '@react-native-firebase/auth';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import { Buffer } from 'buffer';

// // import RNFS from 'react-native-fs';
// // import Share from 'react-native-share';

// // // Get the screen's width and height
// // const { width, height } = Dimensions.get('window');

// // const CollectionScreen = () => {
// //   const icons = {
// //     search: require('../assets/search.png'), // assuming you have a search icon
// //   };
// //   const [selectedCard, setSelectedCard] = useState(null);
// //   const [notes, setNotes] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true); // Add this line
// //   const [selectedDeleteIcon, setSelectedDeleteIcon] = useState(null);
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [datePickerVisible, setDatePickerVisible] = useState(false);
// //   // const [isDateFiltered, setIsDateFiltered] = useState(false);

// //   const [selectedShareIcon, setSelectedShareIcon] = useState(null);


// //   const [isDateFiltered, setIsDateFiltered] = useState(false); // Add this line
  

// //   // const handleSharePress = async (noteContent) => {
// //   //   try {
// //   //     const base64Content = Buffer.from(noteContent).toString('base64');
// //   //     await Share.share({
// //   //       message: noteContent,
// //   //       title: 'Note Content',
// //   //       url: 'data:text/plain;base64,' + base64Content,
// //   //     });
// //   //   } catch (error) {
// //   //     console.log('Error =>', error);
// //   //   }
// //   // };

// //   // const handleSharePress = async (noteContent) => {
// //   //   try {
// //   //     // Remove HTML tags from the note content
// //   //     const plainTextContent = noteContent.replace(/<[^>]*>?/gm, '');
// //   //     const base64Content = Buffer.from(plainTextContent).toString('base64');
// //   //     await Share.share({
// //   //       message: plainTextContent,
// //   //       title: 'Note Content',
// //   //       url: 'data:text/plain;base64,' + base64Content,
// //   //     });
// //   //   } catch (error) {
// //   //     console.log('Error =>', error);
// //   //   }
// //   // };

// //   // const handleSharePress = async (noteContent) => {
// //   //   try {
// //   //     // Define the file path
// //   //     const path = RNFS.DocumentDirectoryPath + '/note.txt';
  
// //   //     // Write the file
// //   //     await RNFS.writeFile(path, noteContent, 'utf8');
  
// //   //     // Share the file
// //   //     const shareOptions = {
// //   //       url: 'file://' + path,
// //   //       type: 'text/plain',
// //   //     };
// //   //     await Share.open(shareOptions);
// //   //   } catch (error) {
// //   //     console.log('Error =>', error);
// //   //   }
// //   // };

// //   // const handleSharePress = async (noteTitle, noteSubtitle, noteText) => {
// //   //   try {
// //   //     // Define the file path
// //   //     const path = RNFS.DocumentDirectoryPath + '/note.txt';
  
// //   //     // Format the note content
// //   //     const formattedNoteContent = `Title: ${noteTitle}\nSubtitle: ${noteSubtitle}\nContent: ${noteText}`;
  
// //   //     // Write the file
// //   //     await RNFS.writeFile(path, formattedNoteContent, 'utf8');
  
// //   //     // Share the file
// //   //     const shareOptions = {
// //   //       url: 'file://' + path,
// //   //       type: 'text/plain',
// //   //     };
// //   //     await Share.open(shareOptions);
// //   //   } catch (error) {
// //   //     console.log('Error =>', error);
// //   //   }
// //   // };


// //   // const handleSharePress = async (noteTitle, noteSubtitle, noteText) => {
// //   //   try {
// //   //     // Define the file path
// //   //     const path = RNFS.DocumentDirectoryPath + '/note.txt';
  
// //   //     // Remove HTML tags from the note content
// //   //     const plainTextContent = noteText.replace(/<[^>]*>?/gm, '');
  
// //   //     // Format the note content
// //   //     const formattedNoteContent = `Title: ${noteTitle}\nSubtitle: ${noteSubtitle}\nContent: ${plainTextContent}`;
  
// //   //     // Write the file
// //   //     await RNFS.writeFile(path, formattedNoteContent, 'utf8');
  
// //   //     // Share the file
// //   //     const shareOptions = {
// //   //       url: 'file://' + path,
// //   //       type: 'text/plain',
// //   //     };
// //   //     await Share.open(shareOptions);
// //   //   } catch (error) {
// //   //     console.log('Error =>', error);
// //   //   }
// //   // };

// //   const handleSharePress = async (noteTitle, noteSubtitle, noteText) => {
// //     try {
// //       console.log('noteText:', noteText);  // Debug line
  
// //       // Define the file path
// //       const path = RNFS.DocumentDirectoryPath + '/note.txt';
  
// //       // Remove HTML tags from the note content
// //       const plainTextContent = noteText.replace(/<[^>]*>?/gm, '');
      
// //       console.log('plainTextContent:', plainTextContent);  // Debug line
  
// //       // Format the note content
// //       const formattedNoteContent = `Title: ${noteTitle}\nSubtitle: ${noteSubtitle}\nContent: ${plainTextContent}`;
  
// //       // Write the file
// //       await RNFS.writeFile(path, formattedNoteContent, 'utf8');
  
// //       // Share the file
// //       const shareOptions = {
// //         url: 'file://' + path,
// //         type: 'text/plain',
// //       };
// //       await Share.open(shareOptions);
// //     } catch (error) {
// //       console.log('Error =>', error);
// //     }
// //   };
  
  
  
  



// //   const handleCardPress = (note) => {
// //     setSelectedCard(note.key);
// //     setSelectedDeleteIcon(note.key);
// //     setSelectedShareIcon(note.key);
// //     navigation.navigate('NotesScreen', { note: note });
// //   };

// //   const navigation = useNavigation();

// //   // useEffect(() => {
// //   //   const userId = auth().currentUser.uid;
  
// //   //   const subscriber = firestore()
// //   //     .collection('users')
// //   //     .doc(userId)
// //   //     .collection('notes')
// //   //     .orderBy('createdAt', 'desc') // Order the notes by creation time
// //   //     .onSnapshot(querySnapshot => {
// //   //       const notes = [];
  
// //   //       querySnapshot.forEach(documentSnapshot => {
// //   //         notes.push({
// //   //           ...documentSnapshot.data(),
// //   //           key: documentSnapshot.id,
// //   //         });
// //   //       });
  
// //   //       setNotes(notes);
// //   //       setIsLoading(false);
// //   //     });
  
// //   //   // Unsubscribe from events when no longer in use
// //   //   return () => subscriber();
// //   // }, []);

// //   // useEffect(() => {
// //   //   const userId = auth().currentUser.uid;
  
// //   //   const subscriber = firestore()
// //   //     .collection('users')
// //   //     .doc(userId)
// //   //     .collection('notes')
// //   //     .orderBy('createdAt', 'desc') // Order the notes by creation time
// //   //     .onSnapshot(querySnapshot => {
// //   //       const notes = [];
  
// //   //       querySnapshot.forEach(documentSnapshot => {
// //   //         const note = {
// //   //           ...documentSnapshot.data(),
// //   //           key: documentSnapshot.id,
// //   //         };
  
// //   //         // Convert the note's createdAt timestamp to a date
// //   //         const noteDate = note.createdAt.toDate();
// //   //         // Check if the note's date matches the selected date
// //   //         if (noteDate.getFullYear() === selectedDate.getFullYear() &&
// //   //             noteDate.getMonth() === selectedDate.getMonth() &&
// //   //             noteDate.getDate() === selectedDate.getDate()) {
// //   //           notes.push(note);
// //   //         }
// //   //       });
  
// //   //       setNotes(notes);
// //   //       setIsLoading(false);
// //   //     });
  
// //   //   // Unsubscribe from events when no longer in use
// //   //   return () => subscriber();
// //   // }, [selectedDate]); // Add selectedDate to the dependency array
  

// //   useEffect(() => {
// //     const userId = auth().currentUser.uid;
  
// //     const subscriber = firestore()
// //       .collection('users')
// //       .doc(userId)
// //       .collection('notes')
// //       .orderBy('createdAt', 'desc') // Order the notes by creation time
// //       .onSnapshot(querySnapshot => {
// //         const notes = [];
  
// //         querySnapshot.forEach(documentSnapshot => {
// //           const note = {
// //             ...documentSnapshot.data(),
// //             key: documentSnapshot.id,
// //           };
  
// //           // Convert the note's createdAt timestamp to a date
// //           const noteDate = note.createdAt.toDate();
// //           // Check if the note's date matches the selected date
// //           if (!isDateFiltered || (noteDate.getFullYear() === selectedDate.getFullYear() &&
// //               noteDate.getMonth() === selectedDate.getMonth() &&
// //               noteDate.getDate() === selectedDate.getDate())) {
// //             notes.push(note);
// //           }
// //         });
  
// //         setNotes(notes);
// //         setIsLoading(false);
// //       });
  
// //     // Unsubscribe from events when no longer in use
// //     return () => subscriber();
// //   }, [selectedDate, isDateFiltered]); // Add isDateFiltered to the dependency array
  
// //   const handleDeletePress = (noteKey) => {
// //     const userId = auth().currentUser.uid;
// //     firestore()
// //       .collection('users')
// //       .doc(userId)
// //       .collection('notes')
// //       .doc(noteKey)
// //       .delete()
// //       .then(() => {
// //         console.log("Note successfully deleted!");
  
// //         // Check if there are any notes left
// //         firestore()
// //           .collection('users')
// //           .doc(userId)
// //           .collection('notes')
// //           .get()
// //           .then((querySnapshot) => {
// //             if (querySnapshot.empty) {
// //               // If there are no notes left, reset isDateFiltered
// //               setIsDateFiltered(false);
// //             }
// //           });
// //       })
// //       .catch((error) => {
// //         console.error("Error removing note: ", error);
// //       });
// //   };
  

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>COLLECTION</Text>
     
// //       <TouchableOpacity 
// //   style={styles.filterButton} 
// //   onPress={() => setDatePickerVisible(true)}
// // >
// //   <Text style={styles.filterButtonText}>Filter by date</Text>
// // </TouchableOpacity>

// //       {datePickerVisible && (
// //         <DateTimePicker
// //         value={selectedDate}
// //         mode="date"
// //         display="default"
// //         onChange={(event, date) => {
// //           setSelectedDate(date || selectedDate);
// //           setDatePickerVisible(false);  // Hide the date picker after a date is selected
// //           setIsDateFiltered(true);  // Set isDateFiltered to true
// //         }}
// //       />
      
// // //    <DateTimePicker
// // //    value={selectedDate}
// // //    mode="date"
// // //    display="default"
// // //    onChange={(event, date) => {
// // //      setSelectedDate(date || selectedDate);
// // //      setDatePickerVisible(false);  // Hide the date picker after a date is selected
// // //      setIsDateFiltered(true);  // Set isDateFiltered to true
// // //    }}
// // //  />
 
// // )}
// //       <ScrollView>
// //       <View style={styles.cardsContainer}>
// //       {isLoading ? (
// //         <Text>Notes are Loading...</Text>
// //       ) : notes.length > 0 ? (
// //         notes.map((note) => (
// //           <View key={note.key} style={styles.noteCardContainer}>
// //             <TouchableOpacity
// //               style={[
// //                 styles.noteCard,
// //                 selectedCard === note.key ? styles.selectedCard : null,
// //               ]}
// //               onPress={() => handleCardPress(note)}
// //             >
// //               <View>
// //                 <Text style={[styles.noteTitle, selectedCard === note.key ? styles.selectedCardText : styles.unselectedCardText]} numberOfLines={2}>{note.title}</Text>
// //                 <Text style={[styles.noteSubtitle, selectedCard === note.key ? styles.selectedCardText : styles.unselectedCardText]} numberOfLines={2}>{note.subtitle}</Text>
// //                 <Text style={[styles.noteContent, selectedCard === note.key ? styles.selectedCardText : styles.unselectedCardText]} numberOfLines={7}>
// //                   {note.text.replace(/<[^>]*>?/gm, '')} 
// //                 </Text>
// //               </View>
// //               <Text style={[styles.noteDate, selectedCard === note.key ? styles.selectedCardText : null]}>{note.createdAt.toDate().toLocaleDateString('en-GB')}</Text>
// //             </TouchableOpacity>

         
// //     <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeletePress(note.key)}>
// //       <Image source={selectedDeleteIcon === note.key ? require('../assets/delete_white.png') : require('../assets/deleteico.png')} /> 
// //     </TouchableOpacity>
// //     {/* <TouchableOpacity style={styles.shareIcon} onPress={() => handleSharePress(note.title, note.subtitle, note.text)}>
// //     <Image source={require('../assets/share1.png')} /> 
// //     </TouchableOpacity> */}
// //     <TouchableOpacity style={styles.shareIcon} onPress={() => handleSharePress(note.title, note.subtitle, note.text)}>
// //   <Image source={selectedShareIcon === note.key ? require('../assets/share_white.png') : require('../assets/share1.png')} /> 
// // </TouchableOpacity>

 
// //             {/* <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeletePress(note.key)}>
// //             <Image source={selectedDeleteIcon === note.key ? require('../assets/delete_white.png') : require('../assets/delete.png')} /> 
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.shareIcon} onPress={() => handleSharePress(note.title, note.subtitle, note.text)}>
// //   <Text style={{color:'white'}} >Share</Text> 
// // </TouchableOpacity> */}
// //           </View>
// //         ))
// //       ) : (
// //         <View style={styles.emptyNotes}>
// //           <Text style={styles.emptyNotesText}>{isDateFiltered ? 'No saved notes found for this date.' : 'Nothing to show for now, please create a note and save it to see the collection.'}</Text>
// //         </View>
// //       )}
// //       </View>
// //       </ScrollView>
// //       {/* <TouchableOpacity style={styles.newNoteButton} onPress={() => navigation.navigate('WriteNote')}>
// //         <Text style={styles.newNoteButtonText}>+ New Note</Text>
// //       </TouchableOpacity> */}
// //     </View>
// //   );
  
// // };




// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: width * 0.05,
// //     backgroundColor: '#fff',
// //   },
// //   header: {
// //     fontSize: width * 0.045,
// //     alignSelf:'center',
// //     marginBottom: height * 0.05,
// //     color:'#434343'
// //   },
// //   searchBar: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     width: width * 0.92,
// //     height: height * 0.054,
// //     borderRadius: 20,
// //     marginBottom: height * 0.02,
// //     paddingLeft: width * 0.05,
// //     alignSelf: 'center',
// //     backgroundColor: 'white',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //   },
// //   searchIcon: {
// //     width: width * 0.04,
// //     height: height * 0.02,
// //     marginRight: width * 0.02,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     color: 'black'
// //   },
// //   cardsContainer: {
// //     flexDirection: 'row',
// //     flexWrap: 'wrap',
// //     justifyContent: 'space-between',
// //   },
// //   noteCard: {
// //     width: width * 0.43,
// //     height: height * 0.3,
// //     padding: width * 0.025,
// //     borderRadius: 10,
// //     marginBottom: height * 0.02,
// //     backgroundColor: 'white',
// //     justifyContent: 'space-between',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //   },
// //   noteTitle: {
// //     fontSize: width * 0.0425,
// //     fontWeight: '700',
// //     color: 'black'
// //   },
// //   noteSubtitle: {
// //     fontSize: width * 0.035,
// //     color: 'gray',
// //   },
// //   noteContent: {
// //     fontSize: width * 0.04,
// //     color: 'black',
// //   },
// //   newNoteButton: {
// //     width: width * 0.4,
// //     height: height * 0.048,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 20,
// //     backgroundColor: 'darkblue',
// //     position: 'absolute',
// //     bottom: height * 0.04,
// //     left: width * 0.32,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //   },

// //   newNoteButtonText: {
// //     color: '#fff',
// //     fontSize: width * 0.04,
// //     fontWeight: '600',
// //   },
// //   selectedCard: {
// //     backgroundColor: 'darkblue',
// //   },
// //   selectedCardText: {
// //     color: 'white',
// //   },
// //   unselectedCardText: {
// //     color: 'black',
// //   },
// //   emptyNotes: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   emptyNotesText: {
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //     textAlign: 'center',
// //     color:'#7a7776'
// //   },
// //   noteCardContainer: {
// //     position: 'relative',
// //   },
// //   deleteIcon: {
// //     position: 'absolute',
// //     top: height * 0.010,
// //     right: width * 0.010,
// //     width: 20,
// //     height:20
// //   },
// //   noteDate:{
// //     marginBottom:0,
// //     color:'#7a7776'
// //   },
// //   filterButton: {
// //     backgroundColor: 'darkblue',
// //     padding: 7,
// //     borderRadius: 20,
// //     marginBottom: 20,
// //     alignItems: 'center',
// //     width: width * 0.4,
// //     height: height * 0.048,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //   },
// //   filterButtonText: {
// //     color: 'white',
// //     fontSize: width * 0.04,
// //   },

// //   shareIcon:{
// //     position: 'absolute',
// //     bottom: height * 0.035,
// //     right: width * 0.010,
// //     width: 22,
// //     height:22
// //   }
// // });



// // export default CollectionScreen;