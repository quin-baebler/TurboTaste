import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import TopNavBar from "./TopNavBar";
import ChooseLocationTime from "./ChooseLocationTime";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const CheckoutScreen = ({ navigation, orderDetail }) => {
  const { currentUser } = FIREBASE_AUTH;

  const [selectedTip, setSelectedTip] = useState(0);
  const tips = ['$3.00', '$4.00', '$5.00', 'Other'];

  const dummyOrderDetail = {
    userID: currentUser.uid,
    restaurantID: 1,
    foodItemIDs: [],
    totalAmount: 16.8,
    orderTime: new Date()
  }

  const placeOrder = async () => {
    try {
      const response = await addDoc(collection(FIREBASE_DB, 'Orders'), dummyOrderDetail);
      const newOrderID = response.id;
      console.log(newOrderID);
    } catch (error) {
      // alert the user
      console.error('Error adding document: ', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar navigation={navigation} />
      <ScrollView>
        <View style={styles.sectionContainer}>
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
        <View style={styles.sectionContainer}>
          <ChooseLocationTime />
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
            <Text style={styles.categoryText}>$15.00</Text>
          </View>
          <View style={styles.costBreakDownContainer}>
            <Text style={styles.categoryText}>Delivery Fee</Text>
            <Text style={styles.categoryText}>$2.00</Text>
          </View>
          <View style={styles.costBreakDownContainer}>
            <Text style={styles.categoryText}>Fees & Estimated Tax</Text>
            <Text style={styles.categoryText}>$1.80</Text>
          </View>
          <View style={styles.costBreakDownContainer}>
            <Text style={styles.categoryText}>Mass Delivery Credits</Text>
            <Text style={styles.categoryText}>-$5.00</Text>
          </View>
          <View style={[styles.costBreakDownContainer, { marginTop: 20 }]}>
            <Text style={styles.categoryText}>Dasher Tip</Text>
            <Text style={styles.categoryText}>{tips[selectedTip]}</Text>
          </View>
          <View style={styles.tipContainer}>
            {tips.map((tip, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tipOption, selectedTip === tips.indexOf(tip) ? styles.selectedTipOption : null]}
                onPress={() => setSelectedTip(index)}>
                <Text style={[styles.tipText, selectedTip === tips.indexOf(tip) ? styles.selectedTipText : null]}>{tip}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.smallText}>100% of the tip goes to your Dasher.</Text>
          <View style={[styles.costBreakDownContainer, { paddingTop: 10 }]}>
            <Text style={[styles.categoryText, { fontWeight: 800 }, { fontSize: Dimensions.get('window').width / 20 }]}>Total</Text>
            <Text style={[styles.categoryText, { fontWeight: 800 }, { fontSize: Dimensions.get('window').width / 20 }]}>$16.8</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.sectionContainer}>
        <Pressable style={styles.button} onPress={placeOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
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
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 200,
    alignItems: 'center',
    marginHorizontal: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width / 25
  }
})