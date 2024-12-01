import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const SCORE_LABELS = {
  1: 'Introduced',
  2: 'Under Full Instruction',
  3: 'Prompted',
  4: 'Seldom Prompted',
  5: 'Independent',
};

const ScoreDisplay = ({label, value}) => (
  <View style={styles.scoreRow}>
    <Text style={styles.scoreLabel}>{label}</Text>
    <View style={[styles.scoreValue, {backgroundColor: getScoreColor(value)}]}>
      <Text style={styles.scoreText}>
        {value} - {SCORE_LABELS[value]}
      </Text>
    </View>
  </View>
);

const getScoreColor = score => {
  switch (score) {
    case 1:
      return '#FFE0E0'; // Light red
    case 2:
      return '#FFE8D4'; // Light orange
    case 3:
      return '#FFF4D4'; // Light yellow
    case 4:
      return '#E0F4E0'; // Light green
    case 5:
      return '#D4F4D4'; // Darker green
    default:
      return '#F0F0F0';
  }
};

const ProgressDetailsScreen = ({navigation, route}) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const {reportId} = route.params;
  const [previousReports, setPreviousReports] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(reportId);

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

  useEffect(() => {
    const fetchPreviousReports = async () => {
      if (!report) {
        return;
      }

      try {
        const reportsSnapshot = await firestore()
          .collection('progress_reports')
          .where('driver_email', '==', report.driver_email)
          .get();

        const reports = reportsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPreviousReports(reports);
      } catch (error) {
        console.error('Error fetching previous reports:', error);
      }
    };

    fetchPreviousReports();
  }, [report, report?.driver_email]);

  const handleDelete = async () => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this report?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore()
                .collection('progress_reports')
                .doc(reportId)
                .delete();
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting report:', error);
              Alert.alert('Error', 'Failed to delete report');
            }
          },
        },
      ],
    );
  };

  const handleReportChange = async reportId => {
    if (reportId === selectedReportId) {
      return;
    }

    try {
      const reportDoc = await firestore()
        .collection('progress_reports')
        .doc(reportId)
        .get();

      if (reportDoc.exists) {
        setReport({id: reportDoc.id, ...reportDoc.data()});
        setSelectedReportId(reportId);
      }
    } catch (error) {
      console.error('Error changing report:', error);
      Alert.alert('Error', 'Failed to load selected report');
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
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('EditProgressReport', {
                  reportId,
                  report: {
                    ...report,
                    date_of_lesson: report.date_of_lesson.toDate(),
                  },
                })
              }>
              <Icon name="edit" size={24} color="darkblue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDelete}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Previous Reports</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedReportId}
              onValueChange={handleReportChange}
              style={styles.reportPicker}
              mode="dropdown">
              {previousReports.map(report => (
                <Picker.Item
                  key={report.id}
                  label={`${report.date_of_lesson
                    .toDate()
                    .toLocaleDateString()} - ${report.driver_name}`}
                  value={report.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <ScrollView style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Driver Name:</Text>
              <Text style={styles.value}>{report.driver_name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Driver Email:</Text>
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
            <Text style={styles.sectionTitle}>Basic Controls</Text>
            <ScoreDisplay
              label="Cockpit Checks"
              value={report.cockpit_checks}
            />
            <ScoreDisplay label="Safety Checks" value={report.safety_checks} />
            <ScoreDisplay
              label="Controls & Instruments"
              value={report.controls_and_instruments}
            />
            <ScoreDisplay
              label="Moving Away & Stopping"
              value={report.moving_away_and_stopping}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Driving Skills</Text>
            <ScoreDisplay
              label="Safe Positioning"
              value={report.safe_positioning}
            />
            <ScoreDisplay
              label="Mirrors Vision & Use"
              value={report.mirrors_vision_and_use}
            />
            <ScoreDisplay label="Signals" value={report.signals} />
            <ScoreDisplay
              label="Anticipation & Planning"
              value={report.anticipation_and_planning}
            />
            <ScoreDisplay label="Use of Speed" value={report.use_of_speed} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Traffic Management</Text>
            <Text style={styles.subsectionTitle}>Other Traffic</Text>
            <ScoreDisplay
              label="Meeting Traffic"
              value={report.other_traffic.meeting_traffic}
            />
            <ScoreDisplay
              label="Crossing Traffic"
              value={report.other_traffic.crossing_traffic}
            />
            <ScoreDisplay
              label="Overtaking"
              value={report.other_traffic.overtaking}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Junctions</Text>
            <ScoreDisplay
              label="Turn Left"
              value={report.junctions.turn_left}
            />
            <ScoreDisplay
              label="Turn Right"
              value={report.junctions.turn_right}
            />
            <ScoreDisplay label="Emerge" value={report.junctions.emerge} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Road Features</Text>
            <ScoreDisplay label="Roundabouts" value={report.roundabouts} />
            <ScoreDisplay
              label="Pedestrian Crossings"
              value={report.pedestrian_crossings}
            />
            <ScoreDisplay
              label="Dual Carriageways"
              value={report.dual_carriageways}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Maneuvers</Text>
            <ScoreDisplay
              label="Turning Vehicle Around"
              value={report.turning_the_vehicle_around}
            />

            <Text style={styles.subsectionTitle}>Reversing</Text>
            <ScoreDisplay
              label="Right Side Reverse"
              value={report.reversing.right_side_reverse}
            />
            <ScoreDisplay
              label="Forward Bay Park"
              value={report.reversing.forward_bay_park}
            />
            <ScoreDisplay
              label="Reverse Bay Park"
              value={report.reversing.reverse_bay_park}
            />

            <Text style={styles.subsectionTitle}>Parking</Text>
            <ScoreDisplay
              label="Parallel Parking"
              value={report.parking.parallel_parking}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Skills</Text>
            <ScoreDisplay
              label="Emergency Stop"
              value={report.emergency_stop}
            />
            <ScoreDisplay label="Darkness" value={report.darkness} />
            <ScoreDisplay
              label="Weather Conditions"
              value={report.weather_conditions}
            />
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
    alignItems: 'center',
  },
  actionButton: {
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'darkblue',
    marginTop: 12,
    marginBottom: 8,
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
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    width: '50%',
    fontSize: 16,
    color: 'black',
  },
  scoreValue: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 14,
    color: 'black',
  },
  dropdownContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: 'darkblue',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginLeft: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  reportPicker: {
    height: 48,
    width: '100%',
  },
});

export default ProgressDetailsScreen;
