import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from './BackButton';

const OrderCompleteScreen = ({ route }) => {
  const { orderPool } = route.params;

  const parseTime = (time) => {
    let parsed = time.toDate();
    return parsed.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.textPrimary}>Order Complete</Text>
      <Text style={styles.textBody}>Thank you for your order! Your Order has reached <Text style={{ fontWeight: 'bold' }}>{orderPool.FoodLocker.FoodLockerName}</Text> Food Locker at <Text style={{ fontWeight: 'bold' }}>{parseTime(orderPool.DeliveryTime)}</Text>. Please enter the order ID texted to you, or scan the QR code to unlock your order</Text>
    </SafeAreaView>
  )
}

export default OrderCompleteScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textPrimary: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20
  },
  textBody: {
    fontSize: 18,
    fontWeight: '400'
  }
})