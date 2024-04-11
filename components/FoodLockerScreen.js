import { StatusBar, TouchableOpacity, View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const restaurants = [
  {
    name: 'McDonalds',
    cuisine: 'Burgers',
    price: '$$',
    rating: '4.7',
    reviews: '(1300)',
    orders: '23 Orders',
    orderTime: 'Order By 12:30 PM',
    deliveryTime: 'Delivery at 1:30 PM',
    image: require('../assets/mcdonalds_burger.jpg'),
  },
  {
    name: 'Chipotle',
    cuisine: 'Bowls and Wraps',
    price: '$$',
    rating: '4.6',
    reviews: '(780)',
    orders: '17 Orders',
    orderTime: 'Order By 2:30 PM',
    deliveryTime: 'Delivery at 3:30 PM',
    image: require('../assets/chipotle_bowl.jpg'),
  },
];

const FoodLockerScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={[{ borderBottomColor: 'lightgrey' }, { borderBottomWidth: 1 }]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 47.655548,
            longitude: -122.303200,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: 47.655548,
              longitude: -122.303200,
            }}
            title="Suzzallo Food Locker"
          />
        </MapView>
        <Text style={styles.screenTitle}>Suzzallo Food Locker</Text>
      </View>
      <ScrollView>
        {restaurants.map((restaurant, index) => (
          <View key={index} style={styles.restaurantCard}>
            <TouchableOpacity onPress={() => navigation.navigate('McDonaldsDetail')}>
              <Image source={restaurant.image} style={styles.restaurantImg} />
              <View style={styles.restaurantInfo}>
                <View style={styles.lineSection}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.orderNumber}>{restaurant.orders}</Text>
                </View>
                <View style={styles.lineSection}>
                  <Text style={styles.secondaryText}>{restaurant.cuisine} • {restaurant.price}</Text>
                  <Text style={styles.secondaryText}>{restaurant.orderTime}</Text>
                </View>
                <View style={styles.lineSection}>
                  <Text style={styles.secondaryText}>{restaurant.rating} <FontAwesome name="star" size={16} color="gold" /> {restaurant.reviews}</Text>
                  <Text style={styles.secondaryText}>{restaurant.deliveryTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {index < restaurants.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  map: {
    height: Dimensions.get('window').height / 5,
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
  },
})

export default FoodLockerScreen;