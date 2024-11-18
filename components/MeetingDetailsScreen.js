import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MeetingDetailsScreen = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;

    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Meetings')
      .onSnapshot((querySnapshot) => {
        const meetings = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });

        setMeetings(meetings);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scheduled Meetings</Text>
      <FlatList
        data={meetings}
        renderItem={({ item }) => (
          <View style={styles.meetingCard}>
            <Text style={styles.meetingCreator}>Creator: {item.creator}</Text>
            <Text style={styles.meetingTitle}>Title: {item.title}</Text>
            <Text style={styles.meetingDate}>Date: {item.date}</Text>
            <Text style={styles.meetingTime}>Time: {item.time}</Text>
            <Text style={styles.meetingDescription}>Description: {item.description}</Text>
            <Text style={styles.meetingTeam}>Team Members: {item.clients.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0074D9',
    textAlign: 'center',
    marginVertical: 20,
  },
  meetingCard: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0074D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  meetingCreator: {
    color: '#0074D9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  meetingTitle: {
    color: '#000000',
    fontSize: 14,
    marginTop: 10,
  },
  meetingDate: {
    color: '#000000',
    fontSize: 14,
    marginTop: 10,
  },
  meetingTime: {
    color: '#000000',
    fontSize: 14,
    marginTop: 10,
  },
  meetingDescription: {
    color: '#000000',
    fontSize: 14,
    marginTop: 10,
  },
  meetingTeam: {
    color: '#000000',
    fontSize: 14,
    marginTop: 10,
  },
});

export default MeetingDetailsScreen;
