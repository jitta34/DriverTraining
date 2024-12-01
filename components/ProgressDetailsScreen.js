import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const ProgressDetailsScreen = ({navigation, route}) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const {reportId} = route.params;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportDoc = await firestore()
          .collection('progress_reports')
          .doc(reportId)
          .get();

        if (reportDoc.exists) {
          setReport({id: reportDoc.id, ...reportDoc.data()});
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report:', error);
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleEdit = () => {
    navigation.navigate('EditProgressReport', {reportId, report});
  };

  const handleDelete = async () => {
    try {
      await firestore().collection('progress_reports').doc(reportId).delete();
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    );
  }

  if (!report) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Report not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Progress Details</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleEdit}>
              <Icon name="edit" size={24} color="darkblue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleDelete}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Driver Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{report.driver_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{report.driver_email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date of Lesson:</Text>
              <Text style={styles.value}>
                {report.date_of_lesson.toDate().toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>
                {report.notes || 'No notes available'}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Report Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Created:</Text>
              <Text style={styles.value}>
                {report.created_at?.toDate().toLocaleString() || 'N/A'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: isFoldable ? height * 0.027 : height * 0.025,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    width: '35%',
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  notesContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 24,
  },
});

export default ProgressDetailsScreen;
