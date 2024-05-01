import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const SubmittingOrderScreen = ({ route }) => {
  const currentUser = FIREBASE_AUTH.currentUser;
  const { cartItems, orderPool, calculateTotalWithouTip, calculateOriginalTotal } = route.params;
  const [orderStatus, setOrderStatus] = useState({
    submitting: true,
    text: 'Submitting Order ...',
    icon: 'circle-o-notch',
  });

  const navigation = useNavigation();

  const renderOrderStatus = () => {
    return (
      <View style={styles.orderStatusContainer}>
        {orderStatus.submitting ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <FontAwesome name={orderStatus.icon} size={24} color="black" />
        )}
        <Text style={styles.orderStatusText}>{orderStatus.text}</Text>
      </View>
    );
  };
  useEffect(() => {
    submitOrder()
      .then(() => {
        setOrderStatus({
          submitting: false,
          text: 'Order Submitted',
          icon: 'check-circle',
        });
      })
  }, []);

  async function submitOrder() {
    const FoodItemIDs = cartItems.map(item => {
      return { FoodItemID: item.FoodItemID, Quantity: item.Quantity }
    });

    try {
      const newOrder = {
        FoodItemIDs: FoodItemIDs,
        OrderTime: new Date(),
        RestaurantID: orderPool.RestaurantID,
        TotalAmount: calculateTotalWithouTip.toFixed(2),
        UserID: currentUser.uid
      }
      const newOrderResponse = await addDoc(collection(FIREBASE_DB, 'Orders'), newOrder);
      const newOrderID = newOrderResponse.id;

      if (newOrderID) {
        const orderPoolRef = doc(FIREBASE_DB, 'OrderPools', orderPool.OrderPoolID);
        await updateDoc(orderPoolRef, {
          OrderID: arrayUnion(newOrderID)
        })
      }
    } catch (error) {
      // alert the user
      console.error('Error adding document: ', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.savedContainer, orderStatus.submitting ? styles.submittingBackground : styles.submittedBackground]}>
        <Text style={styles.savedAmount}>${(calculateOriginalTotal - calculateTotalWithouTip).toFixed(2)}</Text>
        <Text style={styles.savedText}>SAVED</Text>
      </View>

      <View style={styles.detailsContainer}>
        {renderOrderStatus()}
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Address</Text>
          <Text style={styles.address}>{orderPool.FoodLocker.FoodLockerName}</Text>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>{orderPool.Restaurant.RestaurantName}</Text>
          {
            cartItems.map((item, index) => {
              return (
                <Text key={index} style={styles.orderDetail}>{item.FoodName} x {item.Quantity}</Text>)
            })
          }
        </View>
        <TouchableOpacity style={styles.viewOrderButton} onPress={() => navigation.navigate('Orders', { orderPool })}>
          <Text style={styles.viewOrderButtonText}>View Order</Text>
        </TouchableOpacity>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
        }}
      >
        <Text style={styles.cancelButtonText}>Cancel Order</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkcyan',
  },
  savedContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
  },
  savedAmount: {
    fontSize: 54,
    fontWeight: 'bold',
    color: 'darkcyan',
    marginTop: 50,
  },
  savedText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
  },
  submittingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%', // Adjust the top margin to push the content down
  },
  submittingText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  savedContainerSubmitted: {
    backgroundColor: 'black', // darker green after submission
  },
  activityIndicator: {
    position: 'absolute',
    bottom: -20, // Move up to the bottom of the savedContainer
  },
  submittingTextSubmitted: {
    marginTop: '35%', // adjust the margin to push down the text after submission
  },
  submittingBackground: {
    backgroundColor: 'lightcyan',
  },
  submittedBackground: {
    backgroundColor: 'lightcyan',
  },
  detailsContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flex: 1,
    paddingTop: 30, // push the content down below the Saved container
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 18,
    color: '#424242',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#424242',
  },
  addressDetail: {
    fontSize: 14,
    color: '#424242',
  },
  orderContainer: {
    paddingTop: 20,
  },
  orderTitle: {
    fontSize: 18,
    color: '#424242',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDetail: {
    fontSize: 16,
    color: '#424242',
  },
  viewOrderButton: {
    backgroundColor: 'darkcyan', // Light green background for button
    borderRadius: 25,
    padding: 15,
    marginTop: 15, // Add some margin at the top
    width: '100%', // Full width button
    alignItems: 'center', // Center the text horizontally
  },
  viewOrderButtonText: {
    color: 'white', // Dark green text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'lightcyan',
    padding: 15,
    marginHorizontal: 20,
    width: '90%',
    height: 50,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 10,
    marginTop: 30,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20, // space between status and order details
  },
  statusIndicatorText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  orderStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Add some space above the address
    padding: 10,
    backgroundColor: 'white', // Match the background of the details container
    borderRadius: 8, // Match the border radius of the details container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  orderStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
});

export default SubmittingOrderScreen;
