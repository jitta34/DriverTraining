import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const VideoTutorialScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
          <View>
          <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Video Tutorials</Text>
        </View>
      <Text style= {styles.coming}>Coming Soon</Text>
    </View>
    </SafeAreaView>

  
  )
}

export default VideoTutorialScreen

const styles = StyleSheet.create({
    coming: {
        fontSize: 25,
        fontWeight:'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 350
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    header: {
      fontSize: isFoldable ? height * 0.027 : height * 0.025,
      fontWeight: 'bold',
      marginLeft: width * 0.25,
      color: 'black',
    },
    createButton: {
      flexDirection: 'row',
      backgroundColor: 'darkblue',
      padding: 12,
      marginHorizontal: 16,
      marginVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
    createButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      padding: 10,
      marginTop: 10,
      alignItems: 'center',
    },
    headerCellSNo: {
      width: '10%',
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    },
    headerCellName: {
      width: '25%',
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
      paddingLeft: 10,
    },
    headerCellEmail: {
      width: '35%',
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'left',
      paddingLeft: 10,
    },
    headerCellDate: {
      width: '20%',
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    },
    headerCellAction: {
      width: '10%',
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      padding: 10,
      alignItems: 'center',
    },
    cellSNo: {
      width: '10%',
      color: 'black',
      textAlign: 'center',
    },
    cellName: {
      width: '25%',
      color: 'black',
      textAlign: 'left',
      paddingLeft: 10,
    },
    cellEmail: {
      width: '35%',
      color: 'black',
      textAlign: 'left',
      paddingLeft: 10,
    },
    cellDate: {
      width: '20%',
      color: 'black',
      textAlign: 'center',
    },
    cellAction: {
      width: '10%',
      alignItems: 'center',
    },
    listContainer: {
      paddingBottom: 20,
    },
  });
