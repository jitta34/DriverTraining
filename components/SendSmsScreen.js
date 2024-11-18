import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,ScrollView, Alert, Platform,Dimensions} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SendSMS from 'react-native-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const defaultSmsBody = `Your appointment with {{creator}} on {{date}} at {{startTime}} has been successfully booked. The End time of meeting is {{finishTime}}. (Sent via One2One app)`;


const replacePlaceholders = (body, meeting) => {
  return body
    .replace(/{{creator}}/g, meeting.creator)
    .replace(/{{date}}/g, moment(meeting.date).format('dddd, MMMM Do YYYY'))
    .replace(/{{startTime}}/g, meeting.time)
    .replace(/{{finishTime}}/g, meeting.finishTime);
};

const SendSmsScreen = ({ route }) => {
  const { meeting } = route.params;
  const [selectedSms, setSelectedSms] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadCustomizableSmsTemplate = async () => {
      try {
        const storedSmsData = await AsyncStorage.getItem('customizableSmsTemplate');
        if (storedSmsData) {
          const { body } = JSON.parse(storedSmsData);
          const updatedSms = replacePlaceholders(body, meeting);
          setSelectedSms(updatedSms);
        } else {
          const defaultSms = replacePlaceholders(defaultSmsBody, meeting);
          setSelectedSms(defaultSms);
        }
      } catch (error) {
        console.log('Failed to load customizable SMS template from storage', error);
      }
    };
    loadCustomizableSmsTemplate();
  }, [meeting]);

  const handleEditCustomizableSms = () => {
    navigation.navigate('EditSms', {
      initialSms: selectedSms,
      onSaveSmsBody: (newSmsBody) => {
        const updatedSms = replacePlaceholders(newSmsBody, meeting);
        setSelectedSms(updatedSms);
      },
    });
  };

  const handleSendSms = () => {
    const allClientMobileNumbers = meeting.clients.map(client => client.mobile);

    SendSMS.send({
      body: selectedSms,
      recipients: allClientMobileNumbers,
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
    }, (completed, cancelled, error) => {
      if (completed) {
        Alert.alert('Success', 'Reminder SMS sent successfully to all clients!');
      } else if (cancelled) {
        Alert.alert('Cancelled', 'SMS sending cancelled.');
      } else if (error) {
        console.error('Error sending SMS:', error);
        Alert.alert('Error', 'Failed to send reminder SMS to clients.');
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack('MeetingDetails')}>
            <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
          </TouchableOpacity>
          <Text style={styles.header}>Send SMS </Text>
        </View>
        <TouchableOpacity style={styles.smsCard}>
          <Text style={styles.smsText}>{selectedSms}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditCustomizableSms}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendSms}>
          <Text style={styles.buttonText}>Send SMS</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginLeft:isFoldable? width * 0.25:width * 0.22,
    color:'black'
  },
 
  smsCard: {
    padding: width * 0.05,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  smsText: {
    fontSize: isFoldable ? height * 0.024: height * 0.018,
    color: '#333',
    marginBottom: height * 0.01,
  },
  editButton: {
    marginTop: height * 0.01,
    backgroundColor: '#007bff',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  sendButton: {
    backgroundColor: '#28a745',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.3,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: isFoldable ? height * 0.024: height * 0.018,
  },
});

export default SendSmsScreen;