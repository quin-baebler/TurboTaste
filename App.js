import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuzzalloFoodLockerScreen from './components/SuzzalloFoodLockerScreen'; // Import your new screen
import McDonaldsDetailScreen from './components/McDonaldsDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SuzzalloFoodLockerScreen} options={{ title: 'Suzzallo Food Locker' }} />
        <Stack.Screen name="McDonaldsDetail" component={McDonaldsDetailScreen} options={{ title: 'McDonald’s' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;