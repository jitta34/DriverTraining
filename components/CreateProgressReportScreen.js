import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {constants} from '../src/utils/constants';

const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const ScoreSelector = ({label, value, onChange}) => (
  <View style={styles.scoreRow}>
    <Text style={styles.scoreLabel}>{label}</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.picker}
        mode="dropdown">
        {Object.entries(constants.SCORE_LABELS).map(([score, label]) => (
          <Picker.Item
            key={score}
            label={`${score} - ${label}`}
            value={parseInt(score)}
          />
        ))}
      </Picker>
    </View>
  </View>
);

const CreateProgressReportScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    driver_name: '',
    driver_email: '',
    date_of_lesson: new Date(),
    cockpit_checks: 0,
    controls: 0,
    moving_off: 0,
    stopping: 0,
    changing_gear: 0,
    safe_positioning: 0,
    mirrors_vision_and_use: 0,
    steering: 0,
    signals: 0,
    anticipation_and_planning: 0,
    use_of_speed: 0,
    other_traffic: {
      meeting_traffic: 0,
      crossing_traffic: 0,
      overtaking: 0,
    },
    junctions: {
      turn_left: 0,
      turn_right: 0,
      emerging_left: 0,
      emerge_right: 0,
      cross_roads: 0,
    },
    roundabouts_left: 0,
    roundabouts_right: 0,
    roundabouts_ahaed: 0,
    pedestrian_crossings: 0,
    dual_carriageways: 0,
    turning_the_vehicle_around: 0,
    reversing: {
      right_side_reverse: 0,
      forward_bay_park: 0,
      reverse_bay_park: 0,
    },
    parking: {
      parallel_parking: 0,
    },
    emergency_stop: 0,
    darkness: 0,
    weather_conditions: 0,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateFormData = (field, value, subField = null) => {
    if (subField) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.driver_name || !formData.driver_email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await firestore()
        .collection('progress_reports')
        .add({
          ...formData,
          created_at: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Progress report created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create progress report');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.header}>Create Progress Report</Text>
        </View>

        <ScrollView style={styles.formContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <TextInput
              style={styles.input}
              value={formData.driver_name}
              onChangeText={text => updateFormData('driver_name', text)}
              placeholder="Driver Name"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              value={formData.driver_email}
              onChangeText={text => updateFormData('driver_email', text)}
              placeholder="Driver Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dateButtonText}>
                {formData.date_of_lesson.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Controls</Text>
            <ScoreSelector
              label="Cockpit Checks"
              value={formData.cockpit_checks}
              onChange={value => updateFormData('cockpit_checks', value)}
              />
              <ScoreSelector
                label="Controls"
                value={formData.controls}
                onChange={value => updateFormData('controls', value)}
              />
            <ScoreSelector
              label="Moving Off "
              value={formData.moving_off}
              onChange={value => updateFormData('moving_off', value)}
            />
            <ScoreSelector
              label="Stopping"
              value={formData.stopping}
              onChange={value =>
                updateFormData('stopping', value)
              }
            />
            <ScoreSelector
              label="Changing Gear"
              value={formData.changing_gear}
              onChange={value =>
                updateFormData('changing_gear', value)
              }
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Driving Skills</Text>
            <ScoreSelector
              label="Safe Positioning"
              value={formData.safe_positioning}
              onChange={value => updateFormData('safe_positioning', value)}
            />
            
            <ScoreSelector
              label="Mirrors Vision & Use"
              value={formData.mirrors_vision_and_use}
              onChange={value =>
                updateFormData('mirrors_vision_and_use', value)
              }
            /><ScoreSelector
            label="Steering"
            value={formData.steering}
            onChange={value =>
              updateFormData('steering', value)
            }
          />
            <ScoreSelector
              label="Signals"
              value={formData.signals}
              onChange={value => updateFormData('signals', value)}
            />
            <ScoreSelector
              label="Anticipation & Planning"
              value={formData.anticipation_and_planning}
              onChange={value =>
                updateFormData('anticipation_and_planning', value)
              }
            />
            <ScoreSelector
              label="Use of Speed"
              value={formData.use_of_speed}
              onChange={value => updateFormData('use_of_speed', value)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Traffic Management</Text>
            <Text style={styles.subsectionTitle}>Other Traffic</Text>
            <ScoreSelector
              label="Meeting Traffic"
              value={formData.other_traffic.meeting_traffic}
              onChange={value =>
                updateFormData('other_traffic', value, 'meeting_traffic')
              }
            />
            <ScoreSelector
              label="Crossing Traffic"
              value={formData.other_traffic.crossing_traffic}
              onChange={value =>
                updateFormData('other_traffic', value, 'crossing_traffic')
              }
            />
            <ScoreSelector
              label="Overtaking"
              value={formData.other_traffic.overtaking}
              onChange={value =>
                updateFormData('other_traffic', value, 'overtaking')
              }
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Junctions</Text>
            <ScoreSelector
              label="Turn Left"
              value={formData.junctions.turn_left}
              onChange={value =>
                updateFormData('junctions', value, 'turn_left')
              }
            />
            <ScoreSelector
              label="Turn Right"
              value={formData.junctions.turn_right}
              onChange={value =>
                updateFormData('junctions', value, 'turn_right')
              }
            />
              <ScoreSelector
              label="Emerging Left"
              value={formData.junctions.emerging_left}
              onChange={value =>
                updateFormData('junctions', value, 'emerging_left')
              }
            />
            <ScoreSelector
              label="Emerge Right"
              value={formData.junctions.emerge_right}
              onChange={value => updateFormData('junctions', value, 'emerge_right')}
            />
              <ScoreSelector
              label="Cross Roads"
              value={formData.junctions.cross_roads}
              onChange={value => updateFormData('junctions', value, 'cross_roads')}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Road Features</Text>
            <ScoreSelector
              label="Roundabouts Left"
              value={formData.roundabouts_left}
              onChange={value => updateFormData('roundabouts_left', value)}
            />
             <ScoreSelector
              label="Roundabouts Right"
              value={formData.roundabouts_right}
              onChange={value => updateFormData('roundabouts_right', value)}
            />
             <ScoreSelector
              label="Roundabouts Ahead"
              value={formData.roundabouts_ahead}
              onChange={value => updateFormData('roundabouts_ahead', value)}
            />
            
            <ScoreSelector
              label="Pedestrian Crossings"
              value={formData.pedestrian_crossings}
              onChange={value => updateFormData('pedestrian_crossings', value)}
            />
            <ScoreSelector
              label="Dual Carriageways"
              value={formData.dual_carriageways}
              onChange={value => updateFormData('dual_carriageways', value)}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manoeuvers</Text>
            <ScoreSelector
              label="Turning Vehicle Around"
              value={formData.turning_the_vehicle_around}
              onChange={value =>
                updateFormData('turning_the_vehicle_around', value)
              }
            />

            <Text style={styles.subsectionTitle}>Reversing</Text>
            <ScoreSelector
              label="Right Side Reverse"
              value={formData.reversing.right_side_reverse}
              onChange={value =>
                updateFormData('reversing', value, 'right_side_reverse')
              }
            />
            <ScoreSelector
              label="Forward Bay Park"
              value={formData.reversing.forward_bay_park}
              onChange={value =>
                updateFormData('reversing', value, 'forward_bay_park')
              }
            />
            <ScoreSelector
              label="Reverse Bay Park"
              value={formData.reversing.reverse_bay_park}
              onChange={value =>
                updateFormData('reversing', value, 'reverse_bay_park')
              }
            />

            <Text style={styles.subsectionTitle}>Parking</Text>
            <ScoreSelector
              label="Parallel Parking"
              value={formData.parking.parallel_parking}
              onChange={value =>
                updateFormData('parking', value, 'parallel_parking')
              }
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Skills</Text>
            <ScoreSelector
              label="Emergency Stop"
              value={formData.emergency_stop}
              onChange={value => updateFormData('emergency_stop', value)}
            />
            <ScoreSelector
              label="Darkness"
              value={formData.darkness}
              onChange={value => updateFormData('darkness', value)}
            />
            <ScoreSelector
              label="Weather Conditions"
              value={formData.weather_conditions}
              onChange={value => updateFormData('weather_conditions', value)}
            />
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>

        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Report</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={formData.date_of_lesson}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                updateFormData('date_of_lesson', selectedDate);
              }
            }}
          />
        )}
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
    marginLeft: width * 0.15,
    color: 'black',
  },
  formContainer: {
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: 'black',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: 'black',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  scoreLabel: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingLeft: 4,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 8,
  },
  picker: {
    height: 48,
    width: '100%',
  },
  bottomPadding: {
    height: 80,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  submitButton: {
    backgroundColor: 'darkblue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'darkblue',
    marginTop: 20,
    marginBottom: 16,
  },
});

export default CreateProgressReportScreen;
