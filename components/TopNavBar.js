import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const TopNavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Checkout</Text>
        <Text style={styles.restaurantName}>Restaurant Name</Text>
      </View>
    </View>
  )
}

export default TopNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    padding: 10,
  },
  icon: {
    position: "absolute",
    left: 20,
    top: 20
  },
  textContainer: {
    alignItems: "center"
  },
  text: {
    fontWeight: "bold",
    color: "gray"
  },
  restaurantName: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  }
})