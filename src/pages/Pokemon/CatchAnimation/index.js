import { Animated, Dimensions } from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { pokeballImages } from '../../../assets';
import PokeballCatch from '../PokeballCatch';

const { height, width } = Dimensions.get('window');

function CatchAnimation({ translateY }) {
  const [getPokemon, setGetPokemon] = useState(true);
  const translateYDarker = useMemo(() => new Animated.Value(0), []);
  const translateYPokeball = useMemo(() => new Animated.Value(0), []);
  const rotatePokeball = useMemo(() => new Animated.Value(0), []);
  const scalePokeball = useMemo(() => new Animated.Value(0), []);

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

  return (
    <>
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

export default CatchAnimation;
