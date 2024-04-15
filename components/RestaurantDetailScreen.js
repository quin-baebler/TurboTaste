import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Modal, Button } from 'react-native';
import { getDoc, getDocs, doc, query, collection, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import BackButton from './BackButton';
import { FIREBASE_DB } from '../firebaseConfig';
import ChooseLocationTime from './ChooseLocationTime';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';

const RestaurantDetailScreen = (props) => {
  const navigation = useNavigation();
  const dummyFoodItems = [
    { FoodName: "BigMac", Price: 6.99, RestaurantID: "rNIycw0833YIDqleyUxH", Img: "https://firebasestorage.googleapis.com/v0/b/turbotaste-f49e1.appspot.com/o/imgs%2Fbig_mac.jpg?alt=media&token=0eb55165-9659-48bf-8dd8-292145961c1d" },
    { FoodName: "McCrispy", Price: 6.29, RestaurantID: "rNIycw0833YIDqleyUxH", Img: "https://firebasestorage.googleapis.com/v0/b/turbotaste-f49e1.appspot.com/o/imgs%2Fchicken_sandwich.jpg?alt=media&token=ad6e13d9-6a5d-4066-9efd-265072dda8de" }
  ]

  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [foodItems, setFoodItems] = useState(dummyFoodItems);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // get restaurant details based on restaurant id
  useEffect(() => {
    getRestaurantDetails();
  }, []);

  // get food items based on restaurant id
  // useEffect(() => {
  //   getFoodItems();
  // }, [restaurantDetails]);

  const getRestaurantDetails = async () => {
    setLoading(true);
    try {
      const restaurantRef = doc(FIREBASE_DB, 'Restaurants', 'rNIycw0833YIDqleyUxH');
      const restaurantSnap = await getDoc(restaurantRef);
      setRestaurantDetails({
        ...restaurantSnap.data(),
        Id: restaurantSnap.id
      });
    } catch (error) {
      console.error('Error getting document: ', error);
    } finally {
      setLoading(false);
    }
  }

  const getFoodItems = async () => {
    try {
      if (restaurantDetails.Id) {
        const foodItemsRef = collection(FIREBASE_DB, 'FoodItems');
        const foodItemsQuery = await query(foodItemsRef, where('RestaurantID', '==', restaurantDetails.Id));
        const querySnapshot = await getDocs(foodItemsQuery);
        const foodItems = [];
        querySnapshot.forEach((foodItem) => {
          foodItems.push({
            ...foodItem.data(),
            Id: foodItem.id
          });
        })
        setFoodItems(foodItems);
      }
    } catch (error) {
      console.error('Error getting document: ', error);
    }
  }

  const addItemToCart = (foodItem) => () => {
    console.log('adding item to cart');
    // if the current food item is not in the cart, add it with quantity 1
    if (!cartItems.some(item => item.FoodName === foodItem.FoodName)) {
      setCartItems([...cartItems, { ...foodItem, Quantity: 1 }]);
    } else { // if the current food item is in the cart, increase the quantity by 1
      setCartItems(cartItems.map(item => item.FoodName === foodItem.FoodName ? { ...item, Quantity: item.Quantity + 1 } : item));
    }
  }

  const removeItemFromCart = (foodItem) => () => {
    console.log('removing item from cart');
    if (foodItem.Quantity > 1) {
      setCartItems(cartItems.map(item => item.FoodName === foodItem.FoodName ? { ...item, Quantity: item.Quantity - 1 } : item));
    } else {
      setCartItems(cartItems.filter(item => item.FoodName !== foodItem.FoodName));
    }
  }

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.Quantity, 0);

  const navigateTo = () => {
    navigation.navigate('Cart', { cartItems, restaurantDetails });
  }

  const ViewCartButton = () => {
    return (
      <TouchableOpacity style={styles.viewCartButton} onPress={() => navigateTo()}>
        <Ionicons name="cart" size={24} color="white" style={{ position: 'absolute', left: 20 }} />
        <View style={styles.viewCartButtonMiddle}>
          <Text style={[styles.viewCartText, { fontSize: 12 }]}>View Cart</Text>
          <Text style={styles.viewCartText}>{restaurantDetails.RestaurantName}</Text>
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
              <Image source={require('../assets/mcdonalds.png')} style={styles.restaurantImage} />
              <View style={styles.logoContainer}>
                <Image source={require('../assets/mcdonalds_logo.png')} style={styles.restaurantLogo} />
              </View>
            </View>
            <View style={{ top: -Dimensions.get('window').height / 20 }}>
              <View style={styles.sectionContainer}>
                <Text style={styles.restaurantName}>{restaurantDetails.RestaurantName}</Text>
                <Text>{restaurantDetails.Rating} <Ionicons name="star" size={16} color="gold" /> ({restaurantDetails.Reviews}) • {restaurantDetails.Cuisine}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <ChooseLocationTime />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.secondaryText}>Featured Items</Text>
              </View>
              <View style={styles.sectionContainer}>
                <View style={styles.foodItemCardsContainer}>
                  {
                    foodItems.map((foodItem, index) => (
                      <TouchableOpacity key={index} style={styles.foodItemCard}>
                        <Image source={{ uri: foodItem.Img }} style={styles.foodImage} />
                        <TouchableOpacity onPress={addItemToCart(foodItem)} style={styles.addFoodButton}>
                          <Ionicons name="add-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={styles.foodInfo}>
                          <Text style={styles.foodName}>{foodItem.FoodName}</Text>
                          <Text style={styles.foodPrice}>${foodItem.Price}</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  }
                </View>
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

      {/* <Modal
        animationType='slide'
        visible={modalVisible}
        presentationStyle='fullScreen'
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

      </Modal> */}
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
    resizeMode: 'contain',
  },
  scrollViewContainer: {
    height: "100%",
    width: "100%"
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  foodItemCardsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodItemCard: {
    width: '48%',
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  foodImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
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
    bottom: 20,
    paddingHorizontal: 20
  },
  viewCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
