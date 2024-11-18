import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const ProductItem = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.button}><Button title='Buy' color='darkblue' onPress={onPress}/></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 200,
        borderRadius: 10,
        elevation: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      
        marginHorizontal: 10
    },
    title: {
        color: '#000',
        fontSize: 19,
        flex: 2.5,
        marginRight: 10
    },
    button: {
        flex: 1
    }
});

export default ProductItem;

