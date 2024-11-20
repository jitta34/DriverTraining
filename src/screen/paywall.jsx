import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import {constants} from '../utils/constants';
import {
  getProducts, //For fetching available products
  requestPurchase, //For initiating in-app purchases
  purchaseUpdatedListener, //For listening to purchase events
  purchaseErrorListener, //For listening to purchase errors
  finishTransaction, //For acknowledging a purchase
} from 'react-native-iap';
import ProductItem from '../components/productItem';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const Paywall = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async purchase => {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            await finishTransaction({purchase, isConsumable: false});
          } catch (error) {
            // console.error("An error occurred while completing transaction", error);
            // Alert.alert("An error occurred while completing transaction", error)
          }
          notifySuccessfulPurchase();
        }
      },
    );

    const fetchProducts = async () => {
      try {
        const result = await getProducts({skus: constants.productSkus});
        setProducts(result);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error fetching products');
      }
    };

    fetchProducts();

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  const purchaseErrorSubscription = purchaseErrorListener(error =>
    console.error('Purchase error', error.message),
  );

  const notifySuccessfulPurchase = () => {
    Alert.alert('Success', 'Purchase successful', [
      {
        text: 'Home',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  // Example of handling the "1-tap join" logic
  const handleOneTapJoin = async () => {
    try {
      // Perform the join logic
      await joinOffer(); // Custom logic for the offer
      notifySuccessfulPurchase();
    } catch (error) {
      Alert.alert('Error', 'An error occurred while joining the offer.');
      console.error('Join offer error:', error);
    }
  };

  const handlePurchase = async productId => {
    try {
      await requestPurchase({skus: [productId]});
    } catch (error) {
      setErrorMessage('Error occurred while making purchase.');
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Subscription</Text>
        <Text style={styles.listItem}>
          To enjoy the full range of our services, please subscribe.
        </Text>

        <Text style={styles.listItem}>
          Length of subscription: 1 month (Auto-Renewable with option to cancel)
        </Text>
        <Text style={styles.listItem}>
          Original Price of subscription: 4.99 GBP per Month
        </Text>
        <Text style={styles.listItem}>
          Offer price of subscription: 0.99 GBP for the first month
        </Text>
        <Text style={styles.listItem}>
          With this subscription, you will get access to:
        </Text>
        <Text style={styles.listItem}>- Unlimited appointments</Text>
        <Text style={styles.listItem}>- Priority customer support</Text>
        <Text style={styles.listItem}>
          - Note-taking and form-filling features
        </Text>

        {!isLoading ? (
          <>
            <View style={styles.header}></View>
            {products.map((product, index) => (
              <ProductItem
                key={index}
                title={product.title}
                onPress={() => handlePurchase(product.productId)}
              />
            ))}
          </>
        ) : (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width * 0.05, // Dynamic padding based on screen width
  },
  title: {
    fontSize: width * 0.06, // Dynamic font size
    fontWeight: 'bold',
    marginBottom: height * 0.02, // Dynamic margin bottom based on screen height
    textAlign: 'center',
    color: 'black',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.05, // Dynamic padding
    marginVertical: height * 0.01, // Dynamic vertical margin
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: width * 0.05, // Dynamic font size
    fontWeight: 'bold',
    marginBottom: height * 0.01, // Dynamic margin bottom
  },
  header: {
    height: height * 0.1, // Dynamic height based on screen height
    width: '100%',
    backgroundColor: 'white',
  },
  image: {
    resizeMode: 'cover',
    opacity: 0.5,
    height: height * 0.25, // Dynamic image height
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  heading: {
    position: 'absolute',
    bottom: height * 0.01, // Dynamic positioning
    left: width * 0.03, // Dynamic positioning
  },
  listItem: {
    fontSize: width * 0.04, // Dynamic font size
    marginVertical: height * 0.005, // Dynamic vertical margin
    color: 'black',
  },
  text: {
    fontSize: width * 0.065, // Dynamic font size
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    fontSize: width * 0.045, // Dynamic font size
    color: '#333',
    overflow: 'hidden',
  },
  indicator: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default Paywall;

// const notifySuccessfulPurchase = () => {
//     navigation.navigate('Home');
// };

// const notifySuccessfulPurchase = () => {
//     // Close any open modals or pop-ups
//     closeOfferPopup();  // Custom function to close the offer pop-up

//     // Try navigating to the home screen
//     try {
//         navigation.navigate('Home');
//     } catch (error) {
//         Alert.alert("Error", "An error occurred while navigating.");
//         console.error("Navigation error:", error);
//     }
// };

// const handlePurchase = async (productId) => {
//     // setPurchaseLoading(true)
//     try {
//         await requestPurchase({ skus: [productId] });
//     } catch (error) {
//         Alert.alert('Error occurred while making purchase')
//     }
//     finally {
//         setLoading(false);
//     }
// }

// const purchaseErrorSubscription = purchaseErrorListener((error) => {
//     setErrorMessage(`Purchase error: ${error.message}`);
//     setErrorModalVisible(true);
// });

// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, Image, Alert, ActivityIndicator } from "react-native";
// import { constants } from "../utils/constants";
// import {
//     getProducts, //For fetching available products
//     requestPurchase, //For initiating in-app purchases
//     purchaseUpdatedListener, //For listening to purchase events
//     purchaseErrorListener, //For listening to purchase errors
//     finishTransaction  //For acknowledging a purchase
// } from "react-native-iap";
// import ProductItem from "../components/productItem";

// const [products, setProducts] = useState([]);
// const [isLoading, setLoading] = useState(true);
// useEffect(() => {
//       const  purchaseUpdateSubscription = purchaseUpdatedListener(
//           async (purchase) => {
//               const receipt = purchase.transactionReceipt;
//               if (receipt) {
//                   try {
//                       await finishTransaction({ purchase, isConsumable: false });
//                   } catch (error) {
//                       console.error("An error occurred while completing transaction", error);
//                   }
//                   notifySuccessfulPurchase();
//               }
//           });
//       const purchaseErrorSubscription = purchaseErrorListener((error) =>
//           console.error('Purchase error', error.message));
//       const fetchProducts = async () => {
//           try {
//               const result = await getProducts({ skus: constants.productSkus });
//               setProducts(result);
//               setLoading(false);
//           }
//           catch (error) {
//               Alert.alert('Error fetching products')
//           }
//       }
//       fetchProducts();
//       return () => {
//           purchaseUpdateSubscription.remove();
//           purchaseErrorSubscription.remove();
//       }

//   }, [])

//   const notifySuccessfulPurchase = () => {
//     Alert.alert("Success", "Purchase successful", [
//         {
//             text: 'Home',
//             onPress: () => navigation.navigate('Home')
//         }
//     ])
// }

// const handlePurchase = async (productId) => {
//     setPurchaseLoading(true)
//     try {
//         await requestPurchase({ skus: [productId] });
//     } catch (error) {
//         Alert.alert('Error occurred while making purchase')
//     }
//     finally {
//         setLoading(false);
//     }
// }

// <View style={styles.container}>
//     {
//         !isLoading ?
//             <>
//                 <View style={styles.header}>
//                     <Image source={backgroundImage} style={styles.image} />
//                     <View style={styles.heading}>
//                         <Text style={styles.text}>Unlock all Recipes</Text>
//                         <Text style={styles.subText}>Get unlimited access to 1000+ recipes</Text>
//                     </View>
//                 </View>
//                 {products.map((product, index) => (
//                     <ProductItem
//                         key={index}
//                         title={product.title}
//                         onPress={() => handlePurchase(product.productId)} />
//                 ))}
//             </> :
//             <View style={styles.indicator}>
//                 <ActivityIndicator size='large' />
//             </View>
//     }
// </View>
