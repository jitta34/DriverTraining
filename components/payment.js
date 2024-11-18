import React, { useState } from 'react';
import { SafeAreaView, Button, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const Payment = () => {
  const [cardDetails, setCardDetails] = useState(null);
  const { confirmPayment } = useStripe();

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await axios.post('http://192.168.43.235:4002/payment-sheet', {
        amount: 1700,
        currency: 'INR',
      });
      return response.data.paymentIntent;
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      throw error;
    }
  };

  const handleCardChange = (details) => {
    setCardDetails(details);
  };

  const handlePayPress = async () => {
    try {
      if (!cardDetails?.complete) {
        alert('Please enter complete card details');
        return;
      }

      const clientSecret = await fetchPaymentIntentClientSecret();
      console.log('Client Secret:', clientSecret);

      const { error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        console.log('Payment Error:', error);
        alert(`Payment failed: ${error.message}`);
      } else {
        alert('Payment succeeded!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        onCardChange={handleCardChange}
        style={styles.cardField}
      />
      <Button disabled={!cardDetails?.complete} onPress={handlePayPress} title="Pay" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 20,
  },
});

export default Payment;
