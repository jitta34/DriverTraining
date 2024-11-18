import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput,Image, PermissionsAndroid,Dimensions, useColorScheme } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    padding: 20,
    marginBottom:5
  },
  
  container: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    width:'40%',
    color:'black'
  },
  title1: {
    fontSize: 16,
    fontWeight: 'bold',
    width:'40%',
    color:'black',
    marginTop:15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: isFoldable ? height * 0.027: height * 0.025,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable ? '24%':'15%',
    color:'black'
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    width:'20%',
    color:'black', 
  },

  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    backgroundColor: 'lightblue',
  },
  whiteText: {
    color: '#fff',
  },
  bottomContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width:'30%'
  },
  bottomContainer1:{
    flexDirection:'row',
    marginBottom:25,
    margin:5
  },
  submitButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'700',
    color:'white'

  },
  text: {
    fontSize: 14,
    color: 'black',
    
  },
  input: {
    color:'black',
    borderBottomWidth:1,
    borderBottomColor:'black',

  },
  blackText:{
    color:'black'
  },
  checkbox:{
    flexDirection: 'row', alignItems: 'center'
  }
});

const darkStyles = StyleSheet.create({
  checkbox: {
    backgroundColor: 'lightblue',
    flexDirection: 'row', alignItems: 'center'
  },
});

const DrivingTestFormSection = ({ navigation, route }) => {
  const [formData, setFormData] = useState({});
  const [isSelected, setSelection] = useState(false);
  const [isControlSelected, setControlSelection] = useState(false);
  const [isObservationSelected, setObservationSelection] = useState(false);
  const [isEyesightTestSelected, setEyesightTestSelection] = useState(false);
  const [isReverseRightSelected, setReverseRightSelection] = useState(false);
  const [isReverseParkSelected, setReverseParkSelection] = useState(false);
  const [isCarParkSelected, setCarParkSelection] = useState(false);
  const [isForwardParkSelected, setForwardParkSelection] = useState(false);

  const [eyesightTest, setEyesightTest] = useState('not selected');

  const [ETA, setETA] = useState('not selected');
const [Physical, setPhysical] = useState('not selected');
const [Verbal, setVerbal] = useState('not selected');
const [ECO, setECO] = useState('not selected');
const [ControlStatus, setControlStatus] = useState('not selected');
const [Planning, setPlanning] = useState('not selected');
const scheme = useColorScheme();
const [Manoeuvres, setManoeuvres] = useState({
  ReverseOrRight: 'not selected',
  ReverseParkInRoad: 'not selected',
  ReverseParkRealtedToCarPark: 'not selected',
  ForwardPark: 'not selected',
});

const [Control, setControl] = useState('null');


const [Observation, setObservation] = useState('null');
const [ShowMeOrTellMe, setShowMeOrTellMe] = useState('null');
const [ControlStop, setControlStop] = useState('null');

const [Accelerator, setAccelerator] = useState('null');
const [Clutch, setClutch] = useState('null');
const [Gears, setGears] = useState('null');
const [Footbrake, setFootbrake] = useState('null');
const [ParkingBrake, setParkingBrake] = useState('null');
const [Steering, setSteering] = useState('null');

const [Safety, setSafety] = useState('null');
const [ControlRealtedToMoveOff, setControlRelatedToMoveOff] = useState('null');

const [Signalling, setSignalling] = useState('null');
const [ChangeDirection, setChangeDirection] = useState('null');
const [ChangeSpeed, setChangeSpeed] = useState('null');

const [Necessary, setNecessary] = useState('null');
const [Correctly, setCorrectly] = useState('null');
const [Timed, setTimed] = useState('null');


const [ApproachSpeed, setApproachSpeed] = useState('D');
const [ApproachSpeedForJunctions, setApproachSpeedForJunctions] = useState('null');
const [ObservationForJunctions, setObservationForJunctions] = useState('null');
const [TurningRightForJunctions, setTurningRightForJunctions] = useState('null');
const [TurningLeftForJunctions, setTurningLeftForJunctions] = useState('null');
const [CuttingCornersForJunctions, setCuttingCornersForJunctions] = useState('null');

const [TurningRight, setTurningRight] = useState('null');
const [TurningLeft, setTurningLeft] = useState('null');
const [CuttingCorners, setCuttingCorners] = useState('null');

const [Overtaking, setOvertaking] = useState('null');
const [Meeting, setMeeting] = useState('null');
const [Crossing, setCrossing] = useState('null');

const [NormalDriving, setNormalDriving] = useState('null');
const [LaneDiscipline, setLaneDiscipline] = useState('D');
const [PedestrianCrossings, setPedestrianCrossings] = useState('null');
const [PositionOrNormalStop, setPositionNormalStop] = useState('null');
const [AwarenessPlanning, setAwarenessPlanning] = useState('null');
const [Clearance, setClearance] = useState('D');
const [FollowingDistance, setFollowingDistance] = useState('null');
const [UseOfSpeed, setUseOfSpeed] = useState('D');

const [AppropriateSpeed, setAppropriateSpeed] = useState('null');

const [UndueHesitation, setUndueHesitation] = useState('null');


const [TrafficSigns, setTrafficSigns] = useState('null');
const [RoadMarkings, setRoadMarkings] = useState('null');
const [TrafficLights, setTrafficLights] = useState('null');
const [TrafficControllers, setTrafficControllers] = useState('null');
const [OtherRoadUsers, setOtherRoadUsers] = useState('null');

const [totalFaults, setTotalFaults] = useState('');
const [Result, setResult] = useState('null');

  const [candidateName, setCandidateName] = useState('');
const [date, setDate] = useState('');
const [time, setTime] = useState('');

  const [isShowTellSelected, setShowTellSelection] = useState(false);
  const [isControlledStopSelected, setControlledStopSelection] = useState(false);
  const [controlSelections, setControlSelections] = useState(
    ['Accelerator', 'Clutch', 'Gears', 'Footbrake', 'Parking brake', 'Steering'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [moveOffSelections, setMoveOffSelections] = useState(
    ['Safety', 'Control'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [mirrorUseSelections, setMirrorUseSelections] = useState(
    ['Signalling', 'Change direction', 'Change speed'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );

  const [signalSelections, setSignalSelections] = useState(
    ['Necessary', 'Correctly', 'Timed'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [junctionSelections, setJunctionSelections] = useState(
    ['Approach speed', 'Observation', 'Turning right', 'Turning left', 'Cutting corners'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [judgementSelections, setJudgementSelections] = useState(
    ['Overtaking', 'Meeting', 'Crossing'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [positioningSelections, setPositioningSelections] = useState(
    ['Normal driving', 'Lane discipline', 'Pedestrian crossings', 'Position/normal stop', 'Awareness planning', 'Clearance', 'Following distance', 'Use of speed'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [progressSelections, setProgressSelections] = useState(
    ['Appropriate speed', 'Undue hesitation'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [responseSelections, setResponseSelections] = useState(
    ['Traffic signs', 'Road markings', 'Traffic lights', 'Traffic controllers', 'Other road users'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );


  const handlePress = (value) => {
    setControl(Control === value ? null : value);
  };

 
  const [isPass, setIsPass] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [etaSelections, setEtaSelections] = useState(
    ['ETA', 'Physical', 'Verbal'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );
  const [ecoSelections, setEcoSelections] = useState(
    ['ECO', 'Control', 'Planning'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
  );



  const { name, email , formNumber } = route.params;
  const convertCamelCaseToReadable = (str) => {
    // Insert a space before all caps
    str = str.replace(/([A-Z])/g, ' $1');
    
    // Uppercase the first character
    return str.replace(/^./, str[0].toUpperCase());
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


  // const handleSubmit = async () => {
  //   console.log('DrivingTestForm: ', name); // Add this line
  //   const formData = {
  //     userName: name,
  //     userEmail: email,
  //     formNumber: formNumber,
  //     candidateName,
  //     date,
  //     time,
  //     eyesightTest,
  //     Manoeuvres,
     
  //     Control,
  //     Observation,
  //     ShowMeOrTellMe,
  //     ControlStop,

  //     Accelerator,
  //     Clutch,
  //     Gears,
  //     Footbrake,
  //     ParkingBrake,
  //     Steering,

  //     Safety,
  //     ControlRealtedToMoveOff,

  //     Signalling,
  //     ChangeDirection,
  //     ChangeSpeed,

  //     Necessary,
  //     Correctly,
  //     Timed,

  //     ApproachSpeed,
  //     Observation,
  //     TurningRight,
  //     TurningLeft,
  //     CuttingCorners,

  //     Overtaking,
  //     Meeting,
  //     Crossing,

  //     NormalDriving,
  //     LaneDiscipline,
  //     PedestrianCrossings,
  //     PositionOrNormalStop,
  //     AwarenessPlanning,
  //     Clearance,
  //     FollowingDistance,
  //     UseOfSpeed,

  //     AppropriateSpeed,
  //     UndueHesitation,

  //     TrafficSigns,
  //     RoadMarkings,
  //     TrafficLights,
  //     TrafficControllers,
  //     OtherRoadUsers,

  //     totalFaults,
  //     Result ,

  //     ETA,
  //     Physical,
  //     Verbal,
  //     ECO,
  //     ControlStatus,
  //     Planning
  //   };
  
  //   try {
  //     await firebase.firestore().collection('DrivingTestForm').add(formData);
  //     console.log('Form data successfully written!');
  //     navigation.navigate('FormList2', { forceRefresh: true }); // Navigate to FormList2Screen
  //   } catch (error) {
  //     console.error('Error writing document: ', error);
  //   }
  // };

  const handleSubmit = async () => {
    console.log('DrivingTestForm: ', name); // Add this line
    const formData = {
      'User Name': name,
      'User Email': email,
      'Form Number': formNumber,
      'Candidate Name': candidateName,
      'Date': date,
      'Time': time,
      'Eyesight Test': eyesightTest,
      'Manoeuvres': Manoeuvres,
      'Control': Control,
      'Observation': Observation,
      'Show Me Or Tell Me': ShowMeOrTellMe,
      'Control Stop': ControlStop,
      'Accelerator': Accelerator,
      'Clutch': Clutch,
      'Gears': Gears,
      'Footbrake': Footbrake,
      'Parking Brake': ParkingBrake,
      'Steering': Steering,
      'Safety': Safety,
      'Control Related To Move Off': ControlRealtedToMoveOff,
      'Signalling': Signalling,
      'Change Direction': ChangeDirection,
      'Change Speed': ChangeSpeed,
      'Necessary': Necessary,
      'Correctly': Correctly,
      'Timed': Timed,
      'Approach Speed': ApproachSpeedForJunctions,
      'Observation': ObservationForJunctions,
      'Turning Right': TurningRightForJunctions,
      'Turning Left': TurningLeftForJunctions,
      'Cutting Corners': CuttingCornersForJunctions,
      'Approach Speed For Judgement': ApproachSpeed,
      'Observation For Judgement': Observation,
      'Turning Right For Judgement': TurningRight,
      'Turning Left For Judgement': TurningLeft,
      'Cutting Corners For Judgement': CuttingCorners,
      'Overtaking': Overtaking,
      'Meeting': Meeting,
      'Crossing': Crossing,
      'Normal Driving': NormalDriving,
      'Lane Discipline': LaneDiscipline,
      'Pedestrian Crossings': PedestrianCrossings,
      'Position Or Normal Stop': PositionOrNormalStop,
      'Awareness Planning': AwarenessPlanning,
      'Clearance': Clearance,
      'Following Distance': FollowingDistance,
      'Use Of Speed': UseOfSpeed,
      'Appropriate Speed': AppropriateSpeed,
      'Undue Hesitation': UndueHesitation,
      'Traffic Signs': TrafficSigns,
      'Road Markings': RoadMarkings,
      'Traffic Lights': TrafficLights,
      'Traffic Controllers': TrafficControllers,
      'Other Road Users': OtherRoadUsers,
      'Total Faults': totalFaults,
      'Result': Result,
      'ETA': ETA,
      'Physical': Physical,
      'Verbal': Verbal,
      'ECO': ECO,
      'Control Status': ControlStatus,
      'Planning': Planning
    };
    
    const fieldOrder = Object.keys(formData); // This gets the order of the fields
  
    try {
      await firebase.firestore().collection('DrivingTestForm').add({ name, formData, fieldOrder });
      console.log('Form data successfully written!');
      navigation.navigate('FormList2', { forceRefresh: true }); // Navigate to FormList2Screen
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };
  
  
  
  const createPDF = async (formData) => {
    let options = {
      html: '<h1>Form Data</h1>' + Object.entries(formData).map(([key, value]) => `<p><strong>${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`).join(''),
      fileName: 'FormData',
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

  const renderMappedSection = (title, selections, setSelections) =>
  Object.keys(selections).map((item) =>
    renderSection(item, selections[item], (newVal) => setSelections({ ...selections, [item]: newVal }))
  );
  const renderSection = (title, value, setValue) => (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
      style={[styles.circle, value === 'S' && styles.selectedCircle]}
      onPress={() => setValue(value === 'S' ? null : 'S')}
    >
      <Text style={[value === 'S' ? styles.whiteText : styles.blackText]}>S</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.circle, value === 'D' && styles.selectedCircle]}
      onPress={() => setValue(value === 'D' ? null : 'D')}
    >
      <Text style={[value === 'D' ? styles.whiteText : styles.blackText]}>D</Text>
    </TouchableOpacity>
    </View>
  );
  
  return (
    <ScrollView style={styles.Maincontainer}>
       <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.header}>Driving Test Form-1</Text>
      </View>
      <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderWidth:1 }}>
  <View>
 
    <View style={{ flexDirection: 'row', marginLeft:5}}>
    <Text style={{ height: 40, color:'black', marginTop: 10 }}>Name</Text>
    <TextInput 
    style={{ height: 40, borderColor: 'gray', marginLeft:5 , color:'black'}} 
    onChangeText={text => setCandidateName(text)}
    value={candidateName}
    placeholder='Enter Name'
    placeholderTextColor='gray'
  />
    </View>
    <View style={{ flexDirection: 'row',marginLeft:5 }}>
    <Text style={{ height: 40, color:'black', marginTop: 10 }}>Date</Text>
    <TextInput 
    style={{ height: 40, borderColor: 'gray', marginLeft:5 ,  color:'black'}} 
    onChangeText={text => setDate(text)}
    value={date}
    placeholder='Enter Date'
    placeholderTextColor='gray'
  />
    </View>
    <View style={{ flexDirection: 'row',marginLeft:5 }}>
    <Text style={{ height: 40, color:'black', marginTop: 10 }}>Time</Text>
    <TextInput 
    style={{ height: 40, borderColor: 'gray', marginLeft:5,  color:'black' }} 
    onChangeText={text => setTime(text)}
    value={time}
    placeholder='Enter Time'
    placeholderTextColor='gray'
  />
    </View>
     
   
  </View>
 
</View>
<View style={styles.container}>
  <Text style={styles.title}>Eyesight Test</Text>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={eyesightTest === 'selected'}
    onValueChange={(newValue) => setEyesightTest(newValue ? 'selected' : 'not selected')}
  />
  </View>
</View>

{/* 
        <Text style={styles.title}>Manoeuvres</Text>

        <View style={styles.container}>
          <Text style={styles.text}>Reverse / Right</Text>
          <CheckBox
            value={isReverseRightSelected}
            onValueChange={setReverseRightSelection}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Reverse park (road)</Text>
          <CheckBox
            value={isReverseParkSelected}
            onValueChange={setReverseParkSelection}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Reverse park (car park)</Text>
          <CheckBox
            value={isCarParkSelected}
            onValueChange={setCarParkSelection}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Forward park</Text>
          <CheckBox
            value={isForwardParkSelected}
            onValueChange={setForwardParkSelection}
          />
        </View> */}

<Text style={styles.title}>Manoeuvres</Text>

<View style={styles.container}>
  <Text style={styles.text}>Reverse / Right</Text>

  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={Manoeuvres.ReverseOrRight === 'selected'}
    onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ReverseOrRight: newValue ? 'selected' : 'not selected'})}
  />
  </View>
</View>
<View style={styles.container}>
  <Text style={styles.text}>Reverse park (road)</Text>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={Manoeuvres.ReverseParkInRoad === 'selected'}
    onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ReverseParkInRoad: newValue ? 'selected' : 'not selected'})}
  />
  </View>
</View>
<View style={styles.container}>
  <Text style={styles.text}>Reverse park (car park)</Text>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={Manoeuvres.ReverseParkRealtedToCarPark === 'selected'}
    onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ReverseParkRealtedToCarPark: newValue ? 'selected' : 'not selected'})}
  />
  </View>
</View>
<View style={styles.container}>
  <Text style={styles.text}>Forward park</Text>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={Manoeuvres.ForwardPark === 'selected'}
    onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ForwardPark: newValue ? 'selected' : 'not selected'})}
  />
  </View>
</View>

       
<View style={styles.container}>
  <Text style={styles.title}>Control</Text>
  <TouchableOpacity
        style={[styles.circle, Control === 'S' && styles.selectedCircle]}
        onPress={() => handlePress('S')}
      >
        <Text style={[Control === 'S' ? styles.whiteText : styles.blackText]}>S</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.circle, Control === 'D' && styles.selectedCircle]}
        onPress={() => handlePress('D')}
      >
        <Text style={[Control === 'D' ? styles.whiteText : styles.blackText]}>D</Text>
      </TouchableOpacity>
</View>
{renderSection('Observation', Observation, setObservation)}
{renderSection('Show me / Tell me', ShowMeOrTellMe, setShowMeOrTellMe)}
{renderSection('Controlled stop', ControlStop, setControlStop)}
      <Text style={styles.title}>Control</Text>
      {/* {renderMappedSection('Control', controlSelections, setControlSelections)} */}
      {renderSection('Accelerator', Accelerator, setAccelerator)}
{renderSection('Clutch', Clutch, setClutch)}
{renderSection('Gears', Gears, setGears)}
{renderSection('Footbrake', Footbrake, setFootbrake)}
{renderSection('Parking Brake', ParkingBrake, setParkingBrake)}
{renderSection('Steering', Steering, setSteering)}
      <Text style={styles.title}>Move off</Text>
      {renderSection('Safety', Safety, setSafety)}
{renderSection('Control', ControlRealtedToMoveOff, setControlRelatedToMoveOff)}
      <Text style={styles.title}>Use of Mirrors</Text>
      {renderSection('Signalling', Signalling, setSignalling)}
{renderSection('Change Direction', ChangeDirection, setChangeDirection)}
{renderSection('Change Speed', ChangeSpeed, setChangeSpeed)}

      <Text style={styles.title}>Signals</Text>
      {renderSection('Necessary', Necessary, setNecessary)}
{renderSection('Correctly', Correctly, setCorrectly)}
{renderSection('Timed', Timed, setTimed)}
      <Text style={styles.title}>Junctions</Text>
      {renderSection('Approach Speed', ApproachSpeedForJunctions, setApproachSpeedForJunctions)}
{renderSection('Observation', ObservationForJunctions, setObservationForJunctions)}
{renderSection('Turning Right', TurningRightForJunctions, setTurningRightForJunctions)}
{renderSection('Turning Left', TurningLeftForJunctions, setTurningLeftForJunctions)}
{renderSection('Cutting Corners', CuttingCornersForJunctions, setCuttingCornersForJunctions)}
      <Text style={styles.title}>Judgement</Text>
      {renderSection('Approach Speed', ApproachSpeed, setApproachSpeed)}
{renderSection('Observation', Observation, setObservation)}
{renderSection('Turning Right', TurningRight, setTurningRight)}
{renderSection('Turning Left', TurningLeft, setTurningLeft)}
{renderSection('Cutting Corners', CuttingCorners, setCuttingCorners)}
      <Text style={styles.title}>Positioning</Text>
      {renderSection('Normal Driving', NormalDriving, setNormalDriving)}
{renderSection('Lane Discipline', LaneDiscipline, setLaneDiscipline)}
{renderSection('Pedestrian Crossings', PedestrianCrossings, setPedestrianCrossings)}
{renderSection('Position/Normal Stop', PositionOrNormalStop, setPositionNormalStop)}
{renderSection('Awareness Planning', AwarenessPlanning, setAwarenessPlanning)}
{renderSection('Clearance', Clearance, setClearance)}
{renderSection('Following Distance', FollowingDistance, setFollowingDistance)}
{renderSection('Use of Speed', UseOfSpeed, setUseOfSpeed)}
      <Text style={styles.title}>Progress</Text>
      {renderSection('Appropriate Speed', AppropriateSpeed, setAppropriateSpeed)}
{renderSection('Undue Hesitation', UndueHesitation, setUndueHesitation)}

      <Text style={styles.title}>Response to signs / signals</Text>
      {renderSection('Traffic Signs', TrafficSigns, setTrafficSigns)}
{renderSection('Road Markings', RoadMarkings, setRoadMarkings)}
{renderSection('Traffic Lights', TrafficLights, setTrafficLights)}
{renderSection('Traffic Controllers', TrafficControllers, setTrafficControllers)}
{renderSection('Other Road Users', OtherRoadUsers, setOtherRoadUsers)}
 <View  style={styles.bottomContainer1}> 
 <View style={styles.bottomContainer}>
  <Text style={styles.title1}>Total faults:</Text>
  <TextInput
    style={styles.input}
    onChangeText={setTotalFaults}
    value={totalFaults}
    keyboardType="numeric"
    placeholder='Enter Total Faults'
    placeholderTextColor='gray'
  />
</View>
 
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:15 }} > 
  <Text style={styles.title2}>Result:</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={{color:"black"}} >Pass</Text>
    {/* <CheckBox
      value={Result === 'Pass'}
      onValueChange={() => setResult('Pass')}
    />
    */}
     <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
     <CheckBox
        value={Result === 'Pass'}
        onValueChange={() => setResult(Result === 'Pass' ? null : 'Pass')}
      />
    </View>
  </View>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={{color:"black"}}>Fail</Text>
    {/* <CheckBox
      value={Result === 'Fail'}
      onValueChange={() => setResult('Fail')}
    />
    */}
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
     <CheckBox
        value={Result === 'Fail'}
        onValueChange={() => setResult(Result === 'Fail' ? null : 'Fail')}
      />
      </View>
  </View>
</View>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,  width:'100%' }}>
  {[
    { item: 'ETA', value: ETA, setValue: setETA },
    { item: 'Physical', value: Physical, setValue: setPhysical },
    { item: 'Verbal', value: Verbal, setValue: setVerbal },
  ].map(({ item, value, setValue }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={value === 'selected'}
        onValueChange={(newValue) => setValue(newValue ? 'selected' : 'not selected')}
      />
      </View>
      <Text style={styles.text}>{item}</Text>
    </View>
  ))}
</View>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
  {[
    { item: 'ECO', value: ECO, setValue: setECO },
    { item: 'Control', value: Control, setValue: setControl },
    { item: 'Planning', value: Planning, setValue: setPlanning },
  ].map(({ item, value, setValue }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center'}} >
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={value === 'selected'}
        onValueChange={(newValue) => setValue(newValue ? 'selected' : 'not selected')}
      />
        </View>
      <Text style={styles.text}>{item}</Text>
    
    </View>
  ))}
</View>

      </View>
      <View style={{marginBottom:50}} >
<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.submitButton} onPress={() => createPDF({
    userName: name,
    userEmail: email,
    formNumber: formNumber,
    candidateName,
    date,
    time,
    isSelected,
    isControlSelected,
    isObservationSelected,
    isEyesightTestSelected,
    isReverseRightSelected,
    isReverseParkSelected,
    isCarParkSelected,
    isForwardParkSelected,
    isShowTellSelected,
    isControlledStopSelected,
    controlSelections,
    moveOffSelections,
    mirrorUseSelections,
    signalSelections,
    junctionSelections,
    judgementSelections,
    positioningSelections,
    progressSelections,
    responseSelections,
    totalFaults,
    isPass,
    isFail,
    etaSelections,
    ecoSelections,
  })}>
    <Text style={styles.submitButtonText}>Download PDF</Text>
  </TouchableOpacity> */}
</View>
    </ScrollView>
  );
};

export default DrivingTestFormSection;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, PermissionsAndroid } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import FileViewer from 'react-native-file-viewer';

// const styles = StyleSheet.create({
//   Maincontainer: {
//     flex: 1,
//     padding: 20,
//     marginBottom:5
//   },
//   container: {
//     flex:1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     width:'40%',
//     color:'black'
//   },
//   title1: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     width:'40%',
//     color:'black',
//     marginTop:15,
//   },
//   title2: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     width:'20%',
//     color:'black', 
//   },

//   circle: {
//     height: 30,
//     width: 30,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedCircle: {
//     backgroundColor: 'lightblue',
//   },
//   whiteText: {
//     color: '#fff',
//   },
//   bottomContainer:{
//     flex:1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//     width:'30%'
//   },
//   bottomContainer1:{
//     flexDirection:'row',
//     marginBottom:25,
//     margin:5
//   },
//   submitButton: {
//     backgroundColor: 'darkblue',
//     padding: 10,
//     alignItems: 'center',
//     borderRadius: 25,
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight:'700',
//     color:'white'

//   },
//   text: {
//     fontSize: 14,
//     color: 'black',
    
//   },
//   input: {
//     color:'black',
//     borderBottomWidth:1,
//     borderBottomColor:'black',

//   },
//   blackText:{
//     color:'black'
//   }
// });

// const DrivingTestFormSection = ({ navigation, route }) => {
//   const [formData, setFormData] = useState({});
//   const [isSelected, setSelection] = useState(false);
//   const [isControlSelected, setControlSelection] = useState(false);
//   const [isObservationSelected, setObservationSelection] = useState(false);
//   const [isEyesightTestSelected, setEyesightTestSelection] = useState(false);
//   const [isReverseRightSelected, setReverseRightSelection] = useState(false);
//   const [isReverseParkSelected, setReverseParkSelection] = useState(false);
//   const [isCarParkSelected, setCarParkSelection] = useState(false);
//   const [isForwardParkSelected, setForwardParkSelection] = useState(false);

//   const [eyesightTest, setEyesightTest] = useState('not selected');

//   const [ETA, setETA] = useState('not selected');
// const [Physical, setPhysical] = useState('not selected');
// const [Verbal, setVerbal] = useState('not selected');
// const [ECO, setECO] = useState('not selected');
// const [ControlStatus, setControlStatus] = useState('not selected');
// const [Planning, setPlanning] = useState('not selected');

// const [Manoeuvres, setManoeuvres] = useState({
//   ReverseOrRight: 'not selected',
//   ReverseParkInRoad: 'not selected',
//   ReverseParkRealtedToCarPark: 'not selected',
//   ForwardPark: 'not selected',
// });

// const [Control, setControl] = useState('D');


// const [Observation, setObservation] = useState('D');
// const [ShowMeOrTellMe, setShowMeOrTellMe] = useState('D');
// const [ControlStop, setControlStop] = useState('D');

// const [Accelerator, setAccelerator] = useState('D');
// const [Clutch, setClutch] = useState('D');
// const [Gears, setGears] = useState('D');
// const [Footbrake, setFootbrake] = useState('D');
// const [ParkingBrake, setParkingBrake] = useState('D');
// const [Steering, setSteering] = useState('D');

// const [Safety, setSafety] = useState('D');
// const [ControlRealtedToMoveOff, setControlRelatedToMoveOff] = useState('D');

// const [Signalling, setSignalling] = useState('D');
// const [ChangeDirection, setChangeDirection] = useState('D');
// const [ChangeSpeed, setChangeSpeed] = useState('D');

// const [Necessary, setNecessary] = useState('D');
// const [Correctly, setCorrectly] = useState('D');
// const [Timed, setTimed] = useState('D');


// const [ApproachSpeed, setApproachSpeed] = useState('D');
// const [ApproachSpeedForJunctions, setApproachSpeedForJunctions] = useState('D');
// const [ObservationForJunctions, setObservationForJunctions] = useState('D');
// const [TurningRightForJunctions, setTurningRightForJunctions] = useState('D');
// const [TurningLeftForJunctions, setTurningLeftForJunctions] = useState('D');
// const [CuttingCornersForJunctions, setCuttingCornersForJunctions] = useState('D');

// const [TurningRight, setTurningRight] = useState('D');
// const [TurningLeft, setTurningLeft] = useState('D');
// const [CuttingCorners, setCuttingCorners] = useState('D');

// const [Overtaking, setOvertaking] = useState('D');
// const [Meeting, setMeeting] = useState('D');
// const [Crossing, setCrossing] = useState('D');

// const [NormalDriving, setNormalDriving] = useState('D');
// const [LaneDiscipline, setLaneDiscipline] = useState('D');
// const [PedestrianCrossings, setPedestrianCrossings] = useState('D');
// const [PositionOrNormalStop, setPositionNormalStop] = useState('D');
// const [AwarenessPlanning, setAwarenessPlanning] = useState('D');
// const [Clearance, setClearance] = useState('D');
// const [FollowingDistance, setFollowingDistance] = useState('D');
// const [UseOfSpeed, setUseOfSpeed] = useState('D');

// const [AppropriateSpeed, setAppropriateSpeed] = useState('D');

// const [UndueHesitation, setUndueHesitation] = useState('D');


// const [TrafficSigns, setTrafficSigns] = useState('D');
// const [RoadMarkings, setRoadMarkings] = useState('D');
// const [TrafficLights, setTrafficLights] = useState('D');
// const [TrafficControllers, setTrafficControllers] = useState('D');
// const [OtherRoadUsers, setOtherRoadUsers] = useState('D');

// const [totalFaults, setTotalFaults] = useState('');
// const [Result, setResult] = useState('Fail');

//   const [candidateName, setCandidateName] = useState('');
// const [date, setDate] = useState('');
// const [time, setTime] = useState('');

//   const [isShowTellSelected, setShowTellSelection] = useState(false);
//   const [isControlledStopSelected, setControlledStopSelection] = useState(false);
//   const [controlSelections, setControlSelections] = useState(
//     ['Accelerator', 'Clutch', 'Gears', 'Footbrake', 'Parking brake', 'Steering'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [moveOffSelections, setMoveOffSelections] = useState(
//     ['Safety', 'Control'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [mirrorUseSelections, setMirrorUseSelections] = useState(
//     ['Signalling', 'Change direction', 'Change speed'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );

//   const [signalSelections, setSignalSelections] = useState(
//     ['Necessary', 'Correctly', 'Timed'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [junctionSelections, setJunctionSelections] = useState(
//     ['Approach speed', 'Observation', 'Turning right', 'Turning left', 'Cutting corners'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [judgementSelections, setJudgementSelections] = useState(
//     ['Overtaking', 'Meeting', 'Crossing'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [positioningSelections, setPositioningSelections] = useState(
//     ['Normal driving', 'Lane discipline', 'Pedestrian crossings', 'Position/normal stop', 'Awareness planning', 'Clearance', 'Following distance', 'Use of speed'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [progressSelections, setProgressSelections] = useState(
//     ['Appropriate speed', 'Undue hesitation'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [responseSelections, setResponseSelections] = useState(
//     ['Traffic signs', 'Road markings', 'Traffic lights', 'Traffic controllers', 'Other road users'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );


 
//   const [isPass, setIsPass] = useState(false);
//   const [isFail, setIsFail] = useState(false);
//   const [etaSelections, setEtaSelections] = useState(
//     ['ETA', 'Physical', 'Verbal'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );
//   const [ecoSelections, setEcoSelections] = useState(
//     ['ECO', 'Control', 'Planning'].reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
//   );



//   const { name, email , formNumber } = route.params;
//   const convertCamelCaseToReadable = (str) => {
//     // Insert a space before all caps
//     str = str.replace(/([A-Z])/g, ' $1');
    
//     // Uppercase the first character
//     return str.replace(/^./, str[0].toUpperCase());
//   };

//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: "Storage Permission",
//           message: "This app needs access to your storage to download PDFs.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can save files");
//       } else {
//         console.log("Storage permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };


//   // const handleSubmit = async () => {
//   //   console.log('DrivingTestForm: ', name); // Add this line
//   //   const formData = {
//   //     userName: name,
//   //     userEmail: email,
//   //     formNumber: formNumber,
//   //     candidateName,
//   //     date,
//   //     time,
//   //     eyesightTest,
//   //     Manoeuvres,
     
//   //     Control,
//   //     Observation,
//   //     ShowMeOrTellMe,
//   //     ControlStop,

//   //     Accelerator,
//   //     Clutch,
//   //     Gears,
//   //     Footbrake,
//   //     ParkingBrake,
//   //     Steering,

//   //     Safety,
//   //     ControlRealtedToMoveOff,

//   //     Signalling,
//   //     ChangeDirection,
//   //     ChangeSpeed,

//   //     Necessary,
//   //     Correctly,
//   //     Timed,

//   //     ApproachSpeed,
//   //     Observation,
//   //     TurningRight,
//   //     TurningLeft,
//   //     CuttingCorners,

//   //     Overtaking,
//   //     Meeting,
//   //     Crossing,

//   //     NormalDriving,
//   //     LaneDiscipline,
//   //     PedestrianCrossings,
//   //     PositionOrNormalStop,
//   //     AwarenessPlanning,
//   //     Clearance,
//   //     FollowingDistance,
//   //     UseOfSpeed,

//   //     AppropriateSpeed,
//   //     UndueHesitation,

//   //     TrafficSigns,
//   //     RoadMarkings,
//   //     TrafficLights,
//   //     TrafficControllers,
//   //     OtherRoadUsers,

//   //     totalFaults,
//   //     Result ,

//   //     ETA,
//   //     Physical,
//   //     Verbal,
//   //     ECO,
//   //     ControlStatus,
//   //     Planning
//   //   };
  
//   //   try {
//   //     await firebase.firestore().collection('DrivingTestForm').add(formData);
//   //     console.log('Form data successfully written!');
//   //     navigation.navigate('FormList2', { forceRefresh: true }); // Navigate to FormList2Screen
//   //   } catch (error) {
//   //     console.error('Error writing document: ', error);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     console.log('DrivingTestForm: ', name); // Add this line
//     const formData = {
//       'User Name': name,
//       'User Email': email,
//       'Form Number': formNumber,
//       'Candidate Name': candidateName,
//       'Date': date,
//       'Time': time,
//       'Eyesight Test': eyesightTest,
//       'Manoeuvres': Manoeuvres,
//       'Control': Control,
//       'Observation': Observation,
//       'Show Me Or Tell Me': ShowMeOrTellMe,
//       'Control Stop': ControlStop,
//       'Accelerator': Accelerator,
//       'Clutch': Clutch,
//       'Gears': Gears,
//       'Footbrake': Footbrake,
//       'Parking Brake': ParkingBrake,
//       'Steering': Steering,
//       'Safety': Safety,
//       'Control Related To Move Off': ControlRealtedToMoveOff,
//       'Signalling': Signalling,
//       'Change Direction': ChangeDirection,
//       'Change Speed': ChangeSpeed,
//       'Necessary': Necessary,
//       'Correctly': Correctly,
//       'Timed': Timed,
//       'Approach Speed': ApproachSpeedForJunctions,
//       'Observation': ObservationForJunctions,
//       'Turning Right': TurningRightForJunctions,
//       'Turning Left': TurningLeftForJunctions,
//       'Cutting Corners': CuttingCornersForJunctions,
//       'Approach Speed For Judgement': ApproachSpeed,
//       'Observation For Judgement': Observation,
//       'Turning Right For Judgement': TurningRight,
//       'Turning Left For Judgement': TurningLeft,
//       'Cutting Corners For Judgement': CuttingCorners,
//       'Overtaking': Overtaking,
//       'Meeting': Meeting,
//       'Crossing': Crossing,
//       'Normal Driving': NormalDriving,
//       'Lane Discipline': LaneDiscipline,
//       'Pedestrian Crossings': PedestrianCrossings,
//       'Position Or Normal Stop': PositionOrNormalStop,
//       'Awareness Planning': AwarenessPlanning,
//       'Clearance': Clearance,
//       'Following Distance': FollowingDistance,
//       'Use Of Speed': UseOfSpeed,
//       'Appropriate Speed': AppropriateSpeed,
//       'Undue Hesitation': UndueHesitation,
//       'Traffic Signs': TrafficSigns,
//       'Road Markings': RoadMarkings,
//       'Traffic Lights': TrafficLights,
//       'Traffic Controllers': TrafficControllers,
//       'Other Road Users': OtherRoadUsers,
//       'Total Faults': totalFaults,
//       'Result': Result,
//       'ETA': ETA,
//       'Physical': Physical,
//       'Verbal': Verbal,
//       'ECO': ECO,
//       'Control Status': ControlStatus,
//       'Planning': Planning
//     };
    
//     const fieldOrder = Object.keys(formData); // This gets the order of the fields
  
//     try {
//       await firebase.firestore().collection('DrivingTestForm').add({ name, formData, fieldOrder });
//       console.log('Form data successfully written!');
//       navigation.navigate('FormList2', { forceRefresh: true }); // Navigate to FormList2Screen
//     } catch (error) {
//       console.error('Error writing document: ', error);
//     }
//   };
  
  
  
//   const createPDF = async (formData) => {
//     let options = {
//       html: '<h1>Form Data</h1>' + Object.entries(formData).map(([key, value]) => `<p><strong>${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`).join(''),
//       fileName: 'FormData',
//       directory: 'Documents',
//     };

//     try {
//       const file = await RNHTMLtoPDF.convert(options);
//       console.log(file.filePath);

//       await FileViewer.open(file.filePath);
//       console.log('PDF opened successfully');
//     } catch (error) {
//       console.error('Error occurred while creating or opening the PDF: ', error);
//     }
//   };

//   const renderMappedSection = (title, selections, setSelections) =>
//   Object.keys(selections).map((item) =>
//     renderSection(item, selections[item], (newVal) => setSelections({ ...selections, [item]: newVal }))
//   );
//   const renderSection = (title, value, setValue) => (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       <TouchableOpacity
//         style={[styles.circle, value === 'S' && styles.selectedCircle]}
//         onPress={() => setValue('S')}
//       >
//         {/* <Text style={value === 'S' && styles.whiteText}>S</Text> */}
//         <Text style={[value === 'S' ? styles.whiteText : styles.blackText]}>S</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.circle, value === 'D' && styles.selectedCircle]}
//         onPress={() => setValue('D')}
//       >
//         {/* <Text style={value === 'D' && styles.whiteText}>D</Text> */}
//         <Text style={[value === 'D' ? styles.whiteText : styles.blackText]}>D</Text>
//       </TouchableOpacity>
//     </View>
//   );
  
//   return (
//     <ScrollView style={styles.Maincontainer}>
//       <View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderWidth:1 }}>
//   <View>
//     <View style={{ flexDirection: 'row', marginLeft:5}}>
//     <Text style={{ height: 40, color:'black', marginTop: 5 }}>Name</Text>
//     <TextInput 
//     style={{ height: 40, borderColor: 'gray', marginLeft:5 }} 
//     onChangeText={text => setCandidateName(text)}
//     value={candidateName}
//     placeholder='Enter Name'
//     placeholderTextColor='gray'
//   />
//     </View>
//     <View style={{ flexDirection: 'row',marginLeft:5 }}>
//     <Text style={{ height: 40, color:'black', marginTop: 10 }}>Date</Text>
//     <TextInput 
//     style={{ height: 40, borderColor: 'gray', marginLeft:5 }} 
//     onChangeText={text => setDate(text)}
//     value={date}
//     placeholder='Enter Date'
//     placeholderTextColor='gray'
//   />
//     </View>
//     <View style={{ flexDirection: 'row',marginLeft:5 }}>
//     <Text style={{ height: 40, color:'black', marginTop: 10 }}>Time</Text>
//     <TextInput 
//     style={{ height: 40, borderColor: 'gray', marginLeft:5 }} 
//     onChangeText={text => setTime(text)}
//     value={time}
//     placeholder='Enter Time'
//     placeholderTextColor='gray'
//   />
//     </View>
     
   
//   </View>
 
// </View>
// <View style={styles.container}>
//   <Text style={styles.title}>Eyesight Test</Text>
//   <CheckBox
//     value={eyesightTest === 'selected'}
//     onValueChange={(newValue) => setEyesightTest(newValue ? 'selected' : 'not selected')}
//   />
// </View>

// {/* 
//         <Text style={styles.title}>Manoeuvres</Text>

//         <View style={styles.container}>
//           <Text style={styles.text}>Reverse / Right</Text>
//           <CheckBox
//             value={isReverseRightSelected}
//             onValueChange={setReverseRightSelection}
//           />
//         </View>
//         <View style={styles.container}>
//           <Text style={styles.text}>Reverse park (road)</Text>
//           <CheckBox
//             value={isReverseParkSelected}
//             onValueChange={setReverseParkSelection}
//           />
//         </View>
//         <View style={styles.container}>
//           <Text style={styles.text}>Reverse park (car park)</Text>
//           <CheckBox
//             value={isCarParkSelected}
//             onValueChange={setCarParkSelection}
//           />
//         </View>
//         <View style={styles.container}>
//           <Text style={styles.text}>Forward park</Text>
//           <CheckBox
//             value={isForwardParkSelected}
//             onValueChange={setForwardParkSelection}
//           />
//         </View> */}

// <Text style={styles.title}>Manoeuvres</Text>

// <View style={styles.container}>
//   <Text style={styles.text}>Reverse / Right</Text>
//   <CheckBox
//     value={Manoeuvres.ReverseOrRight === 'selected'}
//     onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ReverseOrRight: newValue ? 'selected' : 'not selected'})}
//   />
// </View>
// <View style={styles.container}>
//   <Text style={styles.text}>Reverse park (road)</Text>
//   <CheckBox
//     value={Manoeuvres.ReverseParkInRoad === 'selected'}
//     onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ReverseParkInRoad: newValue ? 'selected' : 'not selected'})}
//   />
// </View>
// <View style={styles.container}>
//   <Text style={styles.text}>Reverse park (car park)</Text>
//   <CheckBox
//     value={Manoeuvres.ReverseParkRealtedToCarPark === 'selected'}
//     onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ReverseParkRealtedToCarPark: newValue ? 'selected' : 'not selected'})}
//   />
// </View>
// <View style={styles.container}>
//   <Text style={styles.text}>Forward park</Text>
//   <CheckBox
//     value={Manoeuvres.ForwardPark === 'selected'}
//     onValueChange={(newValue) => setManoeuvres({...Manoeuvres, ForwardPark: newValue ? 'selected' : 'not selected'})}
//   />
// </View>

       
// <View style={styles.container}>
//   <Text style={styles.title}>Control</Text>
//   <TouchableOpacity
//     style={[styles.circle, Control === 'S' && styles.selectedCircle]}
//     onPress={() => setControl('S')}
//   >
//     {/* <Text style={Control === 'S' && styles.whiteText}>S</Text> */}
//     <Text style={[Control === 'S' ? styles.whiteText : styles.blackText]}>S</Text>
//   </TouchableOpacity>
//   <TouchableOpacity
//     style={[styles.circle, Control === 'D' && styles.selectedCircle]}
//     onPress={() => setControl('D')}
//   >
//     {/* <Text style={Control === 'D' && styles.whiteText}>D</Text> */}
//     <Text style={[Control === 'D' ? styles.whiteText : styles.blackText]}>D</Text>
//   </TouchableOpacity>
// </View>
// {renderSection('Observation', Observation, setObservation)}
// {renderSection('Show me / Tell me', ShowMeOrTellMe, setShowMeOrTellMe)}
// {renderSection('Controlled stop', ControlStop, setControlStop)}
//       <Text style={styles.title}>Control</Text>
//       {/* {renderMappedSection('Control', controlSelections, setControlSelections)} */}
//       {renderSection('Accelerator', Accelerator, setAccelerator)}
// {renderSection('Clutch', Clutch, setClutch)}
// {renderSection('Gears', Gears, setGears)}
// {renderSection('Footbrake', Footbrake, setFootbrake)}
// {renderSection('Parking Brake', ParkingBrake, setParkingBrake)}
// {renderSection('Steering', Steering, setSteering)}
//       <Text style={styles.title}>Move off</Text>
//       {renderSection('Safety', Safety, setSafety)}
// {renderSection('Control', ControlRealtedToMoveOff, setControlRelatedToMoveOff)}
//       <Text style={styles.title}>Use of Mirrors</Text>
//       {renderSection('Signalling', Signalling, setSignalling)}
// {renderSection('Change Direction', ChangeDirection, setChangeDirection)}
// {renderSection('Change Speed', ChangeSpeed, setChangeSpeed)}

//       <Text style={styles.title}>Signals</Text>
//       {renderSection('Necessary', Necessary, setNecessary)}
// {renderSection('Correctly', Correctly, setCorrectly)}
// {renderSection('Timed', Timed, setTimed)}
//       <Text style={styles.title}>Junctions</Text>
//       {renderSection('Approach Speed', ApproachSpeedForJunctions, setApproachSpeedForJunctions)}
// {renderSection('Observation', ObservationForJunctions, setObservationForJunctions)}
// {renderSection('Turning Right', TurningRightForJunctions, setTurningRightForJunctions)}
// {renderSection('Turning Left', TurningLeftForJunctions, setTurningLeftForJunctions)}
// {renderSection('Cutting Corners', CuttingCornersForJunctions, setCuttingCornersForJunctions)}
//       <Text style={styles.title}>Judgement</Text>
//       {renderSection('Approach Speed', ApproachSpeed, setApproachSpeed)}
// {renderSection('Observation', Observation, setObservation)}
// {renderSection('Turning Right', TurningRight, setTurningRight)}
// {renderSection('Turning Left', TurningLeft, setTurningLeft)}
// {renderSection('Cutting Corners', CuttingCorners, setCuttingCorners)}
//       <Text style={styles.title}>Positioning</Text>
//       {renderSection('Normal Driving', NormalDriving, setNormalDriving)}
// {renderSection('Lane Discipline', LaneDiscipline, setLaneDiscipline)}
// {renderSection('Pedestrian Crossings', PedestrianCrossings, setPedestrianCrossings)}
// {renderSection('Position/Normal Stop', PositionOrNormalStop, setPositionNormalStop)}
// {renderSection('Awareness Planning', AwarenessPlanning, setAwarenessPlanning)}
// {renderSection('Clearance', Clearance, setClearance)}
// {renderSection('Following Distance', FollowingDistance, setFollowingDistance)}
// {renderSection('Use of Speed', UseOfSpeed, setUseOfSpeed)}
//       <Text style={styles.title}>Progress</Text>
//       {renderSection('Appropriate Speed', AppropriateSpeed, setAppropriateSpeed)}
// {renderSection('Undue Hesitation', UndueHesitation, setUndueHesitation)}

//       <Text style={styles.title}>Response to signs / signals</Text>
//       {renderSection('Traffic Signs', TrafficSigns, setTrafficSigns)}
// {renderSection('Road Markings', RoadMarkings, setRoadMarkings)}
// {renderSection('Traffic Lights', TrafficLights, setTrafficLights)}
// {renderSection('Traffic Controllers', TrafficControllers, setTrafficControllers)}
// {renderSection('Other Road Users', OtherRoadUsers, setOtherRoadUsers)}
//  <View  style={styles.bottomContainer1}> 
//  <View style={styles.bottomContainer}>
//   <Text style={styles.title1}>Total faults:</Text>
//   <TextInput
//     style={styles.input}
//     onChangeText={setTotalFaults}
//     value={totalFaults}
//     keyboardType="numeric"
//     placeholder='Enter Total Faults'
//   />
// </View>
 
// </View>
// <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:15 }} > 
//   <Text style={styles.title2}>Result:</Text>
//   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//   <Text style={{color:"black"}} >Pass</Text>
//     <CheckBox
//       value={Result === 'Pass'}
//       onValueChange={() => setResult('Pass')}
//     />
   
//   </View>
//   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//   <Text style={{color:"black"}}>Fail</Text>
//     <CheckBox
//       value={Result === 'Fail'}
//       onValueChange={() => setResult('Fail')}
//     />
   
//   </View>
// </View>

// <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,  width:'100%' }}>
//   {[
//     { item: 'ETA', value: ETA, setValue: setETA },
//     { item: 'Physical', value: Physical, setValue: setPhysical },
//     { item: 'Verbal', value: Verbal, setValue: setVerbal },
//   ].map(({ item, value, setValue }) => (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       <CheckBox
//         value={value === 'selected'}
//         onValueChange={(newValue) => setValue(newValue ? 'selected' : 'not selected')}
//       />
//       <Text style={styles.text}>{item}</Text>
//     </View>
//   ))}
// </View>

// <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
//   {[
//     { item: 'ECO', value: ECO, setValue: setECO },
//     { item: 'Control', value: Control, setValue: setControl },
//     { item: 'Planning', value: Planning, setValue: setPlanning },
//   ].map(({ item, value, setValue }) => (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       <CheckBox
//         value={value === 'selected'}
//         onValueChange={(newValue) => setValue(newValue ? 'selected' : 'not selected')}
//       />
//       <Text style={styles.text}>{item}</Text>
//     </View>
//   ))}
// </View>

//       </View>
//       <View style={{marginBottom:50}} >
// <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//       {/* <TouchableOpacity style={styles.submitButton} onPress={() => createPDF({
//     userName: name,
//     userEmail: email,
//     formNumber: formNumber,
//     candidateName,
//     date,
//     time,
//     isSelected,
//     isControlSelected,
//     isObservationSelected,
//     isEyesightTestSelected,
//     isReverseRightSelected,
//     isReverseParkSelected,
//     isCarParkSelected,
//     isForwardParkSelected,
//     isShowTellSelected,
//     isControlledStopSelected,
//     controlSelections,
//     moveOffSelections,
//     mirrorUseSelections,
//     signalSelections,
//     junctionSelections,
//     judgementSelections,
//     positioningSelections,
//     progressSelections,
//     responseSelections,
//     totalFaults,
//     isPass,
//     isFail,
//     etaSelections,
//     ecoSelections,
//   })}>
//     <Text style={styles.submitButtonText}>Download PDF</Text>
//   </TouchableOpacity> */}
// </View>
//     </ScrollView>
//   );
// };

// export default DrivingTestFormSection;
