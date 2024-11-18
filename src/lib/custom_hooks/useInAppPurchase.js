import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { requestPurchase, useIAP } from "react-native-iap";
import { STORAGE_KEYS, storeBooleanData, getBooleanData } from "../functions/asyncStorage";

const { IS_FULL_APP_PURCHASED } = STORAGE_KEYS;

const itemSKUs = Platform.select({
  android: ['one2one_sub'], // Ensure this SKU matches what you've set up in Google Play Console
  ios: ['one2onesubscription25'], // Ensure this SKU matches what you've set up in App Store Connect
});

const useInAppPurchase = () => {
  const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
  const [connectionErrorMsg, setConnectionErrorMsg] = useState("");

  const {
    connected,
    products,
    getProducts,
    finishTransaction,
    currentPurchase,
    currentPurchaseError,
  } = useIAP();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts(itemSKUs);
        console.log("Fetched products: ", result);
      } catch (error) {
        console.log("Error fetching products: ", error);
      }
    };

    if (connected) {
      fetchProducts();
    }
  }, [connected, getProducts]);

  useEffect(() => {
    if (currentPurchase) {
      const processPurchase = async () => {
        const receipt = currentPurchase.transactionReceipt;
        console.log("Receipt: ", receipt);
        if (receipt) {
          try {
            await finishTransaction({ purchase: currentPurchase });
            setAndStoreFullAppPurchase(true);
            console.log("Transaction finished successfully.");
          } catch (ackErr) {
            console.log("Error finishing transaction: ", ackErr);
          }
        }
      };
      processPurchase();
    }
  }, [currentPurchase, finishTransaction]);

  useEffect(() => {
    const loadPurchaseStatus = async () => {
      const data = await getBooleanData(IS_FULL_APP_PURCHASED);
      setIsFullAppPurchased(data);
    };

    loadPurchaseStatus();
  }, []);

  const setAndStoreFullAppPurchase = (boolean) => {
    setIsFullAppPurchased(boolean);
    storeBooleanData(IS_FULL_APP_PURCHASED, boolean);
  };

  useEffect(() => {
    if (currentPurchaseError) {
      console.log("Purchase error: ", currentPurchaseError);
      if (currentPurchaseError.code === "E_ALREADY_OWNED" && !isFullAppPurchased) {
        setAndStoreFullAppPurchase(true);
      } else {
        setConnectionErrorMsg("An error occurred during the purchase.");
      }
    }
  }, [currentPurchaseError]);

  const purchaseFullApp = async () => {
    try {
      if (!connected) {
        setConnectionErrorMsg("Please check your internet connection");
        return;
      }

      if (products.length > 0) {
        await requestPurchase(itemSKUs[0]);
        console.log("Initiating purchase...");
      } else {
        console.log("No products available. Trying to fetch...");
        await getProducts(itemSKUs);
        if (products.length > 0) {
          await requestPurchase(itemSKUs[0]);
          console.log("Fetched products, initiating purchase...");
        } else {
          setConnectionErrorMsg("Failed to fetch products.");
          console.log("Failed to get products.");
        }
      }
    } catch (error) {
      console.log("Error during purchase: ", error);
      setConnectionErrorMsg("An error occurred during the purchase.");
    }
  };

  return {
    isFullAppPurchased,
    connectionErrorMsg,
    purchaseFullApp,
  };
};

export default useInAppPurchase;



// import { useEffect, useState } from "react";
// import { Platform } from "react-native";
// import { requestPurchase, useIAP } from "react-native-iap";
// import {
//   STORAGE_KEYS,
//   storeBooleanData,
//   getBooleanData,
// } from "../functions/asyncStorage";

// const { IS_FULL_APP_PURCHASED } = STORAGE_KEYS;

// const itemSKUs = Platform.select({
//   android: ['one2one_sub']
// });

// const useInAppPurchase = () => {
//   const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
//   const [connectionErrorMsg, setConnectionErrorMsg] = useState("");

//   const {
//     connected,
//     products,
//     getProducts,
//     finishTransaction,
//     currentPurchase,
//     currentPurchaseError,
//   } = useIAP();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const result = await getProducts(itemSKUs);
//         console.log("Fetched products: ", result);
//       } catch (error) {
//         console.log("Error fetching products: ", error);
//       }
//     };

//     if (connected) {
//       fetchProducts();
//     }
//   }, [connected, getProducts]);

//   useEffect(() => {
//     const checkCurrentPurchase = async purchase => {
//       if (purchase) {
//         const receipt = purchase.transactionReceipt;
//         console.log("RECEIPT: ", receipt);
//         if (receipt) {
//           setAndStoreFullAppPurchase(true);
//           try {
//             const ackResult = await finishTransaction(purchase);
//             console.log("ackResult: ", ackResult);
//           } catch (ackErr) {
//             console.log("ackError: ", ackErr);
//           }
//         }
//       }
//     };
//     checkCurrentPurchase(currentPurchase);
//   }, [currentPurchase, finishTransaction]);

//   useEffect(() => {
//     getBooleanData(IS_FULL_APP_PURCHASED).then(data => {
//       setIsFullAppPurchased(data);
//     });
//   }, []);

//   const setAndStoreFullAppPurchase = boolean => {
//     setIsFullAppPurchased(boolean);
//     storeBooleanData(IS_FULL_APP_PURCHASED, boolean);
//   };

//   useEffect(() => {
//     if (currentPurchaseError) {
//       if (
//         currentPurchaseError.code === "E_ALREADY_OWNED" &&
//         !isFullAppPurchased
//       ) {
//         setAndStoreFullAppPurchase(true);
//       }
//     }
//   }, [currentPurchaseError]);

//   const purchaseFullApp = async () => {
//     try {
//       if (connectionErrorMsg !== "") setConnectionErrorMsg("");
      
//       if (!connected) {
//         setConnectionErrorMsg("Please check your internet connection");
//         return;
//       }

//       if (products?.length > 0) {
//         await requestPurchase(itemSKUs[0]);
//         console.log("Purchasing product...");
//       } else {
//         console.log("No products. Now trying to get some...");
//         await getProducts(itemSKUs);
//         if (products?.length > 0) {
//           await requestPurchase(itemSKUs[0]);
//           console.log("Got products, now purchasing...");
//         } else {
//           console.log("Failed to get products.");
//           setConnectionErrorMsg("Failed to fetch products.");
//         }
//       }
//     } catch (error) {
//       console.log("Error during purchase: ", error);
//       setConnectionErrorMsg("An error occurred during the purchase.");
//     }
//   };

//   return {
//     isFullAppPurchased,
//     connectionErrorMsg,
//     purchaseFullApp,
//   };
// };

// export default useInAppPurchase;
