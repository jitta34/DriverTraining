// import React, { useEffect, useState } from 'react';
// import { View, Text, Alert, StyleSheet, ActivityIndicator, BackHandler, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
// import { useIAP, requestSubscription } from 'react-native-iap';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';

// const productIds = ['one2one_sub']; // Ensure this SKU matches what you've set up in Google Play Console

// const PaymentScreen = () => {
//   const {
//     connected,
//     subscriptions,
//     getSubscriptions,
//     currentPurchase,
//     finishTransaction,
//   } = useIAP();

//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert("Hold on!", "You cannot go back at this step!", [
//         { text: "OK", onPress: () => null }
//       ]);
//       return true;
//     };

//     // Handle hardware back button for Android
//     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

//     // Handle iOS/React Navigation back button
//     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
//       e.preventDefault();
//       backAction();
//     });

//     return () => {
//       backHandler.remove();
//       unsubscribe();
//     };
//   }, [navigation]);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         await getSubscriptions({ skus: productIds });
//         console.log("Subscriptions:", subscriptions);  // Add this line to check the fetched subscriptions
//       } catch (error) {
//         console.warn(error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     if (connected) {
//       initialize();
//     }
//   }, [connected, getSubscriptions, subscriptions]);
  

//   useEffect(() => {
//     if (currentPurchase) {
//       const processPurchase = async (purchase) => {
//         const receipt = purchase.transactionReceipt;
//         if (receipt) {
//           try {
//             await finishTransaction({ purchase });
//             Alert.alert('Purchase Successful', 'Your purchase has been processed successfully.', [
//               { text: 'OK', onPress: () => navigation.navigate('Home') },
//             ]);
//           } catch (error) {
//             console.warn('Error finishing transaction', error);
//           }
//         }
//       };

//       processPurchase(currentPurchase);
//     }
//   }, [currentPurchase, finishTransaction, navigation]);

//   const handlePurchase = async () => {
//     console.log("Subscription button pressed");
//     try {
//       await requestSubscription({ sku: productIds[0] });
//     } catch (error) {
//       console.warn('Error requesting subscription', error);
//     }
//   };
  

//   // const handlePurchase = async () => {
//   //   try {
//   //     await requestSubscription({ sku: productIds[0] });
//   //   } catch (error) {
//   //     console.warn('Error requesting subscription', error);
//   //   }
//   // };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   const handleOpenURL = (url) => {
//     Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <TouchableOpacity onPress={() => navigation.navigate('SIGN UP')}>
//           <Image source={require('../assets/backbtn.png')} style={styles.backButton} />
//         </TouchableOpacity>
//         <Text style={styles.title}>Appoint-Fix</Text>
//         <Text style={styles.title}>Subscription</Text>
//         <Text style={styles.listItem}>
//           To enjoy the full range of our services, please consider subscribing to Appoint-Fix.
//         </Text>
//         <Text style={styles.listItem}>Length of subscription: 1 month (Auto-Renewable with option to cancel)</Text>
//         <Text style={styles.listItem}>Original Price of subscription: 4.99 GBP per Month</Text>
//         <Text style={styles.listItem}>Offer price of subscription: 0.99 GBP for the first month</Text>
//         <Text style={styles.listItem}>With this subscription, you will get access to:</Text>
//         <Text style={styles.listItem}>- Unlimited appointments</Text>
//         <Text style={styles.listItem}>- Priority customer support</Text>
//         <Text style={styles.listItem}>- Note-taking and form-filling features</Text>

//         {subscriptions.map((product) => (
//           <View key={product.productId} style={styles.card}>
//             <Text style={styles.productTitle}>{product.title}</Text>
//             <Text style={styles.description}>{product.description}</Text>
//             <Text style={styles.price}>{product.localizedPrice}</Text>
//             <View style={{ backgroundColor: 'transparent', padding: 10 }}>
//   <TouchableOpacity style={styles.button} onPress={handlePurchase}>
//     <Text style={styles.buttonText}>Subscribe</Text>
//   </TouchableOpacity>
// </View>

//             {/* <TouchableOpacity style={styles.button} onPress={handlePurchase}>
//               <Text style={styles.buttonText}>Subscribe</Text>
//             </TouchableOpacity> */}
//           </View>
//         ))}

//         <View style={styles.linksContainer}>
//           <TouchableOpacity onPress={() => handleOpenURL('https://play.google.com/store/apps/details?id=com.example.app&hl=en&gl=US')}>
//             <Text style={styles.linkText}>Terms of Use (EULA)</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleOpenURL('https://docs.google.com/document/d/17vYYt18eW0OZgm8pKRiD5iuusyciFMCIvR1OEFC6udw/edit?usp=sharing')}>
//             <Text style={styles.linkText}>Privacy Policy</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   backButton: {
//     width: 25,
//     height: 25,
//     marginRight: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     marginVertical: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   productTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   listItem: {
//     fontSize: 16,
//     marginVertical: 4,
//   },
//   linksContainer: {
//     marginTop: 20,
//   },
//   linkText: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//     marginVertical: 5,
//   },
// });

// export default PaymentScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useIAP, requestSubscription, initConnection } from 'react-native-iap';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const productIds = ['one2one_subscribe1']; // Replace with your actual product ID

const PaymentScreen = () => {
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    finishTransaction,
  } = useIAP();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    initIAP();
  }, []);

  const initIAP = async () => {
    try {
      const result = await initConnection();
      console.log('IAP connection result:', result);
      // Check if the connection result is true
      if (result) {
        // Connection was successful
      } else {
        console.warn('Failed to connect to IAP service');
      }
    } catch (err) {
      console.warn('IAP connection error:', err);
    }
  };


  useEffect(() => {
    const initialize = async () => {
      try {
        await getSubscriptions({ skus: productIds });
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };

    if (connected) {
      initialize();
    }
  }, [connected, getSubscriptions]);

  useEffect(() => {
    if (currentPurchase) {
      const processPurchase = async (purchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            await finishTransaction({ purchase });
            Alert.alert('Purchase Successful', 'Your purchase has been processed successfully.', [
              { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
          } catch (error) {
            console.warn('Error finishing transaction', error);
          }
        }
      };

      processPurchase(currentPurchase);
    }
  }, [currentPurchase, finishTransaction, navigation]);




  // const handlePurchase = async (sku) => {
  //   console.log(`Handle Purchase called with SKU: ${sku}`);
  //   try {
  //     await requestSubscription({
  //       sku,
  //       subscriptionOffers: [
  //         {
  //           offerToken: 'AdogOgHA/LPAgR6lxhY/pbhbguu472rHu9jT9SV1/DPo20mZB2Cr9jO9E+4DW7r2xrX3RumMMZedJq49wtI+', // Replace with your actual offer token from Google Play Console
  //         },
  //       ],
  //     });
     
  //     console.log(`Subscription request sent for SKU: ${sku}`, result);
  //   } catch (error) {
  //     console.error('Error requesting subscription:', error);
  //     Alert.alert('Purchase Error', 'Failed to process the subscription. Please try again later.');
  //   }
  // };

  const handlePurchase = async (sku) => {
  console.log(`Handle Purchase called with SKU: ${sku}`);
  try {
    console.log('Starting subscription request...');
    const result = await requestSubscription({
      sku,
      subscriptionOffers: [
        {
          offerToken: 'AdogOgHA/LPAgR6lxhY/pbhbguu472rHu9jT9SV1/DPo20mZB2Cr9jO9E+4DW7r2xrX3RumMMZedJq49wtI+', // Replace with your actual offer token
        },
      ],
    });
    console.log(`Subscription request sent for SKU: ${sku}`, result);
  } catch (error) {
    console.error('Error requesting subscription:', error);
    Alert.alert('Purchase Error', 'Failed to process the subscription. Please try again later.');
  }
};


  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };


  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Subscription</Text>
        <Text style={styles.listItem}>
          To enjoy the full range of our services, please subscribe.
        </Text>

        {subscriptions.map((product) => (
          <View key={product.productId} style={styles.card}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>{product.localizedPrice}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePurchase(product.productId)}
            >
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default PaymentScreen;




 





// import React, { useState ,useEffect , useCallback} from 'react';
// import { SafeAreaView, ScrollView, Text, TouchableOpacity, View,BackHandler,Alert, useColorScheme, StyleSheet, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
// import { CardField, useStripe, Stripe } from '@stripe/stripe-react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native'; 
// import { useFocusEffect } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// const API_URL =  'http://54.79.225.162:4002'


// const {width, height} = Dimensions.get('window');
// const isFoldable = height >= 550 && height <= 790;


// const PaymentScreen = () => {
//   const [cardDetails, setCardDetails] = useState(null);
//   const navigation = useNavigation();
//   const { confirmSetupIntent } = useStripe();
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert("Hold on!", "You cannot go back at this step!", [
//         { text: "OK", onPress: () => null }
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

//     return () => backHandler.remove();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       const checkPaymentStatus = async () => {
//         const paymentCompleted = await AsyncStorage.getItem('paymentCompleted');
//         if (paymentCompleted === 'true') {
//           navigation.navigate('Home');
//         }
//       };
//       checkPaymentStatus();
//     }, [])
//   );

//   const handleCardChange = (details) => {
//     setCardDetails(details);
//   };

//   const handleSubmit = async () => {
//     if (!cardDetails?.complete) {
//       alert('Please enter complete card details');
//       return;
//     }

//     const customerId = await AsyncStorage.getItem('customerId');
//     const response = await fetch(`${API_URL}/create-setup-intent`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ customerId: customerId }),
//     });

//     if (!response.ok) {
//       console.error('Failed to create setup intent:', response);
//       return;
//     }

//     const data = await response.json();
//     const clientSecret = data.clientSecret;

//     const { error } = await confirmSetupIntent(clientSecret, {
//       paymentMethodType: 'Card',
//       card: cardDetails,
//     });

//     if (error) {
//       console.log('Setup intent confirmation error', error.message);
//     } else {
//       console.log('Setup intent confirmed!');
//       await AsyncStorage.setItem('paymentCompleted', 'true');
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Home' }],
//       });
//     }
//   };
//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Payment Details</Text>
//         <Text style={styles.text}>
//           We need your card details to start your 30-day free trial. After the trial, a subscription fee of 5 GBP will be deducted from your account monthly. Your information is securely handled by Stripe and won't be shared with any third parties.
//         </Text>
//         <CardField
//           postalCodeEnabled={false}
//           placeholder={{ number: '4242 4242 4242 4242' }}
//           cardStyle={isDarkMode ? darkStyles.cardFieldStyle : styles.cardFieldStyle}
//           style={styles.cardField}
//           onCardChange={handleCardChange}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Start My Free Trial</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: width * 0.05,
//     paddingTop: height * (isFoldable ? 0.06 : 0.05),
//     backgroundColor: 'white',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: height * (isFoldable ? 0.030 : 0.03),
//     fontWeight: 'bold',
//     color: 'black',
//     marginBottom: height * (isFoldable ? 0.05 : 0.03),
//     textAlign: 'center',
//   },
//   text: {
//     fontSize: height * (isFoldable ? 0.022 : 0.02),
//     color: 'black',
//     marginBottom: height * (isFoldable ? 0.03 : 0.02),
//     lineHeight: height * (isFoldable ? 0.03 : 0.025),
//     textAlign: 'center',
//   },
//   cardField: {
//     width: '100%',
//     height: height * (isFoldable ? 0.075 : 0.05),
//     marginVertical: height * (isFoldable ? 0.04 : 0.03),
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   cardFieldStyle: {
//     backgroundColor: '#FFFFFF',
//     textColor: '#000000',
//   },
//   button: {
//     backgroundColor: 'darkblue',
//     paddingVertical: height * (isFoldable ? 0.015 : 0.0125),
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: height * (isFoldable ? 0.05 : 0.02),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: height * (isFoldable ? 0.022 : 0.02),
//     fontWeight: '600',
//   },
//   darkText: {
//     color: 'white',
//   },
// });

// const darkStyles = StyleSheet.create({
//   cardFieldStyle: {
//     backgroundColor: '#000000',
//     textColor: '#FFFFFF',
//   },

  

// });

