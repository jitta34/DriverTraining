import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditSmsTemplateScreen = ({ route }) => {
  const [smsTemplate, setSmsTemplate] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const storedSmsData = await AsyncStorage.getItem('customizableSmsTemplate');
        if (storedSmsData) {
          const { body } = JSON.parse(storedSmsData);
          setSmsTemplate(body);
        }
      } catch (error) {
        console.log('Failed to load customizable SMS template from storage', error);
      }
    };

    loadTemplate();
  }, []);

  const handleSaveTemplate = async () => {
    try {
      const templateData = {
        body: smsTemplate,
        timestamp: new Date().toISOString(),
      };
      await AsyncStorage.setItem('customizableSmsTemplate', JSON.stringify(templateData));
      Alert.alert('Success', 'SMS template updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.log('Error saving template:', error);
      Alert.alert('Error', 'Failed to save SMS template.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Edit Customizable SMS Template</Text>
      <TextInput
        value={smsTemplate}
        onChangeText={setSmsTemplate}
        multiline
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 20 }}
      />
      <Button title="Save Template" onPress={handleSaveTemplate} />
    </View>
  );
};

export default EditSmsTemplateScreen;
