import React, {useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder, Image, Slider} from 'react-native';
import { Ionicons as Play } from "@expo/vector-icons";
import { Ionicons as Pause } from "@expo/vector-icons";
import {Entypo as Back} from "@expo/vector-icons";
import {Entypo as Forward} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value
          });
        },
        onPanResponderMove: Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ]
        ),
        onPanResponderRelease: () => {
           pan.flattenOffset();
        }
      })
    ).current;

     const animateImageHeight = pan.y.interpolate({
       inputRange: [0, SCREEN_HEIGHT - 90],
       outputRange: [200, 30],
       extrapolate: 'clamp'
     })
     const animateImageMargin = pan.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [0, SCREEN_WIDTH],
      extrapolate: 'clamp'
    })
  return (
    <View style={styles.container}>
    {/* <Text style={styles.titleText}>Drag this box!</Text> */}
    <LinearGradient
            colors={["black","transparent", "rgba(0, 0, 0, 0.3)", "red"]}
            style={StyleSheet.absoluteFill}
            start={[0.3, 1]}
            end={[0,0]}
            />
    <Animated.View
      style={{
        transform: [{ translateX: 0 }, { translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[{height: animateImageHeight, 
        width: animateImageHeight, 
        marginRight:animateImageMargin },styles.box]}>
      <Image style={styles.image} source={require('./assets/Lamar.jpg')}/>
      </Animated.View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Animated.Text style={{fontSize: 20, fontWeight: 'bold'}}>
                DAMN
              </Animated.Text>
              <Animated.Text style={{fontSize: 14, opacity: 0.8, color: 'red'}}>
                Loyalty ft Rihana
              </Animated.Text>
        </View>
          <Animated.View style={{flex: 1, flexDirection: 'row', 
            justifyContent: 'space-between'}}>
            <Back name="controller-fast-backward" size={32} />
            <Play name='md-play' size={42}/>
            <Back name="controller-fast-forward" size={32} />
           </Animated.View>
    </Animated.View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
    // backgroundColor: 'red'
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    borderRadius: 5,
  },
  image:{
    flex: 1,
    width: null,
    height: null
  }
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   main: {
//     position: 'absolute',
//     // zIndex: 10, 
//     backgroundColor: 'transparent',
//     color: "#ff99ff"
//     // height: SCREEN_HEIGHT
//   },
//   image: {
//     height: 230,
//     width: 230,
//     borderRadius: 5
//   }
// });

