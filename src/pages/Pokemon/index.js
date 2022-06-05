import {
  Text, View, StatusBar, Dimensions, Animated,
} from 'react-native';
import React, { useMemo, useCallback, useState } from 'react';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import { BiggerDots, pokeballImages } from '../../assets';
import Header from './Header';
import Summary from './Summary';
import PokeballCatch from './PokeballCatch';

const { height, width } = Dimensions.get('window');

function Pokemon() {
  const route = useRoute();
  const { item } = route.params;

  const [getPokemon, setGetPokemon] = useState(true);
  const translateY = useMemo(() => new Animated.Value(0), []);
  const translateYDarker = useMemo(() => new Animated.Value(0), []);
  const translateYPokeball = useMemo(() => new Animated.Value(0), []);
  const rotatePokeball = useMemo(() => new Animated.Value(0), []);
  const scalePokeball = useMemo(() => new Animated.Value(0), []);

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

  const onDarker = useCallback(() => {
    Animated.timing(translateYDarker, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(scalePokeball, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYPokeball, {
      toValue: height,
      duration: 500,
      useNativeDriver: true,
    }).start(onRotatePokeball);
  }, []);

  const onRotatePokeball = useCallback(() => {
    Animated.sequence([
      Animated.delay(150),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotatePokeball, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(rotatePokeball, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(rotatePokeball, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(rotatePokeball, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]),
        { iterations: 1 },
      ),
    ]).start(onLighter);
  }, []);

  const onLighter = useCallback(() => {
    Animated.timing(scalePokeball, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYPokeball, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYDarker, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(setGetPokemon(false), setGetPokemon(true));
  }, []);

  const darkerStyle = {
    translateY: translateYDarker.interpolate({
      inputRange: [0, height],
      outputRange: [-height, 0],
      extrapolate: 'clamp',
    }),
  };

  const pokeballAnimationStyle = {
    transform: [
      {
        translateY: translateYPokeball.interpolate({
          inputRange: [0, height],
          outputRange: [height, 0],
          extrapolate: 'clamp',
        }),
      }, {
        scale: scalePokeball.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [2, 1.5, 1],
          extrapolate: 'clamp',
        }),
      }, {
        rotate: rotatePokeball.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
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
          {/* Header */}
          <Header item={item} translateY={translateY} />

          {/* Summary */}
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
              <View style={{
                height: height - (200 + 64),
                backgroundColor: 'white',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                paddingVertical: 16,
              }}
              >
                <View style={{
                  paddingTop: 16,
                  paddingBottom: 24,
                  marginHorizontal: 24,
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'lightgrey',
                  position: 'relative',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
                >
                  <Text>asd</Text>

                </View>

              </View>
            </Animated.View>
          </PanGestureHandler>

        </View>
      </View>
      <PokeballCatch translateY={translateY} onPress={onDarker} getPokemon={getPokemon} />

      <Animated.View style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        width,
        height,
        position: 'absolute',
        ...darkerStyle,
      }}
      />

      <Animated.Image
        source={pokeballImages}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          width: 275,
          height: 275,
          top: 205,
          ...pokeballAnimationStyle,
        }}
      />

    </>
  );
}

export default Pokemon;
