import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;


const DrivingTestScreen = ({ navigation, route }) => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const { name, email } = route.params;

  const handlePress1 = () => {
    setLoading1(true);
    setTimeout(() => {
      navigation.navigate('DrivingTestForm', { name: name, email: email,  formNumber: 1 });
      setLoading1(false);
    }, 5); 
  };
  
  const handlePress2 = () => {
    setLoading2(true);
    setTimeout(() => {
      navigation.navigate('DriveForm2', { name: name, email: email, formNumber: 2 });
      setLoading2(false);
    }, 5); 
  };
  
  const handlePress3 = () => {
    setLoading3(true);
    setTimeout(() => {
      navigation.navigate('DriveForm3', { name: name, email: email, formNumber: 3});
      setLoading3(false);
    }, 5);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Driving Test Form</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress1} disabled={loading1}>
        {loading1 ? (
          <ActivityIndicator size="small" color="darkblue" /> // Show loader when loading
        ) : (
          <Text style={styles.buttonText}>Driving Test Form 1</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress2} disabled={loading2}>
        {loading2 ? (
          <ActivityIndicator size="small" color="darkblue" /> // Show loader when loading
        ) : (
          <Text style={styles.buttonText}>Driving Test Form 2</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePress3} disabled={loading3}>
        {loading3 ? (
          <ActivityIndicator size="small" color="darkblue" /> // Show loader when loading
        ) : (
          <Text style={styles.buttonText}>Driving Test Form 3</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: isFoldable ? height * 0.032 :height * 0.025,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },

  button: {
    padding: height * 0.015,
    borderRadius: 5,
    width:'87%',
    marginBottom: height * 0.04,
    borderWidth: 2,
    borderColor: '#00008B',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems:'center'
  },
  buttonText: {
    color: '#00008B',
    fontSize: isFoldable ? height * 0.032 :height * 0.020,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DrivingTestScreen;
