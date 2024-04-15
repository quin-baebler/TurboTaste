import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import FoodLockerScreen from './components/FoodLockerScreen';
import RestaurantDetailScreen from './components/RestaurantDetailScreen';
import CartScreen from './components/CartScreen';
import SubmittingOrderScreen from './components/SubmittingOrderScreen';
import OrdersScreen from './components/OrdersScreen';
import LoginScreen from './components/LoginScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import CheckoutScreen from './components/CheckoutScreen';
import { View } from 'react-native';
import BottomNavBar from './components/BottomNavBar';
// import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideNav() {
  const navigation = useNavigation();
  return (
    <InsideStack.Navigator>
      {/* <InsideStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      <InsideStack.Screen name="FoodLocker" component={FoodLockerScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ headerShown: false }} />
      <InsideStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <InsideStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      {/* <InsideStack.Screen name="SubmittingOrder" component={SubmittingOrderScreen} options={{ headerShown: false }} /> */}
      {/* <InsideStack.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} /> */}
    </InsideStack.Navigator>
  );
}

function InsideLayout() {
  return (
    <View style={[{ flex: 1 }, { backgroundColor: 'white' }]}>
      <InsideNav />
      <BottomNavBar />
    </View>
  )
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
