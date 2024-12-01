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

const ProgressReportScreen = ({navigation}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('progress_reports')
      .orderBy('date_of_lesson', 'desc')
      .onSnapshot(querySnapshot => {
        const reportsList = [];
        querySnapshot.forEach(documentSnapshot => {
          reportsList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        console.log(reportsList);
        setReports(reportsList);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const renderItem = ({item, index}) => (
    <View style={styles.tableRow}>
      <Text style={styles.cellSNo}>{index + 1}</Text>
      <Text style={styles.cellName} numberOfLines={1} ellipsizeMode="tail">
        {item.driver_name}
      </Text>
      <Text style={styles.cellEmail} numberOfLines={1} ellipsizeMode="tail">
        {item.driver_email}
      </Text>
      <Text style={styles.cellDate}>
        {item.date_of_lesson.toDate().toLocaleDateString()}
      </Text>
      <TouchableOpacity
        style={styles.cellAction}
        onPress={() =>
          navigation.navigate('ProgressDetails', {reportId: item.id})
        }>
        <Icon name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Progress Reports</Text>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateProgressReport')}>
          <Icon name="add" size={24} color="white" />
          <Text style={styles.createButtonText}>Create New Report</Text>
        </TouchableOpacity>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCellSNo}>S.No</Text>
          <Text style={styles.headerCellName}>Name</Text>
          <Text style={styles.headerCellEmail}>Email</Text>
          <Text style={styles.headerCellDate}>Date</Text>
          <Text style={styles.headerCellAction}>View</Text>
        </View>

        <FlatList
          data={reports}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
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

export default ProgressReportScreen;
