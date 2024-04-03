import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Task = (props) => {
    const styles = getStyles(props.isFirst); // Call the function with props.isFirst

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}> {props.text} </Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const getStyles = (isFirst) => StyleSheet.create({
    item: {
        backgroundColor: isFirst ? '#EB1700' : '#E7E7E7',
        padding: 15,
        borderRadius: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, 
        width: "115%",
        alignSelf: 'center',
    }, 
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 16,
        color: isFirst ? '#FFFFFF' : '#000000',
        fontWeight: 'bold',
    }, 
    circular: {}, 
});

export default Task;