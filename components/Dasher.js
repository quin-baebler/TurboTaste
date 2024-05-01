import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function DasherScreen() {
    const [countdown, setCountdown] = useState(60);
    const initialRegion = {
        latitude: 47.655548,
        longitude: -122.303200,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };
    const markers = [
        { coordinate: { latitude: 47.66490901351918, longitude: -122.31402469496533 }, title: 'cur', icon: require('../assets/curlocation.png') },
        { coordinate: { latitude: 47.66392594576467, longitude: -122.3132952046123 }, title: 'Start', icon: require('../assets/rest_pin.png') },
        { coordinate: { latitude: 47.66465599442614, longitude: -122.30924903227873 }, title: 'End', icon: require('../assets/home-pin.png') }
    ];

    const lines = [
        { start: { latitude: 47.66490901351918, longitude: -122.31402469496533 }, end: { latitude: 47.664891074542695, longitude: -122.31315100742395 } },
        { start: { latitude: 47.664891074542695, longitude: -122.31315100742395 }, end: { latitude: 47.6638621998976, longitude: -122.31315600872176 } },
        { start: { latitude: 47.6638621998976, longitude: -122.31315600872176 }, end: { latitude: 47.66310095174718 , longitude: -122.31317324749637 } },
        { start: { latitude: 47.66310095174718 , longitude: -122.31317324749637 }, end: { latitude: 47.66306259808344, longitude:  -122.30952859377474 } },
        { start: { latitude: 47.66306259808344, longitude:  -122.30952859377474 }, end: { latitude: 47.66458626256838, longitude:  -122.30947164604116 }}
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1;
                } else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 1000);

        // Clean up the interval when component unmounts
        return () => clearInterval(timer);
    }, []);

    const goToCheckout = () => {
        // Define your function logic here
        console.log('Continue button pressed');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mapContainer}>
            <MapView
                showsUserLocation={true}
                style={{ flex: 1 }}
                initialRegion={initialRegion}
            >
                {lines.map((line, index) => (
                    <Polyline
                        key={index}
                        coordinates={[line.start, line.end]}
                        strokeColor="#000" // Line color
                        strokeWidth={4} // Line width
                    />
                ))}
                {markers.map((marker, index) => ( <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                    >
                    <Image
                            source={marker.icon}
                            style={styles.markerIcon}
                            resizeMode="contain"
                        />
                        </Marker>
                ))}
            </MapView>
            </View>
            <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.priceText}>$14.45 <Text style={styles.guaranteeText}>Guaranteed</Text></Text>
                    <Text style={styles.milesText}>0.6 miles</Text>
                    <Text style={styles.deliveryText}>Deliver by 10:01 PM</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.middleContainer}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="briefcase" size={24} color="red" />
                        <View style={styles.textContainer}>
                            <Text style={styles.pickupText}>Restaurant pickup</Text>
                            <Text style={styles.restaurantText}>Chipotle</Text>
                        </View>
                    </View>
                    <View style={styles.dividerVertical} />
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="home" size={24} color="black" />
                        <Text style={styles.dropoffText}>Customer dropoff</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.acceptButton} onPress={goToCheckout}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                    <Text style={styles.countdownText}>{countdown}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { height } = Dimensions.get('window');
const containerHeight = height * 3 / 8;

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1, // Take up all available vertical space
    },
    map: {
        height: height / 2,
        borderRadius: 10,
        marginTop: 10
      },
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: containerHeight,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden', // Clip content that overflows the rounded corners
        paddingLeft: 20, // Add padding for the left margin
        paddingTop: 20 // Add padding for the top margin
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 10 // Add margin at the bottom for spacing
    },
    divider: {
        height: 1,
        backgroundColor: '#DADADA',
        marginBottom: 20 // Add margin at the bottom for spacing
    },
    priceText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 5 // Add margin at the bottom for spacing
    },
    guaranteeText: {
        color: '#888888',
        fontSize: 16,
        marginBottom: 5 // Add margin at the bottom for spacing
    },
    milesText: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5 // Add margin at the bottom for spacing
    },
    deliveryText: {
        color: '#888888',
        fontSize: 18,
        marginBottom: 5 // Add margin at the bottom for spacing
    },
    middleContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20 // Add margin at the bottom for spacing
    },
    iconContainer: {
        flexDirection: 'row', // Change to row to arrange icon and text horizontally
        alignItems: 'center',
        marginRight: 20 // Add margin between the icons
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    pickupText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5 // Add margin between the icon and text
    },
    restaurantText: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 5 // Add margin between the text and restaurant name
    },
    dropoffText: {
        color: 'black',
        fontSize: 12,
        marginLeft: 5 // Add margin between the icon and text
    },
    dividerVertical: {
        height: 24,
        width: 1,
        backgroundColor: '#DADADA',
        marginHorizontal: 10 // Add margin between the icons
    },
    acceptButton: {
        marginHorizontal: 20,
        width: '90%',
        height: 50,
        borderRadius: 200,
        backgroundColor: 'red',
        justifyContent: 'flex-end', // Move the countdown text to the right
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 8,
        paddingHorizontal: 20,
    },
    
    acceptButtonText: {
        flex: 1, // Take up remaining space
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', // Center the text
    },
    
    countdownText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    markerIcon: {
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
    },
    declineButton: {
        position: 'absolute',
        top: 50, // Adjust the top position as needed
        right: 20, // Adjust the right position as needed
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Ensure it appears above the map
        elevation: 5, // Android elevation
    },
    declineButtonText: {
        color: 'black',
        fontSize: 14,
    },
});
