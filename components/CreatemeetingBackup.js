import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet,  ActivityIndicator, ScrollView, PermissionsAndroid,Platform  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 
import auth from '@react-native-firebase/auth';
import SendSMS from 'react-native-sms';
import Contacts from 'react-native-contacts';


const CreateMeetingScreen = ({ route }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState('12:00 AM');
  const [loading, setLoading] = useState(false);
  const [finishTime, setFinishTime] = useState('');


  

 
  useEffect(() => {
    // Clear the team state when the component mounts
    setTeam([]);
  }, []);
  

  const [searchText, setSearchText] = useState('');
  
  const [showFinishTime, setShowFinishTime] = useState(false);

// Add these states to your component
const [importedContacts, setImportedContacts] = useState([]);
const [contactsModalVisible, setContactsModalVisible] = useState(false);
const [searchTerm, setSearchTerm] = useState('');

const importContacts = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: "Contacts",
        message: "This app would like to view your contacts.",
        buttonPositive: "Allow",
        buttonNegative: "Deny",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const contacts = await Contacts.getAll();
      setImportedContacts(contacts);
      setContactsModalVisible(true);
    } else {
      console.log("Contacts permission denied");
    }
  } catch (err) {
    console.error(err);
  }
};

const saveContact = async (contact) => {
  // Get the current user
  const user = auth().currentUser;

  // Save the new client to Firestore
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Clients')
    .add({
      name: `${contact.givenName} ${contact.familyName}`, // Concatenate givenName and familyName
      mobile: formatPhoneNumber(contact.phoneNumbers[0].number),
    });

  console.log('Client added!');
};


const formatPhoneNumber = (number) => {
  // Remove spaces, parentheses, and dashes
  number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');

  // Add country code if it's not included
  if (!number.startsWith('+44')) {
    number = '+44' + number;
  }

  return number;
};



  const [smsBody, setSmsBody] = useState('');

  const [savedSms, setSavedSms] = useState([]);


  const [modalVisible1, setModalVisible1] = useState(false);


  const [promptVisible, setPromptVisible] = useState(false);
  const [promptText, setPromptText] = useState('');

  // Get the initial date and time from the navigation parameters
  const initialDate = route.params?.date ? new Date(route.params.date) : new Date();
  const initialTime = route.params?.time || '12:00 AM';

  useEffect(() => {
    // Get the current user
    const user = auth().currentUser;
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Clients')
      .onSnapshot((querySnapshot) => {
        const clients = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // required for FlatList
          };
        });

        setTeam(clients);
      });

    // Unsubscribe from events when no longer in use
    return () => unsubscribe();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleCreateMeeting = async () => {
    setLoading(true); // Start loading
  
    // Get the current user
    const user = auth().currentUser;

  
    // Fetch the user's details from Firestore
    let userDetails;
    try {
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      userDetails = documentSnapshot.data();
    } catch (error) {
      console.error('Error fetching user details: ', error);
    }
  
    // Fetch the saved SMS from Firestore
    try {
      const savedSmsSnapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('SavedSms')
        .orderBy('createdAt', 'desc')
        .get();
  
      const fetchedSavedSms = savedSmsSnapshot.docs.map(doc => doc.data().body);
      setSavedSms(fetchedSavedSms);
    } catch (error) {
      console.error('Error fetching saved SMS: ', error);
    }
  
    // Add the new meeting to the Firestore collection
    try {
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Meetings')
        .add({
          title: title,
          clients: team.map(client => ({ name: client.name, mobile: client.mobile })), // assuming 'team' is an array of client objects
          description: description,
          date: initialDate.toISOString(), // use 'initialDate' instead of 'date'
          time: initialTime, // use 'initialTime' instead of 'selectedTime'
          finishTime: finishTime, // store the finish time
          creator: userDetails.firstName + ' ' + userDetails.lastName,
          highlightedDateTime: `${initialDate.toISOString()} ${initialTime}`,
        });
  
      // Set the default SMS body
      const defaultSmsBody = `Your appointment with ${userDetails.firstName} ${userDetails.lastName} on ${initialDate.toDateString()} at ${initialTime} has been successfully booked. The End time of meeting is ${finishTime}. To reschedule please call ${userDetails.phoneNumber}. (Sent via Appoint-Fix app)`;
      setSmsBody(defaultSmsBody);
  
      // Show the modal
      setModalVisible1(true);
      setLoading(false); // Stop loading
    } catch (error) {
      console.error('Error adding meeting: ', error);
    }
  };
  
  
  const handleSaveSms = async () => {
    const user = auth().currentUser;
    
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('SavedSms')
        .add({
          body: smsBody,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      console.log('SMS saved successfully!');
    } catch (error) {
      console.error('Error saving SMS: ', error);
    }
  };
  

  const handleSendSms = () => {
    // Hide the modal immediately
    setModalVisible1(false);
  
    // Prepare the list of all client mobile numbers
    let allClientMobileNumbers = team.map(client => client.mobile);
  
    // Send confirmation SMS to all clients
    try {
      SendSMS.send({
        body: smsBody,
        recipients: allClientMobileNumbers, // all the phone numbers of the clients
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true
      }, (completed, cancelled, error) => {
        if(completed){
          console.log(`Confirmation SMS sent successfully to all clients!`);
          // Show the prompt text
          setPromptText(`Confirmation SMS sent successfully to clients!`);
          setPromptVisible(true);
          // Hide the prompt text after 3 seconds
          setTimeout(() => {
            setPromptVisible(false);
          }, 3000);
        } else {
          console.log(`Failed to send confirmation SMS to clients.`);
        }
      });
    } catch (error) {
      console.error(error);
      console.log(`Failed to send confirmation SMS to clients.`);

    }

    // Clear out the previously added clients
  setTeam([]); // Reset team state to an empty array
  
    console.log('Meeting added!');
    navigation.goBack();
    navigation.navigate('Calendar', { selectedDate: initialDate.toISOString(), selectedTime: initialTime, highlightedDate: initialDate.toISOString(), highlightedTime: initialTime,  clientName: team[0].name });
  };
  


  return (
    <ScrollView >
      <View style={styles.container}>
      <Text style={styles.header}>Create Meeting</Text>
      <Text style={styles.label}>Meeting Title</Text>
      <TextInput style={styles.input} placeholder="Enter meeting title" onChangeText={setTitle} placeholderTextColor='gray' />

      <Text style={styles.label}>Selected Date and Time</Text>
      <View style={styles.dateInput}>
        <Text style={{color:'black'}} >{`${initialDate.toDateString()} ${initialTime}`}</Text>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

<TouchableOpacity onPress={() => setShowFinishTime(true)} style={styles.dateInput}>
  <Text style={styles.label}>Select Finish Time</Text>
  <Text style={{color:'black'}} >Finish Time: {finishTime}</Text>
</TouchableOpacity>

{showFinishTime && (
  <DateTimePicker
    testID="dateTimePicker"
    value={new Date()}
    mode={'time'}
    is24Hour={false} // Set this to false to get AM/PM
    display="default"
    onChange={(event, selectedDate) => {
      const currentTime = selectedDate || date;
      setShowFinishTime(Platform.OS === 'ios');
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      const ampm = hours >= 24 ? 'AM' : 'PM';
      hours %= 24;
      hours = hours || 24; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      const strTime = hours + ':' + minutes + ' ' + ampm;
      setFinishTime(strTime); // Convert the Date object to a string
    }}
  />
)}


      <Text style={styles.label}>Clients</Text>
      <View style={styles.teamContainer}>
        <View style={{flexDirection:"column"}}>
  <TouchableOpacity onPress={() => setModalVisible(true)}>
  {team.length > 0 ? (
              <Text style={{ color: 'black' }}>
                {team[0].name} and {team.length - 1} others
              </Text>
            ) : (
              <Text style={{ color: "black" }}>Add Clients Manually through Plus Button</Text>
            )}

  </TouchableOpacity>
  <Text style={{alignSelf:'center', fontWeight:"bold", color:"black"}}>OR </Text>
  <TouchableOpacity onPress={importContacts} style={styles.importButton}>
  <Text style={{color:"black", alignSelf:"center"}}>Import from contacts</Text>
</TouchableOpacity>
</View>
  <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddClient')}>
    <Text style={styles.addText}>+</Text>
  </TouchableOpacity>
</View>


      <Text style={styles.label1}>Add Description</Text>
      <TextInput style={styles.descriptionInput} multiline placeholder="Type here..." onChangeText={setDescription} placeholderTextColor='gray' />

      <TouchableOpacity style={styles.createButton} onPress={handleCreateMeeting} disabled={loading}>
  {loading ? (
    <ActivityIndicator size="small" color="#fff" /> // Show loader when loading
  ) : (
    <Text style={styles.createButtonText}>CREATE</Text>
  )}
</TouchableOpacity>
{promptVisible && <Text style={styles.promptText}>{promptText}</Text>}


<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible1}
  onRequestClose={() => {
    setModalVisible1(!modalVisible1);
  }}
>
  <View style={styles.centeredView1}>
    <View style={styles.modalView1}>
      <Text style={styles.modalText1}>
        We will send this as confirmation SMS. Make changes if you want to or use this default confirmation SMS, and press the 'Send' button.
      </Text>

      <TextInput
        style={styles.modalTextInput1}
        onChangeText={text => setSmsBody(text)}
        value={smsBody}
        multiline
        numberOfLines={4}
        placeholderTextColor='black'
      />

      <View style={{flexDirection:'row',justifyContent:"space-between"}}>

      <TouchableOpacity
        style={[styles.button1, styles.buttonClose1, styles.saveBtn]}
        onPress={handleSaveSms}
      >
        <Text style={styles.textStyle1}>Save SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button1, styles.buttonClose1]}
        onPress={handleSendSms}
      >
        <Text style={styles.textStyle1}>Send SMS</Text>
      </TouchableOpacity>

      </View>

      {savedSms.length > 0 && (
        <View style={styles.savedSmsContainer}>
          <Text style={styles.selectText}>Or select your previously saved SMS:</Text>
          <FlatList
            data={savedSms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSmsBody(item)}>
                <Text style={styles.savedSmsText} numberOfLines={2}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  </View>
</Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton1}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Clients</Text>
            {team.map((member, index) => (
  <View key={index} style={styles.memberContainer}>
    <Text style={styles.memberName}>{member.name}</Text>
    <Text style={styles.memberPhone}>{member.mobile}</Text>
    <TouchableOpacity
      style={{
        height: 22,
        width: 22,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'darkblue',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
      }}
      onPress={async () => {
// Get the current user
        const user = auth().currentUser;
      
        // Delete the client from Firestore
        await firestore()
          .collection('Users')
          .doc(user.uid)
          .collection('Clients')
          .doc(member.key)
          .delete();

        // Remove the client from the local state
        const newTeam = [...team];
        newTeam.splice(index, 1);
        setTeam(newTeam);
      }}

    >
      <Text style={{ color: 'darkblue',fontSize: 25, lineHeight: 25
      }}>-</Text>
    </TouchableOpacity>
  </View>
))}

          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={contactsModalVisible}
          onRequestClose={() => {
            setContactsModalVisible(!contactsModalVisible);
          }}
        >
          <View style={styles.contactsCenteredView}>
            <View style={styles.contactsModalView}>
              <Text style={styles.contactsModalTitle}>Contact List</Text>
              <Text style={styles.contactsModalSubtitle}>Please select the contacts to make them clients</Text>

             
              <TextInput
                style={styles.searchInput}
                placeholder="Search contacts"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
                placeholderTextColor='black'
              />

             
              <FlatList
                data={importedContacts.filter((contact) =>
                  contact.givenName.toLowerCase().includes(searchTerm.toLowerCase())
                )}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { saveContact(item); setContactsModalVisible(false); }} style={styles.contactsContainer}>
                    <View style={styles.contactsItem}>
                      <Text style={styles.contactsName}>{`${item.givenName} ${item.familyName}`}</Text> 
                    </View>
                  </TouchableOpacity>
                )}
              />
               <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setContactsModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
            </View>
           
          </View>
         
        </Modal>

      </View>
    </ScrollView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom:0,
    backgroundColor: '#fff',
  },
  
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  label1: {
    fontSize: 18,
    color: '#000',
    marginBottom: 0,
    marginTop: 10,
    marginBottom: -60
  },

  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    fontSize: 15,
    color:'black'
  },

  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    color:'black'
  },

  

  descriptionInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 20,
    fontSize: 15,
    minHeight: 160,
    color:'black'
  },

  createButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    
  },

  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  memberContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 30, 
    marginBottom: 20,
  },
  
  addButton: {
    backgroundColor: 'darkblue',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius:15,
    width:'95%',
    marginBottom: 10,
    paddingHorizontal: 10,

  },
  
  addText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton1: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
    marginRight: 7
  },
  modalTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  memberName: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  memberPhone: {
    fontSize: 10,
    color: '#888',
marginLeft: 10,
    marginTop:5
  },
  promptText: {
    textAlign: 'center',
    color: '#101f30',
    fontSize: 14,
    marginTop: 10,
  },


  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView1: {
    width: '90%', // Increase the width to 95% of the screen width
    height: '95%', // Increase the height as well
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button1: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginRight:15,
    marginLeft:10,
    width:'40%'
  },
  buttonClose1: {
    backgroundColor: "#00008B", // Extra dark blue color
    marginLeft:10,
    marginRight:'10'
  },
  saveBtn:{
  marginRight:10
  },
  textStyle1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  contactsCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  contactsModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  contactsModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  contactsModalSubtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    color:'gray'
  },
  contactsContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  contactsItem: {
    padding: 10
  },
  contactsName: {
    fontSize: 18,
    color: 'black'
  },


  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black'
  },
  modalTextInput1: {
    height: 120,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top', // Ensures the text starts from the top
  },
  button1: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose1: {
    backgroundColor: 'darkblue',
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  savedSmsText: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    maxHeight: 40,
    overflow: 'hidden',
  },
  savedSmsContainer: {
    marginTop: 20,
    width: '100%',
  },
  selectText: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color:'black'
  },
  modalText1: {
    fontSize: 14, // Increase the font size
    fontWeight: '600', // Make the text bold
    marginBottom: 15,
    textAlign: "center",
    color:'black'
  },
  closeButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize:16,
    fontWeight:"bold"
  
  }
});

export default CreateMeetingScreen;



// const handleCreateMeeting = async () => {
//   setLoading(true); // Start loading
//   // Send confirmation SMS to all clients
//   for (let client of team) {
//     try {
//       const response = await fetch('http://192.168.68.106:3000/send-sms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           body: 'Confirmation message: Meeting has been created by Karan.',
//           to: client.mobile, // the phone number of the client
//         }),
//       });
//       const json = await response.json();
//       if (json.success) {
//         console.log(`Confirmation SMS sent successfully to ${client.name}!`);
//         // Show the prompt text
//         setPromptText(`Confirmation SMS sent successfully to clients!`);
//         setPromptVisible(true);
//         // Hide the prompt text after 3 seconds
//         setTimeout(() => {
//           setPromptVisible(false);
//         }, 3000);
//       } else {
//         console.log(`Failed to send confirmation SMS to ${client.name}.`);
//       }
//     } catch (error) {
//       console.error(error);
//       console.log(`Failed to send confirmation SMS to ${client.name}.`);
//     }
//   }

//   // Get the current user
//   const user = auth().currentUser;

//   // Add the new meeting to the Firestore collection
//   try {
//     await firestore()
//     .collection('Users')
//     .doc(user.uid)
//     .collection('Meetings')
//     .add({
//       title: title,
//       clients: team.map(client => client.name), // assuming 'team' is an array of client objects
//       description: description,
//       date: date.toISOString(), // use 'date' instead of 'selectedDate'
//       time: selectedTime,
      
//       creator: user.email,
//     });
//     console.log('Meeting added!');
//     navigation.goBack();
//     navigation.navigate('Calendar', { selectedDate: date.toISOString(), selectedTime, highlightedDate: date.toISOString(), highlightedTime: selectedTime });
//   } catch (error) {
//     console.error('Error adding meeting: ', error);
//   }
//   setLoading(false); // Stop loading
// };
