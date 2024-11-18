import React, { useState, useEffect, PermissionsAndroid } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image, BackHandler, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';


// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const FormListScreen3 = ({ navigation }) => {
  const [forms, setForms] = useState([]);

  const route = useRoute();
 
  const [selectedForm, setSelectedForm] = useState(null);

  


  
  const [modalVisible, setModalVisible] = useState(false);
const [selectedValue, setSelectedValue] = useState('Form List 2');

const formListOptions = ['Form List 1', 'Form List 2', 'Form List 3'];

  const convertCamelCaseToReadable = (str) => {
    // Insert a space before all caps
    str = str.replace(/([A-Z])/g, ' $1');
    
    // Uppercase the first character
    return str.replace(/^./, str[0].toUpperCase());
  };


  const createPDF = async (formData) => {
    let options = {
      html: `
        <html>
          <head>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                background-color: #ebfff6; /* very light green background */
                color: #424242; /* dark grey text */
                font-size: 28px; /* larger font size */
                text-align: left; /* left alignment */
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: flex-start;
                align-self: center,
              }
              h1 { 
                color: #000000; /* dark black */
                margin-bottom: 50px; /* space below the title */
                text-align: center; /* center alignment for the title */
              }
              p { 
                color: #424242; /* dark grey */
                margin: 20px 0; /* vertical spacing between paragraphs */
              }
              .label { 
                font-weight: bold; 
                color: #000000; /* dark black */
              }
            </style>
          </head>
          <body>
            <h1>Driving Test Form-3 Submission</h1>
            ${formData.map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return `<p class="label">${convertCamelCaseToReadable(key)}:</p><p>${Object.entries(value).map(([subKey, subValue]) => `${convertCamelCaseToReadable(subKey)}: ${subValue}`).join(', ')}</p>`;
              } else {
                return `<p><strong class="label">${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`;
              }
            }).join('')}
          </body>
        </html>`,
      fileName: 'Driving Test Form-3 Submission',
      directory: 'Documents',
    };
  
    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
  
      await FileViewer.open(file.filePath);
      console.log('PDF opened successfully');
    } catch (error) {
      console.error('Error occurred while creating or opening the PDF: ', error);
    }
  };
  


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('driveForm3')
      .onSnapshot(querySnapshot => {
        const forms = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, name: data.name, formData: data.formData, fieldOrder: data.fieldOrder };
        });
        setForms(forms);
      });
  
    return () => unsubscribe();
  }, [route.params?.forceRefresh]); // Add this line
  
  


  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home'); // Navigate to 'Home' screen if back button is pressed
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);




  const handleFormDelete = async (id) => {
    try {
      await firestore().collection('driveForm3').doc(id).delete();
      console.log('Form deleted successfully');
    } catch (error) {
      console.error('Error deleting form: ', error);
    }
  };

  const handleFormDownload = (item) => {
    const { formData, fieldOrder } = item;
    const formDataArray = fieldOrder.map(key => [key, formData[key]]);
    createPDF(formDataArray);
  };
  
  

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "This app needs access to your storage to download PDFs.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can save files");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
   

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Driving Test Form Submissions</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.selectionBtn} onPress={() => navigation.navigate('FormList2')}>
          <Text style={styles.selectionText}>Form-1 List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectionBtn} onPress={() => navigation.navigate('FormList')}>
          <Text style={styles.selectionText}>Form-2 List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectionBtn} onPress={() => navigation.navigate('FormList3')}>
          <Text style={styles.selectionText}>Form-3 List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell1}>S. No.</Text>
        <Text style={styles.headerCell2}>Client Name</Text>
        <Text style={styles.headerCell3}>Download</Text>
        <Text style={styles.headerCell4}>Delete</Text>
      </View>
      <FlatList
        data={forms}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.cell1}>{index + 1}</Text>
            <Text style={styles.cell2}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleFormDownload(item)}>
              <Image source={require('../assets/downloadicon.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleFormDelete(item.id)}>
              <Image source={require('../assets/delete1.png')} style={styles.icon1} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // 16/400
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: isFoldable ? height * 0.032 :height * 0.025, // 22/400
    fontWeight: 'bold',
    marginBottom: height * 0.018, // 16/900
    textAlign: 'center',
    color: '#000080',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: height * 0.009, // 8/900
    paddingBottom: height * 0.009, // 8/900
    borderBottomWidth: height * 0.001, // 1/900
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
  headerCell1: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    fontSize: isFoldable ? height * 0.020 :height * 0.017,
  },
  headerCell2: {
    flex: 3,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    fontSize: isFoldable ? height * 0.020 :height * 0.017,
  },
  headerCell3: {
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    fontSize: isFoldable ? height * 0.020 :height * 0.017,
  },
  headerCell4: {
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    marginRight:4,
    fontSize: isFoldable ? height * 0.020 :height * 0.017,
  },
  row: {
    flexDirection: 'row',
    marginBottom: height * 0.018, // 16/900
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: height * 0.0055, // 5/900
    padding: height * 0.011, // 10/900
    borderBottomWidth: height * 0.001, // 1/900
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color:'black'
  },
  cell1: {
    flex: 1,
    textAlign: 'center',
    color:'black'
  },
  cell2: {
    flex: 3,
    textAlign: 'center',
    color:'black'
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width:isFoldable? width * 0.04:width * 0.06, // 24/400
    height: isFoldable? height * 0.0206: height * 0.0266, // 24/900
  },
  icon1: {
    width:isFoldable? width * 0.04:width * 0.06, // 24/400
    height: isFoldable? height * 0.03206: height * 0.0266, // 24/900
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.0177, // 16/900
  },
  selectionBtn: {
    padding: height * 0.0077, // 7/900
    borderRadius: height * 0.0222,
    borderWidth: 0.7,
    borderColor: "darkBlue", // 20/900
    alignItems: 'center',
    marginTop: height * 0.0055, // 5/900
    width: width * 0.3, // 30% of window width
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: height * 0.0011, // 1/900
    },
    shadowOpacity: 1,
    shadowRadius: height * 0.002, // 1.84/900
    elevation: height * 0.0022, // 2/900
  },
  selectionText: {
    color: '#000000', // White text
    fontSize: isFoldable ? height * 0.020 :height * 0.017, // 14/400
    fontWeight: 'bold'
  },
});


export default FormListScreen3;