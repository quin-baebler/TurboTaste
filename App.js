import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuzzalloFoodLockerScreen from './components/SuzzalloFoodLockerScreen'; // Import your new screen
import McDonaldsDetailScreen from './components/McDonaldsDetailScreen';
import CartScreen from './components/CartScreen'; // Import your CartScreen
import SubmittingOrderScreen from './components/SubmittingOrderScreen';
import OrdersScreen from './components/OrdersScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SuzzalloFoodLockerScreen} options={{ title: 'Suzzallo Food Locker' }} />
        <Stack.Screen name="McDonaldsDetail" component={McDonaldsDetailScreen} options={{ title: 'McDonald’s' }} />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Cart' }}
        />
        <Stack.Screen name="SubmittingOrder" component={SubmittingOrderScreen} options={{ title: 'Confirmation' }} />
        <Stack.Screen
          name="Orders" // This is the route name you'll use in the navigation.navigate function
          component={OrdersScreen}
          options={{ title: 'Orders' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;