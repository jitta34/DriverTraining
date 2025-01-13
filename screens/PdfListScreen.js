import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const pdfList = [
  {
    name: 'Know your traffic signs',
    pdfUrl:
      'https://drive.google.com/uc?export=download&id=1kwPs34I7MCseL13u_RaKvnpZ6QdjsBKF',
    thumbnail: require('../assets/traffic.jpeg'),
  },
  {
    name: 'Highway Code',
    pdfUrl:
      'https://drive.google.com/uc?export=download&id=1hRjiR_APlb2OjGPARAi_OA8tkgwoTSPn',
    thumbnail: require('../assets/highway_code.jpeg'),
  },
];

const PdfListScreen = ({navigation}) => {
  const handlePdfPress = (pdfUrl, name) => {
    navigation.navigate('HighwayCodeScreen', {pdfUrl, name});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Learning Materials</Text>
      </View>

      <View style={styles.cardsContainer}>
        {pdfList.map((pdf, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handlePdfPress(pdf.pdfUrl, pdf.name)}>
            <Image source={pdf.thumbnail} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{pdf.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: width * 0.2,
    color: 'black',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
    marginTop: 10,
  },
  card: {
    width: width * 0.42,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: isFoldable ? height * 0.018 : height * 0.016,
    fontWeight: '500',
    textAlign: 'center',
    color: '#434343',
  },
});

export default PdfListScreen;