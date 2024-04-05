import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SubmittingOrderScreen = () => {
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
    const timer = setTimeout(() => {
      setOrderStatus({
        submitting: false,
        text: 'Order Submitted',
        icon: 'check-circle',
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.savedContainer, orderStatus.submitting ? styles.submittingBackground : styles.submittedBackground]}>
        <Text style={styles.savedAmount}>$8.10</Text>
        <Text style={styles.savedText}>SAVED</Text>
      </View>
  
      <View style={styles.detailsContainer}>
        {renderOrderStatus()}
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Address</Text>
          <Text style={styles.address}>4000 15th Ave NE, Seattle, WA 98195</Text>
          <Text style={styles.addressDetail}>Suzzallo Library</Text>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>McDonald’s</Text>
          <Text style={styles.orderDetail}>6x Big Mac</Text>
          <Text style={styles.orderDetail}>3x Chicken Sandwich</Text>
          <Text style={styles.orderDetail}>4x Filet-O-Fish...</Text>
        </View>
        <TouchableOpacity style={styles.viewOrderButton} onPress={() => navigation.navigate('Orders')}>
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
    backgroundColor: 'lightcyan', // Red background for cancel button
    borderRadius: 25,
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    marginTop: 40, // Adjust top margin as needed
    marginBottom: 40, // Reduce bottom margin to move button up
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
