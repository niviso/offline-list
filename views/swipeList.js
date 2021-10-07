import React,{useState,useRef} from 'react';
import {
  ScrollView,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  Text
} from 'react-native';


export default function SwipeList(props){
    const data = ['a','b','c','d'];

    const SwipeItem = (props) => {
        const [position,setPosition] = useState(0);
        const width = Dimensions.get('window').width;
        const panResponder = React.useRef(
            PanResponder.create({
              // Ask to be the responder:
              onStartShouldSetPanResponder: (evt, gestureState) => true,
              onStartShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
              onMoveShouldSetPanResponder: (evt, gestureState) => true,
              onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
        
              onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now
              },
              onPanResponderMove: (evt, gestureState) => {
                  setPosition(gestureState.dx);
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
              },
              onPanResponderTerminationRequest: (evt, gestureState) =>
                true,
              onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
              },
              onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
              },
              onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
              }
            })
          ).current;
        return(
            <View {...panResponder.panHandlers} style={{position: 'relative',left:position,width:'100%',height:100,backgroundColor:'orange',borderBottomColor:'black',borderBottomWidth:1}}>
                <Text>{position}</Text>
            </View>
        )
    }

    return data.map((item,index) => <View><SwipeItem key={index}/></View>)
}