import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormListScreen from './FormListScreen';
import FormListScreen2 from './FormListScreen2';
import FormListScreen3 from './FormListScreen3';
import { TouchableOpacity, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const FormListTabNavigator = ({route}) => {
    return (
      <Tab.Navigator
        initialRouteName="Form List 1"
        screenOptions={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => {
            let label;
  
            if (route.name === 'Form List 1') {
              label = 'List-1';
            } else if (route.name === 'Form List 2') {
              label = 'List-2';
            } else if (route.name === 'Form List 3') {
              label = 'List-3';
            }
  
            return (
              <Text style={{ color: color, paddingBottom: 4 }}>{label}</Text>
            );
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#F8F8F8',
          tabBarStyle: {
            backgroundColor: 'darkblue',
          },
        }}
      >
        <Tab.Screen name="Form List 1" component={FormListScreen} />
        <Tab.Screen name="Form List 2" component={FormListScreen2} />
        <Tab.Screen name="Form List 3" component={FormListScreen3} />
      </Tab.Navigator>
    );
  };
  
  export default FormListTabNavigator;
  