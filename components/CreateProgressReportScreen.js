import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const CreateProgressReportScreen = ({navigation}) => {
  const [driverName, setDriverName] = useState('');
  const [driverEmail, setDriverEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!driverName || !driverEmail) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await firestore().collection('progress_reports').add({
        driver_name: driverName,
        driver_email: driverEmail,
        date_of_lesson: date,
        notes: notes,
        created_at: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Progress report created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create progress report');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Create Progress Report</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Driver Name *</Text>
        <TextInput
          style={styles.input}
          value={driverName}
          onChangeText={setDriverName}
          placeholder="Enter driver name"
          placeholderTextColor="gray"
        />

        <Text style={styles.label}>Driver Email *</Text>
        <TextInput
          style={styles.input}
          value={driverEmail}
          onChangeText={setDriverEmail}
          placeholder="Enter driver email"
          placeholderTextColor="gray"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Date of Lesson</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        )}

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter notes"
          placeholderTextColor="gray"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: isFoldable ? height * 0.027 : height * 0.025,
    fontWeight: 'bold',
    marginLeft: width * 0.15,
    color: 'black',
  },
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: 'black',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'darkblue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProgressReportScreen;
