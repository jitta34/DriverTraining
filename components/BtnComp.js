import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';



const BtnComp = ({
    text= 'DONE',
    onPress = () =>{},
    disabled= false
}) => {
    return (
       <TouchableOpacity
       onPress={onPress}
       style={{
        ...styles.container,
        backgroundColor: !disabled?'orange': 'gray',    
    }}
       disabled={disabled}
       >
        <Text  style={styles.textStyle}> {text}</Text>
       </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        container:{
            height:42,
            backgroundColor:'orange',
            borderRadius:8,
            alignItems:'center',
            justifyContent:'center'

        },
        textStyle: {
            fontWeight:'bold',
            fontSize: 16,
            color:'white'
        }
    }
)

export default BtnComp;
