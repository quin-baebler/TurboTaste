import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Big Mac', price: 17.0, quantity: 6, image: require('../assets/big_mac.jpg') },
    { id: '2', name: 'Filet-O-Fish', price: 17.0, quantity: 4, image: require('../assets/filet_o_fish.jpg') },
    { id: '3', name: 'Chicken Sandwich', price: 10.0, quantity: 3, image: require('../assets/chicken_sandwich.jpg') },
  ]);

  const [additionalItems] = useState([
    { id: '1', name: 'French Fries', price: 6.0, image: require('../assets/fries.jpg') },
    { id: '2', name: 'Chocolate Milkshake', price: 2.0, image: require('../assets/milkshake.jpg') },
    { id: '3', name: 'McFlurry', price: 3.0, image: require('../assets/mcflurry.jpg') },
  ]);

  const [includeUtensils, setIncludeUtensils] = useState(false);

  const updateQuantity = (id, delta) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemRightSide}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.roundButton, item.quantity === 1 && styles.roundButtonDisabled]} 
              onPress={() => updateQuantity(item.id, -1)} 
              disabled={item.quantity === 1}
            >
              <FontAwesome name="minus" size={16} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity style={styles.roundButton} onPress={() => updateQuantity(item.id, 1)}>
              <FontAwesome name="plus" size={16} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );


  const renderAdditionalItem = ({ item }) => (
    <View style={styles.featuredItemContainer}>
      <Image source={item.image} style={styles.featuredItem} />
      <Text style={styles.featuredItemTitle}>{item.name}</Text>
      <TouchableOpacity style={styles.addIconContainer}>
        <FontAwesome name="plus-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const DeliveryFee = () => (
    <View style={styles.deliveryFeeContainer}>
      <Text style={styles.originalFee}>$2.50</Text>
      <Text style={styles.discountedFee}>$0.50</Text>
    </View>
  );

  const navigation = useNavigation(); // using the useNavigation hook if not destructured from props

  const handleContinue = () => {
    navigation.navigate('SubmittingOrder');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="angle-left" size={24} color="black" />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>McDonald's</Text>
        </View>
        <FontAwesome name="user-plus" size={24} color="black" />
      </View>
      
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
      
      <TouchableOpacity style={styles.addMoreItemsContainer}>
        <Text style={styles.addMoreItemsText}>+ Add more items</Text>
      </TouchableOpacity>
      
      <Text style={styles.additionalItemsHeader}>Additional Items</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={additionalItems}
        renderItem={renderAdditionalItem}
        keyExtractor={item => item.id}
        style={styles.carousel}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${calculateTotal()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <DeliveryFee />
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Fees & Estimated Tax</Text>
          <Text style={styles.discountedFeeGreen}>$0.50</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>DoorDash Credits</Text>
          <Text style={styles.discountedFeeGreen}>-$5.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>${(parseFloat(calculateTotal()) + 0.50 + 0.50 - 5.00).toFixed(2)}</Text>
        </View>
        <View style={styles.savingsContainer}>
          <Text style={styles.savingsText}>Saving $8.10 on Mass Delivery</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemRightSide: {
    alignItems: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roundButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonDisabled: {
    backgroundColor: '#e6e6e6',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  addMoreItemsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  addMoreItemsText: {
    color: '#000',
    fontWeight: 'bold',
  },
  additionalItemsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  additionalItemsList: {
    marginBottom: 10,
  },
  additionalItem: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  additionalItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  additionalItemPrice: {
    fontSize: 14,
  },
  utensilsSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  utensilsSwitchLabel: {
    fontSize: 16,
  },
  summaryContainer: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',

  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  savingsContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
    padding: 15,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingsText: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25, 
    width: '90%',
    alignSelf: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountedFee: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalFee: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  addMoreItemsButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addMoreItemsButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 8,
  },
  featuredItemContainer: {
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  featuredItem: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  featuredItemTitle: {
    marginTop: 5,
    width: 100, // Adjust based on your content
    textAlign: 'center',
  },
  carousel: {
    paddingVertical: 10, // Adjust as needed
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  headerTitleContainer: {
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  promoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  discountText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  discountedFee: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default CartScreen;

