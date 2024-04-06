import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuzzalloFoodLockerScreen from './components/SuzzalloFoodLockerScreen'; // Import your new screen
import McDonaldsDetailScreen from './components/McDonaldsDetailScreen';
import CartScreen from './components/CartScreen'; // Import your CartScreen
import SubmittingOrderScreen from './components/SubmittingOrderScreen';
import OrdersScreen from './components/OrdersScreen';
import LoginScreen from './components/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={SuzzalloFoodLockerScreen} options={{headerShown: false}} />
        <Stack.Screen name="McDonaldsDetail" component={McDonaldsDetailScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SubmittingOrder" component={SubmittingOrderScreen} options={{headerShown: false}} />
        <Stack.Screen
          name="Orders" // This is the route name you'll use in the navigation.navigate function
          component={OrdersScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
