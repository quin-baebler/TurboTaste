import { StatusBar, TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
        <ScrollView style={styles.scrollView}>
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
      <View style={styles.separator} />
      {foodOptions.map((option, index) => (
        <View key={index} style={styles.foodOption}>
          <TouchableOpacity onPress={() => navigation.navigate('McDonaldsDetail')}>
            <Image source={option.image} style={styles.foodImage} />
          </TouchableOpacity>
          <View style={styles.foodDetailContainer}>
            <View style={styles.foodTopRow}>
              <Text style={styles.foodName}>{option.name}</Text>
              <Text style={styles.ordersText}>{option.orders}</Text>
            </View>
            <View style={styles.foodMiddleRow}>
              <Text style={styles.foodType}>{option.cuisine} • {option.price}</Text>
              <Text style={styles.orderTime}>{option.orderTime}</Text>
            </View>
            <View style={styles.foodBottomRow}>
            <View style={styles.ratingContainer}>
  <Text style={styles.rating}>{option.rating}</Text>
  <FontAwesome name="star" size={16} color="gold" />
  <Text style={styles.ratingCount}>{option.reviews}</Text>
</View>

              <Text style={styles.deliveryTime}>{option.deliveryTime}</Text>
            </View>
          </View>
          {index < foodOptions.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </ScrollView>
          <View style={styles.bottomNavigationBar}>
      <View style={styles.navItem}>
          <FontAwesome name="home" size={24} color="red" />
          <Text style={styles.navText}>Home</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="shopping-basket" size={24} color="gray" />
          <Text style={styles.navText}>Grocery</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="tag" size={24} color="gray" />
          <Text style={styles.navText}>Retail</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="search" size={24} color="gray" />
          <Text style={styles.navText}>Search</Text>
        </View>
        <View style={styles.navItem}>
          <FontAwesome name="file-text-o" size={24} color="gray" />
          <Text style={styles.navText}>Order</Text>
        </View>
        </View>
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
        screenTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          padding: 16,
          textAlign: 'center',
          backgroundColor: '#fff',
        },
        separator: {
          height: 2,
          backgroundColor: '#e0e0e0',
          width: '100%',
          alignSelf: 'center',
        },
        scrollView: {
          // Ensure the scroll view takes into account the navigation bar
          marginBottom: 50, // Height of the bottom navigation bar
        },
        foodOption: {
          marginVertical: 10,
          backgroundColor: '#fff', // Assuming white background
          borderRadius: 10, // Rounded corners for the card
          overflow: 'hidden', // Ensures the image corners are also rounded
        },
        foodImage: {
          width: '100%', // Adjust as needed
          height: 200, // Adjust as needed
          resizeMode: 'cover', // Ensures proper scaling of image
        },
        foodDetailContainer: {
          padding: 10,
        },
        foodName: {
          fontWeight: 'bold',
          fontSize: 20,
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
          fontSize: 16,
          fontWeight: 'bold',
          marginRight: 4, // Add space between the rating and the star
        },
        foodTopRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        foodMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4, // Add some space between the rows
  },
  foodBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
          fontSize: 15,
          fontWeight: 'bold',
          color: 'grey',
        },
        deliveryTime: {
          fontSize: 15,
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
          fontSize: 16,
          color: 'grey',
        },
        ordersText: {
          color: 'crimson',
          fontWeight: 'bold',
          fontSize: 14, // Make sure the size matches the left text if needed
        },
        ratingContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        bottomNavigationBar: {
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          backgroundColor: '#fff',
          justifyContent: 'space-around',
          paddingVertical: 10,
        },
        navItem: {
          alignItems: 'center', // Center the icons and text
        },
        navText: {
          fontSize: 10, // Smaller font size for the text
          color: 'gray',
        },
        ratingCount: {
          fontSize: 14,
          color: 'grey',
          marginLeft: 5,
        }})

        export default SuzzalloFoodLockerScreen;