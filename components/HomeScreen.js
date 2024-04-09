import React from 'react';
import { StatusBar, TouchableOpacity, View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Calculate itemWidth based on the number of items you want to display
const itemWidth = screenWidth; // Adjust margin as needed

// Adjust windowSize based on your requirements
const windowSize = 2;

const upperMenu = [
  { name: 'home', label: 'Offers' },
  { name: 'search', label: 'Grocery' },
  { name: 'shopping-cart', label: 'Alcohol' },
  { name: 'heart-o', label: 'Pets' },
  { name: 'user-circle', label: 'Beauty' },
];

const foodTypesMenu = [
  { name: 'home', label: 'Pizza' },
  { name: 'search', label: 'Mexican' },
  { name: 'sushi', label: 'Chinese' },
  { name: 'donut', label: 'Donuts' },
  { name: 'sandwich', label: 'Sandwich' },
  { name: 'nachos', label: 'Nachos' },
];

const miniMenuOptions = [
  { name: 'dashcube', label: 'DashPass' },
  { name: 'shopping-cart', label: 'Pickup' },
  { name: 'truck', label: 'Mass Delivery' },
];

const restaurantItems = [
  {
      name: 'McDonald\'s',
      cuisine: 'Burgers',
      price: '$$',
      rating: '4.7',
      reviews: '(1300)',
      orderDistance: '1.4 miles',
      orderTime: '20 min',
      deal: '$0.50 delivery fee with Mass Delivery',
      specialDeal: '20% off, up to 5$',
      image: require('../assets/mcdonalds_burger.jpg'),
  },

  {
    name: 'McDonalds',
    cuisine: 'Burgers',
    price: '$$',
    rating: '4.7',
    reviews: '(1300)',
    orderDistance: '23 Orders',
    orderTime: 'Order By 12:30 PM',
    deal: '$0.50 delivery fee with Mass Delivery',
    specialDeal: '20% off, up to 5$',
    image: require('../assets/mcdonalds_burger.jpg'),
}
];

export default function HomeScreen() {
  // Renders the carousel items
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <View style={styles.headerContainer}>
        <Text style={styles.carouselTitle}>{item.name}</Text>
        <View style={styles.iconContainer}>
          <FontAwesome name="heart-o"  style={styles.heartIcon} />
        </View>
      </View>
      <View style={styles.carouselInfo}>
        <FontAwesome name="star" style={styles.starIcon} />
        <Text style={styles.carouselDetails}>{item.rating} • {item.orderTime} • {item.orderDistance} </Text>
      </View>
      <Text style={styles.carouselDeal}>{item.deal}</Text>
      <Text style={styles.carouselSpecialDeal}>{item.specialDeal}</Text>
    </View>
  );

  return (
    
    <ScrollView contentContainerStyle={styles.scrollView}>
       <View style={styles.header}>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-pin" size={20} color="black" style={styles.locationIcon} />
          <Text style={styles.currentLocation}>UW</Text>
          <FontAwesome name="chevron-down" size={16} color="gray" style={styles.dropdownIcon} />
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="user-circle" size={24} color="black" style={styles.iconMargin} />
          <FontAwesome name="bell" size={24} color="black" style={styles.iconMargin} />
          <FontAwesome name="shopping-cart" size={24} color="black" style={styles.iconMargin} />
        </View>
      </View>
     
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={24} color="gray" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search Doordash</Text>
      </View> 

      <View style={styles.topMenu}>
        {upperMenu.map((icon, index) => (
          <View key={index} style={styles.topMenuItem}>
            <FontAwesome name={icon.name} size={24} color="gray" />
            <Text style={styles.topMenuLabel}>{icon.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.topMenu}>
        {foodTypesMenu.map((icon, index) => (
          <View key={index} style={styles.topMenuItem}>
            <FontAwesome name={icon.name} size={24} color="gray" />
            <Text style={styles.topMenuLabel}>{icon.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.miniMenu}>
        {miniMenuOptions.map((option, index) => (
          <TouchableOpacity key={index} style={styles.miniMenuItem}>
            <FontAwesome name={option.name} size={16} color="gray" style={styles.miniMenuItemIcon} />
            <Text style={styles.miniMenuItemLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.container}>
        <Text style={styles.catagoryTitle}>Recently Viewed</Text>
        <Carousel
          data={restaurantItems}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={itemWidth}
          windowSize={windowSize}
        />

        <Text style={styles.catagoryTitle}>Top Restaurants</Text>
        <Carousel
          data={restaurantItems}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={itemWidth}
          windowSize={windowSize}
        />

        <Text style={styles.catagoryTitle}>All Stores</Text>
        <Carousel
          data={restaurantItems}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={itemWidth}
          windowSize={windowSize}
        />
      </View>

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
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: screenHeight * 0.2, // Adjust the paddingBottom to make space for the bottomNavigationBar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 35,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  currentLocation: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  dropdownIcon: {
    marginLeft: 5,
  },
  iconMargin: {
    marginLeft: 25,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: 'gray',
    flex: 1,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  topMenuItem: {
    alignItems: 'center',
  },
  topMenuLabel: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
  miniMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  miniMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  miniMenuItemIcon: {
    marginRight: 10,
  },
  miniMenuItemLabel: {
    fontSize: 14,
    color: 'black',
  },
  carouselItem: {
    marginBottom: 30,
    marginTop: 5,
  },
  catagoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'roboto-bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingHorizontal: 10,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,  // Adjust the font size as needed,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    size: 25,
  },
  starIcon: {
    marginRight: 2,
    size: 20,
  },
  carouselImage: {
    width: '100%',
    height: screenWidth / 2., // Adjust height to make it shorter
    aspectRatio: 1.6, // Adjust aspect ratio to make it wider
    borderRadius: 10, // Rounded corners
  },
  carouselInfo: {
    flexDirection: 'row',  // Arrange elements horizontally
    alignItems: 'center',   // Align elements vertically in the center
    flex: 1, 
  },
  carouselRating: {
    marginRight: 10,
  },
  carouselDetails: {
   fontSize: 14,
   marginBottom: 3,
   color: '#767676'
  },
  carouselDeal: {
    fontSize: 14,
    marginBottom: 3,
    color: '#767676'
  },
  carouselSpecialDeal: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 'bold',
    color: '#00838A'
  },
  bottomNavigationBar: {
    position: 'absolute', // Keep the bar fixed at the bottom
    bottom: 0, // Position it at the absolute bottom
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
  }
});