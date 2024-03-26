import React from 'react';
import { StatusBar, TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const foodOptions = [
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

  const SuzzalloFoodLockerScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <ScrollView style={{ flex: 1 }}>
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
            {foodOptions.map((option, index) => (
              <View key={index} style={styles.foodOption}>
                <TouchableOpacity onPress={() => navigation.navigate('McDonaldsDetail')}>
                <Image source={option.image} style={styles.foodImage} />
                </TouchableOpacity>
                <View style={styles.foodDetailContainer}>
                  <Text style={styles.foodName}>{option.name}</Text>
                  <View style={styles.foodMetaData}>
                    <Text style={styles.cuisine}>{option.cuisine}</Text>
                    <Text style={styles.price}>{option.price}</Text>
                    <Text style={styles.rating}>{option.rating} <Text style={styles.reviews}>{option.reviews}</Text></Text>
                  </View>
                  <View style={styles.orderDetails}>
                    <Text style={styles.orders}>{option.orders}</Text>
                    <Text style={styles.orderTime}>{option.orderTime}</Text>
                    <Text style={styles.deliveryTime}>{option.deliveryTime}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          {/* Bottom Navigation Bar would go here */}
        </View>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
        },
        map: {
          height: 200, // Adjust as needed
        },
        foodOption: {
          marginVertical: 10,
        },
        foodImage: {
          width: '100%', // Adjust as needed
          height: 200, // Adjust as needed
        },
        foodDetailContainer: {
          padding: 10,
        },
        foodName: {
          fontWeight: 'bold',
          fontSize: 24,
          marginBottom: 5,
        },
        foodMetaData: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        cuisine: {
          fontSize: 18,
        },
        price: {
          fontSize: 18,
        },
        rating: {
          fontSize: 18,
        },
        reviews: {
          fontSize: 14,
          color: 'grey',
        },
        orderDetails: {
          marginTop: 10,
        },
        orders: {
          color: 'red',
          fontWeight: 'bold',
          fontSize: 18,
        },
        orderTime: {
          fontSize: 16,
          color: 'grey',
        },
        deliveryTime: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        separator: {
          height: 1,
          backgroundColor: 'lightgrey',
          width: '100%',
        },
        detailsContainer: {
          padding: 16, // Adjust padding as needed
        },
        foodType: {
          fontSize: 18,
          color: 'grey',
          marginBottom: 4,
        },
        ordersText: {
          fontSize: 18,
          color: 'red', // Adjust the color as needed
          marginBottom: 4,
        },
        ratingContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        ratingCount: {
          fontSize: 16,
          color: 'grey',
        }})

        export default SuzzalloFoodLockerScreen;