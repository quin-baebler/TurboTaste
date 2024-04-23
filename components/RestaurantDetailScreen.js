import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator, Modal, Button } from 'react-native';
import { getDoc, getDocs, doc, query, collection, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import BackButton from './BackButton';
import { FIREBASE_DB } from '../firebaseConfig';
import ChooseLocationTime from './ChooseLocationTime';

const RestaurantDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { orderPool } = route.params;
  const restaurant = orderPool.Restaurant;

  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFoodItems();
  }, []);

  const getFoodItems = async () => {
    setLoading(true);
    try {
      const foodItemsRef = collection(FIREBASE_DB, 'FoodItems');
      const q = query(foodItemsRef, where('RestaurantID', '==', orderPool.RestaurantID));
      const response = await getDocs(q);
      const foodItems = [];
      response.forEach((foodItem) => {
        foodItems.push({
          ...foodItem.data(),
          FoodItemID: foodItem.id
        });
      })
      setFoodItems(foodItems);
    } catch (error) {
      console.error('Error getting document: ', error);
    } finally {
      setLoading(false);
    }
  }

  const addItemToCart = (foodItem) => () => {
    if (!cartItems.some(item => item.FoodName === foodItem.FoodName)) {
      setCartItems([...cartItems, { ...foodItem, Quantity: 1 }]);
    } else {
      setCartItems(cartItems.map(item => item.FoodName === foodItem.FoodName ? { ...item, Quantity: item.Quantity + 1 } : item));
    }
  }

  const removeItemFromCart = (foodItem) => () => {
    if (foodItem.Quantity > 1) {
      setCartItems(cartItems.map(item => item.FoodName === foodItem.FoodName ? { ...item, Quantity: item.Quantity - 1 } : item));
    } else {
      setCartItems(cartItems.filter(item => item.FoodName !== foodItem.FoodName));
    }
  }

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.Quantity, 0);

  const navigateTo = () => {
    navigation.navigate('Cart', { cartItems, orderPool });
  }

  const ViewCartButton = () => {
    return (
      <TouchableOpacity style={styles.viewCartButton} onPress={() => navigateTo()}>
        <Ionicons name="cart" size={24} color="white" style={{ position: 'absolute', left: 20 }} />
        <View style={styles.viewCartButtonMiddle}>
          <Text style={[styles.viewCartText, { fontSize: 12 }]}>View Cart</Text>
          <Text style={styles.viewCartText}>{restaurant.RestaurantName}</Text>
        </View>
        <Text style={[styles.viewCartText, { position: 'absolute', right: 20 }]}>{totalItemCount}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {
        loading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView style={styles.scrollViewContainer}>
            <BackButton />
            <View>
              <Image source={{ uri: restaurant.Image }} style={styles.restaurantImage} />
              <View style={styles.logoContainer}>
                <Image source={{ uri: restaurant.Logo }} style={styles.restaurantLogo} />
              </View>
            </View>
            <View style={{ top: -Dimensions.get('window').height / 20 }}>
              <View style={[styles.sectionContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View>
                  <Text style={styles.restaurantName}>{restaurant.RestaurantName}</Text>
                  <Text>{restaurant.Rating} <Ionicons name="star" size={16} color="gold" /> ({restaurant.Reviews}) • {restaurant.Cuisine}</Text>
                </View>
                <Text style={styles.orderNumber}>{orderPool.OrderID.length} {orderPool.OrderID.length > 1 ? 'Orders' : 'Order'}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <ChooseLocationTime orderPool={orderPool} />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.secondaryText}>Featured Items</Text>
                <FlatList
                  data={foodItems}
                  renderItem={({ item }) => (
                    // Render each item
                    <TouchableOpacity style={styles.foodItemCard}>
                      <Image source={{ uri: item.Image }} style={styles.foodImage} />
                      <TouchableOpacity onPress={addItemToCart(item)} style={styles.addFoodButton}>
                        <Ionicons name="add-outline" size={22} color="black" />
                      </TouchableOpacity>
                      <View style={styles.foodInfo}>
                        <Text style={styles.foodName}>{item.FoodName}</Text>
                        <Text style={styles.foodPrice}>${item.Price}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.FoodItemID}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={styles.foodListContainer}
                  columnWrapperStyle={styles.row}
                />
              </View>
            </View>
          </ScrollView>
        )
      }
      {
        cartItems.length > 0 ? (
          <ViewCartButton />
        ) : null
      }
    </View >
  );
}

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restaurantImage: {
    width: '100%',
    height: Dimensions.get('window').height / 4
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    width: Dimensions.get('window').width / 6,
    height: Dimensions.get('window').width / 6,
    top: -Dimensions.get('window').height / 15,
    left: Dimensions.get('window').width / 20,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'lightgray',
    position: 'relative',
    zIndex: 1
  },
  restaurantLogo: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain'
  },
  scrollViewContainer: {
    height: "100%",
    width: "100%"
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 10
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'black'
  },
  foodItemCardsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodItemCard: {
    width: '48%',
    padding: 5,
    borderColor: 'lightgray',
    marginHorizontal: 3,
    marginVertical: 3,
    borderWidth: 1,
    borderRadius: 10,
  },
  foodImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  addFoodButton: {
    width: 34,
    height: 34,
    borderRadius: 200,
    borderColor: 'lightgrey',
    borderWidth: 1,
    left: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodInfo: {
    position: 'relative',
    flexDirection: 'column',
    gap: 5
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  foodPrice: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold'
  },
  viewCartButtonMiddle: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center'
  },
  viewCartButton: {
    marginHorizontal: 20,
    width: '90%',
    height: 50,
    borderRadius: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20
  },
  viewCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  orderNumber: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  }
});
