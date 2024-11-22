import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Signature from 'react-native-signature-canvas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

// Icon.loadFont();
const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const images = [
  require('../instructionimages/first1.png'),
  require('../instructionimages/second1.png'),
  require('../instructionimages/i44.png'),
  require('../instructionimages/i3new1.png'),
  require('../instructionimages/cockpit-checks-11.png'),
  require('../instructionimages/mirrors1new.png'),
  require('../instructionimages/mirrors2new1.png'),
  require('../instructionimages/gearsnew.png'),
  require('../instructionimages/automaticgearsnew.png'),
  require('../instructionimages/pedalsnew.png'),
  require('../instructionimages/pedals-2new.png'),
  require('../instructionimages/pedals-brakenew.png'),
  require('../instructionimages/steeringnew.png'),
  require('../instructionimages/givingsignalsnew.png'),
  require('../instructionimages/MovingOfffnew.png'),
  require('../instructionimages/MovingOff2new1.png'),
  require('../instructionimages/PullingLeftnew.png'),
  require('../instructionimages/PullingLeft2new.png'),
  require('../instructionimages/EmergingLeftnew1.png'),
  require('../instructionimages/EmergingLeft2new.png'),
  require('../instructionimages/EmergingRightnew.png'),
  require('../instructionimages/EmergingRight2new.png'),
  require('../instructionimages/TurningLeftnew.png'),
  require('../instructionimages/TurningLeft2new1.png'),
  require('../instructionimages/TurningRightnew1.png'),
  require('../instructionimages/TurningRight2new1.png'),
  require('../instructionimages/otherjunctionsnew1.png'),
  require('../instructionimages/CrossRoadsnew1.png'),
  require('../instructionimages/OtherCrossroadsnew1.png'),
  require('../instructionimages/TrafficLightsnew1.png'),
  require('../instructionimages/TrafficLights2new1.png'),
  require('../instructionimages/TrafficLights3new1.png'),
  require('../instructionimages/Roundaboutsnew1.png'),
  require('../instructionimages/Roundaboutsleftnew1.png'),
  require('../instructionimages/RoundAheadnew1.png'),
  require('../instructionimages/RoundRightnew1.png'),
  require('../instructionimages/RoundSpiralnew1.png'),
  require('../instructionimages/RoundTrafficnew1.png'),
  require('../instructionimages/MiniRoundnew1.png'),
  require('../instructionimages/MiniRound2new1.png'),
  require('../instructionimages/OneWayStreetnew1.png'),
  require('../instructionimages/OneWayStreet2new1.png'),
  require('../instructionimages/Zebranew1.png'),
  require('../instructionimages/LightControllednew1.png'),
  require('../instructionimages/DualCarrnew1.png'),
  require('../instructionimages/DualCarr2new1.png'),
  require('../instructionimages/Motorwaysnew1.png'),
  require('../instructionimages/ruralnew1.png'),
  require('../instructionimages/TurningRoadsnew1.png'),
  require('../instructionimages/LeftReversenew1.png'),
  require('../instructionimages/PullRightnew1.png'),
  require('../instructionimages/Forwardnew1.png'),
  require('../instructionimages/Reversenew12.png'),
  require('../instructionimages/ParallelPark1.png'),
];

const imageNames = [
  'Basic Procedures- Part-1',
  'Basic Procedures- Part-2',
  'Controls',
  'Cockpit Checks-Part-1',
  'Cockpit Checks-Part-2',
  'Mirrors Part-1',
  'Mirrors Part-2',
  'Gears',
  'Automatic Gears',
  'Pedals-Clutch Part-1',
  'Pedals-Clutch Part-2',
  'Pedals-Accelerator & Brake',
  'Steering & Parking Brake',
  'Giving Signals',
  'Moving Off Part-1',
  'Moving Off Part-2',
  'Pulling Up On The Left Part-1',
  'Pulling Up On The Left Part-2',
  'Emerging Left Part-1',
  'Emerging Left Part-2',
  'Emerging Right Part-1',
  'Emerging Right Part-2',
  'Turning Left Part-1',
  'Turning Left Part-2',
  'Turning Right Part-1',
  'Turning Right Part-2',
  'Other Junctions',
  'Crossroads',
  'Other Crossroads',
  'Traffic Lights Part-1',
  'Traffic Lights Part-2',
  'Traffic Lights Part-3',
  'Roundabouts',
  'Roundabouts- Left',
  'Roundabouts- Ahead',
  'Roundabouts- Right',
  'Roundabouts- Spiral',
  'Roundabouts with Traffic Lights',
  'Mini Roundabouts Part-1',
  'Mini Roundabouts Part-2',
  'One Way Streets Part-1',
  'One Way Streets Part-2',
  'Zebra Crossings',
  'Light Controlled Crossings',
  'Dual Carriageways Part-1',
  'Dual Carriageways Part-2',
  'Motorways',
  'Rural Roads',
  'Turn In The Road',
  'Left Reverse',
  'Pull Up On The Right And Reverse',
  'Forward Bay Park',
  'Reverse Bay Park',
  'Parallel Park',
  'Reverse Bay Park',
];
export default function InstructionScreen() {
  const [search, setSearch] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const scrollRef = useRef(null);
  const signatureRef = useRef(null);
  const refs = useRef(
    imageNames.reduce((acc, value) => {
      acc[value] = React.createRef();
      return acc;
    }, {}),
  ).current;

  useEffect(() => {
    const index = parseInt(search);
    if (!isNaN(index) && index >= 1 && index <= imageNames.length) {
      refs[imageNames[index - 1]].current.measure(
        (x, y, width, height, pageX, pageY) => {
          scrollRef.current.scrollTo({y: pageY, animated: true});
        },
      );
    } else if (refs[search]) {
      refs[search].current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current.scrollTo({y: pageY, animated: true});
      });
    }
  }, [search, refs]);

  const navigation = useNavigation();

  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  const handleColorChange = newColor => {
    setColor(newColor);
    console.log(`Color changed to: ${newColor}`);
    if (signatureRef.current) {
      signatureRef.current.changePenColor(newColor);
      signatureRef.current.draw();
    }
  };

  const handleErase = () => {
    signatureRef.current.erase();
  };

  const handleUndo = () => {
    signatureRef.current.undo();
  };

  const handleRedo = () => {
    signatureRef.current.redo();
  };

  console.log(height);

  const style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none; height: ${
                height * 0.7
              }px; background: transparent}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {}`;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fa'}}>
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/backbtn.png')}
              style={{width: 25, height: 25, marginRight: 10}}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Instruction Diagrams</Text>
          <TouchableOpacity onPress={() => setIsDrawing(!isDrawing)}>
            <Image
              source={require('../assets/pencil.png')}
              style={{width: 25, height: 25, marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          value={search}
          placeholder="Type 'Index Number' of Instruction Diagram to search"
          placeholderTextColor="gray"
        />

        <ScrollView
          style={{
            paddingHorizontal: 20,
          }}
          ref={scrollRef}>
          <View
            style={{
              marginBottom: height * 0.015,
            }}>
            <Text style={styles.indexTitle}>Index</Text>

            <View style={styles.indexList}>
              {imageNames.map((name, index) => (
                <Text style={styles.indexItem} key={index}>{`${
                  index + 1
                }. ${name}`}</Text>
              ))}
            </View>
          </View>

          {images.map((image, index) => (
            <View
              ref={refs[imageNames[index]]}
              key={index}
              style={styles.imageCard}>
              <Text style={styles.imageTitle}>{imageNames[index]}</Text>
              <Image
                source={image}
                style={styles.image}
                resizeMode="cover"
                onError={e =>
                  console.log(
                    `Failed to load image at index: ${index}, name: ${imageNames[index]}`,
                    e.nativeEvent.error,
                  )
                }
              />
            </View>
          ))}
        </ScrollView>

        {isDrawing && (
          <View style={styles.fullScreenOverlay}>
            <Signature
              overlayHeight={height * 0.8}
              ref={signatureRef}
              onOK={img => console.log(img)}
              webStyle={style}
              descriptionText="Draw here"
              clearText="Clear"
              confirmText="Save"
              lineColor={color}
              penColor={color}
              androidLayerType="software"
            />
            <View style={styles.controls}>
              <TouchableOpacity
                onPress={handleClear}
                style={styles.controlButton}>
                <Icon name="clear" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleErase}
                style={styles.controlButton}>
                <IconM name="eraser" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUndo}
                style={styles.controlButton}>
                <Icon name="undo" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRedo}
                style={styles.controlButton}>
                <Icon name="redo" size={24} color="white" />
              </TouchableOpacity>
              <View style={styles.colorPicker}>
                <TouchableOpacity
                  onPress={() => handleColorChange('#FF0000')}
                  style={[styles.colorButton, {backgroundColor: '#FF0000'}]}
                />
                <TouchableOpacity
                  onPress={() => handleColorChange('#00FF00')}
                  style={[styles.colorButton, {backgroundColor: '#00FF00'}]}
                />
                <TouchableOpacity
                  onPress={() => handleColorChange('#0000FF')}
                  style={[styles.colorButton, {backgroundColor: '#0000FF'}]}
                />
                <TouchableOpacity
                  onPress={() => handleColorChange('#000000')}
                  style={[styles.colorButton, {backgroundColor: '#000000'}]}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#007bff',
    marginBottom: 10,
  },
  header: {
    fontSize: isFoldable ? height * 0.03 : height * 0.025,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  searchInput: {
    height: isFoldable ? height * 0.075 : height * 0.05,
    borderColor: 'gray',
    borderWidth: 0.5,
    color: 'black',
    marginHorizontal: 10,
    marginBottom: height * 0.01,
    borderRadius: 20,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: isFoldable ? height * 0.018 : height * 0.015,
    backgroundColor: 'white',
  },
  indexTitle: {
    fontSize: isFoldable ? height * 0.028 : height * 0.022,
    marginBottom: height * 0.02,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  indexList: {
    marginBottom: height * 0.04,
    paddingHorizontal: 10,
  },
  indexItem: {
    color: 'black',
    fontSize: isFoldable ? height * 0.02 : height * 0.017,
    marginBottom: 5,
  },
  imageCard: {
    marginBottom: height * 0.02,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageTitle: {
    fontSize: isFoldable ? height * 0.028 : height * 0.022,
    alignSelf: 'center',
    marginBottom: height * 0.015,
    marginTop: height * 0.015,
    color: 'black',
  },
  image: {
    width: isFoldable ? '100%' : '90%',
    height: isFoldable ? height * 0.999 : height * 0.54,
    borderRadius: 10,
  },
  fullScreenOverlay: {
    width: '100%',
    height: '85%',
    background: '#00000000',
    zIndex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#00000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    margin: 8,
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    color: 'white',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 8,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
});
