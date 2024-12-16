import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import HomeTab1 from './screens/HomeTab1';
import HomeTab2 from './screens/HomeTab2';


// Adjust the path based on your project structure
LoginScreen
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
  
        <Stack.Screen
    component={LoginScreen}
    name='Login'
    options={{headerShown:false}}
    />
          <Stack.Screen
    component={HomeTab1}
    name='HomeTab1'
    options={{headerShown:false}}
    />
          <Stack.Screen
    component={HomeTab2}
    name='HomeTab2'
    options={{headerShown:false}}
    />
          <Stack.Screen
    component={HomeScreen}
    name='Home'
    options={{headerShown:false}}
    />
      <Stack.Screen
    component={SignupScreen}
    name='Signup'
    options={{headerShown:false}}
    />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;