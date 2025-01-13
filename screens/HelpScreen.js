import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const { width, height } = Dimensions.get('window');

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>Help & Support</Text>

        <Text style={styles.subHeader}>Free Trial Issues</Text>
        <Text style={styles.description}>
          We are here to help you with any issues related to your free trial. Whether you have questions about how the trial works, need assistance with setup, or have encountered any problems, our support team is ready to assist you.
        </Text>
        <Text style={styles.description}>
          For any free trial related issues, please contact us via the following methods:
        </Text>

        <View style={styles.contactContainer}>
          <Text style={styles.contactHeader}>Phone</Text>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+911234567890')}>
            <Text style={styles.contactText}>+44 7778200600</Text>
          </TouchableOpacity>

          <Text style={styles.contactHeader}>Email</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:ghgdhf@gmail.com')}>
            <Text style={styles.contactText}>one2one.ds@gmail.com</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          Our support team is dedicated to providing you with the best possible assistance. We aim to resolve all issues promptly and ensure that you have a smooth and enjoyable experience with our services.
        </Text>
        <Text style={styles.description}>
          Don't hesitate to reach out to us for any concerns or questions. Your satisfaction is our top priority, and we are committed to helping you make the most out of your free trial.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: width * 0.05, // 5% of screen width
  },
  header: {
    fontSize: isFoldable ? height * 0.032 :height * 0.025, // 7% of screen width
    fontWeight: 'bold',
    color: 'black',
    marginBottom: height * 0.02, // 2% of screen height
    textAlign: 'center',
  },
  subHeader: {
    fontSize: isFoldable ? height * 0.028 :height * 0.022,// 5.5% of screen width
    fontWeight: '600',
    color: 'black',
    marginBottom: height * 0.01, // 1% of screen height
  },
  description: {
    fontSize: isFoldable ? height * 0.022 :height * 0.017, // 4% of screen width
    color: '#666',
    marginBottom: height * 0.02, // 2% of screen height
    lineHeight: 22,
  },
  contactContainer: {
    marginBottom: height * 0.03, // 3% of screen height
  },
  contactHeader: {
    fontSize: isFoldable ? height * 0.022 :height * 0.017, // 4.5% of screen width
    fontWeight: '500',
    color: '#333',
    marginBottom: height * 0.005, // 0.5% of screen height
  },
  contactText: {
    fontSize: isFoldable ? height * 0.022 :height * 0.017,// 4% of screen width
    color: 'darkblue',
    marginBottom: height * 0.015, // 1.5% of screen height
  },
});
