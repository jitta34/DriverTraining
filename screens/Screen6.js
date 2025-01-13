import React, { useState } from "react"; 
import {View, Text, Button, Image, TouchableOpacity, Alert, StyleSheet,} from 'react-native';
import{launchImageLibrary} from 'react-native-image-picker'


const Screen6 =({navigation}) =>{
const[profileImage, setProfileImage]=useState(null)
const selectImage = () => {
  launchImageLibrary(
  {
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 300,
  quality: 0.7,
  },
  (response) => {
  if (response.didCancel) {
  Alert.alert('Cancelled', 'Image selection was cancelled');
  } else if (response.errorMessage) {
  Alert.alert('Error', response.errorMessage);
  } else {
  const { uri } = response.assets[0];
  setProfileImage(uri);
  }
  }
  );
 };
return (
<View style={styles.container}>
  <TouchableOpacity onPress={selectImage}>
  <Image source={profileImage? {uri:profileImage}:require('../assets/defaultimage.jpg')} style={styles.carstyle}/> 
  </TouchableOpacity>
  <View style={styles.textContainer}>
    <Text style={styles.name}> ranjit</Text>
    <Text style={styles.description}> app developer</Text>
  </View>
</View>

)

}
const styles = StyleSheet.create({
container:{
width: '90%',
borderRadius: 10,
padding: 15,
alignItems: 'center',
marginVertical: 20,
elevation: 10,

},
textContainer: {
alignItems: 'center',
},
  carstyle: {
    resizeMode: 'center',
    width: 150,
    height: 150
  },
  name: {
fontSize: 25,
fontWeight: 'bold',
color: 'black',

  },
  description: {
    fontSize: 18,
    color: 'blue',
  }
});
// const Screen6 =({navigation}) =>{
// const [count,setCount] =useState (0)

//   return (
  
//        <View style={styles.container}>
//         <Text style={styles.counterText}>count:{count}</Text>
//         <View style={styles.buttonContainer}>
//         <Button title="Increment" onPress={() => setCount(count + 1)} />
//         <Button title="Decrement" onPress={() => setCount(count - 1)} />
//           <Button title="Reset" onPress={() => setCount(0)} />
//       </View>
//        </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   counterText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '70%',
//   },
// });

export default Screen6;
