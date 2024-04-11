import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const BottomNavBar = () => {
  const navBarItems = [
    { name: 'Home', icon: 'home-outline' },
    { name: 'Grocery', icon: 'nutrition-outline' },
    { name: 'Shopping', icon: 'bag-handle-outline' },
    { name: 'Browse', icon: 'search-outline' },
    { name: 'Order', icon: 'cart-outline' }
  ]

  const navigation = useNavigation();
  const state = useNavigationState(state => state);
  const currentRouteName = state.routes[state.index].name;

  const isActive = (routeName) => routeName === currentRouteName;

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.container}>
      {
        navBarItems.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={styles.navItem} onPress={() => navigateTo('McDonaldsDetail')}>
              <Ionicons name={item.icon} size={24} color={isActive(item.name) ? "red" : "black"} />
              <Text style={[styles.navItemText, isActive(item.name) && { color: 'red' }]}>{item.name}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default BottomNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginBottom: 20,
    borderTopColor: 'lightgray',
    borderTopWidth: 1
  },
  navItem: {
    alignItems: 'center'
  },
  navItemText: {
    fontSize: 12,
    marginTop: 5
  }
});