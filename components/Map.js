import React from "react";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions } from "react-native";

const Map = () => {
  return (
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
  )
}

export default Map;

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get('window').height / 5,
    borderRadius: 10
  }
})
