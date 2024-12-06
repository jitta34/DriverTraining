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

// Icon.loadFont();
const {width, height} = Dimensions.get('window');
const isFoldable = height >= 550 && height <= 790;

const images = [
  require('../newimages/pom.png'),
  require('../newimages/cockpit.png'),
  require('../newimages/mirrors.png'),
  require('../newimages/signals.png'),
  require('../newimages/moving.png'),
  require('../newimages/parking.png'),
  require('../newimages/emergingleft.png'),
  require('../newimages/emergingright.png'),
  require('../newimages/turningleft.png'),
  require('../newimages/turningright.png'),
  require('../newimages/otherjunctions.png'),
  require('../newimages/crossrd.png'),
  require('../newimages/cross-rds2.png'),
  require('../newimages/lights.png'),
  require('../newimages/roundaboutleft.png'),
  require('../newimages/roundaboutahead.png'),
  require('../newimages/roundaboutright.png'),
  require('../newimages/spiral.png'),
  require('../newimages/miniroundabout.png'),
  require('../newimages/oneway.png'),
  require('../newimages/ped.lights.png'),
  require('../newimages/zebra.png'),
  require('../newimages/dualcarriageway.png'),
  require('../newimages/dualcarriageway2.png'),
  require('../newimages/rightreverse.png'),
  require('../newimages/forward.png'),
  require('../newimages/reverse.png'),
  require('../newimages/parallel.png'),
];

const imageNames = [
  'POM',
  'CockPit Drill',
  'Mirrors',
  'Signals',
  'Moving Off',
  'Parking on Left',
  'Emerging Left',
  'Emerging Right',
  'Turning Left',
  'Turning Right',
  'Other Junctions',
  'Cross Roads',
  'Cross Roads-2',
  'Traffic Lights',
  'Roundabout Left',
  'Roundabout Ahead',
  'Roundabout Right',
  'Spiral Roundabout',
  'Mini-Roundabout',
  'Oneway Street',
  'Pedestrian Crossings',
  'Zebra Crossing',
  'Dual Carriageway',
  'Dual Carriageway-2',
  'Right Side Reverse',
  'Forward Bay Park',
  'Reverse Bay Park',
  'Parellel Park',
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

  const [selectedBackground, setSelectedBackground] = useState(null);
  const slideAnim = useSharedValue(width);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(null);

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

  const toggleBackgroundPicker = () => {
    const newValue = !showBackgroundPicker;
    setShowBackgroundPicker(newValue);
    slideAnim.value = withTiming(newValue ? width - 100 : width, {
      duration: 300,
    });
  };

  const selectBackground = image => {
    if (Platform.OS === 'web') {
      const resolvedImage = Image.resolveAssetSource(image);
      setBackgroundUrl(resolvedImage.uri || image);
    } else {
      const resolvedImage = Image.resolveAssetSource(image);
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
                  {images.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        selectBackground(image);
                        toggleBackgroundPicker();
                      }}
                      style={styles.backgroundThumbnail}>
                      <Image
                        source={image}
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
          <View>
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
});
