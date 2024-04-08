import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const CheckoutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar />
      <ScrollView>
        <MapSection />
        <InfoSection />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CheckoutScreen;

const TopNavBar = () => {
  return (
    <View style={styles.navContainer}>
      <FontAwesome name="arrow-left" size={24} color="black" />
      <View style={styles.navTitle}>
        <Text>Checkout</Text>
        <Text>McDonald's</Text>
      </View>
    </View>
  )
}

const MapSection = () => {
  return (
    <View style={styles.mapContainer}>
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
    </View>
  )
}

const InfoSection = () => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoContainer.left}>
        <Text>Suzzallo Food Locker</Text>
        <Text>How it works</Text>
      </View>
      <View>
        <Text>12:30 PM</Text>
        <Text>Deliver By: 1:30</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignContent: 'center',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  navTitle: {
    flex: 2,
    alignItems: 'center'
  },
  mapContainer: {
    padding: 20
  },
  map: {
    height: 150,
    borderRadius: 10
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    padding: 20,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 10,
    left: {
      paddingRight: 20,
      borderEndColor: 'lightgrey',
      borderEndWidth: 1,
      alignItems: 'center'
    },
    right: {
      paddingLeft: 20,
    }
  }
})