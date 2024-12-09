import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SendSMS from 'react-native-sms';
import Contacts from 'react-native-contacts';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar} from 'react-native-big-calendar';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const replacePlaceholders = (template, meeting) => {
  return template
    .replace('{{creator}}', meeting.creator)
    .replace('{{date}}', moment(meeting.date).format('dddd, MMMM Do YYYY'))
    .replace('{{startTime}}', meeting.time)
    .replace('{{finishTime}}', meeting.finishTime);
};

const CreateMeetingScreen = ({route}) => {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState('12:00 AM');
  const [loading, setLoading] = useState(false);
  // const [finishTime, setFinishTime] = useState('');

  const [showStartTime, setShowStartTime] = useState(false);
  const [startTime, setStartTime] = useState(route.params?.startTime || '');
  // const startTime = route.params?.startTime || ''; // Use 'startTime' instead of 'starttime'
  const handleStartTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate || new Date();
      setShowStartTime(Platform.OS === 'ios');
      const newStartTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setStartTime(newStartTime);
      const newDuration = calculateDuration(newStartTime, finishTime);
      setDuration(newDuration);
      navigation.setParams({startTime: newStartTime, duration: newDuration});
    } else {
      setShowStartTime(false);
    }
  };

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
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const contacts = await Contacts.getAll();
        setImportedContacts(contacts);
        setContactsModalVisible(true);
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveContact = async contact => {
    const user = auth().currentUser;
    const newClient = {
      name: `${contact.givenName} ${contact.familyName}`,
      mobile: formatPhoneNumber(contact.phoneNumbers[0].number),
    };

    try {
      const docRef = await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Clients')
        .add(newClient);

      setSelectedClient({...newClient, key: docRef.id});
      setContactsModalVisible(false);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const formatPhoneNumber = number => {
    // Remove spaces, parentheses, and dashes
    number = number
      .replace(/\s/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/-/g, '');

    // Ensure the number starts with +44
    if (!number.startsWith('+44')) {
      // If the number starts with 0, remove it
      if (number.startsWith('0')) {
        number = number.slice(1);
      }
      // Add the +44 prefix
      number = '+44' + number;
    } else {
      // If the number starts with +44 and then a 0, remove the 0
      if (number.startsWith('+440')) {
        number = '+44' + number.slice(4);
      }
    }

    return number;
  };

  const [smsBody, setSmsBody] = useState('');

  const [savedSms, setSavedSms] = useState([]);

  const [modalVisible1, setModalVisible1] = useState(false);

  const [promptVisible, setPromptVisible] = useState(false);
  const [promptText, setPromptText] = useState('');

  const initialDate = route.params?.date
    ? new Date(route.params.date)
    : new Date();

  console.log('initial date', initialDate);
  const date = route.params?.date || '';

  console.log('starttime', startTime);
  const [finishTime, setFinishTime] = useState(route.params?.finishTime || '');
  const [duration, setDuration] = useState(route.params?.duration || 15); // Initialize duration

  const initialFinishTime = route.params?.finishTime
    ? new Date(`01/01/2024 ${route.params.finishTime}`)
    : new Date();

  const handleFinishTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate || new Date();
      setShowFinishTime(Platform.OS === 'ios');
      const newFinishTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setFinishTime(newFinishTime);
      const newDuration = calculateDuration(startTime, newFinishTime);
      setDuration(newDuration);
      navigation.setParams({finishTime: newFinishTime, duration: newDuration});
    } else {
      setShowFinishTime(false);
    }
  };

  const calculateDuration = (startTime, finishTime) => {
    const start = new Date(`01/01/2024 ${startTime}`);
    const end = new Date(`01/01/2024 ${finishTime}`);
    const durationInMinutes = (end - start) / (1000 * 60);
    return durationInMinutes;
  };
  useEffect(() => {
    // Get the current user
    const user = auth().currentUser;
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Clients')
      .onSnapshot(querySnapshot => {
        const clients = querySnapshot.docs.map(documentSnapshot => {
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

  const [selectedClient, setSelectedClient] = useState(null);
  const [previousClientsModalVisible, setPreviousClientsModalVisible] =
    useState(false);

  const handleCreateMeeting = async () => {
    if (!selectedClient) {
      Alert.alert('Error', 'Please select a client for the meeting');
      return;
    }

    setLoading(true);
    const user = auth().currentUser;

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

    try {
      const newMeeting = {
        title: title,
        clients: [{
          name: selectedClient.name,
          mobile: selectedClient.mobile,
        }],
        description: description,
        date: moment(initialDate).format('YYYY-MM-DD'),
        time: startTime,
        finishTime: finishTime,
        creator: `${userDetails.firstName} ${userDetails.lastName}`,
        highlightedDateTime: `${initialDate.toISOString()} ${startTime} - ${finishTime}`,
      };

      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Meetings')
        .add(newMeeting);

      setLoading(false);
      navigation.navigate('Calendar', {refresh: true});
    } catch (error) {
      console.error('Error creating meeting: ', error);
      setLoading(false);
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
    setModalVisible1(false);

    if (!selectedClient) {
      Alert.alert('Error', 'No client selected');
      return;
    }

    try {
      SendSMS.send(
        {
          body: smsBody,
          recipients: [selectedClient.mobile],
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        },
        (completed, cancelled, error) => {
          if (completed) {
            setPromptText('Confirmation SMS sent successfully!');
            setPromptVisible(true);
            setTimeout(() => {
              setPromptVisible(false);
            }, 3000);
          } else {
            console.log('Failed to send confirmation SMS.');
          }
        },
      );
    } catch (error) {
      console.error(error);
      console.log('Failed to send confirmation SMS.');
    }

    setSelectedClient(null);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
            <Image
              source={require('../assets/backbtn.png')}
              style={{width: 25, height: 25, marginRight: 10}}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Create Meeting</Text>
        </View>
        <Text style={styles.label}>Meeting Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter meeting title"
          onChangeText={setTitle}
          placeholderTextColor="gray"
        />

        <TouchableOpacity
          onPress={() => {
            setShowStartTime(true);
            setMode('time');
          }}
          style={styles.dateInput}>
          <Text style={styles.label}>Select Start Time</Text>
          <Text
            style={{
              color: '#00008B',
              fontWeight: '500',
              fontWeight: 'bold',
              fontSize: isFoldable ? height * 0.018 : height * 0.017,
            }}>
            Start Time: {startTime}
          </Text>
        </TouchableOpacity>

        {showStartTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleStartTimeChange}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setShowFinishTime(true);
            setMode('time');
          }}
          style={styles.dateInput}>
          <Text style={styles.label}>Select Finish Time</Text>
          <Text
            style={{
              color: '#00008B',
              fontWeight: '500',
              fontWeight: 'bold',
              fontSize: isFoldable ? height * 0.018 : height * 0.017,
            }}>
            Finish Time: {finishTime}
          </Text>
        </TouchableOpacity>

        {showFinishTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            // is24Hour={true}
            display="default"
            onChange={handleFinishTimeChange}
          />
        )}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.label}>Client</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NewClient', {startTime, date})}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.teamContainer}>
          <View style={{flexDirection: 'column', flex: 1}}>
            {selectedClient ? (
              <View style={styles.selectedClientContainer}>
                <Text style={styles.selectedClientText}>
                  {selectedClient.name}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedClient(null)}
                  style={styles.removeClientButton}>
                  <Text style={styles.removeClientText}>×</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.selectionButton}
                  onPress={() => setPreviousClientsModalVisible(true)}>
                  <Text style={styles.selectionButtonText}>
                    Select from Previous Clients
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                    marginVertical: 10,
                  }}>
                  OR
                </Text>

                <TouchableOpacity
                  style={styles.selectionButton}
                  onPress={importContacts}>
                  <Text style={styles.selectionButtonText}>
                    Import from Contacts
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.label1}>Add Description</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Type here..."
          onChangeText={setDescription}
          placeholderTextColor="gray"
        />

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateMeeting}
          disabled={loading}>
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
          }}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <Text style={styles.modalText1}>
                We will send this as confirmation SMS. Make changes if you want
                to or use this default confirmation SMS, and press the 'Send'
                button.
              </Text>

              <TextInput
                style={styles.modalTextInput1}
                onChangeText={text => setSmsBody(text)}
                value={smsBody}
                multiline
                numberOfLines={4}
                placeholderTextColor="black"
              />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={[styles.button1, styles.buttonClose1, styles.saveBtn]}
                  onPress={handleSaveSms}>
                  <Text style={styles.textStyle1}>Save SMS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button1, styles.buttonClose1]}
                  onPress={handleSendSms}>
                  <Text style={styles.textStyle1}>Send SMS</Text>
                </TouchableOpacity>
              </View>

              {savedSms.length > 0 && (
                <View style={styles.savedSmsContainer}>
                  <Text style={styles.selectText}>
                    Or select your previously saved SMS:
                  </Text>
                  <FlatList
                    data={savedSms}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
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
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton1}
                onPress={() => setModalVisible(!modalVisible)}>
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
                    }}>
                    <Text
                      style={{color: 'darkblue', fontSize: 25, lineHeight: 25}}>
                      -
                    </Text>
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
          }}>
          <View style={styles.contactsCenteredView}>
            <View style={styles.contactsModalView}>
              <Text style={styles.contactsModalTitle}>Contact List</Text>
              <Text style={styles.contactsModalSubtitle}>
                Please select the contacts to make them clients
              </Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Search contacts"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                placeholderTextColor="black"
              />

              <FlatList
                data={importedContacts.filter(contact =>
                  contact.givenName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
                )}
                keyExtractor={item => item.recordID}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      saveContact(item);
                      setContactsModalVisible(false);
                    }}
                    style={styles.contactsContainer}>
                    <View style={styles.contactsItem}>
                      <Text
                        style={
                          styles.contactsName
                        }>{`${item.givenName} ${item.familyName}`}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setContactsModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={previousClientsModalVisible}
          onRequestClose={() => setPreviousClientsModalVisible(false)}>
          <View
            style={{
              height: height * 0.6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height * 0.03, // 3% of screen height
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Previous Clients</Text>
              <FlatList
                data={team}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.clientItem}
                    onPress={() => {
                      setSelectedClient(item);
                      setPreviousClientsModalVisible(false);
                    }}>
                    <Text style={styles.clientName}>{item.name}</Text>
                    <Text style={styles.clientPhone}>{item.mobile}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setPreviousClientsModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // 4% of screen width
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: isFoldable ? height * 0.03 : height * 0.023,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: isFoldable ? '28%' : '22%',
    color: 'black',
  },
  label: {
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 4.5% of screen width
    color: '#000',
    marginBottom: height * 0.01, // 1% of screen height
  },
  label1: {
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 4.5% of screen width
    color: '#000',
    marginBottom: 0,
    marginTop: height * 0.01, // 1% of screen height
  },

  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.025, // 2.5% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 4% of screen width
    color: 'black',
  },

  dateInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: width * 0.025, // 2.5% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    color: 'black',
  },

  descriptionInput: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.02, // 2% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 4% of screen width
    minHeight: height * 0.2, // 20% of screen height
    color: 'black',
  },

  createButton: {
    backgroundColor: 'darkblue',
    padding: width * 0.025, // 2.5% of screen width
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.01, // 1% of screen height
  },

  createButtonText: {
    color: '#fff',
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 4.5% of screen width
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03, // 3% of screen height
  },
  modalView: {
    // width: width * 0.8,
    margin: width * 0.05, // 5% of screen width
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width * 0.08, // 8% of screen width
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
    padding: width * 0.025, // 2.5% of screen width
    marginBottom: height * 0.01, // 1% of screen height
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.025, // 2.5% of screen width
    paddingTop: height * 0.015, // 1.5% of screen height
    paddingBottom: height * 0.03, // 3% of screen height
    marginBottom: height * 0.02, // 2% of screen height
  },

  addButton: {
    backgroundColor: 'darkblue',
    width: isFoldable ? height * 0.034 : height * 0.028, // 7.5% of screen width
    height: isFoldable ? height * 0.035 : height * 0.029, // 7.5% of screen width
    borderRadius: width * 0.0375, // half of the button width
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: isFoldable ? height * 0.08 : height * 0.07, // 5% of screen height
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 15,
    width: width * 0.7,
    marginBottom: height * 0.01, // 1% of screen height
    paddingHorizontal: width * 0.025, // 2.5% of screen width
    color: 'black',
    fontSize: isFoldable ? width * 0.024 : width * 0.036,
  },

  addText: {
    color: '#fff',
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 5% of screen width
    fontWeight: '600',
  },

  closeButton1: {
    position: 'absolute',
    right: width * 0.025, // 2.5% of screen width
    top: height * 0.01, // 1% of screen height
  },
  closeText: {
    fontSize: width * 0.025, // 4.5% of screen width
    fontWeight: 'bold',
    color: 'black',
    marginRight: width * 0.0175, // 1.75% of screen width
  },
  modalTitle: {
    fontSize: isFoldable ? height * 0.025 : height * 0.02, // 5% of screen width
    color: '#000',
    fontWeight: 'bold',
    marginBottom: height * 0.02, // 2% of screen height
  },
  memberName: {
    fontSize: isFoldable ? height * 0.022 : height * 0.017, // 4% of screen width
    color: '#000',
    fontWeight: 'bold',
  },
  memberPhone: {
    fontSize: isFoldable ? height * 0.017 : height * 0.017, // 2.5% of screen width
    color: '#888',
    marginLeft: width * 0.025, // 2.5% of screen width
    marginTop: height * 0.001, // 1% of screen height
  },
  promptText: {
    textAlign: 'center',
    color: '#101f30',
    fontSize: width * 0.035, // 3.5% of screen width
    marginTop: height * 0.01, // 1% of screen height
  },

  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03, // 3% of screen height
  },
  modalView1: {
    width: '90%', // 90% of screen width
    height: '95%', // 95% of screen height
    margin: width * 0.05, // 5% of screen width
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width * 0.08, // 8% of screen width
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
  button1: {
    borderRadius: 15,
    padding: width * 0.025, // 2.5% of screen width
    elevation: 2,
    marginRight: width * 0.0375, // 3.75% of screen width
    marginLeft: width * 0.025, // 2.5% of screen width
    width: '40%',
  },
  buttonClose1: {
    backgroundColor: '#00008B', // Extra dark blue color
    marginLeft: width * 0.025, // 2.5% of screen width
  },
  saveBtn: {
    marginRight: width * 0.025, // 2.5% of screen width
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactsCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03, // 3% of screen height
  },
  contactsModalView: {
    margin: width * 0.05, // 5% of screen width
    backgroundColor: 'white',
    borderRadius: 20,
    padding: width * 0.08, // 8% of screen width
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
  contactsModalTitle: {
    fontSize: isFoldable ? height * 0.029 : height * 0.025, // 6% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.01, // 1% of screen height
    color: 'black',
  },
  contactsModalSubtitle: {
    fontSize: isFoldable ? height * 0.022 : height * 0.017, // 4% of screen width
    color: 'gray',
    marginBottom: height * 0.02, // 2% of screen height
  },
  contactsContainer: {
    width: width * 0.8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contactsItem: {
    padding: width * 0.025, // 2.5% of screen width
  },
  contactsName: {
    fontSize: width * 0.045, // 4.5% of screen width
    color: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  modalText1: {
    marginBottom: height * 0.015, // 1.5% of screen height
    textAlign: 'center',
    color: 'black',
  },
  modalTextInput1: {
    height: height * 0.15, // 15% of screen height
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: width * 0.025, // 2.5% of screen width
    marginBottom: height * 0.015, // 1.5% of screen height
    textAlignVertical: 'top', // Ensures the text starts from the top
  },
  savedSmsText: {
    padding: width * 0.025, // 2.5% of screen width
    marginVertical: height * 0.005, // 0.5% of screen height
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    maxHeight: height * 0.05, // 5% of screen height
    overflow: 'hidden',
  },
  savedSmsContainer: {
    marginTop: height * 0.02, // 2% of screen height
    width: '100%',
  },
  selectText: {
    textAlign: 'center',
    marginVertical: height * 0.01, // 1% of screen height
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    backgroundColor: 'darkblue',
    padding: width * 0.025, // 2.5% of screen width
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.02, // 2% of screen height
  },
  closeButtonText1: {
    color: 'white',
    fontSize: isFoldable ? height * 0.018 : height * 0.013, // 4% of screen width
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: 'white',
    fontSize: isFoldable ? height * 0.018 : height * 0.013, // 4% of screen width
    fontWeight: 'bold',
  },
  img: {
    height: height * 0.025, // 2.5% of screen height
    width: width * 0.05, // 5% of screen width
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
    gap: width * 0.035, // 3.5% of screen width
  },
  selectedClientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedClientText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  removeClientButton: {
    padding: 5,
  },
  removeClientText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectionButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectionButtonText: {
    color: '#00008B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clientItem: {
    width: width,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  clientName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  clientPhone: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  clientOptionsContainer: {
    width: '100%',
  },
  clientOptionButton: {
    backgroundColor: '#f8f8f8',
    padding: width * 0.03,
    borderRadius: 8,
    marginBottom: height * 0.01,
  },
  clientOptionText: {
    color: '#00008B',
    fontSize: isFoldable ? height * 0.02 : height * 0.016,
    textAlign: 'center',
    fontWeight: '500',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: height * 0.01,
    fontSize: isFoldable ? height * 0.018 : height * 0.014,
  },
});

export default CreateMeetingScreen;
