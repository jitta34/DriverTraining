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
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Signature from 'react-native-signature-canvas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import IconFA from 'react-native-vector-icons/FontAwesome';

// Icon.loadFont();
const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const instructionDiagramDetails = [
  {
    name: 'POM',
    image: require('../newimages/pom.png'),
    description:
      '𝗣𝗿𝗼𝗰𝗲𝗱𝘂𝗿𝗲 𝗣𝗢𝗠   Procedure for starting the engine - key, keyless ignition, clutch   𝗣𝗿𝗲𝗽𝗮𝗿𝗮𝘁𝗶𝗼𝗻 Clutch down  Select the appropriate gear for the slope/angle (usually 1st gear) Co-ordinate pedals (clutch/gas/footbrake) as appropriate   𝗢𝗯𝘀𝗲𝗿𝘃𝗮𝘁𝗶𝗼𝗻 Mirrors  Blind spots  Signal if necessary   𝗠𝗮𝗻𝗼𝗲𝘂𝘃𝗿𝗲  Release parking brake Clutch control Steering  Road position  Cancel the signal Re-check mirrors.',
  },
  {
    name: 'CockPit Drill',
    image: require('../newimages/cockpit.png'),
    description:
      '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚𝙨 𝙤𝙛 𝘾𝙤𝙘𝙠𝙥𝙞𝙩 𝘿𝙧𝙞𝙡𝙡:  The importance of entering and leaving the car safely How to carry out cockpit checks and why they are important 𝘿 𝙎 𝙎 𝙎 𝙈 .',

  },
  {
    name: 'Mirrors',
    image: require('../newimages/mirrors.png'),
    description:
      '𝗟𝗲𝗮𝗿𝗻𝗶𝗻𝗴 𝗢𝗯𝗷𝗲𝗰𝘁𝗶𝘃𝗲 𝗼𝗳 𝗠𝗶𝗿𝗿𝗼𝗿𝘀 To understand the importance of use of mirrors when driving: Correct adjustment of all mirrors Understanding the dangers of not using mirrors Blind spots - where they are and how to deal with them .',
  },
  {
    name: 'Signals',
    image: require('../newimages/signals.png'),
    description:
      '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚𝙨 𝐨𝐟 𝙎𝙞𝙜𝙣𝙖𝙡𝙨 To understand the importance of signalling, when to signal and different  ways in which we can give signals To undertand the MSPSL procedure and its importance Understanding and acting on signals given by others.',
  },
  {
    name: 'Moving Off',
    image: require('../newimages/moving.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚𝙨 𝙤𝙛 𝙈𝙤𝙫𝙞𝙣𝙜 𝙊𝙛𝙛 To be able to pull away safely from the side of the road:  Preparing the vehicle to move off Making effective observation  Moving away under full control and take up a safe position in the road  Procedure.',
  },
  {
    name: 'Parking on Left',
    image: require('../newimages/parking.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚 𝙋𝙖𝙧𝙠𝙞𝙣𝙜 𝙤𝙣 𝙇𝙚𝙛𝙩  To be able to pull up safely at the side of the road:   Select a safe, convenient and legal position to pull up at the side road   Utilise the MSPSL routine.   Bring the vehicle to a stop under full control, close to and parallel with the kerb.   Securing the vehicle after stopping.',
  },
  {
    name: 'Emerging Left',
    image: require('../newimages/emergingleft.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚𝙨 𝙀𝙢𝙚𝙧𝙜𝙞𝙣𝙜 𝙇𝙚𝙛𝙩  To be able to approach and emerge to the left from a T-Junction:  Assessing the type of junction ahead (busy/quiet/ give way or stop sign).  Assessing whether it is an open or closed junction.   Apply the MSPSL routine on approach to the T-junction.   Approaching and emerging under control and with due regard for the safety of other road users.   Judging when safe to emerge.',
  },
  {
    name: 'Emerging Right',
    image: require('../newimages/emergingright.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to approach and emerge to the right from a T-Junction: Assessing the type of junction ahead (busy/quiet, give way/stop). Assessing whether it is an open or closed junction.  Apply the MSPSL routine on approach to the T-junction.  Emerging under control and with due regard for the safety of other road users.  Judging when safe to emerge..',
  },
  {
    name: 'Turning Left',
    image: require('../newimages/turningleft.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To make a left turn from a major to a minor road, under full control and with due regard for other road users.',
  },
  {
    name: 'Turning Right',
    image: require('../newimages/turningright.png'),
    description: ' 𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚 To make a right turn from a major to a minor road, under full control and with due regard for other road users:  Understanding priorities  Judging oncoming traffic safely and awareness of when it is safe to proceed.',
  },
  {
    name: 'Other Junctions',
    image: require('../newimages/otherjunctions.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚    To be aware of other junction layouts and the problems they may cause: Y Junctions  Junctions on bends Filter lanes for turning.',
  },
  {
    name: 'Cross Roads',
    image: require('../newimages/crossrd.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚    To be able to approach and deal with crossroads from all directions safely: Applying the MSPSL routine on approach to the crossroads  Dealing with taking the road ahead, turning to the left and to the right from both major and minor roads, under control and giving due attention to other road users.',
  },
  {
    name: 'Cross Roads-2',
    image: require('../newimages/cross-rds2.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to approach and deal with other crossroads situations such as box junctions and staggered crossroads:  Scan and plan ahead for staggered crossroads Understand the rules for box junctions  Plan ahead for box junctions.',
  },
  {
    name: 'Traffic Lights',
    image: require('../newimages/lights.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to approach and deal with traffic lights legally and safely: Knowing the sequence and meaning of lights  Planning ahead  Dealing with turning right at lights (nearside to nearside) and (offside to offside) Awareness of all road users including pedestrians and cyclists.',
  },
  {
    name: 'Roundabout Left',
    image: require('../newimages/roundaboutleft.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚 for turning 𝙇𝙚𝙛𝙩  To understand the application of MSPSL at roundabouts and to be able to decide when to emerge safely at roundabouts:  Assessing the roundabout ahead  Correct application of MSPSL on approach  Emerging safely onto the roundabout  Correct positioning, use of mirrrors and signals whilst on the roundabout.',
  },
  {
    name: 'Roundabout Ahead',
    image: require('../newimages/roundaboutahead.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚 for 𝘼𝙝𝙚𝙖𝙙  To understand the application of MSPSL at roundabouts and to be able to decide when to emerge safely at roundabouts:  Assessing the roundabout ahead  Correct application of MSPSL on approach  Emerging safely onto the roundabout  Correct positioning, use of mirrrors and signals whilst on the roundabout.',
  },
  {
    name: 'Roundabout Right',
    image: require('../newimages/roundaboutright.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚 for turning 𝙍𝙞𝙜𝙝𝙩  To understand the application of MSPSL at roundabouts and to be able to decide when to emerge safely at roundabouts:  Assessing the roundabout ahead  Correct application of MSPSL on approach  Emerging safely onto the roundabout  Correct positioning, use of mirrrors and signals whilst on the roundabout.',
  },
  {
    name: 'Spiral Roundabout',
    image: require('../newimages/spiral.png'),
    description:
      '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚 for 𝙎𝙥𝙞𝙧𝙖𝙡 𝙍𝙤𝙪𝙣𝙙𝙖𝙗𝙤𝙪𝙩  To understand the application of MSPSL at roundabouts and to be able to decide when to emerge safely at roundabouts:  Assessing the roundabout ahead  Correct application of MSPSL on approach  Emerging safely onto the roundabout  Correct positioning, use of mirrrors and signals whilst on the roundabout.',
  },
  {
    name: 'Mini-Roundabout',
    image: require('../newimages/miniroundabout.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚   To be able to deal safely with 𝙈𝙞𝙣𝙞 𝙍𝙤𝙪𝙣𝙙𝙖𝙗𝙤𝙪𝙩𝙨:  Understand the purpose of mini roundabouts  Understand particular difficulties associated with mini roundabouts Make effective observation.',
  },
  {
    name: 'Oneway Street',
    image: require('../newimages/oneway.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to deal safely with one way streets and one way systems particularly with regard to road positioning:  Identifying one way streets and associated road signs/markings. Road positioning  Entering and exiting one way streets - road positioning Overtaking on the left or right  Dealing with one way systems.',
  },
  {
    name: 'Pedestrian Crossings',
    image: require('../newimages/ped.lights.png'),
    description:'𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To understand the purpose of pedestrian crossings, the rules associated with different types of crossing and to be able to deal with pedestrian crossings safely:  Identifying uncontrolled and light-controlled pedestrian crossings Applying the MSPSL routine on approach to pedestrian crossings Understanding the different kinds of crossings and the meanings of lights and road markings.',
  },
  {
    name: 'Zebra Crossing',
    image: require('../newimages/zebra.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  A zebra crossing features a series of black and white stripes painted across a road (a bit like the markings of a zebra). Sometimes, these crossings are raised to be level with the pavement. Zebra crossings also have round, amber-coloured lights at either side, mounted on black and white-striped poles. These are called Belisha beacons,  While the beacons were previously traditional lamps, on newer crossings they have been replaced by rings of LEDs, which are more visible, and more energy efficient.',
  },
  {
    name: 'Dual Carriageway',
    image: require('../newimages/dualcarriageway.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  A dual carriageway is a road with two separate carriageways, each with multiple lanes, that are separated by a central reservation or barrier. Dual carriageways are designed to handle high volumes of traffic and improve safety by preventing head-on collisions.',
  },
  {
    name: 'Dual Carriageway-2',
    image: require('../newimages/dualcarriageway2.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To understand and be able to join and leave dual carriageways safely and to make safe progress on dual carriageways including correct lane discipline and dealing with overtaking:  Identifying dual carriageway ahead  Joining a dual carriageway when a single carriageway road becomes a dual carriageway  Joining from a side road / slip lane  Maintaining correct lane discipline.',
  },
  {
    name: 'Right Side Reverse',
    image: require('../newimages/rightreverse.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To consider how pulling up on the right and then reversing may be relevant to normal driving and to carry out the manoeuvre under full control and safely:  Understanding why pulling up on the right may be appropriate and what are the dangers of doing so  Awareness of other road users  Controlling speed and steering.',
  },
  {
    name: 'Forward Bay Park',
    image: require('../newimages/forward.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to drive forward into a parking bay and reverse out safely and under full control:  Understanding the dangers specifically associated with car parks Controlling the speed of the car  Parking centrally within a marked parking bay  Understanding the disadvantages in having to reverse out of a bay.',
  },
  {
    name: 'Reverse Bay Park',
    image: require('../newimages/reverse.png'),
    description: '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to reverse into a parking bay and drive out safely and under full control:  Understanding the dangers specifically associated with car parks  Controlling the speed of the car and appropriate steering Parking centrally within a marked parking bay.',
  },
  {
    name: 'Parellel Park',
    image: require('../newimages/parallel.png'),
    description:
      '𝙇𝙚𝙖𝙧𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩𝙞𝙫𝙚  To be able to pull up alongside a parked car and reverse into a parking space safely:  Making full observation  Control of the speed of the car Finishing in a suitable parked position.',
  },
];

export default function InstructionScreen() {
  const [search, setSearch] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const scrollRef = useRef(null);
  const signatureRef = useRef(null);
  const refs = useRef(
    instructionDiagramDetails.reduce((acc, item) => {
      acc[item.name] = React.createRef();
      return acc;
    }, {}),
  ).current;

  const [selectedBackground, setSelectedBackground] = useState(null);
  const slideAnim = useSharedValue(width);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const index = parseInt(search);
    if (
      !isNaN(index) &&
      index >= 1 &&
      index <= instructionDiagramDetails.length
    ) {
      refs[instructionDiagramDetails[index - 1].name].current.measure(
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

  console.log('backgroundUrl', backgroundUrl);

  const toggleBackgroundPicker = () => {
    const newValue = !showBackgroundPicker;
    setShowBackgroundPicker(newValue);
    slideAnim.value = withTiming(newValue ? width - 100 : width, {
      duration: 300,
    });
  };

  const selectBackground = item => {
    setSelectedImage(item);
    if (Platform.OS === 'web') {
      const resolvedImage = Image.resolveAssetSource(item.image);
      setBackgroundUrl(resolvedImage.uri || item.image);
    } else {
      const resolvedImage = Image.resolveAssetSource(item.image);
      setBackgroundUrl(resolvedImage.uri);
    }
  };

  const style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {
                border: none; 
                height: ${height * 0.8}px; 
                background-color: transparent;
              }
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {}`;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: slideAnim.value}],
  }));

  const scrollToTop = () => {
    scrollRef.current.scrollTo({y: 0, animated: true});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f8f9fa'}}>
      <View style={{flex: 1, position: 'relative'}}>
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

        {isDrawing ? (
          <View style={styles.fullScreenOverlay}>
            <Signature
              key={selectedImage ? selectedImage.name : 'default'}
              bgHeight={height * 0.8}
              overlayHeight={height}
              ref={signatureRef}
              onOK={img => console.log(img)}
              webStyle={style}
              descriptionText="Draw here"
              clearText="Clear"
              confirmText="Save"
              lineColor={color}
              penColor={color}
              scrollable={false}
              showsVerticalScrollIndicator={true}
              backgroundColor="#00000000"
              androidLayerType="software"
              bgWidth={width}
              bgSrc={backgroundUrl}
            />
            <View style={[styles.controls, {zIndex: 1001}]}>
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
              <TouchableOpacity
                onPress={toggleBackgroundPicker}
                style={styles.controlButton}>
                <Icon name="image" size={24} color="white" />
              </TouchableOpacity>
              <View style={styles.colorPicker}>
                {['#FF0000', '#00FF00', '#000000'].map(c => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => handleColorChange(c)}
                    style={[
                      styles.colorButton,
                      {backgroundColor: c},
                      color === c && styles.selectedColor,
                    ]}
                  />
                ))}
              </View>
            </View>

            {showBackgroundPicker && (
              <Animated.View style={[styles.backgroundPicker]}>
                <ScrollView>
                  {instructionDiagramDetails.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        selectBackground(item);
                        toggleBackgroundPicker();
                        if (signatureRef.current) {
                          signatureRef.current.clearSignature();
                        }
                      }}
                      style={[
                        styles.backgroundThumbnail,
                        selectedImage?.name === item.name &&
                          styles.selectedThumbnail,
                      ]}>
                      <Image
                        source={item.image}
                        style={styles.thumbnailImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            )}
          </View>
        ) : (
          <View style={{position: 'relative'}}>
            <TextInput
              style={styles.searchInput}
              onChangeText={text => setSearch(text)}
              value={search}
              placeholder="Type 'Index Number' of Instruction Diagram to search"
              placeholderTextColor="gray"
            />

            <TouchableOpacity
              style={styles.scrollToTopButton}
              onPress={scrollToTop}>
              <IconFA name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
            <ScrollView
              style={{
                paddingHorizontal: 20,
                marginBottom: 60,
              }}
              ref={scrollRef}>
              <View
                style={{
                  marginBottom: height * 0.015,
                }}>
                <Text style={styles.indexTitle}>Index</Text>

                <View style={styles.indexList}>
                  {instructionDiagramDetails.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        refs[item.name].current.measure(
                          (x, y, width, height, pageX, pageY) => {
                            scrollRef.current.scrollTo({
                              y: pageY,
                              animated: true,
                            });
                          },
                        );
                      }}>
                      <Text style={styles.indexItem}>
                        {`${index + 1}. ${item.name}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {instructionDiagramDetails.map((item, index) => (
                <View
                  ref={refs[item.name]}
                  key={index}
                  style={styles.imageCard}>
                  <Text style={styles.imageTitle}>
                    {' '}
                    {`${index + 1}. ${item.name}`}
                  </Text>
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                    onError={e =>
                      console.log(
                        `Failed to load image at index: ${index}, name: ${item.name}`,
                        e.nativeEvent.error,
                      )
                    }
                  />
                  {item.description && (
                    <Text style={styles.imageDescription}>
                      {item.description}
                    </Text>
                  )}
                </View>
              ))}
            </ScrollView>
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
    padding: 5,
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
    height: '90%',
    background: '#00000000',
    position: 'relative',
  },
  controls: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
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
  selectedColor: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  backgroundPicker: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
    paddingVertical: 10,
  },
  backgroundThumbnail: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  imageDescription: {
    fontSize: isFoldable ? height * 0.018 : height * 0.015,
    color: '#333',
    marginTop: height * 0.015,
    paddingHorizontal: 10,
    lineHeight: isFoldable ? height * 0.025 : height * 0.022,
  },
  scrollToTopButton: {
    position: 'absolute',
    top: height * 0.75,
    right: 20,
    backgroundColor: '#007bff',
    width: 55,
    height: 55,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  selectedThumbnail: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
});
