import { StatusBar, TouchableOpacity, View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import BackButton from './BackButton';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseConfig';

const FoodLockerScreen = ({ route }) => {
  const navigation = useNavigation();
  const { orderPools } = route.params;

  const toRestaurantScreen = (orderPool) => () => {
    navigation.navigate('RestaurantDetail', { orderPool });
  }

  const parseTime = (time) => {
    let parsed = time.toDate();
    return parsed.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  const RenderOrderPools = () => {
    return orderPools.map(orderPool => (
      <View key={orderPool.OrderPoolID} style={styles.restaurantCard} >
        <TouchableOpacity onPress={toRestaurantScreen(orderPool)}>
          <Image source={{ uri: orderPool.Restaurant.Image }} style={styles.restaurantImg} />
          <View style={styles.restaurantInfo}>
            <View style={styles.lineSection}>
              <Text style={styles.restaurantName}>{orderPool.Restaurant.RestaurantName}</Text>
              <Text style={styles.orderNumber}>{orderPool.OrderID.length} {orderPool.OrderID.length > 1 ? 'Orders' : 'Order'}</Text>
            </View>
            <View style={styles.lineSection}>
              <Text style={styles.secondaryText}>{orderPool.Restaurant.Cuisine} • {orderPool.Restaurant.Price}</Text>
              <Text style={styles.secondaryText}>Order By {parseTime(orderPool.EndTime)}</Text>
            </View>
            <View style={styles.lineSection}>
              <Text style={styles.secondaryText}>{orderPool.Restaurant.Rating} <FontAwesome name="star" size={16} color="gold" /> {orderPool.RestaurantReviews}</Text>
              <Text style={styles.secondaryText}>Deliver By {parseTime(orderPool.DeliveryTime)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <View style={[{ borderBottomColor: 'lightgrey' }, { borderBottomWidth: 1 }]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: orderPools[0].FoodLocker.Latitude,
            longitude: orderPools[0].FoodLocker.Longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: orderPools[0].FoodLocker.Latitude,
              longitude: orderPools[0].FoodLocker.Longitude,
            }}
            title={orderPools[0].FoodLocker.FoodLockerName}
            description='Food Locker'
          />
        </MapView>
        <View style={styles.foodLockerNameContainer}>
          <Text style={styles.secondaryText}>Food Locker</Text>
          <Text style={styles.screenTitle}>{orderPools[0].FoodLocker.FoodLockerName}</Text>
        </View>
      </View>
      <ScrollView>
        <RenderOrderPools />
        {/* {foodLockerRestaurants.map((restaurant, index) => (
          <View key={index} style={styles.restaurantCard} >
            <TouchableOpacity onPress={toRestaurantScreen(restaurant.name)}>
              <Image source={{ uri: restaurant.Image }} style={styles.restaurantImg} />
              <View style={styles.restaurantInfo}>
                <View style={styles.lineSection}>
                  <Text style={styles.restaurantName}>{restaurant.RestaurantName}</Text>
                  <Text style={styles.orderNumber}>{restaurant.orders}</Text>
                </View>
                <View style={styles.lineSection}>
                  <Text style={styles.secondaryText}>{restaurant.Cuisine} • {restaurant.Price}</Text>
                  <Text style={styles.secondaryText}>Order By {restaurant.orderTime}</Text>
                </View>
                <View style={styles.lineSection}>
                  <Text style={styles.secondaryText}>{restaurant.Rating} <FontAwesome name="star" size={16} color="gold" /> {restaurant.Reviews}</Text>
                  <Text style={styles.secondaryText}>Deliver by {restaurant.deliveryTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))} */}
      </ScrollView>
    </View>
  );
}

export default FoodLockerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  map: {
    height: Dimensions.get('window').height / 5,
  },
  foodLockerNameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  scrollViewContaier: {
    flex: 1,
  },
  restaurantCard: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'column',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  restaurantImg: {
    width: '100%',
    height: Dimensions.get('window').height / 5,
    borderRadius: 10
  },
  restaurantInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10
  },
  lineSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  orderNumber: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  },
  secondaryText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '600'
  }
})