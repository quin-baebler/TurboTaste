import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const { cartItems, orderPool } = route.params;
  const [additionalItems] = useState([
    { id: '1', name: 'French Fries', price: 6.00, image: require('../assets/fries.jpg') },
    { id: '2', name: 'Chocolate Milkshake', price: 2.0, image: require('../assets/milkshake.jpg') },
    { id: '3', name: 'McFlurry', price: 3.0, image: require('../assets/mcflurry.jpg') },
  ]);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem} key={item.FoodName}>
      <Image source={{ uri: item.Image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.FoodName}</Text>
        <Text style={styles.itemPrice}>${item.Price}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity
          style={[styles.roundButton, item.quantity === 1 && styles.roundButtonDisabled]}
          disabled={item.Quantity <= 1}
        >
          <Ionicons name="remove" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.Quantity}</Text>
        <TouchableOpacity
          style={styles.roundButton}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAdditionalItem = ({ item }) => (
    <View style={styles.featuredItemContainer}>
      <Image source={item.image} style={styles.featuredItemImg} />
      <View style={styles.featureItemInfoContainer}>
        <Text style={styles.featuredItemTitle}>{item.name}</Text>
        <Text style={styles.featuredItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  const calculateSummary = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
    const deliveryFee = 0;
    const fees = Math.min(subtotal * 0.05, 2.00);
    const estimatedTax = subtotal * 0.10;
    const total = subtotal + deliveryFee + fees + estimatedTax;

    const originalDeliveryFee = 3.99;
    const originalFees = Math.max(subtotal * 0.15, 3.00);
    const originalTotal = subtotal + originalDeliveryFee + originalFees + estimatedTax;

    return { subtotal, deliveryFee, fees, estimatedTax, total, originalDeliveryFee, originalFees, originalTotal };
  }

  const goToCheckout = () => {
    navigation.navigate('Checkout', {
      summary: {
        subtotal: calculateSummary().subtotal.toFixed(2),
        deliveryFee: calculateSummary().deliveryFee.toFixed(2),
        fees: calculateSummary().fees.toFixed(2),
        estimatedTax: calculateSummary().estimatedTax.toFixed(2),
        total: calculateSummary().total.toFixed(2),
        originalDeliveryFee: calculateSummary().originalDeliveryFee.toFixed(2),
        originalFees: calculateSummary().originalFees.toFixed(2),
        originalTotal: calculateSummary().originalTotal.toFixed(2)
      },
      cartItems: cartItems,
      orderPool: orderPool
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.restaurantTitle}>{orderPool.Restaurant.RestaurantName}</Text>

        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.FoodName}
          scrollEnabled={false}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.additionalItemsHeader}>Additional Items</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={additionalItems}
            renderItem={renderAdditionalItem}
            keyExtractor={item => item.id}
            style={styles.carousel}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${calculateSummary().subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <View style={styles.deliveryFeeContainer}>
              <Text style={styles.originalFee}>${calculateSummary().originalDeliveryFee.toFixed(2)} </Text>
              <Text style={styles.summaryValue}>${calculateSummary().deliveryFee.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Fees & Estimated Tax</Text>
            <View style={styles.deliveryFeeContainer}>
              <Text style={styles.originalFee}>${(calculateSummary().originalFees + calculateSummary().estimatedTax).toFixed(2)} </Text>
              <Text style={styles.summaryValue}>${(calculateSummary().fees + calculateSummary().estimatedTax).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>Total</Text>
            <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>${calculateSummary().total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={goToCheckout}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  restaurantTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    padding: 10
  },
  itemImage: {
    width: Dimensions.get('window').width / 4,
    height: 100,
    resizeMode: 'center'
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    gap: 5
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemPrice: {
    color: 'black',
    fontWeight: '400'
  },
  itemQuantity: {
    width: Dimensions.get('window').width / 5,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 200,
    justifyContent: 'space-between',
    padding: 5
  },
  quantityText: {
    fontWeight: 'bold'
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  additionalItemsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  featuredItemContainer: {
    marginTop: 12.5,
    width: Dimensions.get('window').width / 4,
    marginRight: 30, // Increase spacing between items
    marginLeft: 2,
  },
  featuredItemImg: {
    width: Dimensions.get('window').width / 4,
    height: 100,
    borderRadius: 10,
    resizeMode: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10
  },
  featureItemInfoContainer: {
    marginTop: 5
  },
  featuredItemTitle: {
    fontWeight: 'bold'
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  summaryLabel: {
    fontWeight: '500',
    fontSize: 16
  },
  summaryValue: {
    fontWeight: '500',
    fontSize: 16
  },
  deliveryFeeContainer: {
    flexDirection: 'row'
  },
  originalFee: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16
  },
  continueButton: {
    marginHorizontal: 20,
    width: '90%',
    height: 50,
    borderRadius: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    paddingHorizontal: 20
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default CartScreen;

