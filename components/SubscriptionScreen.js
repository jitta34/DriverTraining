import React from 'react';
import { Button } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const SubscriptionScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentIntent = async () => {
    try {
      const response = await fetch('https://swnwk83j-4002.inc1.devtunnels.ms/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: 'item-id' }], // replace 'item-id' with your actual item ID
        }),
      });
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching payment intent:', error);
    }
  };
  

  const openPaymentSheet = async () => {
    const clientSecret = await fetchPaymentIntent();
  
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      googlePay: true,
      merchantCountryCode: 'IN', // Set this to 'IN' for India
      merchantDisplayName: 'Your Business Name', // replace 'Your Business Name' with your actual business name
    });
  
    if (!error) {
      const { error: presentError } = await presentPaymentSheet({ clientSecret });
  
      if (presentError) {
        console.log('Error presenting payment sheet:', presentError);
      }
    } else {
      console.log('Error initializing payment sheet:', error);
    }
  };
  
  
  // const openPaymentSheet = async () => {
  //   const clientSecret = await fetchPaymentIntent();
  
  //   try {
  //     const { error } = await initPaymentSheet({
  //       paymentIntentClientSecret: clientSecret,
  //       googlePay: true,
  //       merchantCountryCode: 'US',
  //     });
  
  //     if (error) {
  //       console.log('Error initializing payment sheet:', error);
  //     } else {
  //       const { error: presentError } = await presentPaymentSheet({ clientSecret });
  
  //       if (presentError) {
  //         console.log('Error presenting payment sheet:', presentError);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error opening payment sheet:', error);
  //   }
  // };
  

  return <Button title="Pay" onPress={openPaymentSheet} />;
};

export default SubscriptionScreen;


// import React from 'react';
// import { Button } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';

// const SubscriptionScreen = () => {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const fetchPaymentSheetParams = async () => {
//     // Here, you should fetch the PaymentSheet parameters from your backend
//     const response = await fetch('https://swnwk83j-4002.inc1.devtunnels.ms/create-payment-intent');
//     const { paymentIntent, ephemeralKey, customer } = await response.json();
//     return { paymentIntent, ephemeralKey, customer };
//   };

//   const openPaymentSheet = async () => {
//     const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//     const { error } = await initPaymentSheet({
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//       googlePay: true,
//       merchantCountryCode: 'US',
//     });

//     if (!error) {
//       await presentPaymentSheet({ clientSecret: paymentIntent });
//     }
//   };

//   return <Button title="Pay" onPress={openPaymentSheet} />;
// };

// export default SubscriptionScreen;





// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
// import { initGooglePay, presentGooglePay } from '@stripe/stripe-react-native';

// // Get the screen's width and height
// const { width, height } = Dimensions.get('window');

// const API_URL = 'https://swnwk83j-4002.inc1.devtunnels.ms/payment-sheet'; // Replace with your server URL

// const SubscriptionScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const navigation = useNavigation(); 
//   const subscriptions = [
//     { id: 2, title: 'Monthly', price: 'INR 39.99/month', originalPrice: 'INR 79.99/month', includes: 'Includes family sharing', discount: '50% OFF' },
//   ];

//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const { paymentIntent, ephemeralKey, customer } = await response.json();
//     return {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//     };
//   };

//   const initialisePaymentSheet = async () => {
//     const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
  
//     const { error } = await initGooglePay({
//       environment: 'TEST', // or 'PRODUCTION'
//       theme: 'LIGHT', // or 'DARK'
//       merchantName: 'Example Inc.',
//       countryCode: 'US', // your country code
//       billingAddressRequired: false,
//     });
  
//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       setLoading(false);
//     }
//   };

//   const buy = async () => {
//     if (!loading) {
//       const { error } = await presentGooglePay({
//         clientSecret: paymentIntent,
//       });
  
//       if (error) {
//         Alert.alert(`Error code: ${error.code}`, error.message);
//       } else {
//         Alert.alert('Success', 'The payment was confirmed successfully');
//       }
//     }
//   };

//   const handleSubscriptionPress = (id) => {
//     setSelectedSubscription(id);
//   };

//   useEffect(() => {
//     initialisePaymentSheet();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>SUBSCRIPTION</Text>
//       <Text style={styles.subHeader}>App Premium</Text>
//       <Text style={styles.description}>Be the chance to get exclusive offers and the latest news on our product directly in application.</Text>
//       <ScrollView>
//       {subscriptions.map((subscription) => (
//   <TouchableOpacity
//     key={subscription.id}
//     style={[
//       styles.subscriptionCard,
//       selectedSubscription === subscription.id ? styles.selectedSubscriptionCard : null,
//     ]}
//     onPress={() => handleSubscriptionPress(subscription.id)}
//   >
//     <View style={styles.checkboxContainer}>
//       <View style={selectedSubscription === subscription.id ? styles.checkedCircle : styles.circle}>
//         {selectedSubscription === subscription.id && <Text style={styles.checkMark}>✓</Text>}
//       </View>
//     </View>
//     <View style={styles.subscriptionDetails}>
//       {subscription.discount && (
//         <Text style={styles.subscriptionDiscount}>{subscription.discount}</Text>
//       )}
//       <Text style={styles.subscriptionTitle}>{subscription.title}</Text>
//       <View style={styles.priceContainer}>
//       <Text style={styles.subscriptionPrice}>{subscription.price}</Text>  
//         {subscription.originalPrice && <Text style={styles.subscriptionOriginalPrice}>{subscription.originalPrice}</Text>}
       
//       </View>
//       <Text style={styles.subscriptionIncludes}>{subscription.includes}</Text>
//     </View>
//   </TouchableOpacity>
// ))}
//       </ScrollView>
// <TouchableOpacity style={styles.subscribeButton} onPress={buy}>
//   <Text style={styles.subscribeButtonText}  >Subscribe Now</Text>
// </TouchableOpacity>
//     </View>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
// import { initGooglePay, presentGooglePay, } from '@stripe/stripe-react-native';

// // Get the screen's width and height
// const { width, height } = Dimensions.get('window');

// // const API_URL = 'https://swnwk83j-4002.inc1.devtunnels.ms/payment-sheet'; // Replace with your server URL

// // const SubscriptionScreen = () => {
// //   const [loading, setLoading] = useState(true);
// //   const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

//   useEffect(() => {
//     initialisePaymentSheet();
//   }, []);

//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const { paymentIntent, ephemeralKey, customer } = await response.json();
//     return {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//     };
//   };

//   const initialisePaymentSheet = async () => {
//     const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//     const { error } = await initPaymentSheet({
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//       merchantDisplayName: 'Example Inc.',
//       allowsDelayedPaymentMethods: true,
//     });

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       setLoading(false);
//     }
//   };

//   const buy = async () => {
//     if (!loading) {
//       const { error } = await presentPaymentSheet();

//       if (error) {
//         Alert.alert(`Error code: ${error.code}`, error.message);
//       } else {
//         Alert.alert('Success', 'The payment was confirmed successfully');
//       }
//     }
//   };

// const API_URL = 'https://swnwk83j-4002.inc1.devtunnels.ms/payment-sheet'; // Replace with your server URL

// const SubscriptionScreen = () => {
  // const [loading, setLoading] = useState(true);
  // const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  // useEffect(() => {
  //   initialisePaymentSheet();
  // }, []);

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(API_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const { paymentIntent, ephemeralKey, customer } = await response.json();
  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  // const initialisePaymentSheet = async () => {
  //   const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

  //   const { error } = await initPaymentSheet({
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     merchantDisplayName: 'Example Inc.',
  //     googlePay: true, // Enable Google Pay
  //     allowsDelayedPaymentMethods: true,
  //   });

  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     setLoading(false);
  //   }
  // };

  // const buy = async () => {
  //   if (!loading) {
  //     const { error } = await presentPaymentSheet();

  //     if (error) {
  //       Alert.alert(`Error code: ${error.code}`, error.message);
  //     } else {
  //       Alert.alert('Success', 'The payment was confirmed successfully');
  //     }
  //   }
  // };

  // const initialisePaymentSheet = async () => {
  //   const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
  
  //   const { error } = await initGooglePay({
  //     environment: 'TEST', // or 'PRODUCTION'
  //     theme: 'LIGHT', // or 'DARK'
  //     merchantName: 'Example Inc.',
  //     countryCode: 'US', // your country code
  //     billingAddressRequired: false,
  //   });
  
  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     setLoading(false);
  //   }
  // };
  
  // const buy = async () => {
  //   if (!loading) {
  //     const { error } = await presentGooglePay({
  //       clientSecret: paymentIntent,
  //     });
  
  //     if (error) {
  //       Alert.alert(`Error code: ${error.code}`, error.message);
  //     } else {
  //       Alert.alert('Success', 'The payment was confirmed successfully');
  //     }
  //   }
  // };


  
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const navigation = useNavigation(); 
//   const subscriptions = [
//     { id: 2, title: 'Monthly', price: 'INR 39.99/month', originalPrice: 'INR 79.99/month', includes: 'Includes family sharing', discount: '50% OFF' },

//   ];

//   const handleSubscriptionPress = (id) => {
//     setSelectedSubscription(id);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>SUBSCRIPTION</Text>
//       <Text style={styles.subHeader}>App Premium</Text>
//       <Text style={styles.description}>Be the chance to get exclusive offers and the latest news on our product directly in application.</Text>
//       <ScrollView>
//       {subscriptions.map((subscription) => (
//   <TouchableOpacity
//     key={subscription.id}
//     style={[
//       styles.subscriptionCard,
//       selectedSubscription === subscription.id ? styles.selectedSubscriptionCard : null,
//     ]}
//     onPress={() => handleSubscriptionPress(subscription.id)}
//   >
//     <View style={styles.checkboxContainer}>
//       <View style={selectedSubscription === subscription.id ? styles.checkedCircle : styles.circle}>
//         {selectedSubscription === subscription.id && <Text style={styles.checkMark}>✓</Text>}
//       </View>
//     </View>
//     <View style={styles.subscriptionDetails}>
//       {subscription.discount && (
//         <Text style={styles.subscriptionDiscount}>{subscription.discount}</Text>
//       )}
//       <Text style={styles.subscriptionTitle}>{subscription.title}</Text>
//       <View style={styles.priceContainer}>
//       <Text style={styles.subscriptionPrice}>{subscription.price}</Text>  
//         {subscription.originalPrice && <Text style={styles.subscriptionOriginalPrice}>{subscription.originalPrice}</Text>}
       
//       </View>
//       <Text style={styles.subscriptionIncludes}>{subscription.includes}</Text>
//     </View>
//   </TouchableOpacity>
// ))}
//       </ScrollView>
// <TouchableOpacity style={styles.subscribeButton} onPress={buy}>
//   <Text style={styles.subscribeButtonText}  >Subscribe Now</Text>
// </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: width * 0.05, // 5% of screen width
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: width * 0.0425, // 4.25% of screen width
//     alignSelf:'center',
//     color:'#434343'
//   },
//   subHeader: {
//     fontSize: width * 0.045, // 4.5% of screen width
//     marginBottom: height * 0.01, // 1% of screen height
//     alignSelf:'center',
//     marginTop: height * 0.05, // 5% of screen height
//     fontWeight:'700',
//     color:'#434343'
//   },
//   description: {
//     fontSize: width * 0.04, // 4% of screen width
//     marginBottom: height * 0.02, // 2% of screen height
//     color:'#807C83'
//   },
//   selectedSubscriptionCard: {
//     backgroundColor: '#e8f8ff',
//     borderRadius: 12,
//     padding: width * 0.05, // 5% of screen width
//     marginBottom: height * 0.02, // 2% of screen height
//   },
//   subscriptionTitle: {
//     fontSize: width * 0.045, // 4.5% of screen width
//     fontWeight: '700',
//     color:'#434343'
//   },
//   subscriptionPrice: {
//     fontSize: width * 0.04, // 4% of screen width
//     color: '#434343',
//     marginBottom: height * 0.01, // 1% of screen height
//     marginRight: width * 0.0225, // 2.25% of screen width
//   },
//   subscriptionOriginalPrice: {
//     fontSize: width * 0.0325, // 3.25% of screen width
//     color: 'gray',
//     textDecorationLine: 'line-through',
//     marginBottom: height * 0.01, // 1% of screen height
//   },
//   subscriptionIncludes: {
//     fontSize: width * 0.04, // 4% of screen width
//     color: 'gray',
//   },
//   subscriptionDiscount: {
//     fontSize: width * 0.03, // 3% of screen width
//     color: 'white',
//     backgroundColor: 'darkblue',
//     position: 'absolute',
//     bottom: '80%',
//     right: -12,
//     padding: width * 0.015, // 1.5% of screen width
//     borderRadius: 23,
//   },
//   selectedSubscriptionText: {
//     color: 'white',
//   },
//   autoRenewal: {
//     fontSize: width * 0.04, // 4% of screen width
//     color: 'gray',
//     marginTop: height * 0.02, // 2% of screen height
//     marginBottom: height * 0.10, // 2% of screen height
//   },
//   subscribeButton: {
//     height: height * 0.052, // 4% of screen height
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//     backgroundColor: 'darkblue',
//     width: width * 0.85, // 90% of screen width
//     alignSelf:'center'
//   },
//   subscribeButtonText: {
//     color: '#fff',
//     fontSize: width * 0.0425, // 4.25% of screen width
//     fontWeight: '600',
//   },
//   originalPrice: {
//     textDecorationLine: 'line-through',
//     marginRight: width * 0.0125, // 1.25% of screen width
//     color:'#807C83'
//   },
//   offerText: {
//     fontSize: width * 0.0325, // 3.25% of screen width
//     color: 'gray',
//     textAlign: 'center',
//     marginBottom: height * 0.01, // 1% of screen height
//     color:'#434343'
//   },
//   circle: {
//     width: width * 0.066, // 6% of screen width
//     height: height * 0.033, // 2.4% of screen height
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: height * 0.015, // 1.5% of screen height
//   },
//   checkedCircle: {
//     width: width * 0.066, // 6% of screen width
//     height: height * 0.033, // 2.4% of screen height
//     borderRadius: 12,
//     backgroundColor: 'darkblue',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   checkMark: {
//     color: 'white',
//     fontSize: width * 0.0375, // 3.75% of screen width
//   },
//   subscriptionCard: {
//     flexDirection: 'row',
//     padding: width * 0.05, // 5% of screen width
//     borderColor: 'gray',
    
//     borderWidth: 0.5,
//     borderRadius: 10,
//     marginBottom: height * 0.02, // 2% of screen height
//   },
//   checkboxContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   subscriptionDetails: {
//     flex: 4,
//     marginLeft: width * 0.025, // 2.5% of screen width
//   },
// });

