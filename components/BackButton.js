import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const BackButton = () => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={navigateBack}>
      <Ionicons name="arrow-back" size={18} color="black" />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 200,
    backgroundColor: 'white',
    position: 'absolute',
    top: Dimensions.get('window').height / 15,
    left: Dimensions.get('window').width / 20,
    zIndex: 1
  }
})