import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';

const API_URL = 'http://192.168.43.235:4002/payment-sheet'; // Replace with your server 



const PaymentSheet = ({ navigation }) => {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  useEffect(() => {
    initialisePaymentSheet();
  }, []);


  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
  
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Example Inc.',
      allowsDelayedPaymentMethods: true,
      
    });
  
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      // Add a delay before setting ready to true
      setTimeout(() => {
        setReady(true);
      }, 1000);
    }
  };
  
  async function buy() {
    // Add a delay before calling presentPaymentSheet
    setTimeout(async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'The payment was confirmed successfully');
        setReady(false);
      }
    }, 1000);
  };
  

//   const initialisePaymentSheet = async () => {
//     const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//     const { error } = await initPaymentSheet({
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//       merchantDisplayName: 'Example Inc.',
//       allowsDelayedPaymentMethods: true,
//       returnURL: 'stripe-example://stripe-redirect',
//     });

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       // Add a delay before setting ready to true
//       setTimeout(() => {
//         setReady(true);
//       }, 1000);
//     }
//   };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

//   async function buy() {
//     const { error } = await presentPaymentSheet();

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       Alert.alert('Success', 'The payment was confirmed successfully');
//       setReady(false);
//     }
//   }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Make Payment</Text>
      <Button title="Buy" onPress={buy} disabled={loading || !ready} />
    </View>
  );
};

export default PaymentSheet;



// import { usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, Alert } from 'react-native';

// const API_URL = 'http://192.168.43.235:4002/payment-sheet'; // Replace with your server URL

// const PaymentSheet = ({ navigation }) => {
//   const [ready, setReady] = useState(false);
//   const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

//   useEffect(() => {
//     initialisePaymentSheet();
//   }, []);

//   const initialisePaymentSheet = async () => {
//     const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

//     const { error } = await initPaymentSheet({
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//       merchantDisplayName: 'Example Inc.',
//       allowsDelayedPaymentMethods: true,
//       returnURL: 'stripe-example://stripe-redirect',
//     });

//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       setReady(true);
//     }
//   };

//   const fetchPaymentSheetParams = async () => {
//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       console.log('Server Response:', data);
//       const { paymentIntent, ephemeralKey, customer } = data;
//       return {
//         paymentIntent,
//         ephemeralKey,
//         customer,
//       };
//     } catch (error) {
//       console.error('Error fetching payment sheet params:', error);
//     }
//   };
  
//   async function buy() {
//     try {
//       const { error } = await presentPaymentSheet();
  
//       if (error) {
//         console.error('Error presenting payment sheet:', error);
//         Alert.alert(`Error code: ${error.code}`, error.message);
//       } else {
//         Alert.alert('Success', 'The payment was confirmed successfully');
//         setReady(false);
//       }
//     } catch (error) {
//       console.error('Error in buy function:', error);
//     }
//   }
  

// //   const fetchPaymentSheetParams = async () => {
// //     const response = await fetch(API_URL, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     const { paymentIntent, ephemeralKey, customer } = await response.json();
// //     return {
// //       paymentIntent,
// //       ephemeralKey,
// //       customer,
// //     };
// //   };

// //   async function buy() {
// //     const { error } = await presentPaymentSheet();

// //     if (error) {
// //       Alert.alert(`Error code: ${error.code}`, error.message);
// //     } else {
// //       Alert.alert('Success', 'The payment was confirmed successfully');
// //       setReady(false);
// //     }
// //   }

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Make Payment</Text>
//       <Button title="Buy" onPress={buy} disabled={loading || !ready} />
//     </View>
//   );
// };

// export default PaymentSheet;


// // import {  usePaymentSheet, StripeProvider } from '@stripe/stripe-react-native';
// // import React, {useEffect, useState} from 'react';

// // import { View, Text, Button, Alert, StyleSheet,} from 'react-native';

// // const PaymentSheet = ({ navigation }) => {

// //     const [ready, setReady] = useState(false);
// //     const {initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet;
// //      useEffect(() =>{
// //         initialisePaymentSheet();
// //      }, []);

// //      const initialisePaymentSheet = async () => {
// //         const{paymentIntent, ephemeralKey, customer} =
// //         await fetchPaymentSheetParams();
      
// //         const {error} = await initPaymentSheet({
// //             customerId: customer,
// //             customerEphemeralKeySecret: ephemeralKey,
// //             paymentIntentClientSecret: paymentIntent,
// //             merchantDisplayName: 'Example Inc.',
// //             allowsDelayedPaymentMethods: true,
// //             returnURL: 'stripe-example://stripe-redirect',
// //         });
// //         if (error) {
// //             Alert.alert(`Error code: $(error.code)`, error.message);
// //         } else {
// //             setReady(true);
// //         }

// //      };

// //      const fetchPaymentSheetParams = async () => {
// //         const response = await fetch(API_URL, {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //         });
// //         const {paymentIntent, ephemeralKey, customer} = await response.json
// //         return {
// //             paymentIntent,
// //             ephemeralKey,
// //             customer,
// //         };
// //      };

// //   async function buy() {
// //     const {error} = await presentPaymentSheet();

// //     if (error) {
// //         Alert.alert(`Error code: ${error.code}`, error.message);
// //     } else {
// //         Alert.alert('Success', 'The payment was confirmed successfully');
// //         setReady(false);
// //     }
// //   }

// //   return (
// //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
// //       <Text>Make Payment</Text>
// //       <Button
// //         title="Buy"
// //         onPress={buy}
// //         disabled={loading || !ready}
// //       />
// //     </View>
// //   );
// // };

// // export default PaymentSheet;
