import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrdersScreen = ({ navigation, route }) => {
  const { orderPool } = route.params;

  const [orderStatus, setOrderStatus] = useState(`Heading to ${orderPool.FoodLocker.FoodLockerName} Food Locker`);
  const [progress, setProgress] = useState(0.5); // Progress of the order, 0.5 for half, 1 for completed
  const [orderProgress, setOrderProgress] = useState('inProgress');

  useEffect(() => {
    // Mock order status update after 2 seconds
    const timer = setTimeout(() => {
      setOrderStatus(`Arrived at ${orderPool.FoodLocker.FoodLockerName} Food Locker`);
      setProgress(1); // Set progress to 1 indicating completion
      setOrderProgress('completed');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const progressBarStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 20,
      paddingHorizontal: '5%', // Ensure there's space for the icons not to be cut off
    },
    line: {
      position: 'absolute',
      top: '50%',
      left: '5%',
      right: '5%',
      height: 4, // Thicker line
      backgroundColor: '#e0e0e0', // Light grey for the incomplete part
      zIndex: 1,
    },
    completedLine: {
      position: 'absolute',
      top: '50%',
      left: '6%',
      width: `${progress * 92}%`, // Adjust the width as needed
      height: 4, // Thicker line
      backgroundColor: 'black', // Black for the completed part
      zIndex: 2,
    },
    iconContainer: {
      width: 35, // Size of the circle container
      height: 35, // Size of the circle container
      borderRadius: 20, // Half the size to make it circular
      backgroundColor: 'white', // White background for the circles
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2, // Thickness of the circle border
      borderColor: 'black', // Color of the border
      zIndex: 3,
    },
    icon: {
      color: 'black', // Color of the icons
    },
  });

  // Dummy data for completed orders
  const completedOrders = [
    {
      id: '1',
      restaurant: 'House of Thai',
      date: 'Tue, Feb 8',
      price: '$39.54',
      items: '3 items',
      details: 'Pad Se-Ew • Pineapple Fried Rice • Sweet Sticky Rice',
    },
    {
      id: '2',
      restaurant: 'RT Rotisserie',
      date: 'Fri, Feb 4',
      price: '$16.02',
      items: '2 items',
      details: 'Banana • Pacific Organic Creamy Butternut Squash Soup • Signature...',
    },
  ];

  const renderCompletedOrder = (order) => {
    let imageSource = order.id === '1' ? require('../assets/thai.png') : require('../assets/rt.png');

    return (
      <View key={order.id} style={styles.completedOrderContainer}>
        <View style={styles.orderHeader}>
          <Image source={imageSource} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>{order.restaurant}</Text>
        </View>
        <Text style={styles.orderDate}>{order.date} • {order.price} • {order.items}</Text>
        <Text style={styles.orderDetails}>{order.details}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const handleViewOrderDetails = () => {
    navigation.navigate('OrderComplete', { orderPool }); // Use the correct screen name for order details
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.header}>Orders</Text>
        <View style={styles.shadowBox}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: orderPool.FoodLocker.Latitude,
              longitude: orderPool.FoodLocker.Longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: orderPool.FoodLocker.Latitude,
                longitude: orderPool.FoodLocker.Longitude,
              }}
              title={orderPool.FoodLocker.FoodLockerName}
              description='Food Locker'
            />
          </MapView>
          <View style={styles.activeOrderContainer}>
            <Text style={styles.restaurantName}>{orderPool.Restaurant.RestaurantName}</Text>
            <Text style={styles.orderStatus}>
              {orderStatus}
            </Text>
            <Text style={styles.orderEta}>
              {orderProgress === 'inProgress' ? 'Arrives in 35 - 45 min' : 'Your order has arrived!'}
            </Text>
            <View style={progressBarStyles.container}>
              <View style={progressBarStyles.line} />
              {progress > 0 && <View style={progressBarStyles.completedLine} />}
              <View style={progressBarStyles.iconContainer}>
                <FontAwesome name="industry" size={18} color="black" />
              </View>
              <View style={progressBarStyles.iconContainer}>
                <FontAwesome name="building" size={18} color="black" />
              </View>
              <View style={progressBarStyles.iconContainer}>
                <FontAwesome name="car" size={18} color="black" />
              </View>
              <View style={progressBarStyles.iconContainer}>
                <FontAwesome name="lock" size={18} color="black" />
              </View>
            </View>


            <TouchableOpacity style={styles.orderDetailsButton} onPress={handleViewOrderDetails}>
              <Text style={styles.orderDetailsButtonText} numberOfLines={1}>Order Details</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.completedOrdersHeader}>Completed</Text>
        {completedOrders.map(renderCompletedOrder)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    flex: 1,
    paddingBottom: 150,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20
  },
  orderContainer: {
    marginBottom: 16,
  },
  map: {
    height: 200,
    borderRadius: 10
  },
  orderDetails: {
    padding: 16,
  },
  orderDetailsButton: {
    backgroundColor: 'red', // Updated background color
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 4,
  },
  orderEta: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderDetailsButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    width: 115,
    alignSelf: 'flex-end',
    marginRight: 13,
  },
  orderDetailsButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white', // Updated text color
  },
  completedOrdersHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
  },
  completedOrderContainer: {
    backgroundColor: '#ffffff', // Assuming white background for each order container
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee', // Light grey color for the separator line
  },
  orderActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#f0f0f0', // Light grey background for buttons
    borderRadius: 200,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  progressBarLine: {
    position: 'absolute',
    top: '50%',
    left: '12%',
    right: '12%',
    height: 2,
    backgroundColor: 'black',
    zIndex: -1,
  },
  progressBarIcon: {
    marginHorizontal: '8%',
  },
  completedOrderContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  restaurantName: {
    paddingBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderDate: {
    color: '#757575',
    paddingTop: 12,
    paddingBottom: 5,
  },
  orderDetails: {
    paddingLeft: 1,
    paddingBottom: 8,
  },
  reorderButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    marginRight: 8,
  },
  viewReceiptButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
    justifyContent: 'flex-end',
  },
  reorderButtonText: {
    textAlign: 'center',
  },
  viewReceiptButtonText: {
    textAlign: 'center',
  },

  bottomNavigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 7,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    color: 'gray',
  },
  activeOrderContainer: {
    padding: 16
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantImage: {
    width: 30, // Size of the image
    height: 30, // Size of the image
    borderRadius: 15, // Half the size to make it circular
    marginRight: 10, // Add some margin between the image and the text
  },
});

export default OrdersScreen;
