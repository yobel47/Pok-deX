import {
  View, StatusBar, Animated,
} from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import { BiggerDots } from '../../assets';
import Header from './Header';
import Summary from './Summary';
import CatchAnimation from './CatchAnimation';
import Details from '../Details';
import { onLogScreenView } from '../../utils/onLogScreenView';

function Pokemon() {
  const route = useRoute();
  const { item, profile } = route.params;

  const translateY = useMemo(() => new Animated.Value(0), []);
  const [open, setOpen] = useState(false);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );

  useEffect(() => {
    onLogScreenView('Pokemon');
  }, []);

  const onHandlerStateChanged = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const { translationY } = event.nativeEvent;

      if (translationY < -100) {
        opened = true;
      } else {
        opened = false;
        translateY.flattenOffset();
      }

      Animated.timing(translateY, {
        toValue: opened ? -360 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        translateY.extractOffset();
        setOpen(opened);
      });
    }
  };

  const detailsStyle = {
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-360, 0, 200],
          outputRange: [-360, 0, 50],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const backgroundColor = useMemo(
    () => getColorByPokemonType(item.types[0].name),
    [item.types],
  );

  const dotsStyle = {
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={{ flex: 1, backgroundColor }}>
        <View style={{
          width: 212,
          height: 212,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 24,
          position: 'absolute',
          top: -100,
          left: -120,
          transform: [{ rotate: '-12deg' }],
        }}
        />
        <Animated.View style={dotsStyle}>
          <BiggerDots
            width={200}
            height={100}
            style={{
              color: 'rgba(255,255,255,0.2)',
              transform: [{ rotate: '90deg' }],
              right: 80,
              top: -90,
              position: 'absolute',
            }}
          />
        </Animated.View>

        <View style={{ flex: 1 }}>
          <Header item={item} translateY={translateY} />
          <Summary item={item} translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}
          >
            <Animated.View style={{
              flex: 1,
              position: 'relative',
              ...detailsStyle,
            }}
            >
              <Details open={open} item={item} />
            </Animated.View>
          </PanGestureHandler>

        </View>
      </View>
      <CatchAnimation translateY={translateY} item={item} profile={profile} />
    </>
  );
}

export default Pokemon;
