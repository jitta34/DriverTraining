
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions, Modal} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import SendSMS from 'react-native-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  
const { width, height } = Dimensions.get('window');

const months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const CalendarScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00 AM');
  const [startDate, setStartDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [clientName, setClientName] = useState('');
  const [team, setTeam] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
 
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  

  

  useEffect(() => {
    // Get the current month when the component mounts
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    setSelectedMonth(currentMonth);
  }, []);

  const handleMonthButtonPress = () => {
    // Toggle the visibility of the month selection modal
    setMonthModalVisible(!isMonthModalVisible);
  };

  const handleMonthSelect = (month) => {
    // Update the selected month
    setSelectedMonth(month);
    // Update the calendar display based on the selected month (assuming handleMonthChange does this)
    handleMonthChange(month);
    // Close the modal
    setMonthModalVisible(false);
  };


  const handleMonthPress = (month) => {
    setSelectedMonth(month);
    onSelectMonth(month); // Call the parent handler with the selected month
  };

  const [modalVisible, setModalVisible] = useState(false);
const [selectedMeeting, setSelectedMeeting] = useState(null);

const [highlightedDate, setHighlightedDate] = useState(null);
const [highlightedTime, setHighlightedTime] = useState(null);

const [smsBody, setSmsBody] = useState('');


const { selectedDate: highlightedDateParam, selectedTime: highlightedTimeParam } = route.params || {};
const highlightedDateFromParam = highlightedDateParam ? new Date(highlightedDateParam) : null;

const [firstVisit, setFirstVisit] = useState(true);
const handleDeleteMeeting = () => {
  const user = auth().currentUser;

  firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Meetings')
    .doc(selectedMeeting.key)
    .delete()
    .then(() => {
      console.log("Meeting successfully deleted!");
      setModalVisible(!modalVisible);
    })
    .catch((error) => {
      console.error("Error removing meeting: ", error);
    });
};



useEffect(() => {
  const checkFirstVisit = async () => {
    const hasVisitedBefore = await AsyncStorage.getItem('hasVisitedCalendar');
    if (hasVisitedBefore) {
      setFirstVisit(false);
    } else {
      await AsyncStorage.setItem('hasVisitedCalendar', 'true');
    }
  };

  checkFirstVisit();
}, []);

const handleMonthChange = (selectedMonth) => {
  // Update the calendar display based on the selected month
  console.log(`Selected month: ${selectedMonth}`);

  // Calculate the new dates array for the selected month
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), months.indexOf(selectedMonth), 1);
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), months.indexOf(selectedMonth) + 1, 0);
  const newDates = Array.from({ length: lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1 }, (_, i) => {
    const currentDate = new Date(firstDayOfMonth);
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate;
  });

  // Update the start date with the first day of the selected month
  setStartDate(firstDayOfMonth);
};

useEffect(() => {
  if (highlightedDateFromParam && highlightedDateFromParam.toISOString() !== selectedDate.toISOString()) {
    setSelectedDate(highlightedDateFromParam);
  }
  if (highlightedTimeParam && highlightedTimeParam !== selectedTime) {
    setSelectedTime(highlightedTimeParam);
  }
}, [highlightedDateFromParam, highlightedTimeParam]);


useFocusEffect(
  useCallback(() => {
    // Update the state here
    const { selectedDate: highlightedDateStr, selectedTime: highlightedTime } = route.params || {};
    const highlightedDate = highlightedDateStr ? new Date(highlightedDateStr) : null;

    if (highlightedDate) {
      setSelectedDate(highlightedDate);
    }
    if (highlightedTime) {
      setSelectedTime(highlightedTime);
    }
  }, [])
);


useEffect(() => {
  const fetchHighlightedMeeting = async () => {
    const highlightedDateStr = await AsyncStorage.getItem('highlightedDate');
    const highlightedTime = await AsyncStorage.getItem('highlightedTime');
    if (highlightedDateStr && highlightedTime) {
      setHighlightedDate(new Date(highlightedDateStr));
      setHighlightedTime(highlightedTime);
    }
  };

  fetchHighlightedMeeting();
}, []);





  useEffect(() => {
    // Get the current user
    const user = auth().currentUser;

    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Meetings')
      .onSnapshot((querySnapshot) => {
        const meetings = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // required for FlatList
          };
        });

        setMeetings(meetings);
      });

    // Unsubscribe from events when no longer in use
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSelectedDate(startDate);
  }, [startDate]);

  const dates = Array.from({ length: 5 }, (_, i) => new Date(startDate.getTime() + 86400000 * i));
  // const times = Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${i < 24 ? 'AM' : 'PM'}`);
  const times = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minutes = 15 * (i % 4);
    const period = hour < 12 ? 'AM' : 'PM';
    
    return `${hour}:${minutes === 0 ? '00' : minutes} ${period}`;
  });
  
  const dateScrollRef = useRef();
  const gridScrollRef = useRef();

  const handleDatePress = (date) => {
    setSelectedDate(date);
    navigation.navigate('CreateMeetings', { date: date.toISOString() });
  };

  const handleSeeAll = (date) => {
    
    navigation.navigate('MeetingDetails');
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
  };

  
  
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

  // const handleCellPress = async (date, time) => {
  //   setHighlightedDate(date);
  //   setHighlightedTime(time);
    
  //   await AsyncStorage.setItem('highlightedDate', date.toISOString());
  //   await AsyncStorage.setItem('highlightedTime', time);
  //   const meeting = meetings.find(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time);
  //   if (meeting) {
  //     setSelectedMeeting(meeting);
  //     setClientName(meeting.clients[3]); // Set the client's name
  //     setSmsBody(`Reminder: Your appointment with ${meeting.creator} on ${new Date(meeting.date).toDateString()} at ${meeting.time} has been successfully booked. The End time of meeting is ${meeting.finishTime}. To reschedule please call ${meeting.creator}. (Sent via One2One app)`);
  //     setModalVisible(true);
  //   } else {
  //     if (!modalVisible) {
  //       navigation.navigate('CreateMeetings', { date: date.toISOString(), time });
  //     }
  //   }
  // };

  const handleCellPress = async (date, time) => {
    setHighlightedDate(date);
    setHighlightedTime(time);
    
    await AsyncStorage.setItem('highlightedDate', date.toISOString());
    await AsyncStorage.setItem('highlightedTime', time);
    
    const meeting = meetings.find(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time);
    
    if (meeting) {
      setSelectedMeeting(meeting);
      setClientName(meeting.clients[3]); // Set the client's name
      setSmsBody(`Reminder: Your appointment with ${meeting.creator} on ${new Date(meeting.date).toDateString()} at ${meeting.time} has been successfully booked. The End time of meeting is ${meeting.finishTime}. To reschedule please call ${meeting.creator}. (Sent via One2One app)`);
      setModalVisible(true);
    } else {
      if (!modalVisible) {
        navigation.navigate('CreateMeetings', { date: date.toISOString(), time });
      }
    }
  };
  


  const handleSendSms = () => {
    // Prepare the list of all client mobile numbers
    let allClientMobileNumbers = selectedMeeting.clients.map(client => client.mobile);
  
    console.log('All client mobile numbers: ', allClientMobileNumbers); // Log all client mobile numbers
  
    // Send reminder SMS to all clients
    try {
      SendSMS.send({
        body: smsBody,
        recipients: allClientMobileNumbers, // all the phone numbers of the clients
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true
      }, (completed, cancelled, error) => {
        if(completed){
          console.log(`Reminder SMS sent successfully to all clients!`);
        } else {
          console.log(`Failed to send reminder SMS to clients.`);
          if (error) {
            console.log('Error details: ', error); // Log error details
          }
        }
      });
    } catch (error) {
      console.error(error);
      console.log(`Failed to send reminder SMS to clients.`);
    }
  };
  

  const handleDateScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    gridScrollRef.current.scrollTo({ x, animated: false });
  };

  const handleGridScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    dateScrollRef.current.scrollToOffset({ offset: x, animated: false });
  };

  const handleNextPress = () => {
    setStartDate(prevDate => new Date(prevDate.getTime() + 5 * 86400000));
  };

  const handleBackPress = () => {
    setStartDate(prevDate => new Date(prevDate.getTime() - 5 * 86400000));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Calendar</Text>
    <View style={styles.monthSelector}>
    <TouchableOpacity
          style={styles.monthButton}
          onPress={handleMonthButtonPress}
        >
          <Text style={styles.monthButtonText}>{selectedMonth}</Text>
        </TouchableOpacity>
    </View>
       
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={isMonthModalVisible}
  onRequestClose={() => setMonthModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeaderText}>Please Select Month:</Text>
      <ScrollView>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={styles.modalMonthButton}
            onPress={() => handleMonthSelect(month)}
          >
            <Text style={styles.modalMonthText}>{month}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.closeButton1}
        onPress={() => setMonthModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      <FlatList
        key={`${selectedDate}-${selectedTime}-dateScroll`}
        ref={dateScrollRef}
        horizontal
        onScroll={handleDateScroll}
        scrollEventThrottle={16}
        data={[{ isPlaceholder: true }, ...dates]}
        renderItem={({ item: date, index }) => (
          date.isPlaceholder ?
            <View style={styles.emptyCell}>
              <TouchableOpacity onPress={handleBackPress}>
                <Image style={styles.backimg} source={require('../assets/back.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextPress}>
                <Image style={styles.nextimg} source={require('../assets/nexti.png')} />
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => handleDatePress(date)} style={styles.dateButton}>
              {/* <Text style={styles.dateText}>{date.toDateString()}</Text> */}
              <Text style={styles.dateText}>{`${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`}</Text>
              {meetings.some(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === selectedTime) && (
                <View style={styles.highlight} />
              )}
            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
      <ScrollView
        key={`${selectedDate}-${selectedTime}-gridScroll`}
        ref={gridScrollRef}
        onScroll={handleGridScroll}
        scrollEventThrottle={16}
      >
        {times.map((time, i) => (
          <View key={`${time}-${i}`} style={styles.row}>
            <TouchableOpacity onPress={() => handleTimePress(time)} style={styles.timeButton}>
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
            {dates.map((date, j) => (
  <TouchableOpacity key={`${date}-${j}`} style={styles.cell} onPress={() => handleCellPress(date, time)}>
    <View style={[styles.cellContent, meetings.some(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time) ? styles.highlightedCell : {}]}>
      {meetings.map(meeting => {
        if (new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time) {
          return (
            <Text style={styles.clientName}>{meeting.clients.map(client => client.name).join(', ')}</Text> // Display all client names
          );
        }
      })}
    </View>
  </TouchableOpacity>
))}

            </View>
          </View>
        ))}
      </ScrollView>
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
            {selectedMeeting && (
              <>
              <Text style={styles.modalTitle}> Meeting Details</Text>
              <View style={{alignSelf:'center'}} >
                <Text style={styles.modalText}>Creator: {selectedMeeting.creator}</Text>
                <Text style={styles.modalText}>Title: {selectedMeeting.title}</Text>
                <Text style={styles.modalText}>Date: {new Date(selectedMeeting.date).toDateString()}</Text>
                <Text style={styles.modalText}> Start Time: {selectedMeeting.time}</Text>
                <Text style={styles.modalText}> Finish Time: {selectedMeeting.finishTime}</Text>
                <Text style={styles.modalText}>Description: {selectedMeeting.description}</Text> 

                <Text style={styles.modalText}>Clients: {selectedMeeting.clients.map(client => client.name).join(', ')}</Text>
                </View>
              </>
            )}
            <View style={{flexDirection:'row', justifyContent:"space-between"}} >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

           

            <TouchableOpacity
  style={styles.deleteButton}
  onPress={handleDeleteMeeting}
>
  <Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>
</View>
<TouchableOpacity
  style={styles.sendButton}
  onPress={handleSendSms}
>
  <Text style={styles.sendText}>Send Reminder SMS</Text>
</TouchableOpacity>

          </View>
        </View>
      </Modal>
   
    </View>
  );
};



import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions, Modal} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import SendSMS from 'react-native-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  
const { width, height } = Dimensions.get('window');

const months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const CalendarScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00 AM');
  const [startDate, setStartDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [clientName, setClientName] = useState('');
  const [team, setTeam] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
 
  const [isMonthModalVisible, setMonthModalVisible] = useState(false);
  

  

  useEffect(() => {
    // Get the current month when the component mounts
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    setSelectedMonth(currentMonth);
  }, []);

  const handleMonthButtonPress = () => {
    // Toggle the visibility of the month selection modal
    setMonthModalVisible(!isMonthModalVisible);
  };

  const handleMonthSelect = (month) => {
    // Update the selected month
    setSelectedMonth(month);
    // Update the calendar display based on the selected month (assuming handleMonthChange does this)
    handleMonthChange(month);
    // Close the modal
    setMonthModalVisible(false);
  };


  const handleMonthPress = (month) => {
    setSelectedMonth(month);
    onSelectMonth(month); // Call the parent handler with the selected month
  };

  const [modalVisible, setModalVisible] = useState(false);
const [selectedMeeting, setSelectedMeeting] = useState(null);

const [highlightedDate, setHighlightedDate] = useState(null);
const [highlightedTime, setHighlightedTime] = useState(null);

const [smsBody, setSmsBody] = useState('');


const { selectedDate: highlightedDateParam, selectedTime: highlightedTimeParam } = route.params || {};
const highlightedDateFromParam = highlightedDateParam ? new Date(highlightedDateParam) : null;

const [firstVisit, setFirstVisit] = useState(true);
const handleDeleteMeeting = () => {
  const user = auth().currentUser;

  firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Meetings')
    .doc(selectedMeeting.key)
    .delete()
    .then(() => {
      console.log("Meeting successfully deleted!");
      setModalVisible(!modalVisible);
    })
    .catch((error) => {
      console.error("Error removing meeting: ", error);
    });
};



useEffect(() => {
  const checkFirstVisit = async () => {
    const hasVisitedBefore = await AsyncStorage.getItem('hasVisitedCalendar');
    if (hasVisitedBefore) {
      setFirstVisit(false);
    } else {
      await AsyncStorage.setItem('hasVisitedCalendar', 'true');
    }
  };

  checkFirstVisit();
}, []);

const handleMonthChange = (selectedMonth) => {
  // Update the calendar display based on the selected month
  console.log(`Selected month: ${selectedMonth}`);

  // Calculate the new dates array for the selected month
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), months.indexOf(selectedMonth), 1);
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), months.indexOf(selectedMonth) + 1, 0);
  const newDates = Array.from({ length: lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1 }, (_, i) => {
    const currentDate = new Date(firstDayOfMonth);
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate;
  });

  // Update the start date with the first day of the selected month
  setStartDate(firstDayOfMonth);
};

useEffect(() => {
  if (highlightedDateFromParam && highlightedDateFromParam.toISOString() !== selectedDate.toISOString()) {
    setSelectedDate(highlightedDateFromParam);
  }
  if (highlightedTimeParam && highlightedTimeParam !== selectedTime) {
    setSelectedTime(highlightedTimeParam);
  }
}, [highlightedDateFromParam, highlightedTimeParam]);


useFocusEffect(
  useCallback(() => {
    // Update the state here
    const { selectedDate: highlightedDateStr, selectedTime: highlightedTime } = route.params || {};
    const highlightedDate = highlightedDateStr ? new Date(highlightedDateStr) : null;

    if (highlightedDate) {
      setSelectedDate(highlightedDate);
    }
    if (highlightedTime) {
      setSelectedTime(highlightedTime);
    }
  }, [])
);


useEffect(() => {
  const fetchHighlightedMeeting = async () => {
    const highlightedDateStr = await AsyncStorage.getItem('highlightedDate');
    const highlightedTime = await AsyncStorage.getItem('highlightedTime');
    if (highlightedDateStr && highlightedTime) {
      setHighlightedDate(new Date(highlightedDateStr));
      setHighlightedTime(highlightedTime);
    }
  };

  fetchHighlightedMeeting();
}, []);





  useEffect(() => {
    // Get the current user
    const user = auth().currentUser;

    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Meetings')
      .onSnapshot((querySnapshot) => {
        const meetings = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // required for FlatList
          };
        });

        setMeetings(meetings);
      });

    // Unsubscribe from events when no longer in use
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setSelectedDate(startDate);
  }, [startDate]);

  const dates = Array.from({ length: 5 }, (_, i) => new Date(startDate.getTime() + 86400000 * i));
  // const times = Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'} ${i < 24 ? 'AM' : 'PM'}`);
  const times = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minutes = 15 * (i % 4);
    const period = hour < 12 ? 'AM' : 'PM';
    
    return `${hour}:${minutes === 0 ? '00' : minutes} ${period}`;
  });
  
  const dateScrollRef = useRef();
  const gridScrollRef = useRef();

  const handleDatePress = (date) => {
    setSelectedDate(date);
    navigation.navigate('CreateMeetings', { date: date.toISOString() });
  };

  const handleSeeAll = (date) => {
    
    navigation.navigate('MeetingDetails');
  };

  const handleTimePress = (time) => {
    setSelectedTime(time);
  };

  
  
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

  // const handleCellPress = async (date, time) => {
  //   setHighlightedDate(date);
  //   setHighlightedTime(time);
    
  //   await AsyncStorage.setItem('highlightedDate', date.toISOString());
  //   await AsyncStorage.setItem('highlightedTime', time);
  //   const meeting = meetings.find(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time);
  //   if (meeting) {
  //     setSelectedMeeting(meeting);
  //     setClientName(meeting.clients[3]); // Set the client's name
  //     setSmsBody(`Reminder: Your appointment with ${meeting.creator} on ${new Date(meeting.date).toDateString()} at ${meeting.time} has been successfully booked. The End time of meeting is ${meeting.finishTime}. To reschedule please call ${meeting.creator}. (Sent via One2One app)`);
  //     setModalVisible(true);
  //   } else {
  //     if (!modalVisible) {
  //       navigation.navigate('CreateMeetings', { date: date.toISOString(), time });
  //     }
  //   }
  // };


  


  const handleSendSms = () => {
    // Prepare the list of all client mobile numbers
    let allClientMobileNumbers = selectedMeeting.clients.map(client => client.mobile);
  
    console.log('All client mobile numbers: ', allClientMobileNumbers); // Log all client mobile numbers
  
    // Send reminder SMS to all clients
    try {
      SendSMS.send({
        body: smsBody,
        recipients: allClientMobileNumbers, // all the phone numbers of the clients
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true
      }, (completed, cancelled, error) => {
        if(completed){
          console.log(`Reminder SMS sent successfully to all clients!`);
        } else {
          console.log(`Failed to send reminder SMS to clients.`);
          if (error) {
            console.log('Error details: ', error); // Log error details
          }
        }
      });
    } catch (error) {
      console.error(error);
      console.log(`Failed to send reminder SMS to clients.`);
    }
  };

  const handleCellPress = async (date, time) => {
    setHighlightedDate(date);
    setHighlightedTime(time);
    
    await AsyncStorage.setItem('highlightedDate', date.toISOString());
    await AsyncStorage.setItem('highlightedTime', time);
    
    const meeting = meetings.find(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time);
    
    if (meeting) {
      setSelectedMeeting(meeting);
      setClientName(meeting.clients[3]); // Set the client's name
      setSmsBody(`Reminder: Your appointment with ${meeting.creator} on ${new Date(meeting.date).toDateString()} at ${meeting.time} has been successfully booked. The End time of meeting is ${meeting.finishTime}. To reschedule please call ${meeting.creator}. (Sent via One2One app)`);
      setModalVisible(true);
    } else {
      if (!modalVisible) {
        navigation.navigate('CreateMeetings', { date: date.toISOString(), time });
      }
    }
  };
  

  const handleDateScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    gridScrollRef.current.scrollTo({ x, animated: false });
  };

  const handleGridScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    dateScrollRef.current.scrollToOffset({ offset: x, animated: false });
  };

  const handleNextPress = () => {
    setStartDate(prevDate => new Date(prevDate.getTime() + 5 * 86400000));
  };

  const handleBackPress = () => {
    setStartDate(prevDate => new Date(prevDate.getTime() - 5 * 86400000));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Calendar</Text>
    <View style={styles.monthSelector}>
    <TouchableOpacity
          style={styles.monthButton}
          onPress={handleMonthButtonPress}
        >
          <Text style={styles.monthButtonText}>{selectedMonth}</Text>
        </TouchableOpacity>
    </View>
       
      </View>

      <Modal
  animationType="slide"
  transparent={true}
  visible={isMonthModalVisible}
  onRequestClose={() => setMonthModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeaderText}>Please Select Month:</Text>
      <ScrollView>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={styles.modalMonthButton}
            onPress={() => handleMonthSelect(month)}
          >
            <Text style={styles.modalMonthText}>{month}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.closeButton1}
        onPress={() => setMonthModalVisible(false)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      <FlatList
        key={`${selectedDate}-${selectedTime}-dateScroll`}
        ref={dateScrollRef}
        horizontal
        onScroll={handleDateScroll}
        scrollEventThrottle={16}
        data={[{ isPlaceholder: true }, ...dates]}
        renderItem={({ item: date, index }) => (
          date.isPlaceholder ?
            <View style={styles.emptyCell}>
              <TouchableOpacity onPress={handleBackPress}>
                <Image style={styles.backimg} source={require('../assets/back.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextPress}>
                <Image style={styles.nextimg} source={require('../assets/nexti.png')} />
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => handleDatePress(date)} style={styles.dateButton}>
              {/* <Text style={styles.dateText}>{date.toDateString()}</Text> */}
              <Text style={styles.dateText}>{`${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`}</Text>
              {meetings.some(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === selectedTime) && (
                <View style={styles.highlight} />
              )}
            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
      <ScrollView
        key={`${selectedDate}-${selectedTime}-gridScroll`}
        ref={gridScrollRef}
        onScroll={handleGridScroll}
        scrollEventThrottle={16}
      >
        {times.map((time, i) => (
          <View key={`${time}-${i}`} style={styles.row}>
            <TouchableOpacity onPress={() => handleTimePress(time)} style={styles.timeButton}>
              <Text style={styles.timeText}>{time}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
            {dates.map((date, j) => (
  <TouchableOpacity key={`${date}-${j}`} style={styles.cell} onPress={() => handleCellPress(date, time)}>
    <View style={[styles.cellContent, meetings.some(meeting => new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time) ? styles.highlightedCell : {}]}>
      {meetings.map(meeting => {
        if (new Date(meeting.date).toDateString() === date.toDateString() && meeting.time === time) {
          return (
            <Text style={styles.clientName}>{meeting.clients.map(client => client.name).join(', ')}</Text> // Display all client names
          );
        }
      })}
    </View>
  </TouchableOpacity>
))}

            </View>
          </View>
        ))}
      </ScrollView>
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
            {selectedMeeting && (
              <>
              <Text style={styles.modalTitle}> Meeting Details</Text>
              <View style={{alignSelf:'center'}} >
                <Text style={styles.modalText}>Creator: {selectedMeeting.creator}</Text>
                <Text style={styles.modalText}>Title: {selectedMeeting.title}</Text>
                <Text style={styles.modalText}>Date: {new Date(selectedMeeting.date).toDateString()}</Text>
                <Text style={styles.modalText}> Start Time: {selectedMeeting.time}</Text>
                <Text style={styles.modalText}> Finish Time: {selectedMeeting.finishTime}</Text>
                <Text style={styles.modalText}>Description: {selectedMeeting.description}</Text> 

                <Text style={styles.modalText}>Clients: {selectedMeeting.clients.map(client => client.name).join(', ')}</Text>
                </View>
              </>
            )}
            <View style={{flexDirection:'row', justifyContent:"space-between"}} >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

           

            <TouchableOpacity
  style={styles.deleteButton}
  onPress={handleDeleteMeeting}
>
  <Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>
</View>
<TouchableOpacity
  style={styles.sendButton}
  onPress={handleSendSms}
>
  <Text style={styles.sendText}>Send Reminder SMS</Text>
</TouchableOpacity>

          </View>
        </View>
      </Modal>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: wp('5%'),
    alignSelf:'center',
    color:'#434343',
    fontWeight:'bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items horizontally
    alignItems: 'center', // Center items vertically
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  emptyCell: {
    width: wp('16%'),
    height: hp('12%'),
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    width: wp('16%'),
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  dateText: {
    fontSize: wp('2.5%'),
    color: '#333',
    marginBottom: hp('8%')
  },
  row: {
    flexDirection: 'row',
  },
  timeButton: {
    width: wp('16%'),
    height: hp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  timeText: {
    fontSize: wp('3.25%'),
    color: '#333',
  },
  clientName:{
    fontSize: wp('2.4%'), 
    color:'#FFF',
    alignSelf:'center'
  },
  monthSelector: {
    marginLeft: 'auto', // Push the button to the right
  },
  cell: {
    width: wp('16%'),
    height: hp('7.5%'),
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cellContent: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  backimg: {
    width: wp('5%'),
    height: hp('2.5%'),
  },
  nextimg: {
    width: wp('5%'),
    height: hp('2.5%'),
  },
  monthButton: {
    // Styles for the month button
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  monthButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust as needed
    maxHeight: '80%', // Limit the height if necessary
  },
  modalMonthButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalMonthText: {
    fontSize: 16,
    color: 'black',
    alignSelf:'center'
  },
  highlight:{
    backgroundColor: 'white',
    color:'white'
  },
  highlightedCell: {
    backgroundColor: '#6ed9fa',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('3%')
  },
  modalView: {
    margin: hp('2.7%'),
    backgroundColor: "white",
    borderRadius: 20,
    width: wp('80%'),
    padding: hp('4.7%'),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: hp('0.27%')
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems:'flex-start'
  },
  modalText: {
    marginBottom: hp('2.7%'),
    textAlign:'left',
    color:'black'
  },
  closeButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: hp('1.34%'),
    elevation: 2,
    width: wp('26.67%'),
    alignSelf: 'center',
    marginRight: wp('13%')
  },
  sendButton: {
    backgroundColor: "darkblue",
    alignSelf:"center",
    borderRadius: 15,
    padding: hp('1.34%'),
    elevation: 2,
    width: wp('50.67%'),
    alignSelf: 'center',
    
    marginTop:hp('4.34%'),
  },
  deleteButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: hp('1.34%'),
    elevation: 2,
    width: wp('26.67%'),
    alignSelf: 'center'
  },
  seeAllbtn:{
    backgroundColor: "white",
    borderRadius: 15,
    padding: hp('1.34%'),
    width: wp('53.33%'),
    alignSelf: 'center',
    marginTop: hp('2%')
  },
  closeText: {
    color: "darkblue",
    fontWeight: "bold",
    textAlign: "center"
  },
  sendText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  deleteText: {
    color: "darkblue",
    fontWeight: "bold",
    textAlign: "center"
  },
  seeAllText:{
    color:'black',
    fontWeight: "bold",
    textAlign: "center"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  promptContainer: {
    padding: hp('2.7%'),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.13%') },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: wp('90%')
  },
  promptText: {
    color: 'black',
    textAlign: 'center',
    fontSize: wp('4.53%'),
    fontWeight: '500'
  },
  modalTitle: {
    fontSize: wp('4.8%'),
    fontWeight:'bold',
    color:'black',
    marginBottom: hp('2%'),
    alignSelf: 'center'
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'black'
  },
  closeButton1: {
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

export default CalendarScreen;



