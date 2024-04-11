import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodLockerScreen from './components/FoodLockerScreen';
import McDonaldsDetailScreen from './components/McDonaldsDetailScreen';
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
  return (
    <InsideStack.Navigator>
      {/* <InsideStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      {/* <InsideStack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} /> */}
      {/* <InsideStack.Screen name="FoodLocker" component={FoodLockerScreen} options={{ headerShown: false }} /> */}
      <InsideStack.Screen name="McDonaldsDetail" component={McDonaldsDetailScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="SubmittingOrder" component={SubmittingOrderScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />
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
