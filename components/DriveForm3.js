import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet,  Image, TouchableOpacity, PermissionsAndroid,Dimensions, useColorScheme } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';


// const width  = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const { width, height } = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const DriveForm3 = ({ navigation, route }) => {
  const [candidateName, setCandidateName] = useState('');
  const [applicationRef, setApplicationRef] = useState(''); 
  const [date, setDate] = useState('');
  const [catType, setCatType] = useState('');
  const [adiOrReg, setAdiOrReg] = useState('');
  const [time, setTime] = useState('');
  const [drNo, setDrNo] = useState('');
  const [dtcCodeOrAuthority, setDtcCodeOrAuthority] = useState('');
  const [regNo, setRegNo] = useState('');
  const [staffOrRefNo, setStaffOrRefNo] = useState('');
  const [examinerName, setExaminerName] = useState('');
  const [sChecked, setSChecked] = useState(false);
  const [dcChecked, setDCChecked] = useState(false);
  const [declarationYes, setDeclarationYes] = useState(false);
  const [declarationNo, setDeclarationNo] = useState(false);
  const [declaration, setDeclaration] = useState(null);

  const { name, email , formNumber } = route.params;
  

  const handleCheckboxChange = (value) => {
    setControlStopPromptness(prevValue => prevValue === value ? '' : value);

  };

  const scheme = useColorScheme();
  const handleCheckboxChange1 = (value) => {
   
    setControlStopControl(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange2 = (value) => {
   
    setReverseOrLeftReverseWithTrailerControl(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange3 = (value) => {
   
    setReverseOrLeftReverseWithTrailerObservation(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange4 = (value) => {
    setReverseOrRightControl(prevValue => prevValue === value ? '' : value);
    
  };

  const handleCheckboxChange5 = (value) => {
    setReverseOrRightObservation(prevValue => prevValue === value ? '' : value);
    
  };

  const handleCheckboxChange6 = (value) => {
    setReverseParkControl(prevValue => prevValue === value ? '' : value);
    
  };

  const handleCheckboxChange7 = (value) => {
    setReverseParkObservation(prevValue => prevValue === value ? '' : value);
   
  };

  const handleCheckboxChange8 = (value) => {
    
    setTurnInRoadControl(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange9 = (value) => {
   
    setTurnInRoadObservation(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange10 = (value) => {
    setVehicleCheck(prevValue => prevValue === value ? '' : value);
    
  };

  const handleCheckboxChange11 = (value) => {
    
    setTaxiManoeuvreControl(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange12 = (value) => {
    
    setTaxiManoeuvreObservation(prevValue => prevValue === value ? '' : value);
  };
 
  const handleCheckboxChange13 = (value) => {
    setUncoupleOrRecouple(prevValue => prevValue === value ? '' : value);
    setPrecautions
  };

  const handleCheckboxChange14 = (value) => {
   
    setPrecautions(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange15 = (value) => {
   
    setAccelerator(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange16 = (value) => {
    setClutch(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange17 = (value) => {
    setGears(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange18 = (value) => {
    setFootbrake(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange19 = (value) => {
    setParkingBrakeOrMCFrontBrake(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange20 = (value) => {
    setSteering(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange21 = (value) => {
    setBalanceMOrC(prevValue => prevValue === value ? '' : value);
    
  };

   
  const handleCheckboxChange22 = (value) => {
    setLgvOrPcvGearExercise(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange23 = (value) => {
    setPcvDoorExercise(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange24 = (value) => {
    setSafety(prevValue => prevValue === value ? '' : value);
  };

  
 

  const handleCheckboxChange26 = (value) => {
    setControl(prevValue => prevValue === value ? '' : value);
  };

  
  const handleCheckboxChange27 = (value) => {
    setSignallingForUseOfMirrors(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange28 = (value) => {
    setChangeDirectionForUseOfMirrors(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange29 = (value) => {
    setChangeSpeedForUseOfMirrors(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange30 = (value) => {
    setNecessaryForSignals(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange31 = (value) => {
    setCorrectlyForSignals(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange32 = (value) => {
    setTimedForSignals(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange33 = (value) => {
    setClearanceOrObstruction(prevValue => prevValue === value ? '' : value);
  };

  
  const handleCheckboxChange34 = (value) => {
    setTrafficSignalsForResponseToSignsOrSignals(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange35 = (value) => {
    setRoadMarkingsForResponseToSignsOrSignals(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange36 = (value) => {
    setTrafficLightsForResponseToSignsOrSignals(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange38 = (value) => {
    setOtherRoadUsersForResponseToSignsOrSignals(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange37 = (value) => {
    setTrafficControllersForResponseToSignsOrSignals(prevValue => prevValue === value ? '' : value);
  };

  
  const handleCheckboxChange39 = (value) => {
    setOtherRoadUsersForResponseToSignsOrSignals(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange40 = (value) => {
    setUseOfSpeed(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange41 = (value) => {
    setFollowingDistance(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange42 = (value) => {
    setAppropriateSpeedForProgress(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange43 = (value) => {
    setUndueHesitationForProgress(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange44 = (value) => {
    setApproachSpeedForJunctions(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange45 = (value) => {
    setObservationForJunctions(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange46 = (value) => {
    setTurningRightForJunctions(prevValue => prevValue === value ? '' : value);
  };


   const handleCheckboxChange4x = (value) => {
    setTurningLeftForJunctions(prevValue => prevValue === value ? '' : value);
  };

  
  const handleCheckboxChange47 = (value) => {
    setCuttingCornersForJunctions(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange48 = (value) => {
    setOvertakingForJudgement(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange49 = (value) => {
    setMeetingForJudgement(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange50 = (value) => {
    setCrossingForJudgement(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange51 = (value) => {
    setNormalDrivingForPositioning(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange52 = (value) => {
    setNormalDrivingForPositioning(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange53 = (value) => {
    setLaneDisciplineForPositioning(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange54 = (value) => {
    setPedestrianCrossing(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange55 = (value) => {
    setPositionOrNormalStops(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange56 = (value) => {
    setAwarenessOrPlanning(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange57 = (value) => {
    setAncillaryControls(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange58 = (value) => {
    setEcoSafeDriving(prevValue => prevValue === value ? '' : value);
  };



  const handleCheckboxChange59 = (value) => {
    setEcoSafeDriving(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange60 = (value) => {
    setSpare1(prevValue => prevValue === value ? '' : value);
  };


  const handleCheckboxChange61 = (value) => {
    setSpare2(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange62 = (value) => {
    setSpare3(prevValue => prevValue === value ? '' : value);
  };

  const handleCheckboxChange63 = (value) => {
    setSpare4(prevValue => prevValue === value ? '' : value);
  };

 
 

  const handleCheckboxChange64 = (value) => {
    setSurvey(value === survey ? null : value);
  };


  const handleCheckboxChange65 = (value) => {
    setETA(value === ETA ? null : value);
  };

  const handleCheckboxChange66 = (value) => {
    setEndresult(value === endresult ? null : value);
  };


  const handleCheckboxChange67 = (value) => {
    setDeclaration(value === declaration ? null : value);
  };


  const handleCheckboxChange68 = (value) => {
    setEyeSight(value === declaration ? null : value);
  };

 

const [isAutoChecked, setIsAutoChecked] = useState(false);
const [isExtChecked,  setIsExtChecked] = useState(false);
const [hOrCodeOrSafetyTotal, setHOrCodeOrSafetyTotal] = useState('');

const [marks, setMarks] = useState(null);


const [buttonValues, setButtonValues] = useState(Array(5).fill(false));
const [adiCertNo, setAdiCertNo] = useState('');
const [bottomRowValues, setBottomRowValues] = useState(Array(5).fill(false));

const [sup, setSup] = useState(false);
const [adi, setAdi] = useState(false);
const [int, setInt] = useState(false);
const [other, setOther] = useState(false);

const [eyeSight, setEyeSight] = useState(null);
const [eyeSightTotal, setEyeSightTotal] = useState('');



const [endresult, setEndresult] = useState(null);
const [ETA, setETA] = useState(null);
const [survey, setSurvey] = useState(null);

const [controlStopPromptness, setControlStopPromptness] = useState(null);
const [controlStopControl, setControlStopControl] = useState(null);
const [totalForControlStopPromptness, setTotalForControlStopPromptness] = useState('');
const [totalForControlStopControl, setTotalForControlStopControl] = useState('');

 
const [taxiManoeuvreControl, setTaxiManoeuvreControl] = useState(null);
const [taxiManoeuvreObservation, setTaxiManoeuvreObservation] = useState(null);
const [totalForTaxiManoeuvreControl, setTotalForTaxiManoeuvreControl] = useState('');
const [totalForTaxiManoeuvreObservation, setTotalForTaxiManoeuvreObservation] = useState('');



const [buttonValues2, setButtonValues2] = useState(Array(5).fill(false));
const [vChecked, setVChecked] = useState(false);
const [cChecked, setCChecked] = useState(false);

//  state variables for the EyeSight section
const [sCheckedEyeSight, setSCheckedEyeSight] = useState(false);
const [dCheckedEyeSight, setDCheckedEyeSight] = useState(false);
const [totalCheckedEyeSight, setTotalCheckedEyeSight] = useState(false);


const [hOrCodeOrSafety, setHOrCodeOrSafety] = useState(null);
const [hCodeInputText, setHCodeInputText] = useState('');


// state variables for the H Code Safety section
const [sCheckedHCodeSafety, setSCheckedHCodeSafety] = useState(false);
const [dCheckedHCodeSafety, setDCheckedHCodeSafety] = useState(false);
const [totalCheckedHCodeSafety, setTotalCheckedHCodeSafety] = useState(false);


const [controlStop, setControlStop] = useState({ promptness: null, control: null });
const [reverseOrLeftReverseWithTrailer, setReverseOrLeftReverseWithTrailer] = useState({ control: null, observation: null });

const [reverseOrRight, setReverseOrRight] = useState({ control: null, observation: null });

const [reversePark, setReversePark] = useState({ control: null, observation: null });

const [isRChecked, setIsRChecked] = useState(false);
const [isCChecked, setIsCChecked] = useState(false);
const [turnInRoad, setTurnInRoad] = useState({ control: null, observation: null });
const [taxiManoeuvre, setTaxiManoeuvre] = useState({ control: null, observation: null });
const [moveOff, setMoveOff] = useState({ safety: null, control: null });
const [progress, setProgress] = useState({ appropriateSpeed: null, undueHesitation: null });
const [positioning, setPositioning] = useState({ normalDriving: null, laneDiscipline: null });
const [useOfMirrors, setUseOfMirrors] = useState({ signalling: null, changeDirections: null, changeSpeed: null });
const [signals, setSignals] = useState({ necessary: null, correctly: null, timed: null });
const [resposeToSignsOrSignals, setResposeToSignsOrSignals] = useState({ trafficSignals: null, roadMarkings: null, trafficLights: null, trafficControllers: null, otherRoadUsers: null });
const [junctions, setJunctions] = useState({ approachSpeed: null, observation: null, turningRight: null, turningLeft: null, cuttingCorners: null });
const [judgement, setJudgement] = useState({ overtaking: null, meeting: null, crossing: null });




const [promptnessChecked, setPromptnessChecked] = useState(false);
const [totalChecked1, setTotalChecked1] = useState(false);
const [sChecked1, setSChecked1] = useState(false); 
const [dChecked1, setDChecked1] = useState(false);

const [controlChecked, setControlChecked] = useState(false);
const [totalChecked2, setTotalChecked2] = useState(false);
const [sChecked2, setSChecked2] = useState(false);
const [dChecked2, setDChecked2] = useState(false);

const [wheelchairPassChecked, setWheelchairPassChecked] = useState(false);
const [wheelchairFailChecked, setWheelchairFailChecked] = useState(false);

const [passChecked, setPassChecked] = useState(false);
const [failChecked, setFailChecked] = useState(false);
const [noneChecked, setNoneChecked] = useState(false);
const [totalFaults, setTotalFaults] = useState('');
const [routeNumber, setRouteNumber] = useState('');

const [newVChecked, setNewVChecked] = useState(false);
const [pChecked, setPChecked] = useState(false);
const [snChecked, setSNChecked] = useState(false);

const [aChecked, setAChecked] = useState(false);
const [bChecked, setBChecked] = useState(false);
const [newCChecked, setNewCChecked] = useState(false);
const [dChecked, setDChecked] = useState(false);
const [eChecked, setEChecked] = useState(false);
const [fChecked, setFChecked] = useState(false);
const [gChecked, setGChecked] = useState(false);
const [hChecked, setHChecked] = useState(false);

const [debrief, setDebrief] = useState('');
const [activityCode, setActivityCode] = useState('');

const [passCertificateNumber, setPassCertificateNumber] = useState('');
const [wheelchairCertNo, setWheelchairCertNo] = useState('');
const [healthStatusOrConfirmation,setHealthStatusOrConfirmation ] = useState('');

const [reverseOrLeftReverseWithTrailerControl, setReverseOrLeftReverseWithTrailerControl] = useState(null);
const [reverseOrLeftReverseWithTrailerObservation, setReverseOrLeftReverseWithTrailerObservation] = useState(null);
const [totalForReverseOrLeftReverseWithTrailerControl, setTotalForReverseOrLeftReverseWithTrailerControl] = useState('');
const [totalForReverseOrLeftReverseWithTrailerObservation, setTotalForReverseOrLeftReverseWithTrailerObservation] = useState('');

const [reverseOrRightControl, setReverseOrRightControl] = useState(null);
const [reverseOrRightObservation, setReverseOrRightObservation] = useState(null);
const [totalForReverseOrRightControl, setTotalForReverseOrRightControl] = useState('');
const [totalForReverseOrRightObservation, setTotalForReverseOrRightObservation] = useState('');

const [reverseParkControl, setReverseParkControl] = useState(null);
const [reverseParkObservation, setReverseParkObservation] = useState(null);
const [totalForReverseParkControl, setTotalForReverseParkControl] = useState('');
const [totalForReverseParkObservation, setTotalForReverseParkObservation] = useState('');

const [turnInRoadControl, setTurnInRoadControl] = useState(null);
const [turnInRoadObservation, setTurnInRoadObservation] = useState(null);
const [totalForTurnInRoadControl, setTotalForTurnInRoadControl] = useState('');
const [totalForTurnInRoadObservation, setTotalForTurnInRoadObservation] = useState('');


const [vehicleCheck, setVehicleCheck] = useState(null);
const [totalForVehicleCheck, setTotalForVehicleCheck] = useState('');

const [uncoupleOrRecouple, setUncoupleOrRecouple] = useState(null);
const [totalForUncoupleOrRecouple, setTotalForUncoupleOrRecouple] = useState('');

const [precautions, setPrecautions] = useState(null);
const [totalForPrecautions, setTotalForPrecautions] = useState('');



const [signallingForUseOfMirrors, setSignallingForUseOfMirrors] = useState(null);
const [changeDirectionForUseOfMirrors, setChangeDirectionForUseOfMirrors] = useState(null);
const [changeSpeedForUseOfMirrors, setChangeSpeedForUseOfMirrors] = useState(null);
const [totalForSignallingForUseOfMirrors, setTotalForSignallingForUseOfMirrors] = useState('');
const [totalForChangeDirectionForUseOfMirrors, setTotalForChangeDirectionForUseOfMirrors] = useState('');
const [totalForChangeSpeedForUseOfMirrors, setTotalForChangeSpeedForUseOfMirrors] = useState('');

const [trafficSignalsForResponseToSignsOrSignals, setTrafficSignalsForResponseToSignsOrSignals] = useState(null);
const [roadMarkingsForResponseToSignsOrSignals, setRoadMarkingsForResponseToSignsOrSignals] = useState(null);
const [trafficLightsForResponseToSignsOrSignals, setTrafficLightsForResponseToSignsOrSignals] = useState(null);
const [trafficControllersForResponseToSignsOrSignals, setTrafficControllersForResponseToSignsOrSignals] = useState(null);
const [otherRoadUsersForResponseToSignsOrSignals, setOtherRoadUsersForResponseToSignsOrSignals] = useState(null);
const [totalForTrafficSignalsForResponseToSignsOrSignals, setTotalForTrafficSignalsForResponseToSignsOrSignals] = useState('');
const [totalForRoadMarkingsForResponseToSignsOrSignals, setTotalForRoadMarkingsForResponseToSignsOrSignals] = useState('');
const [totalForTrafficLightsForResponseToSignsOrSignals, setTotalForTrafficLightsForResponseToSignsOrSignals] = useState('');
const [totalForTrafficControllersForResponseToSignsOrSignals, setTotalForTrafficControllersForResponseToSignsOrSignals] = useState('');
const [totalForOtherRoadUsersForResponseToSignsOrSignals, setTotalForOtherRoadUsersForResponseToSignsOrSignals] = useState('');


const [approachSpeedForJunctions, setApproachSpeedForJunctions] = useState(null);
const [observationForJunctions, setObservationForJunctions] = useState(null);
const [turningRightForJunctions, setTurningRightForJunctions] = useState(null);
const [turningLeftForJunctions, setTurningLeftForJunctions] = useState(null);
const [totalForApproachSpeedForJunctions, setTotalForApproachSpeedForJunctions] = useState('');
const [totalForObservationForJunctions, setTotalForObservationForJunctions] = useState('');
const [totalForTurningRightForJunctions, setTotalForTurningRightForJunctions] = useState('');
const [totalForTurningLeftForJunctions, setTotalForTurningLeftForJunctions] = useState('');
const [cuttingCornersForJunctions, setCuttingCornersForJunctions] = useState(null);
const [totalForCuttingCornersForJunctions, setTotalForCuttingCornersForJunctions] = useState('');

const [overtakingForJudgement, setOvertakingForJudgement] = useState(null);
const [meetingForJudgement, setMeetingForJudgement] = useState(null);
const [crossingForJudgement, setCrossingForJudgement] = useState(null);
const [totalForOvertakingForJudgement, setTotalForOvertakingForJudgement] = useState('');
const [totalForMeetingForJudgement, setTotalForMeetingForJudgement] = useState('');
const [totalForCrossingForJudgement, setTotalForCrossingForJudgement] = useState('');


const [normalDrivingForPositioning, setNormalDrivingForPositioning] = useState(null);
const [laneDisciplineForPositioning, setLaneDisciplineForPositioning] = useState(null);
const [totalForNormalDrivingForPositioning, setTotalForNormalDrivingForPositioning] = useState('');
const [totalForLaneDisciplineForPositioning, setTotalForLaneDisciplineForPositioning] = useState('');

const [appropriateSpeedForProgress, setAppropriateSpeedForProgress] = useState(null);
const [undueHesitationForProgress, setUndueHesitationForProgress] = useState(null);
const [totalForAppropriateSpeedForProgress, setTotalForAppropriateSpeedForProgress] = useState('');
const [totalForUndueHesitationForProgress, setTotalForUndueHesitationForProgress] = useState('');

const [accelerator, setAccelerator] = useState(null);
const [totalForAccelerator, setTotalForAccelerator] = useState('');

const [clutch, setClutch] = useState(null);
const [totalForClutch, setTotalForClutch] = useState('');

const [gears, setGears] = useState(null);
const [totalForGears, setTotalForGears] = useState('');

const [footbrake, setFootbrake] = useState(null);
const [totalForFootbrake, setTotalForFootbrake] = useState('');

const [parkingBrakeOrMCFrontBrake, setParkingBrakeOrMCFrontBrake] = useState(null);
const [totalForParkingBrakeOrMCFrontBrake, setTotalForParkingBrakeOrMCFrontBrake] = useState('');

const [steering, setSteering] = useState(null);
const [totalForSteering, setTotalForSteering] = useState('');

const [balanceMOrC, setBalanceMOrC] = useState(null);
const [totalForBalanceMOrC, setTotalForBalanceMOrC] = useState('');

const [lgvOrPcvGearExercise, setLgvOrPcvGearExercise] = useState(null);
const [totalForLgvOrPcvGearExercise, setTotalForLgvOrPcvGearExercise] = useState('');

const [pcvDoorExercise, setPcvDoorExercise] = useState(null);
const [totalForPcvDoorExercise, setTotalForPcvDoorExercise] = useState('');

const [safety, setSafety] = useState(null);
const [totalForSafety, setTotalForSafety] = useState('');

const [control, setControl] = useState(null);
const [totalForControl, setTotalForControl] = useState('');

const [necessaryForSignals, setNecessaryForSignals] = useState(null);
const [totalsOfNecessaryForSignals, setTotalsOfNecessaryForSignals] = useState('');
const [correctlyForSignals, setCorrectlyForSignals] = useState(null);
const [totalOfCorrectlyForSignals, setTotalOfCorrectlyForSignals] = useState('');
const [timedForSignals, setTimedForSignals] = useState(null);
const [totalOfTimedForSignals, setTotalOfTimedForSignals] = useState('');

const [clearanceOrObstruction, setClearanceOrObstruction] = useState(null);
const [totalForClearanceOrObstruction, setTotalForClearanceOrObstruction] = useState('');

const [useOfSpeed, setUseOfSpeed] = useState(null);
const [totalForUseOfSpeed, setTotalForUseOfSpeed] = useState('');
const [followingDistance, setFollowingDistance] = useState(null);
const [totalForFollowingDistance, setTotalForFollowingDistance] = useState('');

const [pedestrianCrossing, setPedestrianCrossing] = useState(null);
const [totalForPedestrianCrossing, setTotalForPedestrianCrossing] = useState('');

const [positionOrNormalStops, setPositionOrNormalStops] = useState(null);
const [totalForPositionOrNormalStops, setTotalForPositionOrNormalStops] = useState('');

const [awarenessOrPlanning, setAwarenessOrPlanning] = useState(null);
const [totalForAwarenessOrPlanning, setTotalForAwarenessOrPlanning] = useState('');

const [ancillaryControls, setAncillaryControls] = useState(null);
const [totalForAncillaryControls, setTotalForAncillaryControls] = useState('');

const [ecoSafeDriving, setEcoSafeDriving] = useState(null);
const [totalForEcoSafeDriving, setTotalForEcoSafeDriving] = useState('');

const [spare1, setSpare1] = useState(null);
const [totalForSpare1, setTotalForSpare1] = useState('');

const [spare2, setSpare2] = useState(null);
const [totalForSpare2, setTotalForSpare2] = useState('');

const [spare3, setSpare3] = useState(null);
const [totalForSpare3, setTotalForSpare3] = useState('');

const [spare4, setSpare4] = useState(null);
const [totalForSpare4, setTotalForSpare4] = useState('');


const handleEyeSightChange70 = (value) => {
  setEyeSight(eyeSight === value ? '' : value);
};


const handleHOrCodeOrSafetyChange = (value) => {
  setHOrCodeOrSafety(hOrCodeOrSafety === value ? '' : value);
};


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
const handleSubmit = async () => {
  const formData = {
    userName: name,
    userEmail: email,
    candidateName: candidateName,
    applicationRef: applicationRef,
    date: date,
    time: time,
    drNo: drNo,
    marks: marks,
    dtcCodeOrAuthority: dtcCodeOrAuthority,
    regNo: regNo,
    staffOrRefNo: staffOrRefNo,
    examinerName: examinerName,
    catType: catType,
    adiOrReg: adiOrReg,
    isAutoChecked: isAutoChecked,
    isExtChecked: isExtChecked,
    adiCertNo: adiCertNo,
    sup: sup,
    adi: adi,
    int: int,
    other: other,
    eyeSight: eyeSight,
    eyeSightTotal:eyeSightTotal,
    vChecked: vChecked,
    cChecked: cChecked,
    hOrCodeOrSafety: hOrCodeOrSafety,
    hOrCodeOrSafetyTotal:hOrCodeOrSafetyTotal,
    
    controlStopPromptness:controlStopPromptness,
    totalForControlStopPromptness: totalForControlStopPromptness,
    controlStopControl:controlStopControl,
    totalForControlStopControl:totalForControlStopControl,
   
    reverseOrLeftReverseWithTrailerControl:reverseOrLeftReverseWithTrailerControl,
    totalForReverseOrLeftReverseWithTrailerControl:totalForReverseOrLeftReverseWithTrailerControl,
    reverseOrLeftReverseWithTrailerObservation:reverseOrLeftReverseWithTrailerObservation,
    totalForReverseOrLeftReverseWithTrailerObservation:totalForReverseOrLeftReverseWithTrailerObservation,


    reverseOrRightControl:reverseOrRightControl,
    totalForReverseOrRightControl:totalForReverseOrRightControl,
    reverseOrRightObservation:reverseOrRightObservation,
    totalForReverseOrRightObservation:totalForReverseOrRightObservation, 

    reverseParkControl:reverseParkControl,
    totalForReverseParkControl:totalForReverseParkControl,
    reverseParkObservation:reverseParkObservation,
    totalForReverseParkObservation:totalForReverseParkObservation,

    turnInRoadControl:turnInRoadControl,
    totalForTurnInRoadControl:totalForTurnInRoadControl,
    turnInRoadObservation:turnInRoadObservation,
    totalForTurnInRoadObservation:totalForTurnInRoadObservation, 
    
    taxiManoeuvreControl:taxiManoeuvreControl,
    totalForTaxiManoeuvreControl:totalForTaxiManoeuvreControl,
    taxiManoeuvreObservation:taxiManoeuvreObservation,
    totalForTaxiManoeuvreObservation:totalForTaxiManoeuvreObservation,
    
    isRChecked: isRChecked,
    isCChecked: isCChecked,

    vehicleCheck:vehicleCheck,
    totalForVehicleCheck:totalForVehicleCheck,

    uncoupleOrRecouple:uncoupleOrRecouple,
    totalForUncoupleOrRecouple:totalForUncoupleOrRecouple,

    precautions:precautions,
    totalForPrecautions:totalForPrecautions,

    accelerator:accelerator,
    totalForAccelerator:totalForAccelerator,

    signallingForUseOfMirrors:signallingForUseOfMirrors,
    totalForSignallingForUseOfMirrors:totalForSignallingForUseOfMirrors,
    changeDirectionForUseOfMirrors:changeDirectionForUseOfMirrors,
    totalForChangeDirectionForUseOfMirrors:totalForChangeDirectionForUseOfMirrors,
    changeSpeedForUseOfMirrors:changeSpeedForUseOfMirrors,
    totalForChangeSpeedForUseOfMirrors:totalForChangeSpeedForUseOfMirrors,

    trafficSignalsForResponseToSignsOrSignals:trafficSignalsForResponseToSignsOrSignals,
    totalForTrafficSignalsForResponseToSignsOrSignals:totalForTrafficSignalsForResponseToSignsOrSignals,
    roadMarkingsForResponseToSignsOrSignals:roadMarkingsForResponseToSignsOrSignals,
    totalForRoadMarkingsForResponseToSignsOrSignals:totalForRoadMarkingsForResponseToSignsOrSignals,
    trafficLightsForResponseToSignsOrSignals:trafficLightsForResponseToSignsOrSignals,
    totalForTrafficLightsForResponseToSignsOrSignals:totalForTrafficLightsForResponseToSignsOrSignals,
    trafficControllersForResponseToSignsOrSignals:trafficControllersForResponseToSignsOrSignals,
    totalForTrafficControllersForResponseToSignsOrSignals:totalForTrafficControllersForResponseToSignsOrSignals,
    totalForTrafficControllersForResponseToSignsOrSignals:totalForTrafficControllersForResponseToSignsOrSignals,
    otherRoadUsersForResponseToSignsOrSignals:otherRoadUsersForResponseToSignsOrSignals,
    totalForOtherRoadUsersForResponseToSignsOrSignals:totalForOtherRoadUsersForResponseToSignsOrSignals,

    approachSpeedForJunctions:approachSpeedForJunctions,
    totalForApproachSpeedForJunctions:totalForApproachSpeedForJunctions,
    observationForJunctions:observationForJunctions,
    totalForObservationForJunctions:totalForObservationForJunctions,
    turningRightForJunctions:turningRightForJunctions,
    totalForTurningRightForJunctions:totalForTurningRightForJunctions,
    turningLeftForJunctions:turningLeftForJunctions,
    totalForTurningLeftForJunctions:totalForTurningLeftForJunctions,
    cuttingCornersForJunctions:cuttingCornersForJunctions,
    totalForCuttingCornersForJunctions:totalForCuttingCornersForJunctions,

    overtakingForJudgement:overtakingForJudgement,
    totalForOvertakingForJudgement:totalForOvertakingForJudgement,
    meetingForJudgement:meetingForJudgement,
    totalForMeetingForJudgement:totalForMeetingForJudgement,
    crossingForJudgement:crossingForJudgement,
    totalForCrossingForJudgement:totalForCrossingForJudgement,

    normalDrivingForPositioning:normalDrivingForPositioning,
    totalForNormalDrivingForPositioning:totalForNormalDrivingForPositioning,
    laneDisciplineForPositioning:laneDisciplineForPositioning,
    totalForLaneDisciplineForPositioning:totalForLaneDisciplineForPositioning,

    appropriateSpeedForProgress:appropriateSpeedForProgress,
    totalForAppropriateSpeedForProgress:totalForAppropriateSpeedForProgress,
    undueHesitationForProgress:undueHesitationForProgress,
    totalForUndueHesitationForProgress:totalForUndueHesitationForProgress,

    gears:gears,
    totalForGears:totalForGears,

    footbrake:footbrake,
    totalForFootbrake,

    parkingBrakeOrMCFrontBrake:parkingBrakeOrMCFrontBrake,
    totalForParkingBrakeOrMCFrontBrake:totalForParkingBrakeOrMCFrontBrake,
   
    steering:steering,
    totalForSteering:totalForSteering,

    balanceMOrC:balanceMOrC,
    totalForBalanceMOrC:totalForBalanceMOrC,

    lgvOrPcvGearExercise:lgvOrPcvGearExercise,
    totalForLgvOrPcvGearExercise:totalForLgvOrPcvGearExercise,

    pcvDoorExercise:pcvDoorExercise,
    totalForPcvDoorExercise:totalForPcvDoorExercise,

    safety:safety,
    totalForSafety:totalForSafety,
    
    control:control,
    totalForControl:totalForControl,

    necessaryForSignals:necessaryForSignals,
    totalsOfNecessaryForSignals:totalsOfNecessaryForSignals,
    correctlyForSignals:correctlyForSignals,
    totalOfCorrectlyForSignals:totalOfCorrectlyForSignals,
    timedForSignals:timedForSignals,
    totalOfTimedForSignals:totalOfTimedForSignals,

    clearanceOrObstruction:clearanceOrObstruction,
    totalForClearanceOrObstruction:totalForClearanceOrObstruction,


    useOfSpeed:useOfSpeed,
    totalForUseOfSpeed:totalForUseOfSpeed,
    followingDistance:followingDistance,
    totalForFollowingDistance:totalForFollowingDistance,

    
    pedestrianCrossing:pedestrianCrossing,
    totalForPedestrianCrossing:totalForPedestrianCrossing,

    positionOrNormalStops:positionOrNormalStops,
    totalForPositionOrNormalStops:totalForPositionOrNormalStops,

    awarenessOrPlanning:awarenessOrPlanning,
    totalForAwarenessOrPlanning:totalForAwarenessOrPlanning,

    ancillaryControls:ancillaryControls,
    totalForAncillaryControls:totalForAncillaryControls,

    ecoSafeDriving:ecoSafeDriving,
    totalForEcoSafeDriving:totalForEcoSafeDriving,

    spare1:spare1,
    totalForSpare1:totalForSpare1,

    spare2:spare2,
    totalForSpare2:totalForSpare2,

    spare3:spare3,
    totalForSpare3:totalForSpare3,

    spare4:spare4,
    totalForSpare4:totalForSpare4,

    endresult: endresult,
    totalFaults: totalFaults,
    routeNumber: routeNumber,
    ETA: ETA,
    survey: survey,
    debrief: debrief,
    activityCode: activityCode,
    passCertificateNumber: passCertificateNumber,
    wheelchairCertNo: wheelchairCertNo,
    healthStatusOrConfirmation: healthStatusOrConfirmation,
    declaration: declaration
  };
  const fieldOrder = Object.keys(formData); // This gets the order of the fields
  try {
    await firebase.firestore().collection('driveForm3').add({ name,formData, fieldOrder });
    console.log('Form data successfully written!');
    navigation.navigate('FormList3', { forceRefresh: true }); // Navigate to FormListScreen
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};


// const handleSubmit = async () => {
//   const formData = {
//     userName: name,
//     userEmail: email,
//     formNumber: formNumber,
//     candidateName,
//     applicationRef,
//     date,
//     time,
//     drNo,
//     marks,
//     dtcCodeOrAuthority,
//     regNo,
//     staffOrRefNo,
//     examinerName,
//     catType,
//     adiOrReg,
//     isAutoChecked,
//     isExtChecked,
//     adiCertNo,
//     sup,
//     adi,
//     int,
//     other,
//     eyeSight,
//     vChecked,
//     cChecked,
//     hOrCodeOrSafety,
//     controlStop,
//     reverseOrLeftReverseWithTrailer,
//     reverseOrRight,
//     reversePark,
//     turnInRoad,
//     isRChecked,
//     isCChecked,
//     taxiManoeuvre,
//     moveOff,
//     progress,
//     positioning,
//     useOfMirrors,
//     signals, 
//     junctions,
//     judgement,
//     vehicleCheck,
//     uncoupleOrRecouple,
//     precautions,
//     accelerator,
//     clutch,
//     gears,
//     footbrake,
//     parkingBrakeOrMCFrontBrake,
//     steering,
//     balanceMOrC,
//     lgvOrPcvGearExercise,
//     pcvDoorExercise,
//     useOfSpeed,
//     followingDistance,
//     pedestrianCrossing,
//     positionOrNormalStops,
//     awarenessOrPlanning,
//     ancillaryControls,
//     ecoSafeDriving,
//     spare1,
//     spare2,
//     spare3,
//     spare4,
//     endresult,
//     totalFaults,
//     routeNumber,
//     ETA,
//     survey,
//     debrief,
//     activityCode,
//     passCertificateNumber, 
//     wheelchairCertNo,
//     healthStatusOrConfirmation,
//     declaration
//   };
//   try {
//     await firebase.firestore().collection('driveForm3').add(formData);
//     console.log('Form data successfully written!');
//     navigation.navigate('FormList3', { forceRefresh: true }); // Navigate to FormListScreen
//   } catch (error) {
//     console.error('Error writing document: ', error);
//   }
// };

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


  return (
    <ScrollView>
      <View style={styles.container}> 
      <View style={styles.headerContainermain}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/backbtn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headermain}>Driving Test Form-3</Text>
      </View>
        {/* <View style={{flexDirection:'row', justifyContent:'space-between'}} >
          <Text style={styles.titleMain}>Driving Test Report</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.subtitle}>DL25A</Text>
            <Text style={styles.subtitle}>0407T</Text>
          </View>
        </View> */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>FORM DETAILS</Text>
        </View>
        <View style={styles.row}>
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Candidate Name" 
            onChangeText={setCandidateName} 
            placeholderTextColor='gray'
          />
          <View style={styles.inputHalf}  >
            <View style={styles.row}>
  <Text style={{color:'black', fontWeight:'bold', fontSize:17}}>S</Text>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={sChecked}
    onValueChange={setSChecked}
    style={styles.checkbox}
  />
  </View>
  <Text style={{color:'black', fontWeight:'bold', fontSize:17, marginLeft:10,}}>D/C</Text>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
  <CheckBox
    value={dcChecked}
    onValueChange={setDCChecked}
    style={styles.checkbox}
  />
    </View>
</View>
</View>
         
        </View>

      
        <TextInput 
          style={styles.input} 
          placeholder="Application Ref." 
          onChangeText={setApplicationRef} 
          placeholderTextColor='gray'
        />
        <View style={styles.row}>
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Date" 
            onChangeText={setDate}
            placeholderTextColor='gray'
          />
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Time"  
            onChangeText={setTime}
            placeholderTextColor='gray'
          />
        </View>
        <View style={styles.row}>
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Dr.No."
            onChangeText={setDrNo}
            placeholderTextColor='gray'
          />
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Reg. No."
            onChangeText={setRegNo}
            placeholderTextColor='gray'
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="DTC Code / Authority"
          onChangeText={setDtcCodeOrAuthority}
          placeholderTextColor='gray'
        />
        <View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Examiner Name"
            onChangeText={setExaminerName}
            placeholderTextColor='gray'
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Staff / Ref. No."
            onChangeText={setStaffOrRefNo}
            placeholderTextColor='gray'
          />
        </View>
      
        <View style={styles.declarationContainer}>
  <Text style={styles.declarationText}>I declare that my use of the test vehicle for the purposes of the test is covered by a valid policy of insurance which satisfies the requirements of relevant legislation.</Text>
  <View style={styles.row1}>
    <Text style={{color:'black'}}>Yes</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
          value={declaration === 'Yes'}
          onValueChange={() => handleCheckboxChange67('Yes')}
        />
        </View>
    <Text style={{color:'black'}}>No</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
          value={declaration === 'No'}
          onValueChange={() => handleCheckboxChange67('No')}
        />
        </View>
  </View>
</View>


<View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
            placeholderTextColor='gray'
            placeholder="Category Type" 
            onChangeText={setCatType}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="ADI/Reg Number" 
            onChangeText={setAdiOrReg}
            placeholderTextColor='gray'
          />
        </View>
<View style={styles.inputHalf1} > 
<View style={styles.row1}>
  <Text style={{color:'black', fontWeight:'bold', fontSize:16,}}>Auto</Text>

  <CheckBox
    value={isAutoChecked}
    onValueChange={setIsAutoChecked}
    style={styles.checkbox}
  />

  <Text style={{color:'black', fontWeight:'bold', fontSize:16,}}>Ext</Text>
  <CheckBox
    value={isExtChecked}
    onValueChange={setIsExtChecked}
    style={styles.checkbox}
  />
</View>
</View>

<View style={styles.row}>
  {buttonValues.map((value, index) => (
    <View style={styles.buttonContainer} key={index}>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={value}
        onValueChange={(newValue) => {
          const newButtonValues = [...buttonValues];
          newButtonValues[index] = newValue;
          setButtonValues(newButtonValues);
          if (newValue) {
            setMarks(index + 1);
          }
        }}
        style={styles.checkbox}
      />
      </View>
      <Text style={{color:'black'}}>{index + 1}</Text>
    </View>
  ))}
</View>
<View style={styles.row}>
  {buttonValues2.map((value, index) => (
    <View style={styles.buttonContainer} key={index}>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={value}
        onValueChange={(newValue) => {
          const newButtonValues = [...buttonValues2];
          newButtonValues[index] = newValue;
          setButtonValues2(newButtonValues);
          if (newValue) {
            setMarks(index + 6);
          }
        }}
        style={styles.checkbox}
      />
       </View>
      <Text style={{color:'black'}}>{index + 6}</Text>
    </View>
  ))}
</View>

<View style={styles.row1}>
  <TextInput 
    style={{...styles.inputHalf2, flex: 0.5}} 
    placeholder="ADI Cert. No."
    onChangeText={setAdiCertNo}
    placeholderTextColor='gray'
  />
  <View style={{...styles.buttonContainer, flex: 0.25}} >
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={vChecked}
      onValueChange={setVChecked}
      style={styles.checkbox}
    />
     </View>
    <Text style={{color:'black'}}>V</Text>
  </View>
  <View style={{...styles.buttonContainer, flex: 0.25}} >
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={cChecked}
      onValueChange={setCChecked}
      style={styles.checkbox}
    />
      </View>  
    <Text style={{color:'black'}}>C</Text>
  </View>  
</View>

<View style={styles.row}>
  <View style={styles.buttonContainer1}>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={sup}
      onValueChange={setSup}
      style={styles.checkbox}
    />
     </View>
    <Text style={{color:'black'}}>Sup</Text>
  </View>
  <View style={styles.buttonContainer1}>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={adi}
      onValueChange={setAdi}
      style={styles.checkbox}
    />
    </View>
    <Text style={{color:'black'}}>ADI</Text>
  </View>
  <View style={styles.buttonContainer1}>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={int}
      onValueChange={setInt}
      style={styles.checkbox}
    />
    </View>
    <Text style={{color:'black'}}>Int</Text>
  </View>
  <View style={styles.buttonContainer1}>
  <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={other}
      onValueChange={setOther}
      style={styles.checkbox}
    /> 
      </View>
    <Text style={{color:'black'}}>Other</Text>
  </View>
</View>


<View style={styles.row2}>
  <Text style={styles.label}>Eye Sight</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 5, color:'black' }}>Total:</Text>
          <TextInput  onChangeText={setEyeSightTotal}
        value={eyeSightTotal} placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
        />
        </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={eyeSight === 'S'}
            onValueChange={() => handleEyeSightChange70('S')}
            style={styles.checkbox}
          />
           </View>
    </View>
    <View style={styles.commonBox}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={eyeSight === 'D'}
            onValueChange={() => handleEyeSightChange70('D')}
            style={styles.checkbox}
          />
           </View>
    </View>
   
  </View>
</View>


  
{/* <View style={styles.row2}>
      <Text style={styles.label}>EyeSight</Text>
      <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
        <View  style={styles.commonBox}>
          <Text style={{color:'black'}}>S</Text>
          <CheckBox value={sCheckedEyeSight} onValueChange={setSCheckedEyeSight} />
        </View>
        <View style={styles.commonBox}>
           <Text style={{color:'black'}}>D</Text>
          <CheckBox value={dCheckedEyeSight} onValueChange={setDCheckedEyeSight} />
        </View>
        <View style={styles.commonBox}>
          <Text>Total</Text>
          <CheckBox value={totalCheckedEyeSight} onValueChange={setTotalCheckedEyeSight} />
        </View>
      </View>
    </View> */}

    {/* <View style={styles.row2}>
      <Text style={styles.label}>H/Code/Safety</Text>
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={styles.commonBox}>
            <Text style={{color:'black'}}>S</Text>
            <CheckBox value={sCheckedHCodeSafety} onValueChange={setSCheckedHCodeSafety} />
          </View>
          <View style={styles.commonBox}>
             <Text style={{color:'black'}}>D</Text>
            <CheckBox value={dCheckedHCodeSafety} onValueChange={setDCheckedHCodeSafety} />
          </View>
          <View style={styles.commonBox}>
            <Text>Total</Text>
            <CheckBox value={totalCheckedHCodeSafety} onValueChange={setTotalCheckedHCodeSafety} />
          </View>
        </View>
        <TextInput  style={styles.inputHalf3}  placeholder="" onChangeText={setHCodeInputText} />
      </View>
    </View> */}

<View style={styles.row2}>
  <Text style={styles.label}>H/Code/Safety</Text>
  <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 5, color:'black' }}>Total:</Text>
    <TextInput
      onChangeText={setHOrCodeOrSafetyTotal}
      value={hOrCodeOrSafetyTotal}
      placeholder='Enter Total'
      placeholderTextColor='gray'
      style={{  color:'black'}}
    />
  </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
              value={hOrCodeOrSafety === 'S'}
              onValueChange={() => handleHOrCodeOrSafetyChange('S')}
              style={styles.checkbox}
            />
             </View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
              value={hOrCodeOrSafety === 'D'}
              onValueChange={() => handleHOrCodeOrSafetyChange('D')}
              style={styles.checkbox}
            />
             </View>
      </View>
    
    </View>
   
  </View>
</View>
{/* 
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Control Stop</Text>
      
      <View style={styles.newrow}>
        <View style={styles.checkboxContainer}>
          <Text>Promptness</Text>
          <CheckBox value={promptnessChecked} onValueChange={setPromptnessChecked} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Total</Text>
          <CheckBox value={totalChecked1} onValueChange={setTotalChecked1} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={{color:'black'}}>S</Text>
          <CheckBox value={sChecked1} onValueChange={setSChecked1} />
        </View>
        <View style={styles.checkboxContainer}>
           <Text style={{color:'black'}}>D</Text>
          <CheckBox value={dChecked1} onValueChange={setDChecked1} />
        </View>
      </View>

      <View style={styles.newrow}>
        <View style={styles.checkboxContainer}>
          <Text style={{marginLeft: 30}} >Control</Text>
          <CheckBox value={controlChecked} onValueChange={setControlChecked} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Total</Text>
          <CheckBox value={totalChecked2} onValueChange={setTotalChecked2} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={{color:'black'}}>S</Text>
          <CheckBox value={sChecked2} onValueChange={setSChecked2} />
        </View>
        <View style={styles.checkboxContainer}>
           <Text style={{color:'black'}}>D</Text>
          <CheckBox value={dChecked2} onValueChange={setDChecked2} />
        </View>
      </View>
    </View> */}
    <View style={styles.section}>
  <Text style={styles.sectionTitle}>Control Stop</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Promptness</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={controlStopPromptness === 'S'}
       
        onValueChange={() => handleCheckboxChange('S')}
      />
      </View>
    </View>
    
    <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
       
        onChangeText={setTotalForControlStopPromptness}
        value={totalForControlStopPromptness}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
  </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={controlStopPromptness === 'S'}
        onValueChange={() => handleCheckboxChange('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={controlStopPromptness === 'D'}
        onValueChange={() => handleCheckboxChange('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black'}} >Control</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={controlStopControl === 'S'}
       
        onValueChange={() => handleCheckboxChange1('S')}
      />
       </View>
    </View>
   
    <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
       
       onChangeText={setTotalForControlStopControl}
       value={totalForControlStopControl}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
  </View>
    
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={controlStopControl === 'S'}
        onValueChange={() => handleCheckboxChange1('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={controlStopControl === 'D'}
        onValueChange={() => handleCheckboxChange1('D')}
      />
      </View>
    </View>
  </View>
</View>
{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Control Stop</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Promptness</Text>
      <CheckBox value={controlStop.promptness === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={controlStop.promptness === 'Total'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={controlStop.promptness === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={controlStop.promptness === 'D'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Control</Text>
      <CheckBox value={controlStop.control === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={controlStop.control === 'Total'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={controlStop.control === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={controlStop.control === 'D'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'D' })); }} />
    </View>
  </View>
</View> */}

{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse/ Left Reverse with trailer</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Control</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'Total'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'D'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Observation</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'Total'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'D'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'D' })); }} />
    </View>
  </View>
</View> */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse/ Left Reverse with trailer</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:"black"}} >Control</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrLeftReverseWithTrailerControl === 'S'}
        onValueChange={() => handleCheckboxChange2('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrLeftReverseWithTrailerControl}
        value={totalForReverseOrLeftReverseWithTrailerControl}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrLeftReverseWithTrailerControl === 'S'}
        onValueChange={() => handleCheckboxChange2('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrLeftReverseWithTrailerControl === 'D'}
        onValueChange={() => handleCheckboxChange2('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Observation</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrLeftReverseWithTrailerObservation === 'S'}
        onValueChange={() => handleCheckboxChange3('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrLeftReverseWithTrailerObservation}
        value={totalForReverseOrLeftReverseWithTrailerObservation}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrLeftReverseWithTrailerObservation === 'S'}
        onValueChange={() => handleCheckboxChange3('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrLeftReverseWithTrailerObservation === 'D'}
        onValueChange={() => handleCheckboxChange3('D')}
      />
      </View>
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse/ Right</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black'}} >Control</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrRightControl === 'S'}
        onValueChange={() => handleCheckboxChange4('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrRightControl}
        value={totalForReverseOrRightControl}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}} >S</Text> 
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrRightControl === 'S'}
        onValueChange={() => handleCheckboxChange4('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrRightControl === 'D'}
        onValueChange={() => handleCheckboxChange4('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Observation</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrRightObservation === 'S'}
        onValueChange={() => handleCheckboxChange5('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrRightObservation}
        value={totalForReverseOrRightObservation}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrRightObservation === 'S'}
        onValueChange={() => handleCheckboxChange5('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseOrRightObservation === 'D'}
        onValueChange={() => handleCheckboxChange5('D')}
      />
       </View>
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse Park</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black'}} >Control</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseParkControl === 'S'}
        onValueChange={() => handleCheckboxChange6('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseParkControl}
        value={totalForReverseParkControl}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseParkControl === 'S'}
        onValueChange={() => handleCheckboxChange6('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseParkControl === 'D'}
        onValueChange={() => handleCheckboxChange6('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Observation</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseParkObservation === 'S'}
        onValueChange={() => handleCheckboxChange7('D')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseParkObservation}
        value={totalForReverseParkObservation}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseParkObservation === 'S'}
        onValueChange={() => handleCheckboxChange7('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={reverseParkObservation === 'D'}
        onValueChange={() => handleCheckboxChange7('D')}
      />
      </View>
    </View>
  </View>
</View>




    
    

    <View style={styles.row1}>
  <Text style={{color:'black', fontWeight:'bold', fontSize:16,}}>R</Text>
  
  <CheckBox
    value={isRChecked}
    onValueChange={setIsRChecked}
    style={styles.checkbox}
  />
  <Text style={{color:'black', fontWeight:'bold', fontSize:16,}}>C</Text>
  <CheckBox
    value={isCChecked}
    onValueChange={setIsCChecked}
    style={styles.checkbox}
  />
</View>
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Turn in road</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:"black"}} >Control</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turnInRoadControl === 'S'}
        onValueChange={() => handleCheckboxChange8('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurnInRoadControl}
        value={totalForTurnInRoadControl}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turnInRoadControl === 'S'}
        onValueChange={() => handleCheckboxChange8('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turnInRoadControl === 'D'}
        onValueChange={() => handleCheckboxChange8('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Observation</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

      <CheckBox
        value={turnInRoadObservation === 'S'}
        onValueChange={() => handleCheckboxChange9('S')}
      />
          </View>

    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurnInRoadObservation}
        value={totalForTurnInRoadObservation}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turnInRoadObservation === 'S'}
        onValueChange={() => handleCheckboxChange9('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

      <CheckBox
        value={turnInRoadObservation === 'D'}
        onValueChange={() => handleCheckboxChange9('D')}
      />
       </View>
    </View>
  </View>
</View>


<View style={styles.row2}>
  <Text style={styles.label}>Vehicle Check</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForVehicleCheck}
        value={totalForVehicleCheck}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
 
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

      <CheckBox
        value={vehicleCheck === 'S'}
        onValueChange={() => handleCheckboxChange10('S')}
      />
        </View>
    </View>
    <View style={styles.commonBox}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={vehicleCheck === 'D'}
        onValueChange={() => handleCheckboxChange10('D')}
      />
      </View>
    </View>
   
  </View>
</View>


      
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Taxi Manoeuvre</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black'}} >Control</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={taxiManoeuvreControl === 'S'}
        onValueChange={() => handleCheckboxChange11('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTaxiManoeuvreControl}
        value={totalForTaxiManoeuvreControl}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

      <CheckBox
        value={taxiManoeuvreControl === 'S'}
        onValueChange={() => handleCheckboxChange11('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

      <CheckBox
        value={taxiManoeuvreControl === 'D'}
        onValueChange={() => handleCheckboxChange11('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Observation</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

      <CheckBox
        value={taxiManoeuvreObservation === 'S'}
        onValueChange={() => handleCheckboxChange12('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTaxiManoeuvreObservation}
        value={totalForTaxiManoeuvreObservation}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={taxiManoeuvreObservation === 'S'}
        onValueChange={() => handleCheckboxChange12('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>D</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={taxiManoeuvreObservation === 'D'}
        onValueChange={() => handleCheckboxChange12('D')}
      />
      </View>
    </View>
  </View>
</View>

     
    <View style={styles.row2}>
      <Text style={styles.label}>Taxi wheelchair</Text>
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={styles.commonBox}>
            <Text style={{color:'black'}}>S</Text>
            <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
            <CheckBox value={sCheckedHCodeSafety} onValueChange={setSCheckedHCodeSafety} />
            </View>
          </View>
          
        </View>
      
      </View>
    </View>
      
        
    <View style={styles.row2}> 
    <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Uncouple/</Text>
  <Text style={styles.label}>Recouple</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForUncoupleOrRecouple}
          value={totalForUncoupleOrRecouple}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
 
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

        <CheckBox
          value={uncoupleOrRecouple === 'S'}
          onValueChange={() => handleCheckboxChange13('S')}
        />

</View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={uncoupleOrRecouple === 'D'}
          onValueChange={() => handleCheckboxChange13('D')}
        />
        </View>
      </View>
    
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Precautions</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForPrecautions}
          value={totalForPrecautions}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={precautions === 'S'}
          onValueChange={() => handleCheckboxChange14('S')}
        />
        </View>
      </View>
     
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={precautions === 'D'}
          onValueChange={() => handleCheckboxChange14('D')}
        />
         </View>
      </View>
    </View>
  </View>
</View>
  
    <Text style={styles.NewsectionTitle}>Control</Text>
    
    <View style={styles.row2}>
  <Text style={styles.label}>Accelerator</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForAccelerator}
          value={totalForAccelerator}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={accelerator === 'S'}
          onValueChange={() => handleCheckboxChange15('S')}
        />
         </View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={accelerator === 'D'}
          onValueChange={() => handleCheckboxChange15('D')}
        />
        </View>
      </View>
      
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Clutch</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginLeft: 30, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForClutch}
          value={totalForClutch}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={clutch === 'S'}
          onValueChange={() => handleCheckboxChange16('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={clutch === 'D'}
          onValueChange={() => handleCheckboxChange16('D')}
        />
          </View>
      </View>
     
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Gears</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginLeft: 30, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForGears}
          value={totalForGears}
          placeholder='Enter Total'
          placeholderTextColor='gray' 
          style={{  color:'black'}}
        />
      </View>

  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={gears === 'S'}
          onValueChange={() => handleCheckboxChange17('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={gears === 'D'}
          onValueChange={() => handleCheckboxChange17('D')}
        />
        </View>
      </View>
     
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Footbrake</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForFootbrake}
          value={totalForFootbrake}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={footbrake === 'S'}
          onValueChange={() => handleCheckboxChange18('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={footbrake === 'D'}
          onValueChange={() => handleCheckboxChange18('D')}
        />
        </View>
      </View>
    
    </View>
  </View>
</View>

<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
    <Text style={styles.label}>Parking brake/</Text>
    <Text style={styles.label}>MC front brake</Text>
  
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForParkingBrakeOrMCFrontBrake}
          value={totalForParkingBrakeOrMCFrontBrake}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

        <CheckBox
          value={parkingBrakeOrMCFrontBrake === 'S'}
          onValueChange={() => handleCheckboxChange19('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>D</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

        <CheckBox
          value={parkingBrakeOrMCFrontBrake === 'D'}
          onValueChange={() => handleCheckboxChange19('D')}
        />
        </View>
      </View>
     
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Steering</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginLeft: 30, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForSteering}
          value={totalForSteering}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={steering === 'S'}
          onValueChange={() => handleCheckboxChange20('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
         <Text style={{color:'black'}}>D</Text>
         <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >

        <CheckBox
          value={steering === 'D'}
          onValueChange={() => handleCheckboxChange20('D')}
        />
          </View>
      </View>
     
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Balance M/C</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForBalanceMOrC}
          value={totalForBalanceMOrC}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={balanceMOrC === 'S'}
          onValueChange={() => handleCheckboxChange21('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
         <Text style={{color:'black'}}>D</Text>
         <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={balanceMOrC === 'D'}
          onValueChange={() => handleCheckboxChange21('D')}
        />
        </View>
      </View>
     
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:"column"}} >
  <Text style={styles.label}>LGV/ PCV gear</Text>
 
  <Text style={styles.label}>exercise</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForLgvOrPcvGearExercise}
          value={totalForLgvOrPcvGearExercise}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={lgvOrPcvGearExercise === 'S'}
          onValueChange={() => handleCheckboxChange22('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
         <Text style={{color:'black'}}>D</Text>
         <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={lgvOrPcvGearExercise === 'D'}
          onValueChange={() => handleCheckboxChange22('D')}
        />
          </View>
      </View>
    
    </View>
  </View>
</View>

<View style={styles.row2}>
  <View style={{flexDirection:"column"}}>
  <Text style={styles.label}>PCV door </Text>
  <Text style={styles.label}>exercise</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForPcvDoorExercise}
          value={totalForPcvDoorExercise}
          placeholder='Enter Total'
          placeholderTextColor='gray'
          style={{  color:'black'}}
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
        <Text style={{color:'black'}}>S</Text>
        <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={pcvDoorExercise === 'S'}
          onValueChange={() => handleCheckboxChange23('S')}
        />
        </View>
      </View>
      <View style={styles.commonBox}>
         <Text style={{color:'black'}}>D</Text>
         <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
        <CheckBox
          value={pcvDoorExercise === 'D'}
          onValueChange={() => handleCheckboxChange23('D')}
        />
        </View>
      </View>
     
    </View>
  </View>
</View>

    <View style={styles.section}>
  <Text style={styles.sectionTitle}>Move Off</Text>
  
  <View style={styles.newrow}>
  <View style={styles.checkboxContainer}>
    <Text style={{color:'black'}} >Safety</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={safety === 'S'}
      onValueChange={() => handleCheckboxChange24('S')}
    />
      </View>
  </View>
  <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
      onChangeText={setTotalForSafety}
      value={totalForSafety}
      placeholder='Enter Total'
      placeholderTextColor='gray'
      style={{  color:'black'}}
    />
  </View>
  <View style={styles.checkboxContainer}>
    <Text style={{color:'black'}}>S</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={safety === 'S'}
      onValueChange={() => handleCheckboxChange24('S')}
    />
    </View>
  </View>
  <View style={styles.checkboxContainer}>
     <Text style={{color:'black'}}>D</Text>
     <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={safety === 'D'}
      onValueChange={() => handleCheckboxChange24('D')}
    />
    </View>
  </View>
</View>

<View style={styles.newrow}>
  <View style={styles.checkboxContainer}>
    <Text style={{color:'black'}}>Control</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={control === 'S'}
      onValueChange={() => handleCheckboxChange26('S')}
    />
      </View>
  </View>
  <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
      onChangeText={setTotalForControl}
      value={totalForControl}
      placeholder='Enter Total'
      placeholderTextColor='gray'
      style={{  color:'black'}}
    />
  </View>
  <View style={styles.checkboxContainer}>
    <Text style={{color:'black'}}>S</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={control === 'S'}
      onValueChange={() => handleCheckboxChange26('S')}
    />
     </View>
  </View>
  <View style={styles.checkboxContainer}>
     <Text style={{color:'black'}}>D</Text>
     <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
      value={control === 'D'}
      onValueChange={() => handleCheckboxChange26('D')}
    />
    </View>
  </View>
</View>
</View>

{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Use of mirrors- M/C rear obs</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Signalling</Text>
      <CheckBox value={useOfMirrors.signalling === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={useOfMirrors.signalling === 'Total'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={useOfMirrors.signalling === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={useOfMirrors.signalling === 'D'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Change Directions</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'Total'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'D'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Change Speed</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'Total'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'D'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'D' })); }} />
    </View>
  </View>
</View> */}

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Use of mirrors- M/C rear obs</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}} >Signalling</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={signallingForUseOfMirrors === 'S'}
        onValueChange={() => handleCheckboxChange27('S')}
      />
        </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSignallingForUseOfMirrors}
        value={totalForSignallingForUseOfMirrors}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={signallingForUseOfMirrors === 'S'}
        onValueChange={() => handleCheckboxChange27('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={signallingForUseOfMirrors === 'D'}
        onValueChange={() => handleCheckboxChange27('D')}
      />
      </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Change </Text>
      <Text style={{color:'black'}}>Directions</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={changeDirectionForUseOfMirrors === 'S'}
        onValueChange={() => handleCheckboxChange28('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForChangeDirectionForUseOfMirrors}
        value={totalForChangeDirectionForUseOfMirrors}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={changeDirectionForUseOfMirrors === 'S'}
        onValueChange={() => handleCheckboxChange28('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={changeDirectionForUseOfMirrors === 'D'}
        onValueChange={() => handleCheckboxChange28('D')}
      />
      </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Change </Text>
      <Text style={{color:'black'}}>Speed</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={changeSpeedForUseOfMirrors === 'S'}
        onValueChange={() => handleCheckboxChange29('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForChangeSpeedForUseOfMirrors}
        value={totalForChangeSpeedForUseOfMirrors}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={changeSpeedForUseOfMirrors === 'S'}
        onValueChange={() => handleCheckboxChange29('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={changeSpeedForUseOfMirrors === 'D'}
        onValueChange={() => handleCheckboxChange29('D')}
      />
      </View>
    </View>
  </View>
</View>

{/*       
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Necessary</Text>
      <CheckBox value={signals.necessary === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={signals.necessary === 'Total'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={signals.necessary === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={signals.necessary === 'D'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Correctly</Text>
      <CheckBox value={signals.correctly === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={signals.correctly === 'Total'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={signals.correctly === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={signals.correctly === 'D'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Timed</Text>
      <CheckBox value={signals.timed === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={signals.timed === 'Total'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <CheckBox value={signals.timed === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
      <CheckBox value={signals.timed === 'D'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'D' })); }} />
    </View>
  </View>
</View> */}


<View style={styles.section}>
  <Text style={styles.sectionTitle}>Signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Necessary</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={necessaryForSignals === 'S'}
        onValueChange={() => handleCheckboxChange30('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalsOfNecessaryForSignals}
        value={totalsOfNecessaryForSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={necessaryForSignals === 'S'}
        onValueChange={() => handleCheckboxChange30('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={necessaryForSignals === 'D'}
        onValueChange={() => handleCheckboxChange30('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Correctly</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={correctlyForSignals === 'S'}
        onValueChange={() => handleCheckboxChange31('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalOfCorrectlyForSignals}
        value={totalOfCorrectlyForSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={correctlyForSignals === 'S'}
        onValueChange={() => handleCheckboxChange31('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={correctlyForSignals === 'D'}
        onValueChange={() => handleCheckboxChange31('D')} />
        </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Timed</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={timedForSignals === 'S'}
        onValueChange={() => handleCheckboxChange32('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalOfTimedForSignals}
        value={totalOfTimedForSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={timedForSignals === 'S'}
        onValueChange={() => handleCheckboxChange32('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={timedForSignals === 'D'}
        onValueChange={() => handleCheckboxChange32('D')}
      />
      </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Clearance/ </Text>
  <Text style={styles.label}>obstruction</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForClearanceOrObstruction}
        value={totalForClearanceOrObstruction}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={clearanceOrObstruction === 'S'}
        onValueChange={() => handleCheckboxChange33('S')}
      />
       </View>
    </View>
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={clearanceOrObstruction === 'D'}
        onValueChange={() => handleCheckboxChange33('D')}
      />
       </View>
    </View>
   
  </View>
</View>

    
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Response to signs/ signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Traffic </Text>
      <Text style={{color:'black'}}>Signals</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficSignalsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange34('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTrafficSignalsForResponseToSignsOrSignals}
        value={totalForTrafficSignalsForResponseToSignsOrSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficSignalsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange34('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficSignalsForResponseToSignsOrSignals === 'D'}
        onValueChange={() => handleCheckboxChange34('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Road </Text>
      <Text style={{color:'black'}}>Markings</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={roadMarkingsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange35('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForRoadMarkingsForResponseToSignsOrSignals}
        value={totalForRoadMarkingsForResponseToSignsOrSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={roadMarkingsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange35('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={roadMarkingsForResponseToSignsOrSignals === 'D'}
        onValueChange={() => handleCheckboxChange35('D')}
      />
      </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Traffic </Text>
      <Text style={{color:'black'}}>Lights</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficLightsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange36('S')}
      />
        </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTrafficLightsForResponseToSignsOrSignals}
        value={totalForTrafficLightsForResponseToSignsOrSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficLightsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange36('S')}
      />
         </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficLightsForResponseToSignsOrSignals === 'D'}
        onValueChange={() => handleCheckboxChange36('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Traffic </Text>
      <Text style={{color:'black'}}>Controllers</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficControllersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange37('S')}
      />
         </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTrafficControllersForResponseToSignsOrSignals}
        value={totalForTrafficControllersForResponseToSignsOrSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficControllersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange37('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={trafficControllersForResponseToSignsOrSignals === 'D'}
        onValueChange={() => handleCheckboxChange37('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Other Road </Text>
      <Text style={{color:'black'}}>Users</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={otherRoadUsersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange38('S')}
      />
        </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForOtherRoadUsersForResponseToSignsOrSignals}
        value={totalForOtherRoadUsersForResponseToSignsOrSignals}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={otherRoadUsersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => handleCheckboxChange38('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={otherRoadUsersForResponseToSignsOrSignals === 'D'}
        onValueChange={() => handleCheckboxChange38('D')}
      />
      </View>
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Use of Speed</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForUseOfSpeed}
        value={totalForUseOfSpeed}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={useOfSpeed === 'S'}
        onValueChange={() => handleCheckboxChange40('S')}
      />
       </View>
    </View>
  
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={useOfSpeed === 'D'}
        onValueChange={() => handleCheckboxChange40('D')}
      />
       </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Following</Text>
  <Text style={styles.label}>distance</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForFollowingDistance}
        value={totalForFollowingDistance}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={followingDistance === 'S'}
        onValueChange={() => handleCheckboxChange41('S')}
      />
       </View>
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={followingDistance === 'D'}
        onValueChange={() => handleCheckboxChange41('D')}
      />
      </View>
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Progress</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection:"column"}} >
      <Text style={{color:'black'}}>Appropriate</Text>
      <Text style={{color:'black'}}>Speed</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={appropriateSpeedForProgress === 'S'}
        onValueChange={() => handleCheckboxChange42('S')}
      />
       </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForAppropriateSpeedForProgress}
        value={totalForAppropriateSpeedForProgress}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={appropriateSpeedForProgress === 'S'}
        onValueChange={() => handleCheckboxChange42('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={appropriateSpeedForProgress === 'D'}
        onValueChange={() => handleCheckboxChange42('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:"column"}} >
      <Text style={{color:'black'}}>Undue</Text>
      <Text style={{color:'black'}}>Hesitation</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={undueHesitationForProgress === 'S'}
        onValueChange={() => handleCheckboxChange43('S')}
      />
        </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForUndueHesitationForProgress}
        value={totalForUndueHesitationForProgress}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={undueHesitationForProgress === 'S'}
        onValueChange={() => handleCheckboxChange43('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={undueHesitationForProgress === 'D'}
        onValueChange={() => handleCheckboxChange43('D')}
      />
        </View>
    </View>
  </View>
</View>



<View style={styles.section}>
  <Text style={styles.sectionTitle}>Junctions</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Approach </Text>
      <Text style={{color:'black'}}>Speed</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={approachSpeedForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange44('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForApproachSpeedForJunctions}
        value={totalForApproachSpeedForJunctions}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={approachSpeedForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange44('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={approachSpeedForJunctions === 'D'}
        onValueChange={() => handleCheckboxChange44('D')}
      />
        </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Observation</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={observationForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange45('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForObservationForJunctions}
        value={totalForObservationForJunctions}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={observationForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange45('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={observationForJunctions === 'D'}
        onValueChange={() => handleCheckboxChange45('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Turning </Text>
      <Text style={{color:'black'}}>Right</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turningRightForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange46('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurningRightForJunctions}
        value={totalForTurningRightForJunctions}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turningRightForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange46('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turningRightForJunctions === 'D'}
        onValueChange={() => handleCheckboxChange46('D')}
      />
      </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Turning </Text>
      <Text style={{color:'black'}}>Left</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turningLeftForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange4x('S')}
      />
        </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurningLeftForJunctions}
        value={totalForTurningLeftForJunctions}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turningLeftForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange4x('S')}
      />
       </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={turningLeftForJunctions === 'D'}
        onValueChange={() => handleCheckboxChange4x('D')}
      />
      </View>
    </View>
  </View>
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Cutting </Text>
      <Text style={{color:'black'}}>Corners</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={cuttingCornersForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange47('S')}
      />
        </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForCuttingCornersForJunctions}
        value={totalForCuttingCornersForJunctions}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={cuttingCornersForJunctions === 'S'}
        onValueChange={() => handleCheckboxChange47('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={cuttingCornersForJunctions === 'D'}
        onValueChange={() => handleCheckboxChange47('D')}
      />
      </View>
    </View>
  </View>
</View>

 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Judgement</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}} >Overtaking</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={overtakingForJudgement === 'S'}
        onValueChange={() => handleCheckboxChange48('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForOvertakingForJudgement}
        value={totalForOvertakingForJudgement}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={overtakingForJudgement === 'S'}
        onValueChange={() => handleCheckboxChange48('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={overtakingForJudgement === 'D'}
        onValueChange={() => handleCheckboxChange48('D')}
      />
      </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Meeting</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={meetingForJudgement === 'S'}
        onValueChange={() => handleCheckboxChange49('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForMeetingForJudgement}
        value={totalForMeetingForJudgement}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={meetingForJudgement === 'S'}
        onValueChange={() => handleCheckboxChange49('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={meetingForJudgement === 'D'}
        onValueChange={() => handleCheckboxChange49('D')}
      />
      </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>Crossing</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={crossingForJudgement === 'S'}
        onValueChange={() => handleCheckboxChange50('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForCrossingForJudgement}
        value={totalForCrossingForJudgement}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
  
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={crossingForJudgement === 'S'}
        onValueChange={() => handleCheckboxChange50('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={crossingForJudgement === 'D'}
        onValueChange={() => handleCheckboxChange50('D')}
      />
      </View>
    </View>
  </View>
</View>

               
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Positioning</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection:'column'}} >
      <Text  style={{color:'black'}}>Normal</Text>
      <Text style={{color:'black'}}>Driving</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={normalDrivingForPositioning === 'S'}
        onValueChange={() => handleCheckboxChange51('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForNormalDrivingForPositioning}
        value={totalForNormalDrivingForPositioning}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={normalDrivingForPositioning === 'S'}
        onValueChange={() => handleCheckboxChange51('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={normalDrivingForPositioning === 'D'}
        onValueChange={() => handleCheckboxChange51('D')}
      />
       </View>
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}} >Lane</Text>
      <Text style={{color:'black'}}>Discipline</Text>
      </View>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={laneDisciplineForPositioning === 'S'}
        onValueChange={() => handleCheckboxChange53('S')}
      />
      </View>
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForLaneDisciplineForPositioning}
        value={totalForLaneDisciplineForPositioning}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={laneDisciplineForPositioning === 'S'}
        onValueChange={() => handleCheckboxChange53('S')}
      />
      </View>
    </View>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={laneDisciplineForPositioning === 'D'}
        onValueChange={() => handleCheckboxChange53('D')}
      />
      </View>
    </View>
  </View>
</View>

<View style={styles.row2}>
  <View style={{flexDirection:'column'}}>
  <Text style={styles.label}>Pedestrian</Text>
  <Text style={styles.label}>Crossing</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForPedestrianCrossing}
        value={totalForPedestrianCrossing}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={pedestrianCrossing === 'S'}
        onValueChange={() => handleCheckboxChange54('S')}
      />
      </View>
    </View>
    
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={pedestrianCrossing === 'D'}
        onValueChange={() => handleCheckboxChange54('D')}
      />
       </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Position/</Text>
  <Text style={styles.label}>normal stops</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForPositionOrNormalStops}
        value={totalForPositionOrNormalStops}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={positionOrNormalStops === 'S'}
        onValueChange={() => handleCheckboxChange55('S')}
      />
       </View>
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={positionOrNormalStops === 'D'}
        onValueChange={() => handleCheckboxChange55('D')}
      />
      </View>
    </View>
  </View>
</View><View style={styles.row2}>
  <View style={{flexDirection:"column"}} >
  <Text style={styles.label}>Awareness/</Text>
  <Text style={styles.label}> Planning</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForAwarenessOrPlanning}
        value={totalForAwarenessOrPlanning}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={awarenessOrPlanning === 'S'}
        onValueChange={() => handleCheckboxChange56('S')}
      />
       </View>
    </View>
    
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={awarenessOrPlanning === 'D'}
        onValueChange={() => handleCheckboxChange56('D')}
      />
      </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}}>
  <Text style={styles.label}>Ancillary</Text>
  <Text style={styles.label}>controls</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForAncillaryControls}
        value={totalForAncillaryControls}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={ancillaryControls === 'S'}
        onValueChange={() => handleCheckboxChange57('S')}
      />
    </View>
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={ancillaryControls === 'D'}
        onValueChange={() => handleCheckboxChange57('D')}
      />
      </View>
    </View>
  </View>
</View>

    

<View style={styles.row2}>
  <View style={{flexDirection:"column"}}>
  <Text style={styles.label}>Eco Safe</Text>
  <Text style={styles.label}>Driving</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForEcoSafeDriving}
        value={totalForEcoSafeDriving}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={ecoSafeDriving === 'S'}
        onValueChange={() => handleCheckboxChange58('S')}
      />
      </View>
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={ecoSafeDriving === 'D'}
        onValueChange={() => handleCheckboxChange58('D')}
      />
      </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Spare-1</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare1}
        value={totalForSpare1}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare1 === 'S'}
        onValueChange={() => handleCheckboxChange60('S')}
      />
      </View>
   
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare1 === 'D'}
        onValueChange={() => handleCheckboxChange60('D')}
      />
      </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Spare-2</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare2}
        value={totalForSpare2}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare2 === 'S'}
        onValueChange={() => handleCheckboxChange61('S')}
      />
      </View>
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare2 === 'D'}
        onValueChange={() => handleCheckboxChange61('D')}
      />
      </View>
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Spare-3</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare3}
        value={totalForSpare3}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare3 === 'S'}
        onValueChange={() => handleCheckboxChange62('S')}
      />
       </View>
    </View>

    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare3 === 'D'}
        onValueChange={() => handleCheckboxChange62('D')}
      />
      </View>
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Spare-4</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare4}
        value={totalForSpare4}
        placeholder='Enter Total'
        placeholderTextColor='gray'
        style={{  color:'black'}}
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black'}}>S</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare4 === 'S'}
        onValueChange={() => handleCheckboxChange63('S')}
      />
      </View>
    </View>
   
    <View style={styles.commonBox}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
        value={spare4 === 'D'}
        onValueChange={() => handleCheckboxChange63('D')}
      />
    </View>
    </View>
  </View>
</View>
    <View style={styles.sectionnew}>
      <Text style={styles.sectionTitle}>Wheelchair</Text>
      
      <View style={styles.newrow1}>
        <View style={styles.checkboxContainer}>
          <Text style={{color:'black'}}>Pass</Text>
          <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
          <CheckBox value={wheelchairPassChecked} onValueChange={setWheelchairPassChecked} />
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={{color:'black'}}> Fail</Text>
          <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
          <CheckBox value={wheelchairFailChecked} onValueChange={setWheelchairFailChecked} />
          </View>
        </View>
      </View>
    </View>
    <View style={styles.uniqueSection}>
    
      
    <View style={styles.uniqueRow}>
  <View style={styles.uniqueCheckboxContainer}>
    <Text style={{color:'black'}}>Pass</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
          value={endresult === 'Pass'}
          onValueChange={() => handleCheckboxChange66('Pass')}
        />
        </View>
  </View>
  <View style={styles.uniqueCheckboxContainer}>
    <Text style={{color:'black'}}>Fail</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
          value={endresult === 'Fail'}
          onValueChange={() => handleCheckboxChange66('Fail')}
        />
          </View>
  </View>
  <View style={styles.uniqueCheckboxContainer}>
    <Text style={{color:'black'}}>None</Text>
    <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
    <CheckBox
          value={endresult === 'None'}
          onValueChange={() => handleCheckboxChange66('None')}
        />
         </View>
  </View>
</View>


      <View style={styles.uniqueRow}>
        <View style={styles.uniqueInputContainer}>
          <TextInput placeholder="Total Faults" value={totalFaults} onChangeText={setTotalFaults} placeholderTextColor='gray'  style={{  color:'black'}} />
        </View>
        <View style={styles.uniqueInputContainer}>
          <TextInput placeholder="Route No." value={routeNumber} onChangeText={setRouteNumber} placeholderTextColor='gray'  style={{  color:'black'}} />
        </View>
      </View>
    </View>

    <View style={styles.uniqueSection}>
      
      
    <View style={styles.uniqueRow}>
  <View style={styles.etaContainer}>
    <Text style={{fontSize:16, fontWeight:'bold',marginRight: 15, color:'black' }}>ETA: </Text>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>V</Text>
      {/* <CheckBox value={ETA === 'V'} onValueChange={(newValue) => { if (newValue) setETA('V'); }} /> */}
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={ETA === 'V'}
            onValueChange={() => handleCheckboxChange65('V')}
          />
   </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>P</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={ETA === 'P'}
            onValueChange={() => handleCheckboxChange65('P')}
          />
          </View>
    </View>
    <View style={styles.snContainer}>
      <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>SN</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={ETA === 'SN'}
            onValueChange={() => handleCheckboxChange65('SN')}
          />
          </View>
    </View>
  </View>
</View>

    </View>

    <View style={styles.uniqueSection}>
  <Text style={styles.uniqueSectionTitle1}>Survey</Text>
  
  <View style={styles.uniqueRow}>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>A</Text>
      {/* <CheckBox value={survey === 'A'} onValueChange={(newValue) => { if (newValue) setSurvey('A'); }} /> */}
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'A'}
            onValueChange={() => handleCheckboxChange64('A')}
          />
          </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>B</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'B'}
            onValueChange={() => handleCheckboxChange64('B')}
          />
          </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>C</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'C'}
            onValueChange={() => handleCheckboxChange64('C')}
          />
           </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
       <Text style={{color:'black'}}>D</Text>
       <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
       <CheckBox
            value={survey === 'D'}
            onValueChange={() => handleCheckboxChange64('D')}
          />
          </View>
    </View>
  </View>

  <View style={styles.uniqueRow}>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>E</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'E'}
            onValueChange={() => handleCheckboxChange64('E')}
          />
           </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>F</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'F'}
            onValueChange={() => handleCheckboxChange64('F')}
          />
          </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>G</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'G'}
            onValueChange={() => handleCheckboxChange64('G')}
          />
           </View>
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black'}}>H</Text>
      <View style={[styles.checkbox, scheme === 'dark' && darkStyles.checkbox]} >
      <CheckBox
            value={survey === 'H'}
            onValueChange={() => handleCheckboxChange64('H')}
          />
          </View>
    </View>
  </View>
</View>


    <View style={styles.surveySection}>
      
      
      <View style={styles.surveyRow}>
        <View style={styles.surveyInputContainer1}>
        <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>Debrief:</Text>
          <TextInput value={debrief} onChangeText={setDebrief} placeholderTextColor='gray'  style={{  color:'black'}} />
        </View>
        <View style={styles.surveyInputContainer2}>
        <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>Activity Code:</Text>
          <TextInput  value={activityCode} onChangeText={setActivityCode} placeholderTextColor='gray'  style={{  color:'black'}}  />
        </View>
      </View>
    </View>

    <View style={styles.renamedSection}>
      <View style={styles.renamedColumn}>
      <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>I acknowledge receipt of Pass Certificate Number:</Text>
        <TextInput placeholder="Enter Pass Certificate Number:" value={passCertificateNumber} onChangeText={setPassCertificateNumber} placeholderTextColor='gray'  style={{  color:'black'}}/>
        <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>Wheelchair Cert. No:</Text>
        <TextInput placeholder="Enter Cert. No.:" value={wheelchairCertNo} onChangeText={setWheelchairCertNo} placeholderTextColor='gray'  style={{  color:'black'}} />
      </View>
    </View>

      
    <View style={styles.renamedSection}>
      <View style={styles.renamedColumn}>
      <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>There has been no change to my health: see note 29 overleaf.</Text>
        <TextInput placeholder="Enter confirmation" value={healthStatusOrConfirmation} onChangeText={setHealthStatusOrConfirmation} placeholderTextColor='gray'  style={{  color:'black'}} />
       
      </View>
    </View>

    
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width  * 0.025, // 10/400
    backgroundColor:'#b5daaf'
  },
  headerContainermain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10
  },
  headermain: {
    fontSize: isFoldable ? height * 0.027: height * 0.025,
    fontWeight: 'bold',
    alignSelf:'center',
    marginLeft: isFoldable?'24%':'12%',
    color:'black'
  },
  titleContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontSize: width  * 0.05, // 20/400
    fontWeight: 'bold',
    color:'black'
  },
  subtitle: {
    fontSize: width  * 0.020, // 12/400
    fontWeight: 'bold',
    color:'black'
  },
  titleMain: {
    fontSize: width  * 0.055, // 22/400
    fontWeight: 'bold',
    color:'black',
    alignSelf:'center',
    marginBottom: height * 0.0166, // 15/900
    marginLeft: width  * 0.220, // 22% of window width
    marginTop: height * 0.0111, // 10/900
  },
  headerContainer: {
    marginBottom: height * 0.0111, // 10/900
  },
  header: {
    fontSize: isFoldable ? height * 0.020: height * 0.018,// 16/400
    fontWeight: 'bold',
    color:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    color: 'black'
  },
  inputSmall: {
    width: 30,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    marginLeft: 5,
  },
  inputHalf: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    flex: 0.5,
    color:'black'
  },
  inputHalf2:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    flex: 0.5,
    color:'black'
  },

  inputHalf3: {
    height: 30,
    borderColor: 'gray',
    width:160,
   alignSelf:'flex-end',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor:'white',
    fontSize:15,
    marginLeft: 10,
    color:'black'
    
  },
 
  inputHalf1: {
    height: 40,
    borderColor: 'gray',
   
    paddingLeft: 10,
    marginBottom: 10,
    color:'black',
    flex: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catrow: {
    flexDirection: 'row',
    
  },
  catinput:{
    
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    color: 'black',
    marginLeft: 10
  },
  adirow: {
    flexDirection: 'row',
    
  },
  adiinput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    color: 'black',
    marginLeft: 10
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: 'gray',
    backgroundColor:'white'
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black',
    marginRight: 10
  },

  commonBox:{
    flexDirection:'row', 
    alignItems: 'center',  
    backgroundColor:'white',
    marginBottom: 5
  },
  declarationContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  declarationText: {
    color: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 67,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 86,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
  },
  commonBox:{
    flexDirection:'row', alignItems: 'center',  backgroundColor:'white'
  },

  section: {
    marginBottom: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: 'gray',
  },

  sectionnew: {
    marginBottom: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: 'gray',
    flexDirection:'row',
    justifyContent:"space-between"
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  NewsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
    alignSelf:'center'
  },

  newrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor:"white"
  },
  newrow1: {
    flexDirection: 'row',
    alignSelf:'center',
    marginBottom: 10,
    backgroundColor:"white",
    marginLeft: 20,
    justifyContent:'flex-end'
  },


  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uniqueSection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },

  uniqueSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  uniqueSectionTitle1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
    alignSelf:'center'
  },

  uniqueRow: {
    flexDirection: 'row',
    alignSelf:'stretch',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  uniqueCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  uniqueInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    flex: 1,
  borderBottomWidth:0.3,
  color:'gray'
  },
  uniqueSection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  snContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  surveySection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },

  surveySectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },

  surveyRow: {
    flexDirection: 'row',
    alignSelf:'stretch',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  surveyInputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'35%',
    marginRight: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  surveyInputContainer12: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'37%',
    marginLeft: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'black',
   
    alignSelf:'center'
    
  },
  surveyInputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'65%',
    marginRight: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  renamedSection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },

  renamedSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },

  renamedColumn: {
    flexDirection: 'column',
    alignSelf:'stretch',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#61b08e',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'700'
  },
  totalinput:{
    borderWidth:0,
    height:32,
    marginLeft:15,
    marginRight:15,
    fontSize:15
  }

});

const darkStyles = StyleSheet.create({
  checkbox: {
    backgroundColor: '#b5daaf',
    flexDirection: 'row', alignItems: 'center'
  },
});

export default DriveForm3;
