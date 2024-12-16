import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeTab1 from './HomeTab1';
import Hometab2 from './HomeTab2';

// Nested Tab Navigator
const NestedTab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Two Cards Section */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Card 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Card 2</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Navigator */}
      <View style={styles.tabContainer}>
        <NestedTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Tab1') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (route.name === 'tab2') {
                iconName = focused ? 'grid' : 'grid-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <NestedTab.Screen name="Tab1" component={HomeTab1} />
          <NestedTab.Screen name="tab2" component={Hometab2} />
        </NestedTab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    backgroundColor: '#007BFF',
    flex: 1,
    margin: 8,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flex: 1,
  },
});

export default HomeScreen;