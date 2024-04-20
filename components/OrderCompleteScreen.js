import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg'

import BackButton from './BackButton';
import { useNavigation } from '@react-navigation/native';

const OrderCompleteScreen = ({ route }) => {
  const navigation = useNavigation();

  const { orderPool } = route.params;

  const parseTime = (time) => {
    let parsed = time.toDate();
    return parsed.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  const finishOrder = () => {
    navigation.navigate('Home');
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.textPrimary}>Order Complete</Text>
      <Text style={styles.textBody}>Thank you for your order! Your Order has reached <Text style={{ fontWeight: 'bold' }}>{orderPool.FoodLocker.FoodLockerName}</Text> Food Locker at <Text style={{ fontWeight: 'bold' }}>{parseTime(orderPool.DeliveryTime)}</Text>. Please enter the order ID texted to you, or scan the QR code to unlock your order</Text>
      <Text style={styles.textSecondary}>Scan Me</Text>
      <View style={styles.centeredContainer}>
      <QRCode
        value="https://example.com" // Replace this with your desired content
        size={245}      
        color='black'
        backgroundColor='white'
      />
    </View>
      <TouchableOpacity style={styles.button} onPress={finishOrder}>
        <Text style={styles.buttonText}>Finish Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OrderCompleteScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  textPrimary: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20
  },
  textBody: {
    fontSize: 18,
    fontWeight: '400'
  },
  textSecondary: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
    marginTop: 90,
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
    position: 'absolute',
    bottom: 20,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width / 25
  },
})