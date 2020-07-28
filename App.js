import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabMenu from './src/navigation/TabMenu';
import BleManager from 'react-native-ble-manager';
import HomeScreen from './src/screens/HomeScreen';
import ConnectScreen from './src/screens/ConnectScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Connect"
    >
      <Stack.Screen name="Connect" component={ConnectScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  //initialize Ble Manger
  BleManager.start({ showAlert: false }).then(() => {
    // Success code
    console.log('Module initialized');
  });

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Stack"
          component={StackScreen}
          options={{
            tabBarLabel: 'Connect',
            tabBarIcon: ({ color = 'green' }) => (
              <MaterialCommunityIcons
                name="search-web"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
