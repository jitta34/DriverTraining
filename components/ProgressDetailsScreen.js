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
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const SCORE_LABELS = {
  0: 'Not Covered',
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

const formatDateForFileName = date => {
  return date.toDate().toISOString().split('T')[0];
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

  const createPDF = async () => {
    const convertCamelCaseToReadable = str => {
      str = str.replace(/([A-Z])/g, ' $1');
      return str.replace(/^./, str[0].toUpperCase());
    };

    const formatScoreSection = (label, value) => {
      return `
        <div style="margin: 10px 0;">
          <strong>${label}:</strong> ${value} - ${SCORE_LABELS[value]}
        </div>
      `;
    };

    const formatNestedSection = (sectionName, data) => {
      return `
        <div style="margin: 15px 0;">
          <h3 style="color: #2c3e50; margin-bottom: 10px;">${sectionName}</h3>
          ${Object.entries(data)
            .map(([key, value]) =>
              formatScoreSection(convertCamelCaseToReadable(key), value),
            )
            .join('')}
        </div>
      `;
    };

    let options = {
      html: `
        <html>
          <head>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                color: #333;
                line-height: 1.6;
              }
              h1 { 
                color: #1a237e;
                text-align: center;
                margin-bottom: 30px;
              }
              h2 {
                color: #1a237e;
                margin-top: 20px;
              }
              .section {
                margin: 20px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
              }
              .basic-info {
                margin-bottom: 30px;
              }
              .score-item {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <h1>Progress Report</h1>
            
            <div class="section basic-info">
              <h2>Basic Information</h2>
              <p><strong>Driver Name:</strong> ${report.driver_name}</p>
              <p><strong>Driver Email:</strong> ${report.driver_email}</p>
              <p><strong>Date of Lesson:</strong> ${report.date_of_lesson
                .toDate()
                .toLocaleDateString()}</p>
            </div>

            <div class="section">
              <h2>Basic Controls</h2>
              ${formatScoreSection('Cockpit Checks', report.cockpit_checks)}
              ${formatScoreSection('Safety Checks', report.safety_checks)}
              ${formatScoreSection(
                'Controls & Instruments',
                report.controls_and_instruments,
              )}
              ${formatScoreSection(
                'Moving Away & Stopping',
                report.moving_away_and_stopping,
              )}
            </div>

            <div class="section">
              <h2>Driving Skills</h2>
              ${formatScoreSection('Safe Positioning', report.safe_positioning)}
              ${formatScoreSection(
                'Mirrors Vision & Use',
                report.mirrors_vision_and_use,
              )}
              ${formatScoreSection('Signals', report.signals)}
              ${formatScoreSection(
                'Anticipation & Planning',
                report.anticipation_and_planning,
              )}
              ${formatScoreSection('Use of Speed', report.use_of_speed)}
            </div>

            <div class="section">
              ${formatNestedSection('Traffic Management', report.other_traffic)}
            </div>

            <div class="section">
              ${formatNestedSection('Junctions', report.junctions)}
            </div>

            <div class="section">
              <h2>Road Features</h2>
              ${formatScoreSection('Roundabouts', report.roundabouts)}
              ${formatScoreSection(
                'Pedestrian Crossings',
                report.pedestrian_crossings,
              )}
              ${formatScoreSection(
                'Dual Carriageways',
                report.dual_carriageways,
              )}
            </div>

            <div class="section">
              <h2>Maneuvers</h2>
              ${formatScoreSection(
                'Turning Vehicle Around',
                report.turning_the_vehicle_around,
              )}
              ${formatNestedSection('Reversing', report.reversing)}
              ${formatNestedSection('Parking', report.parking)}
            </div>

            <div class="section">
              <h2>Additional Skills</h2>
              ${formatScoreSection('Emergency Stop', report.emergency_stop)}
              ${formatScoreSection('Darkness', report.darkness)}
              ${formatScoreSection(
                'Weather Conditions',
                report.weather_conditions,
              )}
            </div>
          </body>
        </html>`,
      fileName: `Progress_Report_${report.driver_name.replace(
        /[^a-zA-Z0-9]/g,
        '_',
      )}_${formatDateForFileName(report.date_of_lesson)}`,
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      return file.filePath;
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Error', 'Failed to create PDF');
      return null;
    }
  };

  const handleDownload = async () => {
    try {
      const filePath = await createPDF();
      if (filePath) {
        await FileViewer.open(filePath);
        Alert.alert('Success', 'PDF downloaded and opened successfully');
      }
    } catch (error) {
      console.error('Error handling download:', error);
      Alert.alert('Error', 'Failed to download or open PDF');
    }
  };

  const handleShare = async () => {
    try {
      const filePath = await createPDF();
      if (filePath) {
        await Share.open({
          url: `file://${filePath}`,
          type: 'application/pdf',
          title: 'Share Progress Report',
        });
      }
    } catch (error) {
      console.error('Error sharing PDF:', error);
      // Alert.alert('Error', 'Failed to share PDF');
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
              onPress={handleDownload}>
              <Icon name="file-download" size={24} color="darkblue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Icon name="share" size={24} color="darkblue" />
            </TouchableOpacity>
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
