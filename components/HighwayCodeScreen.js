import React, {useState, useRef, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const pdfURL =
  'https://drive.google.com/uc?export=download&id=1hRjiR_APlb2OjGPARAi_OA8tkgwoTSPn';

const HighwayCodeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef(null);
  const [pdfPath, setPdfPath] = useState(null);

  useLayoutEffect(() => {
    const downloadAndCachePDF = async () => {
      try {
        const cachedPath = await AsyncStorage.getItem('highwayCodePdfPath');
        if (cachedPath) {
          setPdfPath(cachedPath);
          return;
        }

        const response = await RNFetchBlob.config({
          fileCache: true,
          appendExt: 'pdf',
        }).fetch('GET', pdfURL);

        await AsyncStorage.setItem('highwayCodePdfPath', response.path());
        setPdfPath(response.path());
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };

    downloadAndCachePDF();
  }, []);

  const source = pdfPath
    ? {uri: `file://${pdfPath}`, cache: true}
    : {
        uri: pdfURL,
        cache: true,
      };

  const goToPage = pageNumber => {
    pdfRef.current?.setPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Highway Code</Text>
      </View>

      <View style={styles.pdfContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="darkblue" />
          </View>
        )}
        <Pdf
          trustAllCerts={false}
          ref={pdfRef}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            setLoading(false);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
            setLoading(false);
          }}
          onPressLink={uri => {
            if (uri.includes('#page=')) {
              const pageNumber = parseInt(uri.split('#page=')[1]);
              goToPage(pageNumber);
            }
          }}
          enablePaging={true}
          style={styles.pdf}
        />
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
    marginLeft: width * 0.25,
    color: 'black',
  },
  pdfContainer: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default HighwayCodeScreen;
