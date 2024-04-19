import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const ChooseLocationTime = ({ orderPool }) => {

  const parseTime = (time) => {
    let parsed = time.toDate();
    return parsed.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subSection}>
        <Text style={styles.primaryText}>{orderPool.FoodLocker.FoodLockerName}</Text>
        <Text style={styles.secondaryText}>How it works</Text>
      </View>
      <View style={styles.verticalLine}></View>
      <View style={styles.subSection}>
        <Text style={styles.primaryText}>{parseTime(orderPool.EndTime)}</Text>
        <Text style={styles.secondaryText}>Deliver By: {parseTime(orderPool.DeliveryTime)}</Text>
      </View>
    </View>
  )
}

export default ChooseLocationTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 15,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10
  },
  subSection: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderLeftColor: "lightgray"
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: Dimensions.get('window').width / 30
  },
  secondaryText: {
    color: "gray",
    fontWeight: "bold",
    fontSize: Dimensions.get('window').width / 35
  }
})