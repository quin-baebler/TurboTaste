import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = ({ navigation }) => {
  const [orderStatus, setOrderStatus] = useState('Heading to Suzzallo Hub');
  const [progress, setProgress] = useState(0.5); // Progress of the order, 0.5 for half, 1 for completed
  const [orderProgress, setOrderProgress] = useState('inProgress');
  
  
  useEffect(() => {
    // Mock order status update after 2 seconds
    const timer = setTimeout(() => {
      setOrderStatus('Arrived at Suzzallo Hub');
      setProgress(1); // Set progress to 1 indicating completion
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const progressBarStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    line: {
      position: 'absolute',
      top: '50%',
      left: '10%',
      right: '10%',
      height: 2,
      backgroundColor: '#e0e0e0', // Grey for the uncompleted part
      zIndex: -1,
    },
    completedLine: {
      position: 'absolute',
      top: '50%',
      left: '10%',
      width: `${progress * 80}%`, // Assuming the icons are about 10% from each end
      height: 2,
      backgroundColor: 'black', // Black for the completed part
      zIndex: 1,
    },
    icon: {
      marginHorizontal: '8%',
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

  // Active order details
  const activeOrder = {
    id: '1',
    restaurant: "McDonald's",
    status: 'Heading to Suzzallo Hub',
    eta: 'Arrives in 35 - 45 min',
    mapRegion: {
      latitude: 47.6062,
      longitude: -122.3321,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  const renderCompletedOrder = (order) => (
    <View key={order.id} style={styles.completedOrderContainer}>
      <Text style={styles.restaurantName}>{order.restaurant}</Text>
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

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarLine} />
        <FontAwesome name="industry" size={24} color={orderArrived ? 'black' : 'grey'} style={styles.progressBarIcon} />
        <FontAwesome name="building" size={24} color={orderArrived ? 'black' : 'grey'} style={styles.progressBarIcon} />
        <FontAwesome name="car" size={24} color={orderArrived ? 'black' : 'grey'} style={styles.progressBarIcon} />
        <FontAwesome name="lock" size={24} color={orderArrived ? 'black' : 'grey'} style={styles.progressBarIcon} />
      </View>
    );
  };


  // MapView marker coordinates for the active order
  const markerCoordinate = {
    latitude: 47.6062,
    longitude: -122.3321,
  };

  const handleViewOrderDetails = () => {
    navigation.navigate('OrderDetails'); // Use the correct screen name for order details
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Orders</Text>
        
        {/* Active Order */}
        <MapView
          style={styles.map}
          region={activeOrder.mapRegion}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={activeOrder.mapRegion} />
        </MapView>
        <View style={styles.activeOrderContainer}>
          <Text style={styles.restaurantName}>McDonald's</Text>
          <Text style={styles.orderStatus}>
            {orderProgress === 'inProgress' ? 'Heading to Suzzallo Hub' : 'Arrived at Suzzallo Hub'}
          </Text>
          <Text style={styles.orderEta}>
            {orderProgress === 'inProgress' ? 'Arrives in 35 - 45 min' : 'Your order has arrived!'}
          </Text>
          {/* Progress Bar */}
          <View style={progressBarStyles.container}>
        <View style={progressBarStyles.line} />
        <View style={progressBarStyles.completedLine} />
        {/* Icons for the progress bar */}
        <FontAwesome name="industry" size={24} color="black" style={progressBarStyles.icon} />
        <FontAwesome name="building" size={24} color="black" style={progressBarStyles.icon} />
        <FontAwesome name="car" size={24} color="black" style={progressBarStyles.icon} />
        <FontAwesome name="lock" size={24} color="black" style={progressBarStyles.icon} />
      </View>
      <Text style={styles.orderStatus}>{orderStatus}</Text>
      <Text style={styles.orderEta}>{orderStatus === 'Heading to Suzzallo Hub' ? 'Arrives in 35 - 45 min' : 'Your order has arrived!'}</Text>

      <TouchableOpacity style={styles.orderDetailsButton} onPress={handleViewOrderDetails}>
        <Text style={styles.orderDetailsButtonText}>Order Details</Text>
      </TouchableOpacity>
        </View>

        {/* Completed Orders */}
        <Text style={styles.completedOrdersHeader}>Completed</Text>
        {completedOrders.map(renderCompletedOrder)}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavigationBar}>
        {/* The same navigation bar as in McDonaldsDetailScreen */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <FontAwesome name="home" size={24} color="gray" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Grocery')} style={styles.navItem}>
          <FontAwesome name="shopping-basket" size={24} color="gray" />
          <Text style={styles.navText}>Grocery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Retail')} style={styles.navItem}>
          <FontAwesome name="tag" size={24} color="gray" />
          <Text style={styles.navText}>Retail</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.navItem}>
          <FontAwesome name="search" size={24} color="gray" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={styles.navItem}>
          <FontAwesome name="file-text-o" size={24} color="gray" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  orderContainer: {
    marginBottom: 16,
  },
  map: {
    height: 150,
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
    color: 'green',
    marginVertical: 4,
  },
  orderEta: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderDetailsButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  orderDetailsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white', // Updated text color
  },
  completedOrdersHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  // Add styles for the completed orders and bottom navigation bar
  bottomNavigationBar: {
    // Styles for the navigation bar
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
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingVertical: 12,
  },
  bottomNavigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
    position: 'absolute', // Make navigation bar stick to the bottom
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center', // Center the icons and text
  },
  navText: {
    fontSize: 10, // Smaller font size for the text
    color: 'gray',
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
  reorderButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginRight: 8,
  },
  viewReceiptButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
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
    bottom: 0,
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
});

export default OrdersScreen;
