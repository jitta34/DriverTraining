import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'https://04kz46j0-4002.inc1.devtunnels.ms';

const GpayScreen = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const subscriptionId = await AsyncStorage.getItem('subscriptionId');
      
      // Check if subscriptionId is not null or undefined
      if (!subscriptionId) {
        console.error('Subscription ID not found in AsyncStorage');
        return;
      }
      
      const response = await fetch(`${API_URL}/get-subscription-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscriptionId,
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to fetch subscription status:', response);
        return;
      }
      
      const data = await response.json();
      setSubscriptionStatus(data.subscriptionStatus === 'past_due' ? 'Payment Overdue' : data.subscriptionStatus);
      
      // Check if current_period_start is not null or undefined
      if (!data.current_period_start) {
        console.error('current_period_start not found in response');
        setDaysLeft('Not Available');
      } else {
        const days = 30 - Math.floor((Date.now() - new Date(data.current_period_start * 1000)) / (1000 * 60 * 60 * 24));
        setDaysLeft(isNaN(days) ? 'Not Available' : days);
      }
      
      setLoading(false);
    };
    
    
    fetchSubscriptionStatus();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>30 Days Free Trial Status</Text>
      <Text style={styles.status}>Status: {subscriptionStatus}</Text>
      <Text style={styles.daysLeft}>Days Remaining: {daysLeft}</Text>
      <Text style={styles.paymentInfo}>Enjoy your free trial. After 30 days, a nominal fee of 5 GBP will be applicable for continued service.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  status: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  daysLeft: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  paymentInfo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default GpayScreen;