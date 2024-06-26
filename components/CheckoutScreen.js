import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import ChooseLocationTime from "./ChooseLocationTime";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = ({ route }) => {
  const navigation = useNavigation();

  const { summary, cartItems, orderPool } = route.params;

  const [selectedTip, setSelectedTip] = useState(0);
  const tips = [1.5, 3, 3.5, 5];

  const calculateTotal = parseFloat(summary.total) + tips[selectedTip];
  const calculateOriginalTotal = parseFloat(summary.originalTotal);
  const calculateTotalWithouTip = parseFloat(summary.total);

  const placeOrder = async () => {
    navigation.navigate('SubmittingOrder', { orderPool, cartItems, calculateTotalWithouTip, calculateOriginalTotal });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
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
        </View>
        <View style={styles.sectionContainer}>
          <ChooseLocationTime orderPool={orderPool} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={[styles.tapItems, { paddingTop: 0 }]}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text style={styles.tapItemsText}>Phone Number</Text>
            <Ionicons name="chevron-forward" size={24} color="black" style={{ position: "absolute", right: 0 }} />
          </View>
          <View style={[styles.tapItems, { borderBottomWidth: 0 }]}>
            <Ionicons name="gift-outline" size={24} color="black" />
            <Text style={styles.tapItemsText}>Send as a gift</Text>
            <Ionicons name="chevron-forward" size={24} color="black" style={{ position: "absolute", right: 0 }} />
          </View>
        </View>
        <View style={styles.spacer}></View>
        <View style={styles.sectionContainer}>
          <Text style={styles.primaryText}>Summary</Text>
          <View style={styles.tapItems}>
            <Ionicons name="pricetag-outline" size={24} color="black" />
            <Text style={styles.tapItemsText}>Promo</Text>
            <Ionicons name="chevron-forward" size={24} color="black" style={{ position: "absolute", right: 0 }} />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.costBreakDownContainer}>
            <Text style={styles.categoryText}>Subtotal</Text>
            <Text style={styles.categoryText}>${summary.subtotal}</Text>
          </View>
          <View style={styles.costBreakDownContainer}>
            <Text style={styles.categoryText}>Delivery Fee</Text>
            <Text style={styles.categoryText}>${summary.deliveryFee}</Text>
          </View>
          <View style={styles.costBreakDownContainer}>
            <Text style={styles.categoryText}>Fees & Estimated Tax</Text>
            <Text style={styles.categoryText}>${(parseFloat(summary.fees) + parseFloat(summary.estimatedTax)).toFixed(2)}</Text>
          </View>
          <View style={[styles.costBreakDownContainer, { marginTop: 20 }]}>
            <Text style={styles.categoryText}>Dasher Tip</Text>
            <Text style={styles.categoryText}>${tips[selectedTip].toFixed(2)}</Text>
          </View>
          <View style={styles.tipContainer}>
            {tips.map((tip, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tipOption, selectedTip === tips.indexOf(tip) ? styles.selectedTipOption : null]}
                onPress={() => setSelectedTip(index)}>
                <Text style={[styles.tipText, selectedTip === tips.indexOf(tip) ? styles.selectedTipText : null]}>${tip.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.smallText}>100% of the tip goes to your Dasher.</Text>
          <View style={[styles.costBreakDownContainer, { paddingTop: 10 }]}>
            <Text style={[styles.categoryText, { fontWeight: 800 }, { fontSize: Dimensions.get('window').width / 20 }]}>Total</Text>
            <Text style={[styles.categoryText, { fontWeight: 800 }, { fontSize: Dimensions.get('window').width / 20 }]}>${calculateTotal.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <Pressable style={styles.button} onPress={placeOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </View>
  )
}

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between"
  },
  sectionContainer: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  map: {
    height: Dimensions.get('window').height / 5,
    borderRadius: 10
  },
  tapItems: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderColor: "lightgray",
    borderBottomWidth: 1
  },
  tapItemsText: {
    marginLeft: 18,
    fontWeight: "600",
    fontSize: Dimensions.get('window').width / 27
  },
  spacer: {
    height: 7,
    backgroundColor: "#F7F7F7",
    borderColor: "lightgray",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width
  },
  primaryText: {
    fontWeight: "700",
    fontSize: Dimensions.get('window').width / 25
  },
  costBreakDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoryText: {
    fontSize: Dimensions.get('window').width / 27,
    fontWeight: "600",
    paddingBottom: 10
  },
  tipContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tipOption: {
    width: '25%',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedTipOption: {
    backgroundColor: 'black',
    width: '25%'
  },
  tipText: {
    fontSize: Dimensions.get('window').width / 30,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  selectedTipText: {
    color: 'white',
    width: '100%',

  },
  smallText: {
    fontSize: Dimensions.get('window').width / 30,
    color: 'gray',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 20,
    width: '90%',
    height: 50,
    borderRadius: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 10,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width / 25
  }
})