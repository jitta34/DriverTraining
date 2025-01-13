import { View, Text } from 'react-native'
import React from 'react'

const CheckoutScreen = () => {
 
const numbers= [1,2,3,4,5,6,7,8,9,]
const even= numbers.filter((num)=>num%4===0)

  return (
    <View>
      <Text>{even}</Text>
    </View>
  )
}

export default CheckoutScreen





// import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native'
// import React, { useState } from 'react'
// import firestore from '@react-native-firebase/firestore'
// import auth from '@react-native-firebase/auth'

// const CheckoutScreen = ({navigation}) => {
//     const [address, setAddress]=useState('')
//     const [phoneNumber, setPhoneNumber]=useState('')
//     const handleCheckout = async () => {
//         const userId = auth().currentUser?.uid;
//         if (!userId) {
//           Alert.alert('Please log in to proceed');
//           return;
//         }
    
//         if (!address.trim() || !phoneNumber.trim()) {
//           Alert.alert('Please fill in all fields');
//           return;
//         }
    
//         try {
//           const orderData = {
//             userId,
//             address,
//             phoneNumber,
//             orderDate: new Date(),
//             status: 'Pending',
//           };
    
//           await firestore().collection('orders').add(orderData);
//           Alert.alert('Order placed successfully');
//           navigation.navigate('Home');
//         } catch (error) {
//           console.error('Error placing order:', error);
//           Alert.alert('Error placing order');
//         }
//       };
//   return (
//     <View style= {styles.container}>
//       <Text style= {styles.heading}>Checkout</Text>
//       <TextInput style= {styles.input}
//       placeholder='enter delivery address'
//       value= {address}
//       onChangeText={setAddress}
//       />
//        <TextInput style= {styles.input}
//       placeholder='enter phone number'
//       value= {phoneNumber}
//       onChangeText={setPhoneNumber}
//       />
//       <TouchableOpacity onPress={handleCheckout} style= {styles.orderButton}>
//       <Text style= {styles.orderText}>Place Order</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 15,
//       backgroundColor: '#fdfdfd',
// },
// heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//     marginBottom: 20,
// },
// input: {
//     borderWidth: 1,
//     color: '#ddd',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     width: '90%',
//     color: 'black',
// },
// orderButton: {
//     backgroundColor: '#007bff',
//     padding: 16,
//     borderRadius: 8,
// width: '90%',
// alignItems: 'center',
// },
// orderText: {
//     fontSize: 17,
//     color: 'white',
//     fontWeight: 'bold'
// }
// })

// export default CheckoutScreen