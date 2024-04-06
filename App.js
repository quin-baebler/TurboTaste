import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuzzalloFoodLockerScreen from './components/SuzzalloFoodLockerScreen';
import McDonaldsDetailScreen from './components/McDonaldsDetailScreen';
import CartScreen from './components/CartScreen'; // Import your CartScreen
import SubmittingOrderScreen from './components/SubmittingOrderScreen';
import OrdersScreen from './components/OrdersScreen';
import LoginScreen from './components/LoginScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={SuzzalloFoodLockerScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="McDonaldsDetail" component={McDonaldsDetailScreen} options={{ headerShown: false }} />
      <InsideStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen name="SubmittingOrder" component={SubmittingOrderScreen} options={{ headerShown: false }} />
      <InsideStack.Screen
        name="Orders" // This is the route name you'll use in the navigation.navigate function
        component={OrdersScreen}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
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
