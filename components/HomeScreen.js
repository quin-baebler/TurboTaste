import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { FIREBASE_DB } from '../firebaseConfig';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [mdSelected, setMdSelected] = useState(false);
  const [orderPools, setOrderPools] = useState([]);
  const [orderPoolsContextualized, setOrderPoolsContextualized] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mdSelected) {
      getOrderPools();
    } else {
      getAllRestaurants();
    }
  }, [mdSelected]);

  useEffect(() => {
    if (orderPools.length) {
      contextualizeOrderPools()
    }
  }, [orderPools]);

  async function getOrderPools() {
    setLoading(true);
    try {
      const orderPoolRef = collection(FIREBASE_DB, 'OrderPools');
      const response = await getDocs(orderPoolRef);

      const orderPools = [];
      response.forEach(orderPool => {
        orderPools.push({
          ...orderPool.data(),
          OrderPoolID: orderPool.id
        })
      })
      setOrderPools(orderPools);
    } catch (error) {
      console.error('Error fetching order pools', error);
    } finally {
      setLoading(false);
    }
  }

  async function getAllRestaurants() {
    setLoading(true);
    try {
      const restaurantsRef = collection(FIREBASE_DB, 'Restaurants');
      const response = await getDocs(restaurantsRef);
      const restaurants = [];
      response.forEach(restaurant => {
        restaurants.push({
          ...restaurant.data(),
          RestaurantID: restaurant.id
        })
      })
      setRestaurants(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants', error);
    } finally {
      setLoading(false);
    }
  }

  async function contextualizeOrderPools() {
    if (orderPools.length) {
      setLoading(true);
      try {
        const promises = orderPools.map(async (orderPool) => {
          // get restaurant details
          const restaurantResponse = await getDoc(doc(FIREBASE_DB, 'Restaurants', orderPool.RestaurantID));

          // get food locker details
          const foodLockerResponse = await getDoc(doc(FIREBASE_DB, 'FoodLockers', orderPool.FoodLockerID));

          return {
            ...orderPool,
            Restaurant: restaurantResponse.data(),
            FoodLocker: foodLockerResponse.data()
          }
        });
        const response = await Promise.all(promises);
        setOrderPoolsContextualized(response);
      } catch (error) {
        console.error('Error contextualizing order pools', error);
      } finally {
        setLoading(false);
      }
    }
  }

  function goToFoodLocker(foodLockerID) {
    // find all orderPools that has the foodLockerID
    const orderPools = orderPoolsContextualized.filter(orderPool => orderPool.FoodLockerID === foodLockerID);

    navigation.navigate('FoodLocker', { orderPools });
  }

  function renderRestaurants(restaurant) {
    const item = restaurant.item;
    return (
      <TouchableOpacity>
        <View style={styles.restaurantCardContainer}>
          <Image source={{ uri: item.Image }} style={styles.restaurantImg} />
        </View>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}> {item.RestaurantName}</Text>
          <Text style={styles.restaurantRating}><Ionicons name="star" size={12} color="black" /> {item.Rating} ({item.Reviews})</Text>
        </View>
      </TouchableOpacity >
    )
  }

  function MDRestaurants() {
    // create a map for {foodLockerId: [restaurant1, restaurant2, ...]}
    const foodLockerRestaurants = orderPoolsContextualized.reduce((map, orderPool) => {
      if (map[orderPool.FoodLockerID]) {
        // push the restaurant to the array with restaurantid in the object
        map[orderPool.FoodLockerID].push({
          ...orderPool.Restaurant,
          RestaurantID: orderPool.RestaurantID,
          FoodLockerName: orderPool.FoodLockerName
        });
      } else {
        map[orderPool.FoodLockerID] = [{
          ...orderPool.Restaurant,
          RestaurantID: orderPool.RestaurantID,
          FoodLockerName: orderPool.FoodLocker.FoodLockerName
        }];
      }
      return map;
    }, {});


    const foodLockerIDs = Object.keys(foodLockerRestaurants);

    return (
      <View style={styles.sectionContainer}>
        {
          foodLockerIDs.map(foodLockerID => {
            return (
              <View key={foodLockerID}>
                <View style={styles.foodLockerTab}>
                  <Text style={styles.textPrimary}>{foodLockerRestaurants[foodLockerID][0].FoodLockerName}</Text>
                  <TouchableOpacity onPress={() => goToFoodLocker(foodLockerID)}>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <FlatList
                  horizontal
                  data={foodLockerRestaurants[foodLockerID]}
                  renderItem={renderRestaurants}
                  keyExtractor={restaurant => restaurant.RestaurantID}
                  style={{ marginBottom: 20 }} />
              </View>
            )
          })
        }
      </View>
    )
  }

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={[styles.sectionContainer, { marginTop: 0 }]}>
        <View>
          <View style={styles.top}>
            <View style={styles.toolBarLeft}>
              <TouchableOpacity>
                <Ionicons name="location-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold' }}>UW</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-down" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.toolBarRight}>
              <TouchableOpacity>
                <Ionicons name="person-circle-outline" size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={24} color='black' />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="cart-outline" size={24} color='black' />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={24} color="black" />
              <Text style={{ marginLeft: 20, fontWeight: 'bold', color: 'gray' }}>Search DoorDash</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={[styles.sectionContainer, { marginLeft: 0 }]}>
          <Image source={require('../assets/typeitems.jpg')} style={{ height: Dimensions.get('window').width / 4, width: '100%', resizeMode: 'contain' }} />
          <Image source={require('../assets/foodItems.jpg')} style={{ height: Dimensions.get('window').width / 4, width: '100%', resizeMode: 'contain' }} />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.tabItemContainer}>
            <TouchableOpacity style={styles.tabItem}>
              <Text>DashPass</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>Pickup</Text>
    <Ionicons name="walk-outline" size={18} color="black" style={{ marginLeft: 5 }} />
  </View>
</TouchableOpacity>


            <TouchableOpacity style={[styles.tabItem, mdSelected ? styles.tabItemSlected : null]} onPress={() => setMdSelected(!mdSelected)}>
              <Text style={mdSelected ? styles.tabItemSlected : null}>Mass Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}>
              <Text>Offers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {
          mdSelected ? (
            <>
              {
                loading ? (
                  <ActivityIndicator size="large" color="black" style={styles.loading} />
                ) : (
                  <>
                    <View style={styles.sectionContainer}>
                      <MapView
                        style={styles.map}
                        initialRegion={{
                          latitude: 47.655548,
                          longitude: -122.303200,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02,
                        }}>

                        {
                          orderPoolsContextualized.map((orderPool) => {
                            const foodLocker = orderPool.FoodLocker;
                            return (
                              <Marker
                                key={orderPool.FoodLockerID}
                                coordinate={{ latitude: foodLocker.Latitude, longitude: foodLocker.Longitude }}
                                title={foodLocker.FoodLockerName}
                                description="Food Locker"
                              ></Marker>
                            )
                          })
                        }
                      </MapView>
                    </View>
                    <MDRestaurants />
                  </>
                )
              }
            </>
          ) : (
            <>
              {
                loading ? (
                  <ActivityIndicator size="large" color="black" style={styles.loading} />
                ) : (
                  <View style={styles.sectionContainer}>
                    <Text style={styles.textPrimary}>Recently Viewed</Text>
                    <FlatList
                      horizontal
                      data={restaurants}
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderRestaurants}
                      keyExtractor={restaurant => restaurant.RestaurantID}
                      style={{ marginBottom: 20 }} />

                    <Text style={styles.textPrimary}>Top Restaurants</Text>
                    <FlatList
                      horizontal
                      data={restaurants}
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderRestaurants}
                      keyExtractor={restaurant => restaurant.RestaurantID}
                      style={{ marginBottom: 20 }} />
                  </View>
                )
              }
            </>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  toolBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  toolBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 200
  },
  tabItemContainer: {
    flexDirection: 'row',
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 200,
    marginRight: 10,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  tabItemSlected: {
    backgroundColor: 'black',
    color: 'white',
  },
  textPrimary: {
    fontWeight: 'bold',
    fontSize: 20
  },
  restaurantCardContainer: {
    height: 150,
    width: Dimensions.get('window').width / 2,
    marginTop: 20,
    marginRight: 10
  },
  restaurantImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10
  },
  restaurantInfo: {
    marginTop: 10
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  restaurantRating: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
    fontWeight: '600'
  },
  map: {
    height: Dimensions.get('window').height / 5,
    borderRadius: 10,
    marginTop: 10
  },
  foodLockerTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  loading: {
    marginTop: 20
  }
})